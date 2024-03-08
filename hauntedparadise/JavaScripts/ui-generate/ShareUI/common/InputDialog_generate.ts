
 

 @UIBind('UI/ShareUI/common/InputDialog.ui')
 export default class InputDialog_Generate extends UIScript {
	 	private btn_bg_Internal: mw.Button
	public get btn_bg(): mw.Button {
		if(!this.btn_bg_Internal&&this.uiWidgetBase) {
			this.btn_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_bg') as mw.Button
		}
		return this.btn_bg_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private img_bg_main_Internal: mw.Image
	public get img_bg_main(): mw.Image {
		if(!this.img_bg_main_Internal&&this.uiWidgetBase) {
			this.img_bg_main_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/img_bg_main') as mw.Image
		}
		return this.img_bg_main_Internal
	}
	private btn_quit_Internal: mw.Button
	public get btn_quit(): mw.Button {
		if(!this.btn_quit_Internal&&this.uiWidgetBase) {
			this.btn_quit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/btn_quit') as mw.Button
		}
		return this.btn_quit_Internal
	}
	private txt_content_Internal: mw.TextBlock
	public get txt_content(): mw.TextBlock {
		if(!this.txt_content_Internal&&this.uiWidgetBase) {
			this.txt_content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/txt_content') as mw.TextBlock
		}
		return this.txt_content_Internal
	}
	private txt_title_Internal: mw.TextBlock
	public get txt_title(): mw.TextBlock {
		if(!this.txt_title_Internal&&this.uiWidgetBase) {
			this.txt_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/txt_title') as mw.TextBlock
		}
		return this.txt_title_Internal
	}
	private in_value_Internal: mw.InputBox
	public get in_value(): mw.InputBox {
		if(!this.in_value_Internal&&this.uiWidgetBase) {
			this.in_value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/in_value') as mw.InputBox
		}
		return this.in_value_Internal
	}
	private btn_confirm_Internal: mw.StaleButton
	public get btn_confirm(): mw.StaleButton {
		if(!this.btn_confirm_Internal&&this.uiWidgetBase) {
			this.btn_confirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/btn_confirm') as mw.StaleButton
		}
		return this.btn_confirm_Internal
	}
	private btn_cancel_Internal: mw.StaleButton
	public get btn_cancel(): mw.StaleButton {
		if(!this.btn_cancel_Internal&&this.uiWidgetBase) {
			this.btn_cancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/btn_cancel') as mw.StaleButton
		}
		return this.btn_cancel_Internal
	}
	private btn_getName_Internal: mw.Button
	public get btn_getName(): mw.Button {
		if(!this.btn_getName_Internal&&this.uiWidgetBase) {
			this.btn_getName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/btn_getName') as mw.Button
		}
		return this.btn_getName_Internal
	}
	private txt_ad_Internal: mw.TextBlock
	public get txt_ad(): mw.TextBlock {
		if(!this.txt_ad_Internal&&this.uiWidgetBase) {
			this.txt_ad_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/btn_getName/txt_ad') as mw.TextBlock
		}
		return this.txt_ad_Internal
	}
	private adImage_Internal: mw.Image
	public get adImage(): mw.Image {
		if(!this.adImage_Internal&&this.uiWidgetBase) {
			this.adImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/adImage') as mw.Image
		}
		return this.adImage_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btn_confirm.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "InputDialog_btn_confirm");
		})
		this.initLanguage(this.btn_confirm);
		this.btn_confirm.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_confirm.onPressed.add(() => {
			this.btn_confirm["preScale"] = this.btn_confirm.renderScale;
			this.btn_confirm.renderScale = Vector2.one.set(this.btn_confirm["preScale"]).multiply(1.1);
		})
		this.btn_confirm.onReleased.add(() => {
			this.btn_confirm.renderScale = this.btn_confirm["preScale"];
		})
		
		
	
		this.btn_cancel.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "InputDialog_btn_cancel");
		})
		this.initLanguage(this.btn_cancel);
		this.btn_cancel.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_cancel.onPressed.add(() => {
			this.btn_cancel["preScale"] = this.btn_cancel.renderScale;
			this.btn_cancel.renderScale = Vector2.one.set(this.btn_cancel["preScale"]).multiply(1.1);
		})
		this.btn_cancel.onReleased.add(() => {
			this.btn_cancel.renderScale = this.btn_cancel["preScale"];
		})
		
		
	
		//按钮添加点击
		
		this.btn_bg.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "InputDialog_btn_bg");
		})
		this.btn_bg.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_bg.onPressed.add(() => {
			this.btn_bg["preScale"] = this.btn_bg.renderScale;
			this.btn_bg.renderScale = Vector2.one.set(this.btn_bg["preScale"]).multiply(1.1);
		})
		this.btn_bg.onReleased.add(() => {
			this.btn_bg.renderScale = this.btn_bg["preScale"];
		})
		
	
		this.btn_quit.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "InputDialog_btn_quit");
		})
		this.btn_quit.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_quit.onPressed.add(() => {
			this.btn_quit["preScale"] = this.btn_quit.renderScale;
			this.btn_quit.renderScale = Vector2.one.set(this.btn_quit["preScale"]).multiply(1.1);
		})
		this.btn_quit.onReleased.add(() => {
			this.btn_quit.renderScale = this.btn_quit["preScale"];
		})
		
	
		this.btn_getName.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "InputDialog_btn_getName");
		})
		this.btn_getName.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_getName.onPressed.add(() => {
			this.btn_getName["preScale"] = this.btn_getName.renderScale;
			this.btn_getName.renderScale = Vector2.one.set(this.btn_getName["preScale"]).multiply(1.1);
		})
		this.btn_getName.onReleased.add(() => {
			this.btn_getName.renderScale = this.btn_getName["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.txt_content)
		
	
		this.initLanguage(this.txt_title)
		
	
		this.initLanguage(this.txt_ad)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_InputDialog'] = InputDialog_Generate;