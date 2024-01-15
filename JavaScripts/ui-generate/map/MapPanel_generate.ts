/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 1.0.8
 * UI: UI/map/MapPanel.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/map/MapPanel.ui')
export default class MapPanel_Generate extends UIScript {
	private mSmallCanvas_Internal: mw.Canvas
	public get mSmallCanvas(): mw.Canvas {
		if(!this.mSmallCanvas_Internal&&this.uiWidgetBase) {
			this.mSmallCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSmallCanvas') as mw.Canvas
		}
		return this.mSmallCanvas_Internal
	}
	private mSmallMapCanvas_Internal: mw.Canvas
	public get mSmallMapCanvas(): mw.Canvas {
		if(!this.mSmallMapCanvas_Internal&&this.uiWidgetBase) {
			this.mSmallMapCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSmallCanvas/mSmallMapCanvas') as mw.Canvas
		}
		return this.mSmallMapCanvas_Internal
	}
	private mSmallMineCanvas_Internal: mw.Canvas
	public get mSmallMineCanvas(): mw.Canvas {
		if(!this.mSmallMineCanvas_Internal&&this.uiWidgetBase) {
			this.mSmallMineCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSmallCanvas/mSmallMineCanvas') as mw.Canvas
		}
		return this.mSmallMineCanvas_Internal
	}



	protected onAwake() {
		this.initTextLan();
	}

    public destroy(): void {
        this.unregisterTextLan();
        super.destroy();
    }

    protected initTextLan() {
        // 文本按钮多语言
        
        // 静态文本按钮多语言
        
        // 文本多语言
        
        // 静态文本多语言
        
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
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
 