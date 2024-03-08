
 

 @UIBind('UI/ShareUI/card/CardGiftItem_UI.ui')
 export default class CardGiftItem_UI_Generate extends UIScript {
	 	private canvas_giftItem_Internal: mw.Canvas
	public get canvas_giftItem(): mw.Canvas {
		if(!this.canvas_giftItem_Internal&&this.uiWidgetBase) {
			this.canvas_giftItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem') as mw.Canvas
		}
		return this.canvas_giftItem_Internal
	}
	private img_giftItemBg_Internal: mw.Image
	public get img_giftItemBg(): mw.Image {
		if(!this.img_giftItemBg_Internal&&this.uiWidgetBase) {
			this.img_giftItemBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/img_giftItemBg') as mw.Image
		}
		return this.img_giftItemBg_Internal
	}
	private img_giftItemBg_1_Internal: mw.Image
	public get img_giftItemBg_1(): mw.Image {
		if(!this.img_giftItemBg_1_Internal&&this.uiWidgetBase) {
			this.img_giftItemBg_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/img_giftItemBg_1') as mw.Image
		}
		return this.img_giftItemBg_1_Internal
	}
	private text_fireNum_Internal: mw.TextBlock
	public get text_fireNum(): mw.TextBlock {
		if(!this.text_fireNum_Internal&&this.uiWidgetBase) {
			this.text_fireNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/text_fireNum') as mw.TextBlock
		}
		return this.text_fireNum_Internal
	}
	private img_fire_Internal: mw.Image
	public get img_fire(): mw.Image {
		if(!this.img_fire_Internal&&this.uiWidgetBase) {
			this.img_fire_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/img_fire') as mw.Image
		}
		return this.img_fire_Internal
	}
	private img_giftItem_Internal: mw.Image
	public get img_giftItem(): mw.Image {
		if(!this.img_giftItem_Internal&&this.uiWidgetBase) {
			this.img_giftItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/img_giftItem') as mw.Image
		}
		return this.img_giftItem_Internal
	}
	private btn_giftChoose_Internal: mw.Button
	public get btn_giftChoose(): mw.Button {
		if(!this.btn_giftChoose_Internal&&this.uiWidgetBase) {
			this.btn_giftChoose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/btn_giftChoose') as mw.Button
		}
		return this.btn_giftChoose_Internal
	}
	private canvas_free_Internal: mw.Canvas
	public get canvas_free(): mw.Canvas {
		if(!this.canvas_free_Internal&&this.uiWidgetBase) {
			this.canvas_free_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/canvas_free') as mw.Canvas
		}
		return this.canvas_free_Internal
	}
	private text_free_Internal: mw.TextBlock
	public get text_free(): mw.TextBlock {
		if(!this.text_free_Internal&&this.uiWidgetBase) {
			this.text_free_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/canvas_free/text_free') as mw.TextBlock
		}
		return this.text_free_Internal
	}
	private canvas_coin1_Internal: mw.Canvas
	public get canvas_coin1(): mw.Canvas {
		if(!this.canvas_coin1_Internal&&this.uiWidgetBase) {
			this.canvas_coin1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/canvas_coin1') as mw.Canvas
		}
		return this.canvas_coin1_Internal
	}
	private text_coin1_Internal: mw.TextBlock
	public get text_coin1(): mw.TextBlock {
		if(!this.text_coin1_Internal&&this.uiWidgetBase) {
			this.text_coin1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/canvas_coin1/text_coin1') as mw.TextBlock
		}
		return this.text_coin1_Internal
	}
	private img_coin1_Internal: mw.Image
	public get img_coin1(): mw.Image {
		if(!this.img_coin1_Internal&&this.uiWidgetBase) {
			this.img_coin1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/canvas_coin1/img_coin1') as mw.Image
		}
		return this.img_coin1_Internal
	}
	private canvas_coin2_Internal: mw.Canvas
	public get canvas_coin2(): mw.Canvas {
		if(!this.canvas_coin2_Internal&&this.uiWidgetBase) {
			this.canvas_coin2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/canvas_coin2') as mw.Canvas
		}
		return this.canvas_coin2_Internal
	}
	private text_coin2_Internal: mw.TextBlock
	public get text_coin2(): mw.TextBlock {
		if(!this.text_coin2_Internal&&this.uiWidgetBase) {
			this.text_coin2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/canvas_coin2/text_coin2') as mw.TextBlock
		}
		return this.text_coin2_Internal
	}
	private img_coin2_Internal: mw.Image
	public get img_coin2(): mw.Image {
		if(!this.img_coin2_Internal&&this.uiWidgetBase) {
			this.img_coin2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/canvas_coin2/img_coin2') as mw.Image
		}
		return this.img_coin2_Internal
	}
	private canvas_buygift_Internal: mw.Canvas
	public get canvas_buygift(): mw.Canvas {
		if(!this.canvas_buygift_Internal&&this.uiWidgetBase) {
			this.canvas_buygift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift') as mw.Canvas
		}
		return this.canvas_buygift_Internal
	}
	private img_buyGiftBg_Internal: mw.Image
	public get img_buyGiftBg(): mw.Image {
		if(!this.img_buyGiftBg_Internal&&this.uiWidgetBase) {
			this.img_buyGiftBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/img_buyGiftBg') as mw.Image
		}
		return this.img_buyGiftBg_Internal
	}
	private text_soldtips2_Internal: mw.TextBlock
	public get text_soldtips2(): mw.TextBlock {
		if(!this.text_soldtips2_Internal&&this.uiWidgetBase) {
			this.text_soldtips2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/text_soldtips2') as mw.TextBlock
		}
		return this.text_soldtips2_Internal
	}
	private text_soldtips1_Internal: mw.TextBlock
	public get text_soldtips1(): mw.TextBlock {
		if(!this.text_soldtips1_Internal&&this.uiWidgetBase) {
			this.text_soldtips1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/text_soldtips1') as mw.TextBlock
		}
		return this.text_soldtips1_Internal
	}
	private btn_backToItem_Internal: mw.Button
	public get btn_backToItem(): mw.Button {
		if(!this.btn_backToItem_Internal&&this.uiWidgetBase) {
			this.btn_backToItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/btn_backToItem') as mw.Button
		}
		return this.btn_backToItem_Internal
	}
	private canvas_buyBg01_Internal: mw.Canvas
	public get canvas_buyBg01(): mw.Canvas {
		if(!this.canvas_buyBg01_Internal&&this.uiWidgetBase) {
			this.canvas_buyBg01_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/canvas_buyBg01') as mw.Canvas
		}
		return this.canvas_buyBg01_Internal
	}
	private btn_down_Internal: mw.Button
	public get btn_down(): mw.Button {
		if(!this.btn_down_Internal&&this.uiWidgetBase) {
			this.btn_down_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/canvas_buyBg01/btn_down') as mw.Button
		}
		return this.btn_down_Internal
	}
	private text_buyNum_Internal: mw.TextBlock
	public get text_buyNum(): mw.TextBlock {
		if(!this.text_buyNum_Internal&&this.uiWidgetBase) {
			this.text_buyNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/canvas_buyBg01/text_buyNum') as mw.TextBlock
		}
		return this.text_buyNum_Internal
	}
	private btn_up_Internal: mw.Button
	public get btn_up(): mw.Button {
		if(!this.btn_up_Internal&&this.uiWidgetBase) {
			this.btn_up_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/canvas_buyBg01/btn_up') as mw.Button
		}
		return this.btn_up_Internal
	}
	private btn_buyGift_Internal: mw.StaleButton
	public get btn_buyGift(): mw.StaleButton {
		if(!this.btn_buyGift_Internal&&this.uiWidgetBase) {
			this.btn_buyGift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/canvas_buyBg01/btn_buyGift') as mw.StaleButton
		}
		return this.btn_buyGift_Internal
	}
	private text_total0_Internal: mw.TextBlock
	public get text_total0(): mw.TextBlock {
		if(!this.text_total0_Internal&&this.uiWidgetBase) {
			this.text_total0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/canvas_buyBg01/text_total0') as mw.TextBlock
		}
		return this.text_total0_Internal
	}
	private text_haveNum_Internal: mw.TextBlock
	public get text_haveNum(): mw.TextBlock {
		if(!this.text_haveNum_Internal&&this.uiWidgetBase) {
			this.text_haveNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/canvas_buyBg01/text_haveNum') as mw.TextBlock
		}
		return this.text_haveNum_Internal
	}
	private canvas_buygiftFree_Internal: mw.Canvas
	public get canvas_buygiftFree(): mw.Canvas {
		if(!this.canvas_buygiftFree_Internal&&this.uiWidgetBase) {
			this.canvas_buygiftFree_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/canvas_buyBg01/canvas_buygiftFree') as mw.Canvas
		}
		return this.canvas_buygiftFree_Internal
	}
	private text_total1_Internal: mw.TextBlock
	public get text_total1(): mw.TextBlock {
		if(!this.text_total1_Internal&&this.uiWidgetBase) {
			this.text_total1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/canvas_buyBg01/canvas_buygiftFree/text_total1') as mw.TextBlock
		}
		return this.text_total1_Internal
	}
	private canvas_buygiftLebi_Internal: mw.Canvas
	public get canvas_buygiftLebi(): mw.Canvas {
		if(!this.canvas_buygiftLebi_Internal&&this.uiWidgetBase) {
			this.canvas_buygiftLebi_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/canvas_buyBg01/canvas_buygiftLebi') as mw.Canvas
		}
		return this.canvas_buygiftLebi_Internal
	}
	private text_total2_Internal: mw.TextBlock
	public get text_total2(): mw.TextBlock {
		if(!this.text_total2_Internal&&this.uiWidgetBase) {
			this.text_total2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/canvas_buyBg01/canvas_buygiftLebi/text_total2') as mw.TextBlock
		}
		return this.text_total2_Internal
	}
	private img_lebi0_Internal: mw.Image
	public get img_lebi0(): mw.Image {
		if(!this.img_lebi0_Internal&&this.uiWidgetBase) {
			this.img_lebi0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/canvas_buyBg01/canvas_buygiftLebi/img_lebi0') as mw.Image
		}
		return this.img_lebi0_Internal
	}
	private canvas_buygiftKong_Internal: mw.Canvas
	public get canvas_buygiftKong(): mw.Canvas {
		if(!this.canvas_buygiftKong_Internal&&this.uiWidgetBase) {
			this.canvas_buygiftKong_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/canvas_buyBg01/canvas_buygiftKong') as mw.Canvas
		}
		return this.canvas_buygiftKong_Internal
	}
	private text_total3_Internal: mw.TextBlock
	public get text_total3(): mw.TextBlock {
		if(!this.text_total3_Internal&&this.uiWidgetBase) {
			this.text_total3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/canvas_buyBg01/canvas_buygiftKong/text_total3') as mw.TextBlock
		}
		return this.text_total3_Internal
	}
	private img_kong0_Internal: mw.Image
	public get img_kong0(): mw.Image {
		if(!this.img_kong0_Internal&&this.uiWidgetBase) {
			this.img_kong0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buygift/canvas_buyBg01/canvas_buygiftKong/img_kong0') as mw.Image
		}
		return this.img_kong0_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btn_buyGift.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CardGiftItem_UI_btn_buyGift");
		})
		this.initLanguage(this.btn_buyGift);
		this.btn_buyGift.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_buyGift.onPressed.add(() => {
			this.btn_buyGift["preScale"] = this.btn_buyGift.renderScale;
			this.btn_buyGift.renderScale = Vector2.one.set(this.btn_buyGift["preScale"]).multiply(1.1);
		})
		this.btn_buyGift.onReleased.add(() => {
			this.btn_buyGift.renderScale = this.btn_buyGift["preScale"];
		})
		
		
	
		//按钮添加点击
		
		this.btn_giftChoose.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CardGiftItem_UI_btn_giftChoose");
		})
		this.btn_giftChoose.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_giftChoose.onPressed.add(() => {
			this.btn_giftChoose["preScale"] = this.btn_giftChoose.renderScale;
			this.btn_giftChoose.renderScale = Vector2.one.set(this.btn_giftChoose["preScale"]).multiply(1.1);
		})
		this.btn_giftChoose.onReleased.add(() => {
			this.btn_giftChoose.renderScale = this.btn_giftChoose["preScale"];
		})
		
	
		this.btn_backToItem.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CardGiftItem_UI_btn_backToItem");
		})
		this.btn_backToItem.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_backToItem.onPressed.add(() => {
			this.btn_backToItem["preScale"] = this.btn_backToItem.renderScale;
			this.btn_backToItem.renderScale = Vector2.one.set(this.btn_backToItem["preScale"]).multiply(1.1);
		})
		this.btn_backToItem.onReleased.add(() => {
			this.btn_backToItem.renderScale = this.btn_backToItem["preScale"];
		})
		
	
		this.btn_down.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CardGiftItem_UI_btn_down");
		})
		this.btn_down.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_down.onPressed.add(() => {
			this.btn_down["preScale"] = this.btn_down.renderScale;
			this.btn_down.renderScale = Vector2.one.set(this.btn_down["preScale"]).multiply(1.1);
		})
		this.btn_down.onReleased.add(() => {
			this.btn_down.renderScale = this.btn_down["preScale"];
		})
		
	
		this.btn_up.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CardGiftItem_UI_btn_up");
		})
		this.btn_up.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_up.onPressed.add(() => {
			this.btn_up["preScale"] = this.btn_up.renderScale;
			this.btn_up.renderScale = Vector2.one.set(this.btn_up["preScale"]).multiply(1.1);
		})
		this.btn_up.onReleased.add(() => {
			this.btn_up.renderScale = this.btn_up["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_fireNum)
		
	
		this.initLanguage(this.text_free)
		
	
		this.initLanguage(this.text_coin1)
		
	
		this.initLanguage(this.text_coin2)
		
	
		this.initLanguage(this.text_soldtips2)
		
	
		this.initLanguage(this.text_soldtips1)
		
	
		this.initLanguage(this.text_buyNum)
		
	
		this.initLanguage(this.text_total0)
		
	
		this.initLanguage(this.text_haveNum)
		
	
		this.initLanguage(this.text_total1)
		
	
		this.initLanguage(this.text_total2)
		
	
		this.initLanguage(this.text_total3)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CardGiftItem_UI'] = CardGiftItem_UI_Generate;