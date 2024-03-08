
 

 @UIBind('UI/ShareUI/BagOperate_UI.ui')
 export default class BagOperate_UI_Generate extends UIScript {
	 	private canvas_operate_Internal: mw.Canvas
	public get canvas_operate(): mw.Canvas {
		if(!this.canvas_operate_Internal&&this.uiWidgetBase) {
			this.canvas_operate_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_operate') as mw.Canvas
		}
		return this.canvas_operate_Internal
	}
	private btn_use_Internal: mw.StaleButton
	public get btn_use(): mw.StaleButton {
		if(!this.btn_use_Internal&&this.uiWidgetBase) {
			this.btn_use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_operate/btn_use') as mw.StaleButton
		}
		return this.btn_use_Internal
	}
	private btn_move_Internal: mw.StaleButton
	public get btn_move(): mw.StaleButton {
		if(!this.btn_move_Internal&&this.uiWidgetBase) {
			this.btn_move_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_operate/btn_move') as mw.StaleButton
		}
		return this.btn_move_Internal
	}
	private btn_detail_Internal: mw.StaleButton
	public get btn_detail(): mw.StaleButton {
		if(!this.btn_detail_Internal&&this.uiWidgetBase) {
			this.btn_detail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_operate/btn_detail') as mw.StaleButton
		}
		return this.btn_detail_Internal
	}
	private canvas_introduce_Internal: mw.Canvas
	public get canvas_introduce(): mw.Canvas {
		if(!this.canvas_introduce_Internal&&this.uiWidgetBase) {
			this.canvas_introduce_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_introduce') as mw.Canvas
		}
		return this.canvas_introduce_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_introduce/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_introduce/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private text_introduce_Internal: mw.TextBlock
	public get text_introduce(): mw.TextBlock {
		if(!this.text_introduce_Internal&&this.uiWidgetBase) {
			this.text_introduce_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_introduce/text_introduce') as mw.TextBlock
		}
		return this.text_introduce_Internal
	}
	private img_br_Internal: mw.Image
	public get img_br(): mw.Image {
		if(!this.img_br_Internal&&this.uiWidgetBase) {
			this.img_br_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_introduce/img_br') as mw.Image
		}
		return this.img_br_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btn_use.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BagOperate_UI_btn_use");
		})
		this.initLanguage(this.btn_use);
		this.btn_use.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_use.onPressed.add(() => {
			this.btn_use["preScale"] = this.btn_use.renderScale;
			this.btn_use.renderScale = Vector2.one.set(this.btn_use["preScale"]).multiply(1.1);
		})
		this.btn_use.onReleased.add(() => {
			this.btn_use.renderScale = this.btn_use["preScale"];
		})
		
		
	
		this.btn_move.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BagOperate_UI_btn_move");
		})
		this.initLanguage(this.btn_move);
		this.btn_move.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_move.onPressed.add(() => {
			this.btn_move["preScale"] = this.btn_move.renderScale;
			this.btn_move.renderScale = Vector2.one.set(this.btn_move["preScale"]).multiply(1.1);
		})
		this.btn_move.onReleased.add(() => {
			this.btn_move.renderScale = this.btn_move["preScale"];
		})
		
		
	
		this.btn_detail.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BagOperate_UI_btn_detail");
		})
		this.initLanguage(this.btn_detail);
		this.btn_detail.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_detail.onPressed.add(() => {
			this.btn_detail["preScale"] = this.btn_detail.renderScale;
			this.btn_detail.renderScale = Vector2.one.set(this.btn_detail["preScale"]).multiply(1.1);
		})
		this.btn_detail.onReleased.add(() => {
			this.btn_detail.renderScale = this.btn_detail["preScale"];
		})
		
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_name)
		
	
		this.initLanguage(this.text_introduce)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BagOperate_UI'] = BagOperate_UI_Generate;