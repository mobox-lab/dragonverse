
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Buy/BuyUI.ui')
export default class BuyUI_Generate extends UIScript {
		private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}
	private mBtn_Yes_Internal: mw.Button
	public get mBtn_Yes(): mw.Button {
		if(!this.mBtn_Yes_Internal&&this.uiWidgetBase) {
			this.mBtn_Yes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_Yes') as mw.Button
		}
		return this.mBtn_Yes_Internal
	}
	private mBtn_Buy_1_Internal: mw.Button
	public get mBtn_Buy_1(): mw.Button {
		if(!this.mBtn_Buy_1_Internal&&this.uiWidgetBase) {
			this.mBtn_Buy_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_Buy_1') as mw.Button
		}
		return this.mBtn_Buy_1_Internal
	}
	private mBtn_Buy_2_Internal: mw.Button
	public get mBtn_Buy_2(): mw.Button {
		if(!this.mBtn_Buy_2_Internal&&this.uiWidgetBase) {
			this.mBtn_Buy_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_Buy_2') as mw.Button
		}
		return this.mBtn_Buy_2_Internal
	}
	private mBtn_Buy_3_Internal: mw.Button
	public get mBtn_Buy_3(): mw.Button {
		if(!this.mBtn_Buy_3_Internal&&this.uiWidgetBase) {
			this.mBtn_Buy_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_Buy_3') as mw.Button
		}
		return this.mBtn_Buy_3_Internal
	}
	private mBtn_Buy_4_Internal: mw.Button
	public get mBtn_Buy_4(): mw.Button {
		if(!this.mBtn_Buy_4_Internal&&this.uiWidgetBase) {
			this.mBtn_Buy_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_Buy_4') as mw.Button
		}
		return this.mBtn_Buy_4_Internal
	}
	private mBtn_Buy_5_Internal: mw.Button
	public get mBtn_Buy_5(): mw.Button {
		if(!this.mBtn_Buy_5_Internal&&this.uiWidgetBase) {
			this.mBtn_Buy_5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_Buy_5') as mw.Button
		}
		return this.mBtn_Buy_5_Internal
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
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Yes.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Yes");
		})
		this.mBtn_Yes.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Buy_1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Buy_1");
		})
		this.mBtn_Buy_1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Buy_2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Buy_2");
		})
		this.mBtn_Buy_2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Buy_3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Buy_3");
		})
		this.mBtn_Buy_3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Buy_4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Buy_4");
		})
		this.mBtn_Buy_4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Buy_5.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Buy_5");
		})
		this.mBtn_Buy_5.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mBtn_Yes/TextBlock_3") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mBtn_Buy_1/TextBlock_4") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mBtn_Buy_2/TextBlock_5") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mBtn_Buy_3/TextBlock_6") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mBtn_Buy_4/TextBlock_7") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mBtn_Buy_5/TextBlock_8") as any);
		
	

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
 