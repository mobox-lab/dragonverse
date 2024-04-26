/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.2.0
 * UI: UI/mail/MailPanel.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/mail/MailPanel.ui')
export default class MailPanel_Generate extends UIScript {
	private mailImage_1_Internal: mw.Image
	public get mailImage_1(): mw.Image {
		if(!this.mailImage_1_Internal&&this.uiWidgetBase) {
			this.mailImage_1_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailImage_1') as mw.Image
		}
		return this.mailImage_1_Internal
	}
	private mailButtonDelete_1_Internal: mw.StaleButton
	public get mailButtonDelete_1(): mw.StaleButton {
		if(!this.mailButtonDelete_1_Internal&&this.uiWidgetBase) {
			this.mailButtonDelete_1_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailButtonDelete_1') as mw.StaleButton
		}
		return this.mailButtonDelete_1_Internal
	}
	private mailButtonReceive_1_Internal: mw.StaleButton
	public get mailButtonReceive_1(): mw.StaleButton {
		if(!this.mailButtonReceive_1_Internal&&this.uiWidgetBase) {
			this.mailButtonReceive_1_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailButtonReceive_1') as mw.StaleButton
		}
		return this.mailButtonReceive_1_Internal
	}
	private mailImage_2_Internal: mw.Image
	public get mailImage_2(): mw.Image {
		if(!this.mailImage_2_Internal&&this.uiWidgetBase) {
			this.mailImage_2_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailImage_2') as mw.Image
		}
		return this.mailImage_2_Internal
	}
	private mailImage_2_1_Internal: mw.Image
	public get mailImage_2_1(): mw.Image {
		if(!this.mailImage_2_1_Internal&&this.uiWidgetBase) {
			this.mailImage_2_1_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailImage_2_1') as mw.Image
		}
		return this.mailImage_2_1_Internal
	}
	private mailImage_2_2_Internal: mw.Image
	public get mailImage_2_2(): mw.Image {
		if(!this.mailImage_2_2_Internal&&this.uiWidgetBase) {
			this.mailImage_2_2_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailImage_2_2') as mw.Image
		}
		return this.mailImage_2_2_Internal
	}
	private mailImage_2_3_Internal: mw.Image
	public get mailImage_2_3(): mw.Image {
		if(!this.mailImage_2_3_Internal&&this.uiWidgetBase) {
			this.mailImage_2_3_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailImage_2_3') as mw.Image
		}
		return this.mailImage_2_3_Internal
	}
	private mailPanelTitle_Internal: mw.TextBlock
	public get mailPanelTitle(): mw.TextBlock {
		if(!this.mailPanelTitle_Internal&&this.uiWidgetBase) {
			this.mailPanelTitle_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailPanelTitle') as mw.TextBlock
		}
		return this.mailPanelTitle_Internal
	}
	private mailImage_3_1_Internal: mw.Image
	public get mailImage_3_1(): mw.Image {
		if(!this.mailImage_3_1_Internal&&this.uiWidgetBase) {
			this.mailImage_3_1_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailImage_3_1') as mw.Image
		}
		return this.mailImage_3_1_Internal
	}
	private mailImage_3_2_Internal: mw.Image
	public get mailImage_3_2(): mw.Image {
		if(!this.mailImage_3_2_Internal&&this.uiWidgetBase) {
			this.mailImage_3_2_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailImage_3_2') as mw.Image
		}
		return this.mailImage_3_2_Internal
	}
	private mailImage_3_3_Internal: mw.Image
	public get mailImage_3_3(): mw.Image {
		if(!this.mailImage_3_3_Internal&&this.uiWidgetBase) {
			this.mailImage_3_3_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailImage_3_3') as mw.Image
		}
		return this.mailImage_3_3_Internal
	}
	private mailScrollBox_Internal: mw.ScrollBox
	public get mailScrollBox(): mw.ScrollBox {
		if(!this.mailScrollBox_Internal&&this.uiWidgetBase) {
			this.mailScrollBox_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailScrollBox') as mw.ScrollBox
		}
		return this.mailScrollBox_Internal
	}
	private mailImage_4_1_Internal: mw.Image
	public get mailImage_4_1(): mw.Image {
		if(!this.mailImage_4_1_Internal&&this.uiWidgetBase) {
			this.mailImage_4_1_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailScrollBox/mailImage_4_1') as mw.Image
		}
		return this.mailImage_4_1_Internal
	}
	private mailImage_4_2_Internal: mw.Image
	public get mailImage_4_2(): mw.Image {
		if(!this.mailImage_4_2_Internal&&this.uiWidgetBase) {
			this.mailImage_4_2_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailScrollBox/mailImage_4_2') as mw.Image
		}
		return this.mailImage_4_2_Internal
	}
	private mailImage_4_3_Internal: mw.Image
	public get mailImage_4_3(): mw.Image {
		if(!this.mailImage_4_3_Internal&&this.uiWidgetBase) {
			this.mailImage_4_3_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailScrollBox/mailImage_4_3') as mw.Image
		}
		return this.mailImage_4_3_Internal
	}
	private mailTitle_Internal: mw.TextBlock
	public get mailTitle(): mw.TextBlock {
		if(!this.mailTitle_Internal&&this.uiWidgetBase) {
			this.mailTitle_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailTitle') as mw.TextBlock
		}
		return this.mailTitle_Internal
	}
	private mailTime_Internal: mw.TextBlock
	public get mailTime(): mw.TextBlock {
		if(!this.mailTime_Internal&&this.uiWidgetBase) {
			this.mailTime_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailTime') as mw.TextBlock
		}
		return this.mailTime_Internal
	}
	private mailDetailCanvas_Internal: mw.Canvas
	public get mailDetailCanvas(): mw.Canvas {
		if(!this.mailDetailCanvas_Internal&&this.uiWidgetBase) {
			this.mailDetailCanvas_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas') as mw.Canvas
		}
		return this.mailDetailCanvas_Internal
	}
	private mailImage_5_1_Internal: mw.Image
	public get mailImage_5_1(): mw.Image {
		if(!this.mailImage_5_1_Internal&&this.uiWidgetBase) {
			this.mailImage_5_1_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailImage_5_1') as mw.Image
		}
		return this.mailImage_5_1_Internal
	}
	private mailImage_5_2_Internal: mw.Image
	public get mailImage_5_2(): mw.Image {
		if(!this.mailImage_5_2_Internal&&this.uiWidgetBase) {
			this.mailImage_5_2_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailImage_5_2') as mw.Image
		}
		return this.mailImage_5_2_Internal
	}
	private mailImage_5_3_Internal: mw.Image
	public get mailImage_5_3(): mw.Image {
		if(!this.mailImage_5_3_Internal&&this.uiWidgetBase) {
			this.mailImage_5_3_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailImage_5_3') as mw.Image
		}
		return this.mailImage_5_3_Internal
	}
	private mailDetailTitle_Internal: mw.TextBlock
	public get mailDetailTitle(): mw.TextBlock {
		if(!this.mailDetailTitle_Internal&&this.uiWidgetBase) {
			this.mailDetailTitle_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailDetailTitle') as mw.TextBlock
		}
		return this.mailDetailTitle_Internal
	}
	private mailDetailTime_Internal: mw.TextBlock
	public get mailDetailTime(): mw.TextBlock {
		if(!this.mailDetailTime_Internal&&this.uiWidgetBase) {
			this.mailDetailTime_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailDetailTime') as mw.TextBlock
		}
		return this.mailDetailTime_Internal
	}
	private mailImage_5_4_Internal: mw.Image
	public get mailImage_5_4(): mw.Image {
		if(!this.mailImage_5_4_Internal&&this.uiWidgetBase) {
			this.mailImage_5_4_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailImage_5_4') as mw.Image
		}
		return this.mailImage_5_4_Internal
	}
	private mailButtonReceive_2_Internal: mw.StaleButton
	public get mailButtonReceive_2(): mw.StaleButton {
		if(!this.mailButtonReceive_2_Internal&&this.uiWidgetBase) {
			this.mailButtonReceive_2_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailButtonReceive_2') as mw.StaleButton
		}
		return this.mailButtonReceive_2_Internal
	}
	private mailButtonDelete_2_Internal: mw.StaleButton
	public get mailButtonDelete_2(): mw.StaleButton {
		if(!this.mailButtonDelete_2_Internal&&this.uiWidgetBase) {
			this.mailButtonDelete_2_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailButtonDelete_2') as mw.StaleButton
		}
		return this.mailButtonDelete_2_Internal
	}
	private mailDetailScrollBox_Internal: mw.ScrollBox
	public get mailDetailScrollBox(): mw.ScrollBox {
		if(!this.mailDetailScrollBox_Internal&&this.uiWidgetBase) {
			this.mailDetailScrollBox_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailDetailScrollBox') as mw.ScrollBox
		}
		return this.mailDetailScrollBox_Internal
	}
	private mailBodyMain_Internal: mw.TextBlock
	public get mailBodyMain(): mw.TextBlock {
		if(!this.mailBodyMain_Internal&&this.uiWidgetBase) {
			this.mailBodyMain_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailDetailScrollBox/mailBodyMain') as mw.TextBlock
		}
		return this.mailBodyMain_Internal
	}
	private mailImage_6_1_Internal: mw.Image
	public get mailImage_6_1(): mw.Image {
		if(!this.mailImage_6_1_Internal&&this.uiWidgetBase) {
			this.mailImage_6_1_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailImage_6_1') as mw.Image
		}
		return this.mailImage_6_1_Internal
	}
	private mailAnnex_1_Internal: mw.TextBlock
	public get mailAnnex_1(): mw.TextBlock {
		if(!this.mailAnnex_1_Internal&&this.uiWidgetBase) {
			this.mailAnnex_1_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailAnnex_1') as mw.TextBlock
		}
		return this.mailAnnex_1_Internal
	}
	private mailImage_6_2_Internal: mw.Image
	public get mailImage_6_2(): mw.Image {
		if(!this.mailImage_6_2_Internal&&this.uiWidgetBase) {
			this.mailImage_6_2_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailImage_6_2') as mw.Image
		}
		return this.mailImage_6_2_Internal
	}
	private mailAnnex_2_Internal: mw.TextBlock
	public get mailAnnex_2(): mw.TextBlock {
		if(!this.mailAnnex_2_Internal&&this.uiWidgetBase) {
			this.mailAnnex_2_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailAnnex_2') as mw.TextBlock
		}
		return this.mailAnnex_2_Internal
	}
	private mailImage_6_3_Internal: mw.Image
	public get mailImage_6_3(): mw.Image {
		if(!this.mailImage_6_3_Internal&&this.uiWidgetBase) {
			this.mailImage_6_3_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailImage_6_3') as mw.Image
		}
		return this.mailImage_6_3_Internal
	}
	private mailAnnex_3_Internal: mw.TextBlock
	public get mailAnnex_3(): mw.TextBlock {
		if(!this.mailAnnex_3_Internal&&this.uiWidgetBase) {
			this.mailAnnex_3_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailAnnex_3') as mw.TextBlock
		}
		return this.mailAnnex_3_Internal
	}
	private mailImage_6_4_Internal: mw.Image
	public get mailImage_6_4(): mw.Image {
		if(!this.mailImage_6_4_Internal&&this.uiWidgetBase) {
			this.mailImage_6_4_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailImage_6_4') as mw.Image
		}
		return this.mailImage_6_4_Internal
	}
	private mailImage_6_5_Internal: mw.Image
	public get mailImage_6_5(): mw.Image {
		if(!this.mailImage_6_5_Internal&&this.uiWidgetBase) {
			this.mailImage_6_5_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailImage_6_5') as mw.Image
		}
		return this.mailImage_6_5_Internal
	}
	private mailImage_6_6_Internal: mw.Image
	public get mailImage_6_6(): mw.Image {
		if(!this.mailImage_6_6_Internal&&this.uiWidgetBase) {
			this.mailImage_6_6_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailImage_6_6') as mw.Image
		}
		return this.mailImage_6_6_Internal
	}
	private mailImage_6_7_Internal: mw.Image
	public get mailImage_6_7(): mw.Image {
		if(!this.mailImage_6_7_Internal&&this.uiWidgetBase) {
			this.mailImage_6_7_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailImage_6_7') as mw.Image
		}
		return this.mailImage_6_7_Internal
	}
	private mailAnnex_4_Internal: mw.TextBlock
	public get mailAnnex_4(): mw.TextBlock {
		if(!this.mailAnnex_4_Internal&&this.uiWidgetBase) {
			this.mailAnnex_4_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailAnnex_4') as mw.TextBlock
		}
		return this.mailAnnex_4_Internal
	}
	private mailAnnex_5_Internal: mw.TextBlock
	public get mailAnnex_5(): mw.TextBlock {
		if(!this.mailAnnex_5_Internal&&this.uiWidgetBase) {
			this.mailAnnex_5_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailAnnex_5') as mw.TextBlock
		}
		return this.mailAnnex_5_Internal
	}
	private mailAnnex_6_Internal: mw.TextBlock
	public get mailAnnex_6(): mw.TextBlock {
		if(!this.mailAnnex_6_Internal&&this.uiWidgetBase) {
			this.mailAnnex_6_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailAnnex_6') as mw.TextBlock
		}
		return this.mailAnnex_6_Internal
	}
	private mailAnnex_7_Internal: mw.TextBlock
	public get mailAnnex_7(): mw.TextBlock {
		if(!this.mailAnnex_7_Internal&&this.uiWidgetBase) {
			this.mailAnnex_7_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailAnnex_7') as mw.TextBlock
		}
		return this.mailAnnex_7_Internal
	}
	private mailButtonDetailClose_Internal: mw.Button
	public get mailButtonDetailClose(): mw.Button {
		if(!this.mailButtonDetailClose_Internal&&this.uiWidgetBase) {
			this.mailButtonDetailClose_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailDetailCanvas/mailButtonDetailClose') as mw.Button
		}
		return this.mailButtonDetailClose_Internal
	}
	private mailButtonClose_Internal: mw.Button
	public get mailButtonClose(): mw.Button {
		if(!this.mailButtonClose_Internal&&this.uiWidgetBase) {
			this.mailButtonClose_Internal = this.uiWidgetBase.findChildByPath('MailCanvas/mailButtonClose') as mw.Button
		}
		return this.mailButtonClose_Internal
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

    public destroy(): void {
        this.unregisterTextLan();
        super.destroy();
    }

    protected initTextLan() {
        // 文本按钮多语言
        
        this.initLanguage(this.mailButtonDelete_1);
        
	
        this.initLanguage(this.mailButtonReceive_1);
        
	
        this.initLanguage(this.mailButtonReceive_2);
        
	
        this.initLanguage(this.mailButtonDelete_2);
        
	
        // 静态文本按钮多语言
        
        // 文本多语言
        
        this.initLanguage(this.mailPanelTitle)
        
	
        this.initLanguage(this.mailTitle)
        
	
        this.initLanguage(this.mailTime)
        
	
        this.initLanguage(this.mailDetailTitle)
        
	
        this.initLanguage(this.mailDetailTime)
        
	
        this.initLanguage(this.mailBodyMain)
        
	
        this.initLanguage(this.mailAnnex_1)
        
	
        this.initLanguage(this.mailAnnex_2)
        
	
        this.initLanguage(this.mailAnnex_3)
        
	
        this.initLanguage(this.mailAnnex_4)
        
	
        this.initLanguage(this.mailAnnex_5)
        
	
        this.initLanguage(this.mailAnnex_6)
        
	
        this.initLanguage(this.mailAnnex_7)
        
	
        // 静态文本多语言
        
    }

    protected overrideTextSetter() {
        
        overrideBubblingWidget(this.mailPanelTitle);
        
	
        overrideBubblingWidget(this.mailTitle);
        
	
        overrideBubblingWidget(this.mailTime);
        
	
        overrideBubblingWidget(this.mailDetailTitle);
        
	
        overrideBubblingWidget(this.mailDetailTime);
        
	
        overrideBubblingWidget(this.mailBodyMain);
        
	
        overrideBubblingWidget(this.mailAnnex_1);
        
	
        overrideBubblingWidget(this.mailAnnex_2);
        
	
        overrideBubblingWidget(this.mailAnnex_3);
        
	
        overrideBubblingWidget(this.mailAnnex_4);
        
	
        overrideBubblingWidget(this.mailAnnex_5);
        
	
        overrideBubblingWidget(this.mailAnnex_6);
        
	
        overrideBubblingWidget(this.mailAnnex_7);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.mailButtonDelete_1);
        
	
        this.unregisterLanKey(this.mailButtonReceive_1);
        
	
        this.unregisterLanKey(this.mailButtonReceive_2);
        
	
        this.unregisterLanKey(this.mailButtonDelete_2);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.mailPanelTitle)
        
	
        this.unregisterLanKey(this.mailTitle)
        
	
        this.unregisterLanKey(this.mailTime)
        
	
        this.unregisterLanKey(this.mailDetailTitle)
        
	
        this.unregisterLanKey(this.mailDetailTime)
        
	
        this.unregisterLanKey(this.mailBodyMain)
        
	
        this.unregisterLanKey(this.mailAnnex_1)
        
	
        this.unregisterLanKey(this.mailAnnex_2)
        
	
        this.unregisterLanKey(this.mailAnnex_3)
        
	
        this.unregisterLanKey(this.mailAnnex_4)
        
	
        this.unregisterLanKey(this.mailAnnex_5)
        
	
        this.unregisterLanKey(this.mailAnnex_6)
        
	
        this.unregisterLanKey(this.mailAnnex_7)
        
	
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