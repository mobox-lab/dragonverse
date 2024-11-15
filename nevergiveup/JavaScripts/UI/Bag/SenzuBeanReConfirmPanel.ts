import Gtk from "gtoolkit";
import { Yoact } from "../../depend/yoact/Yoact";
import { GameConfig } from "../../config/GameConfig";
import { P12ItemResId } from "../../Modules/auth/AuthModule";
import { P12BagModuleC } from "../../Modules/bag/P12BagModule";
import { EnergyModuleC } from "../../Modules/Energy/EnergyModule";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import Online_ReConfirm_Generate from "../../ui-generate/Onlineshop/Online_ReConfirm_generate";

export default class SenzuBeanReConfirmPanel extends Online_ReConfirm_Generate {
    private _bagC: P12BagModuleC;
    private _energyC: EnergyModuleC;
    private _isUsing: boolean = false;

    private get bagC(): P12BagModuleC | null {
        if (!this._bagC) this._bagC = ModuleService.getModule(P12BagModuleC);
        return this._bagC;
    }

    private get energyC(): EnergyModuleC | null {
        if (!this._energyC) this._energyC = ModuleService.getModule(EnergyModuleC);
        return this._energyC;
    }

    protected onStart(): void {
        this.btn_UnConfirm_Use.onClicked.add(() => {
            UIService.hide(SenzuBeanReConfirmPanel);
        });

        this.btn_Confirm_Use.onClicked.add(() => {
            this.useSenzuBean();
        });

        Yoact.bindYoact(() => {
            // const staminaConfig = P12ShopConfig[0];
            // const recovery = Math.round(this.energyC.viewEnergyLimit.data * staminaConfig.effect);
            const recovery = 200;
            Gtk.trySetText(this.text_Recovery, StringUtil.format(GameConfig.Language.Online_shop011.Value, recovery));
        });
    }

    protected onShow(): void {
        this.energyC.refreshStaminaLimit();
        // 注册快捷键
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => UIService.hideUI(this));
        // KeyOperationManager.getInstance().onKeyUp(this, Keys.E, () => this.useSenzuBean());
    }

    protected onHide() {
        // 重置
        Gtk.trySetVisibility(this.can_Confirming, false);
        Gtk.trySetVisibility(this.btn_Confirm_Use, true);
        Gtk.trySetVisibility(this.btn_UnConfirm_Use, true);
        // 清除快捷键
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
        // KeyOperationManager.getInstance().unregisterKey(this, Keys.E);
    }

    /**
     * 使用体力药水，默认只能用1个
     * @private
     */
    private useSenzuBean() {
        if (this._isUsing) return;
        this._isUsing = true;
        Gtk.trySetVisibility(this.can_Confirming, true);
        Gtk.trySetVisibility(this.btn_Confirm_Use, false);
        Gtk.trySetVisibility(this.btn_UnConfirm_Use, false);
        this.bagC.changeItemCount(P12ItemResId.StaminaPotion, -1);

        this.bagC.consumePotion(1)?.then(() => {
            this._isUsing = false;
            UIService.hide(SenzuBeanReConfirmPanel);
        });
    }
}