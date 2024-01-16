
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Pet/PetCollectItem.ui')
export default class PetCollectItem_Generate extends UIScript {
		private mPetImage_Internal: mw.Image
	public get mPetImage(): mw.Image {
		if(!this.mPetImage_Internal&&this.uiWidgetBase) {
			this.mPetImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mPetImage') as mw.Image
		}
		return this.mPetImage_Internal
	}
	private mPic_Heart_Internal: mw.Image
	public get mPic_Heart(): mw.Image {
		if(!this.mPic_Heart_Internal&&this.uiWidgetBase) {
			this.mPic_Heart_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mPic_Heart') as mw.Image
		}
		return this.mPic_Heart_Internal
	}
	private mPic_Rainbow_Internal: mw.Image
	public get mPic_Rainbow(): mw.Image {
		if(!this.mPic_Rainbow_Internal&&this.uiWidgetBase) {
			this.mPic_Rainbow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mPic_Rainbow') as mw.Image
		}
		return this.mPic_Rainbow_Internal
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
 