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
	private cnvMap_Internal: mw.Canvas
	public get cnvMap(): mw.Canvas {
		if(!this.cnvMap_Internal&&this.uiWidgetBase) {
			this.cnvMap_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMap') as mw.Canvas
		}
		return this.cnvMap_Internal
	}
	private cnvMapMain_Internal: mw.Canvas
	public get cnvMapMain(): mw.Canvas {
		if(!this.cnvMapMain_Internal&&this.uiWidgetBase) {
			this.cnvMapMain_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMap/cnvMapMain') as mw.Canvas
		}
		return this.cnvMapMain_Internal
	}
	private btnMapClose_Internal: mw.Button
	public get btnMapClose(): mw.Button {
		if(!this.btnMapClose_Internal&&this.uiWidgetBase) {
			this.btnMapClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMap/btnMapClose') as mw.Button
		}
		return this.btnMapClose_Internal
	}
	private cnvMiniMap_Internal: mw.Canvas
	public get cnvMiniMap(): mw.Canvas {
		if(!this.cnvMiniMap_Internal&&this.uiWidgetBase) {
			this.cnvMiniMap_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMiniMap') as mw.Canvas
		}
		return this.cnvMiniMap_Internal
	}
	private mSmallCanvas_Internal: mw.Canvas
	public get mSmallCanvas(): mw.Canvas {
		if(!this.mSmallCanvas_Internal&&this.uiWidgetBase) {
			this.mSmallCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMiniMap/mSmallCanvas') as mw.Canvas
		}
		return this.mSmallCanvas_Internal
	}
	private mSmallMapCanvas_Internal: mw.Canvas
	public get mSmallMapCanvas(): mw.Canvas {
		if(!this.mSmallMapCanvas_Internal&&this.uiWidgetBase) {
			this.mSmallMapCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMiniMap/mSmallCanvas/mSmallMapCanvas') as mw.Canvas
		}
		return this.mSmallMapCanvas_Internal
	}
	private mSmallMineCanvas_Internal: mw.Canvas
	public get mSmallMineCanvas(): mw.Canvas {
		if(!this.mSmallMineCanvas_Internal&&this.uiWidgetBase) {
			this.mSmallMineCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMiniMap/mSmallCanvas/mSmallMineCanvas') as mw.Canvas
		}
		return this.mSmallMineCanvas_Internal
	}
	private btnMiniMap_Internal: mw.Button
	public get btnMiniMap(): mw.Button {
		if(!this.btnMiniMap_Internal&&this.uiWidgetBase) {
			this.btnMiniMap_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMiniMap/mSmallCanvas/btnMiniMap') as mw.Button
		}
		return this.btnMiniMap_Internal
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
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/TxtChangeCamera") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/W/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/A/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/S/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/D/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/TxtZoomMap") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/Mouse/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/TxtCloseMap") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/ESC/TextBlock") as mw.TextBlock);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        // 隐藏文本多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/TxtChangeCamera") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/W/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/A/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/S/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/D/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/TxtZoomMap") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/Mouse/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/TxtCloseMap") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMap/CnvHotKeys/ESC/TextBlock") as mw.TextBlock);
        
	
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
 