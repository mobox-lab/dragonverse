/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.2.3
 * UI: UI/tutorial.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/tutorial.ui')
export default class tutorial_Generate extends UIScript {
	private beginnerbg_Internal: mw.Canvas
	public get beginnerbg(): mw.Canvas {
		if(!this.beginnerbg_Internal&&this.uiWidgetBase) {
			this.beginnerbg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg') as mw.Canvas
		}
		return this.beginnerbg_Internal
	}
	private beginner_Internal: mw.Image
	public get beginner(): mw.Image {
		if(!this.beginner_Internal&&this.uiWidgetBase) {
			this.beginner_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/beginner') as mw.Image
		}
		return this.beginner_Internal
	}
	private beginnerclose_Internal: mw.Button
	public get beginnerclose(): mw.Button {
		if(!this.beginnerclose_Internal&&this.uiWidgetBase) {
			this.beginnerclose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/Canvas/beginnerclose') as mw.Button
		}
		return this.beginnerclose_Internal
	}
	private turioal_Internal: mw.Canvas
	public get turioal(): mw.Canvas {
		if(!this.turioal_Internal&&this.uiWidgetBase) {
			this.turioal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal') as mw.Canvas
		}
		return this.turioal_Internal
	}
	private move_Internal: mw.Canvas
	public get move(): mw.Canvas {
		if(!this.move_Internal&&this.uiWidgetBase) {
			this.move_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/move') as mw.Canvas
		}
		return this.move_Internal
	}
	private playermove_Internal: mw.TextBlock
	public get playermove(): mw.TextBlock {
		if(!this.playermove_Internal&&this.uiWidgetBase) {
			this.playermove_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/move/playermove') as mw.TextBlock
		}
		return this.playermove_Internal
	}
	private jump_Internal: mw.Canvas
	public get jump(): mw.Canvas {
		if(!this.jump_Internal&&this.uiWidgetBase) {
			this.jump_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/jump') as mw.Canvas
		}
		return this.jump_Internal
	}
	private threejump_Internal: mw.TextBlock
	public get threejump(): mw.TextBlock {
		if(!this.threejump_Internal&&this.uiWidgetBase) {
			this.threejump_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/jump/threejump') as mw.TextBlock
		}
		return this.threejump_Internal
	}
	private mouse_Internal: mw.Canvas
	public get mouse(): mw.Canvas {
		if(!this.mouse_Internal&&this.uiWidgetBase) {
			this.mouse_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/mouse') as mw.Canvas
		}
		return this.mouse_Internal
	}
	private shift_Internal: mw.Canvas
	public get shift(): mw.Canvas {
		if(!this.shift_Internal&&this.uiWidgetBase) {
			this.shift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/mouse/shift') as mw.Canvas
		}
		return this.shift_Internal
	}
	private whethermouse_Internal: mw.TextBlock
	public get whethermouse(): mw.TextBlock {
		if(!this.whethermouse_Internal&&this.uiWidgetBase) {
			this.whethermouse_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/mouse/whethermouse') as mw.TextBlock
		}
		return this.whethermouse_Internal
	}
	private running_Internal: mw.Canvas
	public get running(): mw.Canvas {
		if(!this.running_Internal&&this.uiWidgetBase) {
			this.running_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/running') as mw.Canvas
		}
		return this.running_Internal
	}
	private mouseclick_Internal: mw.Canvas
	public get mouseclick(): mw.Canvas {
		if(!this.mouseclick_Internal&&this.uiWidgetBase) {
			this.mouseclick_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/running/mouseclick') as mw.Canvas
		}
		return this.mouseclick_Internal
	}
	private runrunrun_Internal: mw.TextBlock
	public get runrunrun(): mw.TextBlock {
		if(!this.runrunrun_Internal&&this.uiWidgetBase) {
			this.runrunrun_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/running/runrunrun') as mw.TextBlock
		}
		return this.runrunrun_Internal
	}
	private catchdragon_Internal: mw.Canvas
	public get catchdragon(): mw.Canvas {
		if(!this.catchdragon_Internal&&this.uiWidgetBase) {
			this.catchdragon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/catchdragon') as mw.Canvas
		}
		return this.catchdragon_Internal
	}
	private getandthrowdragon_Internal: mw.TextBlock
	public get getandthrowdragon(): mw.TextBlock {
		if(!this.getandthrowdragon_Internal&&this.uiWidgetBase) {
			this.getandthrowdragon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/catchdragon/getandthrowdragon') as mw.TextBlock
		}
		return this.getandthrowdragon_Internal
	}
	private bag_Internal: mw.Canvas
	public get bag(): mw.Canvas {
		if(!this.bag_Internal&&this.uiWidgetBase) {
			this.bag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/bag') as mw.Canvas
		}
		return this.bag_Internal
	}
	private openbag_Internal: mw.TextBlock
	public get openbag(): mw.TextBlock {
		if(!this.openbag_Internal&&this.uiWidgetBase) {
			this.openbag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/bag/openbag') as mw.TextBlock
		}
		return this.openbag_Internal
	}
	private reset_Internal: mw.Canvas
	public get reset(): mw.Canvas {
		if(!this.reset_Internal&&this.uiWidgetBase) {
			this.reset_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/reset') as mw.Canvas
		}
		return this.reset_Internal
	}
	private resetplayer_Internal: mw.TextBlock
	public get resetplayer(): mw.TextBlock {
		if(!this.resetplayer_Internal&&this.uiWidgetBase) {
			this.resetplayer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/reset/resetplayer') as mw.TextBlock
		}
		return this.resetplayer_Internal
	}
	private upthemap_Internal: mw.Canvas
	public get upthemap(): mw.Canvas {
		if(!this.upthemap_Internal&&this.uiWidgetBase) {
			this.upthemap_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/upthemap') as mw.Canvas
		}
		return this.upthemap_Internal
	}
	private upmap_Internal: mw.TextBlock
	public get upmap(): mw.TextBlock {
		if(!this.upmap_Internal&&this.uiWidgetBase) {
			this.upmap_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/beginnerbg/turioal/upthemap/upmap') as mw.TextBlock
		}
		return this.upmap_Internal
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
        
        this.initLanguage(this.playermove)
        
	
        this.initLanguage(this.threejump)
        
	
        this.initLanguage(this.whethermouse)
        
	
        this.initLanguage(this.runrunrun)
        
	
        this.initLanguage(this.getandthrowdragon)
        
	
        this.initLanguage(this.openbag)
        
	
        this.initLanguage(this.resetplayer)
        
	
        this.initLanguage(this.upmap)
        
	
        // 静态文本多语言
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/move/W/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/move/A/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/move/S/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/move/D/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/jump/W/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/mouse/shift/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/running/mouseclick/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/catchdragon/X/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/catchdragon/E/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/bag/I/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/reset/R/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/upthemap/M/TextBlock") as mw.TextBlock);
        
	
    }

    protected overrideTextSetter() {
        
        overrideBubblingWidget(this.playermove);
        
	
        overrideBubblingWidget(this.threejump);
        
	
        overrideBubblingWidget(this.whethermouse);
        
	
        overrideBubblingWidget(this.runrunrun);
        
	
        overrideBubblingWidget(this.getandthrowdragon);
        
	
        overrideBubblingWidget(this.openbag);
        
	
        overrideBubblingWidget(this.resetplayer);
        
	
        overrideBubblingWidget(this.upmap);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.playermove)
        
	
        this.unregisterLanKey(this.threejump)
        
	
        this.unregisterLanKey(this.whethermouse)
        
	
        this.unregisterLanKey(this.runrunrun)
        
	
        this.unregisterLanKey(this.getandthrowdragon)
        
	
        this.unregisterLanKey(this.openbag)
        
	
        this.unregisterLanKey(this.resetplayer)
        
	
        this.unregisterLanKey(this.upmap)
        
	
        // 隐藏文本多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/move/W/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/move/A/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/move/S/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/move/D/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/jump/W/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/mouse/shift/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/running/mouseclick/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/catchdragon/X/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/catchdragon/E/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/bag/I/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/reset/R/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/beginnerbg/turioal/upthemap/M/TextBlock") as mw.TextBlock);
        
	
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