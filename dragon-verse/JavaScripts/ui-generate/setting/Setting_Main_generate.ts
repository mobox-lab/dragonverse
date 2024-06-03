/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
 * UI: UI/setting/Setting_Main.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/setting/Setting_Main.ui')
export default class Setting_Main_Generate extends UIScript {
	private mCanvas_Setting_Internal: mw.Canvas
	public get mCanvas_Setting(): mw.Canvas {
		if(!this.mCanvas_Setting_Internal&&this.uiWidgetBase) {
			this.mCanvas_Setting_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting') as mw.Canvas
		}
		return this.mCanvas_Setting_Internal
	}
	private canvas_Setting_Internal: mw.Canvas
	public get canvas_Setting(): mw.Canvas {
		if(!this.canvas_Setting_Internal&&this.uiWidgetBase) {
			this.canvas_Setting_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting') as mw.Canvas
		}
		return this.canvas_Setting_Internal
	}
	private mCanvas_Sound_Internal: mw.Canvas
	public get mCanvas_Sound(): mw.Canvas {
		if(!this.mCanvas_Sound_Internal&&this.uiWidgetBase) {
			this.mCanvas_Sound_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound') as mw.Canvas
		}
		return this.mCanvas_Sound_Internal
	}
	private mCanvas_CloseSound_Internal: mw.Canvas
	public get mCanvas_CloseSound(): mw.Canvas {
		if(!this.mCanvas_CloseSound_Internal&&this.uiWidgetBase) {
			this.mCanvas_CloseSound_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_CloseSound') as mw.Canvas
		}
		return this.mCanvas_CloseSound_Internal
	}
	private mBtn_CloseSound_Internal: mw.StaleButton
	public get mBtn_CloseSound(): mw.StaleButton {
		if(!this.mBtn_CloseSound_Internal&&this.uiWidgetBase) {
			this.mBtn_CloseSound_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_CloseSound/mBtn_CloseSound') as mw.StaleButton
		}
		return this.mBtn_CloseSound_Internal
	}
	private mCanvas_Pic_Internal: mw.Canvas
	public get mCanvas_Pic(): mw.Canvas {
		if(!this.mCanvas_Pic_Internal&&this.uiWidgetBase) {
			this.mCanvas_Pic_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic') as mw.Canvas
		}
		return this.mCanvas_Pic_Internal
	}
	private mCanvas_Control_Internal: mw.Canvas
	public get mCanvas_Control(): mw.Canvas {
		if(!this.mCanvas_Control_Internal&&this.uiWidgetBase) {
			this.mCanvas_Control_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control') as mw.Canvas
		}
		return this.mCanvas_Control_Internal
	}
	private mCanvas_cameraspeed_Internal: mw.Canvas
	public get mCanvas_cameraspeed(): mw.Canvas {
		if(!this.mCanvas_cameraspeed_Internal&&this.uiWidgetBase) {
			this.mCanvas_cameraspeed_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed') as mw.Canvas
		}
		return this.mCanvas_cameraspeed_Internal
	}
	private mScroll_speedInputScale_Internal: mw.ProgressBar
	public get mScroll_speedInputScale(): mw.ProgressBar {
		if(!this.mScroll_speedInputScale_Internal&&this.uiWidgetBase) {
			this.mScroll_speedInputScale_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed/mScroll_speedInputScale') as mw.ProgressBar
		}
		return this.mScroll_speedInputScale_Internal
	}
	private mBtn_Back_Internal: mw.StaleButton
	public get mBtn_Back(): mw.StaleButton {
		if(!this.mBtn_Back_Internal&&this.uiWidgetBase) {
			this.mBtn_Back_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/mBtn_Back') as mw.StaleButton
		}
		return this.mBtn_Back_Internal
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
        
        this.initLanguage(this.mBtn_CloseSound);
        this.mBtn_CloseSound.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.mBtn_Back);
        this.mBtn_Back.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 按钮
        
        // 未暴露的文本按钮
        
        // 文本控件
        
        // 未暴露的文本控件
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/Text_Sound") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_CloseSound/Text_CloseSound") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/Text_Pic") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/Text_Control") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed/Text_Speed") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed/Text_Low") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed/Text_High") as mw.TextBlock);
        
	
    }

    protected overrideTextSetter() {
        
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.mBtn_CloseSound);
        
	
        this.unregisterLanKey(this.mBtn_Back);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        // 隐藏文本多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("mCanvas_Setting/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/Text_Sound") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_CloseSound/Text_CloseSound") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/Text_Pic") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/Text_Control") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed/Text_Speed") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed/Text_Low") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed/Text_High") as mw.TextBlock);
        
	
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