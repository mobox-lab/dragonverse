
// import { BuffData } from "module_buff";
// import { oTrace, oTraceError } from "odin";
// import EnumAttributeType = Attribute.EnumAttributeType;
// import { Attribute } from "../../../PlayerModule/sub_attribute/AttributeValueObject";
// import { BuffC_Base } from "../BuffC_Base";
// import { BuffS_Base } from "../BuffS_Base";
// import { SceneUnitModuleS } from "../../../SceneUnitModule/SceneUnitModuleS";
// import SceneUnitModelBase from "../../../SceneUnitModule/model/SceneUnitModelBase";



// import { SecretAreaModuleC } from "../../../SecretArea/SecretAreaModuleC";
// import SecretAreaModel from "../../../SceneUnitModule/model/SecretAreaModel";


// /* 禁锢-BUFF 世界树枝（无法移动，可以攻击）
//  * 释放后播放motion,对前方判定区内的敌人造成伤害并施加buff：- 无法移动，可以攻击，受到buff的敌人位置播放指定特效（可以调偏移大小旋转，挂点23）
//  */
// export class LockUpBuff2C extends BuffC_Base {
//     /**秘境模块*/
//     public secretAreaModuleC: SecretAreaModuleC = null;
//     /**缓存怪物巡逻移动速度*/
//     private scenceUnitSpeed: number = 0;
//     /**缓存怪物追击移动速度*/
//     private scenceUnitspeedchach: number = 0;

//     constructor(_id: number, staticConfig: BuffData, arg: any) {
//         //oTrace("LockUpBuffC constructor _id: ", _id, " configId: ", staticConfig.id, arg);
//         super(_id, staticConfig, arg);
//         this.secretAreaModuleC = ModuleService.getModule(SecretAreaModuleC);
//     }

//     public init() {
//         //oTrace("LockUpBuffC init");
//         super.init();
//         this.buff_LockUp(true)
//     }

//     /**
//      * 销毁，清理
//      */
//     public destroy() {
//         //oTrace("LockUpBuffC Destroy");
//         super.destroy();
//         this.buff_LockUp(false)
//     }

//     /**
//       * 禁锢
//       */
//     private buff_LockUp(isCreated: boolean): void {
//         //oTrace("buff_center:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
//         if (this.hostId > 0) {
//             return;
//         }

//         let unit: SecretAreaModel = this.secretAreaModuleC.getSceneUnitByID(this.hostId) as SecretAreaModel;
//         if (isCreated) {
//             if (unit) {
//                 // unit.isStun = true;
//                 unit.changeMoveState(false);
//                 // unit.stopMove();

//                 // this.scenceUnitSpeed = unit.getValue(Attribute.EnumAttributeType.speed, false)
//                 // this.scenceUnitspeedchach = unit.getValue(Attribute.EnumAttributeType.scenceUnitspeed, false)
//                 // unit.setAttribute(EnumAttributeType.speed, 0)
//                 // unit.setAttribute(EnumAttributeType.scenceUnitspeed, 0)
//             }
//             //oTrace("unit=====buff_LockUp============true", this.scenceUnitSpeed, this.scenceUnitspeedchach)
//         } else {
//             if (unit) {
//                 // unit.isStun = false;
//                 unit.changeMoveState(true);
//                 // unit.setAttribute(EnumAttributeType.speed, this.scenceUnitSpeed)
//                 // unit.setAttribute(EnumAttributeType.scenceUnitspeed, this.scenceUnitspeedchach)
//             }
//             //oTrace("unit=======buff_LockUp==========false", this.scenceUnitSpeed, this.scenceUnitspeedchach)
//         }
//     }

// }

// export class LockUpBuff2S extends BuffS_Base {

//     constructor(_id: number, staticConfig: BuffData, arg: any) {
//         //oTrace("LockUpBuffS constructor ", _id, staticConfig.id, arg);
//         super(_id, staticConfig, arg);
//     }

//     public init() {
//         //oTrace("LockUpBuffS init");
//         super.init();
//     }

//     /**
//     * 销毁，清理
//     */
//     public destroy() {
//         //oTrace("LockUpBuffS Destroy");
//         super.destroy();
//     }

//     public onUpdate(dt: number): void {
//         super.onUpdate(dt);
//     }

// }

