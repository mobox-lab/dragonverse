
 

 @UIBind('UI/ShareUI/shop/GiftDetail_UI.ui')
 export default class GiftDetail_UI_Generate extends UIScript {
	 	private canvas_details_Internal: mw.Canvas
	public get canvas_details(): mw.Canvas {
		if(!this.canvas_details_Internal&&this.uiWidgetBase) {
			this.canvas_details_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_details') as mw.Canvas
		}
		return this.canvas_details_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_details/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private img_br_Internal: mw.Image
	public get img_br(): mw.Image {
		if(!this.img_br_Internal&&this.uiWidgetBase) {
			this.img_br_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_details/img_br') as mw.Image
		}
		return this.img_br_Internal
	}
	private canvas_detail_Internal: mw.Canvas
	public get canvas_detail(): mw.Canvas {
		if(!this.canvas_detail_Internal&&this.uiWidgetBase) {
			this.canvas_detail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_details/canvas_detail') as mw.Canvas
		}
		return this.canvas_detail_Internal
	}
	private canvas_item_Internal: mw.Canvas
	public get canvas_item(): mw.Canvas {
		if(!this.canvas_item_Internal&&this.uiWidgetBase) {
			this.canvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_details/canvas_detail/ScrollBox/canvas_item') as mw.Canvas
		}
		return this.canvas_item_Internal
	}
	private text_itemdetail_Internal: mw.TextBlock
	public get text_itemdetail(): mw.TextBlock {
		if(!this.text_itemdetail_Internal&&this.uiWidgetBase) {
			this.text_itemdetail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_details/canvas_detail/text_itemdetail') as mw.TextBlock
		}
		return this.text_itemdetail_Internal
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
		
	
		this.initLanguage(this.text_itemdetail)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_details/TextBlock") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_GiftDetail_UI'] = GiftDetail_UI_Generate;