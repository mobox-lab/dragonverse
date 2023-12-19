
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


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 