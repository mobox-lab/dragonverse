
 

 @UIBind('UI/ShareUI/hud/HotWeaponPanel.ui')
 export default class HotWeaponPanel_Generate extends UIScript {
	 	private mCanvas_attack_Internal: mw.Canvas
	public get mCanvas_attack(): mw.Canvas {
		if(!this.mCanvas_attack_Internal&&this.uiWidgetBase) {
			this.mCanvas_attack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_attack') as mw.Canvas
		}
		return this.mCanvas_attack_Internal
	}
	private btn_attack_Internal: mw.VirtualJoystickPanel
	public get btn_attack(): mw.VirtualJoystickPanel {
		if(!this.btn_attack_Internal&&this.uiWidgetBase) {
			this.btn_attack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_attack/btn_attack') as mw.VirtualJoystickPanel
		}
		return this.btn_attack_Internal
	}
	private mMask_attack_Internal: mw.MaskButton
	public get mMask_attack(): mw.MaskButton {
		if(!this.mMask_attack_Internal&&this.uiWidgetBase) {
			this.mMask_attack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_attack/mMask_attack') as mw.MaskButton
		}
		return this.mMask_attack_Internal
	}
	private aimCanvas_Internal: mw.Canvas
	public get aimCanvas(): mw.Canvas {
		if(!this.aimCanvas_Internal&&this.uiWidgetBase) {
			this.aimCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/aimCanvas') as mw.Canvas
		}
		return this.aimCanvas_Internal
	}
	private focusImg_Internal: mw.Image
	public get focusImg(): mw.Image {
		if(!this.focusImg_Internal&&this.uiWidgetBase) {
			this.focusImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/aimCanvas/focusImg') as mw.Image
		}
		return this.focusImg_Internal
	}
	private unfocusImg_Internal: mw.Image
	public get unfocusImg(): mw.Image {
		if(!this.unfocusImg_Internal&&this.uiWidgetBase) {
			this.unfocusImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/aimCanvas/unfocusImg') as mw.Image
		}
		return this.unfocusImg_Internal
	}
	private canvas_reload_Internal: mw.Canvas
	public get canvas_reload(): mw.Canvas {
		if(!this.canvas_reload_Internal&&this.uiWidgetBase) {
			this.canvas_reload_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_reload') as mw.Canvas
		}
		return this.canvas_reload_Internal
	}
	private btn_reload_Internal: mw.Button
	public get btn_reload(): mw.Button {
		if(!this.btn_reload_Internal&&this.uiWidgetBase) {
			this.btn_reload_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_reload/btn_reload') as mw.Button
		}
		return this.btn_reload_Internal
	}
	private text_bulletsleft_Internal: mw.TextBlock
	public get text_bulletsleft(): mw.TextBlock {
		if(!this.text_bulletsleft_Internal&&this.uiWidgetBase) {
			this.text_bulletsleft_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_reload/text_bulletsleft') as mw.TextBlock
		}
		return this.text_bulletsleft_Internal
	}
	private text_bulletscapacity_Internal: mw.TextBlock
	public get text_bulletscapacity(): mw.TextBlock {
		if(!this.text_bulletscapacity_Internal&&this.uiWidgetBase) {
			this.text_bulletscapacity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_reload/text_bulletscapacity') as mw.TextBlock
		}
		return this.text_bulletscapacity_Internal
	}
	private mMask_reload_Internal: mw.MaskButton
	public get mMask_reload(): mw.MaskButton {
		if(!this.mMask_reload_Internal&&this.uiWidgetBase) {
			this.mMask_reload_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_reload/mMask_reload') as mw.MaskButton
		}
		return this.mMask_reload_Internal
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
	private canvas_shoot_Internal: mw.Canvas
	public get canvas_shoot(): mw.Canvas {
		if(!this.canvas_shoot_Internal&&this.uiWidgetBase) {
			this.canvas_shoot_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shoot') as mw.Canvas
		}
		return this.canvas_shoot_Internal
	}
	private btn_shoot_Internal: mw.VirtualJoystickPanel
	public get btn_shoot(): mw.VirtualJoystickPanel {
		if(!this.btn_shoot_Internal&&this.uiWidgetBase) {
			this.btn_shoot_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shoot/btn_shoot') as mw.VirtualJoystickPanel
		}
		return this.btn_shoot_Internal
	}
	private mMask_shoot_Internal: mw.MaskButton
	public get mMask_shoot(): mw.MaskButton {
		if(!this.mMask_shoot_Internal&&this.uiWidgetBase) {
			this.mMask_shoot_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shoot/mMask_shoot') as mw.MaskButton
		}
		return this.mMask_shoot_Internal
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
		
		this.btn_reload.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "HotWeaponPanel_btn_reload");
		})
		this.btn_reload.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_reload.onPressed.add(() => {
			this.btn_reload["preScale"] = this.btn_reload.renderScale;
			this.btn_reload.renderScale = Vector2.one.set(this.btn_reload["preScale"]).multiply(1.1);
		})
		this.btn_reload.onReleased.add(() => {
			this.btn_reload.renderScale = this.btn_reload["preScale"];
		})
		
	
		this.btn_catch.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "HotWeaponPanel_btn_catch");
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
		
		this.initLanguage(this.text_bulletsleft)
		
	
		this.initLanguage(this.text_bulletscapacity)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_HotWeaponPanel'] = HotWeaponPanel_Generate;