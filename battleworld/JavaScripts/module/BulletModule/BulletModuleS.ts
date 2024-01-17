import { BulletModuleC } from "./BulletModuleC";
import { Edit_BulletDataManager } from "../../editors/bulletEditor/Edit_BulletDataManager";
import { EBulletEvents_S, EModule_Events_S } from "../../const/Enum";
import { MotionFrameNode_FlyEntity } from "../../editors/motionEditor/MotionFrameNodeBase";
import { PlayerModuleS, THurtData } from "../PlayerModule/PlayerModuleS";
import { Globaldata } from "../../const/Globaldata";
import { EventManager } from "../../tool/EventManager";
import { Bullet } from "./bullet/Bullet";
import { BulletServerHitData, BulletLaunchData, setUseCachedMode } from "./bullet/BulletDefine";
import { BulletMgrS } from "./bullet/BulletMgrS";

export interface IBulletHitReulst {
    /**释放子弹的对象id */
    fireId: number;
    /**子弹击中的目标id */
    targetId: number;
    isEnergyShield: boolean;
}

export class BulletModuleS extends ModuleS<BulletModuleC, null>
{

    // private mUnit: SceneUnitModuleS = null;

    protected onStart(): void {

        // this.mUnit = ModuleService.getModule(SceneUnitModuleS);

        // 子弹配置数据初始化
        Edit_BulletDataManager.instance.init();

        // k开启使用对象池
        setUseCachedMode(true);

        //服务端使用子弹配置表进行初始化
        BulletMgrS.instance.init(Edit_BulletDataManager.instance._bulletDatas, (reportData: BulletServerHitData) => {
            //把客户端上报的命中情况进行检验，并进行伤害计算，把需要同步的结果信息以json对象反回去
            //TODO 示例
            return { pos: mw.Vector.zero, damage: 50 };
        });

        //监听子弹创建了
        BulletMgrS.instance.onCreateEvent.add((bullet: Bullet) => {
            //oTrace("子弹创建了: bullet id: " + bullet.id)
        })

        //监听子弹销毁了
        BulletMgrS.instance.onDestroyvent.add((bullet: Bullet) => {
            //oTrace("子弹销毁了: bullet id: " + bullet.id)
        })

        BulletMgrS.instance.onHitEvent.add(this.listen_hitEvent, (this));

        // 监听技能释放子弹
        EventManager.instance.add(EModule_Events_S.skill_fireBullet, this.listen_fireBullet.bind(this));
        // 子弹格挡反弹
        EventManager.instance.add(EBulletEvents_S.bullet_define_s, this.listen_defineBullet.bind(this));

    }

    private listen_defineBullet(pId: number, realFireId: number,
        motionId: number, bulletId: number, atkerIsPlayer: boolean,
        launchPos: mw.Vector, targetPos: mw.Vector, to: string) {

        let bullet = BulletMgrS.instance.findBullet(bulletId);
        if (bullet == null) {
            return;
        }

        let bulletCfgId = bullet.staticConfig.id;

        Globaldata.tmpVector.x = 0;
        Globaldata.tmpVector.y = 0;
        Globaldata.tmpVector.z = 0;

        BulletMgrS.instance.net_OnBulletDestroy(bulletId, Globaldata.tmpVector, true);

        setTimeout(() => {
            this.shootBullet(pId, realFireId, 0, 0, bulletCfgId, atkerIsPlayer, launchPos,
                targetPos, to);
        }, 250);
    }


    // { id: bullet.id, hitCount: bullet.hitCount, hitInfo: calcResult }
    private listen_hitEvent(bullet: Bullet, result: IBulletHitReulst) {

        //oTrace("子弹命中回调: bullet id:___________ " + bullet.id + "  hitInfo: " + JSON.stringify(result))

        // 子弹命中回调，数据可能为空：比如 击中墙壁等
        if (result == null) {
            return;
        }

        if (result.isEnergyShield) {
            //oTrace("子弹命中回调: 子弹击中能量盾___________")
            BulletMgrS.instance.destroyBullet(bullet);
            return;
        }

        // // 发射子弹的是npc
        // let unit = this.mUnit.getSceneUnitByID(result.fireId);
        // if (unit) {
        //     let player = Player.getPlayer(result.targetId);
        //     if (player) {
        //         ModuleService.getModule(PlayerModuleS)
        //             .test_HurtPlayerByMotion(result.fireId, result.targetId, 0, bullet.id);
        //     }
        // }

        // 如果发射的是玩家
        let player = Player.getPlayer(result.fireId);
        if (player) {
            // let unit = this.mUnit.getSceneUnitByID(result.targetId);
            // if (unit) {

            //     let bulletCfg = GameConfig.Bullet.getElement(bullet.staticConfig.id);

            //     EventManager.instance.call(EUnitEvents_S.unit_bulletHit, result.fireId, result.targetId, bulletCfg.Dmg);
            // }
            // else {
            // 打中npc
            if (result.targetId < 0) {
                let hurtData: THurtData = {
                    bulletId: bullet.id,
                    skillId: bullet.launchData.extraData.skillId,
                }
                EventManager.instance.call(EModule_Events_S.sceneUnit_beAttack, result.fireId, [result.targetId], hurtData);
            }
            // 打中玩家
            else {
                let targetPlayer = Player.getPlayer(result.targetId);
                if (targetPlayer) {

                    let hurtData: THurtData = {
                        bulletId: bullet.id,
                        skillId: bullet.launchData.extraData.skillId,
                    }
                    ModuleService.getModule(PlayerModuleS)
                        .test_HurtPlayerByMotion(result.fireId, result.targetId, hurtData);
                }
            }
        }

    }

    /**监听npc发射子弹 */
    private listen_fireBullet(sceneId: number, motionId: number, sheet: MotionFrameNode_FlyEntity, to: undefined) {

        // // 子弹逻辑是在客户端计算的 

        // let player = Player.getPlayer(to);
        // if (player == null) {
        //     return;
        // }

        // let unit = this.mUnit.getSceneUnitByID(sceneId);
        // if (unit == null) {
        //     return;
        // }

        // if (unit.isReady == false) {
        //     return;
        // }

        // // 约定最短子弹飞行距离
        // let bulletCfg = GameConfig.Bullet.getElement(sheet.bulletId);
        // let bulletFlyDis = bulletCfg.speed * bulletCfg.delayDestroy;
        // if (bulletFlyDis < Globaldata.bulletMinDistance) {
        //     bulletFlyDis = Globaldata.bulletMinDistance;
        // }

        // mw.Vector.multiply(unit.model.localTransform.getForwardVector(), sheet.startLoc.x, Globaldata.tmpVector);

        // let startLoc = unit.modelLocaction.clone();
        // startLoc.z += sheet.startLoc.z;

        // mw.Vector.add(startLoc, Globaldata.tmpVector, Globaldata.tmpVector);

        // mw.Vector.multiply(unit.model.localTransform.getForwardVector(), bulletFlyDis, Globaldata.tmpVector1);
        // mw.Vector.add(startLoc, Globaldata.tmpVector1, Globaldata.tmpVector1);

        // this.shootBullet(to, sceneId, motionId, sheet.bulletId, false, Globaldata.tmpVector, Globaldata.tmpVector1, to)
    }



    /**
     * 发射技能子弹
     * @param motionId motionid
     * @param bulletId 子弹id
     * @param startLoc 子弹相对于发射者起始位置
     * @param endType 子弹结束位置计算方式
     * @param to 目标id
     */
    @Decorator.noReply()
    public net_fireSkillBullet(skillId: number, motionId: number, bulletId: number,
        startLoc: mw.Vector, endLoc: mw.Vector, to: string) {

        this.shootBullet(this.currentPlayerId, this.currentPlayerId, skillId, motionId, bulletId, true, startLoc, endLoc, to)
    }

    /**测试使用的子弹发射接口 */
    public gm_fireSkillBullet(player: mw.Player, bulletId: number) {

        let pId = player.playerId;

        let startLoc = player.character.localTransform.transformPosition(new mw.Vector(100, 0, 0));
        let endLoc = player.character.localTransform.transformPosition(new mw.Vector(2000, 0, 0));

        this.shootBullet(pId, pId, 0, 0, bulletId, false, startLoc, endLoc, null)
    }



    /**
     * 发射子弹
     * @param pId 发射玩家id 用于标记子弹
     * @param realFireId 真实发射子弹的 fireid 可能是npc 但是 npc逻辑需要在某个客户端去计算
     * @param motionId 
     * @param bulletId 
     * @param atkerIsPlayer 
     * @param launchPos 
     * @param targetPos 
     * @param to 
     */
    public async shootBullet(pId: number, realFireId: number,
        skillId: number,
        motionId: number, bulletId: number, atkerIsPlayer: boolean,
        launchPos: mw.Vector, targetPos: mw.Vector, to: string) {

        let launchData: BulletLaunchData = {
            atkerIsPlayer: atkerIsPlayer,
            playerId: pId,
            launchPos: launchPos,
            targetPos: targetPos,
            configId: bulletId,
            traceTargetGuid: to,//跟踪子弹需要目标的guid

            extraData: {
                // 真实释放这个子弹的玩家id
                realFireId: realFireId,
                // 这个子弹由哪个技能释放出来的
                skillId: skillId,
            }

        }
        await BulletMgrS.instance.createBullet(launchData);
    }


}