/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.2.0
 * UI: UI/subgame/checkpointProgress.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/subgame/checkpointProgress.ui')
export default class checkpointProgress_Generate extends UIScript {
	private checkProbar_Internal: mw.ProgressBar
	public get checkProbar(): mw.ProgressBar {
		if(!this.checkProbar_Internal&&this.uiWidgetBase) {
			this.checkProbar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/checkProbar') as mw.ProgressBar
		}
		return this.checkProbar_Internal
	}
	private textCavas_Internal: mw.Canvas
	public get textCavas(): mw.Canvas {
		if(!this.textCavas_Internal&&this.uiWidgetBase) {
			this.textCavas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textCavas') as mw.Canvas
		}
		return this.textCavas_Internal
	}
	private text1_2_Internal: mw.TextBlock
	public get text1_2(): mw.TextBlock {
		if(!this.text1_2_Internal&&this.uiWidgetBase) {
			this.text1_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textCavas/text1_2') as mw.TextBlock
		}
		return this.text1_2_Internal
	}
	private count_Internal: mw.TextBlock
	public get count(): mw.TextBlock {
		if(!this.count_Internal&&this.uiWidgetBase) {
			this.count_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textCavas/count') as mw.TextBlock
		}
		return this.count_Internal
	}
	private text1_Internal: mw.TextBlock
	public get text1(): mw.TextBlock {
		if(!this.text1_Internal&&this.uiWidgetBase) {
			this.text1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textCavas/text1') as mw.TextBlock
		}
		return this.text1_Internal
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

    public destroy(): void {
        this.unregisterTextLan();
        super.destroy();
    }

    protected initTextLan() {
        // 文本按钮多语言
        
        // 静态文本按钮多语言
        
        // 文本多语言
        
        this.initLanguage(this.text1_2)
        
	
        this.initLanguage(this.count)
        
	
        this.initLanguage(this.text1)
        
	
        // 静态文本多语言
        
    }

    protected overrideTextSetter() {
        
        overrideBubblingWidget(this.text1_2);
        
	
        overrideBubblingWidget(this.count);
        
	
        overrideBubblingWidget(this.text1);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.text1_2)
        
	
        this.unregisterLanKey(this.count)
        
	
        this.unregisterLanKey(this.text1)
        
	
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