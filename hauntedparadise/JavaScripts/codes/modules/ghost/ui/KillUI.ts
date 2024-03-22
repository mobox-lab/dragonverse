// /*
//  * @Author       : dal
//  * @Date         : 2024-01-22 16:02:21
//  * @LastEditors  : dal
//  * @LastEditTime : 2024-01-25 15:01:41
//  * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\ghost\ui\KillUI.ts
//  * @Description  :
//  */
// import { GameConfig } from "../../../../config/GameConfig";
// import KillUI_Generate from "../../../../ui-generate/ShareUI/ghost/KillUI_generate";
// import { BoardHelper, BoardKeys } from "../../blackboard/BoardDefine";
// import { EquipModuleC } from "../../equip/EquipModuleC";
//
// export class KillUI extends KillUI_Generate {
//     onShow() {
//         // 把装备卸载掉
//         ModuleService.getModule(EquipModuleC).equip(null);
//
//         let curStyle = Number(BoardHelper.GetTargetKeyValue(BoardKeys.Style));
//         let cavName = GameConfig.Global.flashUI.stringList[curStyle - 1];
//         let curCav = this[cavName];
//         let count = this.rootCanvas.getChildrenCount();
//         for (let index = 0; index < count; index++) {
//             const element = this.rootCanvas.getChildAt(index);
//             element.visibility = SlateVisibility.Collapsed;
//         }
//         if (!curCav) {
//             curCav = this.m1;
//         }
//         curCav.visibility = SlateVisibility.SelfHitTestInvisible;
//     }
// }