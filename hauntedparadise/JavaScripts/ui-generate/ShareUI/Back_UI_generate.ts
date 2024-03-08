
 

 @UIBind('UI/ShareUI/Back_UI.ui')
 export default class Back_UI_Generate extends UIScript {
	 	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private canvas_frame_Internal: mw.Canvas
	public get canvas_frame(): mw.Canvas {
		if(!this.canvas_frame_Internal&&this.uiWidgetBase) {
			this.canvas_frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame') as mw.Canvas
		}
		return this.canvas_frame_Internal
	}
	private img_frame_Internal: mw.Image
	public get img_frame(): mw.Image {
		if(!this.img_frame_Internal&&this.uiWidgetBase) {
			this.img_frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_frame') as mw.Image
		}
		return this.img_frame_Internal
	}
	private btn_back_01_Internal: mw.StaleButton
	public get btn_back_01(): mw.StaleButton {
		if(!this.btn_back_01_Internal&&this.uiWidgetBase) {
			this.btn_back_01_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/btn_back_01') as mw.StaleButton
		}
		return this.btn_back_01_Internal
	}
	private btn_back_02_Internal: mw.StaleButton
	public get btn_back_02(): mw.StaleButton {
		if(!this.btn_back_02_Internal&&this.uiWidgetBase) {
			this.btn_back_02_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/btn_back_02') as mw.StaleButton
		}
		return this.btn_back_02_Internal
	}
	private btn_back_03_Internal: mw.StaleButton
	public get btn_back_03(): mw.StaleButton {
		if(!this.btn_back_03_Internal&&this.uiWidgetBase) {
			this.btn_back_03_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/btn_back_03') as mw.StaleButton
		}
		return this.btn_back_03_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btn_back_01.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Back_UI_btn_back_01");
		})
		this.initLanguage(this.btn_back_01);
		this.btn_back_01.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back_01.onPressed.add(() => {
			this.btn_back_01["preScale"] = this.btn_back_01.renderScale;
			this.btn_back_01.renderScale = Vector2.one.set(this.btn_back_01["preScale"]).multiply(1.1);
		})
		this.btn_back_01.onReleased.add(() => {
			this.btn_back_01.renderScale = this.btn_back_01["preScale"];
		})
		
		
	
		this.btn_back_02.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Back_UI_btn_back_02");
		})
		this.initLanguage(this.btn_back_02);
		this.btn_back_02.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back_02.onPressed.add(() => {
			this.btn_back_02["preScale"] = this.btn_back_02.renderScale;
			this.btn_back_02.renderScale = Vector2.one.set(this.btn_back_02["preScale"]).multiply(1.1);
		})
		this.btn_back_02.onReleased.add(() => {
			this.btn_back_02.renderScale = this.btn_back_02["preScale"];
		})
		
		
	
		this.btn_back_03.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Back_UI_btn_back_03");
		})
		this.initLanguage(this.btn_back_03);
		this.btn_back_03.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back_03.onPressed.add(() => {
			this.btn_back_03["preScale"] = this.btn_back_03.renderScale;
			this.btn_back_03.renderScale = Vector2.one.set(this.btn_back_03["preScale"]).multiply(1.1);
		})
		this.btn_back_03.onReleased.add(() => {
			this.btn_back_03.renderScale = this.btn_back_03["preScale"];
		})
		
		
	
		//按钮添加点击
		

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

UIService['UI_Back_UI'] = Back_UI_Generate;