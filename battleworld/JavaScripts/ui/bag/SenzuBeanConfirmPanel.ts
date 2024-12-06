import P12ShopPanel from "../shop/P12ShopPanel";
import { P12ItemResId } from "../../module/auth/AuthModule";
import { P12BagModuleC } from "../../module/bag/P12BagModule";
import SenzuBeanReConfirmPanel from "./SenzuBeanReConfirmPanel";
import { MouseLockController } from "../../controller/MouseLockController";
import Online_Confirm_Generate from "../../ui-generate/Onlineshop/Online_Confirm_generate";

export default class SenzuBeanConfirmPanel extends Online_Confirm_Generate {
    private _bagC: P12BagModuleC;
    private get bagC(): P12BagModuleC | null {
        if (!this._bagC) this._bagC = ModuleService.getModule(P12BagModuleC);
        return this._bagC;
    }

    protected onStart(): void {
        // 关闭 Dialog
        this.mBtn_Close.onClicked.add(() => {
            UIService.hide(SenzuBeanConfirmPanel);
        });
        // 去购买道具
        // this.btn_UnConfirm_Use.onClicked.add(() => {
        //     UIService.hide(SenzuBeanConfirmPanel);
        //     UIService.show(P12ShopPanel);
        // });
        // 使用道具
        this.btn_Confirm_Use.onClicked.add(() => {
            UIService.hide(SenzuBeanConfirmPanel);
            UIService.show(SenzuBeanReConfirmPanel);
        });
        // 刷新道具
        // this.btn_Confirm_Refresh.onClicked.add(() => {
        //     this.bagC.refreshBagItem().then(() => {
        //         this.getSenzuBeanCount();
        //     });
        // });
    }

    protected onShow() {
        this.getSenzuBeanCount();
    }

    protected onHide(): void {
        MouseLockController.getInstance().cancelMouseUnlock();
    }

    private getSenzuBeanCount() {
        const spCount = this.bagC.getItem(P12ItemResId.StaminaPotion);
        this.btn_Confirm_Use.enable = spCount > 0;
        this.text_Number.text = spCount.toString();
        MouseLockController.getInstance().needMouseUnlock();
    }

}