
 

 @UIBind('UI/ShareUI/props/GiftBagNum_UI.ui')
 export default class GiftBagNum_UI_Generate extends UIScript {
	 	private canvas_giftBag_Internal: mw.Canvas
	public get canvas_giftBag(): mw.Canvas {
		if(!this.canvas_giftBag_Internal&&this.uiWidgetBase) {
			this.canvas_giftBag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag') as mw.Canvas
		}
		return this.canvas_giftBag_Internal
	}
	private img_bg_2_Internal: mw.Image
	public get img_bg_2(): mw.Image {
		if(!this.img_bg_2_Internal&&this.uiWidgetBase) {
			this.img_bg_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/img_bg_2') as mw.Image
		}
		return this.img_bg_2_Internal
	}
	private img_bg_1_Internal: mw.Image
	public get img_bg_1(): mw.Image {
		if(!this.img_bg_1_Internal&&this.uiWidgetBase) {
			this.img_bg_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/img_bg_1') as mw.Image
		}
		return this.img_bg_1_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private text_tips1_Internal: mw.TextBlock
	public get text_tips1(): mw.TextBlock {
		if(!this.text_tips1_Internal&&this.uiWidgetBase) {
			this.text_tips1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/text_tips1') as mw.TextBlock
		}
		return this.text_tips1_Internal
	}
	private btn_open_Internal: mw.Button
	public get btn_open(): mw.Button {
		if(!this.btn_open_Internal&&this.uiWidgetBase) {
			this.btn_open_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/btn_open') as mw.Button
		}
		return this.btn_open_Internal
	}
	private text_open_Internal: mw.TextBlock
	public get text_open(): mw.TextBlock {
		if(!this.text_open_Internal&&this.uiWidgetBase) {
			this.text_open_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/btn_open/text_open') as mw.TextBlock
		}
		return this.text_open_Internal
	}
	private btn_openAll_Internal: mw.Button
	public get btn_openAll(): mw.Button {
		if(!this.btn_openAll_Internal&&this.uiWidgetBase) {
			this.btn_openAll_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/btn_openAll') as mw.Button
		}
		return this.btn_openAll_Internal
	}
	private text_openAll_Internal: mw.TextBlock
	public get text_openAll(): mw.TextBlock {
		if(!this.text_openAll_Internal&&this.uiWidgetBase) {
			this.text_openAll_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/btn_openAll/text_openAll') as mw.TextBlock
		}
		return this.text_openAll_Internal
	}
	private img_coin2_Internal: mw.Image
	public get img_coin2(): mw.Image {
		if(!this.img_coin2_Internal&&this.uiWidgetBase) {
			this.img_coin2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/img_coin2') as mw.Image
		}
		return this.img_coin2_Internal
	}
	private text_have_Internal: mw.TextBlock
	public get text_have(): mw.TextBlock {
		if(!this.text_have_Internal&&this.uiWidgetBase) {
			this.text_have_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/text_have') as mw.TextBlock
		}
		return this.text_have_Internal
	}
	private text_num2_Internal: mw.TextBlock
	public get text_num2(): mw.TextBlock {
		if(!this.text_num2_Internal&&this.uiWidgetBase) {
			this.text_num2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/text_num2') as mw.TextBlock
		}
		return this.text_num2_Internal
	}
	private img_coin1_Internal: mw.Image
	public get img_coin1(): mw.Image {
		if(!this.img_coin1_Internal&&this.uiWidgetBase) {
			this.img_coin1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/img_coin1') as mw.Image
		}
		return this.img_coin1_Internal
	}
	private canvas_detail_Internal: mw.Canvas
	public get canvas_detail(): mw.Canvas {
		if(!this.canvas_detail_Internal&&this.uiWidgetBase) {
			this.canvas_detail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/canvas_detail') as mw.Canvas
		}
		return this.canvas_detail_Internal
	}
	private img_bg0_Internal: mw.Image
	public get img_bg0(): mw.Image {
		if(!this.img_bg0_Internal&&this.uiWidgetBase) {
			this.img_bg0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/canvas_detail/img_bg0') as mw.Image
		}
		return this.img_bg0_Internal
	}
	private btn_max_Internal: mw.Button
	public get btn_max(): mw.Button {
		if(!this.btn_max_Internal&&this.uiWidgetBase) {
			this.btn_max_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/canvas_detail/btn_max') as mw.Button
		}
		return this.btn_max_Internal
	}
	private text_max_Internal: mw.TextBlock
	public get text_max(): mw.TextBlock {
		if(!this.text_max_Internal&&this.uiWidgetBase) {
			this.text_max_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/canvas_detail/btn_max/text_max') as mw.TextBlock
		}
		return this.text_max_Internal
	}
	private text_limit_Internal: mw.TextBlock
	public get text_limit(): mw.TextBlock {
		if(!this.text_limit_Internal&&this.uiWidgetBase) {
			this.text_limit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/canvas_detail/text_limit') as mw.TextBlock
		}
		return this.text_limit_Internal
	}
	private btn_add_Internal: mw.Button
	public get btn_add(): mw.Button {
		if(!this.btn_add_Internal&&this.uiWidgetBase) {
			this.btn_add_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/canvas_detail/btn_add') as mw.Button
		}
		return this.btn_add_Internal
	}
	private btn_minus_Internal: mw.Button
	public get btn_minus(): mw.Button {
		if(!this.btn_minus_Internal&&this.uiWidgetBase) {
			this.btn_minus_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/canvas_detail/btn_minus') as mw.Button
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
		
		this.btn_open.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GiftBagNum_UI_btn_open");
		})
		this.btn_open.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_open.onPressed.add(() => {
			this.btn_open["preScale"] = this.btn_open.renderScale;
			this.btn_open.renderScale = Vector2.one.set(this.btn_open["preScale"]).multiply(1.1);
		})
		this.btn_open.onReleased.add(() => {
			this.btn_open.renderScale = this.btn_open["preScale"];
		})
		
	
		this.btn_openAll.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GiftBagNum_UI_btn_openAll");
		})
		this.btn_openAll.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_openAll.onPressed.add(() => {
			this.btn_openAll["preScale"] = this.btn_openAll.renderScale;
			this.btn_openAll.renderScale = Vector2.one.set(this.btn_openAll["preScale"]).multiply(1.1);
		})
		this.btn_openAll.onReleased.add(() => {
			this.btn_openAll.renderScale = this.btn_openAll["preScale"];
		})
		
	
		this.btn_max.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GiftBagNum_UI_btn_max");
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
			Event.dispatchToLocal("PlayButtonClick", "GiftBagNum_UI_btn_add");
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
			Event.dispatchToLocal("PlayButtonClick", "GiftBagNum_UI_btn_minus");
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
		
		this.initLanguage(this.text_tips1)
		
	
		this.initLanguage(this.text_open)
		
	
		this.initLanguage(this.text_openAll)
		
	
		this.initLanguage(this.text_have)
		
	
		this.initLanguage(this.text_num2)
		
	
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

UIService['UI_GiftBagNum_UI'] = GiftBagNum_UI_Generate;