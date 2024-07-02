import P12ShopPanel from "../shop/P12ShopPanel";
import SenzuBeanReConfirmPanel from "./SenzuBeanReConfirmPanel";
import Online_Confirm_Generate from "../../ui-generate/Onlineshop/Online_Confirm_generate";

export default class SenzuBeanConfirmPanel extends Online_Confirm_Generate {
    protected onStart(): void {
        // 关闭 Dialog
        this.mBtn_Close.onClicked.add(() => {
            UIService.hide(SenzuBeanConfirmPanel);
        });
        // 去购买道具
        this.btn_UnConfirm_Use.onClicked.add(() => {
            UIService.hide(SenzuBeanConfirmPanel);
            UIService.show(P12ShopPanel);
        });
        // 使用道具
        this.btn_Confirm_Use.onClicked.add(() => {
            UIService.hide(SenzuBeanConfirmPanel);
            UIService.show(SenzuBeanReConfirmPanel);
        });
    }
}