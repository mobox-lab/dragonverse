
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/head/HeadUIPanel.ui
*/



@UIBind('UI/head/HeadUIPanel.ui')
export default class HeadUIPanel_Generate extends UIScript {
		private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private title_Internal: mw.TextBlock
	public get title(): mw.TextBlock {
		if(!this.title_Internal&&this.uiWidgetBase) {
			this.title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/title') as mw.TextBlock
		}
		return this.title_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 