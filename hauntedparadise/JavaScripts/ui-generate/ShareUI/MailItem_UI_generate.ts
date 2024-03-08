
 

 @UIBind('UI/ShareUI/MailItem_UI.ui')
 export default class MailItem_UI_Generate extends UIScript {
	 	private canvas_mailItem_Internal: mw.Canvas
	public get canvas_mailItem(): mw.Canvas {
		if(!this.canvas_mailItem_Internal&&this.uiWidgetBase) {
			this.canvas_mailItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_mailItem') as mw.Canvas
		}
		return this.canvas_mailItem_Internal
	}
	private img_frame_Internal: mw.Image
	public get img_frame(): mw.Image {
		if(!this.img_frame_Internal&&this.uiWidgetBase) {
			this.img_frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_mailItem/img_frame') as mw.Image
		}
		return this.img_frame_Internal
	}
	private text_letterWriter_Internal: mw.TextBlock
	public get text_letterWriter(): mw.TextBlock {
		if(!this.text_letterWriter_Internal&&this.uiWidgetBase) {
			this.text_letterWriter_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_mailItem/text_letterWriter') as mw.TextBlock
		}
		return this.text_letterWriter_Internal
	}
	private text_time_Internal: mw.TextBlock
	public get text_time(): mw.TextBlock {
		if(!this.text_time_Internal&&this.uiWidgetBase) {
			this.text_time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_mailItem/text_time') as mw.TextBlock
		}
		return this.text_time_Internal
	}
	private img_point_Internal: mw.Image
	public get img_point(): mw.Image {
		if(!this.img_point_Internal&&this.uiWidgetBase) {
			this.img_point_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_mailItem/img_point') as mw.Image
		}
		return this.img_point_Internal
	}
	private btn_click_Internal: mw.Button
	public get btn_click(): mw.Button {
		if(!this.btn_click_Internal&&this.uiWidgetBase) {
			this.btn_click_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_mailItem/btn_click') as mw.Button
		}
		return this.btn_click_Internal
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
		
		this.btn_click.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "MailItem_UI_btn_click");
		})
		this.btn_click.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_click.onPressed.add(() => {
			this.btn_click["preScale"] = this.btn_click.renderScale;
			this.btn_click.renderScale = Vector2.one.set(this.btn_click["preScale"]).multiply(1.1);
		})
		this.btn_click.onReleased.add(() => {
			this.btn_click.renderScale = this.btn_click["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_letterWriter)
		
	
		this.initLanguage(this.text_time)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_MailItem_UI'] = MailItem_UI_Generate;