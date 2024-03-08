/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-29 15:06:19
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-07 15:42:00
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\ui\UIBuyGiftBag.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IShopElement } from "../../../../config/Shop";
import BuyGiftBag_UI_Generate from "../../../../ui-generate/ShareUI/props/BuyGiftBag_UI_generate";
import { RouteDefine } from "../../route/RouteDefine";
import StoreModuleC from "../StoreModuleC";

export class UIBuyGiftBag extends BuyGiftBag_UI_Generate {
    private _curData: IShopElement;
    private _maxNum: number = 0;
    private _curNum: number = 0;

    onStart() {
        this.layer = UILayerDialog
        this.btn_back.onClicked.add(() => {
            UIService.hide(UIBuyGiftBag);
        })

        this.btn_buyItem.onClicked.add(() => {
            if (!this._curData || this._curNum <= 0 || this._curNum > this._maxNum) return;
            ModuleService.getModule(StoreModuleC).reqBuyItem(this._curData, this._curNum);
            UIService.hide(UIBuyGiftBag);
        })

        this.btn_no.onClicked.add(() => {
            UIService.hide(UIBuyGiftBag);
        })

        this.btn_add.onClicked.add(() => {
            if (this._curNum >= this._maxNum) return;
            this._curNum++;
            this.setBuyNumText()
        })

        this.btn_minus.onClicked.add(() => {
            if (this._curNum <= 1) return;
            this._curNum--;
            this.setBuyNumText()
        })
        this.btn_max.onClicked.add(() => {
            this._curNum = this._maxNum;
            this.setBuyNumText()
        })
    }

    onShow(shopID: number) {
        this._curData = GameConfig.Shop.getElement(shopID);
        let itemData = GameConfig.Item.getElement(this._curData.itemID)
        this.text_question.text = StringUtil.format(GameConfig.SubLanguage.packbuy_01.Value, itemData.name)
        this.img_gift.imageGuid = itemData.icon;
        this._curNum = 0
        RouteDefine.getSpecialItemDataList(Player.localPlayer.userId).then(async list => {
            let bagData = list.find(e => e.cfgId == this._curData.itemID);
            let money = await RouteDefine.getFearCoin(Player.localPlayer.userId)
            if (this._curData.buyLimit == -1) {//不限购
                this._maxNum = Math.floor(money / this._curData.price)
            } else {
                let val1 = bagData ? this._curData.buyLimit - bagData.count : this._curData.buyLimit
                let val2 = Math.floor(money / this._curData.price)
                this._maxNum = Math.min(val1, val2);
            }
            this.text_num.text = bagData ? bagData.count.toString() : "0";//显示背包数量
            this.setBuyNumText()
        })
    }

    private setBuyNumText() {
        this.text_limit.text = `${this._curNum}/${this._maxNum}`;
        this.text_num_1.text = (this._curNum * this._curData.price).toString()
    }

}