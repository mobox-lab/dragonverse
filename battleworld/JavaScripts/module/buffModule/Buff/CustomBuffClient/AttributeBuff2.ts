// import { BuffData, EBuffParamType, BuffS } from "module_buff";
// import EnumAttributeType = Attribute.EnumAttributeType;
// import { oTrace, oTraceError } from "odin";
// import { BuffS_Base } from "../BuffS_Base";
// import { BuffC_Base } from "../BuffC_Base";
// import { Attribute } from "../../../PlayerModule/sub_attribute/AttributeValueObject";
// import { PlayerModuleS } from "../../../PlayerModule/PlayerModuleS";
// import { SceneUnitModuleS } from "../../../SceneUnitModule/SceneUnitModuleS";
// import { EDefineType } from "../../../../const/Enum";
// import { Globaldata } from "../../../../const/Globaldata";




// import { SecretAreaModuleC } from "../../../SecretArea/SecretAreaModuleC";
// import SecretAreaModel from "../../../SceneUnitModule/model/SecretAreaModel";

// /**
//  * 属性修改BUFF -- 朗基努斯之枪
//  * 玩家持有该道具时获得150%全属性提升。使用后，对玩家正前方发出一个可穿透的“枪”形子弹，飞行距离x，飞行速度v，对击中的所有人造成玩家生命值上限的伤害。玩家使用后会使自身当前生命值和生命值上限变为1，死亡重生后恢复。
//  */
// export class AttributeBuff2C extends BuffC_Base {

//     /**秘境模块*/
//     public secretAreaModuleC: SecretAreaModuleC = null;

//     constructor(_id: number, staticConfig: BuffData, arg: any) {
//         //oTrace("AttributeBuffC constructor _id: ", _id, " configId: ", staticConfig.id);
//         super(_id, staticConfig, arg);
//     }

//     public init() {
//         //oTrace("AttributeBuffC init");
//         super.init();
//         this.secretAreaModuleC = ModuleService.getModule(SecretAreaModuleC);
//         this.buff_changeAttr(true)
//     }

//     /**
//    * 销毁，清理
//    */
//     public destroy() {
//         //oTrace("AttributeBuffC Destroy");
//         super.destroy();
//         this.buff_changeAttr(false)
//     }


//     /**
//     * buff 更改玩家属性
//     * @param this 
//     * @param t_pid 
//     * @param isCreated 创建buff还是销毁buff
//     * @returns 
//     */
//     private buff_changeAttr(isCreated: boolean): void {
//         //oTrace("GameModuleS:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid, this.hostId);
//         if ((this.affectPropertyType in EnumAttributeType) == false) {
//             oTraceError("error:buff_changeAttr_over affectPropertyType not in attr ", this.affectPropertyType);
//             return;
//         }

//         // 标准类型
//         let t_normalType = Number(this.affectPropertyType);
//         //加成类型
//         let t_addType = t_normalType + Globaldata.addAttribueTypeVale;
//         let t_MultipleType = t_normalType + Globaldata.multiplyAttribueTypeVale;


//         if ((t_normalType in EnumAttributeType) == false) {
//             oTraceError("error:buff_changeAttr_over t_normalType not in attr ", t_normalType);
//             return;
//         }

//         //加成值类型 Percent or Value
//         let param1_modle = this.param1_modle
//         let t_type = param1_modle == EBuffParamType.Percent ? t_MultipleType : t_addType

//         //怪
//         if (this.hostId < 0) {
//             let unit: SecretAreaModel = this.secretAreaModuleC.getSceneUnitByID(this.hostId) as SecretAreaModel;
//             if (isCreated) {
//                 if (unit) {
//                     unit.addValue(t_type, this.param1)
//                 }
//             } else {
//                 if (unit) {
//                     unit.reduceValue(t_type, this.param1)
//                 }
//             }
//             //oTraceError("buff_changeAttr===========>>>>", this.hostId, t_type, this.param1, isCreated);
//         }
//     }
// }

// export class AttributeBuff2S extends BuffS_Base {

//     constructor(_id: number, staticConfig: BuffData, arg: any) {
//         //oTrace("AttributeBuffS constructor ", _id, staticConfig.id, arg);
//         super(_id, staticConfig, arg);
//     }

//     public init() {
//         //oTrace("AttributeBuffS init");
//         super.init();
//     }

//     /**
//     * 销毁，清理
//     */
//     public destroy() {
//         //oTrace("AttributeBuffS Destroy");
//         super.destroy();
//     }

//     public onUpdate(dt: number): void {
//         super.onUpdate(dt);
//     }


// }
