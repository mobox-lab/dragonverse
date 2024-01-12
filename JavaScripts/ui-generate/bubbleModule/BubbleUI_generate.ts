/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * UI: UI/bubbleModule/BubbleUI.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/bubbleModule/BubbleUI.ui')
export default class BubbleUI_Generate extends UIScript {
	private border_Internal: mw.Image
	public get border(): mw.Image {
		if(!this.border_Internal&&this.uiWidgetBase) {
			this.border_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/border') as mw.Image
		}
		return this.border_Internal
	}
	private array_Internal: mw.Image
	public get array(): mw.Image {
		if(!this.array_Internal&&this.uiWidgetBase) {
			this.array_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/array') as mw.Image
		}
		return this.array_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/bg') as mw.Image
		}
		return this.bg_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		this.initTextLan();
	}

    public initTextLan() {
        
        //按钮多语言
        
        //文本多语言
        
        //文本多语言
        
    }

    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let lanFunc = mw.UIScript.getBehavior("lan");
        lanFunc && lanFunc(ui);
    }
}
 