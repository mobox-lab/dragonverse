// import { BuffData } from "module_buff";
// import { oTrace, oTraceError } from "odin";
// import { BuffC_Base } from "../BuffC_Base";
// import { BuffS_Base } from "../BuffS_Base";
// import { SecretAreaModuleC } from "../../../SecretArea/SecretAreaModuleC";
// import SecretAreaModel from "../../../SceneUnitModule/model/SecretAreaModel";

// /**
//  * 修改模型 BUFF   变形法杖
//  * 玩家使用后会播放一个motion，被该motion技能击中的目标会随机变成一个四足，被变形期间除了跳，其他均无法操作，持续x秒 
//  */
// export class ChangeMoldeBuffC2 extends BuffC_Base {

//     /**外观 猫 狗 猪*/
//     public animals: string[] = ["160373", "159665", "159890"]
//     /**动画 */
//     private jumpAnimation: string[] = ["150787", "150781", "150832"]
//     /**动画 */
//     private idleAnimation: string[] = ["150787", "150781", "150832"]

//     /**随机索引 */
//     private index: number = 0

//     private npc: mw.Character = null

//     /**秘境模块*/
//     public secretAreaModuleC: SecretAreaModuleC = null;

//     constructor(_id: number, staticConfig: BuffData, arg: any) {
//         oTrace("ChangeMoldeBuffC2 constructor _id: ", _id, " configId: ", staticConfig.id, arg);
//         super(_id, staticConfig, arg);

//         this.index = _id % 3

//         oTrace("ChangeMoldeBuffC2 this.index", this.index)

//         this.secretAreaModuleC = ModuleService.getModule(SecretAreaModuleC);
//     }

//     public init() {
//         oTrace("ChangeMoldeBuffC2 init");
//         super.init();
//         this.buff_ChangeMolde(true)
//     }

//     /**
//    * 销毁，清理
//    */
//     public destroy() {
//         oTrace("ChangeMoldeBuffC Destroy");
//         super.destroy();
//         this.buff_ChangeMolde(false)
//     }

//     /**
//     * 切换模型
//     * @param buff 
//     * @param t_pid 
//     * @param isCreated 
//     */
//     private async buff_ChangeMolde(isCreated: boolean) {
//         oTrace("切换模型2--------------------------------------------", isCreated)
//         if (this.hostId == null || isNaN(Number(this.hostId))) {
//             oTraceError("error:buff_ChangeMolde buff.hostGuid == null ", this.hostId);
//             return;
//         }
//         let t_pid = Number(this.hostId);
//         if (t_pid > 0) {

//         } else {
//             if (isCreated) {
//                 this.changeMolde_ScenceUnit(t_pid, this.index, true)
//             } else {
//                 this.changeMolde_ScenceUnit(t_pid, this.index, false)
//             }
//         }

//     }

//     /**切换NPC模型 */
//     private async changeMolde_ScenceUnit(t_pid: number, index: number, ischange: boolean) {
//         oTrace("changeMolde_ScenceUnit2--------------------------------------------", t_pid, index, ischange)
//         let guid = null
//         let unit: SecretAreaModel = this.secretAreaModuleC.getSceneUnitByID(t_pid) as SecretAreaModel;
//         if (unit) {
//             if (!unit.model) {
//                 return
//             }

//             if (ischange) {
//                 guid = this.animals[index];
//                 unit.isChangeModel = true;
//             } else {
//                 guid = unit.unitCfg.AppearanceGUID;
//                 unit.isChangeModel = false;
//             }
//             if (!AssetUtil.assetLoaded(guid)) {
//                 await AssetUtil.asyncDownloadAsset(guid);
//             }

//             // if (!(PlayerManagerExtesion.isNpc(unit.model))) {
//             //     oTrace("changeMolde_ScenceUni_instanceof", unit.model)
//             //     return
//             // }
//             // this.npc = unit.model as mw.Character;

//             this.npc = unit.model
//             if (ischange) {
//                 unit.stopAnimationByState();

//                 this.npc.description.base.wholeBody = guid;
//             }
//             else {
//                 this.npc.description.base.wholeBody = guid;
//             }
//             this.npc.addMovement(this.npc.localTransform.getForwardVector())//BUG ERROR不调用没物理
//         }

//     }


// }

// export class ChangeMoldeBuffS2 extends BuffS_Base {

//     constructor(_id: number, staticConfig: BuffData, arg: any) {
//         oTrace("ExampleBuffS2 constructor ", _id, staticConfig.id, arg);
//         super(_id, staticConfig, arg);
//     }

//     public init() {
//         oTrace("ExampleBuffS2 init");
//         super.init();

//     }

//     /**
//     * 销毁，清理
//     */
//     public destroy() {
//         oTrace("ExampleBuffS2 Destroy");
//         super.destroy();
//     }

//     public onUpdate(dt: number): void {
//         super.onUpdate(dt);
//     }

// }