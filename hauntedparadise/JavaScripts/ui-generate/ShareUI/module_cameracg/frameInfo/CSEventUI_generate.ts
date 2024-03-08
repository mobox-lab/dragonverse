
 

 @UIBind('UI/ShareUI/module_cameracg/frameInfo/CSEventUI.ui')
 export default class CSEventUI_Generate extends UIScript {
	 	private mBtnDelKeyFrame_Internal: mw.Button
	public get mBtnDelKeyFrame(): mw.Button {
		if(!this.mBtnDelKeyFrame_Internal&&this.uiWidgetBase) {
			this.mBtnDelKeyFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CanvasBtnDelKeyFrame/mBtnDelKeyFrame') as mw.Button
		}
		return this.mBtnDelKeyFrame_Internal
	}
	private cav_content_Internal: mw.Canvas
	public get cav_content(): mw.Canvas {
		if(!this.cav_content_Internal&&this.uiWidgetBase) {
			this.cav_content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cav_content') as mw.Canvas
		}
		return this.cav_content_Internal
	}
	private cav_eventType_Internal: mw.Canvas
	public get cav_eventType(): mw.Canvas {
		if(!this.cav_eventType_Internal&&this.uiWidgetBase) {
			this.cav_eventType_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cav_eventType') as mw.Canvas
		}
		return this.cav_eventType_Internal
	}
	private btn_eventType_Internal: mw.Button
	public get btn_eventType(): mw.Button {
		if(!this.btn_eventType_Internal&&this.uiWidgetBase) {
			this.btn_eventType_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cav_eventType/btn_eventType') as mw.Button
		}
		return this.btn_eventType_Internal
	}
	private txt_eventName_Internal: mw.TextBlock
	public get txt_eventName(): mw.TextBlock {
		if(!this.txt_eventName_Internal&&this.uiWidgetBase) {
			this.txt_eventName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cav_eventType/txt_eventName') as mw.TextBlock
		}
		return this.txt_eventName_Internal
	}
	private cav_eventsParents_Internal: mw.Canvas
	public get cav_eventsParents(): mw.Canvas {
		if(!this.cav_eventsParents_Internal&&this.uiWidgetBase) {
			this.cav_eventsParents_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cav_eventType/cav_eventsParents') as mw.Canvas
		}
		return this.cav_eventsParents_Internal
	}
	private cav_events_Internal: mw.Canvas
	public get cav_events(): mw.Canvas {
		if(!this.cav_events_Internal&&this.uiWidgetBase) {
			this.cav_events_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cav_eventType/cav_eventsParents/cav_events') as mw.Canvas
		}
		return this.cav_events_Internal
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
		
		this.mBtnDelKeyFrame.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEventUI_mBtnDelKeyFrame");
		})
		this.mBtnDelKeyFrame.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnDelKeyFrame.onPressed.add(() => {
			this.mBtnDelKeyFrame["preScale"] = this.mBtnDelKeyFrame.renderScale;
			this.mBtnDelKeyFrame.renderScale = Vector2.one.set(this.mBtnDelKeyFrame["preScale"]).multiply(1.1);
		})
		this.mBtnDelKeyFrame.onReleased.add(() => {
			this.mBtnDelKeyFrame.renderScale = this.mBtnDelKeyFrame["preScale"];
		})
		
	
		this.btn_eventType.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEventUI_btn_eventType");
		})
		this.btn_eventType.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_eventType.onPressed.add(() => {
			this.btn_eventType["preScale"] = this.btn_eventType.renderScale;
			this.btn_eventType.renderScale = Vector2.one.set(this.btn_eventType["preScale"]).multiply(1.1);
		})
		this.btn_eventType.onReleased.add(() => {
			this.btn_eventType.renderScale = this.btn_eventType["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.txt_eventName)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/CanvasBtnDelKeyFrame/Text") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CSEventUI'] = CSEventUI_Generate;