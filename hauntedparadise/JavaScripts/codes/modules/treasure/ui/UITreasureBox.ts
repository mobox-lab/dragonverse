/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-27 10:23:06
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-07 09:54:49
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\treasure\ui\UITreasureBox.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { ITreasureBoxElement } from "../../../../config/TreasureBox";
import TreasureBox_UI_Generate from "../../../../ui-generate/ShareUI/treasureBox/TreasureBox_UI_generate";
import TreasureData from "../TreasureData";
import TreasureModuleC from "../TreasureModuleC";
import { UIPrizePool } from "./UIPrizePool";

export class UITreasureBox extends TreasureBox_UI_Generate {
    private _curBoxID: number
    private _curData: ITreasureBoxElement[] = [];
    /**是否需要看广告 */
    private _needWatchAd: boolean;

    onStart() {
        this.btn_prizePool.onClicked.add(() => {
            UIService.show(UIPrizePool, this._curData)
        })
        this.btn_open.onClicked.add(() => {
            if (!this._curBoxID) return
            if (this._needWatchAd) {
                ModuleService.getModule(TreasureModuleC).watchAd(this._curBoxID)
            } else {
                ModuleService.getModule(TreasureModuleC).reqOpenTreasureBox(this._curBoxID)
                UIService.hide(UITreasureBox)
            }
        })
        this.btn_back.onClicked.add(() => {
            UIService.hide(UITreasureBox)
        })
        let dataHelper = DataCenterC.getData(TreasureData)
        this.setBtnText(dataHelper.openTimes)
        dataHelper.onOpenTimeChange.add((times: number) => {
            this.setBtnText(times)
        })
    }

    onShow(boxID: number) {
        this._curBoxID = boxID
        this._curData = GameConfig.TreasureBox.getAllElement().filter(e => e.enable && e.boxID == boxID)
    }

    setBtnText(times: number) {
        if (times >= 5) {
            this.text_open.text = "今日开启次数已用完"
            this.btn_open.enable = false;
        } else if (times > 0) {
            this._needWatchAd = true;
            this.text_open.text = "看广告开启";
        } else if (times == 0) {
            this._needWatchAd = false;
            this.text_open.text = "开启";
        }
    }

}