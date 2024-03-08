
 

 @UIBind('UI/ShareUI/props/CompletionReward_UI.ui')
 export default class CompletionReward_UI_Generate extends UIScript {
	 	private canvas_gift_Internal: mw.Canvas
	public get canvas_gift(): mw.Canvas {
		if(!this.canvas_gift_Internal&&this.uiWidgetBase) {
			this.canvas_gift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift') as mw.Canvas
		}
		return this.canvas_gift_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private img_icon_Internal: mw.Image
	public get img_icon(): mw.Image {
		if(!this.img_icon_Internal&&this.uiWidgetBase) {
			this.img_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/img_icon') as mw.Image
		}
		return this.img_icon_Internal
	}
	private btn_opengift_Internal: mw.Button
	public get btn_opengift(): mw.Button {
		if(!this.btn_opengift_Internal&&this.uiWidgetBase) {
			this.btn_opengift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/btn_opengift') as mw.Button
		}
		return this.btn_opengift_Internal
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
		
		this.btn_opengift.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CompletionReward_UI_btn_opengift");
		})
		this.btn_opengift.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_opengift.onPressed.add(() => {
			this.btn_opengift["preScale"] = this.btn_opengift.renderScale;
			this.btn_opengift.renderScale = Vector2.one.set(this.btn_opengift["preScale"]).multiply(1.1);
		})
		this.btn_opengift.onReleased.add(() => {
			this.btn_opengift.renderScale = this.btn_opengift["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_gift/btn_opengift/TextBlock") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CompletionReward_UI'] = CompletionReward_UI_Generate;