
 

 @UIBind('UI/ShareUI/module_cameracg/frameInfo/CSNavInfoUI.ui')
 export default class CSNavInfoUI_Generate extends UIScript {
	 	private in_targetId_Internal: mw.InputBox
	public get in_targetId(): mw.InputBox {
		if(!this.in_targetId_Internal&&this.uiWidgetBase) {
			this.in_targetId_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_comm/in_targetId') as mw.InputBox
		}
		return this.in_targetId_Internal
	}
	private in_radius_Internal: mw.InputBox
	public get in_radius(): mw.InputBox {
		if(!this.in_radius_Internal&&this.uiWidgetBase) {
			this.in_radius_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_comm/in_radius') as mw.InputBox
		}
		return this.in_radius_Internal
	}
	private in_posX_Internal: mw.InputBox
	public get in_posX(): mw.InputBox {
		if(!this.in_posX_Internal&&this.uiWidgetBase) {
			this.in_posX_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_pos/in_posX') as mw.InputBox
		}
		return this.in_posX_Internal
	}
	private in_posY_Internal: mw.InputBox
	public get in_posY(): mw.InputBox {
		if(!this.in_posY_Internal&&this.uiWidgetBase) {
			this.in_posY_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_pos/in_posY') as mw.InputBox
		}
		return this.in_posY_Internal
	}
	private in_posZ_Internal: mw.InputBox
	public get in_posZ(): mw.InputBox {
		if(!this.in_posZ_Internal&&this.uiWidgetBase) {
			this.in_posZ_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_pos/in_posZ') as mw.InputBox
		}
		return this.in_posZ_Internal
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
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_comm/Txt_radius") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_pos/Txt_pos") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_pos/Txt_x") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_pos/Txt_y") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_pos/Txt_z") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CSNavInfoUI'] = CSNavInfoUI_Generate;