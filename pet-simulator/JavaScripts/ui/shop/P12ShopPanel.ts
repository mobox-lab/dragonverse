import Online_shop_Generate from "../../ui-generate/Onlineshop/Online_shop_generate";

export default class P12ShopPanel extends Online_shop_Generate {

    protected onStart(): void {
        this.btn_Close.onClicked.add(() => {
            UIService.hide(P12ShopPanel);
        });
    }

    protected onShow(...params: any[]): void {
        super.onShow(...params);
    }
}