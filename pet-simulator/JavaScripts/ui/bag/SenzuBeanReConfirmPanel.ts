import Gtk from "../../util/GToolkit";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import Online_ReConfirm_Generate from "../../ui-generate/Onlineshop/Online_ReConfirm_generate";

export default class SenzuBeanReConfirmPanel extends Online_ReConfirm_Generate {
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

    private useSenzuBean() {
        Gtk.trySetVisibility(this.btn_Confirm_Use, false);
        Gtk.trySetVisibility(this.btn_UnConfirm_Use, false);
        Gtk.trySetVisibility(this.btn_Confirming, true);

        setTimeout(() => {
            // TODO：调用使用体力道具，并刷新体力
            UIService.hide(SenzuBeanReConfirmPanel);
        }, 2000);
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