
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/loading/GameLoading.ui
*/



@UIBind('UI/loading/GameLoading.ui')
export default class GameLoading_Generate extends UIScript {
		private btnLogin_Internal: mw.StaleButton
	public get btnLogin(): mw.StaleButton {
		if(!this.btnLogin_Internal&&this.uiWidgetBase) {
			this.btnLogin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnLogin') as mw.StaleButton
		}
		return this.btnLogin_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 