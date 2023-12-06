
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/scene-dragon/SceneDragonPanel.ui
*/



@UIBind('UI/scene-dragon/SceneDragonPanel.ui')
export default class SceneDragonPanel_Generate extends UIScript {
		private btnCatch_Internal: mw.StaleButton
	public get btnCatch(): mw.StaleButton {
		if(!this.btnCatch_Internal&&this.uiWidgetBase) {
			this.btnCatch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnCatch') as mw.StaleButton
		}
		return this.btnCatch_Internal
	}
	private imgIcon_Internal: mw.Image
	public get imgIcon(): mw.Image {
		if(!this.imgIcon_Internal&&this.uiWidgetBase) {
			this.imgIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/imgIcon') as mw.Image
		}
		return this.imgIcon_Internal
	}
	private txtName_Internal: mw.TextBlock
	public get txtName(): mw.TextBlock {
		if(!this.txtName_Internal&&this.uiWidgetBase) {
			this.txtName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txtName') as mw.TextBlock
		}
		return this.txtName_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 