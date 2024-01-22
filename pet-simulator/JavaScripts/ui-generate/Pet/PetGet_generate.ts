
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Pet/PetGet.ui')
export default class PetGet_Generate extends UIScript {
		private mImage_Internal: mw.Image
	public get mImage(): mw.Image {
		if(!this.mImage_Internal&&this.uiWidgetBase) {
			this.mImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImage') as mw.Image
		}
		return this.mImage_Internal
	}
	private mNameText_Internal: mw.TextBlock
	public get mNameText(): mw.TextBlock {
		if(!this.mNameText_Internal&&this.uiWidgetBase) {
			this.mNameText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mNameText') as mw.TextBlock
		}
		return this.mNameText_Internal
	}
	private mQualityText_Internal: mw.TextBlock
	public get mQualityText(): mw.TextBlock {
		if(!this.mQualityText_Internal&&this.uiWidgetBase) {
			this.mQualityText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mQualityText') as mw.TextBlock
		}
		return this.mQualityText_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mPic_Flash_Internal: mw.Image
	public get mPic_Flash(): mw.Image {
		if(!this.mPic_Flash_Internal&&this.uiWidgetBase) {
			this.mPic_Flash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_Flash') as mw.Image
		}
		return this.mPic_Flash_Internal
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
		
		this.initLanguage(this.mNameText)
		
	
		this.initLanguage(this.mQualityText)
		
	
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
 