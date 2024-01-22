
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/common/Guide.ui')
export default class Guide_Generate extends UIScript {
		private mBtn_cat_Internal: mw.Button
	public get mBtn_cat(): mw.Button {
		if(!this.mBtn_cat_Internal&&this.uiWidgetBase) {
			this.mBtn_cat_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_cat') as mw.Button
		}
		return this.mBtn_cat_Internal
	}
	private mBtn_dog_Internal: mw.Button
	public get mBtn_dog(): mw.Button {
		if(!this.mBtn_dog_Internal&&this.uiWidgetBase) {
			this.mBtn_dog_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_dog') as mw.Button
		}
		return this.mBtn_dog_Internal
	}
	private mPic_check_Internal: mw.Image
	public get mPic_check(): mw.Image {
		if(!this.mPic_check_Internal&&this.uiWidgetBase) {
			this.mPic_check_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mPic_check') as mw.Image
		}
		return this.mPic_check_Internal
	}
	private mPic_check2_Internal: mw.Image
	public get mPic_check2(): mw.Image {
		if(!this.mPic_check2_Internal&&this.uiWidgetBase) {
			this.mPic_check2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mPic_check2') as mw.Image
		}
		return this.mPic_check2_Internal
	}
	private mBtn_OK_Internal: mw.StaleButton
	public get mBtn_OK(): mw.StaleButton {
		if(!this.mBtn_OK_Internal&&this.uiWidgetBase) {
			this.mBtn_OK_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_OK') as mw.StaleButton
		}
		return this.mBtn_OK_Internal
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
		
		this.mBtn_OK.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_OK");
		})
		this.initLanguage(this.mBtn_OK);
		this.mBtn_OK.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mBtn_cat.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_cat");
		})
		this.mBtn_cat.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_dog.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_dog");
		})
		this.mBtn_dog.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

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
 