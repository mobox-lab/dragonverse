/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * UI: UI/prompt/ProximityPrompts.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/prompt/ProximityPrompts.ui')
export default class ProximityPrompts_Generate extends UIScript {
	private options_Internal: mw.Canvas
	public get options(): mw.Canvas {
		if(!this.options_Internal&&this.uiWidgetBase) {
			this.options_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/options') as mw.Canvas
		}
		return this.options_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		this.initTextLan();
	}

    protected initTextLan() {
        
        //按钮多语言
        
        //文本多语言
        
        //文本多语言
        
    }

    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let lanFunc = mw.UIScript.getBehavior("lan");
        lanFunc && lanFunc(ui);
    }
}
 