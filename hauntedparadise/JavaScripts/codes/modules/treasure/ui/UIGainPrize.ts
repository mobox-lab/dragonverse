/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-27 10:44:49
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-06 18:44:30
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\treasure\ui\UIGainPrize.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import GainPrize_UI_Generate from "../../../../ui-generate/ShareUI/treasureBox/GainPrize_UI_generate";
import { UIPrizeItem } from "./UIPrizeItem";

export class UIGainPrize extends GainPrize_UI_Generate {

    onStart() {
        this.btn_close.onClicked.add(() => {
            UIService.hide(UIGainPrize);
        })
    }

    onShow(treasureID: number) {
        let itemIds: number[] = []
        let data = GameConfig.TreasureBox.getElement(treasureID);
        data.itemID.forEach(e => {
            if (itemIds.findIndex(e => e == e[0]) == -1) itemIds.push(e[0])
        })
        itemIds.sort((a, b) => { return GameConfig.Item.getElement(a).quality - GameConfig.Item.getElement(b).quality })
        itemIds.forEach(e => {
            let item = UIService.create(UIPrizeItem)
            item.setData(e)
            this.canvas_prize.addChild(item.rootCanvas);
        })
    }

    onHide() {
        this.canvas_prize.removeAllChildren()
    }
}