/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */

@UIBind("UI/BuildItem.ui")
export default class BuildItem_Generate extends UIScript {
    private imgBg_Internal: mw.Image;
    public get imgBg(): mw.Image {
        if (!this.imgBg_Internal && this.uiWidgetBase) {
            this.imgBg_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/imgBg") as mw.Image;
        }
        return this.imgBg_Internal;
    }
    private canvasElement_Internal: mw.Canvas;
    public get canvasElement(): mw.Canvas {
        if (!this.canvasElement_Internal && this.uiWidgetBase) {
            this.canvasElement_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/canvasElement") as mw.Canvas;
        }
        return this.canvasElement_Internal;
    }
    private imgElement_Internal: mw.Image;
    public get imgElement(): mw.Image {
        if (!this.imgElement_Internal && this.uiWidgetBase) {
            this.imgElement_Internal = this.uiWidgetBase.findChildByPath(
                "RootCanvas/canvasElement/imgElement"
            ) as mw.Image;
        }
        return this.imgElement_Internal;
    }
    private textElement_Internal: mw.TextBlock;
    public get textElement(): mw.TextBlock {
        if (!this.textElement_Internal && this.uiWidgetBase) {
            this.textElement_Internal = this.uiWidgetBase.findChildByPath(
                "RootCanvas/canvasElement/textElement"
            ) as mw.TextBlock;
        }
        return this.textElement_Internal;
    }

    protected onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    protected initButtons() {
        //按钮添加点击

        //按钮添加点击

        //按钮多语言

        //文本多语言

        this.initLanguage(this.textElement);

        //文本多语言
    }
    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    protected onShow(...params: any[]): void {}

    public show(...param): void {
        UIService.showUI(this, this.layer, ...param);
    }

    public hide(): void {
        UIService.hideUI(this);
    }
}
