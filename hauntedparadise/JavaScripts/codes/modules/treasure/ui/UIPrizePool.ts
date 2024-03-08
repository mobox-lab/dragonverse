/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-27 10:27:48
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-06 18:42:29
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\treasure\ui\UIPrizePool.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import { ITreasureBoxElement } from "../../../../config/TreasureBox";
import PrizePool_UI_Generate from "../../../../ui-generate/ShareUI/treasureBox/PrizePool_UI_generate";
import { UIPrizeItem } from "./UIPrizeItem";

export class UIPrizePool extends PrizePool_UI_Generate {
    onStart() {
        this.btn_back.onClicked.add(() => { UIService.hide(UIPrizePool) })
    }

    onShow(data: ITreasureBoxElement[]) {
        let itemIds: number[] = []
        data.forEach(e => {
            e.itemID.forEach(k => {
                if (itemIds.findIndex(e => e == k[0]) == -1) itemIds.push(k[0])
            })
        })
        itemIds.sort((a, b) => { return GameConfig.Item.getElement(a).quality - GameConfig.Item.getElement(b).quality })
        itemIds.forEach(e => {
            let item = UIService.create(UIPrizeItem)
            item.setData(e)
            this.canvas_prize.addChild(item.rootCanvas);
        })
    }

    onHide() {
        this.canvas_prize.removeAllChildren();
    }
}