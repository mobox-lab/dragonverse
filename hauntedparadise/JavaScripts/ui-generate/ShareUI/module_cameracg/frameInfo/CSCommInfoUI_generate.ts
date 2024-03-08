
 

 @UIBind('UI/ShareUI/module_cameracg/frameInfo/CSCommInfoUI.ui')
 export default class CSCommInfoUI_Generate extends UIScript {
	 	private in_eventName_Internal: mw.InputBox
	public get in_eventName(): mw.InputBox {
		if(!this.in_eventName_Internal&&this.uiWidgetBase) {
			this.in_eventName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_eventName/in_eventName') as mw.InputBox
		}
		return this.in_eventName_Internal
	}
	private in_params_Internal: mw.InputBox
	public get in_params(): mw.InputBox {
		if(!this.in_params_Internal&&this.uiWidgetBase) {
			this.in_params_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_params/in_params') as mw.InputBox
		}
		return this.in_params_Internal
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
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_eventName/Txt_eventName") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_params/Txt_params") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CSCommInfoUI'] = CSCommInfoUI_Generate;