import Back_UI_Generate from "../../ui-generate/ShareUI/Back_UI_generate";
import { EGameTheme } from "../GameStart";
// import { GhostModuleC } from "../modules/ghost/GhostModuleC";
import { ProcedureModuleC } from "../modules/procedure/ProcedureModuleC";
import { RouteModuleC } from "../modules/route/RouteModule";
import { LanUtil } from "../utils/LanUtil";
import { DialogUI } from "./DialogUI";
import { MainUI } from "./MainUI";


/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-12-26 16:07:02
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-21 13:30:28
 * @FilePath     : \hauntedparadise\JavaScripts\codes\ui\SetUI.ts
 * @Description  : 
 */
export default class SetUI extends Back_UI_Generate {

    onStart() {
        this.layer = mw.UILayerDialog;
        // this.btn_back_01.onClicked.add(() => {
        //     UIService.hideUI(this);
        //     UIService.show(MainUI);
        // })
        // this.btn_back_02.onClicked.add(() => {
        //     if (ModuleService.getModule(GhostModuleC).isKilling) {
        //         return;
        //     }
        //     ModuleService.getModule(ProcedureModuleC).backMainMenuPanel();
        //     UIService.hideUI(this);
        // })
        // this.btn_back_03.onClicked.add(() => {
        //     UIService.getUI(DialogUI).show(LanUtil.getText("ReturnHall_01"), (res: boolean) => {
        //         if (res) {
        //             ModuleService.getModule(RouteModuleC).reqJumpGame(EGameTheme.Hall);
        //         }
        //     })
        // })
    }
    onShow() {
        UIService.hide(MainUI);
    }
}