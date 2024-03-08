/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-29 16:01:32
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-05 10:21:51
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\ui\UIGiftBagOpen.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import GiftBagOpen_UI_Generate from "../../../../ui-generate/ShareUI/props/GiftBagOpen_UI_generate";
import { RouteDefine } from "../../route/RouteDefine";
import StoreModuleC from "../StoreModuleC";

export class UIGiftBagOpen extends GiftBagOpen_UI_Generate {

    private _curData: IItemElement;

    /**拥有数量 */
    private _hasCount: number = 0;
    onStart() {
        this.btn_back.onClicked.add(() => {
            UIService.hide(UIGiftBagOpen);
        })
        this.btn_open.onClicked.add(() => {
            if (this._hasCount <= 0 || !this._curData) return
            ModuleService.getModule(StoreModuleC).reqOpenGiftPack(this._curData.id, 1)

        })

        this.btn_openAll.onClicked.add(() => {
            if (this._hasCount <= 0 || !this._curData) return
            ModuleService.getModule(StoreModuleC).reqOpenGiftPack(this._curData.id, this._hasCount)
        })

        this.btn_skip2.onClicked.add(() => {
            StoreModuleC.skipDisplay = !StoreModuleC.skipDisplay;
            this.setSkipState()
        })

        RouteDefine.onItemChange.add((cfgId: number, count: number) => {
            if (!this._curData || this._curData.id != cfgId) return
            this._hasCount = count;
            this.text_num2.text = this._hasCount.toString()
        })
    }

    onShow(itemID: number) {
        this._curData = GameConfig.Item.getElement(itemID);
        this.img_coin1.imageGuid = this._curData.icon;
        this.text_title.text = StringUtil.format(GameConfig.SubLanguage.packbuy_02.Value, this._curData.name)
        RouteDefine.getSpecialItemDataList(Player.localPlayer.userId).then(list => {
            let bagData = list.find(e => e.cfgId == itemID);
            this._hasCount = bagData ? bagData.count : 0
            this.text_num2.text = this._hasCount.toString()

        })
        this.setSkipState()
    }

    setSkipState() {
        this.img_skip1.visibility = StoreModuleC.skipDisplay ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Hidden;
    }

}