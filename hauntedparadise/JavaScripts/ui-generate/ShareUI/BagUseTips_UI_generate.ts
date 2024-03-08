
 

 @UIBind('UI/ShareUI/BagUseTips_UI.ui')
 export default class BagUseTips_UI_Generate extends UIScript {
	 	private canvas_tips_Internal: mw.Canvas
	public get canvas_tips(): mw.Canvas {
		if(!this.canvas_tips_Internal&&this.uiWidgetBase) {
			this.canvas_tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tips') as mw.Canvas
		}
		return this.canvas_tips_Internal
	}
	private text_use_Internal: mw.TextBlock
	public get text_use(): mw.TextBlock {
		if(!this.text_use_Internal&&this.uiWidgetBase) {
			this.text_use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tips/text_use') as mw.TextBlock
		}
		return this.text_use_Internal
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
		
		this.initLanguage(this.text_use)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BagUseTips_UI'] = BagUseTips_UI_Generate;