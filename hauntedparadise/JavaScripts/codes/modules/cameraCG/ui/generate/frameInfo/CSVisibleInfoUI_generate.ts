

@UIBind('UI/ShareUI/module_cameracg/frameInfo/CSVisibleInfoUI.ui')
export class CSVisibleInfoUI_Generate extends UIScript {
	private in_targetId_Internal: mw.InputBox
	public get in_targetId(): mw.InputBox {
		if (!this.in_targetId_Internal && this.uiWidgetBase) {
			this.in_targetId_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_comm/in_targetId') as mw.InputBox
		}
		return this.in_targetId_Internal
	}
	private in_visible_Internal: mw.InputBox
	public get in_visible(): mw.InputBox {
		if (!this.in_visible_Internal && this.uiWidgetBase) {
			this.in_visible_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_comm/in_visible') as mw.InputBox
		}
		return this.in_visible_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

}
