/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-27 10:31:13
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-06 16:29:42
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\treasure\ui\UIPrizeItem.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import PrizeItem_UI_Generate from "../../../../ui-generate/ShareUI/treasureBox/PrizeItem_UI_generate";
import { CommonUtils } from "../../../utils/CommonUtils";
import { UIItemDetail } from "../../store/ui/UIItemDetail";

export class UIPrizeItem extends PrizeItem_UI_Generate {

    private _data: IItemElement
    private _myRootCanvas: Canvas
    onStart() {
        this._myRootCanvas = this.uiWidgetBase.findChildByPath("RootCanvas") as Canvas
        this.btn_detail.onClicked.add(() => {
            if (!this._myRootCanvas) return
            let position = CommonUtils.getViewPosition(this._myRootCanvas, this._myRootCanvas.position);
            position.y -= 100
            position.x += 100
            UIService.show(UIItemDetail, this._data, position)
        })
    }

    setData(id: number) {
        let data = GameConfig.Item.getElement(id)
        if (!data) return
        let quality = GameConfig.ItemQuality.getElement(data.quality)
        this._data = data
        this.img_icon.imageGuid = data.icon;
        this.text_name.text = data.name;
        if (quality) this.img_bg1.imageGuid = quality.imgGuid
        this.text_num.text = ""//count.toString()
    }

}