/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-29 18:19:41
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-01 15:07:16
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\ui\UIGiftDisplay.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import Congratulations_UI_Generate from "../../../../ui-generate/ShareUI/props/Congratulations_UI_generate";
import GiftDisplayItem_Generate from "../../../../ui-generate/ShareUI/props/GiftDisplayItem_generate";
import StoreModuleC from "../StoreModuleC";
import { UIGiftBagOpen } from "./UIGiftBagOpen";
const delayTime: number = 3

export class UIGiftDisplay extends Congratulations_UI_Generate {

    private _totalData: number[][] = []
    private _items: number[] = []
    private _itemCounts: number[] = []
    private _timer: number = delayTime;
    private _curItemID: number;

    onStart() {
        this.btn_next.onClicked.add(() => {
            this.showItem()
        })
        this.btn_back.onClicked.add(() => {
            UIService.hide(UIGiftDisplay)
        })

        this.btn_open.onClicked.add(() => {
            UIService.hide(UIGiftDisplay)
            if (this._curItemID) UIService.show(UIGiftBagOpen, this._curItemID)
        })
    }

    onShow(data: number[][], itemID: number) {
        this._totalData = data;
        this._curItemID = itemID;
        this._items = [].concat(data[0])
        this._itemCounts = [].concat(data[1])
        this.showItem();
        this.canUpdate = true
        this.btn_next.enable = true;

    }

    private showItem() {
        if (this._items.length > 0 && !StoreModuleC.skipDisplay) {
            let itemID = this._items.shift();
            let itemCount = this._itemCounts.shift();
            let itemData = GameConfig.Item.getElement(itemID)
            this.img_icon1.imageGuid = itemData.icon
            this.text_name1.text = `${itemData.name}x${itemCount}`;
            let q = this.getQuality(1);
            this.text_quality.text = q.txt;
            this.text_quality.fontColor = q.color;
            this._timer = delayTime
        } else {
            this.btn_next.enable = false;
            this.canUpdate = false
            this.showAllGifts()
        }
    }


    private showAllGifts() {
        this.canvas_items0.removeAllChildren();
        this.canvas_1.visibility = SlateVisibility.Collapsed;
        this.canvas_3.visibility = SlateVisibility.Visible;
        let items = this._totalData[0];
        let itemCounts = this._totalData[1];
        for (let i = 0; i < items.length; ++i) {
            let item = UIService.create(UIDisplayItem)
            let itemData = GameConfig.Item.getElement(items[i])
            item.setData(itemData.icon, `${itemData.name}x${itemCounts[i]}`)
            this.canvas_items0.addChild(item.rootCanvas);
        }
    }

    private getQuality(type: number) {
        switch (type) {
            case 1:
                return { txt: GameConfig.SubLanguage.quality_01.Value, color: new LinearColor(255, 255, 255) }
            case 2:
                return { txt: GameConfig.SubLanguage.quality_02.Value, color: new LinearColor(255, 255, 255) }
            case 3:
                return { txt: GameConfig.SubLanguage.quality_03.Value, color: new LinearColor(255, 255, 255) }
            case 4:
                return { txt: GameConfig.SubLanguage.quality_04.Value, color: new LinearColor(255, 255, 255) }
            case 5:
                return { txt: GameConfig.SubLanguage.quality_05.Value, color: new LinearColor(255, 255, 255) }
            default:
                console.log("不存在的品质", type);

        }
    }

    onHide() {
        this.canvas_items0.removeAllChildren();
        this.canvas_1.visibility = SlateVisibility.Visible;
        this.canvas_3.visibility = SlateVisibility.Collapsed;
        this.canUpdate = false
    }

    onUpdate(dt: number) {
        if (this._timer > 0) {
            this._timer -= dt
            if (this._timer <= 0) this.showItem()
        }
    }

}


export class UIDisplayItem extends GiftDisplayItem_Generate {

    setData(icon: string, name: string) {
        this.imgIcon.imageGuid = icon;
        this.text_name.text = name
    }

}