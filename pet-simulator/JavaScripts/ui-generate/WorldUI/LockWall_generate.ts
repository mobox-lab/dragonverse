
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/WorldUI/LockWall.ui')
export default class LockWall_Generate extends UIScript {
		private mPic_coins_Internal: mw.Image
	public get mPic_coins(): mw.Image {
		if(!this.mPic_coins_Internal&&this.uiWidgetBase) {
			this.mPic_coins_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_coins') as mw.Image
		}
		return this.mPic_coins_Internal
	}
	private mText_Coin_Internal: mw.TextBlock
	public get mText_Coin(): mw.TextBlock {
		if(!this.mText_Coin_Internal&&this.uiWidgetBase) {
			this.mText_Coin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Coin') as mw.TextBlock
		}
		return this.mText_Coin_Internal
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
		
		this.initLanguage(this.mText_Coin)
		
	
		//文本多语言
		
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
 