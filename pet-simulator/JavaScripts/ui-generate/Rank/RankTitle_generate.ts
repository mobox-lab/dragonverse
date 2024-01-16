
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Rank/RankTitle.ui')
export default class RankTitle_Generate extends UIScript {
		private mImage_BG_Internal: mw.Image
	public get mImage_BG(): mw.Image {
		if(!this.mImage_BG_Internal&&this.uiWidgetBase) {
			this.mImage_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_BG') as mw.Image
		}
		return this.mImage_BG_Internal
	}
	private mText_RankLevel_Internal: mw.TextBlock
	public get mText_RankLevel(): mw.TextBlock {
		if(!this.mText_RankLevel_Internal&&this.uiWidgetBase) {
			this.mText_RankLevel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_RankLevel') as mw.TextBlock
		}
		return this.mText_RankLevel_Internal
	}
	private mText_UserName_Internal: mw.TextBlock
	public get mText_UserName(): mw.TextBlock {
		if(!this.mText_UserName_Internal&&this.uiWidgetBase) {
			this.mText_UserName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_UserName') as mw.TextBlock
		}
		return this.mText_UserName_Internal
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
		
		this.initLanguage(this.mText_RankLevel)
		
	
		this.initLanguage(this.mText_UserName)
		
	
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
 