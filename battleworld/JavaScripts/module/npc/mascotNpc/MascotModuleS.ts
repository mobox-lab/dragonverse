/** 
 * @Author       : fengqi.han
 * @Date         : 2023-11-30 17:44:50
 * @LastEditors  : fengqi.han
 * @LastEditTime : 2023-12-26 14:52:23
 * @FilePath     : \battleworld\JavaScripts\module\npc\mascotNpc\MascotModuleS.ts
 * @Description  : 修改描述
 */
import { GameConfig } from "../../../config/GameConfig";
import { IMascotNpcElement } from "../../../config/MascotNpc";
import { EModule_Events_S } from "../../../const/Enum";
import DamageManger from "../../../tool/DamageManger";
import { EventManager } from "../../../tool/EventManager";
import { util } from "../../../tool/Utils";
import { BulletMgrS } from "../../BulletModule/bullet/BulletMgrS";
import { LandModuleS } from "../../LandModule/LandModuleS";
import { EnumDamageType, HitDamageInfo } from "../../PlayerModule/PlayerModuleData";
import { PlayerModuleS, THurtData } from "../../PlayerModule/PlayerModuleS";
import { Attribute } from "../../PlayerModule/sub_attribute/AttributeValueObject";
import { RecoveryLifeBuffS } from "../../buffModule/Buff/CustomBuff/RecoveryLifeBuff";
import { BuffModuleS } from "../../buffModule/BuffModuleS";
import { IUnitBase } from "../IUnitBase";
import SceneUnit from "../SceneUnit";
import { UnitManager } from "../UnitManager";
import { EUnitState } from "../UnitState";
import { UnitStateMachine } from "../UnitStateMachine";
import { MascotModuleC } from "./MascotModuleC";

export class MascotModuleS extends ModuleS<MascotModuleC, null> {
    /** 吉祥物npc配置 */
    private _cfg: IMascotNpcElement[] = [];
    /** 每个类型npc创建计时 */
    private _creaTime: number[] = [];
    /** 每个类型npc数量 */
    private _npcNum: number[] = [];

    /** npc状态逻辑map */
    private _logicMap: Map<number, UnitStateMachine> = new Map();
    /** npc脚本对象池 */
    private _unitPool: SceneUnit[] = [];

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this._cfg = GameConfig.MascotNpc.getAllElement();
        for (let i = 0; i < this._cfg.length; i++) {
            this._creaTime.push(0);
            this._npcNum.push(0);
        }

        TimeUtil.setInterval(() => {
            this.checkCreate();
            this.logicUpdate(0.5);
        }, 0.5);

        EventManager.instance.add(EModule_Events_S.sceneUnit_beAttack, this.unitBeAttack.bind(this));
    }

    private async create(cfg: IMascotNpcElement, num: number) {
        let posArr = ModuleService.getModule(LandModuleS).noRunRandom(num);
        while (num--) {
            let npc = await GameObjPool.asyncSpawn("Character") as mw.Character;
            npc.worldTransform.position = posArr[num];
            npc.clearDescription();
            npc.setDescription([cfg.Appearance]);
            npc.maxWalkSpeed = cfg.DefaultSpeed;
            //npc 生成特效
            let effId = cfg.CreaEff;
            let pos = npc.worldTransform.position;
            if (effId) {
                effId.forEach((id) => {
                    util.playEffectAtLocation(id, pos);
                })
            }
            let sc = this._unitPool.length ? this._unitPool.pop() : await Script.spawnScript(SceneUnit, true);
            sc.gameObject = npc;
            sc.init_S(cfg);
            this._logicMap.set(sc.unitId, new UnitStateMachine(npc, cfg, sc));

        }

    }

    /**
     * 检查是否可以创建吉祥物
     */
    private checkCreate() {
        for (let i = 0; i < this._cfg.length; i++) {
            this._creaTime[i]++;
            if (this._creaTime[i] != this._cfg[i].InterTime) continue;
            if (this._npcNum[i] >= this._cfg[i].MaxNum) {
                this._creaTime[i] = 0;
                continue;
            }
            let createNum = Math.min(this._cfg[i].MaxNum - this._npcNum[i], this._cfg[i].CreateNum)
            this.create(this._cfg[i], createNum);
            this._creaTime[i] = 0;
            this._npcNum[i] += createNum;
        }
    }

    /**
     * npc逻辑更新
     * @param dt 更新间隔，单位秒
     */
    private logicUpdate(dt: number) {
        this._logicMap.forEach((value, key) => {
            value.update(dt);
        })
    }

    /**
     * 场景单位被攻击
     * @param attackId 攻击者id
     * @param beAttackIds 场景单位id数组
     * @param hurtData 伤害数据
     */
    private unitBeAttack(attackId: number, beAttackIds: number[], hurtData: THurtData) {

        let player = mw.Player.getPlayer(attackId);
        if (player == null) {
            return;
        }
        let damageDatas: HitDamageInfo[] = null;
        let hitIds: number[] = null;
        for (let i = 0; i < beAttackIds.length; i++) {
            let unit = UnitManager.instance.getUnit(beAttackIds[i]);
            let logic = this._logicMap.get(beAttackIds[i]);
            if (!unit || !logic) continue;
            /**动效效果表id */
            let motionEffectId = hurtData.motionEffectId;

            if (hurtData.bulletId != null &&
                hurtData.bulletId >= 0) {
                let bullet = BulletMgrS.instance.findBullet(hurtData.bulletId);
                if (bullet) {
                    let bulletCfg = GameConfig.Bullet.getElement(bullet.staticConfig.id);
                    motionEffectId = bulletCfg.Dmg;
                }
            }

            let motionEffectCfg = GameConfig.MotionEffect.getElement(motionEffectId);
            if (motionEffectCfg == null) {
                console.error("找不到怪物受击动效", motionEffectId, hurtData.bulletId);
                return;
            }

            if (motionEffectCfg && motionEffectCfg.BuffID && motionEffectCfg.BuffID.length > 0) {
                for (let index = 0; index < motionEffectCfg.BuffID.length; index++) {
                    const buffId = motionEffectCfg.BuffID[index];

                    ModuleService.getModule(BuffModuleS).createBuff(buffId, attackId, beAttackIds[i],
                        { castPId: attackId, buffParamType: null, value: null, pos: hurtData.triggerPos });
                }
            }

            // 技能冲量计算
            ModuleService.getModule(PlayerModuleS).addImpulse_motion(player, beAttackIds[0], motionEffectCfg, hurtData);

            //计算伤害！！
            let atkarr: [number, boolean] = DamageManger.instance.getAtkAndCrit(attackId, beAttackIds[i], motionEffectId, hurtData.atkVal_replace);
            let atkVal = atkarr[0] // 伤害 
            let iscrit = atkarr[1] // 暴击 
            unit.onHurt(atkVal);
            logic.updateEscape();

            if (damageDatas == null) {
                damageDatas = [];
            }


            let damageData: HitDamageInfo = {
                from: attackId,
                target: beAttackIds[i],
                value: atkVal,
                type: EnumDamageType.normal
            }
            damageDatas.push(damageData);
            if (hitIds == null) {
                hitIds = [];
            }
            hitIds.push(beAttackIds[i]);
        }

        if (damageDatas == null) {
            return;
        }

        ModuleService.getModule(PlayerModuleS).dispatchSceneUnitInjure(attackId, damageDatas, hitIds);
    }

    //获取怪物即时属性
    public getSceneUnitAttr(sceneID: number, type: Attribute.EnumAttributeType, isAdd: boolean = true) {

        let unit = UnitManager.instance.getUnit(sceneID);
        if (unit == null) {
            return;
        }
        return unit.getValue(type, isAdd)
    }

    //增加怪物即时属性
    public addSceneUnitAttr(sceneID: number, type: Attribute.EnumAttributeType, value: number) {
        let unit = UnitManager.instance.getUnit(sceneID);
        if (unit == null) {
            return;
        }
        if (type == Attribute.EnumAttributeType.hp) {
            let curHp = unit.getValue(Attribute.EnumAttributeType.hp, true);
            let maxHp = unit.getValue(Attribute.EnumAttributeType.maxHp, true);
            value = Math.min(maxHp - curHp, value);
        }
        unit.addValue(type, value);
    }

    // 减少怪物即时属性
    public reduceSceneUnitAttr(sceneID: number, type: Attribute.EnumAttributeType, value: number) {
        let unit = UnitManager.instance.getUnit(sceneID);
        if (unit == null) {
            return;
        }

        if (type == Attribute.EnumAttributeType.hp) {
            if (RecoveryLifeBuffS.recoveryLifeCheck(sceneID)) {
                let hp = unit.getValue(Attribute.EnumAttributeType.hp, true);
                if (hp <= 1) {
                    return;
                }
                if ((value - hp) >= 1) {
                    value = (hp - 1);
                }
                unit.reduceValue(type, value);
            } else {
                unit.reduceValue(type, value);
            }
        } else {
            unit.reduceValue(type, value);
        }
    }

    /** 
     * 获取npc脚本（服务端）
     */
    public getUnit(unitId: number): IUnitBase {
        return UnitManager.instance.getUnit(unitId);
    }

    /**
     * npc切换状态
     */
    public unitChangeState(unitId: number, UnitState: EUnitState) {
        if (!this._logicMap.has(unitId)) return;
        this._logicMap.get(unitId).changeState(UnitState);
    }

    /**
     * npc死亡回收
     */
    public unitRecycle(unitId: number) {

        let unit = UnitManager.instance.removeUnit(unitId);

        if (unit && unit instanceof SceneUnit) {
            this._unitPool.push(unit);
            this._npcNum[unit.cfgId - 1]--;
        }


        if (this._logicMap.has(unitId)) {
            this._logicMap.delete(unitId);
        }
    }
}