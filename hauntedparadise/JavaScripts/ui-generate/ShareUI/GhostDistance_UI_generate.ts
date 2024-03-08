
 

 @UIBind('UI/ShareUI/GhostDistance_UI.ui')
 export default class GhostDistance_UI_Generate extends UIScript {
	 	private mCav_Internal: mw.Canvas
	public get mCav(): mw.Canvas {
		if(!this.mCav_Internal&&this.uiWidgetBase) {
			this.mCav_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCav') as mw.Canvas
		}
		return this.mCav_Internal
	}
	private text_distance_Internal: mw.TextBlock
	public get text_distance(): mw.TextBlock {
		if(!this.text_distance_Internal&&this.uiWidgetBase) {
			this.text_distance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCav/text_distance') as mw.TextBlock
		}
		return this.text_distance_Internal
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
		
		this.initLanguage(this.text_distance)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_GhostDistance_UI'] = GhostDistance_UI_Generate;