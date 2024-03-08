

@UIBind('UI/ShareUI/module_cameracg/frameInfo/CSEventItemUI.ui')
export class CSEventItemUI_Generate extends UIScript {
	private btn_select_Internal: mw.Button
	public get btn_select(): mw.Button {
		if (!this.btn_select_Internal && this.uiWidgetBase) {
			this.btn_select_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_select') as mw.Button
		}
		return this.btn_select_Internal
	}
	private txt_name_Internal: mw.TextBlock
	public get txt_name(): mw.TextBlock {
		if (!this.txt_name_Internal && this.uiWidgetBase) {
			this.txt_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_name') as mw.TextBlock
		}
		return this.txt_name_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

}
