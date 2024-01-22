/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 1.0.8
 * UI: UI/scene-dragon/SceneDragonPanel.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/scene-dragon/SceneDragonPanel.ui')
export default class SceneDragonPanel_Generate extends UIScript {
	private imgBoxingBG_Internal: mw.Image
	public get imgBoxingBG(): mw.Image {
		if(!this.imgBoxingBG_Internal&&this.uiWidgetBase) {
			this.imgBoxingBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/imgBoxingBG') as mw.Image
		}
		return this.imgBoxingBG_Internal
	}
	private btnCatch_Internal: mw.StaleButton
	public get btnCatch(): mw.StaleButton {
		if(!this.btnCatch_Internal&&this.uiWidgetBase) {
			this.btnCatch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnCatch') as mw.StaleButton
		}
		return this.btnCatch_Internal
	}



	protected onAwake() {
		this.initTextLan();
	}

    public destroy(): void {
        this.unregisterTextLan();
        super.destroy();
    }

    protected initTextLan() {
        // 文本按钮多语言
        
        this.initLanguage(this.btnCatch);
        
	
        // 静态文本按钮多语言
        
        // 文本多语言
        
        // 静态文本多语言
        
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.btnCatch);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        // 隐藏文本多语言
        
    }

    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let lanFunc = mw.UIScript.getBehavior("lan");
        lanFunc?.(ui);
    }

    private unregisterLanKey(ui: mw.StaleButton | mw.TextBlock) {
        let unregisterFunc = mw.UIScript.getBehavior("unregister");
        unregisterFunc?.(ui);
    }
}
 