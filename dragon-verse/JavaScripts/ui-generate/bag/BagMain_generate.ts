﻿/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
 * UI: UI/bag/BagMain.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/bag/BagMain.ui')
export default class BagMain_Generate extends UIScript {
	private imgMaskBg_Internal: mw.Image
	public get imgMaskBg(): mw.Image {
		if(!this.imgMaskBg_Internal&&this.uiWidgetBase) {
			this.imgMaskBg_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/imgMaskBg') as mw.Image
		}
		return this.imgMaskBg_Internal
	}
	private cnvTags_Internal: mw.Canvas
	public get cnvTags(): mw.Canvas {
		if(!this.cnvTags_Internal&&this.uiWidgetBase) {
			this.cnvTags_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cnvTags') as mw.Canvas
		}
		return this.cnvTags_Internal
	}
	private btn1_Internal: mw.StaleButton
	public get btn1(): mw.StaleButton {
		if(!this.btn1_Internal&&this.uiWidgetBase) {
			this.btn1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cnvTags/btn1') as mw.StaleButton
		}
		return this.btn1_Internal
	}
	private btn2_Internal: mw.StaleButton
	public get btn2(): mw.StaleButton {
		if(!this.btn2_Internal&&this.uiWidgetBase) {
			this.btn2_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cnvTags/btn2') as mw.StaleButton
		}
		return this.btn2_Internal
	}
	private btn3_Internal: mw.StaleButton
	public get btn3(): mw.StaleButton {
		if(!this.btn3_Internal&&this.uiWidgetBase) {
			this.btn3_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cnvTags/btn3') as mw.StaleButton
		}
		return this.btn3_Internal
	}
	private btn4_Internal: mw.StaleButton
	public get btn4(): mw.StaleButton {
		if(!this.btn4_Internal&&this.uiWidgetBase) {
			this.btn4_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cnvTags/btn4') as mw.StaleButton
		}
		return this.btn4_Internal
	}
	private btn5_Internal: mw.StaleButton
	public get btn5(): mw.StaleButton {
		if(!this.btn5_Internal&&this.uiWidgetBase) {
			this.btn5_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cnvTags/btn5') as mw.StaleButton
		}
		return this.btn5_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private infoCanvas_Internal: mw.Canvas
	public get infoCanvas(): mw.Canvas {
		if(!this.infoCanvas_Internal&&this.uiWidgetBase) {
			this.infoCanvas_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas') as mw.Canvas
		}
		return this.infoCanvas_Internal
	}
	private mIcon_Internal: mw.Image
	public get mIcon(): mw.Image {
		if(!this.mIcon_Internal&&this.uiWidgetBase) {
			this.mIcon_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mIcon') as mw.Image
		}
		return this.mIcon_Internal
	}
	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mNum_Internal: mw.TextBlock
	public get mNum(): mw.TextBlock {
		if(!this.mNum_Internal&&this.uiWidgetBase) {
			this.mNum_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mNum') as mw.TextBlock
		}
		return this.mNum_Internal
	}
	private mDescBack_Internal: mw.Image
	public get mDescBack(): mw.Image {
		if(!this.mDescBack_Internal&&this.uiWidgetBase) {
			this.mDescBack_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mDescBack') as mw.Image
		}
		return this.mDescBack_Internal
	}
	private mDesc_Internal: mw.TextBlock
	public get mDesc(): mw.TextBlock {
		if(!this.mDesc_Internal&&this.uiWidgetBase) {
			this.mDesc_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mDesc') as mw.TextBlock
		}
		return this.mDesc_Internal
	}
	private mBtnOpt_Internal: mw.StaleButton
	public get mBtnOpt(): mw.StaleButton {
		if(!this.mBtnOpt_Internal&&this.uiWidgetBase) {
			this.mBtnOpt_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mBtnOpt') as mw.StaleButton
		}
		return this.mBtnOpt_Internal
	}
	private mBtnClose_Internal: mw.StaleButton
	public get mBtnClose(): mw.StaleButton {
		if(!this.mBtnClose_Internal&&this.uiWidgetBase) {
			this.mBtnClose_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtnClose') as mw.StaleButton
		}
		return this.mBtnClose_Internal
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
        
        this.initLanguage(this.btn1);
        this.btn1.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btn2);
        this.btn2.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btn3);
        this.btn3.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btn4);
        this.btn4.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btn5);
        this.btn5.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.mBtnOpt);
        this.mBtnOpt.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.mBtnClose);
        this.mBtnClose.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 按钮
        
        // 未暴露的文本按钮
        
        // 文本控件
        
        this.initLanguage(this.mName)
        
	
        this.initLanguage(this.mNum)
        
	
        this.initLanguage(this.mDesc)
        
	
        // 未暴露的文本控件
        
    }

    protected overrideTextSetter() {
        
        overrideTextBlockTextSetter(this.mName);
        
	
        overrideTextBlockTextSetter(this.mNum);
        
	
        overrideTextBlockTextSetter(this.mDesc);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.btn1);
        
	
        this.unregisterLanKey(this.btn2);
        
	
        this.unregisterLanKey(this.btn3);
        
	
        this.unregisterLanKey(this.btn4);
        
	
        this.unregisterLanKey(this.btn5);
        
	
        this.unregisterLanKey(this.mBtnOpt);
        
	
        this.unregisterLanKey(this.mBtnClose);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.mName)
        
	
        this.unregisterLanKey(this.mNum)
        
	
        this.unregisterLanKey(this.mDesc)
        
	
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