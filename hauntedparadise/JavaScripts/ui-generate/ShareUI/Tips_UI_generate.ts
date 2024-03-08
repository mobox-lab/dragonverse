
 

 @UIBind('UI/ShareUI/Tips_UI.ui')
 export default class Tips_UI_Generate extends UIScript {
	 	private canvas_catTips_Internal: mw.Canvas
	public get canvas_catTips(): mw.Canvas {
		if(!this.canvas_catTips_Internal&&this.uiWidgetBase) {
			this.canvas_catTips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_catTips') as mw.Canvas
		}
		return this.canvas_catTips_Internal
	}
	private text_catTip_Internal: mw.TextBlock
	public get text_catTip(): mw.TextBlock {
		if(!this.text_catTip_Internal&&this.uiWidgetBase) {
			this.text_catTip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_catTips/text_catTip') as mw.TextBlock
		}
		return this.text_catTip_Internal
	}
	private canvas_tips_Internal: mw.Canvas
	public get canvas_tips(): mw.Canvas {
		if(!this.canvas_tips_Internal&&this.uiWidgetBase) {
			this.canvas_tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tips') as mw.Canvas
		}
		return this.canvas_tips_Internal
	}
	private text_tip_Internal: mw.TextBlock
	public get text_tip(): mw.TextBlock {
		if(!this.text_tip_Internal&&this.uiWidgetBase) {
			this.text_tip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tips/text_tip') as mw.TextBlock
		}
		return this.text_tip_Internal
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
		
		this.initLanguage(this.text_catTip)
		
	
		this.initLanguage(this.text_tip)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Tips_UI'] = Tips_UI_Generate;