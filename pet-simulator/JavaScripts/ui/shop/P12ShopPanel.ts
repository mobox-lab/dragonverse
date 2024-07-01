import Gtk from "../../util/GToolkit";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { P12ShopConfig } from "./P12ShopConfig";
import { Yoact } from "../../depend/yoact/Yoact";
import { formatEther, parseEther } from "@p12/viem";
import { P12ShopPanelItem } from "./P12ShopPanelItem";
import { AuthModuleC } from "../../modules/auth/AuthModule";
import Online_shop_Generate from "../../ui-generate/Onlineshop/Online_shop_generate";

export default class P12ShopPanel extends Online_shop_Generate {

    private _authC: AuthModuleC;
    private _checkItem: P12ShopPanelItem;
    private _count = 0;
    private _total = Yoact.createYoact<{ data: number }>({data: 0});

    private get authC(): AuthModuleC | null {
        if (!this._authC) this._authC = ModuleService.getModule(AuthModuleC);
        return this._authC;
    }

    protected onStart(): void {
        this.btn_Close.onClicked.add(() => {
            UIService.hide(P12ShopPanel);
        });

        this.btn_Buy.onClicked.add(() => {
            this.handleBuy();
        });

        this.createItem();
        this.initScrollBox();

        Yoact.bindYoact(() => {
            const tokenBalance = this.authC.currency.count ?? "0";
            const available = BigInt(tokenBalance) - parseEther(this._total.data.toString());
            this.text_All.text = this._total.data.toString();
            this.text_Left.text = formatEther(available > 0n ? available : 0n);
            // 同步按钮点击状态
            this.btn_Buy.enable = this._total.data > 0 && available >= 0n;
        });
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
            itemUI.onChange.add(this.onItemChecked, this);
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

    /**
     * 商店物品点击选中
     * @param {P12ShopPanelItem} item
     * @param {number} count
     * @private
     */
    private onItemChecked(item: P12ShopPanelItem, count: number) {
        if (!item.data) return;
        if (item.data.id !== this._checkItem?.data.id) {
            this._checkItem?.resetStatus();
            this._checkItem = item;
            this._checkItem.img_Background2.visibility = SlateVisibility.Visible;
        }
        this._count = count;
        this._total.data = this._count * parseInt(this._checkItem.data.value);
    }

    /**
     * 处理购买
     */
    private handleBuy() {
        if (!this._checkItem || !this._count) return;
        const item = this._checkItem.data;
        const count = this._count;
        // TODO: 完成购买接口
        Log4Ts.log(P12ShopPanel, `购买 ${item.name}, 数量: ${count}`);
        // buy success
        this._checkItem.resetStatus();
        this._checkItem = undefined;
        this._count = 0;
        this._total.data = 0;
    }

}