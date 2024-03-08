
 

 @UIBind('UI/ShareUI/module_cameracg/frameInfo/CSAnimInfoUI.ui')
 export default class CSAnimInfoUI_Generate extends UIScript {
	 	private in_assetId_Internal: mw.InputBox
	public get in_assetId(): mw.InputBox {
		if(!this.in_assetId_Internal&&this.uiWidgetBase) {
			this.in_assetId_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_comm/in_assetId') as mw.InputBox
		}
		return this.in_assetId_Internal
	}
	private in_targetId_Internal: mw.InputBox
	public get in_targetId(): mw.InputBox {
		if(!this.in_targetId_Internal&&this.uiWidgetBase) {
			this.in_targetId_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_comm/in_targetId') as mw.InputBox
		}
		return this.in_targetId_Internal
	}
	private in_speed_Internal: mw.InputBox
	public get in_speed(): mw.InputBox {
		if(!this.in_speed_Internal&&this.uiWidgetBase) {
			this.in_speed_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_other/in_speed') as mw.InputBox
		}
		return this.in_speed_Internal
	}
	private in_loopCount_Internal: mw.InputBox
	public get in_loopCount(): mw.InputBox {
		if(!this.in_loopCount_Internal&&this.uiWidgetBase) {
			this.in_loopCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_other/in_loopCount') as mw.InputBox
		}
		return this.in_loopCount_Internal
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
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_comm/Txt_assetId") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_comm/Txt_targetId") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_other/Txt_speed") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_other/Txt_loopCount") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CSAnimInfoUI'] = CSAnimInfoUI_Generate;