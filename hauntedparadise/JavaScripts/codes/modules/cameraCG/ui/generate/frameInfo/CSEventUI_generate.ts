

@UIBind('UI/ShareUI/module_cameracg/frameInfo/CSEventUI.ui')
export class CSEventUI_Generate extends UIScript {
	private mBtnDelKeyFrame_Internal: mw.Button
	public get mBtnDelKeyFrame(): mw.Button {
		if (!this.mBtnDelKeyFrame_Internal && this.uiWidgetBase) {
			this.mBtnDelKeyFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CanvasBtnDelKeyFrame/mBtnDelKeyFrame') as mw.Button
		}
		return this.mBtnDelKeyFrame_Internal
	}
	private cav_content_Internal: mw.Canvas
	public get cav_content(): mw.Canvas {
		if (!this.cav_content_Internal && this.uiWidgetBase) {
			this.cav_content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cav_content') as mw.Canvas
		}
		return this.cav_content_Internal
	}
	private cav_eventType_Internal: mw.Canvas
	public get cav_eventType(): mw.Canvas {
		if (!this.cav_eventType_Internal && this.uiWidgetBase) {
			this.cav_eventType_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cav_eventType') as mw.Canvas
		}
		return this.cav_eventType_Internal
	}
	private btn_eventType_Internal: mw.Button
	public get btn_eventType(): mw.Button {
		if (!this.btn_eventType_Internal && this.uiWidgetBase) {
			this.btn_eventType_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cav_eventType/btn_eventType') as mw.Button
		}
		return this.btn_eventType_Internal
	}
	private txt_eventName_Internal: mw.TextBlock
	public get txt_eventName(): mw.TextBlock {
		if (!this.txt_eventName_Internal && this.uiWidgetBase) {
			this.txt_eventName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cav_eventType/txt_eventName') as mw.TextBlock
		}
		return this.txt_eventName_Internal
	}
	private cav_eventsParents_Internal: mw.Canvas
	public get cav_eventsParents(): mw.Canvas {
		if (!this.cav_eventsParents_Internal && this.uiWidgetBase) {
			this.cav_eventsParents_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cav_eventType/cav_eventsParents') as mw.Canvas
		}
		return this.cav_eventsParents_Internal
	}
	private cav_events_Internal: mw.Canvas
	public get cav_events(): mw.Canvas {
		if (!this.cav_events_Internal && this.uiWidgetBase) {
			this.cav_events_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cav_eventType/cav_eventsParents/cav_events') as mw.Canvas
		}
		return this.cav_events_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

}
