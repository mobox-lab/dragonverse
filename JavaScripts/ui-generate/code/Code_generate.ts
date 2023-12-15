
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/code/Code.ui
*/



@UIBind('UI/code/Code.ui')
export default class Code_Generate extends UIScript {
		private cImage_1_Internal: mw.Image
	public get cImage_1(): mw.Image {
		if(!this.cImage_1_Internal&&this.uiWidgetBase) {
			this.cImage_1_Internal = this.uiWidgetBase.findChildByPath('CodeCanvas/cImage_1') as mw.Image
		}
		return this.cImage_1_Internal
	}
	private cTitle_Internal: mw.TextBlock
	public get cTitle(): mw.TextBlock {
		if(!this.cTitle_Internal&&this.uiWidgetBase) {
			this.cTitle_Internal = this.uiWidgetBase.findChildByPath('CodeCanvas/cTitle') as mw.TextBlock
		}
		return this.cTitle_Internal
	}
	private cMainBody_Internal: mw.TextBlock
	public get cMainBody(): mw.TextBlock {
		if(!this.cMainBody_Internal&&this.uiWidgetBase) {
			this.cMainBody_Internal = this.uiWidgetBase.findChildByPath('CodeCanvas/cMainBody') as mw.TextBlock
		}
		return this.cMainBody_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 