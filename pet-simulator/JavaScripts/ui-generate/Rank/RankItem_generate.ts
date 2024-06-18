
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Rank/RankItem.ui')
export default class RankItem_Generate extends UIScript {
		private mImage_1_Internal: mw.Image
	public get mImage_1(): mw.Image {
		if(!this.mImage_1_Internal&&this.uiWidgetBase) {
			this.mImage_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_1') as mw.Image
		}
		return this.mImage_1_Internal
	}
	private mText_RankNum_Internal: mw.TextBlock
	public get mText_RankNum(): mw.TextBlock {
		if(!this.mText_RankNum_Internal&&this.uiWidgetBase) {
			this.mText_RankNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_RankNum') as mw.TextBlock
		}
		return this.mText_RankNum_Internal
	}
	private mText_Username_Internal: mw.TextBlock
	public get mText_Username(): mw.TextBlock {
		if(!this.mText_Username_Internal&&this.uiWidgetBase) {
			this.mText_Username_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Username') as mw.TextBlock
		}
		return this.mText_Username_Internal
	}
	private mText_Count_Internal: mw.TextBlock
	public get mText_Count(): mw.TextBlock {
		if(!this.mText_Count_Internal&&this.uiWidgetBase) {
			this.mText_Count_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Count') as mw.TextBlock
		}
		return this.mText_Count_Internal
	}
	private mImage_Internal: mw.Image
	public get mImage(): mw.Image {
		if(!this.mImage_Internal&&this.uiWidgetBase) {
			this.mImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage') as mw.Image
		}
		return this.mImage_Internal
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
		
		this.initLanguage(this.mText_RankNum)
		
	
		this.initLanguage(this.mText_Username)
		
	
		this.initLanguage(this.mText_Count)
		
	
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
 