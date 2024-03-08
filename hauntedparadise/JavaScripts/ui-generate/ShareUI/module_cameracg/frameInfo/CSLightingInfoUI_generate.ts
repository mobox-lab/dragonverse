
 

 @UIBind('UI/ShareUI/module_cameracg/frameInfo/CSLightingInfoUI.ui')
 export default class CSLightingInfoUI_Generate extends UIScript {
	 	private in_yaw_Internal: mw.InputBox
	public get in_yaw(): mw.InputBox {
		if(!this.in_yaw_Internal&&this.uiWidgetBase) {
			this.in_yaw_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_comm/in_yaw') as mw.InputBox
		}
		return this.in_yaw_Internal
	}
	private in_pitch_Internal: mw.InputBox
	public get in_pitch(): mw.InputBox {
		if(!this.in_pitch_Internal&&this.uiWidgetBase) {
			this.in_pitch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_comm/in_pitch') as mw.InputBox
		}
		return this.in_pitch_Internal
	}
	private in_directional_Intensity_Internal: mw.InputBox
	public get in_directional_Intensity(): mw.InputBox {
		if(!this.in_directional_Intensity_Internal&&this.uiWidgetBase) {
			this.in_directional_Intensity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_directional/in_directional_Intensity') as mw.InputBox
		}
		return this.in_directional_Intensity_Internal
	}
	private in_directional_color_Internal: mw.InputBox
	public get in_directional_color(): mw.InputBox {
		if(!this.in_directional_color_Internal&&this.uiWidgetBase) {
			this.in_directional_color_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_directional/in_directional_color') as mw.InputBox
		}
		return this.in_directional_color_Internal
	}
	private img_directional_color_Internal: mw.Image
	public get img_directional_color(): mw.Image {
		if(!this.img_directional_color_Internal&&this.uiWidgetBase) {
			this.img_directional_color_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_directional/img_directional_color') as mw.Image
		}
		return this.img_directional_color_Internal
	}
	private in_sky_Intensity_Internal: mw.InputBox
	public get in_sky_Intensity(): mw.InputBox {
		if(!this.in_sky_Intensity_Internal&&this.uiWidgetBase) {
			this.in_sky_Intensity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sky/in_sky_Intensity') as mw.InputBox
		}
		return this.in_sky_Intensity_Internal
	}
	private in_sky_color_Internal: mw.InputBox
	public get in_sky_color(): mw.InputBox {
		if(!this.in_sky_color_Internal&&this.uiWidgetBase) {
			this.in_sky_color_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sky/in_sky_color') as mw.InputBox
		}
		return this.in_sky_color_Internal
	}
	private img_sky_color_Internal: mw.Image
	public get img_sky_color(): mw.Image {
		if(!this.img_sky_color_Internal&&this.uiWidgetBase) {
			this.img_sky_color_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sky/img_sky_color') as mw.Image
		}
		return this.img_sky_color_Internal
	}
	private in_temperature_Internal: mw.InputBox
	public get in_temperature(): mw.InputBox {
		if(!this.in_temperature_Internal&&this.uiWidgetBase) {
			this.in_temperature_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_other/in_temperature') as mw.InputBox
		}
		return this.in_temperature_Internal
	}
	private in_ev100_Internal: mw.InputBox
	public get in_ev100(): mw.InputBox {
		if(!this.in_ev100_Internal&&this.uiWidgetBase) {
			this.in_ev100_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_other/in_ev100') as mw.InputBox
		}
		return this.in_ev100_Internal
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
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_comm/Txt_yaw") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_comm/Txt_pitch") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_directional/Txt_directional") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_directional/Txt_directional_Intensity") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_directional/Txt_directional_color") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_sky/Txt_sky") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_sky/Txt_sky_Intensity") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_sky/Txt_sky_color") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_other/Txt_temperature") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_other/Txt_ev100") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CSLightingInfoUI'] = CSLightingInfoUI_Generate;