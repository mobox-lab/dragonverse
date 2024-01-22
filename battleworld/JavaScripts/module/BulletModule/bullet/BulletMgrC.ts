import { SpawnManager, SpawnInfo, } from '../../../Modified027Editor/ModifiedSpawn';
/** 
* @Author       : MengYao.Zhao
* @Date         : 2022/07/01 11:35:43
* @Description  : 客户端子弹管理,生成，移动，命中
*/

import { Singleton } from "../../../tool/FunctionUtil";
import { InnerBulletData } from "./Bullet";
import { BulletC, CheckBulletHitValid, CheckBulletReboundValid } from "./BulletC";
import { BulletC_Curve } from "./BulletC_Curve";
import { BulletC_Line } from "./BulletC_Line";
import { BulletC_Parabola } from "./BulletC_Parabola";
import BulletC_Trace from "./BulletC_Trace";
import { BulletClass, BulletClientHitData, BulletRpcFun, BulletCreateData, BulletEvents, BulletLaunchData, useReplicatedMode, boxTriggerKey, EBulletType, EBulletHitCalcType } from "./BulletDefine";
import { BulletMgr } from "./BulletMgr";


/**
 *  当开始接收服务器子弹创建RPC时，抛出，用于自由定义子弹在前端用的子弹类 默认将是BulletC_Line,可以通过 extraData去透传信息
 */
export type SetBulletClass = (bulletType: EBulletType) => BulletClass<BulletC>;

/**
 *  客户端需要上报的子弹命中结果，客户端可能有些辅助性的计算结果需要上报
 */
export type CollectBulletHitInfo = (bullet: BulletC, target: mw.GameObject | mw.HitResult) => BulletClientHitData;


@Singleton()
export class BulletMgrC extends BulletMgr<BulletC> {
    static instance: BulletMgrC;

    /**
     * 当开始接收服务器子弹创建RPC时，抛出，用于自由定义子弹在前端用的子弹类 默认将是BulletC_Line,可以通过 extraData去透传信息
     */
    private onSetBulletClass: SetBulletClass = null;


    /**
     * 当子弹命中了目标时，客户端抛出事件供外部计算命中结果 CollectBulletHitInfo的 参数1为子弹逻辑对象 ，参数2为子弹命中的物体或者被射线检查的结果，可能是玩家，AI，物体，其它trigger，子弹如果用的trigger会被排除
     */
    private onCollectBulletHitInfo: CollectBulletHitInfo = null;


    /**
     * 当子弹命中了目标时，客户端抛出事件供外部判断这次命中是否有效的，默认命中是有效的
     */
    private onCheckBulletHitValid: CheckBulletHitValid = null;

    /**
 * 当子弹准备反弹时，客户端抛出事件供外部判断这次反弹是否有效的，默认反弹是有效的
 */
    private onCheckBulletReboundValid: CheckBulletReboundValid = null;


    /**
     * 是否手动的播放子弹特效，如果为true,调用者可以在onCreateEvent抛出时手动对子弹进行模型绑定到Bullet.bulletMode子弹并自动管理开火特效，
     * 调用者可以在onCalcBulletHitResult回调时手动管理命中特效,
     * 如果为false，将使用Odin的特效管理器统一按配置表/透传的信息（优化级比配置表高) 进行特效播放
     */
    protected manualPlayEffect: boolean = false;

    /**
     * 当使用trigger计算命中的这种方式时，标记是否需要校正命中的标准位置，让命中特效位置更标准
     */
    protected adjustHitEffectPos: boolean = true;

    /**
     * 客户端独立模式
     */
    private clientMode: boolean = false;

    /**
     * 客户端已经结束了的子弹，则自己销毁就行
     */
    private deadBullets: BulletC[];

    /**
     * 本地的一些监听事件
     */
    private localListeners: mw.EventListener[];

    /**
     * 缓存一下当前客户端玩家Id
     */
    private currentPlayerId: number;

    /**
     * 间隔帧刷新
     */
    private intervalFrameUpdate: number = 0;


    /**
     * 当子弹命中结果被属性同步时,参数为json结构自定义对象，服务端自定义的
     */
    protected _onReceiveReplicatedResult: mw.Action1<any>;
    public get onReceiveReplicatedResult(): mw.Action1<any> {
        return this._onReceiveReplicatedResult;
    }


    /**
    * 子弹管理器进行初始化 会先执行 _onCheckBulletHitValid做子弹命中有效检测，然后做_onCollectBulletHitInfo命中信息 收集
    * @param staticBulletDatas  静态子弹表数据,传入GameConfig.Bullet.getAllElement()即可
    * @param _onCollectBulletHitInfo    当子弹命中了目标时，客户端抛出事件供外部收集一些数据信息上报服务器提供计算帮助
    * @param _onCheckBulletHitValid   当子弹命中了目标时，子弹不会击中玩家自己和其它子弹，客户端抛出事件供外部判断这次命中是否有效的,方便自定义忽略某些目标，命中是有效的
    * @param _onCheckReboundValid  提供检测反弹是否有效，默认为true
    * @param clientMode 客户端独立模式，默认是服务器发起创建的，如果做纯单机，可以标记为true，将仅在客户端生效
    * @param _onSetBulletClass   当开始接收服务器子弹创建RPC时，抛出，用于自由定义子弹在前端用的子弹类 默认将是BulletC_Line,可以通过 extraData去透传信息
     * @param _manualPlayEffect 是否手动的播放子弹特效，如果为true,调用者可以在onCreateEvent抛出时手动对子弹进行开火特效的管理，调用者可以在onCalcBulletHitResult回调时手动管理命中特效
     *                          如果为false，将使用Odin的特效管理器统一按配置表/透传的信息（优先级比配置表高) 进行特效播放
     * @param _adjustHitEffectPos 当_manualPlayEffect=false,且使用trigger计算命中的这种方式时，标记是否需要校正命中的标准位置，让命中特效位置更标准
    */
    async init(staticBulletDatas: InnerBulletData[],
        _onCollectBulletHitInfo: CollectBulletHitInfo,
        _onCheckBulletHitValid: CheckBulletHitValid = null,
        _onCheckReboundValid: CheckBulletReboundValid = null,
        clientMode: boolean = false,
        _onSetBulletClass: SetBulletClass = null,
        _manualPlayEffect: boolean = false,
        _adjustHitEffectPos: boolean = true,
        intervalFrameUpdate: number = 0) {
        super.init(staticBulletDatas);
        this.deadBullets = [];
        this.localListeners = [];
        this.onCollectBulletHitInfo = _onCollectBulletHitInfo;
        this.onCheckBulletHitValid = _onCheckBulletHitValid;
        this.onCheckBulletReboundValid = _onCheckReboundValid;
        this.onSetBulletClass = _onSetBulletClass;
        this.clientMode = clientMode;
        this.manualPlayEffect = _manualPlayEffect;
        this.adjustHitEffectPos = _adjustHitEffectPos;
        // setInterval(() => {
        //     this.onUpdate(0.05);
        // }, 50);
        mw.TimeUtil.onEnterFrame.add((dt) => {
            if (this.intervalFrameUpdate <= 0) {
                this.onUpdate(dt);
                this.intervalFrameUpdate = intervalFrameUpdate;
            } else {
                this.intervalFrameUpdate -= 1;
            }
        }, this);
        if (!this.clientMode) {
            //注册一些网络事件
            mwext["GameInitializer"]["getService"]("NetManager").registerFun(this.net_CreateBullet, this);
            mwext["GameInitializer"]["getService"]("NetManager").registerFun(this.net_CreateBullets, this);
            if (!useReplicatedMode) {
                mwext["GameInitializer"]["getService"]("NetManager").registerFun(this.net_BulletTakeDamage, this);
                mwext["GameInitializer"]["getService"]("NetManager").registerFun(this.net_onBulletDestroyClient, this);
            }

        }
        this._onReceiveReplicatedResult = new mw.Action1<any>();
        this.createLocalListeners();
        let player = await Player.asyncGetLocalPlayer();
        this.currentPlayerId = player.playerId;

        this.inited = true;
    }

    /** 服务器通知销毁子弹 */
    private net_onBulletDestroyClient(infoStr: string) {
        if (infoStr == "") {
            return;
        }
        let info = JSON.parse(infoStr);
        this.svr_OnDestroyBulletObj(info.id, new mw.Vector(info.hitPos.x, info.hitPos.y, info.hitPos.z));
    }


    /**
     * 创建本地的一些监听事件
     */
    private createLocalListeners() {
        this.localListeners.push(Event.addLocalListener(BulletEvents.ClientBulletHitTarget, (msg: any) => {
            this.OnBulletHit(msg.bullet, msg.target);
        }));

        this.localListeners.push(Event.addLocalListener(BulletEvents.ClientReplicatedResult, (msg: any) => {
            this.OnGotBulletHitResult(msg);
        }));

        this.localListeners.push(
            Event.addLocalListener(BulletEvents.ClientReplicatedDestroy,
                (info: any) => {
                    this.svr_OnDestroyBulletObj(info.id, new mw.Vector(info.hitPos.x, info.hitPos.y, info.hitPos.z));
                }));


    }

    /**
     * 帧驱动
     * @param dt  s
     */
    onUpdate(dt) {
        this._bullets.forEach((bullet, key) => {
            bullet.onUpdate(dt);
            if (bullet.dead) {
                this.deadBullets.push(bullet);
            }
        });
        this.deadBullets.forEach((bullet) => {
            this._bullets.delete(bullet.id);
            this.destroyBullet(bullet);
        });
        this.deadBullets.splice(0, this.deadBullets.length);
    }
    /**
     * 全部直接清理 
     */
    clear() {
        super.clear();

        this.deadBullets.forEach((bullet) => {
            this.destroyBullet(bullet);
        })
        this.deadBullets.length = 0;
    }

    /**
     * 完全销毁 
     */
    destroy() {
        super.destroy();
        this.deadBullets = null;
        this.onSetBulletClass = null;
        this.onCollectBulletHitInfo = null;
        this.onCheckBulletHitValid = null;

        this._onReceiveReplicatedResult = null;
        this.localListeners.forEach((listener) => {
            listener.disconnect();
        })
        this.localListeners = null;
        mw.TimeUtil.onEnterFrame.remove(this.onUpdate, this);
        if (!this.clientMode) {
            //清理一些网络事件
            mwext["GameInitializer"]["getService"]("NetManager").unRegisterFun(this.net_CreateBullet);
            mwext["GameInitializer"]["getService"]("NetManager").unRegisterObj(this.net_CreateBullets);
            mwext["GameInitializer"]["getService"]("NetManager").unRegisterObj(this.net_BulletTakeDamage);
        }
        mwext.GameObjPool.clearAll();
        BulletMgrC.instance = null;
    }



    /**
     * 销毁子弹  
     */
    protected destroyBullet(bullet: BulletC) {
        // oTrace("BulletManagerC,destroyBullet ");
        let resSet = bullet.recycleResource();
        if (resSet) {
            if (resSet.trigger != null)
                this.returnBulletTrigger(resSet.trigger);
            if (resSet.res != null)
                this.returnBulletEntry(resSet.res);
        }
        if (!this.clientMode && bullet.hostPlayerId == this.currentPlayerId) {
            //上报客户端自己管理的子弹死亡了

            // 处理单端子弹 

            let extraData = bullet.launchData.extraData;

            if (extraData && extraData.isClient == null) {
                let pos = { x: 0, y: 0, z: 0 };
                if (bullet.hitPos) {
                    pos.x = bullet.hitPos.x;
                    pos.y = bullet.hitPos.y;
                    pos.z = bullet.hitPos.z;
                } else {
                    pos.x = bullet.bulletObj.worldTransform.position.x;
                    pos.y = bullet.bulletObj.worldTransform.position.y;
                    pos.z = bullet.bulletObj.worldTransform.position.z;
                }
                mwext["GameInitializer"]["getService"]("NetManager").callServerFun(BulletRpcFun.net_OnBulletDestroy, bullet.id, pos);
            }

        }
        super.destroyBullet(bullet);
        bullet.onDestroy();
    }

    /**
     * 服务器端通知销毁子弹
     * @param bulletId 
     * @param hitPos 
     */
    public svr_OnDestroyBulletObj(bulletId: number, hitPos: mw.Vector) {
        let bullet = this.findBullet(bulletId);
        if (bullet == null) return;
        bullet.hitPos = hitPos;
        bullet.bulletObj.worldTransform.position = hitPos;
        this.PlayHitEffect(bullet);
        bullet.markDead();
    }

    /**
     * 前后端自行获取自己的子弹实体
     * @param guidKey  子弹实体的guid      
     * @returns 
     */
    private async getBulletEntry(guidKey: string): Promise<mw.GameObject> {
        if (guidKey == "")
            return null;

        let obj = await SpawnManager.modifyPoolAsyncSpawn(guidKey);
        if (obj instanceof mw.Effect) {
            let effect = obj;
            effect.loop = true;
            effect.play();
        }
        obj.setVisibility(mw.PropertyStatus.Off);
        return obj;
    }

    /**
     *  前端自行返还自己的子弹实体 hook
     * @param bulletEntry   mw.GameObject 子弹实体
     * @returns 
     */
    private returnBulletEntry(bulletEntry: mw.GameObject) {
        if (!bulletEntry)
            return;
        bulletEntry.parent = null;
        bulletEntry.setVisibility(mw.PropertyStatus.Off);
        bulletEntry.worldTransform.position = new mw.Vector(-100000, -100000, -100000);
        mwext.GameObjPool.despawn(bulletEntry);

        this.setBulletEffectStop(bulletEntry);
    }

    // 设置子弹特效
    private setBulletEffectStop(bulletObj: mw.GameObject) {
        let child = bulletObj.getChildren();
        for (let index = 0; index < child.length; index++) {
            const element = child[index];

            if (element instanceof mw.Effect) {
                element.stop();
                setTimeout(() => {
                    element.loop = true
                    element.play();
                }, 0);
            }

            this.setBulletEffectStop(element);
        }
    }


    /**
     * 前端自行获取子弹用的trigger
     * @param 
     * @returns 
     */
    private async getBulletTrigger(): Promise<mw.Trigger> {
        let trigger = await SpawnManager.modifyPoolAsyncSpawn(boxTriggerKey) as mw.Trigger;
        trigger.setVisibility(mw.PropertyStatus.Off);
        return trigger;
    }

    /**
     *  前端返还自己的子弹trigger hook
     * @param bulletTrigger   mw.Trigger 子弹trigger
     * @returns 
     */
    private returnBulletTrigger(bulletTrigger: mw.Trigger) {
        if (!bulletTrigger)
            return;
        bulletTrigger.parent = null;
        bulletTrigger.setVisibility(mw.PropertyStatus.Off);
        bulletTrigger.worldTransform.position = new mw.Vector(-100000, -100000, -100000);
        mwext.GameObjPool.despawn(bulletTrigger);
    }


    /**
     * 初始化子弹模型  hook
     * @param bullet 初始化的子弹对象      
     * @returns 子弹对象
     */
    protected async initBulletMode(bullet: BulletC) {

        //生成子弹模型和trigger
        let modeGuid: string = null;
        let modeScale: mw.Vector = mw.Vector.one;

        if (bullet.staticConfig) {
            modeGuid = bullet.staticConfig.flyEffectGuid;
            if (bullet.staticConfig.flyEffectScale && Array.isArray(bullet.staticConfig.flyEffectScale))
                modeScale = new mw.Vector(bullet.staticConfig.flyEffectScale[0], bullet.staticConfig.flyEffectScale[1], bullet.staticConfig.flyEffectScale[2]);
        }
        if (modeGuid) {
            //获取子弹的模型
            let bulletGo = await this.getBulletEntry(modeGuid);
            bulletGo.worldTransform.position = bullet.launchPos;

            mw.Vector.subtract(bullet.targetPos, bullet.launchPos, this.tmpVector);
            let endRotation = this.tmpVector.toRotation();
            // 根据表修改下X轴旋转 避免多次创建预制体 进行差异化
            endRotation.x = bullet.staticConfig.flyRelativeRot.x;
            bulletGo.worldTransform.rotation = endRotation;// bullet.targetPos.clone().subtract(bullet.launchPos).toRotation();
            bulletGo.worldTransform.scale = modeScale;
            //  oTrace("get bullet go : name: " + bulletGo.name + "  bulletGoGuid: " + modeGuid + " pos: " + bullet.launchPos + " scale: " + modeScale);
            await bullet.initBulletMode(bulletGo);
            if (bullet.hostPlayerId == Player.localPlayer.playerId) {
                let trigger = null;
                if (bullet.detectionType == EBulletHitCalcType.Trigger)
                    trigger = await this.getBulletTrigger();

                bullet.initHitDetector({
                    trigger: trigger, checkFun: (bullet: BulletC, target: mw.GameObject | mw.HitResult) => {
                        if (!this.onCheckBulletHitValid)
                            return true;
                        return this.onCheckBulletHitValid(bullet, target);
                    },
                    checkReboundFun: (bullet: BulletC, target: mw.HitResult) => {
                        if (!this.onCheckBulletReboundValid)
                            return true;
                        return this.onCheckBulletReboundValid(bullet, target);
                    },
                });
            }

        }
        else {
            console.error("生成子弹需要配置子弹模型,配置id为: " + bullet.launchData.configId);
        }

        bullet.initOver();

        //获取客户端的模型，如果非手动管理
        if (!this.manualPlayEffect) {
            this.PlayFireEffect(bullet);
        }
    }


    /**
     * 内部播放开火特效
     * @param bullet 
     */
    private async PlayFireEffect(bullet: BulletC) {
        if (bullet.staticConfig) {
            //在开火位置播放开火特效
            let fireEffectGuid: string = bullet.staticConfig.fireEffectGuid;
            let loopNum = 1;//开火特效播放循环次数 
            let fireEffectScale: mw.Vector = mw.Vector.one; //开火特效默认播放缩放

            if (fireEffectGuid && fireEffectGuid != "") {
                //取特效配置循环次数 
                if (bullet.staticConfig.fireEffectLoop > 0)
                    loopNum = bullet.staticConfig.fireEffectLoop
                //取特效配置缩放 
                if (bullet.staticConfig.fireEffectScale && Array.isArray(bullet.staticConfig.fireEffectScale))
                    fireEffectScale = new mw.Vector(bullet.staticConfig.fireEffectScale[0], bullet.staticConfig.fireEffectScale[1], bullet.staticConfig.fireEffectScale[2]);

                //  oTrace("PlayFire Effect: fireEffectGuid: " + fireEffectGuid + " launchPos: " + bullet.launchData.launchPos + " loopNum: " + loopNum + " fireEffectScale: " + fireEffectScale);
                let rot = bullet.targetPos.clone().subtract(bullet.launchPos).toRotation();
                if (bullet instanceof BulletC_Parabola)
                    rot = bullet.path[1].clone().subtract(bullet.path[0]).toRotation();
                //EffectManager.instance.playEffectInPos(fireEffectGuid, bullet.launchData.launchPos, loopNum, rot, fireEffectScale);
                if (bullet.staticConfig.fireSoundGuid) {
                    try {
                        let soundId = mw.SoundService.play3DSound(bullet.staticConfig.fireSoundGuid, bullet.launchData.launchPos, 1, bullet.staticConfig.fireSoundVolume);
                        mw.TimeUtil.delaySecond(3).then(() => {
                            mw.SoundService.stop3DSound(soundId);
                        })
                    } catch (error) {
                        console.error(`TypeError-(${bullet.staticConfig.fireSoundGuid}):`, error)
                    }
                }
            }
        }
    }

    /**
     * 内部播放命中特效
     * @param bullet 
     */
    private PlayHitEffect(bullet: BulletC) {
        if (bullet.staticConfig) {
            //在命中位置播放受击特效
            let hitEffectGuid: string = bullet.staticConfig.hitEffectGuid;
            let loopNum = 1;//命中特效播放循环次数 
            let hitEffectScale: mw.Vector = mw.Vector.one; //命中特效默认播放缩放

            if (hitEffectGuid && hitEffectGuid != "") {
                //取特效配置循环次数 
                if (bullet.staticConfig.hitEffectLoop > 0)
                    loopNum = bullet.staticConfig.hitEffectLoop
                //取特效配置缩放 
                if (bullet.staticConfig.hitEffectScale && Array.isArray(bullet.staticConfig.hitEffectScale))
                    hitEffectScale = new mw.Vector(bullet.staticConfig.hitEffectScale[0], bullet.staticConfig.hitEffectScale[1], bullet.staticConfig.hitEffectScale[2]);

                //oTrace("PlayFire Effect: hitEffectGuid: " + hitEffectGuid + " bullet.hitPos: " + bullet.hitPos);
                //EffectManager.instance.playEffectInPos(hitEffectGuid, bullet.hitPos, loopNum, null, hitEffectScale);
            }
        }
    }

    /**
     * 当子弹创建后 hook
     */
    protected afterCreatedBullet(bullet: BulletC | BulletC[]) {
        if (Array.isArray(bullet)) {
            bullet.forEach((tBullet) => {
                super.setupBulletDestroyTimer(tBullet);
            })
        }
        else {
            super.setupBulletDestroyTimer(bullet);
        }
    }

    /**
     * 转换接收的子弹发射数据给生成结构
     * @param createData 创建数据
     * @returns 
     */
    private convertCreateData2LaunchData(createData: BulletCreateData): BulletLaunchData {
        let data: BulletLaunchData = {
            atkerIsPlayer: createData.atkerIsPlayer,
            playerId: createData.pid,
            configId: createData.cfgId,
            bulletType: createData.bt,
            launchPos: new mw.Vector(createData.f[0], createData.f[1], createData.f[2]),
            targetPos: new mw.Vector(createData.t[0], createData.t[1], createData.t[2])
        }

        data.speed = createData.spd == undefined ? null : createData.spd;
        data.penetrateCount = createData.pc == undefined ? null : createData.pc;
        data.splitCount = createData.sc == undefined ? null : createData.sc;
        data.splitAngle = createData.sa == undefined ? null : createData.sa;
        data.reboundCount = createData.rc == undefined ? null : createData.rc;
        data.heightScale = createData.hs == undefined ? null : createData.hs;
        data.traceTargetGuid = createData.tt == undefined ? null : createData.tt;

        data.extraData = createData.ed == undefined ? null : createData.ed;

        return data;
    }

    /**
     * 根据子弹类型获取默认的子弹类
     * @param bulletType  BulletClass<BulletC>
     * @returns 
     */
    private getBulletClass(bulletType: EBulletType): BulletClass<BulletC> {
        let cls: BulletClass<BulletC> = BulletC_Line;
        switch (bulletType) {
            case EBulletType.Parabola:
                cls = BulletC_Parabola;
                break;
            case EBulletType.Trace:
                cls = BulletC_Trace;
                break;
            case EBulletType.Curve:
                cls = BulletC_Curve;
                break;
        }
        return cls;
    }


    /**
    *客户端创建一个子弹对象
    * @param launchData 发射用的数据集
    * @param bulletClass 创建的bulletClass     
    * @returns 子弹对象集合，可能有分裂子弹
    */
    async createBullet(launchData: BulletLaunchData, bulletClass: BulletClass<BulletC> = BulletC_Line): Promise<BulletC | BulletC[]> {
        if (launchData.bulletType == undefined || launchData.bulletType == null || launchData.bulletType == EBulletType.Logic)
            launchData.bulletType = EBulletType.Line;
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

        if (bulletClass == BulletC_Line) {
            launchData.bulletType = staticConfig.bulletType;
            bulletClass = this.getBulletClass(launchData.bulletType);
        }

        //创建可能的分裂子弹
        if (splitCount > 0) {
            let launchDatas = this.calcSplitBullet(launchData, splitCount, splitAngle);
            let bulletClasses = [];

            launchDatas.forEach((ld) => {
                bulletClasses.push(bulletClass);
            })
            let bullets = this.createBullets(launchDatas, bulletClasses);
            return bullets;
        }

        bulletClass = this.getBulletClass(launchData.bulletType);
        return this.innerCreateBullet(launchData, bulletClass, true);
    }

    /**
     * 创建一批子弹对象 ,前两个参数长度一致，数据内容一一对应   服务器创建后自动调用，如果用于独立客户端， 可以手动调用 
     * @param launchDatas 发射用的数据集
     * @param bulletClsses 创建的bulletClass   
     * @param guids 子弹id,如果提供了表示是客户端在创建   
     * @returns 子弹对象列表
     */
    private onCreateBullets(launchDatas: BulletLaunchData[], bulletClsses: BulletClass<BulletC>[], guids: number[]) {
        super.createBullets(launchDatas, bulletClsses, guids);
    }

    /**
    * 响应服务器创建一个子弹对象
    * @param launchData 发射用的数据集
    * @param bulletClass 创建的bulletClass       
    * @param guid 子弹id   
    * @returns 子弹对象集合，可能有分裂子弹
    */
    private onCreateBullet(launchData: BulletLaunchData, bulletClass: BulletClass<BulletC> = BulletC_Line, guid: number) {
        super.innerCreateBullet(launchData, bulletClass, true, guid);
    }

    //////////////////////////////////////////Local Events////////////////////
    /**
     * 当子弹命中了一个物体时
     * @param bullet 子弹
     * @param target 目标物体或者射线检测到的结果
     */
    private async OnBulletHit(bullet: BulletC, target: mw.GameObject | mw.HitResult) {
        // oTrace("子弹击了物体，子弹的击中次数: " + bullet.hitCount);
        //播放内置命中特效
        if (!this.manualPlayEffect) {
            this.PlayHitEffect(bullet);
        }

        //抛出
        let calcResult = this.onCollectBulletHitInfo(bullet, target);

        // 如果返回为空 不上报
        if (calcResult == null) {
            return;
        }

        if (!this.clientMode && bullet.hostPlayerId == this.currentPlayerId) {
            //上报客户端自己管理的子弹命中结果
            // oTrace("命中了，需要上报了 calcResult: " + JSON.stringify(calcResult));
            mwext["GameInitializer"]["getService"]("NetManager").callServerFun(BulletRpcFun.net_OnBulletHit, { id: bullet.id, hitCount: bullet.hitCount, hitInfo: calcResult });
        }

    }

    /**
     * 当收到属性同步的子弹命中结果时
     * @param msg json 对象结构      
     */
    private OnGotBulletHitResult(msg: any) {
        this._onReceiveReplicatedResult.call(msg);
    }


    ///////////////////////////////////////////////////////////////////////////



    /////////////////////////////////////////////RPC/////////////////////////
    /**
     * 创建了一颗子弹 网络通信函数
     * @param param BulletCreateData结构
     */
    net_CreateBullet(param: BulletCreateData) {
        if (!this.inited || this.clientMode)
            return;
        //  oTrace("net_CreateBullet: param: " + JSON.stringify(param));
        let launchData: BulletLaunchData = this.convertCreateData2LaunchData(param);
        let bulletClass: BulletClass<BulletC> = BulletC_Line;
        if (this.onSetBulletClass) {
            bulletClass = this.onSetBulletClass(launchData.bulletType);
        }
        else
            bulletClass = this.getBulletClass(launchData.bulletType);

        launchData.playerId = param.pid;
        this.onCreateBullet(launchData, bulletClass, param.id);
    }

    /**
     * 创建了一批子弹 网络通信函数
     * @param param BulletCreateData结构
     */
    net_CreateBullets(param: BulletCreateData[]) {
        if (!this.inited || this.clientMode)
            return;
        // oTrace("net_CreateBullets: param: " + JSON.stringify(param));

        let launchDatas = [];
        let bulletClasses = [];
        let guids = [];
        param.forEach((bc) => {
            let launchData: BulletLaunchData = this.convertCreateData2LaunchData(bc);
            let bulletClass: BulletClass<BulletC> = BulletC_Line;
            if (this.onSetBulletClass) {
                bulletClass = this.onSetBulletClass(launchData.bulletType);
            }
            else
                bulletClass = this.getBulletClass(launchData.bulletType);
            launchData.playerId = bc.pid;
            launchDatas.push(launchData);
            bulletClasses.push(bulletClass);
            guids.push(bc.id);
        })

        this.onCreateBullets(launchDatas, bulletClasses, guids);

    }
    /**
     * 子弹伤害的结果
     * @param msg 基础的json对象
     */
    net_BulletTakeDamage(msg: any) {
        if (!this.inited || this.clientMode)
            return;
        this._onReceiveReplicatedResult.call(msg);
    }

    ///////////////////////////////////////////end///////////////////////////////

}