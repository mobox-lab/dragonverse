/*
 * @Author       : dal
 * @Date         : 2023-11-15 13:57:55
 * @LastEditors  : dal
 * @LastEditTime : 2023-11-22 18:28:58
 * @FilePath     : \hauntedparadise\JavaScripts\modules\procedure\ui\LosePanel.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import DieEnd_UI_Generate from "../../../../ui-generate/ShareUI/DieEnd_UI_generate";
import { MainUI } from "../../../ui/MainUI";
import { ReItemUI } from "../../../ui/items/ReItemUI";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { UIAniUtil } from "../../../utils/UIAniUtil";
import { ProcedureModuleC } from "../ProcedureModuleC";
import { MainMenuPanel } from "./MainMenuPanel";

export class LosePanel extends DieEnd_UI_Generate {

    protected onAwake(): void {
        this.initButtons();
        this.btn_fail.onClicked.add(() => {
            UIService.hideUI(this);
            UIService.show(MainMenuPanel);
        });
    }

    protected onStart() {
        this.layer = mw.UILayerBottom;
    }

    protected onShow() {
        UIService.hide(MainUI);
        SoundService.playSound(GameConfig.Global.BadEndSound.string);
        this.rootCanvas.renderOpacity = 0;
        UIAniUtil.playOpaAni(this.rootCanvas, 1, 2e3, () => { });
    }

    onHide() {
        UIService.hide(ReItemUI);
    }

    setTxtInfo() {
        const myScript = ModuleService.getModule(ProcedureModuleC).myScript;
        //GhostTraceHelper.uploadMGS("ts_action_open_box", "上发单局时间单位秒", {});
        GhostTraceHelper.uploadMGS("ts_action_open_box", "难度ID", { box_id: 6, lifetime: myScript.degree, box_num: myScript.client_useTime });
    }
}