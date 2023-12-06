
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/dialogue/NpcLabelPanel.ui
*/



@UIBind('UI/dialogue/NpcLabelPanel.ui')
export default class NpcLabelPanel_Generate extends UIScript {
		private imgFuncIcon_Internal: mw.Image
	public get imgFuncIcon(): mw.Image {
		if(!this.imgFuncIcon_Internal&&this.uiWidgetBase) {
			this.imgFuncIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/imgFuncIcon') as mw.Image
		}
		return this.imgFuncIcon_Internal
	}
	private txtName_Internal: mw.TextBlock
	public get txtName(): mw.TextBlock {
		if(!this.txtName_Internal&&this.uiWidgetBase) {
			this.txtName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txtName') as mw.TextBlock
		}
		return this.txtName_Internal
	}
	private txtIdentity_Internal: mw.TextBlock
	public get txtIdentity(): mw.TextBlock {
		if(!this.txtIdentity_Internal&&this.uiWidgetBase) {
			this.txtIdentity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txtIdentity') as mw.TextBlock
		}
		return this.txtIdentity_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 