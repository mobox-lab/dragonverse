
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Trade/TradeChoose.ui')
export default class TradeChoose_Generate extends UIScript {
		private mHistory_Btn_Internal: mw.StaleButton
	public get mHistory_Btn(): mw.StaleButton {
		if(!this.mHistory_Btn_Internal&&this.uiWidgetBase) {
			this.mHistory_Btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/mHistory_Btn') as mw.StaleButton
		}
		return this.mHistory_Btn_Internal
	}
	private mOpen_Btn_Internal: mw.StaleButton
	public get mOpen_Btn(): mw.StaleButton {
		if(!this.mOpen_Btn_Internal&&this.uiWidgetBase) {
			this.mOpen_Btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/mOpen_Btn') as mw.StaleButton
		}
		return this.mOpen_Btn_Internal
	}
	private mUserCanvas_Internal: mw.Canvas
	public get mUserCanvas(): mw.Canvas {
		if(!this.mUserCanvas_Internal&&this.uiWidgetBase) {
			this.mUserCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/ScrollBox/mUserCanvas') as mw.Canvas
		}
		return this.mUserCanvas_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
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
		
		this.mHistory_Btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mHistory_Btn");
		})
		this.initLanguage(this.mHistory_Btn);
		this.mHistory_Btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mOpen_Btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mOpen_Btn");
		})
		this.initLanguage(this.mOpen_Btn);
		this.mOpen_Btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_1/TextBlock") as any);
		
	

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
 