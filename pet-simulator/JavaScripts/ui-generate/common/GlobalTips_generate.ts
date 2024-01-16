
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/common/GlobalTips.ui')
export default class GlobalTips_Generate extends UIScript {
		private mCanvas_back_Internal: mw.Canvas
	public get mCanvas_back(): mw.Canvas {
		if(!this.mCanvas_back_Internal&&this.uiWidgetBase) {
			this.mCanvas_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_back') as mw.Canvas
		}
		return this.mCanvas_back_Internal
	}
	private mImage_Head_Internal: mw.Image
	public get mImage_Head(): mw.Image {
		if(!this.mImage_Head_Internal&&this.uiWidgetBase) {
			this.mImage_Head_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_back/mImage_Head') as mw.Image
		}
		return this.mImage_Head_Internal
	}
	private mCanvas_Text_Internal: mw.Canvas
	public get mCanvas_Text(): mw.Canvas {
		if(!this.mCanvas_Text_Internal&&this.uiWidgetBase) {
			this.mCanvas_Text_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Text') as mw.Canvas
		}
		return this.mCanvas_Text_Internal
	}
	private mText_Internal: mw.TextBlock
	public get mText(): mw.TextBlock {
		if(!this.mText_Internal&&this.uiWidgetBase) {
			this.mText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Text/mText') as mw.TextBlock
		}
		return this.mText_Internal
	}
	private mTextcopy_Internal: mw.TextBlock
	public get mTextcopy(): mw.TextBlock {
		if(!this.mTextcopy_Internal&&this.uiWidgetBase) {
			this.mTextcopy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTextcopy') as mw.TextBlock
		}
		return this.mTextcopy_Internal
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
		
	
		this.initLanguage(this.mTextcopy)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as any);
		
	

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
 