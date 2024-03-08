
 

 @UIBind('UI/ShareUI/module_globalRank/GlobalRankRow.ui')
 export default class GlobalRankRow_Generate extends UIScript {
	 	private canvas_bg_Internal: mw.Canvas
	public get canvas_bg(): mw.Canvas {
		if(!this.canvas_bg_Internal&&this.uiWidgetBase) {
			this.canvas_bg_Internal = this.uiWidgetBase.findChildByPath('canvas_bg') as mw.Canvas
		}
		return this.canvas_bg_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('canvas_bg/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private bg2_Internal: mw.Image
	public get bg2(): mw.Image {
		if(!this.bg2_Internal&&this.uiWidgetBase) {
			this.bg2_Internal = this.uiWidgetBase.findChildByPath('canvas_bg/bg2') as mw.Image
		}
		return this.bg2_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('canvas_bg/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private canvas_medal_Internal: mw.Canvas
	public get canvas_medal(): mw.Canvas {
		if(!this.canvas_medal_Internal&&this.uiWidgetBase) {
			this.canvas_medal_Internal = this.uiWidgetBase.findChildByPath('canvas_bg/mContent/canvas_medal') as mw.Canvas
		}
		return this.canvas_medal_Internal
	}
	private img_medal_Internal: mw.Image
	public get img_medal(): mw.Image {
		if(!this.img_medal_Internal&&this.uiWidgetBase) {
			this.img_medal_Internal = this.uiWidgetBase.findChildByPath('canvas_bg/mContent/canvas_medal/img_medal') as mw.Image
		}
		return this.img_medal_Internal
	}
	private rankIDText_Internal: mw.TextBlock
	public get rankIDText(): mw.TextBlock {
		if(!this.rankIDText_Internal&&this.uiWidgetBase) {
			this.rankIDText_Internal = this.uiWidgetBase.findChildByPath('canvas_bg/mContent/rankIDText') as mw.TextBlock
		}
		return this.rankIDText_Internal
	}
	private nameTxt_Internal: mw.TextBlock
	public get nameTxt(): mw.TextBlock {
		if(!this.nameTxt_Internal&&this.uiWidgetBase) {
			this.nameTxt_Internal = this.uiWidgetBase.findChildByPath('canvas_bg/mContent/nameTxt') as mw.TextBlock
		}
		return this.nameTxt_Internal
	}
	private scoreTxt_Internal: mw.TextBlock
	public get scoreTxt(): mw.TextBlock {
		if(!this.scoreTxt_Internal&&this.uiWidgetBase) {
			this.scoreTxt_Internal = this.uiWidgetBase.findChildByPath('canvas_bg/mContent/scoreTxt') as mw.TextBlock
		}
		return this.scoreTxt_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.rankIDText)
		
	
		this.initLanguage(this.nameTxt)
		
	
		this.initLanguage(this.scoreTxt)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_GlobalRankRow'] = GlobalRankRow_Generate;