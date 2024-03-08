
 

 @UIBind('UI/ShareUI/props/Congratulations_UI.ui')
 export default class Congratulations_UI_Generate extends UIScript {
	 	private img_overlay_Internal: mw.Image
	public get img_overlay(): mw.Image {
		if(!this.img_overlay_Internal&&this.uiWidgetBase) {
			this.img_overlay_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_overlay') as mw.Image
		}
		return this.img_overlay_Internal
	}
	private btn_next_Internal: mw.Button
	public get btn_next(): mw.Button {
		if(!this.btn_next_Internal&&this.uiWidgetBase) {
			this.btn_next_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_next') as mw.Button
		}
		return this.btn_next_Internal
	}
	private canvas_frame_Internal: mw.Canvas
	public get canvas_frame(): mw.Canvas {
		if(!this.canvas_frame_Internal&&this.uiWidgetBase) {
			this.canvas_frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame') as mw.Canvas
		}
		return this.canvas_frame_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private img_bg2_Internal: mw.Image
	public get img_bg2(): mw.Image {
		if(!this.img_bg2_Internal&&this.uiWidgetBase) {
			this.img_bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_bg2') as mw.Image
		}
		return this.img_bg2_Internal
	}
	private text_title_Internal: mw.TextBlock
	public get text_title(): mw.TextBlock {
		if(!this.text_title_Internal&&this.uiWidgetBase) {
			this.text_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/text_title') as mw.TextBlock
		}
		return this.text_title_Internal
	}
	private canvas_1_Internal: mw.Canvas
	public get canvas_1(): mw.Canvas {
		if(!this.canvas_1_Internal&&this.uiWidgetBase) {
			this.canvas_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_1') as mw.Canvas
		}
		return this.canvas_1_Internal
	}
	private text_quality_Internal: mw.TextBlock
	public get text_quality(): mw.TextBlock {
		if(!this.text_quality_Internal&&this.uiWidgetBase) {
			this.text_quality_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_1/text_quality') as mw.TextBlock
		}
		return this.text_quality_Internal
	}
	private img_icon1_Internal: mw.Image
	public get img_icon1(): mw.Image {
		if(!this.img_icon1_Internal&&this.uiWidgetBase) {
			this.img_icon1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_1/img_icon1') as mw.Image
		}
		return this.img_icon1_Internal
	}
	private text_name1_Internal: mw.TextBlock
	public get text_name1(): mw.TextBlock {
		if(!this.text_name1_Internal&&this.uiWidgetBase) {
			this.text_name1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_1/text_name1') as mw.TextBlock
		}
		return this.text_name1_Internal
	}
	private text_openAll_Internal: mw.TextBlock
	public get text_openAll(): mw.TextBlock {
		if(!this.text_openAll_Internal&&this.uiWidgetBase) {
			this.text_openAll_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_1/text_openAll') as mw.TextBlock
		}
		return this.text_openAll_Internal
	}
	private canvas_3_Internal: mw.Canvas
	public get canvas_3(): mw.Canvas {
		if(!this.canvas_3_Internal&&this.uiWidgetBase) {
			this.canvas_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_3') as mw.Canvas
		}
		return this.canvas_3_Internal
	}
	private canvas_items0_Internal: mw.Canvas
	public get canvas_items0(): mw.Canvas {
		if(!this.canvas_items0_Internal&&this.uiWidgetBase) {
			this.canvas_items0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_3/ScrollBox/canvas_items0') as mw.Canvas
		}
		return this.canvas_items0_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_3/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private btn_open_Internal: mw.Button
	public get btn_open(): mw.Button {
		if(!this.btn_open_Internal&&this.uiWidgetBase) {
			this.btn_open_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_3/btn_open') as mw.Button
		}
		return this.btn_open_Internal
	}
	private text_open_Internal: mw.TextBlock
	public get text_open(): mw.TextBlock {
		if(!this.text_open_Internal&&this.uiWidgetBase) {
			this.text_open_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_3/btn_open/text_open') as mw.TextBlock
		}
		return this.text_open_Internal
	}
	private canvas_4_Internal: mw.Canvas
	public get canvas_4(): mw.Canvas {
		if(!this.canvas_4_Internal&&this.uiWidgetBase) {
			this.canvas_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_4') as mw.Canvas
		}
		return this.canvas_4_Internal
	}
	private btn_know_Internal: mw.Button
	public get btn_know(): mw.Button {
		if(!this.btn_know_Internal&&this.uiWidgetBase) {
			this.btn_know_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_4/btn_know') as mw.Button
		}
		return this.btn_know_Internal
	}
	private text_know_Internal: mw.TextBlock
	public get text_know(): mw.TextBlock {
		if(!this.text_know_Internal&&this.uiWidgetBase) {
			this.text_know_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/canvas_4/btn_know/text_know') as mw.TextBlock
		}
		return this.text_know_Internal
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
		
		this.btn_next.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Congratulations_UI_btn_next");
		})
		this.btn_next.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_next.onPressed.add(() => {
			this.btn_next["preScale"] = this.btn_next.renderScale;
			this.btn_next.renderScale = Vector2.one.set(this.btn_next["preScale"]).multiply(1.1);
		})
		this.btn_next.onReleased.add(() => {
			this.btn_next.renderScale = this.btn_next["preScale"];
		})
		
	
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Congratulations_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.btn_open.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Congratulations_UI_btn_open");
		})
		this.btn_open.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_open.onPressed.add(() => {
			this.btn_open["preScale"] = this.btn_open.renderScale;
			this.btn_open.renderScale = Vector2.one.set(this.btn_open["preScale"]).multiply(1.1);
		})
		this.btn_open.onReleased.add(() => {
			this.btn_open.renderScale = this.btn_open["preScale"];
		})
		
	
		this.btn_know.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Congratulations_UI_btn_know");
		})
		this.btn_know.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_know.onPressed.add(() => {
			this.btn_know["preScale"] = this.btn_know.renderScale;
			this.btn_know.renderScale = Vector2.one.set(this.btn_know["preScale"]).multiply(1.1);
		})
		this.btn_know.onReleased.add(() => {
			this.btn_know.renderScale = this.btn_know["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_title)
		
	
		this.initLanguage(this.text_quality)
		
	
		this.initLanguage(this.text_name1)
		
	
		this.initLanguage(this.text_openAll)
		
	
		this.initLanguage(this.text_open)
		
	
		this.initLanguage(this.text_know)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Congratulations_UI'] = Congratulations_UI_Generate;