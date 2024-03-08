

@UIBind('UI/ShareUI/module_cameracg/frameInfo/CSNavInfoUI.ui')
export class CSNavInfoUI_Generate extends UIScript {
	private in_targetId_Internal: mw.InputBox
	public get in_targetId(): mw.InputBox {
		if (!this.in_targetId_Internal && this.uiWidgetBase) {
			this.in_targetId_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_comm/in_targetId') as mw.InputBox
		}
		return this.in_targetId_Internal
	}
	private in_radius_Internal: mw.InputBox
	public get in_radius(): mw.InputBox {
		if (!this.in_radius_Internal && this.uiWidgetBase) {
			this.in_radius_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_comm/in_radius') as mw.InputBox
		}
		return this.in_radius_Internal
	}
	private in_posX_Internal: mw.InputBox
	public get in_posX(): mw.InputBox {
		if (!this.in_posX_Internal && this.uiWidgetBase) {
			this.in_posX_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_pos/in_posX') as mw.InputBox
		}
		return this.in_posX_Internal
	}
	private in_posY_Internal: mw.InputBox
	public get in_posY(): mw.InputBox {
		if (!this.in_posY_Internal && this.uiWidgetBase) {
			this.in_posY_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_pos/in_posY') as mw.InputBox
		}
		return this.in_posY_Internal
	}
	private in_posZ_Internal: mw.InputBox
	public get in_posZ(): mw.InputBox {
		if (!this.in_posZ_Internal && this.uiWidgetBase) {
			this.in_posZ_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_pos/in_posZ') as mw.InputBox
		}
		return this.in_posZ_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

}
