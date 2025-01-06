
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Onlineshop/Online_shop.ui')
export default class Online_shop_Generate extends UIScript {
		private closeBtn_Internal: mw.Button
	public get closeBtn(): mw.Button {
		if(!this.closeBtn_Internal&&this.uiWidgetBase) {
			this.closeBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/closeBtn') as mw.Button
		}
		return this.closeBtn_Internal
	}
	private can_OnlineShop_Internal: mw.Canvas
	public get can_OnlineShop(): mw.Canvas {
		if(!this.can_OnlineShop_Internal&&this.uiWidgetBase) {
			this.can_OnlineShop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop') as mw.Canvas
		}
		return this.can_OnlineShop_Internal
	}
	private img_Background_Internal: mw.Image
	public get img_Background(): mw.Image {
		if(!this.img_Background_Internal&&this.uiWidgetBase) {
			this.img_Background_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/img_Background') as mw.Image
		}
		return this.img_Background_Internal
	}
	private can_Buy_Internal: mw.Canvas
	public get can_Buy(): mw.Canvas {
		if(!this.can_Buy_Internal&&this.uiWidgetBase) {
			this.can_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_Buy') as mw.Canvas
		}
		return this.can_Buy_Internal
	}
	private btn_Buy_Internal: mw.Button
	public get btn_Buy(): mw.Button {
		if(!this.btn_Buy_Internal&&this.uiWidgetBase) {
			this.btn_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_Buy/btn_Buy') as mw.Button
		}
		return this.btn_Buy_Internal
	}
	private text_Buy_Internal: mw.TextBlock
	public get text_Buy(): mw.TextBlock {
		if(!this.text_Buy_Internal&&this.uiWidgetBase) {
			this.text_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_Buy/btn_Buy/text_Buy') as mw.TextBlock
		}
		return this.text_Buy_Internal
	}
	private can_Close_Internal: mw.Canvas
	public get can_Close(): mw.Canvas {
		if(!this.can_Close_Internal&&this.uiWidgetBase) {
			this.can_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_Close') as mw.Canvas
		}
		return this.can_Close_Internal
	}
	private btn_Close_Internal: mw.Button
	public get btn_Close(): mw.Button {
		if(!this.btn_Close_Internal&&this.uiWidgetBase) {
			this.btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_Close/btn_Close') as mw.Button
		}
		return this.btn_Close_Internal
	}
	private scr_ShopItem_Internal: mw.ScrollBox
	public get scr_ShopItem(): mw.ScrollBox {
		if(!this.scr_ShopItem_Internal&&this.uiWidgetBase) {
			this.scr_ShopItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/scr_ShopItem') as mw.ScrollBox
		}
		return this.scr_ShopItem_Internal
	}
	private can_ShopItem_Internal: mw.Canvas
	public get can_ShopItem(): mw.Canvas {
		if(!this.can_ShopItem_Internal&&this.uiWidgetBase) {
			this.can_ShopItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_ShopItem') as mw.Canvas
		}
		return this.can_ShopItem_Internal
	}
	private can_MoboxChange_Internal: mw.Canvas
	public get can_MoboxChange(): mw.Canvas {
		if(!this.can_MoboxChange_Internal&&this.uiWidgetBase) {
			this.can_MoboxChange_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_MoboxChange') as mw.Canvas
		}
		return this.can_MoboxChange_Internal
	}
	private text_All_Internal: mw.TextBlock
	public get text_All(): mw.TextBlock {
		if(!this.text_All_Internal&&this.uiWidgetBase) {
			this.text_All_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_MoboxChange/text_All') as mw.TextBlock
		}
		return this.text_All_Internal
	}
	private text_Left_Internal: mw.TextBlock
	public get text_Left(): mw.TextBlock {
		if(!this.text_Left_Internal&&this.uiWidgetBase) {
			this.text_Left_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_MoboxChange/text_Left') as mw.TextBlock
		}
		return this.text_Left_Internal
	}
	private can_BuyTips_Internal: mw.Canvas
	public get can_BuyTips(): mw.Canvas {
		if(!this.can_BuyTips_Internal&&this.uiWidgetBase) {
			this.can_BuyTips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_BuyTips') as mw.Canvas
		}
		return this.can_BuyTips_Internal
	}
	private img_Tip_Background_Internal: mw.Image
	public get img_Tip_Background(): mw.Image {
		if(!this.img_Tip_Background_Internal&&this.uiWidgetBase) {
			this.img_Tip_Background_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_BuyTips/img_Tip_Background') as mw.Image
		}
		return this.img_Tip_Background_Internal
	}
	private img_Icon1_Internal: mw.Image
	public get img_Icon1(): mw.Image {
		if(!this.img_Icon1_Internal&&this.uiWidgetBase) {
			this.img_Icon1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_BuyTips/img_Icon1') as mw.Image
		}
		return this.img_Icon1_Internal
	}
	private text_SuccessText_Internal: mw.TextBlock
	public get text_SuccessText(): mw.TextBlock {
		if(!this.text_SuccessText_Internal&&this.uiWidgetBase) {
			this.text_SuccessText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_OnlineShop/can_BuyTips/text_SuccessText') as mw.TextBlock
		}
		return this.text_SuccessText_Internal
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
	   
	   this.closeBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "closeBtn");
	   })
	   this.closeBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.btn_Buy.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btn_Buy");
	   })
	   this.btn_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.btn_Close.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btn_Close");
	   })
	   this.btn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.text_Buy)
	   
	
	   this.initLanguage(this.text_All)
	   
	
	   this.initLanguage(this.text_Left)
	   
	
	   this.initLanguage(this.text_SuccessText)
	   
	
	   //文本多语言
	   
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_OnlineShop/TextBlock") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_OnlineShop/can_MoboxChange/TextBlock_1") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_OnlineShop/can_MoboxChange/TextBlock_1_1") as any);
	   
	

   }
   private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
	   let call = UIScript.getBehavior("lan");
	   if (call && ui) {
		   call(ui);
	   }
   }
   protected onShow(...params: any[]): void {};

   public show(...param): void {
	   UIService.showUI(this, this.layer, ...param);
   }

   public hide(): void {
	   UIService.hideUI(this);
   }
}
