
 

 @UIBind('UI/ShareUI/module_cameracg/frameInfo/CSEffectInfoUI.ui')
 export default class CSEffectInfoUI_Generate extends UIScript {
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
	private in_rotX_Internal: mw.InputBox
	public get in_rotX(): mw.InputBox {
		if(!this.in_rotX_Internal&&this.uiWidgetBase) {
			this.in_rotX_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_rot/in_rotX') as mw.InputBox
		}
		return this.in_rotX_Internal
	}
	private in_rotY_Internal: mw.InputBox
	public get in_rotY(): mw.InputBox {
		if(!this.in_rotY_Internal&&this.uiWidgetBase) {
			this.in_rotY_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_rot/in_rotY') as mw.InputBox
		}
		return this.in_rotY_Internal
	}
	private in_rotZ_Internal: mw.InputBox
	public get in_rotZ(): mw.InputBox {
		if(!this.in_rotZ_Internal&&this.uiWidgetBase) {
			this.in_rotZ_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_rot/in_rotZ') as mw.InputBox
		}
		return this.in_rotZ_Internal
	}
	private in_scaleX_Internal: mw.InputBox
	public get in_scaleX(): mw.InputBox {
		if(!this.in_scaleX_Internal&&this.uiWidgetBase) {
			this.in_scaleX_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_scale/in_scaleX') as mw.InputBox
		}
		return this.in_scaleX_Internal
	}
	private in_scaleY_Internal: mw.InputBox
	public get in_scaleY(): mw.InputBox {
		if(!this.in_scaleY_Internal&&this.uiWidgetBase) {
			this.in_scaleY_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_scale/in_scaleY') as mw.InputBox
		}
		return this.in_scaleY_Internal
	}
	private in_scaleZ_Internal: mw.InputBox
	public get in_scaleZ(): mw.InputBox {
		if(!this.in_scaleZ_Internal&&this.uiWidgetBase) {
			this.in_scaleZ_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_scale/in_scaleZ') as mw.InputBox
		}
		return this.in_scaleZ_Internal
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
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_pos/Txt_pos") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_pos/Txt_x") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_pos/Txt_y") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_pos/Txt_z") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_rot/Txt_rot") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_rot/Txt_X") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_rot/Txt_y") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_rot/Txt_Z") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_scale/Txt_scale") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_scale/Txt_X") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_scale/Txt_y") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_scale/Txt_Z") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_other/Txt_loopCount") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CSEffectInfoUI'] = CSEffectInfoUI_Generate;