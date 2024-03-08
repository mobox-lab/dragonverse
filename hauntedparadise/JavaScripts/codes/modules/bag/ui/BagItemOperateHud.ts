/*
 * @Author       : dal
 * @Date         : 2024-02-27 11:48:57
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-07 15:23:43
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\bag\ui\BagItemOperateHud.ts
 * @Description  : 
 */
import BagOperate_UI_Generate from "../../../../ui-generate/ShareUI/BagOperate_UI_generate";
import { BagItemUI } from "../../../ui/BagItemUI";
import BagPanel from "./BagPanel";
import { ItemUseBox } from "./ItemUseBox";

export class BagItemOperateHud extends BagOperate_UI_Generate {

    private bagItemUI: BagItemUI

    public hideAllInfo() {
        this.viewMoreBtn(false);
        this.viewIntro(false);
    }

    public viewMoreBtn(enable: boolean) {
        this.canvas_operate.visibility = enable ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    public viewIntro(enable: boolean) {
        this.canvas_introduce.visibility = enable ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    public onStart() {
        this.btn_use.onClicked.add(this.onUse.bind(this));
        this.btn_move.onClicked.add(this.onMove.bind(this));
        this.btn_detail.onClicked.add(this.onDescView.bind(this));
    }

    private onUse() {
        UIService.show(ItemUseBox, this.bagItemUI.cfg, this.bagItemUI.data);
        this.bagItemUI.onSelect.call();
    }

    private onMove() {
        this.selfPanel.enterChangeMode();
        this.viewMoreBtn(false);
    }

    private onDescView() {
        this.viewIntro(true);
        this.viewMoreBtn(false);
    }

    private get selfPanel() {
        return UIService.getUI(BagPanel);
    }

    protected onShow(bagItemUI: BagItemUI) {
        this.bagItemUI = bagItemUI;
        this.viewMoreBtn(true);
        this.viewIntro(false);

        // 获取此时按钮的绝对位置
        const btnAbs = bagItemUI.rootCanvas.cachedGeometry.getAbsolutePosition();
        // 获取背包根画布的绝对位置
        const bagAbs = this.selfPanel.rootCanvas.cachedGeometry.getAbsolutePosition();
        // 计算差值
        let targetAbsPos = btnAbs.subtract(bagAbs);
        // 消除DPI的影响
        targetAbsPos.x *= 1.2;
        targetAbsPos.y *= 1.2;
        this.uiObject.position = targetAbsPos;

        // 使用按钮的显隐
        this.btn_use.visibility = this.bagItemUI.cfg.clazz !== "InteractItem" && bagItemUI.cfg.isCanActiveUse && bagItemUI.cfg.isConsumable ? SlateVisibility.Visible : SlateVisibility.Collapsed;
        // 详细信息注入
        this.text_name.text = bagItemUI.cfg.name;
        this.text_introduce.text = bagItemUI.cfg.description;
    }
}
