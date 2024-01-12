/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * UI: UI/dialogue/InteractNode.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/dialogue/InteractNode.ui')
export default class InteractNode_Generate extends UIScript {
	private button_Internal: mw.Button
	public get button(): mw.Button {
		if(!this.button_Internal&&this.uiWidgetBase) {
			this.button_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/button') as mw.Button
		}
		return this.button_Internal
	}
	private txtContent_Internal: mw.TextBlock
	public get txtContent(): mw.TextBlock {
		if(!this.txtContent_Internal&&this.uiWidgetBase) {
			this.txtContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txtContent') as mw.TextBlock
		}
		return this.txtContent_Internal
	}
	private imgIcon_Internal: mw.Image
	public get imgIcon(): mw.Image {
		if(!this.imgIcon_Internal&&this.uiWidgetBase) {
			this.imgIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/imgIcon') as mw.Image
		}
		return this.imgIcon_Internal
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
        
        this.initLanguage(this.txtContent)
        
	
        //文本多语言
        
    }

    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let lanFunc = mw.UIScript.getBehavior("lan");
        lanFunc && lanFunc(ui);
    }
}
 