/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 1.0.8
 * UI: UI/map/BigMap.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/map/BigMap.ui')
export default class BigMap_Generate extends UIScript {
	private mailImage_1_Internal: mw.Image
	public get mailImage_1(): mw.Image {
		if(!this.mailImage_1_Internal&&this.uiWidgetBase) {
			this.mailImage_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mailImage_1') as mw.Image
		}
		return this.mailImage_1_Internal
	}
	private bigmapmain_Internal: mw.Canvas
	public get bigmapmain(): mw.Canvas {
		if(!this.bigmapmain_Internal&&this.uiWidgetBase) {
			this.bigmapmain_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bigmapmain') as mw.Canvas
		}
		return this.bigmapmain_Internal
	}
	private mapback_Internal: mw.Image
	public get mapback(): mw.Image {
		if(!this.mapback_Internal&&this.uiWidgetBase) {
			this.mapback_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bigmapmain/Maptotal/mapback') as mw.Image
		}
		return this.mapback_Internal
	}
	private mainmap_Internal: mw.Image
	public get mainmap(): mw.Image {
		if(!this.mainmap_Internal&&this.uiWidgetBase) {
			this.mainmap_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bigmapmain/Maptotal/mainmap') as mw.Image
		}
		return this.mainmap_Internal
	}
	private playerpoint_Internal: mw.Image
	public get playerpoint(): mw.Image {
		if(!this.playerpoint_Internal&&this.uiWidgetBase) {
			this.playerpoint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bigmapmain/Maptotal/playerpoint') as mw.Image
		}
		return this.playerpoint_Internal
	}
	private playerinfo_Internal: mw.Canvas
	public get playerinfo(): mw.Canvas {
		if(!this.playerinfo_Internal&&this.uiWidgetBase) {
			this.playerinfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bigmapmain/Maptotal/playerinfo') as mw.Canvas
		}
		return this.playerinfo_Internal
	}
	private texkbackground_1_Internal: mw.Image
	public get texkbackground_1(): mw.Image {
		if(!this.texkbackground_1_Internal&&this.uiWidgetBase) {
			this.texkbackground_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bigmapmain/Maptotal/playerinfo/texkbackground_1') as mw.Image
		}
		return this.texkbackground_1_Internal
	}
	private texkbackground_Internal: mw.Image
	public get texkbackground(): mw.Image {
		if(!this.texkbackground_Internal&&this.uiWidgetBase) {
			this.texkbackground_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bigmapmain/Maptotal/playerinfo/texkbackground') as mw.Image
		}
		return this.texkbackground_Internal
	}
	private playername_Internal: mw.TextBlock
	public get playername(): mw.TextBlock {
		if(!this.playername_Internal&&this.uiWidgetBase) {
			this.playername_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bigmapmain/Maptotal/playerinfo/playername') as mw.TextBlock
		}
		return this.playername_Internal
	}
	private changecamera_Internal: mw.TextBlock
	public get changecamera(): mw.TextBlock {
		if(!this.changecamera_Internal&&this.uiWidgetBase) {
			this.changecamera_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/changecamera') as mw.TextBlock
		}
		return this.changecamera_Internal
	}
	private changecamera_1_Internal: mw.TextBlock
	public get changecamera_1(): mw.TextBlock {
		if(!this.changecamera_1_Internal&&this.uiWidgetBase) {
			this.changecamera_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/changecamera_1') as mw.TextBlock
		}
		return this.changecamera_1_Internal
	}
	private changecamera_1_1_Internal: mw.TextBlock
	public get changecamera_1_1(): mw.TextBlock {
		if(!this.changecamera_1_1_Internal&&this.uiWidgetBase) {
			this.changecamera_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/changecamera_1_1') as mw.TextBlock
		}
		return this.changecamera_1_1_Internal
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
        
        this.initLanguage(this.playername)
        
	
        this.initLanguage(this.changecamera)
        
	
        this.initLanguage(this.changecamera_1)
        
	
        this.initLanguage(this.changecamera_1_1)
        
	
        // 静态文本多语言
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/W/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/A/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/S/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/D/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Mouse/TextBlock") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/ESC/TextBlock") as mw.TextBlock);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.playername)
        
	
        this.unregisterLanKey(this.changecamera)
        
	
        this.unregisterLanKey(this.changecamera_1)
        
	
        this.unregisterLanKey(this.changecamera_1_1)
        
	
        // 隐藏文本多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/W/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/A/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/S/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/D/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Mouse/TextBlock") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/ESC/TextBlock") as mw.TextBlock);
        
	
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
 