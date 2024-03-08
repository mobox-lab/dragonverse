
 

 @UIBind('UI/ShareUI/PickUp_UI.ui')
 export default class PickUp_UI_Generate extends UIScript {
	 	private canvas_pickUp_Internal: mw.Canvas
	public get canvas_pickUp(): mw.Canvas {
		if(!this.canvas_pickUp_Internal&&this.uiWidgetBase) {
			this.canvas_pickUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pickUp') as mw.Canvas
		}
		return this.canvas_pickUp_Internal
	}
	private maskBtn_color_Internal: mw.MaskButton
	public get maskBtn_color(): mw.MaskButton {
		if(!this.maskBtn_color_Internal&&this.uiWidgetBase) {
			this.maskBtn_color_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pickUp/maskBtn_color') as mw.MaskButton
		}
		return this.maskBtn_color_Internal
	}
	private img_loop_Internal: mw.Image
	public get img_loop(): mw.Image {
		if(!this.img_loop_Internal&&this.uiWidgetBase) {
			this.img_loop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pickUp/img_loop') as mw.Image
		}
		return this.img_loop_Internal
	}
	private text_tips_Internal: mw.TextBlock
	public get text_tips(): mw.TextBlock {
		if(!this.text_tips_Internal&&this.uiWidgetBase) {
			this.text_tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pickUp/text_tips') as mw.TextBlock
		}
		return this.text_tips_Internal
	}
	private canvas_catch_Internal: mw.Canvas
	public get canvas_catch(): mw.Canvas {
		if(!this.canvas_catch_Internal&&this.uiWidgetBase) {
			this.canvas_catch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_catch') as mw.Canvas
		}
		return this.canvas_catch_Internal
	}
	private btn_catch_Internal: mw.Button
	public get btn_catch(): mw.Button {
		if(!this.btn_catch_Internal&&this.uiWidgetBase) {
			this.btn_catch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_catch/btn_catch') as mw.Button
		}
		return this.btn_catch_Internal
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
		
		this.btn_catch.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "PickUp_UI_btn_catch");
		})
		this.btn_catch.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_catch.onPressed.add(() => {
			this.btn_catch["preScale"] = this.btn_catch.renderScale;
			this.btn_catch.renderScale = Vector2.one.set(this.btn_catch["preScale"]).multiply(1.1);
		})
		this.btn_catch.onReleased.add(() => {
			this.btn_catch.renderScale = this.btn_catch["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_tips)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_PickUp_UI'] = PickUp_UI_Generate;