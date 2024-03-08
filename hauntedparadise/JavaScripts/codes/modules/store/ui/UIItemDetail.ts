/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-27 16:39:24
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-02-28 17:06:32
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\ui\UIItemDetail.ts
 * @Description  : 
 */

import { IItemElement } from "../../../../config/Item";
import ShopDetail_UI_Generate from "../../../../ui-generate/ShareUI/shop/ShopDetail_UI_generate";
import { CloseFloatWindow } from "../../../ui/CloseFloatWindow";

export class UIItemDetail extends ShopDetail_UI_Generate {

    onShow(data: IItemElement, position: Vector2) {
        this.img_itemicon.imageGuid = data.icon;
        this.text_name.text = data.name;
        this.text_introduce.text = data.description;
        this.rootCanvas.position = position;
        UIService.show(CloseFloatWindow)
    }

}