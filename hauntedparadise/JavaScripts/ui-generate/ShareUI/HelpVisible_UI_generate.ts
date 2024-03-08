
 

 @UIBind('UI/ShareUI/HelpVisible_UI.ui')
 export default class HelpVisible_UI_Generate extends UIScript {
	 	private canvas_countDown_Internal: mw.Canvas
	public get canvas_countDown(): mw.Canvas {
		if(!this.canvas_countDown_Internal&&this.uiWidgetBase) {
			this.canvas_countDown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_countDown') as mw.Canvas
		}
		return this.canvas_countDown_Internal
	}
	private maskBtn_color_Internal: mw.MaskButton
	public get maskBtn_color(): mw.MaskButton {
		if(!this.maskBtn_color_Internal&&this.uiWidgetBase) {
			this.maskBtn_color_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_countDown/maskBtn_color') as mw.MaskButton
		}
		return this.maskBtn_color_Internal
	}
	private img_loop_Internal: mw.Image
	public get img_loop(): mw.Image {
		if(!this.img_loop_Internal&&this.uiWidgetBase) {
			this.img_loop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_countDown/img_loop') as mw.Image
		}
		return this.img_loop_Internal
	}
	private text_time_Internal: mw.TextBlock
	public get text_time(): mw.TextBlock {
		if(!this.text_time_Internal&&this.uiWidgetBase) {
			this.text_time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_countDown/text_time') as mw.TextBlock
		}
		return this.text_time_Internal
	}
	private text_help_Internal: mw.TextBlock
	public get text_help(): mw.TextBlock {
		if(!this.text_help_Internal&&this.uiWidgetBase) {
			this.text_help_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_help') as mw.TextBlock
		}
		return this.text_help_Internal
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
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_time)
		
	
		this.initLanguage(this.text_help)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_HelpVisible_UI'] = HelpVisible_UI_Generate;