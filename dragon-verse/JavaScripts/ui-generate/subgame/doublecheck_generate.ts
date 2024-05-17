/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
 * UI: UI/subgame/doublecheck.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/subgame/doublecheck.ui')
export default class doublecheck_Generate extends UIScript {
	private doublechec_Internal: mw.Canvas
	public get doublechec(): mw.Canvas {
		if(!this.doublechec_Internal&&this.uiWidgetBase) {
			this.doublechec_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/doublechec') as mw.Canvas
		}
		return this.doublechec_Internal
	}
	private codeImage_1_1_Internal: mw.Image
	public get codeImage_1_1(): mw.Image {
		if(!this.codeImage_1_1_Internal&&this.uiWidgetBase) {
			this.codeImage_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/doublechec/codeImage_1_1') as mw.Image
		}
		return this.codeImage_1_1_Internal
	}
	private codeButtonClose_Internal: mw.Button
	public get codeButtonClose(): mw.Button {
		if(!this.codeButtonClose_Internal&&this.uiWidgetBase) {
			this.codeButtonClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/doublechec/codeButtonClose') as mw.Button
		}
		return this.codeButtonClose_Internal
	}
	private codeButtonYes_Internal: mw.StaleButton
	public get codeButtonYes(): mw.StaleButton {
		if(!this.codeButtonYes_Internal&&this.uiWidgetBase) {
			this.codeButtonYes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/doublechec/codeButtonYes') as mw.StaleButton
		}
		return this.codeButtonYes_Internal
	}
	private codeMainBody_Internal: mw.TextBlock
	public get codeMainBody(): mw.TextBlock {
		if(!this.codeMainBody_Internal&&this.uiWidgetBase) {
			this.codeMainBody_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/doublechec/codeMainBody') as mw.TextBlock
		}
		return this.codeMainBody_Internal
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
        
        this.initLanguage(this.codeButtonYes);
        this.codeButtonYes.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 按钮
        
        this.codeButtonClose.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 未暴露的文本按钮
        
        // 文本控件
        
        this.initLanguage(this.codeMainBody)
        
	
        // 未暴露的文本控件
        
    }

    protected overrideTextSetter() {
        
        overrideTextBlockTextSetter(this.codeMainBody);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.codeButtonYes);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.codeMainBody)
        
	
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