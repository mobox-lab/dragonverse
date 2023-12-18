
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/code/CodePanel.ui
*/



@UIBind('UI/code/CodePanel.ui')
export default class CodePanel_Generate extends UIScript {
		private codeImage_1_Internal: mw.Image
	public get codeImage_1(): mw.Image {
		if(!this.codeImage_1_Internal&&this.uiWidgetBase) {
			this.codeImage_1_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeImage_1') as mw.Image
		}
		return this.codeImage_1_Internal
	}
	private codeImage_1_1_Internal: mw.Image
	public get codeImage_1_1(): mw.Image {
		if(!this.codeImage_1_1_Internal&&this.uiWidgetBase) {
			this.codeImage_1_1_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeImage_1_1') as mw.Image
		}
		return this.codeImage_1_1_Internal
	}
	private codeTitle_Internal: mw.TextBlock
	public get codeTitle(): mw.TextBlock {
		if(!this.codeTitle_Internal&&this.uiWidgetBase) {
			this.codeTitle_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeTitle') as mw.TextBlock
		}
		return this.codeTitle_Internal
	}
	private codeMainBody_Internal: mw.TextBlock
	public get codeMainBody(): mw.TextBlock {
		if(!this.codeMainBody_Internal&&this.uiWidgetBase) {
			this.codeMainBody_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeMainBody') as mw.TextBlock
		}
		return this.codeMainBody_Internal
	}
	private codeImage_2_Internal: mw.Image
	public get codeImage_2(): mw.Image {
		if(!this.codeImage_2_Internal&&this.uiWidgetBase) {
			this.codeImage_2_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeImage_2') as mw.Image
		}
		return this.codeImage_2_Internal
	}
	private contantCanvas_Internal: mw.Canvas
	public get contantCanvas(): mw.Canvas {
		if(!this.contantCanvas_Internal&&this.uiWidgetBase) {
			this.contantCanvas_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/contantCanvas') as mw.Canvas
		}
		return this.contantCanvas_Internal
	}
	private codeButtonVerify_Internal: mw.StaleButton
	public get codeButtonVerify(): mw.StaleButton {
		if(!this.codeButtonVerify_Internal&&this.uiWidgetBase) {
			this.codeButtonVerify_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/contantCanvas/codeButtonVerify') as mw.StaleButton
		}
		return this.codeButtonVerify_Internal
	}
	private codeImage_3_Internal: mw.Image
	public get codeImage_3(): mw.Image {
		if(!this.codeImage_3_Internal&&this.uiWidgetBase) {
			this.codeImage_3_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/contantCanvas/codeImage_3') as mw.Image
		}
		return this.codeImage_3_Internal
	}
	private codeInputBox_Internal: mw.InputBox
	public get codeInputBox(): mw.InputBox {
		if(!this.codeInputBox_Internal&&this.uiWidgetBase) {
			this.codeInputBox_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/contantCanvas/codeInputBox') as mw.InputBox
		}
		return this.codeInputBox_Internal
	}
	private codeNum_Internal: mw.TextBlock
	public get codeNum(): mw.TextBlock {
		if(!this.codeNum_Internal&&this.uiWidgetBase) {
			this.codeNum_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeNum') as mw.TextBlock
		}
		return this.codeNum_Internal
	}
	private codePaste_Internal: mw.TextBlock
	public get codePaste(): mw.TextBlock {
		if(!this.codePaste_Internal&&this.uiWidgetBase) {
			this.codePaste_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codePaste') as mw.TextBlock
		}
		return this.codePaste_Internal
	}
	private codeButtonPaste_Internal: mw.Button
	public get codeButtonPaste(): mw.Button {
		if(!this.codeButtonPaste_Internal&&this.uiWidgetBase) {
			this.codeButtonPaste_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeButtonPaste') as mw.Button
		}
		return this.codeButtonPaste_Internal
	}
	private codeRuleCanvas_Internal: mw.Canvas
	public get codeRuleCanvas(): mw.Canvas {
		if(!this.codeRuleCanvas_Internal&&this.uiWidgetBase) {
			this.codeRuleCanvas_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeRuleCanvas') as mw.Canvas
		}
		return this.codeRuleCanvas_Internal
	}
	private codeImage_4_1_Internal: mw.Image
	public get codeImage_4_1(): mw.Image {
		if(!this.codeImage_4_1_Internal&&this.uiWidgetBase) {
			this.codeImage_4_1_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeRuleCanvas/codeImage_4_1') as mw.Image
		}
		return this.codeImage_4_1_Internal
	}
	private codeRule_Internal: mw.TextBlock
	public get codeRule(): mw.TextBlock {
		if(!this.codeRule_Internal&&this.uiWidgetBase) {
			this.codeRule_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeRuleCanvas/codeRule') as mw.TextBlock
		}
		return this.codeRule_Internal
	}
	private codeImage_4_2_Internal: mw.Image
	public get codeImage_4_2(): mw.Image {
		if(!this.codeImage_4_2_Internal&&this.uiWidgetBase) {
			this.codeImage_4_2_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeRuleCanvas/codeImage_4_2') as mw.Image
		}
		return this.codeImage_4_2_Internal
	}
	private codeCondition1_Internal: mw.TextBlock
	public get codeCondition1(): mw.TextBlock {
		if(!this.codeCondition1_Internal&&this.uiWidgetBase) {
			this.codeCondition1_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeRuleCanvas/codeCondition1') as mw.TextBlock
		}
		return this.codeCondition1_Internal
	}
	private codeCondition2_Internal: mw.TextBlock
	public get codeCondition2(): mw.TextBlock {
		if(!this.codeCondition2_Internal&&this.uiWidgetBase) {
			this.codeCondition2_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeRuleCanvas/codeCondition2') as mw.TextBlock
		}
		return this.codeCondition2_Internal
	}
	private codeCondition3_Internal: mw.TextBlock
	public get codeCondition3(): mw.TextBlock {
		if(!this.codeCondition3_Internal&&this.uiWidgetBase) {
			this.codeCondition3_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeRuleCanvas/codeCondition3') as mw.TextBlock
		}
		return this.codeCondition3_Internal
	}
	private codeButtonClose_Internal: mw.Button
	public get codeButtonClose(): mw.Button {
		if(!this.codeButtonClose_Internal&&this.uiWidgetBase) {
			this.codeButtonClose_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeButtonClose') as mw.Button
		}
		return this.codeButtonClose_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 