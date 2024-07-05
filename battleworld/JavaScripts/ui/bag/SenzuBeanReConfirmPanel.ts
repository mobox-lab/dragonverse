import Gtk from "../../util/GToolkit";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import Online_ReConfirm_Generate from "../../ui-generate/Onlineshop/Online_ReConfirm_generate";
import { P12BagModuleC } from "../../module/P12Bag/P12BagModule";
import { P12ItemResId } from "../../module/auth/AuthModule";

export default class SenzuBeanReConfirmPanel extends Online_ReConfirm_Generate {
    private _bagC: P12BagModuleC;
    private get bagC(): P12BagModuleC | null {
        if (!this._bagC) this._bagC = ModuleService.getModule(P12BagModuleC);
        return this._bagC;
    }

    protected onStart(): void {
        this.btn_UnConfirm_Use.onClicked.add(() => {
            UIService.hide(SenzuBeanReConfirmPanel);
        });

        this.btn_Confirm_Use.onClicked.add(() => {
            this.useSenzuBean();
        });

        // 注册快捷键
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            UIService.hideUI(this);
        });

        KeyOperationManager.getInstance().onKeyUp(this, Keys.E, () => {
            this.useSenzuBean();
        });
    }

    /**
     * 使用体力药水，默认只能用1个
     * @private
     */
    private useSenzuBean() {
        Gtk.trySetVisibility(this.btn_Confirm_Use, false);
        Gtk.trySetVisibility(this.btn_UnConfirm_Use, false);
        Gtk.trySetVisibility(this.btn_Confirming, true);

        this.bagC.consumePotion(1).then(() => {
            UIService.hide(SenzuBeanReConfirmPanel);
            this.bagC.changeItemCount(P12ItemResId.StaminaPotion, -1);
        });
    }

    private onHide() {
        // 重置
        Gtk.trySetVisibility(this.btn_Confirming, false);
        Gtk.trySetVisibility(this.btn_Confirm_Use, true);
        Gtk.trySetVisibility(this.btn_UnConfirm_Use, true);
        // 清除快捷键
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
        KeyOperationManager.getInstance().unregisterKey(this, Keys.E);
    }
}