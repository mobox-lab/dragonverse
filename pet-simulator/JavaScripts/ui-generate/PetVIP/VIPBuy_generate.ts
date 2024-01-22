
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/PetVIP/VIPBuy.ui')
export default class VIPBuy_Generate extends UIScript {
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
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mBtn_Yes/TextBlock_3") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock") as any);
		
	

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
 