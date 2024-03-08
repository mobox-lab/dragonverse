
 

 @UIBind('UI/ShareUI/Day_UI.ui')
 export default class Day_UI_Generate extends UIScript {
	 	private rootCanvas_Internal: mw.Canvas
	public get rootCanvas(): mw.Canvas {
		if(!this.rootCanvas_Internal&&this.uiWidgetBase) {
			this.rootCanvas_Internal = this.uiWidgetBase.findChildByPath('rootCanvas') as mw.Canvas
		}
		return this.rootCanvas_Internal
	}
	private text_daytips_Internal: mw.TextBlock
	public get text_daytips(): mw.TextBlock {
		if(!this.text_daytips_Internal&&this.uiWidgetBase) {
			this.text_daytips_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/text_daytips') as mw.TextBlock
		}
		return this.text_daytips_Internal
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
		
		this.initLanguage(this.text_daytips)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Day_UI'] = Day_UI_Generate;