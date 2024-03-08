/*
 * @Author       : dal
 * @Date         : 2024-01-07 11:26:39
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-07 13:14:22
 * @FilePath     : \hauntedparadise\JavaScripts\codes\ui\RegionTips.ts
 * @Description  : 
 */

import { GameConfig } from "../../config/GameConfig";
import RegionalMap_UI_Generate from "../../ui-generate/ShareUI/RegionalMap_UI_generate";
import { TimerOnly } from "../utils/AsyncTool";
import { UIAniUtil } from "../utils/UIAniUtil";

export default class RegionTips extends RegionalMap_UI_Generate {

    private timerOnly: TimerOnly = new TimerOnly();

    protected onHide() {
        this.timerOnly.stop();
    }

    public show(viewTime: string, mapKey: string, tipsKey: string) {
        this.rootCanvas.renderOpacity = 0;
        this.text_map.text = GameConfig.Language[mapKey].Value;
        this.text_maptips.text = GameConfig.Language[tipsKey].Value;
        UIAniUtil.playOpaAni(this.rootCanvas, 1, 1e3);
        this.timerOnly.setTimeout(() => {
            UIAniUtil.playOpaAni(this.rootCanvas, 0, 1e3, () => { UIService.hideUI(this); });
        }, Number(viewTime) * 1e3);
        UIService.showUI(this);
    }
}