
 

 @UIBind('UI/ShareUI/Postbox_UI.ui')
 export default class Postbox_UI_Generate extends UIScript {
	 	private canvas_bg_Internal: mw.Canvas
	public get canvas_bg(): mw.Canvas {
		if(!this.canvas_bg_Internal&&this.uiWidgetBase) {
			this.canvas_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_bg') as mw.Canvas
		}
		return this.canvas_bg_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_bg/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private img_frame1_Internal: mw.Image
	public get img_frame1(): mw.Image {
		if(!this.img_frame1_Internal&&this.uiWidgetBase) {
			this.img_frame1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_bg/img_frame1') as mw.Image
		}
		return this.img_frame1_Internal
	}
	private img_frame2_Internal: mw.Image
	public get img_frame2(): mw.Image {
		if(!this.img_frame2_Internal&&this.uiWidgetBase) {
			this.img_frame2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_bg/img_frame2') as mw.Image
		}
		return this.img_frame2_Internal
	}
	private scrollBox_receive_Internal: mw.ScrollBox
	public get scrollBox_receive(): mw.ScrollBox {
		if(!this.scrollBox_receive_Internal&&this.uiWidgetBase) {
			this.scrollBox_receive_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_bg/scrollBox_receive') as mw.ScrollBox
		}
		return this.scrollBox_receive_Internal
	}
	private canvas_letters_Internal: mw.Canvas
	public get canvas_letters(): mw.Canvas {
		if(!this.canvas_letters_Internal&&this.uiWidgetBase) {
			this.canvas_letters_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_bg/scrollBox_receive/canvas_letters') as mw.Canvas
		}
		return this.canvas_letters_Internal
	}
	private canvas__content_Internal: mw.Canvas
	public get canvas__content(): mw.Canvas {
		if(!this.canvas__content_Internal&&this.uiWidgetBase) {
			this.canvas__content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_bg/canvas__content') as mw.Canvas
		}
		return this.canvas__content_Internal
	}
	private text_title_Internal: mw.TextBlock
	public get text_title(): mw.TextBlock {
		if(!this.text_title_Internal&&this.uiWidgetBase) {
			this.text_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_bg/canvas__content/text_title') as mw.TextBlock
		}
		return this.text_title_Internal
	}
	private text_content_Internal: mw.TextBlock
	public get text_content(): mw.TextBlock {
		if(!this.text_content_Internal&&this.uiWidgetBase) {
			this.text_content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_bg/canvas__content/text_content') as mw.TextBlock
		}
		return this.text_content_Internal
	}
	private text_writter_Internal: mw.TextBlock
	public get text_writter(): mw.TextBlock {
		if(!this.text_writter_Internal&&this.uiWidgetBase) {
			this.text_writter_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_bg/canvas__content/text_writter') as mw.TextBlock
		}
		return this.text_writter_Internal
	}
	private text_date_Internal: mw.TextBlock
	public get text_date(): mw.TextBlock {
		if(!this.text_date_Internal&&this.uiWidgetBase) {
			this.text_date_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_bg/canvas__content/text_date') as mw.TextBlock
		}
		return this.text_date_Internal
	}
	private canvas_back_Internal: mw.Canvas
	public get canvas_back(): mw.Canvas {
		if(!this.canvas_back_Internal&&this.uiWidgetBase) {
			this.canvas_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_bg/canvas_back') as mw.Canvas
		}
		return this.canvas_back_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_bg/canvas_back/btn_back') as mw.Button
		}
		return this.btn_back_Internal
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
		
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Postbox_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_title)
		
	
		this.initLanguage(this.text_content)
		
	
		this.initLanguage(this.text_writter)
		
	
		this.initLanguage(this.text_date)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Postbox_UI'] = Postbox_UI_Generate;