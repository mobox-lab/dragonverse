/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
 * UI: UI/Onlineshop/Online_shopItem.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/Onlineshop/Online_shopItem.ui')
export default class Online_shopItem_Generate extends UIScript {
	private can_ShopItem_Internal: mw.Canvas
	public get can_ShopItem(): mw.Canvas {
		if(!this.can_ShopItem_Internal&&this.uiWidgetBase) {
			this.can_ShopItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem') as mw.Canvas
		}
		return this.can_ShopItem_Internal
	}
	private btn_Item_Internal: mw.Button
	public get btn_Item(): mw.Button {
		if(!this.btn_Item_Internal&&this.uiWidgetBase) {
			this.btn_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/btn_Item') as mw.Button
		}
		return this.btn_Item_Internal
	}
	private img_Background_Internal: mw.Image
	public get img_Background(): mw.Image {
		if(!this.img_Background_Internal&&this.uiWidgetBase) {
			this.img_Background_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/img_Background') as mw.Image
		}
		return this.img_Background_Internal
	}
	private img_Background2_Internal: mw.Image
	public get img_Background2(): mw.Image {
		if(!this.img_Background2_Internal&&this.uiWidgetBase) {
			this.img_Background2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/img_Background2') as mw.Image
		}
		return this.img_Background2_Internal
	}
	private can_Up_Down_Internal: mw.Canvas
	public get can_Up_Down(): mw.Canvas {
		if(!this.can_Up_Down_Internal&&this.uiWidgetBase) {
			this.can_Up_Down_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/can_Up_Down') as mw.Canvas
		}
		return this.can_Up_Down_Internal
	}
	private img_TextBg_Internal: mw.Image
	public get img_TextBg(): mw.Image {
		if(!this.img_TextBg_Internal&&this.uiWidgetBase) {
			this.img_TextBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/can_Up_Down/img_TextBg') as mw.Image
		}
		return this.img_TextBg_Internal
	}
	private inp_Number_Internal: mw.InputBox
	public get inp_Number(): mw.InputBox {
		if(!this.inp_Number_Internal&&this.uiWidgetBase) {
			this.inp_Number_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/can_Up_Down/inp_Number') as mw.InputBox
		}
		return this.inp_Number_Internal
	}
	private btn_Up_Internal: mw.Button
	public get btn_Up(): mw.Button {
		if(!this.btn_Up_Internal&&this.uiWidgetBase) {
			this.btn_Up_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/can_Up_Down/btn_Up') as mw.Button
		}
		return this.btn_Up_Internal
	}
	private btn_Down_Internal: mw.Button
	public get btn_Down(): mw.Button {
		if(!this.btn_Down_Internal&&this.uiWidgetBase) {
			this.btn_Down_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/can_Up_Down/btn_Down') as mw.Button
		}
		return this.btn_Down_Internal
	}
	private text_Describe_Internal: mw.TextBlock
	public get text_Describe(): mw.TextBlock {
		if(!this.text_Describe_Internal&&this.uiWidgetBase) {
			this.text_Describe_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/text_Describe') as mw.TextBlock
		}
		return this.text_Describe_Internal
	}
	private img_Icon_Internal: mw.Image
	public get img_Icon(): mw.Image {
		if(!this.img_Icon_Internal&&this.uiWidgetBase) {
			this.img_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/img_Icon') as mw.Image
		}
		return this.img_Icon_Internal
	}
	private can_Mobox_Internal: mw.Canvas
	public get can_Mobox(): mw.Canvas {
		if(!this.can_Mobox_Internal&&this.uiWidgetBase) {
			this.can_Mobox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/can_Mobox') as mw.Canvas
		}
		return this.can_Mobox_Internal
	}
	private text_MoboxNumber_Internal: mw.TextBlock
	public get text_MoboxNumber(): mw.TextBlock {
		if(!this.text_MoboxNumber_Internal&&this.uiWidgetBase) {
			this.text_MoboxNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/can_Mobox/text_MoboxNumber') as mw.TextBlock
		}
		return this.text_MoboxNumber_Internal
	}
	private img_MoboxImg_Internal: mw.Image
	public get img_MoboxImg(): mw.Image {
		if(!this.img_MoboxImg_Internal&&this.uiWidgetBase) {
			this.img_MoboxImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/can_Mobox/img_MoboxImg') as mw.Image
		}
		return this.img_MoboxImg_Internal
	}
	private text_Name_Internal: mw.TextBlock
	public get text_Name(): mw.TextBlock {
		if(!this.text_Name_Internal&&this.uiWidgetBase) {
			this.text_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/text_Name') as mw.TextBlock
		}
		return this.text_Name_Internal
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
        
        this.btn_Item.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.btn_Up.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.btn_Down.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 未暴露的文本按钮
        
        // 文本控件
        
        this.initLanguage(this.text_Describe)
        
	
        this.initLanguage(this.text_MoboxNumber)
        
	
        this.initLanguage(this.text_Name)
        
	
        // 未暴露的文本控件
        
    }

    protected overrideTextSetter() {
        
        overrideTextBlockTextSetter(this.text_Describe);
        
	
        overrideTextBlockTextSetter(this.text_MoboxNumber);
        
	
        overrideTextBlockTextSetter(this.text_Name);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.text_Describe)
        
	
        this.unregisterLanKey(this.text_MoboxNumber)
        
	
        this.unregisterLanKey(this.text_Name)
        
	
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