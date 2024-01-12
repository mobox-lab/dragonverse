/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * UI: UI/dialogue/NPCActionPanel.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/dialogue/NPCActionPanel.ui')
export default class NPCActionPanel_Generate extends UIScript {
	private mActionCon_Internal: mw.Canvas
	public get mActionCon(): mw.Canvas {
		if(!this.mActionCon_Internal&&this.uiWidgetBase) {
			this.mActionCon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mActionCon') as mw.Canvas
		}
		return this.mActionCon_Internal
	}
	private mContent3_Internal: mw.Canvas
	public get mContent3(): mw.Canvas {
		if(!this.mContent3_Internal&&this.uiWidgetBase) {
			this.mContent3_Internal = this.uiWidgetBase.findChildByPath('Canvas/mActionCon/ScrollBox/mContent3') as mw.Canvas
		}
		return this.mContent3_Internal
	}
	private closeBtn3_Internal: mw.Button
	public get closeBtn3(): mw.Button {
		if(!this.closeBtn3_Internal&&this.uiWidgetBase) {
			this.closeBtn3_Internal = this.uiWidgetBase.findChildByPath('Canvas/mActionCon/closeBtn3') as mw.Button
		}
		return this.closeBtn3_Internal
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
 