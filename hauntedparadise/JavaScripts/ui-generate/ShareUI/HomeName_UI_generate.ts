
 

 @UIBind('UI/ShareUI/HomeName_UI.ui')
 export default class HomeName_UI_Generate extends UIScript {
	 	private text_playerName_Internal: mw.TextBlock
	public get text_playerName(): mw.TextBlock {
		if(!this.text_playerName_Internal&&this.uiWidgetBase) {
			this.text_playerName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_playerName') as mw.TextBlock
		}
		return this.text_playerName_Internal
	}
	private text_home_Internal: mw.TextBlock
	public get text_home(): mw.TextBlock {
		if(!this.text_home_Internal&&this.uiWidgetBase) {
			this.text_home_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_home') as mw.TextBlock
		}
		return this.text_home_Internal
	}
	private text_home_1_Internal: mw.TextBlock
	public get text_home_1(): mw.TextBlock {
		if(!this.text_home_1_Internal&&this.uiWidgetBase) {
			this.text_home_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_home_1') as mw.TextBlock
		}
		return this.text_home_1_Internal
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
		
		this.initLanguage(this.text_playerName)
		
	
		this.initLanguage(this.text_home)
		
	
		this.initLanguage(this.text_home_1)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_HomeName_UI'] = HomeName_UI_Generate;