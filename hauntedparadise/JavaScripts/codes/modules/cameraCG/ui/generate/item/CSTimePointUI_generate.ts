

@UIBind('UI/ShareUI/module_cameracg/item/CSTimePointUI.ui')
export class CSTimePointUI_Generate extends UIScript {
	private mImgLine_Internal: mw.Image
	public get mImgLine(): mw.Image {
		if (!this.mImgLine_Internal && this.uiWidgetBase) {
			this.mImgLine_Internal = this.uiWidgetBase.findChildByPath('Canvas/mImgLine') as mw.Image
		}
		return this.mImgLine_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

}
