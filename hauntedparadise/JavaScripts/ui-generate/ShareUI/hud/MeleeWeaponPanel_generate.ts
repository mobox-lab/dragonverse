
 

 @UIBind('UI/ShareUI/hud/MeleeWeaponPanel.ui')
 export default class MeleeWeaponPanel_Generate extends UIScript {
	 	private canvas_attack_Internal: mw.Canvas
	public get canvas_attack(): mw.Canvas {
		if(!this.canvas_attack_Internal&&this.uiWidgetBase) {
			this.canvas_attack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_attack') as mw.Canvas
		}
		return this.canvas_attack_Internal
	}
	private img_circle_Internal: mw.Image
	public get img_circle(): mw.Image {
		if(!this.img_circle_Internal&&this.uiWidgetBase) {
			this.img_circle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_attack/img_circle') as mw.Image
		}
		return this.img_circle_Internal
	}
	private btn_attack_Internal: mw.Button
	public get btn_attack(): mw.Button {
		if(!this.btn_attack_Internal&&this.uiWidgetBase) {
			this.btn_attack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_attack/btn_attack') as mw.Button
		}
		return this.btn_attack_Internal
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
	private canvas_melee_Internal: mw.Canvas
	public get canvas_melee(): mw.Canvas {
		if(!this.canvas_melee_Internal&&this.uiWidgetBase) {
			this.canvas_melee_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_melee') as mw.Canvas
		}
		return this.canvas_melee_Internal
	}
	private img_melee_Internal: mw.Image
	public get img_melee(): mw.Image {
		if(!this.img_melee_Internal&&this.uiWidgetBase) {
			this.img_melee_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_melee/img_melee') as mw.Image
		}
		return this.img_melee_Internal
	}
	private btn_melee_Internal: mw.Button
	public get btn_melee(): mw.Button {
		if(!this.btn_melee_Internal&&this.uiWidgetBase) {
			this.btn_melee_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_melee/btn_melee') as mw.Button
		}
		return this.btn_melee_Internal
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
		
		this.btn_attack.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "MeleeWeaponPanel_btn_attack");
		})
		this.btn_attack.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_attack.onPressed.add(() => {
			this.btn_attack["preScale"] = this.btn_attack.renderScale;
			this.btn_attack.renderScale = Vector2.one.set(this.btn_attack["preScale"]).multiply(1.1);
		})
		this.btn_attack.onReleased.add(() => {
			this.btn_attack.renderScale = this.btn_attack["preScale"];
		})
		
	
		this.btn_catch.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "MeleeWeaponPanel_btn_catch");
		})
		this.btn_catch.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_catch.onPressed.add(() => {
			this.btn_catch["preScale"] = this.btn_catch.renderScale;
			this.btn_catch.renderScale = Vector2.one.set(this.btn_catch["preScale"]).multiply(1.1);
		})
		this.btn_catch.onReleased.add(() => {
			this.btn_catch.renderScale = this.btn_catch["preScale"];
		})
		
	
		this.btn_melee.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "MeleeWeaponPanel_btn_melee");
		})
		this.btn_melee.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_melee.onPressed.add(() => {
			this.btn_melee["preScale"] = this.btn_melee.renderScale;
			this.btn_melee.renderScale = Vector2.one.set(this.btn_melee["preScale"]).multiply(1.1);
		})
		this.btn_melee.onReleased.add(() => {
			this.btn_melee.renderScale = this.btn_melee["preScale"];
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

UIService['UI_MeleeWeaponPanel'] = MeleeWeaponPanel_Generate;