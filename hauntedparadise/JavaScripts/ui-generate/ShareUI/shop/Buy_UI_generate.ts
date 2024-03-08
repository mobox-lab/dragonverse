
 

 @UIBind('UI/ShareUI/shop/Buy_UI.ui')
 export default class Buy_UI_Generate extends UIScript {
	 	private btn_screen_Internal: mw.Button
	public get btn_screen(): mw.Button {
		if(!this.btn_screen_Internal&&this.uiWidgetBase) {
			this.btn_screen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_screen') as mw.Button
		}
		return this.btn_screen_Internal
	}
	private canvas_buy_Internal: mw.Canvas
	public get canvas_buy(): mw.Canvas {
		if(!this.canvas_buy_Internal&&this.uiWidgetBase) {
			this.canvas_buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy') as mw.Canvas
		}
		return this.canvas_buy_Internal
	}
	private canvas_buydetail_Internal: mw.Canvas
	public get canvas_buydetail(): mw.Canvas {
		if(!this.canvas_buydetail_Internal&&this.uiWidgetBase) {
			this.canvas_buydetail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail') as mw.Canvas
		}
		return this.canvas_buydetail_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private img_bg1_1_Internal: mw.Image
	public get img_bg1_1(): mw.Image {
		if(!this.img_bg1_1_Internal&&this.uiWidgetBase) {
			this.img_bg1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/img_bg1_1') as mw.Image
		}
		return this.img_bg1_1_Internal
	}
	private img_bg1_2_Internal: mw.Image
	public get img_bg1_2(): mw.Image {
		if(!this.img_bg1_2_Internal&&this.uiWidgetBase) {
			this.img_bg1_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/img_bg1_2') as mw.Image
		}
		return this.img_bg1_2_Internal
	}
	private text_buytitle_Internal: mw.TextBlock
	public get text_buytitle(): mw.TextBlock {
		if(!this.text_buytitle_Internal&&this.uiWidgetBase) {
			this.text_buytitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/text_buytitle') as mw.TextBlock
		}
		return this.text_buytitle_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private img_br_Internal: mw.Image
	public get img_br(): mw.Image {
		if(!this.img_br_Internal&&this.uiWidgetBase) {
			this.img_br_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/img_br') as mw.Image
		}
		return this.img_br_Internal
	}
	private canvas_item_Internal: mw.Canvas
	public get canvas_item(): mw.Canvas {
		if(!this.canvas_item_Internal&&this.uiWidgetBase) {
			this.canvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_item') as mw.Canvas
		}
		return this.canvas_item_Internal
	}
	private img_bg3_Internal: mw.Image
	public get img_bg3(): mw.Image {
		if(!this.img_bg3_Internal&&this.uiWidgetBase) {
			this.img_bg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_item/img_bg3') as mw.Image
		}
		return this.img_bg3_Internal
	}
	private img_itembg_Internal: mw.Image
	public get img_itembg(): mw.Image {
		if(!this.img_itembg_Internal&&this.uiWidgetBase) {
			this.img_itembg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_item/img_itembg') as mw.Image
		}
		return this.img_itembg_Internal
	}
	private img_icon_Internal: mw.Image
	public get img_icon(): mw.Image {
		if(!this.img_icon_Internal&&this.uiWidgetBase) {
			this.img_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_item/img_icon') as mw.Image
		}
		return this.img_icon_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private text_desc_Internal: mw.TextBlock
	public get text_desc(): mw.TextBlock {
		if(!this.text_desc_Internal&&this.uiWidgetBase) {
			this.text_desc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/text_desc') as mw.TextBlock
		}
		return this.text_desc_Internal
	}
	private text_limit_Internal: mw.TextBlock
	public get text_limit(): mw.TextBlock {
		if(!this.text_limit_Internal&&this.uiWidgetBase) {
			this.text_limit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/text_limit') as mw.TextBlock
		}
		return this.text_limit_Internal
	}
	private canvas_detail_Internal: mw.Canvas
	public get canvas_detail(): mw.Canvas {
		if(!this.canvas_detail_Internal&&this.uiWidgetBase) {
			this.canvas_detail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_detail') as mw.Canvas
		}
		return this.canvas_detail_Internal
	}
	private img_bg2_Internal: mw.Image
	public get img_bg2(): mw.Image {
		if(!this.img_bg2_Internal&&this.uiWidgetBase) {
			this.img_bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_detail/img_bg2') as mw.Image
		}
		return this.img_bg2_Internal
	}
	private btn_max_Internal: mw.Button
	public get btn_max(): mw.Button {
		if(!this.btn_max_Internal&&this.uiWidgetBase) {
			this.btn_max_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_detail/btn_max') as mw.Button
		}
		return this.btn_max_Internal
	}
	private text_max_Internal: mw.TextBlock
	public get text_max(): mw.TextBlock {
		if(!this.text_max_Internal&&this.uiWidgetBase) {
			this.text_max_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_detail/btn_max/text_max') as mw.TextBlock
		}
		return this.text_max_Internal
	}
	private text_buynum_Internal: mw.TextBlock
	public get text_buynum(): mw.TextBlock {
		if(!this.text_buynum_Internal&&this.uiWidgetBase) {
			this.text_buynum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_detail/text_buynum') as mw.TextBlock
		}
		return this.text_buynum_Internal
	}
	private btn_add_Internal: mw.Button
	public get btn_add(): mw.Button {
		if(!this.btn_add_Internal&&this.uiWidgetBase) {
			this.btn_add_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_detail/btn_add') as mw.Button
		}
		return this.btn_add_Internal
	}
	private btn_minus_Internal: mw.Button
	public get btn_minus(): mw.Button {
		if(!this.btn_minus_Internal&&this.uiWidgetBase) {
			this.btn_minus_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_detail/btn_minus') as mw.Button
		}
		return this.btn_minus_Internal
	}
	private canvas_confirm_Internal: mw.Canvas
	public get canvas_confirm(): mw.Canvas {
		if(!this.canvas_confirm_Internal&&this.uiWidgetBase) {
			this.canvas_confirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_confirm') as mw.Canvas
		}
		return this.canvas_confirm_Internal
	}
	private btn_buy_Internal: mw.Button
	public get btn_buy(): mw.Button {
		if(!this.btn_buy_Internal&&this.uiWidgetBase) {
			this.btn_buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_confirm/btn_buy') as mw.Button
		}
		return this.btn_buy_Internal
	}
	private text_buy_Internal: mw.TextBlock
	public get text_buy(): mw.TextBlock {
		if(!this.text_buy_Internal&&this.uiWidgetBase) {
			this.text_buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_confirm/text_buy') as mw.TextBlock
		}
		return this.text_buy_Internal
	}
	private img_moneyicon_Internal: mw.Image
	public get img_moneyicon(): mw.Image {
		if(!this.img_moneyicon_Internal&&this.uiWidgetBase) {
			this.img_moneyicon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_confirm/Canvas/img_moneyicon') as mw.Image
		}
		return this.img_moneyicon_Internal
	}
	private text_moneynum_Internal: mw.TextBlock
	public get text_moneynum(): mw.TextBlock {
		if(!this.text_moneynum_Internal&&this.uiWidgetBase) {
			this.text_moneynum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_confirm/Canvas/text_moneynum') as mw.TextBlock
		}
		return this.text_moneynum_Internal
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
		
		this.btn_screen.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Buy_UI_btn_screen");
		})
		this.btn_screen.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_screen.onPressed.add(() => {
			this.btn_screen["preScale"] = this.btn_screen.renderScale;
			this.btn_screen.renderScale = Vector2.one.set(this.btn_screen["preScale"]).multiply(1.1);
		})
		this.btn_screen.onReleased.add(() => {
			this.btn_screen.renderScale = this.btn_screen["preScale"];
		})
		
	
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Buy_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.btn_max.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Buy_UI_btn_max");
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
			Event.dispatchToLocal("PlayButtonClick", "Buy_UI_btn_add");
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
			Event.dispatchToLocal("PlayButtonClick", "Buy_UI_btn_minus");
		})
		this.btn_minus.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_minus.onPressed.add(() => {
			this.btn_minus["preScale"] = this.btn_minus.renderScale;
			this.btn_minus.renderScale = Vector2.one.set(this.btn_minus["preScale"]).multiply(1.1);
		})
		this.btn_minus.onReleased.add(() => {
			this.btn_minus.renderScale = this.btn_minus["preScale"];
		})
		
	
		this.btn_buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Buy_UI_btn_buy");
		})
		this.btn_buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_buy.onPressed.add(() => {
			this.btn_buy["preScale"] = this.btn_buy.renderScale;
			this.btn_buy.renderScale = Vector2.one.set(this.btn_buy["preScale"]).multiply(1.1);
		})
		this.btn_buy.onReleased.add(() => {
			this.btn_buy.renderScale = this.btn_buy["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_buytitle)
		
	
		this.initLanguage(this.text_name)
		
	
		this.initLanguage(this.text_desc)
		
	
		this.initLanguage(this.text_limit)
		
	
		this.initLanguage(this.text_max)
		
	
		this.initLanguage(this.text_buynum)
		
	
		this.initLanguage(this.text_buy)
		
	
		this.initLanguage(this.text_moneynum)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Buy_UI'] = Buy_UI_Generate;