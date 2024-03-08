
 

 @UIBind('UI/ShareUI/HelpInvisible_UI.ui')
 export default class HelpInvisible_UI_Generate extends UIScript {
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
	private canvas_help_Internal: mw.Canvas
	public get canvas_help(): mw.Canvas {
		if(!this.canvas_help_Internal&&this.uiWidgetBase) {
			this.canvas_help_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_countDown/canvas_help') as mw.Canvas
		}
		return this.canvas_help_Internal
	}
	private text_distance_1_Internal: mw.TextBlock
	public get text_distance_1(): mw.TextBlock {
		if(!this.text_distance_1_Internal&&this.uiWidgetBase) {
			this.text_distance_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_countDown/canvas_help/text_distance_1') as mw.TextBlock
		}
		return this.text_distance_1_Internal
	}
	private text_distance_Internal: mw.TextBlock
	public get text_distance(): mw.TextBlock {
		if(!this.text_distance_Internal&&this.uiWidgetBase) {
			this.text_distance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_countDown/text_distance') as mw.TextBlock
		}
		return this.text_distance_Internal
	}
	private mCanvas_arrow_Internal: mw.Canvas
	public get mCanvas_arrow(): mw.Canvas {
		if(!this.mCanvas_arrow_Internal&&this.uiWidgetBase) {
			this.mCanvas_arrow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_arrow') as mw.Canvas
		}
		return this.mCanvas_arrow_Internal
	}
	private mImg_arrow_Internal: mw.Image
	public get mImg_arrow(): mw.Image {
		if(!this.mImg_arrow_Internal&&this.uiWidgetBase) {
			this.mImg_arrow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_arrow/mImg_arrow') as mw.Image
		}
		return this.mImg_arrow_Internal
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
		
		this.initLanguage(this.text_distance_1)
		
	
		this.initLanguage(this.text_distance)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_HelpInvisible_UI'] = HelpInvisible_UI_Generate;