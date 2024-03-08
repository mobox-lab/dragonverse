
 

 @UIBind('UI/ShareUI/hall/Hall_Popup_UI.ui')
 export default class Hall_Popup_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private mCanvas_Popup_Internal: mw.Canvas
	public get mCanvas_Popup(): mw.Canvas {
		if(!this.mCanvas_Popup_Internal&&this.uiWidgetBase) {
			this.mCanvas_Popup_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Popup') as mw.Canvas
		}
		return this.mCanvas_Popup_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Popup/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private bg2_Internal: mw.Image
	public get bg2(): mw.Image {
		if(!this.bg2_Internal&&this.uiWidgetBase) {
			this.bg2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Popup/bg2') as mw.Image
		}
		return this.bg2_Internal
	}
	private mCanvas_Title_Internal: mw.Canvas
	public get mCanvas_Title(): mw.Canvas {
		if(!this.mCanvas_Title_Internal&&this.uiWidgetBase) {
			this.mCanvas_Title_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Popup/mCanvas_Title') as mw.Canvas
		}
		return this.mCanvas_Title_Internal
	}
	private mTextBlock_Internal: mw.TextBlock
	public get mTextBlock(): mw.TextBlock {
		if(!this.mTextBlock_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Popup/mCanvas_Title/mTextBlock') as mw.TextBlock
		}
		return this.mTextBlock_Internal
	}
	private mCanvas_Content_Internal: mw.Canvas
	public get mCanvas_Content(): mw.Canvas {
		if(!this.mCanvas_Content_Internal&&this.uiWidgetBase) {
			this.mCanvas_Content_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Popup/mCanvas_Content') as mw.Canvas
		}
		return this.mCanvas_Content_Internal
	}
	private mText_Content_Internal: mw.TextBlock
	public get mText_Content(): mw.TextBlock {
		if(!this.mText_Content_Internal&&this.uiWidgetBase) {
			this.mText_Content_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Popup/mCanvas_Content/mText_Content') as mw.TextBlock
		}
		return this.mText_Content_Internal
	}
	private mCanvas_Btn_Internal: mw.Canvas
	public get mCanvas_Btn(): mw.Canvas {
		if(!this.mCanvas_Btn_Internal&&this.uiWidgetBase) {
			this.mCanvas_Btn_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Popup/mCanvas_Btn') as mw.Canvas
		}
		return this.mCanvas_Btn_Internal
	}
	private mBtn_Yes_Internal: mw.StaleButton
	public get mBtn_Yes(): mw.StaleButton {
		if(!this.mBtn_Yes_Internal&&this.uiWidgetBase) {
			this.mBtn_Yes_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Popup/mCanvas_Btn/mBtn_Yes') as mw.StaleButton
		}
		return this.mBtn_Yes_Internal
	}
	private mBtn_No_Internal: mw.StaleButton
	public get mBtn_No(): mw.StaleButton {
		if(!this.mBtn_No_Internal&&this.uiWidgetBase) {
			this.mBtn_No_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Popup/mCanvas_Btn/mBtn_No') as mw.StaleButton
		}
		return this.mBtn_No_Internal
	}
	private mCanvas_Result_Internal: mw.Canvas
	public get mCanvas_Result(): mw.Canvas {
		if(!this.mCanvas_Result_Internal&&this.uiWidgetBase) {
			this.mCanvas_Result_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Popup/mCanvas_Result') as mw.Canvas
		}
		return this.mCanvas_Result_Internal
	}
	private mText_Content2_Internal: mw.TextBlock
	public get mText_Content2(): mw.TextBlock {
		if(!this.mText_Content2_Internal&&this.uiWidgetBase) {
			this.mText_Content2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Popup/mCanvas_Result/mText_Content2') as mw.TextBlock
		}
		return this.mText_Content2_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Yes.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Hall_Popup_UI_mBtn_Yes");
		})
		this.initLanguage(this.mBtn_Yes);
		this.mBtn_Yes.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn_Yes.onPressed.add(() => {
			this.mBtn_Yes["preScale"] = this.mBtn_Yes.renderScale;
			this.mBtn_Yes.renderScale = Vector2.one.set(this.mBtn_Yes["preScale"]).multiply(1.1);
		})
		this.mBtn_Yes.onReleased.add(() => {
			this.mBtn_Yes.renderScale = this.mBtn_Yes["preScale"];
		})
		
		
	
		this.mBtn_No.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Hall_Popup_UI_mBtn_No");
		})
		this.initLanguage(this.mBtn_No);
		this.mBtn_No.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn_No.onPressed.add(() => {
			this.mBtn_No["preScale"] = this.mBtn_No.renderScale;
			this.mBtn_No.renderScale = Vector2.one.set(this.mBtn_No["preScale"]).multiply(1.1);
		})
		this.mBtn_No.onReleased.add(() => {
			this.mBtn_No.renderScale = this.mBtn_No["preScale"];
		})
		
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock)
		
	
		this.initLanguage(this.mText_Content)
		
	
		this.initLanguage(this.mText_Content2)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Hall_Popup_UI'] = Hall_Popup_UI_Generate;