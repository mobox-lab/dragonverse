
 

 @UIBind('UI/ShareUI/props/GiftBagOpen_UI.ui')
 export default class GiftBagOpen_UI_Generate extends UIScript {
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
	private text_tips2_Internal: mw.TextBlock
	public get text_tips2(): mw.TextBlock {
		if(!this.text_tips2_Internal&&this.uiWidgetBase) {
			this.text_tips2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/text_tips2') as mw.TextBlock
		}
		return this.text_tips2_Internal
	}
	private text_title_Internal: mw.TextBlock
	public get text_title(): mw.TextBlock {
		if(!this.text_title_Internal&&this.uiWidgetBase) {
			this.text_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/text_title') as mw.TextBlock
		}
		return this.text_title_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/btn_back') as mw.Button
		}
		return this.btn_back_Internal
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
	private text_num1_Internal: mw.TextBlock
	public get text_num1(): mw.TextBlock {
		if(!this.text_num1_Internal&&this.uiWidgetBase) {
			this.text_num1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/btn_openAll/text_num1') as mw.TextBlock
		}
		return this.text_num1_Internal
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
	private img_skip1_Internal: mw.Image
	public get img_skip1(): mw.Image {
		if(!this.img_skip1_Internal&&this.uiWidgetBase) {
			this.img_skip1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/img_skip1') as mw.Image
		}
		return this.img_skip1_Internal
	}
	private btn_skip2_Internal: mw.Button
	public get btn_skip2(): mw.Button {
		if(!this.btn_skip2_Internal&&this.uiWidgetBase) {
			this.btn_skip2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/btn_skip2') as mw.Button
		}
		return this.btn_skip2_Internal
	}
	private text_skip_Internal: mw.TextBlock
	public get text_skip(): mw.TextBlock {
		if(!this.text_skip_Internal&&this.uiWidgetBase) {
			this.text_skip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/text_skip') as mw.TextBlock
		}
		return this.text_skip_Internal
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
			Event.dispatchToLocal("PlayButtonClick", "GiftBagOpen_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.btn_open.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GiftBagOpen_UI_btn_open");
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
			Event.dispatchToLocal("PlayButtonClick", "GiftBagOpen_UI_btn_openAll");
		})
		this.btn_openAll.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_openAll.onPressed.add(() => {
			this.btn_openAll["preScale"] = this.btn_openAll.renderScale;
			this.btn_openAll.renderScale = Vector2.one.set(this.btn_openAll["preScale"]).multiply(1.1);
		})
		this.btn_openAll.onReleased.add(() => {
			this.btn_openAll.renderScale = this.btn_openAll["preScale"];
		})
		
	
		this.btn_skip2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GiftBagOpen_UI_btn_skip2");
		})
		this.btn_skip2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_skip2.onPressed.add(() => {
			this.btn_skip2["preScale"] = this.btn_skip2.renderScale;
			this.btn_skip2.renderScale = Vector2.one.set(this.btn_skip2["preScale"]).multiply(1.1);
		})
		this.btn_skip2.onReleased.add(() => {
			this.btn_skip2.renderScale = this.btn_skip2["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_tips1)
		
	
		this.initLanguage(this.text_tips2)
		
	
		this.initLanguage(this.text_title)
		
	
		this.initLanguage(this.text_open)
		
	
		this.initLanguage(this.text_openAll)
		
	
		this.initLanguage(this.text_num1)
		
	
		this.initLanguage(this.text_have)
		
	
		this.initLanguage(this.text_num2)
		
	
		this.initLanguage(this.text_skip)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_GiftBagOpen_UI'] = GiftBagOpen_UI_Generate;