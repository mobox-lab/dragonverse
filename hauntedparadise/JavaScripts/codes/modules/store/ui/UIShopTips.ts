import ShopWindowTips_UI_Generate from "../../../../ui-generate/ShareUI/shop/ShopWindowTips_UI_generate";


export class UIShopTips extends ShopWindowTips_UI_Generate {

    private _callBack: Function;

    public static checkAction: Action1<boolean> = new Action1()
    private _isCheck: boolean = false;

    onStart() {
        this.btn_cancel.onClicked.add(() => {
            UIService.hide(UIShopTips)
        })

        this.btn_confirm.onClicked.add(() => {
            UIService.hide(UIShopTips);
            this._callBack && this._callBack()
        })

        this.btn_checked.onClicked.add(() => {
            this._isCheck = !this._isCheck;
            UIShopTips.checkAction.call(this._isCheck);
            this.setCheckState()
        })
    }

    onShow(title: string, content: string, call?: Function, showCheckBox: boolean = false) {
        this.text_tipstitle.text = title;
        this.text_tipscontent.text = content;
        this._callBack = call;
        this.mcheck_canvas.visibility = showCheckBox ? SlateVisibility.Visible : SlateVisibility.Collapsed
        this.setCheckState();
    }

    setCheckState() {
        this.img_checked.visibility = this._isCheck ? SlateVisibility.Visible : SlateVisibility.Collapsed
        this.img_unchecked.visibility = this._isCheck ? SlateVisibility.Collapsed : SlateVisibility.Visible
    }

}