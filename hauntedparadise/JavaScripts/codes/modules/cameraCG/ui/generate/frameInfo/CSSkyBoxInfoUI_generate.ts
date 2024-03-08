

@UIBind('UI/ShareUI/module_cameracg/frameInfo/CSSkyBoxInfoUI.ui')
export class CSSkyBoxInfoUI_Generate extends UIScript {
	private in_sun_Intensity_Internal: mw.InputBox
	public get in_sun_Intensity(): mw.InputBox {
		if (!this.in_sun_Intensity_Internal && this.uiWidgetBase) {
			this.in_sun_Intensity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sun/in_sun_Intensity') as mw.InputBox
		}
		return this.in_sun_Intensity_Internal
	}
	private in_sun_color_Internal: mw.InputBox
	public get in_sun_color(): mw.InputBox {
		if (!this.in_sun_color_Internal && this.uiWidgetBase) {
			this.in_sun_color_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sun/in_sun_color') as mw.InputBox
		}
		return this.in_sun_color_Internal
	}
	private img_sun_color_Internal: mw.Image
	public get img_sun_color(): mw.Image {
		if (!this.img_sun_color_Internal && this.uiWidgetBase) {
			this.img_sun_color_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sun/img_sun_color') as mw.Image
		}
		return this.img_sun_color_Internal
	}
	private in_moon_Intensity_Internal: mw.InputBox
	public get in_moon_Intensity(): mw.InputBox {
		if (!this.in_moon_Intensity_Internal && this.uiWidgetBase) {
			this.in_moon_Intensity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_moon/in_moon_Intensity') as mw.InputBox
		}
		return this.in_moon_Intensity_Internal
	}
	private in_moon_color_Internal: mw.InputBox
	public get in_moon_color(): mw.InputBox {
		if (!this.in_moon_color_Internal && this.uiWidgetBase) {
			this.in_moon_color_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_moon/in_moon_color') as mw.InputBox
		}
		return this.in_moon_color_Internal
	}
	private img_moon_color_Internal: mw.Image
	public get img_moon_color(): mw.Image {
		if (!this.img_moon_color_Internal && this.uiWidgetBase) {
			this.img_moon_color_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_moon/img_moon_color') as mw.Image
		}
		return this.img_moon_color_Internal
	}
	private in_skybox_Intensity_Internal: mw.InputBox
	public get in_skybox_Intensity(): mw.InputBox {
		if (!this.in_skybox_Intensity_Internal && this.uiWidgetBase) {
			this.in_skybox_Intensity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sky_1/in_skybox_Intensity') as mw.InputBox
		}
		return this.in_skybox_Intensity_Internal
	}
	private in_skybox_color_Internal: mw.InputBox
	public get in_skybox_color(): mw.InputBox {
		if (!this.in_skybox_color_Internal && this.uiWidgetBase) {
			this.in_skybox_color_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sky_1/in_skybox_color') as mw.InputBox
		}
		return this.in_skybox_color_Internal
	}
	private img_skybox_color_Internal: mw.Image
	public get img_skybox_color(): mw.Image {
		if (!this.img_skybox_color_Internal && this.uiWidgetBase) {
			this.img_skybox_color_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sky_1/img_skybox_color') as mw.Image
		}
		return this.img_skybox_color_Internal
	}
	private in_skybox_color_top_Internal: mw.InputBox
	public get in_skybox_color_top(): mw.InputBox {
		if (!this.in_skybox_color_top_Internal && this.uiWidgetBase) {
			this.in_skybox_color_top_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sky_2/in_skybox_color_top') as mw.InputBox
		}
		return this.in_skybox_color_top_Internal
	}
	private img_skybox_color_top_Internal: mw.Image
	public get img_skybox_color_top(): mw.Image {
		if (!this.img_skybox_color_top_Internal && this.uiWidgetBase) {
			this.img_skybox_color_top_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sky_2/img_skybox_color_top') as mw.Image
		}
		return this.img_skybox_color_top_Internal
	}
	private in_skybox_color_middle_Internal: mw.InputBox
	public get in_skybox_color_middle(): mw.InputBox {
		if (!this.in_skybox_color_middle_Internal && this.uiWidgetBase) {
			this.in_skybox_color_middle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sky_2/in_skybox_color_middle') as mw.InputBox
		}
		return this.in_skybox_color_middle_Internal
	}
	private img_skybox_color_middle_Internal: mw.Image
	public get img_skybox_color_middle(): mw.Image {
		if (!this.img_skybox_color_middle_Internal && this.uiWidgetBase) {
			this.img_skybox_color_middle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sky_2/img_skybox_color_middle') as mw.Image
		}
		return this.img_skybox_color_middle_Internal
	}
	private in_skybox_color_bottom_Internal: mw.InputBox
	public get in_skybox_color_bottom(): mw.InputBox {
		if (!this.in_skybox_color_bottom_Internal && this.uiWidgetBase) {
			this.in_skybox_color_bottom_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sky_3/in_skybox_color_bottom') as mw.InputBox
		}
		return this.in_skybox_color_bottom_Internal
	}
	private img_skybox_color_bottom_Internal: mw.Image
	public get img_skybox_color_bottom(): mw.Image {
		if (!this.img_skybox_color_bottom_Internal && this.uiWidgetBase) {
			this.img_skybox_color_bottom_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_sky_3/img_skybox_color_bottom') as mw.Image
		}
		return this.img_skybox_color_bottom_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

}
