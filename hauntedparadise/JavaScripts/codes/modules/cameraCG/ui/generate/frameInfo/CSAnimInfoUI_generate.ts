

@UIBind('UI/ShareUI/module_cameracg/frameInfo/CSAnimInfoUI.ui')
export class CSAnimInfoUI_Generate extends UIScript {
	private in_assetId_Internal: mw.InputBox
	public get in_assetId(): mw.InputBox {
		if (!this.in_assetId_Internal && this.uiWidgetBase) {
			this.in_assetId_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_comm/in_assetId') as mw.InputBox
		}
		return this.in_assetId_Internal
	}
	private in_targetId_Internal: mw.InputBox
	public get in_targetId(): mw.InputBox {
		if (!this.in_targetId_Internal && this.uiWidgetBase) {
			this.in_targetId_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_comm/in_targetId') as mw.InputBox
		}
		return this.in_targetId_Internal
	}
	private in_speed_Internal: mw.InputBox
	public get in_speed(): mw.InputBox {
		if (!this.in_speed_Internal && this.uiWidgetBase) {
			this.in_speed_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_other/in_speed') as mw.InputBox
		}
		return this.in_speed_Internal
	}
	private in_loopCount_Internal: mw.InputBox
	public get in_loopCount(): mw.InputBox {
		if (!this.in_loopCount_Internal && this.uiWidgetBase) {
			this.in_loopCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_other/in_loopCount') as mw.InputBox
		}
		return this.in_loopCount_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

}
