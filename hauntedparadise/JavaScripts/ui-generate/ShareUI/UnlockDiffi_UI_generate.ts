
 

 @UIBind('UI/ShareUI/UnlockDiffi_UI.ui')
 export default class UnlockDiffi_UI_Generate extends UIScript {
	 	private canvas_diffitips_Internal: mw.Canvas
	public get canvas_diffitips(): mw.Canvas {
		if(!this.canvas_diffitips_Internal&&this.uiWidgetBase) {
			this.canvas_diffitips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_diffitips') as mw.Canvas
		}
		return this.canvas_diffitips_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_diffitips/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private img_frame_Internal: mw.Image
	public get img_frame(): mw.Image {
		if(!this.img_frame_Internal&&this.uiWidgetBase) {
			this.img_frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_diffitips/img_frame') as mw.Image
		}
		return this.img_frame_Internal
	}
	private text_diffiUnlock_Internal: mw.TextBlock
	public get text_diffiUnlock(): mw.TextBlock {
		if(!this.text_diffiUnlock_Internal&&this.uiWidgetBase) {
			this.text_diffiUnlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_diffitips/text_diffiUnlock') as mw.TextBlock
		}
		return this.text_diffiUnlock_Internal
	}
	private text_backTips_Internal: mw.TextBlock
	public get text_backTips(): mw.TextBlock {
		if(!this.text_backTips_Internal&&this.uiWidgetBase) {
			this.text_backTips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_diffitips/text_backTips') as mw.TextBlock
		}
		return this.text_backTips_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_back') as mw.Button
		}
		return this.btn_back_Internal
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
		
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "UnlockDiffi_UI_btn_back");
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
		
		this.initLanguage(this.text_diffiUnlock)
		
	
		this.initLanguage(this.text_backTips)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_UnlockDiffi_UI'] = UnlockDiffi_UI_Generate;