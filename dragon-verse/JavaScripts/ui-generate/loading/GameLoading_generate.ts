/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.2.2
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



	protected onStart() {
    }

	protected onAwake() {
        // 强制实现其 以规避 show 自作主张的使用 .layer 覆写 onShow 的默认参数导致的接口设计哲学不统一.
        this.layer = mw.UILayerMiddle;
        this.overrideTextSetter();
		this.initTextLan();
	}

    protected onUpdate(dt: number): void {
	}

	protected onShow(...args:unknown[]) {
	}

	protected onHide() {
	}

    public onDestroy() {
        this.unregisterTextLan();
    }

    protected initTextLan() {
        // 文本按钮多语言
        
        this.initLanguage(this.btnLogin);
        
	
        // 静态文本按钮多语言
        
        // 文本多语言
        
        // 静态文本多语言
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_1") as mw.TextBlock);
        
	
    }

    protected overrideTextSetter() {
        
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.btnLogin);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        // 隐藏文本多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_1") as mw.TextBlock);
        
	
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

function findPropertyDescriptor(obj: unknown, prop: string): PropertyDescriptor | null {
    while (obj !== null) {
        let descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        if (descriptor) {
            return descriptor;
        }
        obj = Object.getPrototypeOf(obj);
    }
    return null;
}

function overrideBubblingWidget(textWidget: mw.TextBlock) {
    const originSetter = findPropertyDescriptor(textWidget, "text")?.set;
    if (!originSetter) return;
    Object.defineProperty(textWidget, "text", {
        set: function (value: string) {
            if (textWidget.text === value) return;
            originSetter.call(textWidget, value);
        },
    });
}