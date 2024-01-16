/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 1.0.8
 * UI: UI/runningGame/RGPrepareUI.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/runningGame/RGPrepareUI.ui')
export default class RGPrepareUI_Generate extends UIScript {
	private mReady_Internal: mw.TextBlock
	public get mReady(): mw.TextBlock {
		if(!this.mReady_Internal&&this.uiWidgetBase) {
			this.mReady_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mReady') as mw.TextBlock
		}
		return this.mReady_Internal
	}
	private mGo_Internal: mw.TextBlock
	public get mGo(): mw.TextBlock {
		if(!this.mGo_Internal&&this.uiWidgetBase) {
			this.mGo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGo') as mw.TextBlock
		}
		return this.mGo_Internal
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
        
        // 静态文本按钮多语言
        
        // 文本多语言
        
        this.initLanguage(this.mReady)
        
	
        this.initLanguage(this.mGo)
        
	
        // 静态文本多语言
        
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.mReady)
        
	
        this.unregisterLanKey(this.mGo)
        
	
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
 