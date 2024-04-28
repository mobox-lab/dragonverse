/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.2.3
 * UI: UI/prompt/PromotItem.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/prompt/PromotItem.ui')
export default class PromotItem_Generate extends UIScript {
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private keyText_Internal: mw.TextBlock
	public get keyText(): mw.TextBlock {
		if(!this.keyText_Internal&&this.uiWidgetBase) {
			this.keyText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/keyText') as mw.TextBlock
		}
		return this.keyText_Internal
	}
	private item_Internal: mw.Canvas
	public get item(): mw.Canvas {
		if(!this.item_Internal&&this.uiWidgetBase) {
			this.item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/item') as mw.Canvas
		}
		return this.item_Internal
	}
	private selected_Internal: mw.Button
	public get selected(): mw.Button {
		if(!this.selected_Internal&&this.uiWidgetBase) {
			this.selected_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/item/selected') as mw.Button
		}
		return this.selected_Internal
	}
	private option_Internal: mw.TextBlock
	public get option(): mw.TextBlock {
		if(!this.option_Internal&&this.uiWidgetBase) {
			this.option_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/item/option') as mw.TextBlock
		}
		return this.option_Internal
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
        
        this.initLanguage(this.keyText)
        
	
        this.initLanguage(this.option)
        
	
        // 静态文本多语言
        
    }

    protected overrideTextSetter() {
        
        overrideBubblingWidget(this.keyText);
        
	
        overrideBubblingWidget(this.option);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.keyText)
        
	
        this.unregisterLanKey(this.option)
        
	
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