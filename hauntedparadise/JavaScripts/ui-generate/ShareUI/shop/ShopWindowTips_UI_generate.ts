
 

 @UIBind('UI/ShareUI/shop/ShopWindowTips_UI.ui')
 export default class ShopWindowTips_UI_Generate extends UIScript {
	 	private btn_screen_Internal: mw.Button
	public get btn_screen(): mw.Button {
		if(!this.btn_screen_Internal&&this.uiWidgetBase) {
			this.btn_screen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_screen') as mw.Button
		}
		return this.btn_screen_Internal
	}
	private canvas_window_Internal: mw.Canvas
	public get canvas_window(): mw.Canvas {
		if(!this.canvas_window_Internal&&this.uiWidgetBase) {
			this.canvas_window_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window') as mw.Canvas
		}
		return this.canvas_window_Internal
	}
	private img_bg1_1_Internal: mw.Image
	public get img_bg1_1(): mw.Image {
		if(!this.img_bg1_1_Internal&&this.uiWidgetBase) {
			this.img_bg1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/img_bg1_1') as mw.Image
		}
		return this.img_bg1_1_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private text_tipstitle_Internal: mw.TextBlock
	public get text_tipstitle(): mw.TextBlock {
		if(!this.text_tipstitle_Internal&&this.uiWidgetBase) {
			this.text_tipstitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/text_tipstitle') as mw.TextBlock
		}
		return this.text_tipstitle_Internal
	}
	private text_tipscontent_Internal: mw.TextBlock
	public get text_tipscontent(): mw.TextBlock {
		if(!this.text_tipscontent_Internal&&this.uiWidgetBase) {
			this.text_tipscontent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/text_tipscontent') as mw.TextBlock
		}
		return this.text_tipscontent_Internal
	}
	private img_br1_Internal: mw.Image
	public get img_br1(): mw.Image {
		if(!this.img_br1_Internal&&this.uiWidgetBase) {
			this.img_br1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/img_br1') as mw.Image
		}
		return this.img_br1_Internal
	}
	private btn_cancel_Internal: mw.Button
	public get btn_cancel(): mw.Button {
		if(!this.btn_cancel_Internal&&this.uiWidgetBase) {
			this.btn_cancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/btn_cancel') as mw.Button
		}
		return this.btn_cancel_Internal
	}
	private text_cancel_Internal: mw.TextBlock
	public get text_cancel(): mw.TextBlock {
		if(!this.text_cancel_Internal&&this.uiWidgetBase) {
			this.text_cancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/btn_cancel/text_cancel') as mw.TextBlock
		}
		return this.text_cancel_Internal
	}
	private btn_confirm_Internal: mw.Button
	public get btn_confirm(): mw.Button {
		if(!this.btn_confirm_Internal&&this.uiWidgetBase) {
			this.btn_confirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/btn_confirm') as mw.Button
		}
		return this.btn_confirm_Internal
	}
	private text_confirm_Internal: mw.TextBlock
	public get text_confirm(): mw.TextBlock {
		if(!this.text_confirm_Internal&&this.uiWidgetBase) {
			this.text_confirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/btn_confirm/text_confirm') as mw.TextBlock
		}
		return this.text_confirm_Internal
	}
	private mcheck_canvas_Internal: mw.Canvas
	public get mcheck_canvas(): mw.Canvas {
		if(!this.mcheck_canvas_Internal&&this.uiWidgetBase) {
			this.mcheck_canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/mcheck_canvas') as mw.Canvas
		}
		return this.mcheck_canvas_Internal
	}
	private img_checked_Internal: mw.Image
	public get img_checked(): mw.Image {
		if(!this.img_checked_Internal&&this.uiWidgetBase) {
			this.img_checked_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/mcheck_canvas/img_checked') as mw.Image
		}
		return this.img_checked_Internal
	}
	private img_unchecked_Internal: mw.Image
	public get img_unchecked(): mw.Image {
		if(!this.img_unchecked_Internal&&this.uiWidgetBase) {
			this.img_unchecked_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/mcheck_canvas/img_unchecked') as mw.Image
		}
		return this.img_unchecked_Internal
	}
	private btn_checked_Internal: mw.Button
	public get btn_checked(): mw.Button {
		if(!this.btn_checked_Internal&&this.uiWidgetBase) {
			this.btn_checked_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/mcheck_canvas/btn_checked') as mw.Button
		}
		return this.btn_checked_Internal
	}
	private text_notips_Internal: mw.TextBlock
	public get text_notips(): mw.TextBlock {
		if(!this.text_notips_Internal&&this.uiWidgetBase) {
			this.text_notips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/mcheck_canvas/text_notips') as mw.TextBlock
		}
		return this.text_notips_Internal
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
		
		this.btn_screen.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ShopWindowTips_UI_btn_screen");
		})
		this.btn_screen.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_screen.onPressed.add(() => {
			this.btn_screen["preScale"] = this.btn_screen.renderScale;
			this.btn_screen.renderScale = Vector2.one.set(this.btn_screen["preScale"]).multiply(1.1);
		})
		this.btn_screen.onReleased.add(() => {
			this.btn_screen.renderScale = this.btn_screen["preScale"];
		})
		
	
		this.btn_cancel.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ShopWindowTips_UI_btn_cancel");
		})
		this.btn_cancel.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_cancel.onPressed.add(() => {
			this.btn_cancel["preScale"] = this.btn_cancel.renderScale;
			this.btn_cancel.renderScale = Vector2.one.set(this.btn_cancel["preScale"]).multiply(1.1);
		})
		this.btn_cancel.onReleased.add(() => {
			this.btn_cancel.renderScale = this.btn_cancel["preScale"];
		})
		
	
		this.btn_confirm.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ShopWindowTips_UI_btn_confirm");
		})
		this.btn_confirm.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_confirm.onPressed.add(() => {
			this.btn_confirm["preScale"] = this.btn_confirm.renderScale;
			this.btn_confirm.renderScale = Vector2.one.set(this.btn_confirm["preScale"]).multiply(1.1);
		})
		this.btn_confirm.onReleased.add(() => {
			this.btn_confirm.renderScale = this.btn_confirm["preScale"];
		})
		
	
		this.btn_checked.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ShopWindowTips_UI_btn_checked");
		})
		this.btn_checked.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_checked.onPressed.add(() => {
			this.btn_checked["preScale"] = this.btn_checked.renderScale;
			this.btn_checked.renderScale = Vector2.one.set(this.btn_checked["preScale"]).multiply(1.1);
		})
		this.btn_checked.onReleased.add(() => {
			this.btn_checked.renderScale = this.btn_checked["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_tipstitle)
		
	
		this.initLanguage(this.text_tipscontent)
		
	
		this.initLanguage(this.text_cancel)
		
	
		this.initLanguage(this.text_confirm)
		
	
		this.initLanguage(this.text_notips)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_ShopWindowTips_UI'] = ShopWindowTips_UI_Generate;