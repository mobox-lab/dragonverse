/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
 * UI: UI/Onlineshop/Online_ReConfirm.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/Onlineshop/Online_ReConfirm.ui')
export default class Online_ReConfirm_Generate extends UIScript {
	private can_Confirm_Internal: mw.Canvas
	public get can_Confirm(): mw.Canvas {
		if(!this.can_Confirm_Internal&&this.uiWidgetBase) {
			this.can_Confirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm') as mw.Canvas
		}
		return this.can_Confirm_Internal
	}
	private can_Item_Describe_Internal: mw.Canvas
	public get can_Item_Describe(): mw.Canvas {
		if(!this.can_Item_Describe_Internal&&this.uiWidgetBase) {
			this.can_Item_Describe_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Item_Describe') as mw.Canvas
		}
		return this.can_Item_Describe_Internal
	}
	private text_Recovery_Internal: mw.TextBlock
	public get text_Recovery(): mw.TextBlock {
		if(!this.text_Recovery_Internal&&this.uiWidgetBase) {
			this.text_Recovery_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Item_Describe/text_Recovery') as mw.TextBlock
		}
		return this.text_Recovery_Internal
	}
	private can_Confirm_Use_Internal: mw.Canvas
	public get can_Confirm_Use(): mw.Canvas {
		if(!this.can_Confirm_Use_Internal&&this.uiWidgetBase) {
			this.can_Confirm_Use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirm_Use') as mw.Canvas
		}
		return this.can_Confirm_Use_Internal
	}
	private btn_Confirm_Use_Internal: mw.Button
	public get btn_Confirm_Use(): mw.Button {
		if(!this.btn_Confirm_Use_Internal&&this.uiWidgetBase) {
			this.btn_Confirm_Use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirm_Use/btn_Confirm_Use') as mw.Button
		}
		return this.btn_Confirm_Use_Internal
	}
	private text_Confirm_Use_Internal: mw.TextBlock
	public get text_Confirm_Use(): mw.TextBlock {
		if(!this.text_Confirm_Use_Internal&&this.uiWidgetBase) {
			this.text_Confirm_Use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirm_Use/btn_Confirm_Use/text_Confirm_Use') as mw.TextBlock
		}
		return this.text_Confirm_Use_Internal
	}
	private can_UnConfirm_Use_Internal: mw.Canvas
	public get can_UnConfirm_Use(): mw.Canvas {
		if(!this.can_UnConfirm_Use_Internal&&this.uiWidgetBase) {
			this.can_UnConfirm_Use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_UnConfirm_Use') as mw.Canvas
		}
		return this.can_UnConfirm_Use_Internal
	}
	private btn_UnConfirm_Use_Internal: mw.Button
	public get btn_UnConfirm_Use(): mw.Button {
		if(!this.btn_UnConfirm_Use_Internal&&this.uiWidgetBase) {
			this.btn_UnConfirm_Use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_UnConfirm_Use/btn_UnConfirm_Use') as mw.Button
		}
		return this.btn_UnConfirm_Use_Internal
	}
	private text_UnConfirm_Use_Internal: mw.TextBlock
	public get text_UnConfirm_Use(): mw.TextBlock {
		if(!this.text_UnConfirm_Use_Internal&&this.uiWidgetBase) {
			this.text_UnConfirm_Use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_UnConfirm_Use/btn_UnConfirm_Use/text_UnConfirm_Use') as mw.TextBlock
		}
		return this.text_UnConfirm_Use_Internal
	}
	private can_Confirming_Internal: mw.Canvas
	public get can_Confirming(): mw.Canvas {
		if(!this.can_Confirming_Internal&&this.uiWidgetBase) {
			this.can_Confirming_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirming') as mw.Canvas
		}
		return this.can_Confirming_Internal
	}
	private btn_Confirming_Internal: mw.Button
	public get btn_Confirming(): mw.Button {
		if(!this.btn_Confirming_Internal&&this.uiWidgetBase) {
			this.btn_Confirming_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirming/btn_Confirming') as mw.Button
		}
		return this.btn_Confirming_Internal
	}
	private text_Confirming_Internal: mw.TextBlock
	public get text_Confirming(): mw.TextBlock {
		if(!this.text_Confirming_Internal&&this.uiWidgetBase) {
			this.text_Confirming_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirming/btn_Confirming/text_Confirming') as mw.TextBlock
		}
		return this.text_Confirming_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
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
        
        // 按钮
        
        this.btn_Confirm_Use.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.btn_UnConfirm_Use.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.btn_Confirming.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.mBtn_Close.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 未暴露的文本按钮
        
        // 文本控件
        
        this.initLanguage(this.text_Recovery)
        
	
        this.initLanguage(this.text_Confirm_Use)
        
	
        this.initLanguage(this.text_UnConfirm_Use)
        
	
        this.initLanguage(this.text_Confirming)
        
	
        // 未暴露的文本控件
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_Confirm/TextBlock") as mw.TextBlock);
        
	
    }

    protected overrideTextSetter() {
        
        overrideTextBlockTextSetter(this.text_Recovery);
        
	
        overrideTextBlockTextSetter(this.text_Confirm_Use);
        
	
        overrideTextBlockTextSetter(this.text_UnConfirm_Use);
        
	
        overrideTextBlockTextSetter(this.text_Confirming);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.text_Recovery)
        
	
        this.unregisterLanKey(this.text_Confirm_Use)
        
	
        this.unregisterLanKey(this.text_UnConfirm_Use)
        
	
        this.unregisterLanKey(this.text_Confirming)
        
	
        // 隐藏文本多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/can_Confirm/TextBlock") as mw.TextBlock);
        
	
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