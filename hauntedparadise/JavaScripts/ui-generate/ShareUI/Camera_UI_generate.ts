
 

 @UIBind('UI/ShareUI/Camera_UI.ui')
 export default class Camera_UI_Generate extends UIScript {
	 	private img_dark_Internal: mw.Image
	public get img_dark(): mw.Image {
		if(!this.img_dark_Internal&&this.uiWidgetBase) {
			this.img_dark_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_dark') as mw.Image
		}
		return this.img_dark_Internal
	}
	private img_aperture_Internal: mw.Image
	public get img_aperture(): mw.Image {
		if(!this.img_aperture_Internal&&this.uiWidgetBase) {
			this.img_aperture_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_aperture') as mw.Image
		}
		return this.img_aperture_Internal
	}
	private img_aim_Internal: mw.Image
	public get img_aim(): mw.Image {
		if(!this.img_aim_Internal&&this.uiWidgetBase) {
			this.img_aim_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_aim') as mw.Image
		}
		return this.img_aim_Internal
	}
	private img_power_Internal: mw.Image
	public get img_power(): mw.Image {
		if(!this.img_power_Internal&&this.uiWidgetBase) {
			this.img_power_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_power') as mw.Image
		}
		return this.img_power_Internal
	}
	private btn_camera_Internal: mw.Button
	public get btn_camera(): mw.Button {
		if(!this.btn_camera_Internal&&this.uiWidgetBase) {
			this.btn_camera_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_camera') as mw.Button
		}
		return this.btn_camera_Internal
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
		
		this.btn_camera.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Camera_UI_btn_camera");
		})
		this.btn_camera.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_camera.onPressed.add(() => {
			this.btn_camera["preScale"] = this.btn_camera.renderScale;
			this.btn_camera.renderScale = Vector2.one.set(this.btn_camera["preScale"]).multiply(1.1);
		})
		this.btn_camera.onReleased.add(() => {
			this.btn_camera.renderScale = this.btn_camera["preScale"];
		})
		
	
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Camera_UI_btn_back");
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

UIService['UI_Camera_UI'] = Camera_UI_Generate;