/** 
* @Author       : MengYao.Zhao
* @Date         : 2022/07/01 11:37:15
* @Description  : 管理服务器子弹的生成
*/

import { Constants } from "../../../tool/Constants";
import { util } from "../../../tool/Utils";
import { PlayerManager } from "../../PlayerModule/PlayerManager";
// import { SceneUnitUtil } from "../../SceneUnitModule/SceneUnitModule";
// import { SceneUnitModuleS } from "../../SceneUnitModule/SceneUnitModuleS";
import { Bullet, InnerBulletData } from "./Bullet";
import { BulletClass, BulletCreateData, BulletLaunchData, BulletRpcFun, BulletServerHitData, BulletDamageData, useReplicatedMode, setUseReplicatedMode, setUseCachedMode, useCachedMode, EBulletType, EBulletDestroyCondition } from "./BulletDefine";
import { BulletMgr } from "./BulletMgr";


/**
 *  服务器验证并计算子弹命中结果，然后通过属性同步给客户端
 */
export type VerifyAndCalcBulletHitResult = (reportData: BulletServerHitData) => BulletDamageData;


export class BulletMgrS extends BulletMgr<Bullet> {
    static instance: BulletMgrS = new BulletMgrS();

    /**
     * 逻辑子弹的一个缓存池
     */
    protected cachedBullets: Bullet[];

    /**
     *用于验证并计算客户端的命中结果，然后用属性同步到客户端
     */
    private onVerifyAndCalcBulletHitResult: VerifyAndCalcBulletHitResult = null;

    /**
     * 当子弹命中目标时 参数1为子弹逻辑对象，参数客户端上传的2为命中数据,json结构的任意自定义对象数据
     */
    protected _onHitEvent: mw.Action2<Bullet, any>;
    public get onHitEvent(): mw.Action2<Bullet, any> {
        return this._onHitEvent;
    }


    /**
    * 进行初始化
    * @param staticBulletDatas  静态子弹表数据,传入GameConfig.Bullet.getAllElement()即可
    * @param _onVerifyAndCalcBulletHitResult 用于验证并计算客户端的命中结果
    */
    async init(staticBulletDatas: InnerBulletData[], _onVerifyAndCalcBulletHitResult: VerifyAndCalcBulletHitResult) {
        super.init(staticBulletDatas);
        this.cachedBullets = [];
        // oTrace("BulletManagerS init");
        this._onHitEvent = new mw.Action2<Bullet, any>();
        this.onVerifyAndCalcBulletHitResult = _onVerifyAndCalcBulletHitResult;
        mwext["GameInitializer"]["getService"]("NetManager").registerFun(this.net_OnBulletHit, this);
        mwext["GameInitializer"]["getService"]("NetManager").registerFun(this.net_OnBulletDestroy, this);

        this.inited = true;
    }


    /**
     * 完全销毁 
     */
    destroy() {
        super.destroy();
        mwext["GameInitializer"]["getService"]("NetManager").unRegisterFun(this.net_OnBulletHit);
        mwext["GameInitializer"]["getService"]("NetManager").unRegisterFun(this.net_OnBulletDestroy);
        this.cachedBullets.forEach((bullet: Bullet) => {
            bullet.onDestroy();
        })
        this.cachedBullets = null;
        BulletMgrS.instance = null;
    }

    /**
     * 获取一个子弹对象
      * @param launchData 发射用的数据集
     * @param bulletClass 创建的bulletClass 
     * @param guid 子弹id,如果提供了表示是客户端在创建
     */
    protected getBullet(launchData: BulletLaunchData, bulletClass: BulletClass<Bullet>, guid: number = null): Bullet {
        if (useCachedMode) {
            if (this.cachedBullets.length > 0) {
                // oTrace("从缓存池中拿 了一个子弹")
                let bullet = this.cachedBullets[0];
                this.cachedBullets.splice(0, 1);
                bullet.initCommon(launchData, this.staticBullets.get(launchData.configId), guid);
                return bullet;
            }
        }
        // oTrace("生成了一果新子弹")
        return super.getBullet(launchData, bulletClass, guid);
    }
    /**
     * 服务器 启动子弹的销毁倒计时， 多延迟一会，让客户端来销毁
     * @param bullet 
     */
    protected setupBulletDestroyTimer(bullet: Bullet) {
        let delayTime = null;
        if (bullet.delayDestroyTime > 0) {
            delayTime = bullet.delayDestroyTime + 3;//额外增加一点时间，待客户端来销毁
        }
        else {
            if (bullet.destroyCondition == EBulletDestroyCondition.CannotRebound) {
                //这个如果没有，也要加一个
                delayTime = 60000;
            }
        }
        if (delayTime) {
            bullet.destroyTimerId = this.bulletTimerWheel.createTimer(bullet.delayDestroyTime, (bulletId: number) => {
                let bullet = this.findBullet(bulletId);
                if (bullet && !bullet.dead) {
                    this.onBulletForceDestroy(bullet);
                }
            }, bullet.id)
        }
    }

    /**
     * 销毁子弹
     */
    destroyBullet(bullet: Bullet) {
        //  oTrace("BulletManagerS,destroyBullet ");
        if (!bullet)
            return;
        super.destroyBullet(bullet);
        this._bullets.delete(bullet.id);

        if (useCachedMode) {
            //放回缓存池
            bullet.reset();
            this.cachedBullets.push(bullet);
        }
        else {
            bullet.onDestroy();
        }

        bullet = null;
    }

    /**
    * 创建一个子弹对象 
    * @param launchData 发射用的数据集
    * @param bulletClass 创建的bulletClass     
    * @param innerCreate 内部创建标记
    * @returns 子弹对象集合，可能有分裂子弹
    */
    async createBullet(launchData: BulletLaunchData): Promise<Bullet | Bullet[]> {
        if (launchData.bulletType == undefined || launchData.bulletType == null)
            launchData.bulletType == EBulletType.Logic
        let staticConfig = this.staticBullets.get(launchData.configId);
        if (!staticConfig) {
            console.error("创建子失败，子弹配置不存在!,configId: " + launchData.configId);
            return null;
        }

        let splitCount = launchData.splitCount;
        let splitAngle = launchData.splitAngle;
        if (splitCount == undefined || splitCount == null)
            splitCount = staticConfig.splitCount;
        if (splitAngle == undefined || splitAngle == null)
            splitAngle = staticConfig.splitAngle;

        //创建可能的分裂子弹
        if (splitCount > 0) {
            let launchDatas = this.calcSplitBullet(launchData, splitCount, splitAngle);
            let bullets = this.createBullets(launchDatas);
            return bullets;
        }

        return this.innerCreateBullet(launchData, Bullet, true);
    }

    /**
     * 创建一批子弹对象 ,前两个参数长度一致，数据内容一一对应
     * @param launchDatas 发射用的数据集
     * @param bulletClsses 创建的bulletClass      
     * @returns 子弹对象列表
     */
    async createBullets(launchDatas: BulletLaunchData[]): Promise<Bullet[]> {
        let bulletClsses: BulletClass<Bullet>[] = [];
        launchDatas.forEach((bld, _) => {
            bulletClsses.push(Bullet);
        })

        let bullets = [];
        for (let i = 0; i < launchDatas.length; i++) {
            let bullet = await this.innerCreateBullet(launchDatas[i], bulletClsses[i], false, null);
            bullets.push(bullet);
        }

        this.afterCreatedBullet(bullets);

        return bullets;
    }


    /**
     * 当子弹创建后 hook  广播通知客户端创建了子弹
     */
    protected afterCreatedBullet(bullet: Bullet | Bullet[]) {

        let convertLaunchDataToCreateData = (bullet: Bullet): BulletCreateData => {
            let data: BulletCreateData = {
                atkerIsPlayer: bullet.launchData.atkerIsPlayer,
                id: bullet.id,
                pid: bullet.hostPlayerId,
                f: [bullet.launchPos.x, bullet.launchPos.y, bullet.launchPos.z],
                t: [bullet.targetPos.x, bullet.targetPos.y, bullet.targetPos.z],
                cfgId: bullet.launchData.configId,
                bt: bullet.launchData.bulletType,
                spd: bullet.speed,
                pc: bullet.penetrateCount,
                sc: bullet.launchData.splitCount,
                sa: bullet.launchData.splitAngle,
                rc: bullet.launchData.reboundCount,
                hs: bullet.launchData.heightScale,
                tt: bullet.launchData.traceTargetGuid,
                dd: bullet.launchData.delayDestroy,
                ed: bullet.launchData.extraData
            }
            return data;
        }

        if (Array.isArray(bullet)) {
            let datas: BulletCreateData[] = [];
            bullet.forEach((b) => {
                this.setupBulletDestroyTimer(b);
                let data: BulletCreateData = convertLaunchDataToCreateData(b);
                datas.push(data);
            });


            if (datas.length > 0) {

                let bulletData = datas[0];
                let sourcePosX: number
                let sourcePosY: number
                // if (!SceneUnitUtil.isSceneUnit(bulletData.pid)) {
                let playerLoc = PlayerManager.instance.getPlayerLoc(bulletData.pid);
                if (playerLoc) {
                    sourcePosX = playerLoc.x;
                    sourcePosY = playerLoc.y;
                }
                // }
                // else {
                //     let unit = ModuleService.getModule(SceneUnitModuleS).getSceneUnitByID(bulletData.pid)
                //     let loc = unit.modelLocaction;
                //     sourcePosX = loc.x
                //     sourcePosY = loc.y
                // }
                // 针对曲线子弹的优化 
                let bulletCfg = bullet[0].staticConfig;
                let checkDistance = Constants.SceneUnitInfoCullDistanceXY;

                // let isSpecialBullet: boolean = false;
                // if (bulletCfg.bulletType == EBulletType.Curve) {
                //     isSpecialBullet = true;
                // }

                for (const player of Player.getAllPlayers()) {
                    let playerID = player.playerId;

                    // 过滤超出范围的接收者 Constants.SceneUnitInfoCullDistanceXY
                    if (playerID != bulletData.pid) {
                        // if (isSpecialBullet) {
                        //     continue;
                        // }
                        let playerPos = PlayerManager.instance.getPlayerLoc(playerID);
                        if (playerPos == null) continue;

                        let disXY = util.distanceNumberXY(sourcePosX, sourcePosY, playerPos.x, playerPos.y)

                        // 过滤超出范围的接收者 Constants.SceneUnitInfoCullDistanceXY
                        if (disXY > checkDistance) continue
                    }

                    mwext["GameInitializer"]["getService"]("NetManager").callClientFun(player, BulletRpcFun.net_CreateBullets, datas);

                    // 缓存下这个子弹都同步给了那些玩家
                    for (let index = 0; index < bullet.length; index++) {
                        const element = bullet[index];
                        element.addSyncPlayerId(playerID);
                    }
                }
            }
            //  oTrace("通知前端创建多个子弹")
            // mwext["GameInitializer"]["getService"]("NetManager").callAllClientFun(BulletRpcFun.net_CreateBullets, datas);
        }
        else {
            this.setupBulletDestroyTimer(bullet);
            let data: BulletCreateData = convertLaunchDataToCreateData(bullet);

            let sourcePosX: number
            let sourcePosY: number
            // if (!SceneUnitUtil.isSceneUnit(data.pid)) {
            let playerLoc = PlayerManager.instance.getPlayerLoc(data.pid);
            if (playerLoc) {
                sourcePosX = playerLoc.x;
                sourcePosY = playerLoc.y;
            }
            // }
            // else {
            //     let unit = ModuleService.getModule(SceneUnitModuleS).getSceneUnitByID(data.pid)
            //     let loc = unit.modelLocaction;
            //     sourcePosX = loc.x
            //     sourcePosY = loc.y
            // }


            let checkDistance = Constants.SceneUnitInfoCullDistanceXY;

            //let bulletCfg = bullet.staticConfig;

            // let isSpecialBullet: boolean = false;
            // // 针对曲线子弹的优化 
            // if (bulletCfg.bulletType == EBulletType.Curve) {
            //     isSpecialBullet = true;
            // }

            for (const player of Player.getAllPlayers()) {
                let playerID = player.playerId

                // 过滤超出范围的接收者 Constants.SceneUnitInfoCullDistanceXY
                if (playerID != data.pid) {
                    // if (isSpecialBullet) {
                    //     continue;
                    // }
                    let playerPos = PlayerManager.instance.getPlayerLoc(playerID);
                    if (playerPos == null) continue;
                    let disXY = util.distanceNumberXY(sourcePosX, sourcePosY, playerPos.x, playerPos.y)
                    if (disXY > checkDistance) {
                        continue;
                    }
                }

                mwext["GameInitializer"]["getService"]("NetManager").callClientFun(player, BulletRpcFun.net_CreateBullet, data);

                // 缓存下这个子弹都同步给了那些玩家
                bullet.addSyncPlayerId(playerID);
            }


            // oTrace("通知前端创建1个子弹 data: " + JSON.stringify(data));
            // mwext["GameInitializer"]["getService"]("NetManager").callAllClientFun(BulletRpcFun.net_CreateBullet, data);
        }
    }





    /**
     * 延迟销毁掉子弹
     * @param bullet
     */
    private async delayDestoryBullet(bullet: Bullet) {
        //  oTrace("BulletManagerS delayDestoryBullet");
        await mw.TimeUtil.delaySecond(2)
        this.destroyBullet(bullet);
    }

    /**
     * 当子弹需要强制销毁时 服务端直接销毁
     * @param bullet 
     */
    protected onBulletForceDestroy(bullet: Bullet) {
        this.destroyBullet(bullet);
    }

    ///////////////////////////////////////////////////////////////////////////////////RPC/////////////////////////////////////////////////////////////////////

    /**
     * 子弹命中了
     * @hitInfoData hitInfoData BulletServerHitData 命中数据
     */
    net_OnBulletHit(hitInfoData: BulletServerHitData) {
        if (!this.inited)
            return;
        let bullet = this.findBullet(hitInfoData.id);
        //oTrace("Server BulletManagerS net_OnBulletHit: " + JSON.stringify(hitInfoData))
        //oTrace("bullet : " + bullet);
        //oTrace("bullet.dead" + !bullet.dead);
        if (bullet && !bullet.dead) {

            this._onHitEvent?.call(bullet, hitInfoData.hitInfo);

            //把结果通过属性进行广播,服务器的这个子弹如果需要销毁的话，延迟去销毁，这样保证客户端属性同步被同步到
            let calcResult = this.onVerifyAndCalcBulletHitResult(hitInfoData);
            if (calcResult) {
                if (useReplicatedMode) {
                    try {
                        //oTrace("useReplicatedMode : " + calcResult);
                        //bullet.syncScript.damageInfo = JSON.stringify(calcResult);
                    } catch (error) {
                        //bullet.syncScript.damageInfo = "error!,not a json object";
                    }
                }
                else {
                    // vae_屏蔽优化  减少堆栈溢出rpc
                    // mwext["GameInitializer"]["getService"]("NetManager").callAllClientFun(BulletRpcFun.net_BulletTakeDamage, calcResult);
                }
            }

        }
    }

    /**
     * 子弹销毁了
     * @param bulletId 子弹id
     */
    net_OnBulletDestroy(bulletId: number, hitPos: mw.Vector, isServer: any = false) {
        let bullet = this.findBullet(bulletId);

        if (typeof (isServer) != "boolean") {
            isServer = false;
        }


        if (!bullet) {

            console.error("没找到子弹 : " + bulletId);

            return;
        }

        if (useReplicatedMode) {
            //bullet.syncScript.onDestroyInfo = JSON.stringify({ id: bulletId, hitPos: hitPos });
        } else {

            // vae_子弹销毁消息只同步给子弹的同步玩家
            if (bullet.syncPlayerIds && isServer == false) {
                for (let index = 0; index < bullet.syncPlayerIds.length; index++) {
                    const asyncPlayerId = bullet.syncPlayerIds[index];
                    if (asyncPlayerId == bullet.hostPlayerId) {
                        continue;
                    }
                    let player = Player.getPlayer(asyncPlayerId);
                    if (player == null) {
                        continue;
                    }
                    mwext["GameInitializer"]["getService"]("NetManager").callClientFun(player, BulletRpcFun.net_onBulletDestroyClient,
                        JSON.stringify({ id: bulletId, hitPos: hitPos }));
                }
            }
            // Player.getAllPlayers().forEach(e => {
            //     if (e.playerId == bullet.hostPlayerId && isServer == false)
            //         return;
            //      mwext["GameInitializer"]["getService"]("NetManager").callClientFun(e, BulletRpcFun.net_onBulletDestroyClient, JSON.stringify({ id: bulletId, hitPos: hitPos }));
            // })
        }

        if (bullet && !bullet.dead) {
            bullet.markDead();
            if (useReplicatedMode) {
                //延迟销毁
                this.delayDestoryBullet(bullet);
            }
            else {
                this.destroyBullet(bullet);
            }
        }
    }




    //////////////////////////////////////////////////////////////////////////////////end/////////////////////////////////////////////////////////////////////



}