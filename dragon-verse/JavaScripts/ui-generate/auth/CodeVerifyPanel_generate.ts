/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.1.0
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



	protected onStart() {
    }

	protected onAwake() {
        // 强制实现其 以规避 show 自作主张的使用 .layer 覆写 onShow 的默认参数导致的接口设计哲学不统一.
        this.layer = mw.UILayerMiddle;
		this.initTextLan();
	}

    protected onUpdate(dt: number): void {
	}

	protected onShow(...args:unknown[]) {
	}

	protected onHide() {
	}

    public destroy(): void {
        this.unregisterTextLan();
        super.destroy();
    }

    protected initTextLan() {
        // 文本按钮多语言
        
        this.initLanguage(this.btnCancel);
        
	
        this.initLanguage(this.btnEnter);
        
	
        // 静态文本按钮多语言
        
        // 文本多语言
        
        // 静态文本多语言
        
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.btnCancel);
        
	
        this.unregisterLanKey(this.btnEnter);
        
	
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