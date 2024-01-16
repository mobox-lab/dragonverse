
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Pet/ReName.ui')
export default class ReName_Generate extends UIScript {
		private mSureBtn_Internal: mw.StaleButton
	public get mSureBtn(): mw.StaleButton {
		if(!this.mSureBtn_Internal&&this.uiWidgetBase) {
			this.mSureBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mSureBtn') as mw.StaleButton
		}
		return this.mSureBtn_Internal
	}
	private mBtn_Random_Internal: mw.Button
	public get mBtn_Random(): mw.Button {
		if(!this.mBtn_Random_Internal&&this.uiWidgetBase) {
			this.mBtn_Random_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_Random') as mw.Button
		}
		return this.mBtn_Random_Internal
	}
	private mNameInputBox_Internal: mw.InputBox
	public get mNameInputBox(): mw.InputBox {
		if(!this.mNameInputBox_Internal&&this.uiWidgetBase) {
			this.mNameInputBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mNameInputBox') as mw.InputBox
		}
		return this.mNameInputBox_Internal
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
		
		this.mSureBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSureBtn");
		})
		this.initLanguage(this.mSureBtn);
		this.mSureBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mBtn_Random.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Random");
		})
		this.mBtn_Random.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
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
 