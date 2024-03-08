
 

 @UIBind('UI/ShareUI/shop/GiftItem_UI.ui')
 export default class GiftItem_UI_Generate extends UIScript {
	 	private canvas_giftitem_Internal: mw.Canvas
	public get canvas_giftitem(): mw.Canvas {
		if(!this.canvas_giftitem_Internal&&this.uiWidgetBase) {
			this.canvas_giftitem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftitem') as mw.Canvas
		}
		return this.canvas_giftitem_Internal
	}
	private img_black_Internal: mw.Image
	public get img_black(): mw.Image {
		if(!this.img_black_Internal&&this.uiWidgetBase) {
			this.img_black_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftitem/img_black') as mw.Image
		}
		return this.img_black_Internal
	}
	private btn_itempick_Internal: mw.Button
	public get btn_itempick(): mw.Button {
		if(!this.btn_itempick_Internal&&this.uiWidgetBase) {
			this.btn_itempick_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftitem/btn_itempick') as mw.Button
		}
		return this.btn_itempick_Internal
	}
	private img_itembg_Internal: mw.Image
	public get img_itembg(): mw.Image {
		if(!this.img_itembg_Internal&&this.uiWidgetBase) {
			this.img_itembg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftitem/img_itembg') as mw.Image
		}
		return this.img_itembg_Internal
	}
	private img_itemicon_Internal: mw.Image
	public get img_itemicon(): mw.Image {
		if(!this.img_itemicon_Internal&&this.uiWidgetBase) {
			this.img_itemicon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftitem/img_itemicon') as mw.Image
		}
		return this.img_itemicon_Internal
	}
	private text_price_Internal: mw.TextBlock
	public get text_price(): mw.TextBlock {
		if(!this.text_price_Internal&&this.uiWidgetBase) {
			this.text_price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftitem/text_price') as mw.TextBlock
		}
		return this.text_price_Internal
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
		
		this.btn_itempick.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GiftItem_UI_btn_itempick");
		})
		this.btn_itempick.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_itempick.onPressed.add(() => {
			this.btn_itempick["preScale"] = this.btn_itempick.renderScale;
			this.btn_itempick.renderScale = Vector2.one.set(this.btn_itempick["preScale"]).multiply(1.1);
		})
		this.btn_itempick.onReleased.add(() => {
			this.btn_itempick.renderScale = this.btn_itempick["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_price)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_GiftItem_UI'] = GiftItem_UI_Generate;