import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { BulletModuleS, IBulletHitReulst } from "./BulletModuleS";
import { oTraceError } from "odin";
import { EAreaId, EBulletEvents_C, EModule_Events, EPlayerEvents_C, ESkillTargetType } from "../../const/Enum";
import { MotionFrameNode_FlyEntity, MotionFrameNode_SkillRect } from "../../editors/motionEditor/MotionFrameNodeBase";
import { Edit_BulletDataManager } from "../../editors/bulletEditor/Edit_BulletDataManager";
import { Globaldata } from "../../const/Globaldata";
import { EventManager } from "../../tool/EventManager";
import { EnergyShieldC } from "../buffModule/Buff/CustomBuff/EnergyShieldBuff";
import { BulletC } from "./bullet/BulletC";
import { BulletMgrC } from "./bullet/BulletMgrC";
import { GameConfig } from "../../config/GameConfig";
import { BulletLaunchData } from "./bullet/BulletDefine";
import { BulletMgrS } from "./bullet/BulletMgrS";
import { AreaIntersect } from "../MotionModule/motionBase/AreaIntersect";
import { EFrameNodeType } from "../../editors/motionEditor/MontionEnum";
import { Constants } from "../../tool/Constants";
import { util } from "../../tool/Utils";
import { MotionUtil } from "../MotionModule/MotionUtil";
import { BulletC_Curve } from "./bullet/BulletC_Curve";
import { AreaModuleC } from '../AreaModule/AreaModuleC';
import { MascotModuleC } from '../npc/mascotNpc/MascotModuleC';
import SceneUnit from '../npc/SceneUnit';
import { UnitManager } from '../npc/UnitManager';

export class BulletModuleC extends ModuleC<BulletModuleS, null>
{

    private mArea: AreaModuleC = null;

    protected onStart(): void {

        this.mArea = ModuleService.getModule(AreaModuleC);


        Edit_BulletDataManager.instance.init();

        //客户端使用子弹配置表进行初始化，子弹会先进行命中过滤，然后进行命中数据收集,再次是会上报这些命中数据
        BulletMgrC.instance.init(Edit_BulletDataManager.instance._bulletDatas,
            this.listen_skillCollision.bind(this),
            this.listen_hitValid.bind(this));

        //监听子弹创建了
        BulletMgrC.instance.onCreateEvent.add((bullet: BulletC) => {
            if (bullet.bulletObj) {
                this.setBulletEffect(bullet.bulletObj, true);
            }
        })

        //监听子弹销毁了
        BulletMgrC.instance.onDestroyvent.add((bullet: BulletC) => {
            //oTrace("子弹销毁了: bullet id: " + bullet.id)
        })

        //监听子弹命中后的属性同步的结果，客户端自行去做后续表现  刘焕强——这里回调目前用不到，代码屏蔽服务器不会下发了 
        // BulletMgrC.instance.onReceiveReplicatedResult.add((msg: any) => {
        //     //oTrace("子弹命中后的属性同步过来了,msg: " + JSON.stringify(msg));
        // });


        EventManager.instance.add(EModule_Events.skill_fireBullet, this.listen_skill_fireBullet.bind(this));

        // 监听技能释放子弹
        EventManager.instance.add(EBulletEvents_C.bullet_npc_fireBullet_c, this.listen_npc_fireBullet.bind(this));

        // 监听技能释放子弹
        EventManager.instance.add(EBulletEvents_C.bullet_bomb_c, this.listen_bulletBomb.bind(this));
    }

    private listen_bulletBomb(bullet: BulletC) {
        this.check_hitBomb(bullet, false);
    }

    /**子弹 */
    private listen_hitValid(bullet: BulletC, target: mw.GameObject | mw.HitResult) {
        // 判断哪些碰撞算有效命中(碰撞)

        let hitTarget: mw.GameObject = null;
        if (target instanceof mw.HitResult) {
            hitTarget = target.gameObject;
        } else {
            hitTarget = target;
        }

        if (hitTarget == null) {
            return false;
        }

        let extraData = bullet.launchData.extraData;

        let readlFireId = extraData.realFireId;
        let configId = bullet.launchData.configId;

        //能量盾 EnergyShieldScale 常数距离
        if (target instanceof mw.GameObject && target.tag == EnergyShieldC.EnergyShieldTag) {

            this.check_hitBomb(bullet, true);

            BulletMgrC.instance.svr_OnDestroyBulletObj(bullet.id, bullet.bulletObj.worldTransform.position);
            return false
        }

        // 判断玩家所在区域
        if (this.mArea.curAreaId != EAreaId.Battle) {
            return false;
        }

        // 自己发射的 
        if (readlFireId == this.localPlayerId) {

            let isValid = this.filter_selfFire(readlFireId, hitTarget, configId);

            // 命中有效
            if (isValid) {
                this.check_hitBomb(bullet, false);
            }

            return isValid;
        }

        if (PlayerManagerExtesion.isCharacter(hitTarget)
            && hitTarget.player.playerId == this.localPlayerId) {

            let isValid = this.filter_unitFire_player(readlFireId, hitTarget, configId);
            // 命中有效
            if (isValid) {
                this.check_hitBomb(bullet, true);
            }
            return isValid;
        }

        return false;
    }


    // 设置子弹特效
    private setBulletEffect(bulletObj: mw.GameObject, isRoot: boolean = false) {
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

            this.setBulletEffect(element);
        }
    }

    /**监听碰撞回调 */
    private listen_skillCollision(bullet: BulletC, target: mw.GameObject | mw.HitResult) {
        //监听子弹命中了 收集一些能用于服务器方便验证和计算的信息以json对象反回  、、也可以在这里做预计算命中伤害结果这些,可以做预表现,可以自己做命中特效

        // 特殊子弹火炮类型的子弹不需要计算伤害  通过爆炸范围去进行伤害计算
        if (bullet.staticConfig.hitBombId > 0) {
            return;
        }

        let extraData = bullet.launchData.extraData;

        let readlFireId = extraData.realFireId;

        let hitTarget: mw.GameObject = null;
        if (target instanceof mw.HitResult) {
            hitTarget = target.gameObject;
        } else {
            hitTarget = target;
        }


        if (hitTarget == null) {
            return null;
        }

        let targetId = null;

        if (PlayerManagerExtesion.isCharacter(hitTarget)) {
            targetId = hitTarget.player.playerId;
        } else {
            targetId = Number(hitTarget.tag);
        }

        if (targetId == null) {
            return null;
        }


        let data: IBulletHitReulst = {
            fireId: readlFireId,
            targetId: targetId,
            isEnergyShield: false
        }

        return data;
    }


    /**
     * 筛选玩家攻击
     * @param hitTarget 
     * @param readlFireId 
     * @returns 
     */
    private filter_selfFire(readlFireId: number, hitTarget: mw.GameObject, configId: number) {
        if (PlayerManagerExtesion.isCharacter(hitTarget)) {
            return this.filter_selfFire_player(readlFireId, hitTarget, configId);
        }

        return this.filter_selfFire_unit(readlFireId, hitTarget, configId);

    }

    /**筛选自己攻击其它玩家 */
    private filter_selfFire_player(readlFireId: number, hitTarget: mw.Character, configId: number) {

        let bulletCfg = GameConfig.Bullet.getElement(configId);
        if (bulletCfg == null) return false;
        let motionEffectCfg = GameConfig.MotionEffect.getElement(bulletCfg.Dmg);
        if (motionEffectCfg == null) return false;

        //检测玩家是否在当前区域 
        if (hitTarget.player) {
            let players = MotionUtil.getCurAreaPlayers();
            if (players.includes(hitTarget.player) == false) {
                return false;
            }
        }

        let targetIId = hitTarget.player.playerId;

        switch (motionEffectCfg.targetType) {
            case ESkillTargetType.self:
                {
                    return targetIId == readlFireId;
                }
                break;
            case ESkillTargetType.exceptSelfOthers:
                {

                    if (readlFireId == targetIId) {
                        return false;
                    }
                    return true;
                }
                break;
            case ESkillTargetType.teamAndSelf:
                {
                    return targetIId == readlFireId;
                }
                break;
            case ESkillTargetType.teamNoSelf:
                {
                    return targetIId != readlFireId;
                }
                break;
            case ESkillTargetType.all:
                {

                    return true;
                }
                break;
            default:
                break;
        }


    }

    /**筛选自己攻击其它npc */
    private filter_selfFire_unit(readlFireId: number, hitTarget: mw.GameObject, configId: number) {
        let unitArr = UnitManager.instance.getAllUnit();
        if (unitArr.length == 0) return false;
        for (let i = 0; i < unitArr.length; i++) {
            if (unitArr[i].getUnitId().toString() == hitTarget.tag) {
                return true;
            }
        }

        return false;
    }

    /**筛选npc攻击自己 */
    private filter_unitFire_player(readlFireId: number, hitTarget: mw.Character, configId: number) {
        // let unit = this.mUnit.getSceneUnit(readlFireId);

        // if (unit == null) {
        //     return false;
        // }

        // if (hitTarget.player.playerId != this.localPlayerId) {
        //     return false;
        // }

        // if (GlobalWorld.worldType == EWorldType.world1) {
        //     if (this.mArenas.isPlayerInArenas() == false) {
        //         return true;
        //     }
        //     if (this.mArenas.isSettle) {
        //         return false;
        //     }
        //     let targetIId = hitTarget.player.playerId;
        //     if (this.mArenas.isInSafeArea(targetIId)) {
        //         return false;
        //     }
        //     let isSameTeam = this.mArenas.isInSameTeam2(readlFireId, targetIId);
        //     if (isSameTeam) {
        //         return false;
        //     }
        // }

        // if (GlobalWorld.worldType == EWorldType.world2) {
        //     return true;
        // }

        return true;
    }



    /**
     * 检测爆炸
     * @param bullet 子弹对象
     * @param simulate 是否模拟 不是自己发射的就是模拟
     * @returns 
     */
    private check_hitBomb(bullet: BulletC, simulate: boolean) {
        if (bullet.staticConfig.hitBombId == null
            || bullet.staticConfig.hitBombId <= 0) {
            return;
        }

        // 曲线子弹才会触发爆炸
        if ((bullet instanceof BulletC_Curve) == false) {
            return;
        }

        let curveBullet = bullet as BulletC_Curve;
        if (curveBullet.getIsHitBomb()) {
            return;
        }


        let bulletCfg = GameConfig.Bullet.getElement(bullet.staticConfig.id);
        if (bulletCfg == null) {
            console.error("check_hitBomb bulletCfg==null ", bullet.staticConfig.id);
            return;
        }

        let bombCfg = GameConfig.BulletBomb.getElement(bulletCfg.hitBombId);
        if (bombCfg == null) {
            console.error("check_hitBomb bombCfg==null ", bulletCfg.hitBombId);
            return;
        }
        // 设定为爆炸过了
        curveBullet.setIsHitBomb();

        let bulletLoc = bullet.bulletObj.worldTransform.position;

        // 播放爆炸特效
        if (bombCfg.effectIds) {
            for (let index = 0; index < bombCfg.effectIds.length; index++) {
                const effectConfigId = bombCfg.effectIds[index];
                util.playEffectAtLocation(effectConfigId, bulletLoc);
            }
        }

        // 播放音效
        if (bombCfg.soundIds) {
            for (let index = 0; index < bombCfg.soundIds.length; index++) {
                const sountConfigId = bombCfg.soundIds[index];

                util.playSoundByConfig(sountConfigId, bulletLoc);
            }
        }

        // 如果是模拟  就不用检测了
        if (simulate) {
            return;
        }


        /**总时间 */
        let allTime = bombCfg.checkTime * bombCfg.hitCount;
        let frame = allTime / Constants.LogicFrameInterval;

        let bombData: MotionFrameNode_SkillRect =
        {
            frameNodeType: EFrameNodeType.MotionFrameNode_SkillRect,
            type: 2,
            offsetLoc: bullet.bulletObj.worldTransform.position,
            offsetRot: null,
            LWH: null,
            range: bombCfg.range,
            checkCount: bombCfg.hitCount,
            checkInterval: bombCfg.checkTime,
            keepFrameCount: frame,
            rectSocket: 0,
            isShake: 0,
            cameraShakeId: 0,
            effectid: bulletCfg.Dmg,
            dilationRate: 0,
            dilationFrame: 0,
            frameGuid: ""
        }

        let skillId = 0;
        let extraData = bullet.launchData.extraData;

        if (extraData && extraData.skillId) {
            skillId = extraData.skillId;
        }

        AreaIntersect.getAreaIntersect().start_checkTrigger(skillId, 0, bombData);
    }

    /**
     * 监听玩家motion发射子弹
     * @param skillId 改子弹由哪个技能发出
     * 
     */
    private listen_skill_fireBullet(skillId: number, motionId: number, sheet: MotionFrameNode_FlyEntity, to: string) {

        let pTran = this.localPlayer.character.localTransform;

        let realLoc = pTran.transformPosition(sheet.startLoc);

        /**
         * 终点计算方式:
         * 0：以玩家正方向来计算终点 
         * 1：屏幕中心检测到的目标点（类似射击游戏）
         */

        let bulletData = Edit_BulletDataManager.instance.getBulletData(sheet.bulletId);
        if (bulletData == null) {
            //Tips.show("子弹id数据不存在" + sheet.bulletId);
            oTraceError("子弹id数据不存在: " + sheet.bulletId);
            return;
        }

        let endLoc = mw.Vector.zero;

        switch (sheet.endType) {
            case 0:
                {
                    let dir = this.localPlayer.character.localTransform.getForwardVector();
                    mw.Vector.multiply(dir, sheet.endDis, Globaldata.tmpVector);
                    mw.Vector.add(realLoc, Globaldata.tmpVector, endLoc);
                }
                break;
            case 1:
                {

                }
                break;
        }


        this.server.net_fireSkillBullet(skillId, motionId, sheet.bulletId, realLoc, endLoc, to);
    }

    /**客户端子弹 */
    private client_fireSkillBullet(bulletId: number,
        startLoc: mw.Vector, endLoc: mw.Vector, to: string, fireId: number = this.localPlayerId) {


        let launchData: BulletLaunchData = {
            atkerIsPlayer: true,
            playerId: this.localPlayerId,
            launchPos: startLoc,
            targetPos: endLoc,
            configId: bulletId,
            traceTargetGuid: to,//跟踪子弹需要目标的guid

            extraData: { realFireId: fireId, isClient: true }
        }

        BulletMgrC.instance.createBullet(launchData);
    }

    /**计算伤害 */
    private client_calculate_hurt(bullet: BulletC, hitResult: IBulletHitReulst, readlFireId: number) {
        if (hitResult.isEnergyShield) {
            //oTrace("子弹命中回调: 子弹击中能量盾___________")
            BulletMgrS.instance.destroyBullet(bullet);
            return;
        }

        let bulletCfg = GameConfig.Bullet.getElement(bullet.staticConfig.id);

        // 攻击的目标是npc
        // if (hitResult.targetId <= 0) {
        //     ModuleService.getModule(SecretAreaModuleC).hurtUnit([hitResult.targetId], 0, bulletCfg.Dmg);
        //     return;
        // }

        // 攻击的目标是玩家
        EventManager.instance.call(EPlayerEvents_C.player_beAttack_clientNpc_c, readlFireId, hitResult.targetId, bulletCfg.Dmg);

    }

    private listen_npc_fireBullet(sceneId: number, motionId: number, sheet: MotionFrameNode_FlyEntity, to: undefined) {
        // let unit = this.mUnit.getSceneUnit(sceneId);
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

        // this.client_fireSkillBullet(sheet.bulletId, Globaldata.tmpVector, Globaldata.tmpVector1, to, sceneId);
    }


}