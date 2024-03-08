/*
 * @Author       : dal
 * @Date         : 2024-02-26 15:58:52
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-05 16:19:50
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\bag\ui\ItemUseBox.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import BagUse_UI_Generate from "../../../../ui-generate/ShareUI/BagUse_UI_generate";
import Tips from "../../../utils/Tips";
import { EquipDefine } from "../../equip/EquipDefine";
import { BagItemData } from "../BagDefine";

export class ItemUseBox extends BagUse_UI_Generate {

    private useCount: number = 1;

    protected onStart() {
        this.btn_add.onClicked.add(this.onAddClick.bind(this));
        this.btn_minus.onClicked.add(this.onReduceClick.bind(this));
        this.btn_confirm.onClicked.add(this.confirm.bind(this));
        this.btn_cancel.onClicked.add(this.cancel.bind(this));
        this.btn_max.onClicked.add(this.max.bind(this));
    }

    private onAddClick() {
        if (this.useCount >= this.maxCount) { return; }
        this.useCount += 1;
        this.updateBuyCount();
    }

    private onReduceClick() {
        if (this.useCount <= 1) { return; }
        this.useCount -= 1;
        this.updateBuyCount();
    }

    private async confirm() {
        // 使用成功才关闭
        const useSuc = await EquipDefine.activeUseEquip(this.useCount);
        if (useSuc) {
            UIService.hideUI(this);
        }
    }

    private cancel() {
        EquipDefine.EquipItem(null);
        UIService.hideUI(this);
    }

    private max() {
        if (this.useCount === this.maxCount) {
            Tips.show(GameConfig.SubLanguage.bag_12.Value);
            return;
        }
        this.useCount = this.maxCount;
        this.updateBuyCount();
    }

    /** 最多的使用数量 */
    private maxCount: number = 1;

    protected onShow(cfg: IItemElement, data: BagItemData) {
        if (!cfg || !data) { return; }
        this.text_name.text = cfg.name;
        this.maxCount = data.count;
        this.itemImg_icon.imageGuid = cfg.icon;
        this.updateBuyCount();
        EquipDefine.EquipItem(data.guid);
    }

    private updateBuyCount() {
        if (this.useCount === 1) {
            this.btn_minus.enable = false;
        } else {
            this.btn_minus.enable = true;
        }
        if (this.useCount === this.maxCount) {
            this.btn_add.enable = false;
        } else {
            this.btn_add.enable = true;
        }
        this.text_buynum.text = this.useCount + "";
    }

    protected onHide() {
        this.useCount = 1;
    }
}