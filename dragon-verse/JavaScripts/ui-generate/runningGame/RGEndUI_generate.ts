﻿/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
 * UI: UI/runningGame/RGEndUI.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/runningGame/RGEndUI.ui')
export default class RGEndUI_Generate extends UIScript {
	private mBG_Internal: mw.Image
	public get mBG(): mw.Image {
		if(!this.mBG_Internal&&this.uiWidgetBase) {
			this.mBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBG') as mw.Image
		}
		return this.mBG_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mText_Internal: mw.TextBlock
	public get mText(): mw.TextBlock {
		if(!this.mText_Internal&&this.uiWidgetBase) {
			this.mText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText') as mw.TextBlock
		}
		return this.mText_Internal
	}
	private mTextBg_1_Internal: mw.Image
	public get mTextBg_1(): mw.Image {
		if(!this.mTextBg_1_Internal&&this.uiWidgetBase) {
			this.mTextBg_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mTextBg_1') as mw.Image
		}
		return this.mTextBg_1_Internal
	}
	private mTextBg_Internal: mw.Image
	public get mTextBg(): mw.Image {
		if(!this.mTextBg_Internal&&this.uiWidgetBase) {
			this.mTextBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mTextBg') as mw.Image
		}
		return this.mTextBg_Internal
	}
	private mInfoCanvas_Internal: mw.Canvas
	public get mInfoCanvas(): mw.Canvas {
		if(!this.mInfoCanvas_Internal&&this.uiWidgetBase) {
			this.mInfoCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mInfoCanvas') as mw.Canvas
		}
		return this.mInfoCanvas_Internal
	}
	private mTrans_Internal: mw.TextBlock
	public get mTrans(): mw.TextBlock {
		if(!this.mTrans_Internal&&this.uiWidgetBase) {
			this.mTrans_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mInfoCanvas/mTrans') as mw.TextBlock
		}
		return this.mTrans_Internal
	}
	private mSpeedUp_Internal: mw.TextBlock
	public get mSpeedUp(): mw.TextBlock {
		if(!this.mSpeedUp_Internal&&this.uiWidgetBase) {
			this.mSpeedUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mInfoCanvas/mSpeedUp') as mw.TextBlock
		}
		return this.mSpeedUp_Internal
	}
	private mTime_Internal: mw.TextBlock
	public get mTime(): mw.TextBlock {
		if(!this.mTime_Internal&&this.uiWidgetBase) {
			this.mTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mInfoCanvas/mTime') as mw.TextBlock
		}
		return this.mTime_Internal
	}
	private mScoreCanvas_Internal: mw.Canvas
	public get mScoreCanvas(): mw.Canvas {
		if(!this.mScoreCanvas_Internal&&this.uiWidgetBase) {
			this.mScoreCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScoreCanvas') as mw.Canvas
		}
		return this.mScoreCanvas_Internal
	}
	private mScoreBg_Internal: mw.Image
	public get mScoreBg(): mw.Image {
		if(!this.mScoreBg_Internal&&this.uiWidgetBase) {
			this.mScoreBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScoreCanvas/mScoreBg') as mw.Image
		}
		return this.mScoreBg_Internal
	}
	private mScore_Internal: mw.TextBlock
	public get mScore(): mw.TextBlock {
		if(!this.mScore_Internal&&this.uiWidgetBase) {
			this.mScore_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScoreCanvas/mScore') as mw.TextBlock
		}
		return this.mScore_Internal
	}
	private image_2_Internal: mw.Image
	public get image_2(): mw.Image {
		if(!this.image_2_Internal&&this.uiWidgetBase) {
			this.image_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScoreCanvas/image_2') as mw.Image
		}
		return this.image_2_Internal
	}
	private mNew_Internal: mw.TextBlock
	public get mNew(): mw.TextBlock {
		if(!this.mNew_Internal&&this.uiWidgetBase) {
			this.mNew_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScoreCanvas/mNew') as mw.TextBlock
		}
		return this.mNew_Internal
	}
	private mImage_Internal: mw.Image
	public get mImage(): mw.Image {
		if(!this.mImage_Internal&&this.uiWidgetBase) {
			this.mImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage') as mw.Image
		}
		return this.mImage_Internal
	}
	private mDownCanvas_Internal: mw.Canvas
	public get mDownCanvas(): mw.Canvas {
		if(!this.mDownCanvas_Internal&&this.uiWidgetBase) {
			this.mDownCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDownCanvas') as mw.Canvas
		}
		return this.mDownCanvas_Internal
	}
	private mBackButton_Internal: mw.StaleButton
	public get mBackButton(): mw.StaleButton {
		if(!this.mBackButton_Internal&&this.uiWidgetBase) {
			this.mBackButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDownCanvas/mBackButton') as mw.StaleButton
		}
		return this.mBackButton_Internal
	}
	private mAgainButton_Internal: mw.StaleButton
	public get mAgainButton(): mw.StaleButton {
		if(!this.mAgainButton_Internal&&this.uiWidgetBase) {
			this.mAgainButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDownCanvas/mAgainButton') as mw.StaleButton
		}
		return this.mAgainButton_Internal
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
        
        this.initLanguage(this.mBackButton);
        this.mBackButton.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.mAgainButton);
        this.mAgainButton.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 按钮
        
        // 未暴露的文本按钮
        
        // 文本控件
        
        this.initLanguage(this.mText)
        
	
        this.initLanguage(this.mTrans)
        
	
        this.initLanguage(this.mSpeedUp)
        
	
        this.initLanguage(this.mTime)
        
	
        this.initLanguage(this.mScore)
        
	
        this.initLanguage(this.mNew)
        
	
        // 未暴露的文本控件
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mInfoCanvas/TextBlock_1") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mInfoCanvas/TextBlock_1_1") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mInfoCanvas/TextBlock_1_2") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mScoreCanvas/TextBlock_3") as mw.TextBlock);
        
	
    }

    protected overrideTextSetter() {
        
        overrideTextBlockTextSetter(this.mText);
        
	
        overrideTextBlockTextSetter(this.mTrans);
        
	
        overrideTextBlockTextSetter(this.mSpeedUp);
        
	
        overrideTextBlockTextSetter(this.mTime);
        
	
        overrideTextBlockTextSetter(this.mScore);
        
	
        overrideTextBlockTextSetter(this.mNew);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.mBackButton);
        
	
        this.unregisterLanKey(this.mAgainButton);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.mText)
        
	
        this.unregisterLanKey(this.mTrans)
        
	
        this.unregisterLanKey(this.mSpeedUp)
        
	
        this.unregisterLanKey(this.mTime)
        
	
        this.unregisterLanKey(this.mScore)
        
	
        this.unregisterLanKey(this.mNew)
        
	
        // 隐藏文本多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mInfoCanvas/TextBlock_1") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mInfoCanvas/TextBlock_1_1") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mInfoCanvas/TextBlock_1_2") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mScoreCanvas/TextBlock_3") as mw.TextBlock);
        
	
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