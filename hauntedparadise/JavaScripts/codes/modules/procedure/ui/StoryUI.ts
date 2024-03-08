/*
 * @Author       : dal
 * @Date         : 2023-11-09 11:12:27
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-19 13:53:36
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\procedure\ui\StoryUI.ts
 * @Description  : 
 */
import Story_UI_Generate from "../../../../ui-generate/ShareUI/Story_UI_generate";
import GameStart from "../../../GameStart";
import MusicMgr from "../../../utils/MusicMgr";
import { UIAniUtil } from "../../../utils/UIAniUtil";
import { ProcedureModuleC } from "../ProcedureModuleC";
import { MainMenuPanel } from "./MainMenuPanel";

export class StoryUI extends Story_UI_Generate {

    onShow() {
        MusicMgr.instance.play(1005);
        //GhostTraceHelper.uploadMGS("ts_action_open_box", "进入场景", { box_id: 3 });
        this.canvas_bg.renderOpacity = 0;
        // 渐显的时间
        UIAniUtil.playOpaAni(this.canvas_bg, 1, 2e3);
        // 展示时间
        if (GameStart.IsTesting) {
            setTimeout(() => {
                UIService.getUI(MainMenuPanel).switchPlayerCamera();
                ModuleService.getModule(ProcedureModuleC).startGame();
                // 渐隐完的时间
                UIAniUtil.playOpaAni(this.canvas_bg, 0, 3e3, () => { UIService.hide(StoryUI); });
            }, 1e3);
        } else {
            setTimeout(() => {
                UIService.getUI(MainMenuPanel).switchPlayerCamera();
                setTimeout(() => { ModuleService.getModule(ProcedureModuleC).startGame(); }, 2e3);
                // 渐隐完的时间
                UIAniUtil.playOpaAni(this.canvas_bg, 0, 3e3, () => { UIService.hide(StoryUI); });
            }, 7e3);
        }
    }
}