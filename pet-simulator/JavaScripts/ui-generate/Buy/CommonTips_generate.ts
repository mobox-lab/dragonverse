
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Buy/CommonTips.ui')
export default class CommonTips_Generate extends UIScript {
		private img_Bg_Internal: mw.Image
	public get img_Bg(): mw.Image {
		if(!this.img_Bg_Internal&&this.uiWidgetBase) {
			this.img_Bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_Bg') as mw.Image
		}
		return this.img_Bg_Internal
	}
	private text_Tip_Internal: mw.TextBlock
	public get text_Tip(): mw.TextBlock {
		if(!this.text_Tip_Internal&&this.uiWidgetBase) {
			this.text_Tip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_Bg/text_Tip') as mw.TextBlock
		}
		return this.text_Tip_Internal
	}



	public showAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
	public hideAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
 
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
		
		this.initLanguage(this.text_Tip)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

    public show(...param): void {
		Event.dispatchToLocal("ShowUIAction_37", this);
		this.showAction.call(this);
		mw.UIService.showUI(this, this.layer, ...param);
	}

    public hide(): void {
		Event.dispatchToLocal("HideUIAction_37", this);
		this.hideAction.call(this);
		mw.UIService.hideUI(this);
	}
}
 