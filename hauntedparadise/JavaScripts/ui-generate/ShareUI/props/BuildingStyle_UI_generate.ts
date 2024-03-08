
 

 @UIBind('UI/ShareUI/props/BuildingStyle_UI.ui')
 export default class BuildingStyle_UI_Generate extends UIScript {
	 	private canvas_frame0_Internal: mw.Canvas
	public get canvas_frame0(): mw.Canvas {
		if(!this.canvas_frame0_Internal&&this.uiWidgetBase) {
			this.canvas_frame0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0') as mw.Canvas
		}
		return this.canvas_frame0_Internal
	}
	private img_frame_Internal: mw.Image
	public get img_frame(): mw.Image {
		if(!this.img_frame_Internal&&this.uiWidgetBase) {
			this.img_frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/img_frame') as mw.Image
		}
		return this.img_frame_Internal
	}
	private text_switch_Internal: mw.TextBlock
	public get text_switch(): mw.TextBlock {
		if(!this.text_switch_Internal&&this.uiWidgetBase) {
			this.text_switch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/text_switch') as mw.TextBlock
		}
		return this.text_switch_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private img_frame_1_Internal: mw.Image
	public get img_frame_1(): mw.Image {
		if(!this.img_frame_1_Internal&&this.uiWidgetBase) {
			this.img_frame_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/img_frame_1') as mw.Image
		}
		return this.img_frame_1_Internal
	}
	private canvas_frame2_Internal: mw.Canvas
	public get canvas_frame2(): mw.Canvas {
		if(!this.canvas_frame2_Internal&&this.uiWidgetBase) {
			this.canvas_frame2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2') as mw.Canvas
		}
		return this.canvas_frame2_Internal
	}
	private canvas_style_Internal: mw.Canvas
	public get canvas_style(): mw.Canvas {
		if(!this.canvas_style_Internal&&this.uiWidgetBase) {
			this.canvas_style_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_style') as mw.Canvas
		}
		return this.canvas_style_Internal
	}
	private canvas_styles_Internal: mw.Canvas
	public get canvas_styles(): mw.Canvas {
		if(!this.canvas_styles_Internal&&this.uiWidgetBase) {
			this.canvas_styles_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ScrollBox/canvas_styles') as mw.Canvas
		}
		return this.canvas_styles_Internal
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
			Event.dispatchToLocal("PlayButtonClick", "BuildingStyle_UI_btn_back");
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
		
		this.initLanguage(this.text_switch)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BuildingStyle_UI'] = BuildingStyle_UI_Generate;