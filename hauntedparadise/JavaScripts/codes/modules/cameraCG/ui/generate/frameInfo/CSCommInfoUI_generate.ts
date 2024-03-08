

@UIBind('UI/ShareUI/module_cameracg/frameInfo/CSCommInfoUI.ui')
export class CSCommInfoUI_Generate extends UIScript {
	private in_eventName_Internal: mw.InputBox
	public get in_eventName(): mw.InputBox {
		if (!this.in_eventName_Internal && this.uiWidgetBase) {
			this.in_eventName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_eventName/in_eventName') as mw.InputBox
		}
		return this.in_eventName_Internal
	}
	private in_params_Internal: mw.InputBox
	public get in_params(): mw.InputBox {
		if (!this.in_params_Internal && this.uiWidgetBase) {
			this.in_params_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_params/in_params') as mw.InputBox
		}
		return this.in_params_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

}
