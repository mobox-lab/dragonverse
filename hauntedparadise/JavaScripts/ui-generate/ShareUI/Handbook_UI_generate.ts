
 

 @UIBind('UI/ShareUI/Handbook_UI.ui')
 export default class Handbook_UI_Generate extends UIScript {
	 	private btn_bg1_Internal: mw.Button
	public get btn_bg1(): mw.Button {
		if(!this.btn_bg1_Internal&&this.uiWidgetBase) {
			this.btn_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_bg1') as mw.Button
		}
		return this.btn_bg1_Internal
	}
	private img_bg3_Internal: mw.Image
	public get img_bg3(): mw.Image {
		if(!this.img_bg3_Internal&&this.uiWidgetBase) {
			this.img_bg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg3') as mw.Image
		}
		return this.img_bg3_Internal
	}
	private img_bg2_Internal: mw.Image
	public get img_bg2(): mw.Image {
		if(!this.img_bg2_Internal&&this.uiWidgetBase) {
			this.img_bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg2') as mw.Image
		}
		return this.img_bg2_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private canvas_type_Internal: mw.Canvas
	public get canvas_type(): mw.Canvas {
		if(!this.canvas_type_Internal&&this.uiWidgetBase) {
			this.canvas_type_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ScrollBox/canvas_type') as mw.Canvas
		}
		return this.canvas_type_Internal
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
		
		this.btn_bg1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Handbook_UI_btn_bg1");
		})
		this.btn_bg1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_bg1.onPressed.add(() => {
			this.btn_bg1["preScale"] = this.btn_bg1.renderScale;
			this.btn_bg1.renderScale = Vector2.one.set(this.btn_bg1["preScale"]).multiply(1.1);
		})
		this.btn_bg1.onReleased.add(() => {
			this.btn_bg1.renderScale = this.btn_bg1["preScale"];
		})
		
	
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Handbook_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
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

UIService['UI_Handbook_UI'] = Handbook_UI_Generate;