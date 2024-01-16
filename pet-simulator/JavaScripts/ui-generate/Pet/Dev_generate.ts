
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Pet/Dev.ui')
export default class Dev_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mCanvas_List_Internal: mw.Canvas
	public get mCanvas_List(): mw.Canvas {
		if(!this.mCanvas_List_Internal&&this.uiWidgetBase) {
			this.mCanvas_List_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScrollBox/mCanvas_List') as mw.Canvas
		}
		return this.mCanvas_List_Internal
	}
	private mButton_Close_Internal: mw.Button
	public get mButton_Close(): mw.Button {
		if(!this.mButton_Close_Internal&&this.uiWidgetBase) {
			this.mButton_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mButton_Close') as mw.Button
		}
		return this.mButton_Close_Internal
	}
	private mCanvas_Left_Internal: mw.Canvas
	public get mCanvas_Left(): mw.Canvas {
		if(!this.mCanvas_Left_Internal&&this.uiWidgetBase) {
			this.mCanvas_Left_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_Left') as mw.Canvas
		}
		return this.mCanvas_Left_Internal
	}
	private mTextBlock_Rate_Internal: mw.TextBlock
	public get mTextBlock_Rate(): mw.TextBlock {
		if(!this.mTextBlock_Rate_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Rate_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_Left/mTextBlock_Rate') as mw.TextBlock
		}
		return this.mTextBlock_Rate_Internal
	}
	private mTextBlock_Intro_Internal: mw.TextBlock
	public get mTextBlock_Intro(): mw.TextBlock {
		if(!this.mTextBlock_Intro_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Intro_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_Left/mTextBlock_Intro') as mw.TextBlock
		}
		return this.mTextBlock_Intro_Internal
	}
	private mTextBlock_Diamond_Internal: mw.TextBlock
	public get mTextBlock_Diamond(): mw.TextBlock {
		if(!this.mTextBlock_Diamond_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Diamond_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_Left/mTextBlock_Diamond') as mw.TextBlock
		}
		return this.mTextBlock_Diamond_Internal
	}
	private mTextBlock_Explain_Internal: mw.TextBlock
	public get mTextBlock_Explain(): mw.TextBlock {
		if(!this.mTextBlock_Explain_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Explain_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_Left/mTextBlock_Explain') as mw.TextBlock
		}
		return this.mTextBlock_Explain_Internal
	}
	private mStaleButton_Ok_Internal: mw.StaleButton
	public get mStaleButton_Ok(): mw.StaleButton {
		if(!this.mStaleButton_Ok_Internal&&this.uiWidgetBase) {
			this.mStaleButton_Ok_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_Left/mStaleButton_Ok') as mw.StaleButton
		}
		return this.mStaleButton_Ok_Internal
	}
	private mTextBlock_Worn_Internal: mw.TextBlock
	public get mTextBlock_Worn(): mw.TextBlock {
		if(!this.mTextBlock_Worn_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Worn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_Left/mTextBlock_Worn') as mw.TextBlock
		}
		return this.mTextBlock_Worn_Internal
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
		
		this.mStaleButton_Ok.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mStaleButton_Ok");
		})
		this.initLanguage(this.mStaleButton_Ok);
		this.mStaleButton_Ok.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mButton_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Close");
		})
		this.mButton_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock_Rate)
		
	
		this.initLanguage(this.mTextBlock_Intro)
		
	
		this.initLanguage(this.mTextBlock_Diamond)
		
	
		this.initLanguage(this.mTextBlock_Explain)
		
	
		this.initLanguage(this.mTextBlock_Worn)
		
	
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
 