
 

 @UIBind('UI/ShareUI/hall/Hall_GuidePopup_UI.ui')
 export default class Hall_GuidePopup_UI_Generate extends UIScript {
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
	private canvas_Content_Internal: mw.Canvas
	public get canvas_Content(): mw.Canvas {
		if(!this.canvas_Content_Internal&&this.uiWidgetBase) {
			this.canvas_Content_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Popup/canvas_Content') as mw.Canvas
		}
		return this.canvas_Content_Internal
	}
	private text_Content2_Internal: mw.TextBlock
	public get text_Content2(): mw.TextBlock {
		if(!this.text_Content2_Internal&&this.uiWidgetBase) {
			this.text_Content2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Popup/canvas_Content/text_Content2') as mw.TextBlock
		}
		return this.text_Content2_Internal
	}
	private text_Content_Internal: mw.TextBlock
	public get text_Content(): mw.TextBlock {
		if(!this.text_Content_Internal&&this.uiWidgetBase) {
			this.text_Content_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Popup/canvas_Content/text_Content') as mw.TextBlock
		}
		return this.text_Content_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Popup/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}


 
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
			Event.dispatchToLocal("PlayButtonClick", "Hall_GuidePopup_UI_mBtn_Close");
		})
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn_Close.onPressed.add(() => {
			this.mBtn_Close["preScale"] = this.mBtn_Close.renderScale;
			this.mBtn_Close.renderScale = Vector2.one.set(this.mBtn_Close["preScale"]).multiply(1.1);
		})
		this.mBtn_Close.onReleased.add(() => {
			this.mBtn_Close.renderScale = this.mBtn_Close["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_Content2)
		
	
		this.initLanguage(this.text_Content)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Hall_GuidePopup_UI'] = Hall_GuidePopup_UI_Generate;