import Gtk from "../../util/GToolkit";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { P12ShopConfig, P12ShopItem } from "./P12ShopConfig";
import { P12ShopPanelItem } from "./P12ShopPanelItem";
import Online_shop_Generate from "../../ui-generate/Onlineshop/Online_shop_generate";

export default class P12ShopPanel extends Online_shop_Generate {

    private _checkItem: P12ShopItem;

    protected onStart(): void {
        this.btn_Close.onClicked.add(() => {
            UIService.hide(P12ShopPanel);
        });

        this.createItem();
        this.initScrollBox();
    }

    protected onShow(...params: any[]): void {
        super.onShow(...params);
    }

    /**
     * 初始化商店数据
     * @private
     */
    private createItem() {
        P12ShopConfig.forEach(item => {
            const itemUI = UIService.create(P12ShopPanelItem);
            itemUI.setData(item);
            this.can_ShopItem.addChild(itemUI.uiObject);
        });
    }

    /**
     * 设置 SmartLayoutStrategy
     * @private
     */
    private initScrollBox(): void {
        const container = this.can_ShopItem;
        const scrollBox = this.scr_ShopItem;
        const currentLayoutRule = container.autoLayoutRule;
        const padding = container.autoLayoutPadding;
        if (padding.bottom > 0) {
            Log4Ts.warn(P12ShopPanel, `检测正使用 padding.bottom.`,
                `在水平滑动的控件中使用此属性可能导致布局计算问题.`,
                `此 Bug 可能来自 UE 内部.`,
                `已智能覆写为 0.`,
                `如不需要智能覆写 请关闭 useSmartLayoutStrategy 选项.`);
            padding.bottom = 0;
        }
        Gtk.setUiSizeY(container, scrollBox.size.y);
        container.autoLayoutRule = new mw.UILayout(
            currentLayoutRule.layoutSpace,
            padding,
            UILayoutType.Vertical,
            currentLayoutRule.layoutPacket,
            new UIHugContent(UIHugContentHorizontally.HugContent, UIHugContentVertically.FixHeight),
            true,
            true,
        );
        container.autoSizeHorizontalEnable = true;
        container.autoSizeVerticalEnable = false;
    }

    private itemChecked(item: P12ShopPanelItem) {
        Log4Ts.log(P12ShopPanel, "checked", JSON.stringify(item));
        item.img_Background.imageColor = new mw.LinearColor(255, 255, 255);
        this._checkItem = item.data;
    }

}