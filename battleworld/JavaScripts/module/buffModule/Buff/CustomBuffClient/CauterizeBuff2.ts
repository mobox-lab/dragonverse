// import { BuffData, EBuffParamType } from "module_buff";
// import { oTrace, oTraceError } from "odin";
// import EnumAttributeType = Attribute.EnumAttributeType;
// import { Attribute } from "../../../PlayerModule/sub_attribute/AttributeValueObject";
// import { BuffC_Base } from "../BuffC_Base";
// import { BuffS_Base } from "../BuffS_Base";
// import { PlayerModuleS } from "../../../PlayerModule/PlayerModuleS";
// import { SceneUnitModuleS } from "../../../SceneUnitModule/SceneUnitModuleS";
// import { EventManager } from "../../../../tool/EventManager";
// import { EModule_Events_S } from "../../../../const/Enum";




// import { ISceneUnitBase } from "../../../SceneUnitModule/model/ISceneUnitBase";
// import { SecretAreaModuleC } from "../../../SecretArea/SecretAreaModuleC";
// /**
//  * 火之法师  造成伤害时敌人持续受到灼烧效果，每秒造成攻击力5%的伤害，持续2秒  
//  */
// export class CauterizeBuff2C extends BuffC_Base {

//     /**秘境模块*/
//     public secretAreaModuleC: SecretAreaModuleC = null;

//     constructor(_id: number, staticConfig: BuffData, arg: any) {
//         //oTrace("CauterizeBuffC constructor _id: ", _id, " configId: ", staticConfig.id);
//         super(_id, staticConfig, arg);
//         this.secretAreaModuleC = ModuleService.getModule(SecretAreaModuleC);
//     }

//     public init() {
//         //oTrace("CauterizeBuffC init");
//         super.init();
//     }

//     public async destroy() {
//         //oTrace("CauterizeBuffC Destroy");
//         //处理：触发结束直接销毁导致特效不播放
//         await TimeUtil.delaySecond(2);
//         super.destroy();
//     }


//     public onUpdate(dt: number): void {
//         super.onUpdate(dt);
//     }

//     /**触发灼烧*/
//     public async onTriggerHandler() {
//         super.onTriggerHandler();

//         //oTrace("onTriggerHandler========================================>>>>>>", this.buffEffectType, this.hostGuid);

//         //释放者 攻击力：目前只有玩家有会灼烧技能
//         let castPlayerAttack = this.playerModuleC.getAttr(EnumAttributeType.atk);
//         //伤害 加成值类型 Percent or Value
//         let t_hurt = this.param1_modle == EBuffParamType.Percent ? this.param1 * castPlayerAttack * 0.01 : this.param1
//         //怪
//         if (this.hostId < 0) {
//             this.secretAreaModuleC.hurtUnit([this.hostId], null, null, Math.round(t_hurt));
//             //oTraceError("buff_changeAttr====hitSceneUnit======>>>>", this.param1, Math.round(t_hurt));
//         }
//     }


// }

// export class CauterizeBuff2S extends BuffS_Base {

//     constructor(_id: number, staticConfig: BuffData, arg: any) {
//         //oTrace("CauterizeBuffS constructor ", _id, staticConfig.id, arg);
//         super(_id, staticConfig, arg);
//     }

//     public init() {
//         //oTrace("CauterizeBuffS init");
//         super.init();
//     }


//     /**
//     * 销毁，清理
//     */
//     public async destroy() {
//         //处理：触发结束直接销毁导致特效不播放
//         await TimeUtil.delaySecond(2);
//         //oTrace("CauterizeBuffS Destroy");
//         super.destroy();
//     }

//     public onUpdate(dt: number): void {
//         super.onUpdate(dt);
//     }


// }





