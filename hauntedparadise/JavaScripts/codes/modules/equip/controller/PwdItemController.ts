
@Component
export default class PwdItemController extends mw.Script {

    private _textView: mw.TextBlock;

    protected onStart(): void {
        const ui = this.gameObject.getChildByName("UI") as mw.UIWidget;
        if (!ui) return;
        let uiWidget = ui.getTargetUIWidget();
        this._textView = uiWidget.findChildByPath("RootCanvas/num_txt") as mw.TextBlock;
        this.gameObject["setData"] = this.setData.bind(this);
    }

    setData(data: any) {
        if (!this._textView) return;
        this._textView.text = data as string;
    }

}