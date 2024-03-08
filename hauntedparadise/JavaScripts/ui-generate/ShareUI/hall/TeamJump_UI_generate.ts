
 

 @UIBind('UI/ShareUI/hall/TeamJump_UI.ui')
 export default class TeamJump_UI_Generate extends UIScript {
	 	private mtxt_num_Internal: mw.TextBlock
	public get mtxt_num(): mw.TextBlock {
		if(!this.mtxt_num_Internal&&this.uiWidgetBase) {
			this.mtxt_num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mtxt_num') as mw.TextBlock
		}
		return this.mtxt_num_Internal
	}
	private mtxt_time_Internal: mw.TextBlock
	public get mtxt_time(): mw.TextBlock {
		if(!this.mtxt_time_Internal&&this.uiWidgetBase) {
			this.mtxt_time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mtxt_time') as mw.TextBlock
		}
		return this.mtxt_time_Internal
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
		
		this.initLanguage(this.mtxt_num)
		
	
		this.initLanguage(this.mtxt_time)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_TeamJump_UI'] = TeamJump_UI_Generate;