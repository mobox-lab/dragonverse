/*
 * @Author       : dal
 * @Date         : 2024-03-01 11:18:46
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-01 11:49:19
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\idcard\ui\GameRecordPanel.ts
 * @Description  : 
 */

import Cardrecord_UI_Generate from "../../../../ui-generate/ShareUI/card/Cardrecord_UI_generate";
import { EGameTheme } from "../../../Defines";
import RouteConst from "../../route/RouteConst";
import { PassInfo } from "../../route/RouteData";

export default class GameRecordPanel extends Cardrecord_UI_Generate {

    protected onStart(): void {
        this.btn_close.onClicked.add(() => {
            UIService.hideUI(this);
        });
    }

    protected onShow(gameTheme: EGameTheme, passInfo: PassInfo) {
        const cfg = RouteConst.getGameThemeCfg(gameTheme);
        this.txt_cardname.text = StringUtil.format("{0}通关记录(记得接多语言)", cfg.name)
    }
}