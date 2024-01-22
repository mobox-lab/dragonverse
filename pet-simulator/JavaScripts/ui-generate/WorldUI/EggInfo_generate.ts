
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/WorldUI/EggInfo.ui')
export default class EggInfo_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mImage_Internal: mw.Image
	public get mImage(): mw.Image {
		if(!this.mImage_Internal&&this.uiWidgetBase) {
			this.mImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImage') as mw.Image
		}
		return this.mImage_Internal
	}
	private mText_Internal: mw.TextBlock
	public get mText(): mw.TextBlock {
		if(!this.mText_Internal&&this.uiWidgetBase) {
			this.mText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText') as mw.TextBlock
		}
		return this.mText_Internal
	}
	private mPic_Heart_Internal: mw.Image
	public get mPic_Heart(): mw.Image {
		if(!this.mPic_Heart_Internal&&this.uiWidgetBase) {
			this.mPic_Heart_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mPic_Heart') as mw.Image
		}
		return this.mPic_Heart_Internal
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
		
		this.initLanguage(this.mText)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock") as any);
		
	

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
 