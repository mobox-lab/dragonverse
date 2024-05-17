/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
 * UI: UI/gm/GMHUD.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/gm/GMHUD.ui')
export default class GMHUD_Generate extends UIScript {
	private argText_Internal: mw.InputBox
	public get argText(): mw.InputBox {
		if(!this.argText_Internal&&this.uiWidgetBase) {
			this.argText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/argText') as mw.InputBox
		}
		return this.argText_Internal
	}
	private groupButton_Internal: mw.StaleButton
	public get groupButton(): mw.StaleButton {
		if(!this.groupButton_Internal&&this.uiWidgetBase) {
			this.groupButton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/groupButton') as mw.StaleButton
		}
		return this.groupButton_Internal
	}
	private cmdButton_Internal: mw.StaleButton
	public get cmdButton(): mw.StaleButton {
		if(!this.cmdButton_Internal&&this.uiWidgetBase) {
			this.cmdButton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cmdButton') as mw.StaleButton
		}
		return this.cmdButton_Internal
	}
	private okButton_Internal: mw.Button
	public get okButton(): mw.Button {
		if(!this.okButton_Internal&&this.uiWidgetBase) {
			this.okButton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/okButton') as mw.Button
		}
		return this.okButton_Internal
	}
	private dropList_Internal: mw.ScrollBox
	public get dropList(): mw.ScrollBox {
		if(!this.dropList_Internal&&this.uiWidgetBase) {
			this.dropList_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/dropList') as mw.ScrollBox
		}
		return this.dropList_Internal
	}
	private cmdPanel_Internal: mw.Canvas
	public get cmdPanel(): mw.Canvas {
		if(!this.cmdPanel_Internal&&this.uiWidgetBase) {
			this.cmdPanel_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/dropList/cmdPanel') as mw.Canvas
		}
		return this.cmdPanel_Internal
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
        
        this.initLanguage(this.groupButton);
        this.groupButton.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.cmdButton);
        this.cmdButton.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 按钮
        
        this.okButton.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 未暴露的文本按钮
        
        // 文本控件
        
        // 未暴露的文本控件
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/okButton/TextBlock") as mw.TextBlock);
        
	
    }

    protected overrideTextSetter() {
        
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.groupButton);
        
	
        this.unregisterLanKey(this.cmdButton);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        // 隐藏文本多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/okButton/TextBlock") as mw.TextBlock);
        
	
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