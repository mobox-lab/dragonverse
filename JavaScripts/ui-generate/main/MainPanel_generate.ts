
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/main/MainPanel.ui
*/



@UIBind('UI/main/MainPanel.ui')
export default class MainPanel_Generate extends UIScript {
		private btnAttack_Internal: mw.Button
	public get btnAttack(): mw.Button {
		if(!this.btnAttack_Internal&&this.uiWidgetBase) {
			this.btnAttack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnAttack') as mw.Button
		}
		return this.btnAttack_Internal
	}
	private btnJump_Internal: mw.Button
	public get btnJump(): mw.Button {
		if(!this.btnJump_Internal&&this.uiWidgetBase) {
			this.btnJump_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnJump') as mw.Button
		}
		return this.btnJump_Internal
	}
	private sceneDragonInteractorContainer_Internal: mw.Canvas
	public get sceneDragonInteractorContainer(): mw.Canvas {
		if(!this.sceneDragonInteractorContainer_Internal&&this.uiWidgetBase) {
			this.sceneDragonInteractorContainer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/sceneDragonInteractorContainer') as mw.Canvas
		}
		return this.sceneDragonInteractorContainer_Internal
	}
	private collectibleInteractorContainer_Internal: mw.Canvas
	public get collectibleInteractorContainer(): mw.Canvas {
		if(!this.collectibleInteractorContainer_Internal&&this.uiWidgetBase) {
			this.collectibleInteractorContainer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/collectibleInteractorContainer') as mw.Canvas
		}
		return this.collectibleInteractorContainer_Internal
	}
	private btnBag_Internal: mw.StaleButton
	public get btnBag(): mw.StaleButton {
		if(!this.btnBag_Internal&&this.uiWidgetBase) {
			this.btnBag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnBag') as mw.StaleButton
		}
		return this.btnBag_Internal
	}
	private btnHandbook_Internal: mw.StaleButton
	public get btnHandbook(): mw.StaleButton {
		if(!this.btnHandbook_Internal&&this.uiWidgetBase) {
			this.btnHandbook_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnHandbook') as mw.StaleButton
		}
		return this.btnHandbook_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 