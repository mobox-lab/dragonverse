﻿/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
 * UI: UI/handbook/HandbookPanelItem.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/handbook/HandbookPanelItem.ui')
export default class HandbookPanelItem_Generate extends UIScript {
	private mBgBtn_Internal: mw.StaleButton
	public get mBgBtn(): mw.StaleButton {
		if(!this.mBgBtn_Internal&&this.uiWidgetBase) {
			this.mBgBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBgBtn') as mw.StaleButton
		}
		return this.mBgBtn_Internal
	}
	private mIconImage_Internal: mw.Image
	public get mIconImage(): mw.Image {
		if(!this.mIconImage_Internal&&this.uiWidgetBase) {
			this.mIconImage_Internal = this.uiWidgetBase.findChildByPath('Canvas/mIconImage') as mw.Image
		}
		return this.mIconImage_Internal
	}
	private mTextName_Internal: mw.TextBlock
	public get mTextName(): mw.TextBlock {
		if(!this.mTextName_Internal&&this.uiWidgetBase) {
			this.mTextName_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTextName') as mw.TextBlock
		}
		return this.mTextName_Internal
	}
	private mLevelBgImage_Internal: mw.Image
	public get mLevelBgImage(): mw.Image {
		if(!this.mLevelBgImage_Internal&&this.uiWidgetBase) {
			this.mLevelBgImage_Internal = this.uiWidgetBase.findChildByPath('Canvas/mLevelBgImage') as mw.Image
		}
		return this.mLevelBgImage_Internal
	}
	private mTextLevel_Internal: mw.TextBlock
	public get mTextLevel(): mw.TextBlock {
		if(!this.mTextLevel_Internal&&this.uiWidgetBase) {
			this.mTextLevel_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTextLevel') as mw.TextBlock
		}
		return this.mTextLevel_Internal
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
        
        this.initLanguage(this.mBgBtn);
        this.mBgBtn.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 按钮
        
        // 未暴露的文本按钮
        
        // 文本控件
        
        this.initLanguage(this.mTextName)
        
	
        this.initLanguage(this.mTextLevel)
        
	
        // 未暴露的文本控件
        
    }

    protected overrideTextSetter() {
        
        overrideTextBlockTextSetter(this.mTextName);
        
	
        overrideTextBlockTextSetter(this.mTextLevel);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.mBgBtn);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.mTextName)
        
	
        this.unregisterLanKey(this.mTextLevel)
        
	
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