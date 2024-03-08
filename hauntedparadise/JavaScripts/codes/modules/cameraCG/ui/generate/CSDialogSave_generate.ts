

@UIBind('UI/ShareUI/module_cameracg/CSDialogSave.ui')
export class CSDialogSave_Generate extends UIScript {
	private mBtnClose_Internal: mw.Button
	public get mBtnClose(): mw.Button {
		if (!this.mBtnClose_Internal && this.uiWidgetBase) {
			this.mBtnClose_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtnClose') as mw.Button
		}
		return this.mBtnClose_Internal
	}
	private mInput_Internal: mw.InputBox
	public get mInput(): mw.InputBox {
		if (!this.mInput_Internal && this.uiWidgetBase) {
			this.mInput_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasDialog/Cav_in/mInput') as mw.InputBox
		}
		return this.mInput_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

}
