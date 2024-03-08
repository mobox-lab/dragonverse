
 

 @UIBind('UI/ShareUI/treasureBox/PrizeItem_UI.ui')
 export default class PrizeItem_UI_Generate extends UIScript {
	 	private canvas_item_Internal: mw.Canvas
	public get canvas_item(): mw.Canvas {
		if(!this.canvas_item_Internal&&this.uiWidgetBase) {
			this.canvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item') as mw.Canvas
		}
		return this.canvas_item_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private canvas_icon_Internal: mw.Canvas
	public get canvas_icon(): mw.Canvas {
		if(!this.canvas_icon_Internal&&this.uiWidgetBase) {
			this.canvas_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/canvas_icon') as mw.Canvas
		}
		return this.canvas_icon_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/canvas_icon/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private img_bg2_Internal: mw.Image
	public get img_bg2(): mw.Image {
		if(!this.img_bg2_Internal&&this.uiWidgetBase) {
			this.img_bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/canvas_icon/img_bg2') as mw.Image
		}
		return this.img_bg2_Internal
	}
	private img_icon_Internal: mw.Image
	public get img_icon(): mw.Image {
		if(!this.img_icon_Internal&&this.uiWidgetBase) {
			this.img_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/canvas_icon/img_icon') as mw.Image
		}
		return this.img_icon_Internal
	}
	private text_num_Internal: mw.TextBlock
	public get text_num(): mw.TextBlock {
		if(!this.text_num_Internal&&this.uiWidgetBase) {
			this.text_num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/text_num') as mw.TextBlock
		}
		return this.text_num_Internal
	}
	private btn_detail_Internal: mw.Button
	public get btn_detail(): mw.Button {
		if(!this.btn_detail_Internal&&this.uiWidgetBase) {
			this.btn_detail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/btn_detail') as mw.Button
		}
		return this.btn_detail_Internal
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
		
		this.btn_detail.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "PrizeItem_UI_btn_detail");
		})
		this.btn_detail.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_detail.onPressed.add(() => {
			this.btn_detail["preScale"] = this.btn_detail.renderScale;
			this.btn_detail.renderScale = Vector2.one.set(this.btn_detail["preScale"]).multiply(1.1);
		})
		this.btn_detail.onReleased.add(() => {
			this.btn_detail.renderScale = this.btn_detail["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_name)
		
	
		this.initLanguage(this.text_num)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_PrizeItem_UI'] = PrizeItem_UI_Generate;