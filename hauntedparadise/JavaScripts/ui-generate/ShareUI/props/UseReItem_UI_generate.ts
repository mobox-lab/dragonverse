
 

 @UIBind('UI/ShareUI/props/UseReItem_UI.ui')
 export default class UseReItem_UI_Generate extends UIScript {
	 	private canvas_frame_Internal: mw.Canvas
	public get canvas_frame(): mw.Canvas {
		if(!this.canvas_frame_Internal&&this.uiWidgetBase) {
			this.canvas_frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame') as mw.Canvas
		}
		return this.canvas_frame_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private img_bg2_Internal: mw.Image
	public get img_bg2(): mw.Image {
		if(!this.img_bg2_Internal&&this.uiWidgetBase) {
			this.img_bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_bg2') as mw.Image
		}
		return this.img_bg2_Internal
	}
	private img_bg3_Internal: mw.Image
	public get img_bg3(): mw.Image {
		if(!this.img_bg3_Internal&&this.uiWidgetBase) {
			this.img_bg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_bg3') as mw.Image
		}
		return this.img_bg3_Internal
	}
	private text_question_Internal: mw.TextBlock
	public get text_question(): mw.TextBlock {
		if(!this.text_question_Internal&&this.uiWidgetBase) {
			this.text_question_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/text_question') as mw.TextBlock
		}
		return this.text_question_Internal
	}
	private img_icon1_Internal: mw.Image
	public get img_icon1(): mw.Image {
		if(!this.img_icon1_Internal&&this.uiWidgetBase) {
			this.img_icon1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_icon1') as mw.Image
		}
		return this.img_icon1_Internal
	}
	private btn_useItem_Internal: mw.Button
	public get btn_useItem(): mw.Button {
		if(!this.btn_useItem_Internal&&this.uiWidgetBase) {
			this.btn_useItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/btn_useItem') as mw.Button
		}
		return this.btn_useItem_Internal
	}
	private text_use_Internal: mw.TextBlock
	public get text_use(): mw.TextBlock {
		if(!this.text_use_Internal&&this.uiWidgetBase) {
			this.text_use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/btn_useItem/text_use') as mw.TextBlock
		}
		return this.text_use_Internal
	}
	private text_num_Internal: mw.TextBlock
	public get text_num(): mw.TextBlock {
		if(!this.text_num_Internal&&this.uiWidgetBase) {
			this.text_num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/btn_useItem/text_num') as mw.TextBlock
		}
		return this.text_num_Internal
	}
	private img_icon2_Internal: mw.Image
	public get img_icon2(): mw.Image {
		if(!this.img_icon2_Internal&&this.uiWidgetBase) {
			this.img_icon2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_icon2') as mw.Image
		}
		return this.img_icon2_Internal
	}
	private btn_escapeFailure_Internal: mw.Button
	public get btn_escapeFailure(): mw.Button {
		if(!this.btn_escapeFailure_Internal&&this.uiWidgetBase) {
			this.btn_escapeFailure_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/btn_escapeFailure') as mw.Button
		}
		return this.btn_escapeFailure_Internal
	}
	private text_failure_Internal: mw.TextBlock
	public get text_failure(): mw.TextBlock {
		if(!this.text_failure_Internal&&this.uiWidgetBase) {
			this.text_failure_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/btn_escapeFailure/text_failure') as mw.TextBlock
		}
		return this.text_failure_Internal
	}
	private canvas_back_Internal: mw.Canvas
	public get canvas_back(): mw.Canvas {
		if(!this.canvas_back_Internal&&this.uiWidgetBase) {
			this.canvas_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_back') as mw.Canvas
		}
		return this.canvas_back_Internal
	}
	private img_back_Internal: mw.Image
	public get img_back(): mw.Image {
		if(!this.img_back_Internal&&this.uiWidgetBase) {
			this.img_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_back/img_back') as mw.Image
		}
		return this.img_back_Internal
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
		
		this.btn_useItem.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "UseReItem_UI_btn_useItem");
		})
		this.btn_useItem.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_useItem.onPressed.add(() => {
			this.btn_useItem["preScale"] = this.btn_useItem.renderScale;
			this.btn_useItem.renderScale = Vector2.one.set(this.btn_useItem["preScale"]).multiply(1.1);
		})
		this.btn_useItem.onReleased.add(() => {
			this.btn_useItem.renderScale = this.btn_useItem["preScale"];
		})
		
	
		this.btn_escapeFailure.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "UseReItem_UI_btn_escapeFailure");
		})
		this.btn_escapeFailure.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_escapeFailure.onPressed.add(() => {
			this.btn_escapeFailure["preScale"] = this.btn_escapeFailure.renderScale;
			this.btn_escapeFailure.renderScale = Vector2.one.set(this.btn_escapeFailure["preScale"]).multiply(1.1);
		})
		this.btn_escapeFailure.onReleased.add(() => {
			this.btn_escapeFailure.renderScale = this.btn_escapeFailure["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_question)
		
	
		this.initLanguage(this.text_use)
		
	
		this.initLanguage(this.text_num)
		
	
		this.initLanguage(this.text_failure)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_UseReItem_UI'] = UseReItem_UI_Generate;