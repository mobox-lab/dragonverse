/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.2.3
 * UI: UI/jumpGame/CutSceneUI.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/jumpGame/CutSceneUI.ui')
export default class CutSceneUI_Generate extends UIScript {
	private showCanvas_Internal: mw.Canvas
	public get showCanvas(): mw.Canvas {
		if(!this.showCanvas_Internal&&this.uiWidgetBase) {
			this.showCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/showCanvas') as mw.Canvas
		}
		return this.showCanvas_Internal
	}
	private upImage_1_Internal: mw.Image
	public get upImage_1(): mw.Image {
		if(!this.upImage_1_Internal&&this.uiWidgetBase) {
			this.upImage_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/showCanvas/upImage_1') as mw.Image
		}
		return this.upImage_1_Internal
	}
	private downImage_1_1_Internal: mw.Image
	public get downImage_1_1(): mw.Image {
		if(!this.downImage_1_1_Internal&&this.uiWidgetBase) {
			this.downImage_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/showCanvas/downImage_1_1') as mw.Image
		}
		return this.downImage_1_1_Internal
	}
	private upImage_1_1_Internal: mw.Image
	public get upImage_1_1(): mw.Image {
		if(!this.upImage_1_1_Internal&&this.uiWidgetBase) {
			this.upImage_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/showCanvas/upImage_1_1') as mw.Image
		}
		return this.upImage_1_1_Internal
	}
	private upImage_1_1_1_Internal: mw.Image
	public get upImage_1_1_1(): mw.Image {
		if(!this.upImage_1_1_1_Internal&&this.uiWidgetBase) {
			this.upImage_1_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/showCanvas/upImage_1_1_1') as mw.Image
		}
		return this.upImage_1_1_1_Internal
	}
	private maskImg_Internal: mw.Image
	public get maskImg(): mw.Image {
		if(!this.maskImg_Internal&&this.uiWidgetBase) {
			this.maskImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/maskImg') as mw.Image
		}
		return this.maskImg_Internal
	}
	private maskBtn_Internal: mw.MaskButton
	public get maskBtn(): mw.MaskButton {
		if(!this.maskBtn_Internal&&this.uiWidgetBase) {
			this.maskBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/maskBtn') as mw.MaskButton
		}
		return this.maskBtn_Internal
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
        
        // 静态文本多语言
        
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