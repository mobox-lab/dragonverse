﻿/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
 * UI: UI/bag/BagItemIcon.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/bag/BagItemIcon.ui')
export default class BagItemIcon_Generate extends UIScript {
	private mImgIcon_Internal: mw.Image
	public get mImgIcon(): mw.Image {
		if(!this.mImgIcon_Internal&&this.uiWidgetBase) {
			this.mImgIcon_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mImgIcon') as mw.Image
		}
		return this.mImgIcon_Internal
	}
	private mItemBtn_Internal: mw.StaleButton
	public get mItemBtn(): mw.StaleButton {
		if(!this.mItemBtn_Internal&&this.uiWidgetBase) {
			this.mItemBtn_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mItemBtn') as mw.StaleButton
		}
		return this.mItemBtn_Internal
	}
	private mItemNumBG_Internal: mw.Image
	public get mItemNumBG(): mw.Image {
		if(!this.mItemNumBG_Internal&&this.uiWidgetBase) {
			this.mItemNumBG_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mItemNumBG') as mw.Image
		}
		return this.mItemNumBG_Internal
	}
	private mItemNum_Internal: mw.TextBlock
	public get mItemNum(): mw.TextBlock {
		if(!this.mItemNum_Internal&&this.uiWidgetBase) {
			this.mItemNum_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mItemNum') as mw.TextBlock
		}
		return this.mItemNum_Internal
	}
	private mImgSelect_Internal: mw.Image
	public get mImgSelect(): mw.Image {
		if(!this.mImgSelect_Internal&&this.uiWidgetBase) {
			this.mImgSelect_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mImgSelect') as mw.Image
		}
		return this.mImgSelect_Internal
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
        
        this.initLanguage(this.mItemBtn);
        this.mItemBtn.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 按钮
        
        // 未暴露的文本按钮
        
        // 文本控件
        
        this.initLanguage(this.mItemNum)
        
	
        // 未暴露的文本控件
        
    }

    protected overrideTextSetter() {
        
        overrideTextBlockTextSetter(this.mItemNum);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.mItemBtn);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.mItemNum)
        
	
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