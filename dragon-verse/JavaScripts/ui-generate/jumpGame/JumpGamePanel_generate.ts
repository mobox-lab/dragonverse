/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.2.3
 * UI: UI/jumpGame/JumpGamePanel.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/jumpGame/JumpGamePanel.ui')
export default class JumpGamePanel_Generate extends UIScript {
	private codeImage_1_Internal: mw.Image
	public get codeImage_1(): mw.Image {
		if(!this.codeImage_1_Internal&&this.uiWidgetBase) {
			this.codeImage_1_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeImage_1') as mw.Image
		}
		return this.codeImage_1_Internal
	}
	private codeImage_1_1_Internal: mw.Image
	public get codeImage_1_1(): mw.Image {
		if(!this.codeImage_1_1_Internal&&this.uiWidgetBase) {
			this.codeImage_1_1_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeImage_1_1') as mw.Image
		}
		return this.codeImage_1_1_Internal
	}
	private jumpGameTitle_Internal: mw.TextBlock
	public get jumpGameTitle(): mw.TextBlock {
		if(!this.jumpGameTitle_Internal&&this.uiWidgetBase) {
			this.jumpGameTitle_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/jumpGameTitle') as mw.TextBlock
		}
		return this.jumpGameTitle_Internal
	}
	private jumpGameMainBody_Internal: mw.TextBlock
	public get jumpGameMainBody(): mw.TextBlock {
		if(!this.jumpGameMainBody_Internal&&this.uiWidgetBase) {
			this.jumpGameMainBody_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/jumpGameMainBody') as mw.TextBlock
		}
		return this.jumpGameMainBody_Internal
	}
	private codeImage_2_Internal: mw.Image
	public get codeImage_2(): mw.Image {
		if(!this.codeImage_2_Internal&&this.uiWidgetBase) {
			this.codeImage_2_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeImage_2') as mw.Image
		}
		return this.codeImage_2_Internal
	}
	private contantCanvas_Internal: mw.Canvas
	public get contantCanvas(): mw.Canvas {
		if(!this.contantCanvas_Internal&&this.uiWidgetBase) {
			this.contantCanvas_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/contantCanvas') as mw.Canvas
		}
		return this.contantCanvas_Internal
	}
	private jumpButtonVerify_Internal: mw.StaleButton
	public get jumpButtonVerify(): mw.StaleButton {
		if(!this.jumpButtonVerify_Internal&&this.uiWidgetBase) {
			this.jumpButtonVerify_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/contantCanvas/jumpButtonVerify') as mw.StaleButton
		}
		return this.jumpButtonVerify_Internal
	}
	private codeImage_3_Internal: mw.Image
	public get codeImage_3(): mw.Image {
		if(!this.codeImage_3_Internal&&this.uiWidgetBase) {
			this.codeImage_3_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/contantCanvas/codeImage_3') as mw.Image
		}
		return this.codeImage_3_Internal
	}
	private roomIdInputBox_Internal: mw.InputBox
	public get roomIdInputBox(): mw.InputBox {
		if(!this.roomIdInputBox_Internal&&this.uiWidgetBase) {
			this.roomIdInputBox_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/contantCanvas/roomIdInputBox') as mw.InputBox
		}
		return this.roomIdInputBox_Internal
	}
	private codeNum_Internal: mw.TextBlock
	public get codeNum(): mw.TextBlock {
		if(!this.codeNum_Internal&&this.uiWidgetBase) {
			this.codeNum_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeNum') as mw.TextBlock
		}
		return this.codeNum_Internal
	}
	private codePaste_Internal: mw.TextBlock
	public get codePaste(): mw.TextBlock {
		if(!this.codePaste_Internal&&this.uiWidgetBase) {
			this.codePaste_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codePaste') as mw.TextBlock
		}
		return this.codePaste_Internal
	}
	private codeButtonPaste_Internal: mw.Button
	public get codeButtonPaste(): mw.Button {
		if(!this.codeButtonPaste_Internal&&this.uiWidgetBase) {
			this.codeButtonPaste_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeButtonPaste') as mw.Button
		}
		return this.codeButtonPaste_Internal
	}
	private codeButtonClose_Internal: mw.Button
	public get codeButtonClose(): mw.Button {
		if(!this.codeButtonClose_Internal&&this.uiWidgetBase) {
			this.codeButtonClose_Internal = this.uiWidgetBase.findChildByPath('CodeMainCanvas/codeButtonClose') as mw.Button
		}
		return this.codeButtonClose_Internal
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
        
        this.initLanguage(this.jumpButtonVerify);
        
	
        // 静态文本按钮多语言
        
        // 文本多语言
        
        this.initLanguage(this.jumpGameTitle)
        
	
        this.initLanguage(this.jumpGameMainBody)
        
	
        this.initLanguage(this.codeNum)
        
	
        this.initLanguage(this.codePaste)
        
	
        // 静态文本多语言
        
    }

    protected overrideTextSetter() {
        
        overrideBubblingWidget(this.jumpGameTitle);
        
	
        overrideBubblingWidget(this.jumpGameMainBody);
        
	
        overrideBubblingWidget(this.codeNum);
        
	
        overrideBubblingWidget(this.codePaste);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.jumpButtonVerify);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.jumpGameTitle)
        
	
        this.unregisterLanKey(this.jumpGameMainBody)
        
	
        this.unregisterLanKey(this.codeNum)
        
	
        this.unregisterLanKey(this.codePaste)
        
	
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