
 

 @UIBind('UI/ShareUI/module_cameracg/CSEditorUI.ui')
 export default class CSEditorUI_Generate extends UIScript {
	 	private mCanvasActionBar_Internal: mw.Canvas
	public get mCanvasActionBar(): mw.Canvas {
		if(!this.mCanvasActionBar_Internal&&this.uiWidgetBase) {
			this.mCanvasActionBar_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar') as mw.Canvas
		}
		return this.mCanvasActionBar_Internal
	}
	private mCanvasBtns_Internal: mw.Canvas
	public get mCanvasBtns(): mw.Canvas {
		if(!this.mCanvasBtns_Internal&&this.uiWidgetBase) {
			this.mCanvasBtns_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns') as mw.Canvas
		}
		return this.mCanvasBtns_Internal
	}
	private mBtnPlay_Internal: mw.Button
	public get mBtnPlay(): mw.Button {
		if(!this.mBtnPlay_Internal&&this.uiWidgetBase) {
			this.mBtnPlay_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns/CanvasBtnPlay/mBtnPlay') as mw.Button
		}
		return this.mBtnPlay_Internal
	}
	private mBtnRecord_Internal: mw.Button
	public get mBtnRecord(): mw.Button {
		if(!this.mBtnRecord_Internal&&this.uiWidgetBase) {
			this.mBtnRecord_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns/CanvasBtnRecord/mBtnRecord') as mw.Button
		}
		return this.mBtnRecord_Internal
	}
	private mBtnEvent_Internal: mw.Button
	public get mBtnEvent(): mw.Button {
		if(!this.mBtnEvent_Internal&&this.uiWidgetBase) {
			this.mBtnEvent_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns/CanvasBtnEvent/mBtnEvent') as mw.Button
		}
		return this.mBtnEvent_Internal
	}
	private mBtnClear_Internal: mw.Button
	public get mBtnClear(): mw.Button {
		if(!this.mBtnClear_Internal&&this.uiWidgetBase) {
			this.mBtnClear_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns/CanvasBtnClear/mBtnClear') as mw.Button
		}
		return this.mBtnClear_Internal
	}
	private mBtnSetting_Internal: mw.Button
	public get mBtnSetting(): mw.Button {
		if(!this.mBtnSetting_Internal&&this.uiWidgetBase) {
			this.mBtnSetting_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns/CanvasBtnSetting/mBtnSetting') as mw.Button
		}
		return this.mBtnSetting_Internal
	}
	private mCanvasSetting_Internal: mw.Canvas
	public get mCanvasSetting(): mw.Canvas {
		if(!this.mCanvasSetting_Internal&&this.uiWidgetBase) {
			this.mCanvasSetting_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting') as mw.Canvas
		}
		return this.mCanvasSetting_Internal
	}
	private textSpeed_Internal: mw.TextBlock
	public get textSpeed(): mw.TextBlock {
		if(!this.textSpeed_Internal&&this.uiWidgetBase) {
			this.textSpeed_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasSpeed/textSpeed') as mw.TextBlock
		}
		return this.textSpeed_Internal
	}
	private inSpeed_Internal: mw.InputBox
	public get inSpeed(): mw.InputBox {
		if(!this.inSpeed_Internal&&this.uiWidgetBase) {
			this.inSpeed_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasSpeed/CavIn/inSpeed') as mw.InputBox
		}
		return this.inSpeed_Internal
	}
	private mBtnSpline_Internal: mw.Button
	public get mBtnSpline(): mw.Button {
		if(!this.mBtnSpline_Internal&&this.uiWidgetBase) {
			this.mBtnSpline_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasSpline/mBtnSpline') as mw.Button
		}
		return this.mBtnSpline_Internal
	}
	private textSpline_Internal: mw.TextBlock
	public get textSpline(): mw.TextBlock {
		if(!this.textSpline_Internal&&this.uiWidgetBase) {
			this.textSpline_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasSpline/textSpline') as mw.TextBlock
		}
		return this.textSpline_Internal
	}
	private mBtnCameraSync_Internal: mw.Button
	public get mBtnCameraSync(): mw.Button {
		if(!this.mBtnCameraSync_Internal&&this.uiWidgetBase) {
			this.mBtnCameraSync_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasCameraSync/mBtnCameraSync') as mw.Button
		}
		return this.mBtnCameraSync_Internal
	}
	private textCameraSync_Internal: mw.TextBlock
	public get textCameraSync(): mw.TextBlock {
		if(!this.textCameraSync_Internal&&this.uiWidgetBase) {
			this.textCameraSync_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasCameraSync/textCameraSync') as mw.TextBlock
		}
		return this.textCameraSync_Internal
	}
	private mBtnResetFOV_Internal: mw.Button
	public get mBtnResetFOV(): mw.Button {
		if(!this.mBtnResetFOV_Internal&&this.uiWidgetBase) {
			this.mBtnResetFOV_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasResetFOV/mBtnResetFOV') as mw.Button
		}
		return this.mBtnResetFOV_Internal
	}
	private mBtnLoad_Internal: mw.Button
	public get mBtnLoad(): mw.Button {
		if(!this.mBtnLoad_Internal&&this.uiWidgetBase) {
			this.mBtnLoad_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasBtnLoad/mBtnLoad') as mw.Button
		}
		return this.mBtnLoad_Internal
	}
	private mBtnSave_Internal: mw.Button
	public get mBtnSave(): mw.Button {
		if(!this.mBtnSave_Internal&&this.uiWidgetBase) {
			this.mBtnSave_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasSave/mBtnSave') as mw.Button
		}
		return this.mBtnSave_Internal
	}
	private mCanvasTimeLine_Internal: mw.Canvas
	public get mCanvasTimeLine(): mw.Canvas {
		if(!this.mCanvasTimeLine_Internal&&this.uiWidgetBase) {
			this.mCanvasTimeLine_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine') as mw.Canvas
		}
		return this.mCanvasTimeLine_Internal
	}
	private mCanvasTimePoint_Internal: mw.Canvas
	public get mCanvasTimePoint(): mw.Canvas {
		if(!this.mCanvasTimePoint_Internal&&this.uiWidgetBase) {
			this.mCanvasTimePoint_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/mCanvasTimePoint') as mw.Canvas
		}
		return this.mCanvasTimePoint_Internal
	}
	private mBtnBar_Internal: mw.Button
	public get mBtnBar(): mw.Button {
		if(!this.mBtnBar_Internal&&this.uiWidgetBase) {
			this.mBtnBar_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/mBtnBar') as mw.Button
		}
		return this.mBtnBar_Internal
	}
	private mBtnCurrentTime_Internal: mw.Button
	public get mBtnCurrentTime(): mw.Button {
		if(!this.mBtnCurrentTime_Internal&&this.uiWidgetBase) {
			this.mBtnCurrentTime_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/mBtnCurrentTime') as mw.Button
		}
		return this.mBtnCurrentTime_Internal
	}
	private mCanvasKeyFrame_Internal: mw.Canvas
	public get mCanvasKeyFrame(): mw.Canvas {
		if(!this.mCanvasKeyFrame_Internal&&this.uiWidgetBase) {
			this.mCanvasKeyFrame_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/mCanvasKeyFrame') as mw.Canvas
		}
		return this.mCanvasKeyFrame_Internal
	}
	private mBtnAddTime_Internal: mw.Button
	public get mBtnAddTime(): mw.Button {
		if(!this.mBtnAddTime_Internal&&this.uiWidgetBase) {
			this.mBtnAddTime_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/CanvasBtnAddTime/mBtnAddTime') as mw.Button
		}
		return this.mBtnAddTime_Internal
	}
	private mBtnSubTime_Internal: mw.Button
	public get mBtnSubTime(): mw.Button {
		if(!this.mBtnSubTime_Internal&&this.uiWidgetBase) {
			this.mBtnSubTime_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/CanvasBtnSubTime/mBtnSubTime') as mw.Button
		}
		return this.mBtnSubTime_Internal
	}
	private mCanvasFramesEdit_Internal: mw.Canvas
	public get mCanvasFramesEdit(): mw.Canvas {
		if(!this.mCanvasFramesEdit_Internal&&this.uiWidgetBase) {
			this.mCanvasFramesEdit_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasFramesEdit') as mw.Canvas
		}
		return this.mCanvasFramesEdit_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mBtnPlay.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEditorUI_mBtnPlay");
		})
		this.mBtnPlay.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnPlay.onPressed.add(() => {
			this.mBtnPlay["preScale"] = this.mBtnPlay.renderScale;
			this.mBtnPlay.renderScale = Vector2.one.set(this.mBtnPlay["preScale"]).multiply(1.1);
		})
		this.mBtnPlay.onReleased.add(() => {
			this.mBtnPlay.renderScale = this.mBtnPlay["preScale"];
		})
		
	
		this.mBtnRecord.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEditorUI_mBtnRecord");
		})
		this.mBtnRecord.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnRecord.onPressed.add(() => {
			this.mBtnRecord["preScale"] = this.mBtnRecord.renderScale;
			this.mBtnRecord.renderScale = Vector2.one.set(this.mBtnRecord["preScale"]).multiply(1.1);
		})
		this.mBtnRecord.onReleased.add(() => {
			this.mBtnRecord.renderScale = this.mBtnRecord["preScale"];
		})
		
	
		this.mBtnEvent.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEditorUI_mBtnEvent");
		})
		this.mBtnEvent.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnEvent.onPressed.add(() => {
			this.mBtnEvent["preScale"] = this.mBtnEvent.renderScale;
			this.mBtnEvent.renderScale = Vector2.one.set(this.mBtnEvent["preScale"]).multiply(1.1);
		})
		this.mBtnEvent.onReleased.add(() => {
			this.mBtnEvent.renderScale = this.mBtnEvent["preScale"];
		})
		
	
		this.mBtnClear.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEditorUI_mBtnClear");
		})
		this.mBtnClear.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnClear.onPressed.add(() => {
			this.mBtnClear["preScale"] = this.mBtnClear.renderScale;
			this.mBtnClear.renderScale = Vector2.one.set(this.mBtnClear["preScale"]).multiply(1.1);
		})
		this.mBtnClear.onReleased.add(() => {
			this.mBtnClear.renderScale = this.mBtnClear["preScale"];
		})
		
	
		this.mBtnSetting.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEditorUI_mBtnSetting");
		})
		this.mBtnSetting.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnSetting.onPressed.add(() => {
			this.mBtnSetting["preScale"] = this.mBtnSetting.renderScale;
			this.mBtnSetting.renderScale = Vector2.one.set(this.mBtnSetting["preScale"]).multiply(1.1);
		})
		this.mBtnSetting.onReleased.add(() => {
			this.mBtnSetting.renderScale = this.mBtnSetting["preScale"];
		})
		
	
		this.mBtnSpline.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEditorUI_mBtnSpline");
		})
		this.mBtnSpline.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnSpline.onPressed.add(() => {
			this.mBtnSpline["preScale"] = this.mBtnSpline.renderScale;
			this.mBtnSpline.renderScale = Vector2.one.set(this.mBtnSpline["preScale"]).multiply(1.1);
		})
		this.mBtnSpline.onReleased.add(() => {
			this.mBtnSpline.renderScale = this.mBtnSpline["preScale"];
		})
		
	
		this.mBtnCameraSync.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEditorUI_mBtnCameraSync");
		})
		this.mBtnCameraSync.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnCameraSync.onPressed.add(() => {
			this.mBtnCameraSync["preScale"] = this.mBtnCameraSync.renderScale;
			this.mBtnCameraSync.renderScale = Vector2.one.set(this.mBtnCameraSync["preScale"]).multiply(1.1);
		})
		this.mBtnCameraSync.onReleased.add(() => {
			this.mBtnCameraSync.renderScale = this.mBtnCameraSync["preScale"];
		})
		
	
		this.mBtnResetFOV.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEditorUI_mBtnResetFOV");
		})
		this.mBtnResetFOV.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnResetFOV.onPressed.add(() => {
			this.mBtnResetFOV["preScale"] = this.mBtnResetFOV.renderScale;
			this.mBtnResetFOV.renderScale = Vector2.one.set(this.mBtnResetFOV["preScale"]).multiply(1.1);
		})
		this.mBtnResetFOV.onReleased.add(() => {
			this.mBtnResetFOV.renderScale = this.mBtnResetFOV["preScale"];
		})
		
	
		this.mBtnLoad.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEditorUI_mBtnLoad");
		})
		this.mBtnLoad.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnLoad.onPressed.add(() => {
			this.mBtnLoad["preScale"] = this.mBtnLoad.renderScale;
			this.mBtnLoad.renderScale = Vector2.one.set(this.mBtnLoad["preScale"]).multiply(1.1);
		})
		this.mBtnLoad.onReleased.add(() => {
			this.mBtnLoad.renderScale = this.mBtnLoad["preScale"];
		})
		
	
		this.mBtnSave.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEditorUI_mBtnSave");
		})
		this.mBtnSave.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnSave.onPressed.add(() => {
			this.mBtnSave["preScale"] = this.mBtnSave.renderScale;
			this.mBtnSave.renderScale = Vector2.one.set(this.mBtnSave["preScale"]).multiply(1.1);
		})
		this.mBtnSave.onReleased.add(() => {
			this.mBtnSave.renderScale = this.mBtnSave["preScale"];
		})
		
	
		this.mBtnBar.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEditorUI_mBtnBar");
		})
		this.mBtnBar.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnBar.onPressed.add(() => {
			this.mBtnBar["preScale"] = this.mBtnBar.renderScale;
			this.mBtnBar.renderScale = Vector2.one.set(this.mBtnBar["preScale"]).multiply(1.1);
		})
		this.mBtnBar.onReleased.add(() => {
			this.mBtnBar.renderScale = this.mBtnBar["preScale"];
		})
		
	
		this.mBtnCurrentTime.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEditorUI_mBtnCurrentTime");
		})
		this.mBtnCurrentTime.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnCurrentTime.onPressed.add(() => {
			this.mBtnCurrentTime["preScale"] = this.mBtnCurrentTime.renderScale;
			this.mBtnCurrentTime.renderScale = Vector2.one.set(this.mBtnCurrentTime["preScale"]).multiply(1.1);
		})
		this.mBtnCurrentTime.onReleased.add(() => {
			this.mBtnCurrentTime.renderScale = this.mBtnCurrentTime["preScale"];
		})
		
	
		this.mBtnAddTime.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEditorUI_mBtnAddTime");
		})
		this.mBtnAddTime.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnAddTime.onPressed.add(() => {
			this.mBtnAddTime["preScale"] = this.mBtnAddTime.renderScale;
			this.mBtnAddTime.renderScale = Vector2.one.set(this.mBtnAddTime["preScale"]).multiply(1.1);
		})
		this.mBtnAddTime.onReleased.add(() => {
			this.mBtnAddTime.renderScale = this.mBtnAddTime["preScale"];
		})
		
	
		this.mBtnSubTime.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEditorUI_mBtnSubTime");
		})
		this.mBtnSubTime.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnSubTime.onPressed.add(() => {
			this.mBtnSubTime["preScale"] = this.mBtnSubTime.renderScale;
			this.mBtnSubTime.renderScale = Vector2.one.set(this.mBtnSubTime["preScale"]).multiply(1.1);
		})
		this.mBtnSubTime.onReleased.add(() => {
			this.mBtnSubTime.renderScale = this.mBtnSubTime["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.textSpeed)
		
	
		this.initLanguage(this.textSpline)
		
	
		this.initLanguage(this.textCameraSync)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasBtns/CanvasBtnSetting/Text") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasResetFOV/Text") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasBtnLoad/Text") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasSave/Text") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasTimeLine/CanvasBtnAddTime/Text") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasTimeLine/CanvasBtnSubTime/Text") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CSEditorUI'] = CSEditorUI_Generate;