
 

 @UIBind('UI/ShareUI/Build_UI.ui')
 export default class Build_UI_Generate extends UIScript {
	 	private canvas_place_Internal: mw.Canvas
	public get canvas_place(): mw.Canvas {
		if(!this.canvas_place_Internal&&this.uiWidgetBase) {
			this.canvas_place_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_place') as mw.Canvas
		}
		return this.canvas_place_Internal
	}
	private btn_place_Internal: mw.Button
	public get btn_place(): mw.Button {
		if(!this.btn_place_Internal&&this.uiWidgetBase) {
			this.btn_place_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_place/btn_place') as mw.Button
		}
		return this.btn_place_Internal
	}
	private canvas_direction_Internal: mw.Canvas
	public get canvas_direction(): mw.Canvas {
		if(!this.canvas_direction_Internal&&this.uiWidgetBase) {
			this.canvas_direction_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_direction') as mw.Canvas
		}
		return this.canvas_direction_Internal
	}
	private btn_up_Internal: mw.Button
	public get btn_up(): mw.Button {
		if(!this.btn_up_Internal&&this.uiWidgetBase) {
			this.btn_up_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_direction/btn_up') as mw.Button
		}
		return this.btn_up_Internal
	}
	private btn_down_Internal: mw.Button
	public get btn_down(): mw.Button {
		if(!this.btn_down_Internal&&this.uiWidgetBase) {
			this.btn_down_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_direction/btn_down') as mw.Button
		}
		return this.btn_down_Internal
	}
	private btn_left_Internal: mw.Button
	public get btn_left(): mw.Button {
		if(!this.btn_left_Internal&&this.uiWidgetBase) {
			this.btn_left_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_direction/btn_left') as mw.Button
		}
		return this.btn_left_Internal
	}
	private btn_right_Internal: mw.Button
	public get btn_right(): mw.Button {
		if(!this.btn_right_Internal&&this.uiWidgetBase) {
			this.btn_right_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_direction/btn_right') as mw.Button
		}
		return this.btn_right_Internal
	}
	private canvas_discardItem_Internal: mw.Canvas
	public get canvas_discardItem(): mw.Canvas {
		if(!this.canvas_discardItem_Internal&&this.uiWidgetBase) {
			this.canvas_discardItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_discardItem') as mw.Canvas
		}
		return this.canvas_discardItem_Internal
	}
	private btn_discardItem_Internal: mw.Button
	public get btn_discardItem(): mw.Button {
		if(!this.btn_discardItem_Internal&&this.uiWidgetBase) {
			this.btn_discardItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_discardItem/btn_discardItem') as mw.Button
		}
		return this.btn_discardItem_Internal
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
		
		this.btn_place.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Build_UI_btn_place");
		})
		this.btn_place.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_place.onPressed.add(() => {
			this.btn_place["preScale"] = this.btn_place.renderScale;
			this.btn_place.renderScale = Vector2.one.set(this.btn_place["preScale"]).multiply(1.1);
		})
		this.btn_place.onReleased.add(() => {
			this.btn_place.renderScale = this.btn_place["preScale"];
		})
		
	
		this.btn_up.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Build_UI_btn_up");
		})
		this.btn_up.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_up.onPressed.add(() => {
			this.btn_up["preScale"] = this.btn_up.renderScale;
			this.btn_up.renderScale = Vector2.one.set(this.btn_up["preScale"]).multiply(1.1);
		})
		this.btn_up.onReleased.add(() => {
			this.btn_up.renderScale = this.btn_up["preScale"];
		})
		
	
		this.btn_down.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Build_UI_btn_down");
		})
		this.btn_down.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_down.onPressed.add(() => {
			this.btn_down["preScale"] = this.btn_down.renderScale;
			this.btn_down.renderScale = Vector2.one.set(this.btn_down["preScale"]).multiply(1.1);
		})
		this.btn_down.onReleased.add(() => {
			this.btn_down.renderScale = this.btn_down["preScale"];
		})
		
	
		this.btn_left.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Build_UI_btn_left");
		})
		this.btn_left.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_left.onPressed.add(() => {
			this.btn_left["preScale"] = this.btn_left.renderScale;
			this.btn_left.renderScale = Vector2.one.set(this.btn_left["preScale"]).multiply(1.1);
		})
		this.btn_left.onReleased.add(() => {
			this.btn_left.renderScale = this.btn_left["preScale"];
		})
		
	
		this.btn_right.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Build_UI_btn_right");
		})
		this.btn_right.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_right.onPressed.add(() => {
			this.btn_right["preScale"] = this.btn_right.renderScale;
			this.btn_right.renderScale = Vector2.one.set(this.btn_right["preScale"]).multiply(1.1);
		})
		this.btn_right.onReleased.add(() => {
			this.btn_right.renderScale = this.btn_right["preScale"];
		})
		
	
		this.btn_discardItem.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Build_UI_btn_discardItem");
		})
		this.btn_discardItem.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_discardItem.onPressed.add(() => {
			this.btn_discardItem["preScale"] = this.btn_discardItem.renderScale;
			this.btn_discardItem.renderScale = Vector2.one.set(this.btn_discardItem["preScale"]).multiply(1.1);
		})
		this.btn_discardItem.onReleased.add(() => {
			this.btn_discardItem.renderScale = this.btn_discardItem["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Build_UI'] = Build_UI_Generate;