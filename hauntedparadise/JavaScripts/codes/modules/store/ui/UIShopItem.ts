/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-23 11:15:27
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-07 10:23:04
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\ui\UIShopItem.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IShopElement } from "../../../../config/Shop";
import ShopItem_UI_Generate from "../../../../ui-generate/ShareUI/shop/ShopItem_UI_generate";
import UIShop from "./UIShop";

export class UIShopItem extends ShopItem_UI_Generate {

    private _data: IShopElement;
    private _myRootCanvas: Canvas
    onStart() {
        this.btn_itempick.clickMethod = ButtonClickMethod.PreciseClick
        this.btn_itempick.onClicked.add(() => {
            Event.dispatchToLocal("evt_shopItemSelected", this._data)
        })
        this._myRootCanvas = this.uiWidgetBase.findChildByPath("RootCanvas") as Canvas;
        Event.addLocalListener("evt_shopItemSelected", (data: IShopElement) => {
            let color = data.id == this._data.id ? "#AF0000FF" : "#FFFFFFFF"
            this.btn_itempick.setNormalImageColorByHex(color)
        })
    }

    setShopData(data: IShopElement) {
        if (!data) return
        this._data = data;
        this.text_price.text = this._data.price.toString()
        let itemData = GameConfig.Item.getElement(this._data.itemID)
        if (itemData) {
            this.img_itemicon.imageGuid = itemData.icon
            this.text_itemname.text = itemData.name
        }
        if (itemData.quality) {
            // this.img_itembg.imageGuid = GameConfig.ItemQuality.getElement(itemData.quality).imgGuid;
        }
    }

    setVisibilityByType(type: number) {
        if (type == 0) {//显示所有商品
            this._myRootCanvas.visibility = SlateVisibility.Visible
            return
        }
        this._myRootCanvas.visibility = type == this._data.type ? SlateVisibility.Visible : SlateVisibility.Collapsed
    }
    get data() { return this._data }
    get myRootCanvas() { return this._myRootCanvas }


}