/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-23 13:53:50
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-02-23 13:53:51
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\ui\UITabItem.ts
 * @Description  : 
 */

import ShopTab_UI_Generate from "../../../../ui-generate/ShareUI/shop/ShopTab_UI_generate";
import UIShop from "./UIShop";

export class UITabItem extends ShopTab_UI_Generate {
    private _index: number = 1
    onStart() {
        this.btn_tab1.onClicked.add(() => {
            UIService.getUI(UIShop).switchTab(this._index)
        })
    }

    setData(index: number) {
        this._index = index
    }
}