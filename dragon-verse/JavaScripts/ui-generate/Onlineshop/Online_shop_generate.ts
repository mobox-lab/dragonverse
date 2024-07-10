/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
 * UI: UI/Onlineshop/Online_shop.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/Onlineshop/Online_shop.ui')
export default class Online_shop_Generate extends UIScript {
	private can_OnlineShop_Internal: mw.Canvas
	public get can_OnlineShop(): mw.Canvas {
		if(!this.can_OnlineShop_Internal&&this.uiWidgetBase) {
			this.can_OnlineShop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop') as mw.Canvas
		}
		return this.can_OnlineShop_Internal
	}
	private img_Background_Internal: mw.Image
	public get img_Background(): mw.Image {
		if(!this.img_Background_Internal&&this.uiWidgetBase) {
			this.img_Background_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/img_Background') as mw.Image
		}
		return this.img_Background_Internal
	}
	private can_Buy_Internal: mw.Canvas
	public get can_Buy(): mw.Canvas {
		if(!this.can_Buy_Internal&&this.uiWidgetBase) {
			this.can_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_Buy') as mw.Canvas
		}
		return this.can_Buy_Internal
	}
	private btn_Buy_Internal: mw.Button
	public get btn_Buy(): mw.Button {
		if(!this.btn_Buy_Internal&&this.uiWidgetBase) {
			this.btn_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_Buy/btn_Buy') as mw.Button
		}
		return this.btn_Buy_Internal
	}
	private text_Buy_Internal: mw.TextBlock
	public get text_Buy(): mw.TextBlock {
		if(!this.text_Buy_Internal&&this.uiWidgetBase) {
			this.text_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_Buy/btn_Buy/text_Buy') as mw.TextBlock
		}
		return this.text_Buy_Internal
	}
	private can_Close_Internal: mw.Canvas
	public get can_Close(): mw.Canvas {
		if(!this.can_Close_Internal&&this.uiWidgetBase) {
			this.can_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_Close') as mw.Canvas
		}
		return this.can_Close_Internal
	}
	private btn_Close_Internal: mw.Button
	public get btn_Close(): mw.Button {
		if(!this.btn_Close_Internal&&this.uiWidgetBase) {
			this.btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_Close/btn_Close') as mw.Button
		}
		return this.btn_Close_Internal
	}
	private scr_ShopItem_Internal: mw.ScrollBox
	public get scr_ShopItem(): mw.ScrollBox {
		if(!this.scr_ShopItem_Internal&&this.uiWidgetBase) {
			this.scr_ShopItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/scr_ShopItem') as mw.ScrollBox
		}
		return this.scr_ShopItem_Internal
	}
	private can_ShopItem_Internal: mw.Canvas
	public get can_ShopItem(): mw.Canvas {
		if(!this.can_ShopItem_Internal&&this.uiWidgetBase) {
			this.can_ShopItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/scr_ShopItem/can_ShopItem') as mw.Canvas
		}
		return this.can_ShopItem_Internal
	}
	private can_MoboxChange_Internal: mw.Canvas
	public get can_MoboxChange(): mw.Canvas {
		if(!this.can_MoboxChange_Internal&&this.uiWidgetBase) {
			this.can_MoboxChange_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_MoboxChange') as mw.Canvas
		}
		return this.can_MoboxChange_Internal
	}
	private text_All_Internal: mw.TextBlock
	public get text_All(): mw.TextBlock {
		if(!this.text_All_Internal&&this.uiWidgetBase) {
			this.text_All_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_MoboxChange/text_All') as mw.TextBlock
		}
		return this.text_All_Internal
	}
	private text_Left_Internal: mw.TextBlock
	public get text_Left(): mw.TextBlock {
		if(!this.text_Left_Internal&&this.uiWidgetBase) {
			this.text_Left_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_MoboxChange/text_Left') as mw.TextBlock
		}
		return this.text_Left_Internal
	}
	private can_BuyTips_Internal: mw.Canvas
	public get can_BuyTips(): mw.Canvas {
		if(!this.can_BuyTips_Internal&&this.uiWidgetBase) {
			this.can_BuyTips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_BuyTips') as mw.Canvas
		}
		return this.can_BuyTips_Internal
	}
	private img_Tip_Background_Internal: mw.Image
	public get img_Tip_Background(): mw.Image {
		if(!this.img_Tip_Background_Internal&&this.uiWidgetBase) {
			this.img_Tip_Background_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_BuyTips/img_Tip_Background') as mw.Image
		}
		return this.img_Tip_Background_Internal
	}
	private img_Icon1_Internal: mw.Image
	public get img_Icon1(): mw.Image {
		if(!this.img_Icon1_Internal&&this.uiWidgetBase) {
			this.img_Icon1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_BuyTips/img_Icon1') as mw.Image
		}
		return this.img_Icon1_Internal
	}
	private text_SuccessText_Internal: mw.TextBlock
	public get text_SuccessText(): mw.TextBlock {
		if(!this.text_SuccessText_Internal&&this.uiWidgetBase) {
			this.text_SuccessText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_BuyTips/text_SuccessText') as mw.TextBlock
		}
		return this.text_SuccessText_Internal
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
        
        this.btn_Buy.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.btn_Close.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 未暴露的文本按钮
        
        // 文本控件
        
        this.initLanguage(this.text_Buy)
        
	
        this.initLanguage(this.text_All)
        
	
        this.initLanguage(this.text_Left)
        
	
        this.initLanguage(this.text_SuccessText)
        
	
        // 未暴露的文本控件
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_OnlineShop/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_OnlineShop/can_MoboxChange/TextBlock_1") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_OnlineShop/can_MoboxChange/TextBlock_1_1") as mw.TextBlock);
        
	
    }

    protected overrideTextSetter() {
        
        overrideTextBlockTextSetter(this.text_Buy);
        
	
        overrideTextBlockTextSetter(this.text_All);
        
	
        overrideTextBlockTextSetter(this.text_Left);
        
	
        overrideTextBlockTextSetter(this.text_SuccessText);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.text_Buy)
        
	
        this.unregisterLanKey(this.text_All)
        
	
        this.unregisterLanKey(this.text_Left)
        
	
        this.unregisterLanKey(this.text_SuccessText)
        
	
        // 隐藏文本多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/can_OnlineShop/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/can_OnlineShop/can_MoboxChange/TextBlock_1") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/can_OnlineShop/can_MoboxChange/TextBlock_1_1") as mw.TextBlock);
        
	
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