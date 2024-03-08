

@UIBind('UI/ShareUI/module_cameracg/frameInfo/CSLightingInfoUI.ui')
export class CSLightingInfoUI_Generate extends UIScript {
	private in_yaw_Internal: mw.InputBox
	public get in_yaw(): mw.InputBox {
		if (!this.in_yaw_Internal && this.uiWidgetBase) {
			this.in_yaw_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_comm/in_yaw') as mw.InputBox
		}
		return this.in_yaw_Internal
	}
	private in_pitch_Internal: mw.InputBox
	public get in_pitch(): mw.InputBox {
		if (!this.in_pitch_Internal && this.uiWidgetBase) {
			this.in_pitch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_comm/in_pitch') as mw.InputBox
		}
		return this.in_pitch_Internal
	}
	private in_directional_Intensity_Internal: mw.InputBox
	public get in_directional_Intensity(): mw.InputBox {
		if (!this.in_directional_Intensity_Internal && this.uiWidgetBase) {
			this.in_directional_Intensity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_directional/in_directional_Intensity') as mw.InputBox
		}
		return this.in_directional_Intensity_Internal
	}
	private in_directional_color_Internal: mw.InputBox
	public get in_directional_color(): mw.InputBox {
		if (!this.in_directional_color_Internal && this.uiWidgetBase) {
			this.in_directional_color_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_directional/in_directional_color') as mw.InputBox
		}
		return this.in_directional_color_Internal
	}
	private img_directional_color_Internal: mw.Image
	public get img_directional_color(): mw.Image {
		if (!this.img_directional_color_Internal && this.uiWidgetBase) {
			this.img_directional_color_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_directional/img_directional_color') as mw.Image
		}
		return this.img_directional_color_Internal
	}
	private in_sky_Intensity_Internal: mw.InputBox
	public get in_sky_Intensity(): mw.InputBox {
		if (!this.in_sky_Intensity_Internal && this.uiWidgetBase) {
			this.in_sky_Intensity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sky/in_sky_Intensity') as mw.InputBox
		}
		return this.in_sky_Intensity_Internal
	}
	private in_sky_color_Internal: mw.InputBox
	public get in_sky_color(): mw.InputBox {
		if (!this.in_sky_color_Internal && this.uiWidgetBase) {
			this.in_sky_color_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sky/in_sky_color') as mw.InputBox
		}
		return this.in_sky_color_Internal
	}
	private img_sky_color_Internal: mw.Image
	public get img_sky_color(): mw.Image {
		if (!this.img_sky_color_Internal && this.uiWidgetBase) {
			this.img_sky_color_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sky/img_sky_color') as mw.Image
		}
		return this.img_sky_color_Internal
	}
	private in_temperature_Internal: mw.InputBox
	public get in_temperature(): mw.InputBox {
		if (!this.in_temperature_Internal && this.uiWidgetBase) {
			this.in_temperature_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_other/in_temperature') as mw.InputBox
		}
		return this.in_temperature_Internal
	}
	private in_ev100_Internal: mw.InputBox
	public get in_ev100(): mw.InputBox {
		if (!this.in_ev100_Internal && this.uiWidgetBase) {
			this.in_ev100_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_other/in_ev100') as mw.InputBox
		}
		return this.in_ev100_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

}
