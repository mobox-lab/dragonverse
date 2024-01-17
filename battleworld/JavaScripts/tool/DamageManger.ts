import { oTrace } from "odin";
import { Attribute } from "../module/PlayerModule/sub_attribute/AttributeValueObject";
import { GameConfig } from "../config/GameConfig";
// import { SceneUnitModuleS } from "../module/SceneUnitModule/SceneUnitModuleS";
import { PlayerModuleS } from "../module/PlayerModule/PlayerModuleS";
// import { SceneUnitModuleC } from "../module/SceneUnitModule/SceneUnitModuleC";
import { PlayerModuleC } from "../module/PlayerModule/PlayerModuleC";
import { MascotModuleS } from "../module/npc/mascotNpc/MascotModuleS";
import { MascotModuleC } from "../module/npc/mascotNpc/MascotModuleC";

/**
 * 伤害管理器
 */
export default class DamageManger {

    private sceneUnitModuleS: MascotModuleS;
    private playerModuleS: PlayerModuleS;

    private mPlayerC: PlayerModuleC;
    private mSceneUnitC: MascotModuleC;

    private static _instance: DamageManger;
    public static get instance() {
        return this._instance || (this._instance = new DamageManger());
    }

    constructor() {
        if (SystemUtil.isServer()) {
            this.sceneUnitModuleS = ModuleService.getModule(MascotModuleS);
            this.playerModuleS = ModuleService.getModule(PlayerModuleS);
        } else {
            this.mPlayerC = ModuleService.getModule(PlayerModuleC);
            this.mSceneUnitC = ModuleService.getModule(MascotModuleC);
        }

    }


    /**
     * 获取伤害和暴击
     * @param releaserId 
     * @param beHurtId 
     * @param motionEffectId 
     * @param atkVal_replace 
     * @returns 
     */
    public getAtkAndCrit(releaserId: number, beHurtId: number, motionEffectId: number, atkVal_replace: number): [number, boolean] {

        oTrace("getDamage____________________", releaserId, beHurtId, motionEffectId, atkVal_replace)

        if (atkVal_replace) {
            return [atkVal_replace, false];
        }

        let motionEffectCfg = GameConfig.MotionEffect.getElement(motionEffectId);
        if (motionEffectCfg == null) {
            return [0, false];
        }

        let atkVal = this.getAttr(releaserId, Attribute.EnumAttributeType.atk);
        let iscrit = false;

        switch (motionEffectCfg.DamageType) {
            case 0:
                {
                    atkVal *= motionEffectCfg.Damage;
                    let crit = this.critCheck(atkVal, releaserId, beHurtId);
                    atkVal = crit[0];
                    iscrit = crit[1];
                }
                break;
            case 1:
                {
                    atkVal += motionEffectCfg.Damage;
                    let crit = this.critCheck(atkVal, releaserId, beHurtId);
                    atkVal = crit[0];
                    iscrit = crit[1];
                }
                break;
            case 2:
                {
                    let hp = this.getAttr(releaserId, Attribute.EnumAttributeType.hp);
                    if (hp <= 0) {
                        return [0, false];
                    }
                    atkVal = hp * motionEffectCfg.Damage;
                }
                break;
            case 3:
                {
                    let lv = this.getAttr(releaserId, Attribute.EnumAttributeType.lv);
                    atkVal = lv * motionEffectCfg.Damage;
                }
            default:
                break;
        }
        atkVal = Math.floor(atkVal);


        oTrace("atkVal____________________________", atkVal, iscrit)
        return [atkVal, iscrit];
    }

    private critCheck(atkVal: number, releaserId: number, beHurtId: number): [number, boolean] {
        atkVal = Math.floor(atkVal);
        let crit = this.getAttr(releaserId, Attribute.EnumAttributeType.crit);
        let critResistance = this.getAttr(beHurtId, Attribute.EnumAttributeType.critResistance);
        if (critResistance != undefined && critResistance != null) {
            crit = (crit - critResistance) < 0 ? 0 : (crit - critResistance);
        }

        let iscrit = false;
        let critdmge = this.getAttr(releaserId, Attribute.EnumAttributeType.critdmge);
        critdmge = critdmge == 0 ? 1 : critdmge;
        let random = Math.random() * 100
        if (random < crit) {
            atkVal *= critdmge
            iscrit = true;
        }

        return [atkVal, iscrit];
    }


    getAttr(playerID: number, type: Attribute.EnumAttributeType, isAdd: boolean = true): number {
        if (playerID > 0) {
            if (SystemUtil.isServer()) {
                return this.playerModuleS.getPlayerAttr(playerID, type, isAdd);
            } else {
                return this.mPlayerC.getAttr(type, isAdd);
            }
        } else {

            if (SystemUtil.isServer()) {
                return this.sceneUnitModuleS.getSceneUnitAttr(playerID, type, isAdd);
            } else {
                return this.mSceneUnitC.getSceneUnitAttr(playerID, type, isAdd);
            }
        }
    }


    addAttr(playerID: number, type: Attribute.EnumAttributeType, value: number) {
        // if (playerID > 0) {
        this.playerModuleS.addPlayerAttr(playerID, type, value);
        // } else {
        //     this.sceneUnitModuleS.addSceneUnitAttr(playerID, type, value);
        // }
    }

    reduceAttr(playerID: number, type: Attribute.EnumAttributeType, value: number) {
        // if (playerID > 0) {
        this.playerModuleS.reducePlayerAttr(playerID, type, value);
        // } else {
        //     this.sceneUnitModuleS.reduceSceneUnitAttr(playerID, type, value);
        // }
    }


    // /**
    //  * todod>??????
    //  */
    // public getDamage(releaserId: number, beHurtId: number, motionEffectId: number,result: EDefineType,atkVal_replace?: number): number {

    //     oTrace("getDamage____________________", releaserId, beHurtId, motionEffectId)

    //     let motionEffectCfg = GameConfig.MotionEffect.getElement(motionEffectId);
    //     if (motionEffectCfg == null) {
    //         return null;
    //     }

    //     let atkVal = null;
    //     if(atkVal_replace){
    //         atkVal = atkVal_replace;
    //     }else{
    //         atkVal = this.getAttr(releaserId, Attribute.EnumAttributeType.atk);
    //         switch (motionEffectCfg.DamageType) {
    //             case 0:
    //                 atkVal *= motionEffectCfg.Damage;
    //                 atkVal = this.critCheck(atkVal, releaserId, beHurtId);
    //                 break;
    //             case 1:
    //                 atkVal += motionEffectCfg.Damage;
    //                 this.critCheck(atkVal, releaserId, beHurtId);
    //                 break;
    //             case 2:
    //                 let hp = this.getAttr(releaserId, Attribute.EnumAttributeType.hp) - 1;
    //                 if (hp <= 0) {
    //                     return;
    //                 }
    //                 atkVal = hp;
    //                 break;
    //             case 3:
    //                 let lv = this.getAttr(releaserId, Attribute.EnumAttributeType.lv);
    //                 atkVal = lv * motionEffectCfg.Damage;
    //             default:
    //                 break;
    //         }
    //         atkVal = Math.floor(atkVal);
    //     }

    //     oTrace("atkVal____________________________", atkVal)

    //     //加血
    //     if (atkVal < 0) {
    //         this.addAttr(beHurtId, Attribute.EnumAttributeType.hp, atkVal);
    //         this.dispatchSceneUnitInjure(beHurtId, [{ from: releaserId, target: beHurtId, value: atkVal, type: EnumDamageType.normal }], [beHurtId])
    //         return atkVal;
    //     }


    //     //减伤
    //     let def = this.getAttr(beHurtId, Attribute.EnumAttributeType.defMultiple);
    //     atkVal = atkVal * (1 - def / 100);
    //     let defadd = this.getAttr(beHurtId, Attribute.EnumAttributeType.defAdd) + this.getAttr(beHurtId, Attribute.EnumAttributeType.def, false);
    //     atkVal -= defadd;
    //     atkVal = atkVal < 0 ? 0 : atkVal;
    //     oTrace(`defVal_________________________减伤${atkVal}`, def, defadd);

    //     //防御减伤
    //     if (result == EDefineType.define) {
    //         let propId = DataCenterS.getData(beHurtId, PropModuleData).selectId;
    //         let bagSkillCfg = GameConfig.BagSkill.getElement(propId);
    //         atkVal = Math.round(atkVal * bagSkillCfg.defineHurtRate);
    //     }
    //     oTrace(`defVal_________________________防御减伤${atkVal}`, def, defadd);

    //     //+ 真实伤害 [ (atkAdd+atk)*atkMultiple ] *tureDamageMultiple 
    //     let atk = this.getAttr(releaserId, Attribute.EnumAttributeType.atk);
    //     let tureDamageMultiple = this.getAttr(releaserId, Attribute.EnumAttributeType.tureDamageMultiple);
    //     atkVal += atk * tureDamageMultiple;
    //     oTrace(`defVal_________________________真实伤害1${atkVal}`, atk, tureDamageMultiple);


    //     //+ 真实伤害  tureDamage + tureDamageAdd
    //     let tureDamage = this.getAttr(releaserId, Attribute.EnumAttributeType.tureDamage);
    //     let tureDamageAdd = this.getAttr(releaserId, Attribute.EnumAttributeType.tureDamageAdd);
    //     atkVal += (tureDamage + tureDamageAdd);
    //     oTrace(`defVal_________________________真实伤害2${atkVal}`, tureDamage, tureDamageAdd);

    //     //剩1滴血的不死buff
    //     if (RecoveryLifeBuffS.recoveryLifeCheck(beHurtId)) {
    //         let hp = this.getAttr(beHurtId, Attribute.EnumAttributeType.hp);
    //         if (hp == 1) {
    //             oTrace(`血量为1点____________ ${beHurtId}`);
    //             return;
    //         }

    //         if ((atkVal - hp) >= 1) {
    //             atkVal = (hp - 1);
    //         }
    //         oTrace(`recoveryLifeCheck减少血量____________${atkVal}`);
    //         this.reduceAttr(beHurtId, Attribute.EnumAttributeType.hp, atkVal);
    //     } else {
    //         oTrace(`reducePlayerAttr减少血量____________${atkVal}`);
    //         this.reduceAttr(beHurtId, Attribute.EnumAttributeType.hp, atkVal);
    //     }

    //     this.dispatchSceneUnitInjure(beHurtId, [{ from: releaserId, target: beHurtId, value: atkVal, type: EnumDamageType.normal }], [beHurtId])
    //     if (Player.getPlayer(releaserId)) {
    //         this.dispatchSceneUnitInjure(releaserId, [{ from: releaserId, target: beHurtId, value: atkVal, type: EnumDamageType.normal }], [beHurtId])
    //     }

    //     return atkVal;
    // }


}   