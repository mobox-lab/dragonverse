

@UIBind('UI/ShareUI/module_cameracg/CSEditorUI.ui')
export class CSEditorUI_Generate extends UIScript {
	private mCanvasActionBar_Internal: mw.Canvas
	public get mCanvasActionBar(): mw.Canvas {
		if (!this.mCanvasActionBar_Internal && this.uiWidgetBase) {
			this.mCanvasActionBar_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar') as mw.Canvas
		}
		return this.mCanvasActionBar_Internal
	}
	private mCanvasBtns_Internal: mw.Canvas
	public get mCanvasBtns(): mw.Canvas {
		if (!this.mCanvasBtns_Internal && this.uiWidgetBase) {
			this.mCanvasBtns_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns') as mw.Canvas
		}
		return this.mCanvasBtns_Internal
	}
	private mBtnPlay_Internal: mw.Button
	public get mBtnPlay(): mw.Button {
		if (!this.mBtnPlay_Internal && this.uiWidgetBase) {
			this.mBtnPlay_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns/CanvasBtnPlay/mBtnPlay') as mw.Button
		}
		return this.mBtnPlay_Internal
	}
	private mBtnRecord_Internal: mw.Button
	public get mBtnRecord(): mw.Button {
		if (!this.mBtnRecord_Internal && this.uiWidgetBase) {
			this.mBtnRecord_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns/CanvasBtnRecord/mBtnRecord') as mw.Button
		}
		return this.mBtnRecord_Internal
	}
	private mBtnEvent_Internal: mw.Button
	public get mBtnEvent(): mw.Button {
		if (!this.mBtnEvent_Internal && this.uiWidgetBase) {
			this.mBtnEvent_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns/CanvasBtnEvent/mBtnEvent') as mw.Button
		}
		return this.mBtnEvent_Internal
	}
	private mBtnClear_Internal: mw.Button
	public get mBtnClear(): mw.Button {
		if (!this.mBtnClear_Internal && this.uiWidgetBase) {
			this.mBtnClear_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns/CanvasBtnClear/mBtnClear') as mw.Button
		}
		return this.mBtnClear_Internal
	}
	private mBtnSetting_Internal: mw.Button
	public get mBtnSetting(): mw.Button {
		if (!this.mBtnSetting_Internal && this.uiWidgetBase) {
			this.mBtnSetting_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns/CanvasBtnSetting/mBtnSetting') as mw.Button
		}
		return this.mBtnSetting_Internal
	}
	private mCanvasSetting_Internal: mw.Canvas
	public get mCanvasSetting(): mw.Canvas {
		if (!this.mCanvasSetting_Internal && this.uiWidgetBase) {
			this.mCanvasSetting_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting') as mw.Canvas
		}
		return this.mCanvasSetting_Internal
	}
	private textSpeed_Internal: mw.TextBlock
	public get textSpeed(): mw.TextBlock {
		if (!this.textSpeed_Internal && this.uiWidgetBase) {
			this.textSpeed_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasSpeed/textSpeed') as mw.TextBlock
		}
		return this.textSpeed_Internal
	}
	private inSpeed_Internal: mw.InputBox
	public get inSpeed(): mw.InputBox {
		if (!this.inSpeed_Internal && this.uiWidgetBase) {
			this.inSpeed_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasSpeed/CavIn/inSpeed') as mw.InputBox
		}
		return this.inSpeed_Internal
	}
	private mBtnSpline_Internal: mw.Button
	public get mBtnSpline(): mw.Button {
		if (!this.mBtnSpline_Internal && this.uiWidgetBase) {
			this.mBtnSpline_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasSpline/mBtnSpline') as mw.Button
		}
		return this.mBtnSpline_Internal
	}
	private textSpline_Internal: mw.TextBlock
	public get textSpline(): mw.TextBlock {
		if (!this.textSpline_Internal && this.uiWidgetBase) {
			this.textSpline_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasSpline/textSpline') as mw.TextBlock
		}
		return this.textSpline_Internal
	}
	private mBtnCameraSync_Internal: mw.Button
	public get mBtnCameraSync(): mw.Button {
		if (!this.mBtnCameraSync_Internal && this.uiWidgetBase) {
			this.mBtnCameraSync_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasCameraSync/mBtnCameraSync') as mw.Button
		}
		return this.mBtnCameraSync_Internal
	}
	private textCameraSync_Internal: mw.TextBlock
	public get textCameraSync(): mw.TextBlock {
		if (!this.textCameraSync_Internal && this.uiWidgetBase) {
			this.textCameraSync_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasCameraSync/textCameraSync') as mw.TextBlock
		}
		return this.textCameraSync_Internal
	}
	private mBtnResetFOV_Internal: mw.Button
	public get mBtnResetFOV(): mw.Button {
		if (!this.mBtnResetFOV_Internal && this.uiWidgetBase) {
			this.mBtnResetFOV_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasResetFOV/mBtnResetFOV') as mw.Button
		}
		return this.mBtnResetFOV_Internal
	}
	private mBtnLoad_Internal: mw.Button
	public get mBtnLoad(): mw.Button {
		if (!this.mBtnLoad_Internal && this.uiWidgetBase) {
			this.mBtnLoad_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasBtnLoad/mBtnLoad') as mw.Button
		}
		return this.mBtnLoad_Internal
	}
	private mBtnSave_Internal: mw.Button
	public get mBtnSave(): mw.Button {
		if (!this.mBtnSave_Internal && this.uiWidgetBase) {
			this.mBtnSave_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasSave/mBtnSave') as mw.Button
		}
		return this.mBtnSave_Internal
	}
	private mCanvasTimeLine_Internal: mw.Canvas
	public get mCanvasTimeLine(): mw.Canvas {
		if (!this.mCanvasTimeLine_Internal && this.uiWidgetBase) {
			this.mCanvasTimeLine_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine') as mw.Canvas
		}
		return this.mCanvasTimeLine_Internal
	}
	private mCanvasTimePoint_Internal: mw.Canvas
	public get mCanvasTimePoint(): mw.Canvas {
		if (!this.mCanvasTimePoint_Internal && this.uiWidgetBase) {
			this.mCanvasTimePoint_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/mCanvasTimePoint') as mw.Canvas
		}
		return this.mCanvasTimePoint_Internal
	}
	private mBtnBar_Internal: mw.Button
	public get mBtnBar(): mw.Button {
		if (!this.mBtnBar_Internal && this.uiWidgetBase) {
			this.mBtnBar_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/mBtnBar') as mw.Button
		}
		return this.mBtnBar_Internal
	}
	private mBtnCurrentTime_Internal: mw.Button
	public get mBtnCurrentTime(): mw.Button {
		if (!this.mBtnCurrentTime_Internal && this.uiWidgetBase) {
			this.mBtnCurrentTime_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/mBtnCurrentTime') as mw.Button
		}
		return this.mBtnCurrentTime_Internal
	}
	private mCanvasKeyFrame_Internal: mw.Canvas
	public get mCanvasKeyFrame(): mw.Canvas {
		if (!this.mCanvasKeyFrame_Internal && this.uiWidgetBase) {
			this.mCanvasKeyFrame_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/mCanvasKeyFrame') as mw.Canvas
		}
		return this.mCanvasKeyFrame_Internal
	}
	private mBtnAddTime_Internal: mw.Button
	public get mBtnAddTime(): mw.Button {
		if (!this.mBtnAddTime_Internal && this.uiWidgetBase) {
			this.mBtnAddTime_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/CanvasBtnAddTime/mBtnAddTime') as mw.Button
		}
		return this.mBtnAddTime_Internal
	}
	private mBtnSubTime_Internal: mw.Button
	public get mBtnSubTime(): mw.Button {
		if (!this.mBtnSubTime_Internal && this.uiWidgetBase) {
			this.mBtnSubTime_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/CanvasBtnSubTime/mBtnSubTime') as mw.Button
		}
		return this.mBtnSubTime_Internal
	}
	private mCanvasFramesEdit_Internal: mw.Canvas
	public get mCanvasFramesEdit(): mw.Canvas {
		if (!this.mCanvasFramesEdit_Internal && this.uiWidgetBase) {
			this.mCanvasFramesEdit_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasFramesEdit') as mw.Canvas
		}
		return this.mCanvasFramesEdit_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

}
