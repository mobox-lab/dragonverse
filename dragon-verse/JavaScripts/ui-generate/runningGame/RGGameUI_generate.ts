/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.2.3
 * UI: UI/runningGame/RGGameUI.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/runningGame/RGGameUI.ui')
export default class RGGameUI_Generate extends UIScript {
	private mScoreCanvas_Internal: mw.Canvas
	public get mScoreCanvas(): mw.Canvas {
		if(!this.mScoreCanvas_Internal&&this.uiWidgetBase) {
			this.mScoreCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScoreCanvas') as mw.Canvas
		}
		return this.mScoreCanvas_Internal
	}
	private mImage_Internal: mw.Image
	public get mImage(): mw.Image {
		if(!this.mImage_Internal&&this.uiWidgetBase) {
			this.mImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScoreCanvas/mImage') as mw.Image
		}
		return this.mImage_Internal
	}
	private mScoreText_Internal: mw.TextBlock
	public get mScoreText(): mw.TextBlock {
		if(!this.mScoreText_Internal&&this.uiWidgetBase) {
			this.mScoreText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScoreCanvas/mScoreText') as mw.TextBlock
		}
		return this.mScoreText_Internal
	}
	private mScoreFly_Internal: mw.TextBlock
	public get mScoreFly(): mw.TextBlock {
		if(!this.mScoreFly_Internal&&this.uiWidgetBase) {
			this.mScoreFly_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScoreCanvas/mScoreFly') as mw.TextBlock
		}
		return this.mScoreFly_Internal
	}
	private mTimeCanvas_Internal: mw.Canvas
	public get mTimeCanvas(): mw.Canvas {
		if(!this.mTimeCanvas_Internal&&this.uiWidgetBase) {
			this.mTimeCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTimeCanvas') as mw.Canvas
		}
		return this.mTimeCanvas_Internal
	}
	private mCountDown_Internal: mw.TextBlock
	public get mCountDown(): mw.TextBlock {
		if(!this.mCountDown_Internal&&this.uiWidgetBase) {
			this.mCountDown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTimeCanvas/mCountDown') as mw.TextBlock
		}
		return this.mCountDown_Internal
	}
	private mTimeFly_Internal: mw.TextBlock
	public get mTimeFly(): mw.TextBlock {
		if(!this.mTimeFly_Internal&&this.uiWidgetBase) {
			this.mTimeFly_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTimeCanvas/mTimeFly') as mw.TextBlock
		}
		return this.mTimeFly_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private info_Internal: mw.TextBlock
	public get info(): mw.TextBlock {
		if(!this.info_Internal&&this.uiWidgetBase) {
			this.info_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScrollBox/info') as mw.TextBlock
		}
		return this.info_Internal
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
        // 文本按钮多语言
        
        // 静态文本按钮多语言
        
        // 文本多语言
        
        this.initLanguage(this.mScoreText)
        
	
        this.initLanguage(this.mScoreFly)
        
	
        this.initLanguage(this.mCountDown)
        
	
        this.initLanguage(this.mTimeFly)
        
	
        this.initLanguage(this.info)
        
	
        // 静态文本多语言
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mScoreCanvas/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mTimeCanvas/TextBlock_2") as mw.TextBlock);
        
	
    }

    protected overrideTextSetter() {
        
        overrideBubblingWidget(this.mScoreText);
        
	
        overrideBubblingWidget(this.mScoreFly);
        
	
        overrideBubblingWidget(this.mCountDown);
        
	
        overrideBubblingWidget(this.mTimeFly);
        
	
        overrideBubblingWidget(this.info);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.mScoreText)
        
	
        this.unregisterLanKey(this.mScoreFly)
        
	
        this.unregisterLanKey(this.mCountDown)
        
	
        this.unregisterLanKey(this.mTimeFly)
        
	
        this.unregisterLanKey(this.info)
        
	
        // 隐藏文本多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/mScoreCanvas/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/mTimeCanvas/TextBlock_2") as mw.TextBlock);
        
	
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