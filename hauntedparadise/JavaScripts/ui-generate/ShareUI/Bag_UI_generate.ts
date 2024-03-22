
 

 @UIBind('UI/ShareUI/Bag_UI.ui')
 export default class Bag_UI_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private canvas_bag_Internal: mw.Canvas
	public get canvas_bag(): mw.Canvas {
		if(!this.canvas_bag_Internal&&this.uiWidgetBase) {
			this.canvas_bag_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag') as mw.Canvas
		}
		return this.canvas_bag_Internal
	}
	private img_bg_1_Internal: mw.Image
	public get img_bg_1(): mw.Image {
		if(!this.img_bg_1_Internal&&this.uiWidgetBase) {
			this.img_bg_1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/img_bg_1') as mw.Image
		}
		return this.img_bg_1_Internal
	}
	private img_bg_2_Internal: mw.Image
	public get img_bg_2(): mw.Image {
		if(!this.img_bg_2_Internal&&this.uiWidgetBase) {
			this.img_bg_2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/img_bg_2') as mw.Image
		}
		return this.img_bg_2_Internal
	}
	private canvas_normalitem_Internal: mw.Canvas
	public get canvas_normalitem(): mw.Canvas {
		if(!this.canvas_normalitem_Internal&&this.uiWidgetBase) {
			this.canvas_normalitem_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_normalitem') as mw.Canvas
		}
		return this.canvas_normalitem_Internal
	}
	private scrollBox1_Internal: mw.ScrollBox
	public get scrollBox1(): mw.ScrollBox {
		if(!this.scrollBox1_Internal&&this.uiWidgetBase) {
			this.scrollBox1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_normalitem/scrollBox1') as mw.ScrollBox
		}
		return this.scrollBox1_Internal
	}
	private canvas_items01_Internal: mw.Canvas
	public get canvas_items01(): mw.Canvas {
		if(!this.canvas_items01_Internal&&this.uiWidgetBase) {
			this.canvas_items01_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_normalitem/scrollBox1/canvas_items01') as mw.Canvas
		}
		return this.canvas_items01_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/btn_back') as mw.Button
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
			Event.dispatchToLocal("PlayButtonClick", "Bag_UI_btn_back");
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

UIService['UI_Bag_UI'] = Bag_UI_Generate;