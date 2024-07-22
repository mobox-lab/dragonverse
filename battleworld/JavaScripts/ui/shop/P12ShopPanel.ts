import Gtk from "gtoolkit";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { P12ShopConfig } from "./P12ShopConfig";
import { Yoact } from "../../depend/yoact/Yoact";
import { P12ShopPanelItem } from "./P12ShopPanelItem";
import { P12BagModuleC } from "../../module/bag/P12BagModule";
import { AuthModuleC, ConsumeId } from "../../module/auth/AuthModule";
import Online_shop_Generate from "../../ui-generate/Onlineshop/Online_shop_generate";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import { MouseLockController } from "../../controller/MouseLockController";
import { Utils } from "../../util/uitls";

enum ShopToast {
    Success,
    Failure
}

export default class P12ShopPanel extends Online_shop_Generate {

    private _authC: AuthModuleC;
    private _bagC: P12BagModuleC;
    private _checkItem: P12ShopPanelItem;
    private _count = 0;
    private _total = Yoact.createYoact<{ data: bigint }>({data: 0n});
    private _onShopping = false;

    private get authC(): AuthModuleC | null {
        if (!this._authC) this._authC = ModuleService.getModule(AuthModuleC);
        return this._authC;
    }

    private get bagC(): P12BagModuleC | null {
        if (!this._bagC) this._bagC = ModuleService.getModule(P12BagModuleC);
        return this._bagC;
    }

    public isShowing: boolean = false;

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
            const available = BigInt(tokenBalance) - this._total.data;
            this.text_All.text = Utils.formatEtherInteger(this._total.data);
            this.text_Left.text = Utils.formatEtherInteger(available > 0n ? available : 0n);
            // 同步按钮点击状态
            this.btn_Buy.enable = this._total.data > 0n && available >= 0n;
        });
    }

    protected onShow(): void {
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => UIService.hideUI(this));
        MouseLockController.getInstance().needMouseUnlock();
        this.isShowing = true;
    }

    protected onHide(): void {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
        MouseLockController.getInstance().cancelMouseUnlock();
        this.isShowing = false;
    }

    private toast(type: ShopToast, message: string) {
        Gtk.trySetVisibility(this.can_BuyTips, true);
        this.text_SuccessText.text = message;
        this.img_Icon1.imageGuid = type === ShopToast.Success ? "373796" : "373795";

        setTimeout(() => {
            Gtk.trySetVisibility(this.can_BuyTips, false);
        }, 3000);
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
        if (item.data.resId !== this._checkItem?.data.resId) {
            this._checkItem?.resetStatus();
            this._checkItem = item;
            Gtk.trySetVisibility(this._checkItem.img_Background2, true);
        }
        this._count = count;
        this._total.data = BigInt(this._count) * this._checkItem.data.value;
    }

    /**
     * 重置购买选择
     * @private
     */
    private resetShopping() {
        this._checkItem.resetStatus();
        this._checkItem = undefined;
        this._count = 0;
        this._total.data = 0n;
        this._onShopping = false;
    }

    /**
     * 处理购买
     */
    private handleBuy() {
        if (!this._checkItem || !this._count || this._onShopping) return;
        this._onShopping = true;
        const count = this._count;
        const item = this._checkItem.data;

        Log4Ts.log(P12ShopPanel, `purchase ${ConsumeId[item.consumeId]} ${count}`);
        this.bagC.consumeCurrency(item.consumeId, count).then((res) => {
            if (!res) {
                this.toast(ShopToast.Failure, "Buy failed");
                this.resetShopping();
                return;
            }
            this.bagC.changeItemCount(item.resId, count);
            this.toast(ShopToast.Success, "Buy succeeded");
            this.resetShopping();
        });
    }
}