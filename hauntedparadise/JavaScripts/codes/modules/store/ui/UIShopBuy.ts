/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-29 10:16:41
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-07 13:28:44
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\ui\UIShopBuy.ts
 * @Description  : 
 */
import { GameConfig } from "../../../../config/GameConfig";
import { IShopElement } from "../../../../config/Shop";
import Buy_UI_Generate from "../../../../ui-generate/ShareUI/shop/Buy_UI_generate";
import { RouteDefine } from "../../route/RouteDefine";
import StoreModuleC from "../StoreModuleC";
import { UIShopTips } from "./UIShopTips";

export class UIShopBuy extends Buy_UI_Generate {
    private _data: IShopElement
    private _curNum: number = 1;
    private _maxNum: number = undefined;
    private _curName: string;
    private _skipConform: boolean = false;
    onStart() {
        this.btn_back.onClicked.add(() => {
            UIService.hide(UIShopBuy);
        })

        this.btn_add.onClicked.add(() => {
            if (this._curNum >= this._maxNum) return
            this._curNum++;
            this.text_buynum.text = this._curNum.toString()
            this.updateCostMoney()
        })

        this.btn_minus.onClicked.add(() => {
            if (this._curNum <= 1) return
            this._curNum--;
            this.text_buynum.text = this._curNum.toString()
            this.updateCostMoney()
        })

        this.btn_max.onClicked.add(() => {
            this._curNum = this._maxNum;
            this.text_buynum.text = this._curNum.toString()
            this.updateCostMoney()
        })

        this.btn_buy.onClicked.add(() => {
            if (!this._data || !this._maxNum) return
            if (!this._skipConform) {
                UIService.show(UIShopTips, GameConfig.SubLanguage.shop_02.Value + GameConfig.SubLanguage.shoptips_01.Value,
                    StringUtil.format(GameConfig.SubLanguage.shoptips_04.Value, this._curNum * this._data.price, this._curNum, this._curName),
                    () => {
                        ModuleService.getModule(StoreModuleC).reqBuyItem(this._data, this._curNum);
                        UIService.hide(UIShopBuy)
                    },
                    true
                )
            } else {
                ModuleService.getModule(StoreModuleC).reqBuyItem(this._data, this._curNum);
                UIService.hide(UIShopBuy)
            }
        })
        UIShopTips.checkAction.add((state: boolean) => {
            this._skipConform = state
        })
    }

    onShow(data: IShopElement, canBuyCount: number) {
        this._data = data
        this._curNum = 1;
        let itemData = GameConfig.Item.getElement(this._data.itemID)
        this.img_icon.imageGuid = itemData.icon
        this._curName = itemData.name
        this.text_name.text = this._curName
        this.text_buynum.text = this._curNum.toString();
        this.text_desc.text = itemData.description;
        this.updateCostMoney();
        this.text_limit.visibility = this._data.buyLimit == -1 ? SlateVisibility.Collapsed : SlateVisibility.Visible
        //检查背包道具数量 计算最大可购买数量
        if (this._data.buyLimit == -1) canBuyCount = Infinity//不限购
        RouteDefine.getFearCoin(Player.localPlayer.userId).then(money => {
            this._maxNum = Math.min(Math.floor(money / this._data.price), canBuyCount)
            this.text_limit.text = StringUtil.format(GameConfig.SubLanguage.shop_08.Value, this._maxNum);
        })
    }

    updateCostMoney() {
        this.text_moneynum.text = (this._curNum * this._data.price).toString()
    }

}