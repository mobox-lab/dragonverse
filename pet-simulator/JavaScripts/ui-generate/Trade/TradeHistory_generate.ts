
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Trade/TradeHistory.ui')
export default class TradeHistory_Generate extends UIScript {
		private mCanvas_SelectPet_Internal: mw.Canvas
	public get mCanvas_SelectPet(): mw.Canvas {
		if(!this.mCanvas_SelectPet_Internal&&this.uiWidgetBase) {
			this.mCanvas_SelectPet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/ScrollBox/mCanvas_SelectPet') as mw.Canvas
		}
		return this.mCanvas_SelectPet_Internal
	}
	private mCanvas_ReceivePet_Internal: mw.Canvas
	public get mCanvas_ReceivePet(): mw.Canvas {
		if(!this.mCanvas_ReceivePet_Internal&&this.uiWidgetBase) {
			this.mCanvas_ReceivePet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/ScrollBox_1/mCanvas_ReceivePet') as mw.Canvas
		}
		return this.mCanvas_ReceivePet_Internal
	}
	private mText_ReceiveDM_Internal: mw.TextBlock
	public get mText_ReceiveDM(): mw.TextBlock {
		if(!this.mText_ReceiveDM_Internal&&this.uiWidgetBase) {
			this.mText_ReceiveDM_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_ReceiveDM') as mw.TextBlock
		}
		return this.mText_ReceiveDM_Internal
	}
	private mText_DMnum_Internal: mw.TextBlock
	public get mText_DMnum(): mw.TextBlock {
		if(!this.mText_DMnum_Internal&&this.uiWidgetBase) {
			this.mText_DMnum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_DMnum') as mw.TextBlock
		}
		return this.mText_DMnum_Internal
	}
	private mBtn_Back_Internal: mw.StaleButton
	public get mBtn_Back(): mw.StaleButton {
		if(!this.mBtn_Back_Internal&&this.uiWidgetBase) {
			this.mBtn_Back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_Back') as mw.StaleButton
		}
		return this.mBtn_Back_Internal
	}
	private yourtext_Internal: mw.TextBlock
	public get yourtext(): mw.TextBlock {
		if(!this.yourtext_Internal&&this.uiWidgetBase) {
			this.yourtext_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/yourtext') as mw.TextBlock
		}
		return this.yourtext_Internal
	}
	private mText_UserName_Internal: mw.TextBlock
	public get mText_UserName(): mw.TextBlock {
		if(!this.mText_UserName_Internal&&this.uiWidgetBase) {
			this.mText_UserName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_UserName') as mw.TextBlock
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
		
		this.mBtn_Back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Back");
		})
		this.initLanguage(this.mBtn_Back);
		this.mBtn_Back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_ReceiveDM)
		
	
		this.initLanguage(this.mText_DMnum)
		
	
		this.initLanguage(this.yourtext)
		
	
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
 