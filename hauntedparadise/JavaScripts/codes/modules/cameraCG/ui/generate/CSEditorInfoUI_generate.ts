

@UIBind('UI/ShareUI/module_cameracg/CSEditorInfoUI.ui')
export class CSEditorInfoUI_Generate extends UIScript {
	private mInputLocX_Internal: mw.InputBox
	public get mInputLocX(): mw.InputBox {
		if (!this.mInputLocX_Internal && this.uiWidgetBase) {
			this.mInputLocX_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_editLoc/mInputLocX') as mw.InputBox
		}
		return this.mInputLocX_Internal
	}
	private mInputLocY_Internal: mw.InputBox
	public get mInputLocY(): mw.InputBox {
		if (!this.mInputLocY_Internal && this.uiWidgetBase) {
			this.mInputLocY_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_editLoc/mInputLocY') as mw.InputBox
		}
		return this.mInputLocY_Internal
	}
	private mInputLocZ_Internal: mw.InputBox
	public get mInputLocZ(): mw.InputBox {
		if (!this.mInputLocZ_Internal && this.uiWidgetBase) {
			this.mInputLocZ_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_editLoc/mInputLocZ') as mw.InputBox
		}
		return this.mInputLocZ_Internal
	}
	private mInputRotP_Internal: mw.InputBox
	public get mInputRotP(): mw.InputBox {
		if (!this.mInputRotP_Internal && this.uiWidgetBase) {
			this.mInputRotP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_editRot/mInputRotP') as mw.InputBox
		}
		return this.mInputRotP_Internal
	}
	private mInputRotY_Internal: mw.InputBox
	public get mInputRotY(): mw.InputBox {
		if (!this.mInputRotY_Internal && this.uiWidgetBase) {
			this.mInputRotY_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_editRot/mInputRotY') as mw.InputBox
		}
		return this.mInputRotY_Internal
	}
	private mInputRotR_Internal: mw.InputBox
	public get mInputRotR(): mw.InputBox {
		if (!this.mInputRotR_Internal && this.uiWidgetBase) {
			this.mInputRotR_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_editRot/mInputRotR') as mw.InputBox
		}
		return this.mInputRotR_Internal
	}
	private mInputFOV_Internal: mw.InputBox
	public get mInputFOV(): mw.InputBox {
		if (!this.mInputFOV_Internal && this.uiWidgetBase) {
			this.mInputFOV_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_editOther/mInputFOV') as mw.InputBox
		}
		return this.mInputFOV_Internal
	}
	private mBtnDelKeyFrame_Internal: mw.Button
	public get mBtnDelKeyFrame(): mw.Button {
		if (!this.mBtnDelKeyFrame_Internal && this.uiWidgetBase) {
			this.mBtnDelKeyFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_editOther/CanvasBtnDelKeyFrame/mBtnDelKeyFrame') as mw.Button
		}
		return this.mBtnDelKeyFrame_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

}
