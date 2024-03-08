
 

 @UIBind('UI/ShareUI/shop/ShopDetail_UI.ui')
 export default class ShopDetail_UI_Generate extends UIScript {
	 	private canvas_detail_Internal: mw.Canvas
	public get canvas_detail(): mw.Canvas {
		if(!this.canvas_detail_Internal&&this.uiWidgetBase) {
			this.canvas_detail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_detail') as mw.Canvas
		}
		return this.canvas_detail_Internal
	}
	private img_bg_1_Internal: mw.Image
	public get img_bg_1(): mw.Image {
		if(!this.img_bg_1_Internal&&this.uiWidgetBase) {
			this.img_bg_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_detail/img_bg_1') as mw.Image
		}
		return this.img_bg_1_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_detail/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private canvas_item_Internal: mw.Canvas
	public get canvas_item(): mw.Canvas {
		if(!this.canvas_item_Internal&&this.uiWidgetBase) {
			this.canvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_detail/canvas_item') as mw.Canvas
		}
		return this.canvas_item_Internal
	}
	private img_iconquality_Internal: mw.Image
	public get img_iconquality(): mw.Image {
		if(!this.img_iconquality_Internal&&this.uiWidgetBase) {
			this.img_iconquality_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_detail/canvas_item/img_iconquality') as mw.Image
		}
		return this.img_iconquality_Internal
	}
	private img_itemicon_Internal: mw.Image
	public get img_itemicon(): mw.Image {
		if(!this.img_itemicon_Internal&&this.uiWidgetBase) {
			this.img_itemicon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_detail/canvas_item/img_itemicon') as mw.Image
		}
		return this.img_itemicon_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_detail/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private img_br_Internal: mw.Image
	public get img_br(): mw.Image {
		if(!this.img_br_Internal&&this.uiWidgetBase) {
			this.img_br_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_detail/img_br') as mw.Image
		}
		return this.img_br_Internal
	}
	private text_introduce_Internal: mw.TextBlock
	public get text_introduce(): mw.TextBlock {
		if(!this.text_introduce_Internal&&this.uiWidgetBase) {
			this.text_introduce_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_detail/text_introduce') as mw.TextBlock
		}
		return this.text_introduce_Internal
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

UIService['UI_ShopDetail_UI'] = ShopDetail_UI_Generate;