
 

 @UIBind('UI/ShareUI/props/ExpTips_UI.ui')
 export default class ExpTips_UI_Generate extends UIScript {
	 	private canvas_frame_Internal: mw.Canvas
	public get canvas_frame(): mw.Canvas {
		if(!this.canvas_frame_Internal&&this.uiWidgetBase) {
			this.canvas_frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame') as mw.Canvas
		}
		return this.canvas_frame_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private text_exp_Internal: mw.TextBlock
	public get text_exp(): mw.TextBlock {
		if(!this.text_exp_Internal&&this.uiWidgetBase) {
			this.text_exp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/text_exp') as mw.TextBlock
		}
		return this.text_exp_Internal
	}
	private text_lv_Internal: mw.TextBlock
	public get text_lv(): mw.TextBlock {
		if(!this.text_lv_Internal&&this.uiWidgetBase) {
			this.text_lv_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/text_lv') as mw.TextBlock
		}
		return this.text_lv_Internal
	}
	private canvas_lvUp_Internal: mw.Canvas
	public get canvas_lvUp(): mw.Canvas {
		if(!this.canvas_lvUp_Internal&&this.uiWidgetBase) {
			this.canvas_lvUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_lvUp') as mw.Canvas
		}
		return this.canvas_lvUp_Internal
	}
	private img_up_Internal: mw.Image
	public get img_up(): mw.Image {
		if(!this.img_up_Internal&&this.uiWidgetBase) {
			this.img_up_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_lvUp/img_up') as mw.Image
		}
		return this.img_up_Internal
	}
	private text_lvUp_Internal: mw.TextBlock
	public get text_lvUp(): mw.TextBlock {
		if(!this.text_lvUp_Internal&&this.uiWidgetBase) {
			this.text_lvUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_lvUp/text_lvUp') as mw.TextBlock
		}
		return this.text_lvUp_Internal
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
		
		this.initLanguage(this.text_exp)
		
	
		this.initLanguage(this.text_lv)
		
	
		this.initLanguage(this.text_lvUp)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_ExpTips_UI'] = ExpTips_UI_Generate;