
 

 @UIBind('UI/ShareUI/Warning_UI.ui')
 export default class Warning_UI_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private canvas_warning_Internal: mw.Canvas
	public get canvas_warning(): mw.Canvas {
		if(!this.canvas_warning_Internal&&this.uiWidgetBase) {
			this.canvas_warning_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_warning') as mw.Canvas
		}
		return this.canvas_warning_Internal
	}
	private text_warning_Internal: mw.TextBlock
	public get text_warning(): mw.TextBlock {
		if(!this.text_warning_Internal&&this.uiWidgetBase) {
			this.text_warning_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_warning/text_warning') as mw.TextBlock
		}
		return this.text_warning_Internal
	}
	private img_redeye_Internal: mw.Image
	public get img_redeye(): mw.Image {
		if(!this.img_redeye_Internal&&this.uiWidgetBase) {
			this.img_redeye_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_warning/img_redeye') as mw.Image
		}
		return this.img_redeye_Internal
	}
	private img_whiteeye_Internal: mw.Image
	public get img_whiteeye(): mw.Image {
		if(!this.img_whiteeye_Internal&&this.uiWidgetBase) {
			this.img_whiteeye_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_warning/img_whiteeye') as mw.Image
		}
		return this.img_whiteeye_Internal
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
		
		this.initLanguage(this.text_warning)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Warning_UI'] = Warning_UI_Generate;