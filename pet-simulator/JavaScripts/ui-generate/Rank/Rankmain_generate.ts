
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Rank/Rankmain.ui')
export default class Rankmain_Generate extends UIScript {
		private mText_Title_Internal: mw.TextBlock
	public get mText_Title(): mw.TextBlock {
		if(!this.mText_Title_Internal&&this.uiWidgetBase) {
			this.mText_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Title') as mw.TextBlock
		}
		return this.mText_Title_Internal
	}
	private mImage_iconchange1_Internal: mw.Image
	public get mImage_iconchange1(): mw.Image {
		if(!this.mImage_iconchange1_Internal&&this.uiWidgetBase) {
			this.mImage_iconchange1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_iconchange1') as mw.Image
		}
		return this.mImage_iconchange1_Internal
	}
	private mImage_iconchange2_Internal: mw.Image
	public get mImage_iconchange2(): mw.Image {
		if(!this.mImage_iconchange2_Internal&&this.uiWidgetBase) {
			this.mImage_iconchange2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_iconchange2') as mw.Image
		}
		return this.mImage_iconchange2_Internal
	}
	private mBtn_refresh_Internal: mw.MaskButton
	public get mBtn_refresh(): mw.MaskButton {
		if(!this.mBtn_refresh_Internal&&this.uiWidgetBase) {
			this.mBtn_refresh_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_refresh') as mw.MaskButton
		}
		return this.mBtn_refresh_Internal
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
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/StaleButton") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/StaleButton_1") as any);
		
	
		//文本多语言
		
		this.initLanguage(this.mText_Title)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_1") as any);
		
	

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
 