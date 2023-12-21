
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/main/GlobalPromptPanel.ui
*/



@UIBind('UI/main/GlobalPromptPanel.ui')
export default class GlobalPromptPanel_Generate extends UIScript {
		private cnvScrollPrompt_Internal: mw.Canvas
	public get cnvScrollPrompt(): mw.Canvas {
		if(!this.cnvScrollPrompt_Internal&&this.uiWidgetBase) {
			this.cnvScrollPrompt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvScrollPrompt') as mw.Canvas
		}
		return this.cnvScrollPrompt_Internal
	}
	private txtScrollPrompt_Internal: mw.TextBlock
	public get txtScrollPrompt(): mw.TextBlock {
		if(!this.txtScrollPrompt_Internal&&this.uiWidgetBase) {
			this.txtScrollPrompt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvScrollPrompt/txtScrollPrompt') as mw.TextBlock
		}
		return this.txtScrollPrompt_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.txtScrollPrompt)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 