
 

 @UIBind('UI/ShareUI/props/BuyGiftBag_UI.ui')
 export default class BuyGiftBag_UI_Generate extends UIScript {
	 	private canvas_buyGift_Internal: mw.Canvas
	public get canvas_buyGift(): mw.Canvas {
		if(!this.canvas_buyGift_Internal&&this.uiWidgetBase) {
			this.canvas_buyGift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift') as mw.Canvas
		}
		return this.canvas_buyGift_Internal
	}
	private img_bg_2_Internal: mw.Image
	public get img_bg_2(): mw.Image {
		if(!this.img_bg_2_Internal&&this.uiWidgetBase) {
			this.img_bg_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/img_bg_2') as mw.Image
		}
		return this.img_bg_2_Internal
	}
	private img_bg_1_Internal: mw.Image
	public get img_bg_1(): mw.Image {
		if(!this.img_bg_1_Internal&&this.uiWidgetBase) {
			this.img_bg_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/img_bg_1') as mw.Image
		}
		return this.img_bg_1_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private img_gift_Internal: mw.Image
	public get img_gift(): mw.Image {
		if(!this.img_gift_Internal&&this.uiWidgetBase) {
			this.img_gift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/img_gift') as mw.Image
		}
		return this.img_gift_Internal
	}
	private text_num_Internal: mw.TextBlock
	public get text_num(): mw.TextBlock {
		if(!this.text_num_Internal&&this.uiWidgetBase) {
			this.text_num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/text_num') as mw.TextBlock
		}
		return this.text_num_Internal
	}
	private text_question_Internal: mw.TextBlock
	public get text_question(): mw.TextBlock {
		if(!this.text_question_Internal&&this.uiWidgetBase) {
			this.text_question_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/text_question') as mw.TextBlock
		}
		return this.text_question_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private btn_buyItem_Internal: mw.Button
	public get btn_buyItem(): mw.Button {
		if(!this.btn_buyItem_Internal&&this.uiWidgetBase) {
			this.btn_buyItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/btn_buyItem') as mw.Button
		}
		return this.btn_buyItem_Internal
	}
	private text_buy_Internal: mw.TextBlock
	public get text_buy(): mw.TextBlock {
		if(!this.text_buy_Internal&&this.uiWidgetBase) {
			this.text_buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/btn_buyItem/text_buy') as mw.TextBlock
		}
		return this.text_buy_Internal
	}
	private img_coin2_Internal: mw.Image
	public get img_coin2(): mw.Image {
		if(!this.img_coin2_Internal&&this.uiWidgetBase) {
			this.img_coin2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/img_coin2') as mw.Image
		}
		return this.img_coin2_Internal
	}
	private text_num_1_Internal: mw.TextBlock
	public get text_num_1(): mw.TextBlock {
		if(!this.text_num_1_Internal&&this.uiWidgetBase) {
			this.text_num_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/text_num_1') as mw.TextBlock
		}
		return this.text_num_1_Internal
	}
	private btn_no_Internal: mw.Button
	public get btn_no(): mw.Button {
		if(!this.btn_no_Internal&&this.uiWidgetBase) {
			this.btn_no_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/btn_no') as mw.Button
		}
		return this.btn_no_Internal
	}
	private text_no_Internal: mw.TextBlock
	public get text_no(): mw.TextBlock {
		if(!this.text_no_Internal&&this.uiWidgetBase) {
			this.text_no_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/btn_no/text_no') as mw.TextBlock
		}
		return this.text_no_Internal
	}
	private canvas_detail_Internal: mw.Canvas
	public get canvas_detail(): mw.Canvas {
		if(!this.canvas_detail_Internal&&this.uiWidgetBase) {
			this.canvas_detail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/canvas_detail') as mw.Canvas
		}
		return this.canvas_detail_Internal
	}
	private img_bg0_Internal: mw.Image
	public get img_bg0(): mw.Image {
		if(!this.img_bg0_Internal&&this.uiWidgetBase) {
			this.img_bg0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/canvas_detail/img_bg0') as mw.Image
		}
		return this.img_bg0_Internal
	}
	private btn_max_Internal: mw.Button
	public get btn_max(): mw.Button {
		if(!this.btn_max_Internal&&this.uiWidgetBase) {
			this.btn_max_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/canvas_detail/btn_max') as mw.Button
		}
		return this.btn_max_Internal
	}
	private text_max_Internal: mw.TextBlock
	public get text_max(): mw.TextBlock {
		if(!this.text_max_Internal&&this.uiWidgetBase) {
			this.text_max_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/canvas_detail/btn_max/text_max') as mw.TextBlock
		}
		return this.text_max_Internal
	}
	private text_limit_Internal: mw.TextBlock
	public get text_limit(): mw.TextBlock {
		if(!this.text_limit_Internal&&this.uiWidgetBase) {
			this.text_limit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/canvas_detail/text_limit') as mw.TextBlock
		}
		return this.text_limit_Internal
	}
	private btn_add_Internal: mw.Button
	public get btn_add(): mw.Button {
		if(!this.btn_add_Internal&&this.uiWidgetBase) {
			this.btn_add_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/canvas_detail/btn_add') as mw.Button
		}
		return this.btn_add_Internal
	}
	private btn_minus_Internal: mw.Button
	public get btn_minus(): mw.Button {
		if(!this.btn_minus_Internal&&this.uiWidgetBase) {
			this.btn_minus_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buyGift/canvas_detail/btn_minus') as mw.Button
		}
		return this.btn_minus_Internal
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
			Event.dispatchToLocal("PlayButtonClick", "BuyGiftBag_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.btn_buyItem.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuyGiftBag_UI_btn_buyItem");
		})
		this.btn_buyItem.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_buyItem.onPressed.add(() => {
			this.btn_buyItem["preScale"] = this.btn_buyItem.renderScale;
			this.btn_buyItem.renderScale = Vector2.one.set(this.btn_buyItem["preScale"]).multiply(1.1);
		})
		this.btn_buyItem.onReleased.add(() => {
			this.btn_buyItem.renderScale = this.btn_buyItem["preScale"];
		})
		
	
		this.btn_no.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuyGiftBag_UI_btn_no");
		})
		this.btn_no.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_no.onPressed.add(() => {
			this.btn_no["preScale"] = this.btn_no.renderScale;
			this.btn_no.renderScale = Vector2.one.set(this.btn_no["preScale"]).multiply(1.1);
		})
		this.btn_no.onReleased.add(() => {
			this.btn_no.renderScale = this.btn_no["preScale"];
		})
		
	
		this.btn_max.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuyGiftBag_UI_btn_max");
		})
		this.btn_max.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_max.onPressed.add(() => {
			this.btn_max["preScale"] = this.btn_max.renderScale;
			this.btn_max.renderScale = Vector2.one.set(this.btn_max["preScale"]).multiply(1.1);
		})
		this.btn_max.onReleased.add(() => {
			this.btn_max.renderScale = this.btn_max["preScale"];
		})
		
	
		this.btn_add.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuyGiftBag_UI_btn_add");
		})
		this.btn_add.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_add.onPressed.add(() => {
			this.btn_add["preScale"] = this.btn_add.renderScale;
			this.btn_add.renderScale = Vector2.one.set(this.btn_add["preScale"]).multiply(1.1);
		})
		this.btn_add.onReleased.add(() => {
			this.btn_add.renderScale = this.btn_add["preScale"];
		})
		
	
		this.btn_minus.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuyGiftBag_UI_btn_minus");
		})
		this.btn_minus.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_minus.onPressed.add(() => {
			this.btn_minus["preScale"] = this.btn_minus.renderScale;
			this.btn_minus.renderScale = Vector2.one.set(this.btn_minus["preScale"]).multiply(1.1);
		})
		this.btn_minus.onReleased.add(() => {
			this.btn_minus.renderScale = this.btn_minus["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_num)
		
	
		this.initLanguage(this.text_question)
		
	
		this.initLanguage(this.text_buy)
		
	
		this.initLanguage(this.text_num_1)
		
	
		this.initLanguage(this.text_no)
		
	
		this.initLanguage(this.text_max)
		
	
		this.initLanguage(this.text_limit)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BuyGiftBag_UI'] = BuyGiftBag_UI_Generate;