
 

 @UIBind('UI/ShareUI/props/ExpCard_UI.ui')
 export default class ExpCard_UI_Generate extends UIScript {
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
	private img_bg2_Internal: mw.Image
	public get img_bg2(): mw.Image {
		if(!this.img_bg2_Internal&&this.uiWidgetBase) {
			this.img_bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/img_bg2') as mw.Image
		}
		return this.img_bg2_Internal
	}
	private img_bg3_Internal: mw.Image
	public get img_bg3(): mw.Image {
		if(!this.img_bg3_Internal&&this.uiWidgetBase) {
			this.img_bg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/img_bg3') as mw.Image
		}
		return this.img_bg3_Internal
	}
	private text_title_Internal: mw.TextBlock
	public get text_title(): mw.TextBlock {
		if(!this.text_title_Internal&&this.uiWidgetBase) {
			this.text_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/text_title') as mw.TextBlock
		}
		return this.text_title_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private canvas_item_Internal: mw.Canvas
	public get canvas_item(): mw.Canvas {
		if(!this.canvas_item_Internal&&this.uiWidgetBase) {
			this.canvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_item') as mw.Canvas
		}
		return this.canvas_item_Internal
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
	private text_num_Internal: mw.TextBlock
	public get text_num(): mw.TextBlock {
		if(!this.text_num_Internal&&this.uiWidgetBase) {
			this.text_num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/text_num') as mw.TextBlock
		}
		return this.text_num_Internal
	}
	private canvas_detail_Internal: mw.Canvas
	public get canvas_detail(): mw.Canvas {
		if(!this.canvas_detail_Internal&&this.uiWidgetBase) {
			this.canvas_detail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_detail') as mw.Canvas
		}
		return this.canvas_detail_Internal
	}
	private img_bg0_Internal: mw.Image
	public get img_bg0(): mw.Image {
		if(!this.img_bg0_Internal&&this.uiWidgetBase) {
			this.img_bg0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_detail/img_bg0') as mw.Image
		}
		return this.img_bg0_Internal
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
	private text_limit_Internal: mw.TextBlock
	public get text_limit(): mw.TextBlock {
		if(!this.text_limit_Internal&&this.uiWidgetBase) {
			this.text_limit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/canvas_detail/text_limit') as mw.TextBlock
		}
		return this.text_limit_Internal
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
	private btn_use_Internal: mw.Button
	public get btn_use(): mw.Button {
		if(!this.btn_use_Internal&&this.uiWidgetBase) {
			this.btn_use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/btn_use') as mw.Button
		}
		return this.btn_use_Internal
	}
	private text_use_Internal: mw.TextBlock
	public get text_use(): mw.TextBlock {
		if(!this.text_use_Internal&&this.uiWidgetBase) {
			this.text_use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/btn_use/text_use') as mw.TextBlock
		}
		return this.text_use_Internal
	}
	private text_tips_Internal: mw.TextBlock
	public get text_tips(): mw.TextBlock {
		if(!this.text_tips_Internal&&this.uiWidgetBase) {
			this.text_tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/canvas_buydetail/text_tips') as mw.TextBlock
		}
		return this.text_tips_Internal
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
			Event.dispatchToLocal("PlayButtonClick", "ExpCard_UI_btn_back");
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
			Event.dispatchToLocal("PlayButtonClick", "ExpCard_UI_btn_max");
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
			Event.dispatchToLocal("PlayButtonClick", "ExpCard_UI_btn_add");
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
			Event.dispatchToLocal("PlayButtonClick", "ExpCard_UI_btn_minus");
		})
		this.btn_minus.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_minus.onPressed.add(() => {
			this.btn_minus["preScale"] = this.btn_minus.renderScale;
			this.btn_minus.renderScale = Vector2.one.set(this.btn_minus["preScale"]).multiply(1.1);
		})
		this.btn_minus.onReleased.add(() => {
			this.btn_minus.renderScale = this.btn_minus["preScale"];
		})
		
	
		this.btn_use.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ExpCard_UI_btn_use");
		})
		this.btn_use.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_use.onPressed.add(() => {
			this.btn_use["preScale"] = this.btn_use.renderScale;
			this.btn_use.renderScale = Vector2.one.set(this.btn_use["preScale"]).multiply(1.1);
		})
		this.btn_use.onReleased.add(() => {
			this.btn_use.renderScale = this.btn_use["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_title)
		
	
		this.initLanguage(this.text_name)
		
	
		this.initLanguage(this.text_num)
		
	
		this.initLanguage(this.text_max)
		
	
		this.initLanguage(this.text_limit)
		
	
		this.initLanguage(this.text_use)
		
	
		this.initLanguage(this.text_tips)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_ExpCard_UI'] = ExpCard_UI_Generate;