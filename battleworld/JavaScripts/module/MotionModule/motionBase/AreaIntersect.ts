import { PlayerManagerExtesion } from "../../../Modified027Editor/ModifiedPlayer";
import { oTraceError } from "odin";
import { GameConfig } from "../../../config/GameConfig";
import { IMotionEffectElement } from "../../../config/MotionEffect";
import { EAreaId, EModule_Events } from "../../../const/Enum";
import { MotionFrameNode_SkillRect } from "../../../editors/motionEditor/MotionFrameNodeBase";
import { RP_DestroyManager } from "../../../rptool/GM/RP_DestroyManager";
import { EventManager } from "../../../tool/EventManager";
import { ShakeScreenHelper } from "../../../tool/ShakeScreenHelper";
import { TriggerHelper } from "../../../tool/TriggerHelper";
// import { AreaNpcModuleC } from "../../AreaNpcModule/AreaNpcModuleC";
// import { ArenasModuleC } from "../../Arenas/ArenasModuleC";
import { EWorldType, GlobalWorld } from "../../../const/GlobalWorld";
// import { PvpModuleC } from "../../PVP/PvpModuleC";
// import { ClubModuleC } from "../../club/ClubModuleC";
import { MotionUtil } from "../MotionUtil";
// import { ArenasWorld2ModuleC } from "../../ArenasWrold2/ArenasWorld2ModuleC";
import { MotionEffectManager } from "./MotionEffectManager";
import { Constants } from "../../../tool/Constants";
import { Globaldata } from "../../../const/Globaldata";
import { AttributeModuleC } from "../../AttributeModule/AttributeModuleC";
import { Attribute } from "../../PlayerModule/sub_attribute/AttributeValueObject";
import { THurtData } from "../../PlayerModule/PlayerModuleS";
import { util } from "../../../tool/Utils";
import { MascotModuleC } from "../../npc/mascotNpc/MascotModuleC";
import { UnitManager } from "../../npc/UnitManager";
import GameServiceConfig from "../../../const/GameServiceConfig";

/**
 * 区域检测
 *
 */
export class AreaIntersect {
    public static _areaArrs: AreaIntersect[] = [];

    public static _areaPool: AreaIntersect[] = [];

    /**攻击记录缓存 */
    private attackCache: Map<number, number> = new Map<number, number>();

    public static getAreaIntersect() {
        if (this._areaPool.length > 0) {
            return this._areaPool.pop();
        } else {
            let area = new AreaIntersect();
            this._areaArrs.push(area);
            return area;
        }
    }

    public static pushToPool(area: AreaIntersect) {
        area.clear();
        if (this._areaPool.includes(area)) {
            return;
        }
        this._areaPool.push(area);
    }

    private _endKey: any = null;
    /**伤害判定该key */
    private _hurtCheckKey: any = null;

    private _areaLoc: mw.Vector = null;
    private _areaRot: mw.Rotation = null;

    private _motionEffectCfg: IMotionEffectElement = null;

    /**区域检测开始时间 */
    private _checkTimeStamp: number = 0;
    /**检测限制时间 */
    private _checkLimitTime: number = 0;

    //private _isSendError: boolean = false;

    /**区域检测信息 */
    private _areaCheckData: MotionFrameNode_SkillRect = null;

    private _motionId: number = 0;

    /**筛选的目标id数组 */
    private filterIds: number[] = [];

    /**有那个技能进行触发的 可能为0 */
    private bindSkillId: number = 0;

    /**清理 */
    public clear() {
        this.bindSkillId = 0;
        this._areaCheckData = null;

        this._areaLoc = null;
        this._motionEffectCfg = null;
        this.clear_areaCheckKey();
        this.attackCache.clear();

        this.filterIds.length = 0;

    }

    /**开始触发校验 */
    public async start_checkTrigger(skillId: number, motionId: number, sheet: MotionFrameNode_SkillRect) {
        this.bindSkillId = skillId;
        this._motionId = motionId;
        this._areaCheckData = sheet;

        this._motionEffectCfg = GameConfig.MotionEffect.getElement(this._areaCheckData.effectid);

        this.attackCache.clear();

        let from = Player.localPlayer.character;

        this._areaCheckData.keepFrameCount = Math.abs(this._areaCheckData.keepFrameCount);
        if (this._areaCheckData.keepFrameCount > 1) {

            let target = null;
            if (this._areaCheckData.rectSocket < 0) {
                this._areaLoc = from.localTransform.transformPosition(this._areaCheckData.offsetLoc);
                this._areaRot = from.localTransform.transformDirection(this._areaCheckData.offsetRot).toRotation();
                target = this._areaLoc;
            } else {
                target = from;
            }

            this._checkLimitTime = Math.abs(sheet.keepFrameCount) * Constants.LogicFrameInterval * 1000;

            this._checkTimeStamp = Date.now();

            await this.areaIntersect(target);

            this.clear_areaCheckKey();
            this._hurtCheckKey = TimeUtil.setInterval(() => {
                this.areaIntersect(target);
                this.check_recycle();
            }, this._areaCheckData.checkInterval);

            // 注意异步执行顺序
            this._endKey = setTimeout(() => {
                this._endKey = null;
                this.clear_areaCheckKey();
                AreaIntersect.pushToPool(this);
            }, this._checkLimitTime);

        } else {
            let target = null;
            if (this._areaCheckData.rectSocket < 0) {
                this._areaLoc = from.localTransform.transformPosition(this._areaCheckData.offsetLoc);
                this._areaRot = from.localTransform.transformDirection(this._areaCheckData.offsetRot).toRotation();
                target = this._areaLoc;
            } else {
                target = from;
            }

            await this.areaIntersect(target);

            AreaIntersect.pushToPool(this);
        }

    }

    /**检测回收 容错处理   往后延1秒*/
    private check_recycle() {
        let time = Date.now() - this._checkTimeStamp;
        if (time < (this._checkLimitTime + 1000)) {
            return;
        }

        this.clear_areaCheckKey();
        AreaIntersect.pushToPool(this);

    }

    /**区域检测 */
    protected async areaIntersect(form: mw.GameObject | mw.Vector) {
        let triggerLoc = await this.filter_attacks(form);

        if (this.filterIds.length == 0) return;

        for (let id of this.filterIds) {
            let beAttackCount = 0;
            if (this.attackCache.has(id)) {
                beAttackCount = this.attackCache.get(id);
            }
            this.attackCache.set(id, beAttackCount + 1);
        }

        // 卡肉效果
        if (this._areaCheckData.dilationFrame > 0) {
            MotionEffectManager.start_timeDilation(this._areaCheckData.dilationRate, this._areaCheckData.dilationFrame);
        }

        // 爆炸类型
        // 攻击到的id数组 动效id 当前帧 动效effectid
        let hurtData: THurtData = {
            skillId: this.bindSkillId,
            motionId: this._motionId,
            motionEffectId: this._areaCheckData.effectid,
        };

        switch (this._areaCheckData.type) {
            case 0: {
                hurtData.maxCheckDis = util.calculateLongestDiagonalLength(this._areaCheckData.LWH.x, this._areaCheckData.LWH.y, this._areaCheckData.LWH.z);
                hurtData.triggerPos = triggerLoc;
            }
                break;
            case 1: {
                hurtData.maxCheckDis = this._areaCheckData.range;
                hurtData.triggerPos = triggerLoc;
            }
                break;
            case 2: {
                hurtData.triggerPos = this._areaCheckData.offsetLoc;
            }
                break;
            default:
                break;
        }

        EventManager.instance.call(EModule_Events.motion_attack, this.filterIds, hurtData);

        // 震屏
        if (this._areaCheckData.cameraShakeId > 0 && SystemUtil.isClient()) {
            ShakeScreenHelper.shakeScene_cfg(this._areaCheckData.cameraShakeId);
        }

        // 旧的震屏
        if (this._areaCheckData.isShake == 1) {
            ShakeScreenHelper.shake(Camera.currentCamera, 12);
        }
    }

    /**
     * 过滤攻击目标到数组中
     *
     * @returns 筛选目标数组id
     */
    private async filter_attacks(form: mw.GameObject | mw.Vector) {

        this.filterIds.length = 0;

        let trigger = await this.bindTrigger(form, this._areaRot);
        if (trigger == null) {
            oTraceError("filter_attacks trigger is null ");
            return null;
        }
        //可视化trigger
        if (SystemUtil.isPIE && !GameServiceConfig.isRelease && !GameServiceConfig.isBeta && Globaldata.showSkillRange) {

            if (this._areaCheckData.type === 0) {
                //计算八个顶点
                let p1 = trigger.worldTransform.transformPosition(new Vector(-50, -50, 0));
                let p2 = trigger.worldTransform.transformPosition(new Vector(-50, -50, 50));
                let p3 = trigger.worldTransform.transformPosition(new Vector(50, -50, 50));
                let p4 = trigger.worldTransform.transformPosition(new Vector(50, -50, 0));
                let p5 = trigger.worldTransform.transformPosition(new Vector(-50, 50, 0));
                let p6 = trigger.worldTransform.transformPosition(new Vector(-50, 50, 50));
                let p7 = trigger.worldTransform.transformPosition(new Vector(50, 50, 0));
                let p8 = trigger.worldTransform.transformPosition(new Vector(50, 50, 50));
                //打射线
                QueryUtil.lineTrace(p1, p4, true, true);
                QueryUtil.lineTrace(p1, p5, true, true);
                QueryUtil.lineTrace(p2, p6, true, true);
                QueryUtil.lineTrace(p1, p2, true, true);
                QueryUtil.lineTrace(p4, p7, true, true);
                QueryUtil.lineTrace(p4, p3, true, true);
                QueryUtil.lineTrace(p7, p8, true, true);
                QueryUtil.lineTrace(p7, p5, true, true);
                QueryUtil.lineTrace(p5, p6, true, true);
                QueryUtil.lineTrace(p6, p8, true, true);
                QueryUtil.lineTrace(p2, p3, true, true);
                QueryUtil.lineTrace(p3, p8, true, true);

                // GameObject.asyncSpawn("197386", { transform: trigger.worldTransform.clone() }).then((obj) => {
                //     let model = obj as Model;
                //     model.setOutline(true, LinearColor.red, 5);

                //     setTimeout(() => {
                //         model.setOutline(false, LinearColor.red, 5);
                //         model.destroy();
                //     }, 4000);
                // });
            } else if (this._areaCheckData.type === 1) {
                QueryUtil.sphereOverlap(trigger.worldTransform.position, trigger.worldTransform.scale.x * 50, true);
            }
        }

        // 可破坏交互物
        let destroys = RP_DestroyManager.instance.getCurAreaDestroys();
        if (destroys) {
            for (let index = 0; index < destroys.length; index++) {
                const destroy = destroys[index];
                if (destroy == null) {
                    continue;
                }
                // console.error(`rkc--------------collision:${(destroy as Model).getCollision()}   checkinarea:${trigger.checkInArea(destroy)}`);
                if (trigger.checkInArea(destroy)) {
                    EventManager.instance.call(EModule_Events.hitMeshObj_C, destroy.gameObjectId, Player.localPlayer.playerId);
                }
            }
        }

        // 检测npc
        let areaNpcs = UnitManager.instance.getAllUnit();

        if (areaNpcs) {
            for (let index = 0; index < areaNpcs.length; index++) {
                let unit = areaNpcs[index];

                if (unit.getModel() == null) continue;

                if (unit.isDead()) {
                    continue;
                }

                const tentativeTrigger = unit.getModel();
                if (tentativeTrigger.getCollision() == mw.CollisionStatus.Off) continue;

                if (!trigger.checkInArea(tentativeTrigger)) continue;

                if (this.filter_enemyCheck(unit.getUnitId()) == true) continue;
                this.filterIds.push(unit.getUnitId());
            }
        }

        // 检测玩家
        let selfAreaId = ModuleService.getModule(AttributeModuleC).getAttributeValue(Attribute.EnumAttributeType.areaId);

        if (selfAreaId == EAreaId.Battle) {
            let players = MotionUtil.getCurAreaPlayers();
            for (let index = 0; index < players.length; index++) {
                let player = players[index];
                let tentativeTrigger = player.character;
                if (player.character == null) continue;
                if (!trigger.checkInArea(tentativeTrigger)) continue;

                let pId = player.playerId;

                if (this.filter_enemyCheck(pId) == true) continue;

                this.filterIds.push(pId);
            }
        }

        let triggerLoc: mw.Vector = null;
        if (trigger) {
            triggerLoc = trigger.worldTransform.position;
            TriggerHelper.returnTrigger(trigger);
        }

        return triggerLoc;
    }

    /**
     * 绑定触发器
     */
    public async bindTrigger(target: mw.GameObject | mw.Vector, rot?: mw.Rotation) {
        let trigger = await TriggerHelper.getTemporaryTrigger();

        if (this._areaCheckData == null) {
            return null;
        }

        // 类型2 直接用于外部爆炸  指定坐标就行 不需要绑定
        if (this._areaCheckData.type == 2) {
            if (trigger.shape != TriggerShapeType.Sphere) {
                trigger.shape = TriggerShapeType.Sphere;
            }
            Globaldata.tmpVector.x = this._areaCheckData.range;
            Globaldata.tmpVector.y = this._areaCheckData.range;
            Globaldata.tmpVector.z = this._areaCheckData.range;
            trigger.worldTransform.scale = Globaldata.tmpVector;
            trigger.worldTransform.position = this._areaCheckData.offsetLoc;
            return trigger;
        }

        if (this._areaCheckData.rectSocket >= 0) {
            if (target instanceof mw.GameObject) {
                if (this._areaCheckData.rectSocket > 0 && PlayerManagerExtesion.isCharacter(target)) {
                    target.attachToSlot(trigger, this._areaCheckData.rectSocket);
                } else {
                    trigger.parent = (target);
                }
            }

            trigger.localTransform.position = (this._areaCheckData.offsetLoc);
            trigger.localTransform.rotation = (new mw.Rotation(this._areaCheckData.offsetRot));
        } else {
            trigger.worldTransform.position = target as mw.Vector;
            if (rot) {
                trigger.worldTransform.rotation = rot;
            }
        }

        if (this._areaCheckData.type == 0) {
            if (trigger.shape != TriggerShapeType.Box) {
                trigger.shape = TriggerShapeType.Box;
            }
            trigger.worldTransform.scale = this._areaCheckData.LWH;

        } else {
            if (trigger.shape != TriggerShapeType.Sphere) {
                trigger.shape = TriggerShapeType.Sphere;
            }
            Globaldata.tmpVector.x = this._areaCheckData.range;
            Globaldata.tmpVector.y = this._areaCheckData.range;
            Globaldata.tmpVector.z = this._areaCheckData.range;
            trigger.worldTransform.scale = Globaldata.tmpVector;
        }
        return trigger;
    }

    /**
     * 排除攻击目标
     * @param area
     * @param sceneUnitID
     * @returns 如果被过滤返回true
     */
    private filter_enemyCheck(sceneUnitID: number) {
        // 法术场类型 才做校验
        if (this._areaCheckData.keepFrameCount > 0) {
            let beAttackCount = 0;
            if (this.attackCache.has(sceneUnitID)) {
                beAttackCount = this.attackCache.get(sceneUnitID);
            }

            if (beAttackCount >= this._areaCheckData.checkCount) {
                return true;
            }
        }

        let releasePlayerId = Player.localPlayer.playerId;
        // 判断是否过滤
        if (this._motionEffectCfg) {
            switch (this._motionEffectCfg.targetType) {
                case 0:// 只命中自己
                    return sceneUnitID != releasePlayerId;
                case 1:// 命中除自己外所有目标（npc，其它玩家）
                    {
                        if (sceneUnitID == releasePlayerId) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                case 2:// 友方包含自己( 其它玩家、玩家自己 )
                    {
                        if (sceneUnitID == releasePlayerId) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                case 3:// 友方不包含自己 ( 其它玩家 )
                    return sceneUnitID > 0 && sceneUnitID == releasePlayerId;
                case 4:// 所有人
                    return false;
                default:
                    return false;
            }
        }
    }

    /**清理区域检测key */
    private clear_areaCheckKey() {
        if (this._hurtCheckKey) {
            TimeUtil.clearInterval(this._hurtCheckKey);
        }
        this._hurtCheckKey = null;

        if (this._endKey == null) {
            clearTimeout(this._endKey);
        }
        this._endKey = null;
    }

}