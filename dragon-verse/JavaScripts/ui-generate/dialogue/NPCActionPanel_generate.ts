﻿/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
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
        
        this.closeBtn3.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 未暴露的文本按钮
        
        // 文本控件
        
        // 未暴露的文本控件
        
    }

    protected overrideTextSetter() {
        
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
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