
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Tower/TowerInfoUI.ui')
export default class TowerInfoUI_Generate extends UIScript {
		private bgBtn_Internal: mw.Button
	public get bgBtn(): mw.Button {
		if(!this.bgBtn_Internal&&this.uiWidgetBase) {
			this.bgBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bgBtn') as mw.Button
		}
		return this.bgBtn_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private txt_title_Internal: mw.TextBlock
	public get txt_title(): mw.TextBlock {
		if(!this.txt_title_Internal&&this.uiWidgetBase) {
			this.txt_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/txt_title') as mw.TextBlock
		}
		return this.txt_title_Internal
	}
	private canvas_levelup_Internal: mw.Canvas
	public get canvas_levelup(): mw.Canvas {
		if(!this.canvas_levelup_Internal&&this.uiWidgetBase) {
			this.canvas_levelup_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_levelup') as mw.Canvas
		}
		return this.canvas_levelup_Internal
	}
	private img_lilBG_Internal: mw.Image
	public get img_lilBG(): mw.Image {
		if(!this.img_lilBG_Internal&&this.uiWidgetBase) {
			this.img_lilBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_levelup/img_lilBG') as mw.Image
		}
		return this.img_lilBG_Internal
	}
	private levelBtn_Internal: mw.StaleButton
	public get levelBtn(): mw.StaleButton {
		if(!this.levelBtn_Internal&&this.uiWidgetBase) {
			this.levelBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_levelup/levelBtn') as mw.StaleButton
		}
		return this.levelBtn_Internal
	}
	private img_money_Internal: mw.Image
	public get img_money(): mw.Image {
		if(!this.img_money_Internal&&this.uiWidgetBase) {
			this.img_money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_levelup/img_money') as mw.Image
		}
		return this.img_money_Internal
	}
	private txt_cost_Internal: mw.TextBlock
	public get txt_cost(): mw.TextBlock {
		if(!this.txt_cost_Internal&&this.uiWidgetBase) {
			this.txt_cost_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_levelup/txt_cost') as mw.TextBlock
		}
		return this.txt_cost_Internal
	}
	private canvas_sell_Internal: mw.Canvas
	public get canvas_sell(): mw.Canvas {
		if(!this.canvas_sell_Internal&&this.uiWidgetBase) {
			this.canvas_sell_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_sell') as mw.Canvas
		}
		return this.canvas_sell_Internal
	}
	private img_lilBG_1_Internal: mw.Image
	public get img_lilBG_1(): mw.Image {
		if(!this.img_lilBG_1_Internal&&this.uiWidgetBase) {
			this.img_lilBG_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_sell/img_lilBG_1') as mw.Image
		}
		return this.img_lilBG_1_Internal
	}
	private sellBtn_Internal: mw.StaleButton
	public get sellBtn(): mw.StaleButton {
		if(!this.sellBtn_Internal&&this.uiWidgetBase) {
			this.sellBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_sell/sellBtn') as mw.StaleButton
		}
		return this.sellBtn_Internal
	}
	private img_money_1_Internal: mw.Image
	public get img_money_1(): mw.Image {
		if(!this.img_money_1_Internal&&this.uiWidgetBase) {
			this.img_money_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_sell/img_money_1') as mw.Image
		}
		return this.img_money_1_Internal
	}
	private txt_price_Internal: mw.TextBlock
	public get txt_price(): mw.TextBlock {
		if(!this.txt_price_Internal&&this.uiWidgetBase) {
			this.txt_price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_sell/txt_price') as mw.TextBlock
		}
		return this.txt_price_Internal
	}
	private showCanvas_Internal: mw.Canvas
	public get showCanvas(): mw.Canvas {
		if(!this.showCanvas_Internal&&this.uiWidgetBase) {
			this.showCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/showCanvas') as mw.Canvas
		}
		return this.showCanvas_Internal
	}
	private infoCanvas_Internal: mw.Canvas
	public get infoCanvas(): mw.Canvas {
		if(!this.infoCanvas_Internal&&this.uiWidgetBase) {
			this.infoCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/showCanvas/ScrollBox/infoCanvas') as mw.Canvas
		}
		return this.infoCanvas_Internal
	}
	private img_backg_Internal: mw.Image
	public get img_backg(): mw.Image {
		if(!this.img_backg_Internal&&this.uiWidgetBase) {
			this.img_backg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/img_backg') as mw.Image
		}
		return this.img_backg_Internal
	}
	private towerImg_Internal: mw.Image
	public get towerImg(): mw.Image {
		if(!this.towerImg_Internal&&this.uiWidgetBase) {
			this.towerImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/towerImg') as mw.Image
		}
		return this.towerImg_Internal
	}
	private levelTxt_Internal: mw.TextBlock
	public get levelTxt(): mw.TextBlock {
		if(!this.levelTxt_Internal&&this.uiWidgetBase) {
			this.levelTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/levelTxt') as mw.TextBlock
		}
		return this.levelTxt_Internal
	}
	private ownerTxt_Internal: mw.TextBlock
	public get ownerTxt(): mw.TextBlock {
		if(!this.ownerTxt_Internal&&this.uiWidgetBase) {
			this.ownerTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/ownerTxt') as mw.TextBlock
		}
		return this.ownerTxt_Internal
	}
	private valueTxt_Internal: mw.TextBlock
	public get valueTxt(): mw.TextBlock {
		if(!this.valueTxt_Internal&&this.uiWidgetBase) {
			this.valueTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/valueTxt') as mw.TextBlock
		}
		return this.valueTxt_Internal
	}
	private img_dec1_Internal: mw.Image
	public get img_dec1(): mw.Image {
		if(!this.img_dec1_Internal&&this.uiWidgetBase) {
			this.img_dec1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/img_dec1') as mw.Image
		}
		return this.img_dec1_Internal
	}
	private canvas_tag_Internal: mw.Canvas
	public get canvas_tag(): mw.Canvas {
		if(!this.canvas_tag_Internal&&this.uiWidgetBase) {
			this.canvas_tag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_tag') as mw.Canvas
		}
		return this.canvas_tag_Internal
	}
	private tagScrollBox_Internal: mw.ScrollBox
	public get tagScrollBox(): mw.ScrollBox {
		if(!this.tagScrollBox_Internal&&this.uiWidgetBase) {
			this.tagScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_tag/tagScrollBox') as mw.ScrollBox
		}
		return this.tagScrollBox_Internal
	}
	private tagCanvas_Internal: mw.Canvas
	public get tagCanvas(): mw.Canvas {
		if(!this.tagCanvas_Internal&&this.uiWidgetBase) {
			this.tagCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_tag/tagScrollBox/tagCanvas') as mw.Canvas
		}
		return this.tagCanvas_Internal
	}
	private closeBtn_Internal: mw.StaleButton
	public get closeBtn(): mw.StaleButton {
		if(!this.closeBtn_Internal&&this.uiWidgetBase) {
			this.closeBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/closeBtn') as mw.StaleButton
		}
		return this.closeBtn_Internal
	}



   protected onAwake() {
	   //设置能否每帧触发onUpdate
	   this.canUpdate = false;
	   this.layer = mw.UILayerBottom;
	   this.initButtons();
   }
   protected initButtons() {
	   //按钮添加点击
	   
	   this.levelBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "levelBtn");
	   })
	   this.initLanguage(this.levelBtn);
	   this.levelBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.sellBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "sellBtn");
	   })
	   this.initLanguage(this.sellBtn);
	   this.sellBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.closeBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "closeBtn");
	   })
	   this.initLanguage(this.closeBtn);
	   this.closeBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   //按钮添加点击
	   
	   this.bgBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "bgBtn");
	   })
	   this.bgBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.txt_title)
	   
	
	   this.initLanguage(this.txt_cost)
	   
	
	   this.initLanguage(this.txt_price)
	   
	
	   this.initLanguage(this.levelTxt)
	   
	
	   this.initLanguage(this.ownerTxt)
	   
	
	   this.initLanguage(this.valueTxt)
	   
	
	   //文本多语言
	   

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
