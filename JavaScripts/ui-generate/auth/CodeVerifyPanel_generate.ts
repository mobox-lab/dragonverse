/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * UI: UI/auth/CodeVerifyPanel.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/auth/CodeVerifyPanel.ui')
export default class CodeVerifyPanel_Generate extends UIScript {
	private inputBox_Internal: mw.InputBox
	public get inputBox(): mw.InputBox {
		if(!this.inputBox_Internal&&this.uiWidgetBase) {
			this.inputBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/inputBox') as mw.InputBox
		}
		return this.inputBox_Internal
	}
	private btnCancel_Internal: mw.StaleButton
	public get btnCancel(): mw.StaleButton {
		if(!this.btnCancel_Internal&&this.uiWidgetBase) {
			this.btnCancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnCancel') as mw.StaleButton
		}
		return this.btnCancel_Internal
	}
	private btnEnter_Internal: mw.StaleButton
	public get btnEnter(): mw.StaleButton {
		if(!this.btnEnter_Internal&&this.uiWidgetBase) {
			this.btnEnter_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnEnter') as mw.StaleButton
		}
		return this.btnEnter_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		this.initTextLan();
	}

    public initTextLan() {
        
        this.initLanguage(this.btnCancel);
        
	
        this.initLanguage(this.btnEnter);
        
	
        //按钮多语言
        
        //文本多语言
        
        //文本多语言
        
    }

    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let lanFunc = mw.UIScript.getBehavior("lan");
        lanFunc && lanFunc(ui);
    }
}
 