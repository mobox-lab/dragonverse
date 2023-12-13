
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/runningGame/RGPrepareUI.ui
*/



@UIBind('UI/runningGame/RGPrepareUI.ui')
export default class RGPrepareUI_Generate extends UIScript {
		private mReady_Internal: mw.TextBlock
	public get mReady(): mw.TextBlock {
		if(!this.mReady_Internal&&this.uiWidgetBase) {
			this.mReady_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mReady') as mw.TextBlock
		}
		return this.mReady_Internal
	}
	private mGo_Internal: mw.TextBlock
	public get mGo(): mw.TextBlock {
		if(!this.mGo_Internal&&this.uiWidgetBase) {
			this.mGo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGo') as mw.TextBlock
		}
		return this.mGo_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 