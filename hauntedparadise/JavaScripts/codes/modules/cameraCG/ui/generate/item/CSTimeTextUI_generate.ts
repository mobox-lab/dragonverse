

@UIBind('UI/ShareUI/module_cameracg/item/CSTimeTextUI.ui')
export class CSTimeTextUI_Generate extends UIScript {
	private mTextTime_Internal: mw.TextBlock
	public get mTextTime(): mw.TextBlock {
		if (!this.mTextTime_Internal && this.uiWidgetBase) {
			this.mTextTime_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTextTime') as mw.TextBlock
		}
		return this.mTextTime_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

}
