/*
 * @Author       : dal
 * @Date         : 2023-11-15 13:58:07
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-30 10:32:39
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\procedure\ui\VictoryPanel.ts
 * @Description  : 
 */

import { ConfigBase } from "../../../../config/ConfigBase";
import { GameConfig } from "../../../../config/GameConfig";
import Ending_UI_Generate from "../../../../ui-generate/ShareUI/Ending_UI_generate";
import GameStart from "../../../GameStart";
import { MainUI } from "../../../ui/MainUI";
import MusicMgr from "../../../utils/MusicMgr";
import TimeTransferUtil from "../../../utils/TimeTransferUtil";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { UIAniUtil } from "../../../utils/UIAniUtil";
import { getDegreeTxtByType } from "../../archive/ui/ArchiveItem";
import { ProcedureModuleC } from "../ProcedureModuleC";
import { MainMenuPanel } from "./MainMenuPanel";

export class VictoryPanel extends Ending_UI_Generate {

    private _endCfgid: number;

    protected onAwake(): void {
        this.initButtons();
        this.btn_backtomain.onClicked.add(() => {
            UIService.hideUI(this);
            UIService.show(MainMenuPanel);
        });
    }

    protected onStart() {
        this.layer = mw.UILayerSystem;
        if (ConfigBase["languageIndex"] == 0) {
            let gparkImg = this.uiWidgetBase.findChildByPath('rootCanvas/canvas_ed/Img_ed') as mw.Image
            gparkImg.imageGuid = "266862";
        }
    }

    /** 设置文本信息 */
    public setTxtInfo() {
        let myScript = ModuleService.getModule(ProcedureModuleC).myScript;
        this.text_diffi.text = getDegreeTxtByType(myScript.degree);
        this.text_time.text = TimeTransferUtil.getDateStrByTimeMili(myScript.client_useTime);
        GhostTraceHelper.uploadMGS("ts_action_open_box", "难度ID", {
            box_id: this._endCfgid,
            lifetime: myScript.degree,
            box_num: myScript.client_useTime
        });
    }

    /** 显示没有结局的canvas */
    public showNoEndingCanvas() {
        this.canvas_ed.visibility = SlateVisibility.Collapsed;
        this.canvas_victory.visibility = SlateVisibility.SelfHitTestInvisible;
    }

    /** 显示有结局的canvas */
    public showEndingCanvas(endingCfgId: number) {
        const cfg = GameConfig.PassEnding.getElement(endingCfgId);
        if (!cfg) { console.error("DEBUG ERROR>>> endingcfgid配置不存在：" + endingCfgId); this.showNoEndingCanvas(); return; }
        this.text_ed.text = cfg.title;
        this.text_edtips.text = cfg.content;
        this.canvas_ed.visibility = SlateVisibility.SelfHitTestInvisible;
        this.canvas_victory.visibility = SlateVisibility.Collapsed;
    }

    protected onShow(endingCfgId: string) {
        this._endCfgid = endingCfgId ? Number(endingCfgId) : -1
        //GhostTraceHelper.uploadMGS("ts_action_open_box", "胜利结算", { box_id: endingCfgId ? Number(endingCfgId) : -1 });
        endingCfgId ? this.showEndingCanvas(Number(endingCfgId)) : this.showNoEndingCanvas();
        UIService.hide(MainUI);
        const endingCfg = GameConfig.PassEnding.getElement(this._endCfgid);
        if (!endingCfg) {
            SoundService.playSound(GameConfig.Global.HappyEndSound.string);
        }else {
            SoundService.playSound(endingCfg.endingSound);
        }
        this.rootCanvas.renderOpacity = 0;
        UIAniUtil.playOpaAni(this.rootCanvas, 1, 2e3, () => { });
    }
}