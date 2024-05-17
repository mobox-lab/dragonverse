/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
 * UI: UI/map/BigMapPlayerArrow.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/map/BigMapPlayerArrow.ui')
export default class BigMapPlayerArrow_Generate extends UIScript {
	private cnvPlayerInfo_Internal: mw.Canvas
	public get cnvPlayerInfo(): mw.Canvas {
		if(!this.cnvPlayerInfo_Internal&&this.uiWidgetBase) {
			this.cnvPlayerInfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvPlayerInfo') as mw.Canvas
		}
		return this.cnvPlayerInfo_Internal
	}
	private txtPlayerName_Internal: mw.TextBlock
	public get txtPlayerName(): mw.TextBlock {
		if(!this.txtPlayerName_Internal&&this.uiWidgetBase) {
			this.txtPlayerName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvPlayerInfo/txtPlayerName') as mw.TextBlock
		}
		return this.txtPlayerName_Internal
	}
	private cnvPlayerPointArrow_Internal: mw.Canvas
	public get cnvPlayerPointArrow(): mw.Canvas {
		if(!this.cnvPlayerPointArrow_Internal&&this.uiWidgetBase) {
			this.cnvPlayerPointArrow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvPlayerPointArrow') as mw.Canvas
		}
		return this.cnvPlayerPointArrow_Internal
	}
	private btnPlayerPointArrow_Internal: mw.Button
	public get btnPlayerPointArrow(): mw.Button {
		if(!this.btnPlayerPointArrow_Internal&&this.uiWidgetBase) {
			this.btnPlayerPointArrow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvPlayerPointArrow/btnPlayerPointArrow') as mw.Button
		}
		return this.btnPlayerPointArrow_Internal
	}
	private imgPlayerPointArrow_Internal: mw.Image
	public get imgPlayerPointArrow(): mw.Image {
		if(!this.imgPlayerPointArrow_Internal&&this.uiWidgetBase) {
			this.imgPlayerPointArrow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvPlayerPointArrow/imgPlayerPointArrow') as mw.Image
		}
		return this.imgPlayerPointArrow_Internal
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
        
        this.btnPlayerPointArrow.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 未暴露的文本按钮
        
        // 文本控件
        
        this.initLanguage(this.txtPlayerName)
        
	
        // 未暴露的文本控件
        
    }

    protected overrideTextSetter() {
        
        overrideTextBlockTextSetter(this.txtPlayerName);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.txtPlayerName)
        
	
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