/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-23 18:36:08
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-07 15:42:38
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\ui\UIGaintem.ts
 * @Description  : 
 */

import Successful_UI_Generate from "../../../../ui-generate/ShareUI/shop/Successful_UI_generate";

export class UIGainItem extends Successful_UI_Generate {

    onStart() {
        this.btn_confirm.onClicked.add(() => {
            UIService.hide(UIGainItem)
        })
        this.layer = UILayerSystem
    }

    onShow(icon: string, name: string, count: number = 1) {
        this.img_icon.imageGuid = icon;
        this.text_name.text = name;
        this.text_num.text = count.toString()
        this.canUpdate = true;
    }

    onHide() {
        this.canUpdate = false;
    }

    onUpdate(dt: number) {
        this.img_flash.renderTransformAngle += 1
    }
}