/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * UI: UI/loading/GameLoading.ui
*/

import UIScript = mw.UIScript;


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
		this.initTextLan();
	}

    public initTextLan() {
        
        this.initLanguage(this.btnLogin);
        
	
        //按钮多语言
        
        //文本多语言
        
        //文本多语言
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as any);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_1") as any);
        
	
    }

    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let lanFunc = mw.UIScript.getBehavior("lan");
        lanFunc && lanFunc(ui);
    }
}
 