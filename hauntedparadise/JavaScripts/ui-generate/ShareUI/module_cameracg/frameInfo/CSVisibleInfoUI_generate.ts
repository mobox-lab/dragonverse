
 

 @UIBind('UI/ShareUI/module_cameracg/frameInfo/CSVisibleInfoUI.ui')
 export default class CSVisibleInfoUI_Generate extends UIScript {
	 	private in_targetId_Internal: mw.InputBox
	public get in_targetId(): mw.InputBox {
		if(!this.in_targetId_Internal&&this.uiWidgetBase) {
			this.in_targetId_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_comm/in_targetId') as mw.InputBox
		}
		return this.in_targetId_Internal
	}
	private in_visible_Internal: mw.InputBox
	public get in_visible(): mw.InputBox {
		if(!this.in_visible_Internal&&this.uiWidgetBase) {
			this.in_visible_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_comm/in_visible') as mw.InputBox
		}
		return this.in_visible_Internal
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
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_comm/Txt_targetId") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_comm/Txt_visible") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CSVisibleInfoUI'] = CSVisibleInfoUI_Generate;