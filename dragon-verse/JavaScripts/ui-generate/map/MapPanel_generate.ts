/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.2.3
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
	private cnvMapHolder_Internal: mw.Canvas
	public get cnvMapHolder(): mw.Canvas {
		if(!this.cnvMapHolder_Internal&&this.uiWidgetBase) {
			this.cnvMapHolder_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMap/cnvMapHolder') as mw.Canvas
		}
		return this.cnvMapHolder_Internal
	}
	private cnvMapMesh_Internal: mw.Canvas
	public get cnvMapMesh(): mw.Canvas {
		if(!this.cnvMapMesh_Internal&&this.uiWidgetBase) {
			this.cnvMapMesh_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMap/cnvMapHolder/cnvMapMesh') as mw.Canvas
		}
		return this.cnvMapMesh_Internal
	}
	private markCanvas_Internal: mw.Canvas
	public get markCanvas(): mw.Canvas {
		if(!this.markCanvas_Internal&&this.uiWidgetBase) {
			this.markCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMap/cnvMapHolder/cnvMapMesh/markCanvas') as mw.Canvas
		}
		return this.markCanvas_Internal
	}
	private imgSymbol1_Internal: mw.Image
	public get imgSymbol1(): mw.Image {
		if(!this.imgSymbol1_Internal&&this.uiWidgetBase) {
			this.imgSymbol1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMap/cnvMapHolder/cnvMapMesh/markCanvas/imgSymbol1') as mw.Image
		}
		return this.imgSymbol1_Internal
	}
	private imgSymbol2_Internal: mw.Image
	public get imgSymbol2(): mw.Image {
		if(!this.imgSymbol2_Internal&&this.uiWidgetBase) {
			this.imgSymbol2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMap/cnvMapHolder/cnvMapMesh/markCanvas/imgSymbol2') as mw.Image
		}
		return this.imgSymbol2_Internal
	}
	private imgSymbol3_Internal: mw.Image
	public get imgSymbol3(): mw.Image {
		if(!this.imgSymbol3_Internal&&this.uiWidgetBase) {
			this.imgSymbol3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMap/cnvMapHolder/cnvMapMesh/markCanvas/imgSymbol3') as mw.Image
		}
		return this.imgSymbol3_Internal
	}
	private imgSymbol4_Internal: mw.Image
	public get imgSymbol4(): mw.Image {
		if(!this.imgSymbol4_Internal&&this.uiWidgetBase) {
			this.imgSymbol4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMap/cnvMapHolder/cnvMapMesh/markCanvas/imgSymbol4') as mw.Image
		}
		return this.imgSymbol4_Internal
	}
	private imgSymbol5_Internal: mw.Image
	public get imgSymbol5(): mw.Image {
		if(!this.imgSymbol5_Internal&&this.uiWidgetBase) {
			this.imgSymbol5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMap/cnvMapHolder/cnvMapMesh/markCanvas/imgSymbol5') as mw.Image
		}
		return this.imgSymbol5_Internal
	}
	private imgSymbol6_Internal: mw.Image
	public get imgSymbol6(): mw.Image {
		if(!this.imgSymbol6_Internal&&this.uiWidgetBase) {
			this.imgSymbol6_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMap/cnvMapHolder/cnvMapMesh/markCanvas/imgSymbol6') as mw.Image
		}
		return this.imgSymbol6_Internal
	}
	private imgSymbol7_Internal: mw.Image
	public get imgSymbol7(): mw.Image {
		if(!this.imgSymbol7_Internal&&this.uiWidgetBase) {
			this.imgSymbol7_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMap/cnvMapHolder/cnvMapMesh/markCanvas/imgSymbol7') as mw.Image
		}
		return this.imgSymbol7_Internal
	}
	private imgSymbol8_Internal: mw.Image
	public get imgSymbol8(): mw.Image {
		if(!this.imgSymbol8_Internal&&this.uiWidgetBase) {
			this.imgSymbol8_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMap/cnvMapHolder/cnvMapMesh/markCanvas/imgSymbol8') as mw.Image
		}
		return this.imgSymbol8_Internal
	}
	private cnvMapPlayerArrowContainer_Internal: mw.Canvas
	public get cnvMapPlayerArrowContainer(): mw.Canvas {
		if(!this.cnvMapPlayerArrowContainer_Internal&&this.uiWidgetBase) {
			this.cnvMapPlayerArrowContainer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMap/cnvMapHolder/cnvMapPlayerArrowContainer') as mw.Canvas
		}
		return this.cnvMapPlayerArrowContainer_Internal
	}
	private btnMapClose_Internal: mw.Button
	public get btnMapClose(): mw.Button {
		if(!this.btnMapClose_Internal&&this.uiWidgetBase) {
			this.btnMapClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMap/cnvMapHolder/btnMapClose') as mw.Button
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
        
        // 静态文本按钮多语言
        
        // 文本多语言
        
        // 静态文本多语言
        
    }

    protected overrideTextSetter() {
        
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