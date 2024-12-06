/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
 * UI: UI/Onlineshop/Online_Confirm.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/Onlineshop/Online_Confirm.ui')
export default class Online_Confirm_Generate extends UIScript {
	private can_Confirm_Internal: mw.Canvas
	public get can_Confirm(): mw.Canvas {
		if(!this.can_Confirm_Internal&&this.uiWidgetBase) {
			this.can_Confirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm') as mw.Canvas
		}
		return this.can_Confirm_Internal
	}
	private can_Shop_Item_Internal: mw.Canvas
	public get can_Shop_Item(): mw.Canvas {
		if(!this.can_Shop_Item_Internal&&this.uiWidgetBase) {
			this.can_Shop_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Shop_Item') as mw.Canvas
		}
		return this.can_Shop_Item_Internal
	}
	private can_Item_Icon_Internal: mw.Canvas
	public get can_Item_Icon(): mw.Canvas {
		if(!this.can_Item_Icon_Internal&&this.uiWidgetBase) {
			this.can_Item_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Shop_Item/can_Item_Icon') as mw.Canvas
		}
		return this.can_Item_Icon_Internal
	}
	private img_Icon_Internal: mw.Image
	public get img_Icon(): mw.Image {
		if(!this.img_Icon_Internal&&this.uiWidgetBase) {
			this.img_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Shop_Item/can_Item_Icon/img_Icon') as mw.Image
		}
		return this.img_Icon_Internal
	}
	private text_Number_Internal: mw.TextBlock
	public get text_Number(): mw.TextBlock {
		if(!this.text_Number_Internal&&this.uiWidgetBase) {
			this.text_Number_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Shop_Item/can_Item_Icon/text_Number') as mw.TextBlock
		}
		return this.text_Number_Internal
	}
	private can_Item_Describe_Internal: mw.Canvas
	public get can_Item_Describe(): mw.Canvas {
		if(!this.can_Item_Describe_Internal&&this.uiWidgetBase) {
			this.can_Item_Describe_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Shop_Item/can_Item_Describe') as mw.Canvas
		}
		return this.can_Item_Describe_Internal
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
	private text_Use_Internal: mw.TextBlock
	public get text_Use(): mw.TextBlock {
		if(!this.text_Use_Internal&&this.uiWidgetBase) {
			this.text_Use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirm_Use/btn_Confirm_Use/text_Use') as mw.TextBlock
		}
		return this.text_Use_Internal
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
	private can_Confirm_Refresh_Internal: mw.Canvas
	public get can_Confirm_Refresh(): mw.Canvas {
		if(!this.can_Confirm_Refresh_Internal&&this.uiWidgetBase) {
			this.can_Confirm_Refresh_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirm_Refresh') as mw.Canvas
		}
		return this.can_Confirm_Refresh_Internal
	}
	private btn_Confirm_Refresh_Internal: mw.Button
	public get btn_Confirm_Refresh(): mw.Button {
		if(!this.btn_Confirm_Refresh_Internal&&this.uiWidgetBase) {
			this.btn_Confirm_Refresh_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirm_Refresh/btn_Confirm_Refresh') as mw.Button
		}
		return this.btn_Confirm_Refresh_Internal
	}
	private text_Refresh_Internal: mw.TextBlock
	public get text_Refresh(): mw.TextBlock {
		if(!this.text_Refresh_Internal&&this.uiWidgetBase) {
			this.text_Refresh_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirm_Refresh/btn_Confirm_Refresh/text_Refresh') as mw.TextBlock
		}
		return this.text_Refresh_Internal
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
        
	
        this.btn_Confirm_Refresh.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.mBtn_Close.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 未暴露的文本按钮
        
        // 文本控件
        
        this.initLanguage(this.text_Number)
        
	
        this.initLanguage(this.text_Use)
        
	
        this.initLanguage(this.text_Refresh)
        
	
        // 未暴露的文本控件
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_Confirm/can_Shop_Item/can_Item_Icon/MWTextBlock_2147414466") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_Confirm/can_Shop_Item/can_Item_Describe/TextBlock_1") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_Confirm/can_UnConfirm_Use/btn_UnConfirm_Use/TextBlock_2") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_Confirm/TextBlock") as mw.TextBlock);
        
	
    }

    protected overrideTextSetter() {
        
        overrideTextBlockTextSetter(this.text_Number);
        
	
        overrideTextBlockTextSetter(this.text_Use);
        
	
        overrideTextBlockTextSetter(this.text_Refresh);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.text_Number)
        
	
        this.unregisterLanKey(this.text_Use)
        
	
        this.unregisterLanKey(this.text_Refresh)
        
	
        // 隐藏文本多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/can_Confirm/can_Shop_Item/can_Item_Icon/MWTextBlock_2147414466") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/can_Confirm/can_Shop_Item/can_Item_Describe/TextBlock_1") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/can_Confirm/can_UnConfirm_Use/btn_UnConfirm_Use/TextBlock_2") as mw.TextBlock);
        
	
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