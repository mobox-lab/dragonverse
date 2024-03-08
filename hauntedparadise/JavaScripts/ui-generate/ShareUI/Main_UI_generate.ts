
 

 @UIBind('UI/ShareUI/Main_UI.ui')
 export default class Main_UI_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private canvas_move_Internal: mw.Canvas
	public get canvas_move(): mw.Canvas {
		if(!this.canvas_move_Internal&&this.uiWidgetBase) {
			this.canvas_move_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_move') as mw.Canvas
		}
		return this.canvas_move_Internal
	}
	private mVirtualJoystickPanel_Internal: mw.VirtualJoystickPanel
	public get mVirtualJoystickPanel(): mw.VirtualJoystickPanel {
		if(!this.mVirtualJoystickPanel_Internal&&this.uiWidgetBase) {
			this.mVirtualJoystickPanel_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_move/mVirtualJoystickPanel') as mw.VirtualJoystickPanel
		}
		return this.mVirtualJoystickPanel_Internal
	}
	private canvas_useprops_Internal: mw.Canvas
	public get canvas_useprops(): mw.Canvas {
		if(!this.canvas_useprops_Internal&&this.uiWidgetBase) {
			this.canvas_useprops_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_useprops') as mw.Canvas
		}
		return this.canvas_useprops_Internal
	}
	private img_props_Internal: mw.Image
	public get img_props(): mw.Image {
		if(!this.img_props_Internal&&this.uiWidgetBase) {
			this.img_props_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_useprops/img_props') as mw.Image
		}
		return this.img_props_Internal
	}
	private btn_useprops_Internal: mw.Button
	public get btn_useprops(): mw.Button {
		if(!this.btn_useprops_Internal&&this.uiWidgetBase) {
			this.btn_useprops_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_useprops/btn_useprops') as mw.Button
		}
		return this.btn_useprops_Internal
	}
	private mTouchPad_Internal: mw.TouchPad
	public get mTouchPad(): mw.TouchPad {
		if(!this.mTouchPad_Internal&&this.uiWidgetBase) {
			this.mTouchPad_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/mTouchPad') as mw.TouchPad
		}
		return this.mTouchPad_Internal
	}
	private canvas_discardItem_Internal: mw.Canvas
	public get canvas_discardItem(): mw.Canvas {
		if(!this.canvas_discardItem_Internal&&this.uiWidgetBase) {
			this.canvas_discardItem_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_discardItem') as mw.Canvas
		}
		return this.canvas_discardItem_Internal
	}
	private btn_discardItem_Internal: mw.Button
	public get btn_discardItem(): mw.Button {
		if(!this.btn_discardItem_Internal&&this.uiWidgetBase) {
			this.btn_discardItem_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_discardItem/btn_discardItem') as mw.Button
		}
		return this.btn_discardItem_Internal
	}
	private canvas_jump_Internal: mw.Canvas
	public get canvas_jump(): mw.Canvas {
		if(!this.canvas_jump_Internal&&this.uiWidgetBase) {
			this.canvas_jump_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_jump') as mw.Canvas
		}
		return this.canvas_jump_Internal
	}
	private btn_jump_Internal: mw.Button
	public get btn_jump(): mw.Button {
		if(!this.btn_jump_Internal&&this.uiWidgetBase) {
			this.btn_jump_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_jump/btn_jump') as mw.Button
		}
		return this.btn_jump_Internal
	}
	private canvas_toprightcorner_Internal: mw.Canvas
	public get canvas_toprightcorner(): mw.Canvas {
		if(!this.canvas_toprightcorner_Internal&&this.uiWidgetBase) {
			this.canvas_toprightcorner_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_toprightcorner') as mw.Canvas
		}
		return this.canvas_toprightcorner_Internal
	}
	private canvas_smile_Internal: mw.Canvas
	public get canvas_smile(): mw.Canvas {
		if(!this.canvas_smile_Internal&&this.uiWidgetBase) {
			this.canvas_smile_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_toprightcorner/canvas_smile') as mw.Canvas
		}
		return this.canvas_smile_Internal
	}
	private btn_switchposition_Internal: mw.Button
	public get btn_switchposition(): mw.Button {
		if(!this.btn_switchposition_Internal&&this.uiWidgetBase) {
			this.btn_switchposition_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_toprightcorner/canvas_smile/btn_switchposition') as mw.Button
		}
		return this.btn_switchposition_Internal
	}
	private canvas_book_Internal: mw.Canvas
	public get canvas_book(): mw.Canvas {
		if(!this.canvas_book_Internal&&this.uiWidgetBase) {
			this.canvas_book_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_toprightcorner/canvas_book') as mw.Canvas
		}
		return this.canvas_book_Internal
	}
	private btn_notebook_Internal: mw.Button
	public get btn_notebook(): mw.Button {
		if(!this.btn_notebook_Internal&&this.uiWidgetBase) {
			this.btn_notebook_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_toprightcorner/canvas_book/btn_notebook') as mw.Button
		}
		return this.btn_notebook_Internal
	}
	private img_point_Internal: mw.Image
	public get img_point(): mw.Image {
		if(!this.img_point_Internal&&this.uiWidgetBase) {
			this.img_point_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_toprightcorner/canvas_book/img_point') as mw.Image
		}
		return this.img_point_Internal
	}
	private canvas_time_Internal: mw.Canvas
	public get canvas_time(): mw.Canvas {
		if(!this.canvas_time_Internal&&this.uiWidgetBase) {
			this.canvas_time_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_time') as mw.Canvas
		}
		return this.canvas_time_Internal
	}
	private img_moon_Internal: mw.Image
	public get img_moon(): mw.Image {
		if(!this.img_moon_Internal&&this.uiWidgetBase) {
			this.img_moon_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_time/img_moon') as mw.Image
		}
		return this.img_moon_Internal
	}
	private text_daynew_Internal: mw.TextBlock
	public get text_daynew(): mw.TextBlock {
		if(!this.text_daynew_Internal&&this.uiWidgetBase) {
			this.text_daynew_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_time/text_daynew') as mw.TextBlock
		}
		return this.text_daynew_Internal
	}
	private text_timenew_Internal: mw.TextBlock
	public get text_timenew(): mw.TextBlock {
		if(!this.text_timenew_Internal&&this.uiWidgetBase) {
			this.text_timenew_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_time/text_timenew') as mw.TextBlock
		}
		return this.text_timenew_Internal
	}
	private canvas_camera_Internal: mw.Canvas
	public get canvas_camera(): mw.Canvas {
		if(!this.canvas_camera_Internal&&this.uiWidgetBase) {
			this.canvas_camera_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/Canvas_1/canvas_camera') as mw.Canvas
		}
		return this.canvas_camera_Internal
	}
	private btn_camera_Internal: mw.Button
	public get btn_camera(): mw.Button {
		if(!this.btn_camera_Internal&&this.uiWidgetBase) {
			this.btn_camera_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/Canvas_1/canvas_camera/btn_camera') as mw.Button
		}
		return this.btn_camera_Internal
	}
	private canvas_setting_Internal: mw.Canvas
	public get canvas_setting(): mw.Canvas {
		if(!this.canvas_setting_Internal&&this.uiWidgetBase) {
			this.canvas_setting_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/Canvas_1/canvas_setting') as mw.Canvas
		}
		return this.canvas_setting_Internal
	}
	private btn_setting_Internal: mw.Button
	public get btn_setting(): mw.Button {
		if(!this.btn_setting_Internal&&this.uiWidgetBase) {
			this.btn_setting_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/Canvas_1/canvas_setting/btn_setting') as mw.Button
		}
		return this.btn_setting_Internal
	}
	private canvas_catch_Internal: mw.Canvas
	public get canvas_catch(): mw.Canvas {
		if(!this.canvas_catch_Internal&&this.uiWidgetBase) {
			this.canvas_catch_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_catch') as mw.Canvas
		}
		return this.canvas_catch_Internal
	}
	private btn_catch_Internal: mw.Button
	public get btn_catch(): mw.Button {
		if(!this.btn_catch_Internal&&this.uiWidgetBase) {
			this.btn_catch_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_catch/btn_catch') as mw.Button
		}
		return this.btn_catch_Internal
	}
	private canvas_aim_Internal: mw.Canvas
	public get canvas_aim(): mw.Canvas {
		if(!this.canvas_aim_Internal&&this.uiWidgetBase) {
			this.canvas_aim_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_aim') as mw.Canvas
		}
		return this.canvas_aim_Internal
	}
	private img_aim_Internal: mw.Image
	public get img_aim(): mw.Image {
		if(!this.img_aim_Internal&&this.uiWidgetBase) {
			this.img_aim_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_aim/img_aim') as mw.Image
		}
		return this.img_aim_Internal
	}
	private life_canvas_Internal: mw.Canvas
	public get life_canvas(): mw.Canvas {
		if(!this.life_canvas_Internal&&this.uiWidgetBase) {
			this.life_canvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/life_canvas') as mw.Canvas
		}
		return this.life_canvas_Internal
	}
	private img_lifenum_Internal: mw.Image
	public get img_lifenum(): mw.Image {
		if(!this.img_lifenum_Internal&&this.uiWidgetBase) {
			this.img_lifenum_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/life_canvas/img_lifenum') as mw.Image
		}
		return this.img_lifenum_Internal
	}
	private canvas_idCard_Internal: mw.Canvas
	public get canvas_idCard(): mw.Canvas {
		if(!this.canvas_idCard_Internal&&this.uiWidgetBase) {
			this.canvas_idCard_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_idCard') as mw.Canvas
		}
		return this.canvas_idCard_Internal
	}
	private btn_idCard_Internal: mw.Button
	public get btn_idCard(): mw.Button {
		if(!this.btn_idCard_Internal&&this.uiWidgetBase) {
			this.btn_idCard_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_idCard/btn_idCard') as mw.Button
		}
		return this.btn_idCard_Internal
	}
	private canvas_shop_Internal: mw.Canvas
	public get canvas_shop(): mw.Canvas {
		if(!this.canvas_shop_Internal&&this.uiWidgetBase) {
			this.canvas_shop_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_shop') as mw.Canvas
		}
		return this.canvas_shop_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_shop/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private btn_shop_Internal: mw.Button
	public get btn_shop(): mw.Button {
		if(!this.btn_shop_Internal&&this.uiWidgetBase) {
			this.btn_shop_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_shop/btn_shop') as mw.Button
		}
		return this.btn_shop_Internal
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
		
		this.btn_useprops.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_useprops");
		})
		this.btn_useprops.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_useprops.onPressed.add(() => {
			this.btn_useprops["preScale"] = this.btn_useprops.renderScale;
			this.btn_useprops.renderScale = Vector2.one.set(this.btn_useprops["preScale"]).multiply(1.1);
		})
		this.btn_useprops.onReleased.add(() => {
			this.btn_useprops.renderScale = this.btn_useprops["preScale"];
		})
		
	
		this.btn_discardItem.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_discardItem");
		})
		this.btn_discardItem.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_discardItem.onPressed.add(() => {
			this.btn_discardItem["preScale"] = this.btn_discardItem.renderScale;
			this.btn_discardItem.renderScale = Vector2.one.set(this.btn_discardItem["preScale"]).multiply(1.1);
		})
		this.btn_discardItem.onReleased.add(() => {
			this.btn_discardItem.renderScale = this.btn_discardItem["preScale"];
		})
		
	
		this.btn_jump.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_jump");
		})
		this.btn_jump.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_jump.onPressed.add(() => {
			this.btn_jump["preScale"] = this.btn_jump.renderScale;
			this.btn_jump.renderScale = Vector2.one.set(this.btn_jump["preScale"]).multiply(1.1);
		})
		this.btn_jump.onReleased.add(() => {
			this.btn_jump.renderScale = this.btn_jump["preScale"];
		})
		
	
		this.btn_switchposition.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_switchposition");
		})
		this.btn_switchposition.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_switchposition.onPressed.add(() => {
			this.btn_switchposition["preScale"] = this.btn_switchposition.renderScale;
			this.btn_switchposition.renderScale = Vector2.one.set(this.btn_switchposition["preScale"]).multiply(1.1);
		})
		this.btn_switchposition.onReleased.add(() => {
			this.btn_switchposition.renderScale = this.btn_switchposition["preScale"];
		})
		
	
		this.btn_notebook.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_notebook");
		})
		this.btn_notebook.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_notebook.onPressed.add(() => {
			this.btn_notebook["preScale"] = this.btn_notebook.renderScale;
			this.btn_notebook.renderScale = Vector2.one.set(this.btn_notebook["preScale"]).multiply(1.1);
		})
		this.btn_notebook.onReleased.add(() => {
			this.btn_notebook.renderScale = this.btn_notebook["preScale"];
		})
		
	
		this.btn_camera.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_camera");
		})
		this.btn_camera.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_camera.onPressed.add(() => {
			this.btn_camera["preScale"] = this.btn_camera.renderScale;
			this.btn_camera.renderScale = Vector2.one.set(this.btn_camera["preScale"]).multiply(1.1);
		})
		this.btn_camera.onReleased.add(() => {
			this.btn_camera.renderScale = this.btn_camera["preScale"];
		})
		
	
		this.btn_setting.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_setting");
		})
		this.btn_setting.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_setting.onPressed.add(() => {
			this.btn_setting["preScale"] = this.btn_setting.renderScale;
			this.btn_setting.renderScale = Vector2.one.set(this.btn_setting["preScale"]).multiply(1.1);
		})
		this.btn_setting.onReleased.add(() => {
			this.btn_setting.renderScale = this.btn_setting["preScale"];
		})
		
	
		this.btn_catch.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_catch");
		})
		this.btn_catch.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_catch.onPressed.add(() => {
			this.btn_catch["preScale"] = this.btn_catch.renderScale;
			this.btn_catch.renderScale = Vector2.one.set(this.btn_catch["preScale"]).multiply(1.1);
		})
		this.btn_catch.onReleased.add(() => {
			this.btn_catch.renderScale = this.btn_catch["preScale"];
		})
		
	
		this.btn_idCard.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_idCard");
		})
		this.btn_idCard.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_idCard.onPressed.add(() => {
			this.btn_idCard["preScale"] = this.btn_idCard.renderScale;
			this.btn_idCard.renderScale = Vector2.one.set(this.btn_idCard["preScale"]).multiply(1.1);
		})
		this.btn_idCard.onReleased.add(() => {
			this.btn_idCard.renderScale = this.btn_idCard["preScale"];
		})
		
	
		this.btn_shop.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_shop");
		})
		this.btn_shop.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_shop.onPressed.add(() => {
			this.btn_shop["preScale"] = this.btn_shop.renderScale;
			this.btn_shop.renderScale = Vector2.one.set(this.btn_shop["preScale"]).multiply(1.1);
		})
		this.btn_shop.onReleased.add(() => {
			this.btn_shop.renderScale = this.btn_shop["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_daynew)
		
	
		this.initLanguage(this.text_timenew)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Main_UI'] = Main_UI_Generate;