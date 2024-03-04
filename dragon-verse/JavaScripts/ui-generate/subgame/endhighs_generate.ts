/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 1.0.8
 * UI: UI/subgame/endhighs.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/subgame/endhighs.ui')
export default class endhighs_Generate extends UIScript {
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private title_Internal: mw.Canvas
	public get title(): mw.Canvas {
		if(!this.title_Internal&&this.uiWidgetBase) {
			this.title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/title') as mw.Canvas
		}
		return this.title_Internal
	}
	private redback_Internal: mw.Image
	public get redback(): mw.Image {
		if(!this.redback_Internal&&this.uiWidgetBase) {
			this.redback_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/title/redback') as mw.Image
		}
		return this.redback_Internal
	}
	private levelcount_Internal: mw.Canvas
	public get levelcount(): mw.Canvas {
		if(!this.levelcount_Internal&&this.uiWidgetBase) {
			this.levelcount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/levelcount') as mw.Canvas
		}
		return this.levelcount_Internal
	}
	private yellowback1_Internal: mw.Image
	public get yellowback1(): mw.Image {
		if(!this.yellowback1_Internal&&this.uiWidgetBase) {
			this.yellowback1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/levelcount/yellowback1') as mw.Image
		}
		return this.yellowback1_Internal
	}
	private textcount_Internal: mw.TextBlock
	public get textcount(): mw.TextBlock {
		if(!this.textcount_Internal&&this.uiWidgetBase) {
			this.textcount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/levelcount/textcount') as mw.TextBlock
		}
		return this.textcount_Internal
	}
	private textnum_Internal: mw.TextBlock
	public get textnum(): mw.TextBlock {
		if(!this.textnum_Internal&&this.uiWidgetBase) {
			this.textnum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/levelcount/textnum') as mw.TextBlock
		}
		return this.textnum_Internal
	}
	private circlecount_Internal: mw.Canvas
	public get circlecount(): mw.Canvas {
		if(!this.circlecount_Internal&&this.uiWidgetBase) {
			this.circlecount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/circlecount') as mw.Canvas
		}
		return this.circlecount_Internal
	}
	private yellowback2_Internal: mw.Image
	public get yellowback2(): mw.Image {
		if(!this.yellowback2_Internal&&this.uiWidgetBase) {
			this.yellowback2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/circlecount/yellowback2') as mw.Image
		}
		return this.yellowback2_Internal
	}
	private textcircle_Internal: mw.TextBlock
	public get textcircle(): mw.TextBlock {
		if(!this.textcircle_Internal&&this.uiWidgetBase) {
			this.textcircle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/circlecount/textcircle') as mw.TextBlock
		}
		return this.textcircle_Internal
	}
	private textnumc_Internal: mw.TextBlock
	public get textnumc(): mw.TextBlock {
		if(!this.textnumc_Internal&&this.uiWidgetBase) {
			this.textnumc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/circlecount/textnumc') as mw.TextBlock
		}
		return this.textnumc_Internal
	}
	private totalstar_Internal: mw.Canvas
	public get totalstar(): mw.Canvas {
		if(!this.totalstar_Internal&&this.uiWidgetBase) {
			this.totalstar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/totalstar') as mw.Canvas
		}
		return this.totalstar_Internal
	}
	private yellowback3_Internal: mw.Image
	public get yellowback3(): mw.Image {
		if(!this.yellowback3_Internal&&this.uiWidgetBase) {
			this.yellowback3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/totalstar/yellowback3') as mw.Image
		}
		return this.yellowback3_Internal
	}
	private texttotal_Internal: mw.TextBlock
	public get texttotal(): mw.TextBlock {
		if(!this.texttotal_Internal&&this.uiWidgetBase) {
			this.texttotal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/totalstar/texttotal') as mw.TextBlock
		}
		return this.texttotal_Internal
	}
	private textnumtotal_Internal: mw.TextBlock
	public get textnumtotal(): mw.TextBlock {
		if(!this.textnumtotal_Internal&&this.uiWidgetBase) {
			this.textnumtotal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/totalstar/textnumtotal') as mw.TextBlock
		}
		return this.textnumtotal_Internal
	}
	private timecountt_Internal: mw.Canvas
	public get timecountt(): mw.Canvas {
		if(!this.timecountt_Internal&&this.uiWidgetBase) {
			this.timecountt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/timecountt') as mw.Canvas
		}
		return this.timecountt_Internal
	}
	private yellowback4_Internal: mw.Image
	public get yellowback4(): mw.Image {
		if(!this.yellowback4_Internal&&this.uiWidgetBase) {
			this.yellowback4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/timecountt/yellowback4') as mw.Image
		}
		return this.yellowback4_Internal
	}
	private texttime_Internal: mw.TextBlock
	public get texttime(): mw.TextBlock {
		if(!this.texttime_Internal&&this.uiWidgetBase) {
			this.texttime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/timecountt/texttime') as mw.TextBlock
		}
		return this.texttime_Internal
	}
	private textnumt_Internal: mw.TextBlock
	public get textnumt(): mw.TextBlock {
		if(!this.textnumt_Internal&&this.uiWidgetBase) {
			this.textnumt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/timecountt/textnumt') as mw.TextBlock
		}
		return this.textnumt_Internal
	}
	private score_Internal: mw.Canvas
	public get score(): mw.Canvas {
		if(!this.score_Internal&&this.uiWidgetBase) {
			this.score_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/score') as mw.Canvas
		}
		return this.score_Internal
	}
	private bigyellowback_Internal: mw.Image
	public get bigyellowback(): mw.Image {
		if(!this.bigyellowback_Internal&&this.uiWidgetBase) {
			this.bigyellowback_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/score/bigyellowback') as mw.Image
		}
		return this.bigyellowback_Internal
	}
	private texttime_1_Internal: mw.TextBlock
	public get texttime_1(): mw.TextBlock {
		if(!this.texttime_1_Internal&&this.uiWidgetBase) {
			this.texttime_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/score/texttime_1') as mw.TextBlock
		}
		return this.texttime_1_Internal
	}
	private texttime_1_1_Internal: mw.TextBlock
	public get texttime_1_1(): mw.TextBlock {
		if(!this.texttime_1_1_Internal&&this.uiWidgetBase) {
			this.texttime_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/score/texttime_1_1') as mw.TextBlock
		}
		return this.texttime_1_1_Internal
	}
	private mBackButton_Internal: mw.StaleButton
	public get mBackButton(): mw.StaleButton {
		if(!this.mBackButton_Internal&&this.uiWidgetBase) {
			this.mBackButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBackButton') as mw.StaleButton
		}
		return this.mBackButton_Internal
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
        
        this.initLanguage(this.mBackButton);
        
	
        // 静态文本按钮多语言
        
        // 文本多语言
        
        this.initLanguage(this.textcount)
        
	
        this.initLanguage(this.textnum)
        
	
        this.initLanguage(this.textcircle)
        
	
        this.initLanguage(this.textnumc)
        
	
        this.initLanguage(this.texttotal)
        
	
        this.initLanguage(this.textnumtotal)
        
	
        this.initLanguage(this.texttime)
        
	
        this.initLanguage(this.textnumt)
        
	
        this.initLanguage(this.texttime_1)
        
	
        this.initLanguage(this.texttime_1_1)
        
	
        // 静态文本多语言
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/title/TextBlock_1") as mw.TextBlock);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.mBackButton);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.textcount)
        
	
        this.unregisterLanKey(this.textnum)
        
	
        this.unregisterLanKey(this.textcircle)
        
	
        this.unregisterLanKey(this.textnumc)
        
	
        this.unregisterLanKey(this.texttotal)
        
	
        this.unregisterLanKey(this.textnumtotal)
        
	
        this.unregisterLanKey(this.texttime)
        
	
        this.unregisterLanKey(this.textnumt)
        
	
        this.unregisterLanKey(this.texttime_1)
        
	
        this.unregisterLanKey(this.texttime_1_1)
        
	
        // 隐藏文本多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/title/TextBlock_1") as mw.TextBlock);
        
	
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
 