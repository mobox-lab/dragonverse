

@UIBind('UI/ShareUI/module_cameracg/CSDialog.ui')
export class CSDialog_Generate extends UIScript {
	private mBtnClose_Internal: mw.Button
	public get mBtnClose(): mw.Button {
		if (!this.mBtnClose_Internal && this.uiWidgetBase) {
			this.mBtnClose_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtnClose') as mw.Button
		}
		return this.mBtnClose_Internal
	}
	private mBtnYes_Internal: mw.Button
	public get mBtnYes(): mw.Button {
		if (!this.mBtnYes_Internal && this.uiWidgetBase) {
			this.mBtnYes_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasDialog/CanvasBtnYes/mBtnYes') as mw.Button
		}
		return this.mBtnYes_Internal
	}
	private mBtnNo_Internal: mw.Button
	public get mBtnNo(): mw.Button {
		if (!this.mBtnNo_Internal && this.uiWidgetBase) {
			this.mBtnNo_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasDialog/CanvasBtnNo/mBtnNo') as mw.Button
		}
		return this.mBtnNo_Internal
	}
	private mTextContent_Internal: mw.TextBlock
	public get mTextContent(): mw.TextBlock {
		if (!this.mTextContent_Internal && this.uiWidgetBase) {
			this.mTextContent_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasDialog/mTextContent') as mw.TextBlock
		}
		return this.mTextContent_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

}
