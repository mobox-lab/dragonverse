﻿/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
 * UI: UI/subgame/endhighs.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/subgame/endhighs.ui')
export default class endhighs_Generate extends UIScript {
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private infoCanvas_Internal: mw.Canvas
	public get infoCanvas(): mw.Canvas {
		if(!this.infoCanvas_Internal&&this.uiWidgetBase) {
			this.infoCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas') as mw.Canvas
		}
		return this.infoCanvas_Internal
	}
	private mBackButton_Internal: mw.StaleButton
	public get mBackButton(): mw.StaleButton {
		if(!this.mBackButton_Internal&&this.uiWidgetBase) {
			this.mBackButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/mBackButton') as mw.StaleButton
		}
		return this.mBackButton_Internal
	}
	private score_Internal: mw.Canvas
	public get score(): mw.Canvas {
		if(!this.score_Internal&&this.uiWidgetBase) {
			this.score_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/score') as mw.Canvas
		}
		return this.score_Internal
	}
	private bigyellowback_Internal: mw.Image
	public get bigyellowback(): mw.Image {
		if(!this.bigyellowback_Internal&&this.uiWidgetBase) {
			this.bigyellowback_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/score/bigyellowback') as mw.Image
		}
		return this.bigyellowback_Internal
	}
	private texttime_1_Internal: mw.TextBlock
	public get texttime_1(): mw.TextBlock {
		if(!this.texttime_1_Internal&&this.uiWidgetBase) {
			this.texttime_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/score/texttime_1') as mw.TextBlock
		}
		return this.texttime_1_Internal
	}
	private texttime_1_1_Internal: mw.TextBlock
	public get texttime_1_1(): mw.TextBlock {
		if(!this.texttime_1_1_Internal&&this.uiWidgetBase) {
			this.texttime_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/score/texttime_1_1') as mw.TextBlock
		}
		return this.texttime_1_1_Internal
	}
	private timeCount_Internal: mw.Canvas
	public get timeCount(): mw.Canvas {
		if(!this.timeCount_Internal&&this.uiWidgetBase) {
			this.timeCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/timeCount') as mw.Canvas
		}
		return this.timeCount_Internal
	}
	private yellowback4_Internal: mw.Image
	public get yellowback4(): mw.Image {
		if(!this.yellowback4_Internal&&this.uiWidgetBase) {
			this.yellowback4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/timeCount/yellowback4') as mw.Image
		}
		return this.yellowback4_Internal
	}
	private texttime_Internal: mw.TextBlock
	public get texttime(): mw.TextBlock {
		if(!this.texttime_Internal&&this.uiWidgetBase) {
			this.texttime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/timeCount/texttime') as mw.TextBlock
		}
		return this.texttime_Internal
	}
	private textnumt_Internal: mw.TextBlock
	public get textnumt(): mw.TextBlock {
		if(!this.textnumt_Internal&&this.uiWidgetBase) {
			this.textnumt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/timeCount/textnumt') as mw.TextBlock
		}
		return this.textnumt_Internal
	}
	private circleCount_Internal: mw.Canvas
	public get circleCount(): mw.Canvas {
		if(!this.circleCount_Internal&&this.uiWidgetBase) {
			this.circleCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/circleCount') as mw.Canvas
		}
		return this.circleCount_Internal
	}
	private yellowback2_Internal: mw.Image
	public get yellowback2(): mw.Image {
		if(!this.yellowback2_Internal&&this.uiWidgetBase) {
			this.yellowback2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/circleCount/yellowback2') as mw.Image
		}
		return this.yellowback2_Internal
	}
	private textcircle_Internal: mw.TextBlock
	public get textcircle(): mw.TextBlock {
		if(!this.textcircle_Internal&&this.uiWidgetBase) {
			this.textcircle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/circleCount/textcircle') as mw.TextBlock
		}
		return this.textcircle_Internal
	}
	private textnumc_Internal: mw.TextBlock
	public get textnumc(): mw.TextBlock {
		if(!this.textnumc_Internal&&this.uiWidgetBase) {
			this.textnumc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/circleCount/textnumc') as mw.TextBlock
		}
		return this.textnumc_Internal
	}
	private levelCount_Internal: mw.Canvas
	public get levelCount(): mw.Canvas {
		if(!this.levelCount_Internal&&this.uiWidgetBase) {
			this.levelCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/levelCount') as mw.Canvas
		}
		return this.levelCount_Internal
	}
	private yellowback1_Internal: mw.Image
	public get yellowback1(): mw.Image {
		if(!this.yellowback1_Internal&&this.uiWidgetBase) {
			this.yellowback1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/levelCount/yellowback1') as mw.Image
		}
		return this.yellowback1_Internal
	}
	private textcount_Internal: mw.TextBlock
	public get textcount(): mw.TextBlock {
		if(!this.textcount_Internal&&this.uiWidgetBase) {
			this.textcount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/levelCount/textcount') as mw.TextBlock
		}
		return this.textcount_Internal
	}
	private textnum_Internal: mw.TextBlock
	public get textnum(): mw.TextBlock {
		if(!this.textnum_Internal&&this.uiWidgetBase) {
			this.textnum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/levelCount/textnum') as mw.TextBlock
		}
		return this.textnum_Internal
	}
	private title_Internal: mw.Canvas
	public get title(): mw.Canvas {
		if(!this.title_Internal&&this.uiWidgetBase) {
			this.title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/title') as mw.Canvas
		}
		return this.title_Internal
	}
	private redback_Internal: mw.Image
	public get redback(): mw.Image {
		if(!this.redback_Internal&&this.uiWidgetBase) {
			this.redback_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/title/redback') as mw.Image
		}
		return this.redback_Internal
	}
	private gameOverText_Internal: mw.TextBlock
	public get gameOverText(): mw.TextBlock {
		if(!this.gameOverText_Internal&&this.uiWidgetBase) {
			this.gameOverText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/title/gameOverText') as mw.TextBlock
		}
		return this.gameOverText_Internal
	}
	private youWinText_Internal: mw.TextBlock
	public get youWinText(): mw.TextBlock {
		if(!this.youWinText_Internal&&this.uiWidgetBase) {
			this.youWinText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/title/youWinText') as mw.TextBlock
		}
		return this.youWinText_Internal
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
        
	
        // 按钮
        
        // 未暴露的文本按钮
        
        // 文本控件
        
        this.initLanguage(this.texttime_1)
        
	
        this.initLanguage(this.texttime_1_1)
        
	
        this.initLanguage(this.texttime)
        
	
        this.initLanguage(this.textnumt)
        
	
        this.initLanguage(this.textcircle)
        
	
        this.initLanguage(this.textnumc)
        
	
        this.initLanguage(this.textcount)
        
	
        this.initLanguage(this.textnum)
        
	
        this.initLanguage(this.gameOverText)
        
	
        this.initLanguage(this.youWinText)
        
	
        // 未暴露的文本控件
        
    }

    protected overrideTextSetter() {
        
        overrideTextBlockTextSetter(this.texttime_1);
        
	
        overrideTextBlockTextSetter(this.texttime_1_1);
        
	
        overrideTextBlockTextSetter(this.texttime);
        
	
        overrideTextBlockTextSetter(this.textnumt);
        
	
        overrideTextBlockTextSetter(this.textcircle);
        
	
        overrideTextBlockTextSetter(this.textnumc);
        
	
        overrideTextBlockTextSetter(this.textcount);
        
	
        overrideTextBlockTextSetter(this.textnum);
        
	
        overrideTextBlockTextSetter(this.gameOverText);
        
	
        overrideTextBlockTextSetter(this.youWinText);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.mBackButton);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.texttime_1)
        
	
        this.unregisterLanKey(this.texttime_1_1)
        
	
        this.unregisterLanKey(this.texttime)
        
	
        this.unregisterLanKey(this.textnumt)
        
	
        this.unregisterLanKey(this.textcircle)
        
	
        this.unregisterLanKey(this.textnumc)
        
	
        this.unregisterLanKey(this.textcount)
        
	
        this.unregisterLanKey(this.textnum)
        
	
        this.unregisterLanKey(this.gameOverText)
        
	
        this.unregisterLanKey(this.youWinText)
        
	
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