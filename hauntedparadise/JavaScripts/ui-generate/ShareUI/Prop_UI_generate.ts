
 

 @UIBind('UI/ShareUI/Prop_UI.ui')
 export default class Prop_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private canvas_prop_Internal: mw.Canvas
	public get canvas_prop(): mw.Canvas {
		if(!this.canvas_prop_Internal&&this.uiWidgetBase) {
			this.canvas_prop_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_prop') as mw.Canvas
		}
		return this.canvas_prop_Internal
	}
	private img_black_Internal: mw.Image
	public get img_black(): mw.Image {
		if(!this.img_black_Internal&&this.uiWidgetBase) {
			this.img_black_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_prop/img_black') as mw.Image
		}
		return this.img_black_Internal
	}
	private btn_prop_Internal: mw.Button
	public get btn_prop(): mw.Button {
		if(!this.btn_prop_Internal&&this.uiWidgetBase) {
			this.btn_prop_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_prop/btn_prop') as mw.Button
		}
		return this.btn_prop_Internal
	}
	private img_quality_Internal: mw.Image
	public get img_quality(): mw.Image {
		if(!this.img_quality_Internal&&this.uiWidgetBase) {
			this.img_quality_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_prop/img_quality') as mw.Image
		}
		return this.img_quality_Internal
	}
	private img_line_Internal: mw.Image
	public get img_line(): mw.Image {
		if(!this.img_line_Internal&&this.uiWidgetBase) {
			this.img_line_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_prop/img_line') as mw.Image
		}
		return this.img_line_Internal
	}
	private img_prop_Internal: mw.Image
	public get img_prop(): mw.Image {
		if(!this.img_prop_Internal&&this.uiWidgetBase) {
			this.img_prop_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_prop/img_prop') as mw.Image
		}
		return this.img_prop_Internal
	}
	private text_num_Internal: mw.TextBlock
	public get text_num(): mw.TextBlock {
		if(!this.text_num_Internal&&this.uiWidgetBase) {
			this.text_num_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_prop/text_num') as mw.TextBlock
		}
		return this.text_num_Internal
	}
	private text_type_Internal: mw.TextBlock
	public get text_type(): mw.TextBlock {
		if(!this.text_type_Internal&&this.uiWidgetBase) {
			this.text_type_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_prop/text_type') as mw.TextBlock
		}
		return this.text_type_Internal
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
		
		this.btn_prop.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Prop_UI_btn_prop");
		})
		this.btn_prop.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_prop.onPressed.add(() => {
			this.btn_prop["preScale"] = this.btn_prop.renderScale;
			this.btn_prop.renderScale = Vector2.one.set(this.btn_prop["preScale"]).multiply(1.1);
		})
		this.btn_prop.onReleased.add(() => {
			this.btn_prop.renderScale = this.btn_prop["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_num)
		
	
		this.initLanguage(this.text_type)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Prop_UI'] = Prop_UI_Generate;