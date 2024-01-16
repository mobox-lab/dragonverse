
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Catching/CoinUI.ui')
export default class CoinUI_Generate extends UIScript {
		private mCanvas_Clawcoin_Internal: mw.Canvas
	public get mCanvas_Clawcoin(): mw.Canvas {
		if(!this.mCanvas_Clawcoin_Internal&&this.uiWidgetBase) {
			this.mCanvas_Clawcoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Clawcoin') as mw.Canvas
		}
		return this.mCanvas_Clawcoin_Internal
	}
	private mPic_coin_Internal: mw.Image
	public get mPic_coin(): mw.Image {
		if(!this.mPic_coin_Internal&&this.uiWidgetBase) {
			this.mPic_coin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Clawcoin/mPic_coin') as mw.Image
		}
		return this.mPic_coin_Internal
	}
	private mText_coin_Internal: mw.TextBlock
	public get mText_coin(): mw.TextBlock {
		if(!this.mText_coin_Internal&&this.uiWidgetBase) {
			this.mText_coin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Clawcoin/mText_coin') as mw.TextBlock
		}
		return this.mText_coin_Internal
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
		
		this.initLanguage(this.mText_coin)
		
	
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
 