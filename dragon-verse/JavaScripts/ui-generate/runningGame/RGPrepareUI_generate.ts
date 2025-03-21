﻿/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
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

    protected onDestroy() {
        this.unregisterTextLan();
    }

    protected initTextLan() {
        // 文本按钮
        
        // 按钮
        
        // 未暴露的文本按钮
        
        // 文本控件
        
        this.initLanguage(this.mReady)
        
	
        this.initLanguage(this.mGo)
        
	
        // 未暴露的文本控件
        
    }

    protected overrideTextSetter() {
        
        overrideTextBlockTextSetter(this.mReady);
        
	
        overrideTextBlockTextSetter(this.mGo);
        
	
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

function overrideTextBlockTextSetter(textWidget: mw.TextBlock) {
    const originSetter = findPropertyDescriptor(textWidget, "text")?.set;
    if (!originSetter) return;
    Object.defineProperty(textWidget, "text", {
        set: function (value: string) {
            if (textWidget.text === value) return;
            originSetter.call(textWidget, value);
        },
        get: findPropertyDescriptor(textWidget, "text")?.get,
    });
}