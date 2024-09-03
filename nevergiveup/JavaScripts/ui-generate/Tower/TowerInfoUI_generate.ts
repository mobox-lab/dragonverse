
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
	private can_outter_Internal: mw.Canvas
	public get can_outter(): mw.Canvas {
		if(!this.can_outter_Internal&&this.uiWidgetBase) {
			this.can_outter_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter') as mw.Canvas
		}
		return this.can_outter_Internal
	}
	private infoBg_Internal: mw.Image
	public get infoBg(): mw.Image {
		if(!this.infoBg_Internal&&this.uiWidgetBase) {
			this.infoBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/infoBg') as mw.Image
		}
		return this.infoBg_Internal
	}
	private canvas_tower_info_Internal: mw.Canvas
	public get canvas_tower_info(): mw.Canvas {
		if(!this.canvas_tower_info_Internal&&this.uiWidgetBase) {
			this.canvas_tower_info_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/canvas_tower_info') as mw.Canvas
		}
		return this.canvas_tower_info_Internal
	}
	private towerInfoBg_Internal: mw.Image
	public get towerInfoBg(): mw.Image {
		if(!this.towerInfoBg_Internal&&this.uiWidgetBase) {
			this.towerInfoBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/canvas_tower_info/towerInfoBg') as mw.Image
		}
		return this.towerInfoBg_Internal
	}
	private towerInfoBox_Internal: mw.ScrollBox
	public get towerInfoBox(): mw.ScrollBox {
		if(!this.towerInfoBox_Internal&&this.uiWidgetBase) {
			this.towerInfoBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/canvas_tower_info/towerInfoBox') as mw.ScrollBox
		}
		return this.towerInfoBox_Internal
	}
	private towerInfoCanvas_Internal: mw.Canvas
	public get towerInfoCanvas(): mw.Canvas {
		if(!this.towerInfoCanvas_Internal&&this.uiWidgetBase) {
			this.towerInfoCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/canvas_tower_info/towerInfoBox/towerInfoCanvas') as mw.Canvas
		}
		return this.towerInfoCanvas_Internal
	}
	private ownerTxt_Internal: mw.TextBlock
	public get ownerTxt(): mw.TextBlock {
		if(!this.ownerTxt_Internal&&this.uiWidgetBase) {
			this.ownerTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/canvas_tower_info/towerInfoBox/towerInfoCanvas/ownerTxt') as mw.TextBlock
		}
		return this.ownerTxt_Internal
	}
	private valueTxt_Internal: mw.TextBlock
	public get valueTxt(): mw.TextBlock {
		if(!this.valueTxt_Internal&&this.uiWidgetBase) {
			this.valueTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/canvas_tower_info/towerInfoBox/towerInfoCanvas/valueTxt') as mw.TextBlock
		}
		return this.valueTxt_Internal
	}
	private btn_group_Internal: mw.Canvas
	public get btn_group(): mw.Canvas {
		if(!this.btn_group_Internal&&this.uiWidgetBase) {
			this.btn_group_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/btn_group') as mw.Canvas
		}
		return this.btn_group_Internal
	}
	private canvas_sell_Internal: mw.Canvas
	public get canvas_sell(): mw.Canvas {
		if(!this.canvas_sell_Internal&&this.uiWidgetBase) {
			this.canvas_sell_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/btn_group/canvas_sell') as mw.Canvas
		}
		return this.canvas_sell_Internal
	}
	private sellBtn_Internal: mw.StaleButton
	public get sellBtn(): mw.StaleButton {
		if(!this.sellBtn_Internal&&this.uiWidgetBase) {
			this.sellBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/btn_group/canvas_sell/sellBtn') as mw.StaleButton
		}
		return this.sellBtn_Internal
	}
	private txt_sell_Internal: mw.TextBlock
	public get txt_sell(): mw.TextBlock {
		if(!this.txt_sell_Internal&&this.uiWidgetBase) {
			this.txt_sell_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/btn_group/canvas_sell/Canvas_sell_inner_right/txt_sell') as mw.TextBlock
		}
		return this.txt_sell_Internal
	}
	private txt_sell_value_Internal: mw.TextBlock
	public get txt_sell_value(): mw.TextBlock {
		if(!this.txt_sell_value_Internal&&this.uiWidgetBase) {
			this.txt_sell_value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/btn_group/canvas_sell/Canvas_sell_inner_right/txt_sell_value') as mw.TextBlock
		}
		return this.txt_sell_value_Internal
	}
	private img_money_1_Internal: mw.Image
	public get img_money_1(): mw.Image {
		if(!this.img_money_1_Internal&&this.uiWidgetBase) {
			this.img_money_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/btn_group/canvas_sell/Canvas_sell_inner_right/img_money_1') as mw.Image
		}
		return this.img_money_1_Internal
	}
	private canvas_levelup_Internal: mw.Canvas
	public get canvas_levelup(): mw.Canvas {
		if(!this.canvas_levelup_Internal&&this.uiWidgetBase) {
			this.canvas_levelup_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/btn_group/canvas_levelup') as mw.Canvas
		}
		return this.canvas_levelup_Internal
	}
	private levelBtn_Internal: mw.StaleButton
	public get levelBtn(): mw.StaleButton {
		if(!this.levelBtn_Internal&&this.uiWidgetBase) {
			this.levelBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/btn_group/canvas_levelup/levelBtn') as mw.StaleButton
		}
		return this.levelBtn_Internal
	}
	private txt_cost_Internal: mw.TextBlock
	public get txt_cost(): mw.TextBlock {
		if(!this.txt_cost_Internal&&this.uiWidgetBase) {
			this.txt_cost_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/btn_group/canvas_levelup/Canvas_levelup_inner_right/txt_cost') as mw.TextBlock
		}
		return this.txt_cost_Internal
	}
	private txt_cost_value_Internal: mw.TextBlock
	public get txt_cost_value(): mw.TextBlock {
		if(!this.txt_cost_value_Internal&&this.uiWidgetBase) {
			this.txt_cost_value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/btn_group/canvas_levelup/Canvas_levelup_inner_right/txt_cost_value') as mw.TextBlock
		}
		return this.txt_cost_value_Internal
	}
	private img_money_Internal: mw.Image
	public get img_money(): mw.Image {
		if(!this.img_money_Internal&&this.uiWidgetBase) {
			this.img_money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/btn_group/canvas_levelup/Canvas_levelup_inner_right/img_money') as mw.Image
		}
		return this.img_money_Internal
	}
	private canvas_levelup_inner_left_Internal: mw.Canvas
	public get canvas_levelup_inner_left(): mw.Canvas {
		if(!this.canvas_levelup_inner_left_Internal&&this.uiWidgetBase) {
			this.canvas_levelup_inner_left_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_outter/btn_group/canvas_levelup/canvas_levelup_inner_left') as mw.Canvas
		}
		return this.canvas_levelup_inner_left_Internal
	}
	private showCanvas_Internal: mw.Canvas
	public get showCanvas(): mw.Canvas {
		if(!this.showCanvas_Internal&&this.uiWidgetBase) {
			this.showCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/showCanvas') as mw.Canvas
		}
		return this.showCanvas_Internal
	}
	private infoCanvas1_Internal: mw.Canvas
	public get infoCanvas1(): mw.Canvas {
		if(!this.infoCanvas1_Internal&&this.uiWidgetBase) {
			this.infoCanvas1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/showCanvas/ScrollBox/infoCanvas1') as mw.Canvas
		}
		return this.infoCanvas1_Internal
	}
	private infoCanvas_Internal: mw.Canvas
	public get infoCanvas(): mw.Canvas {
		if(!this.infoCanvas_Internal&&this.uiWidgetBase) {
			this.infoCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/MWCanvas_2146943856/ScrollBox/infoCanvas') as mw.Canvas
		}
		return this.infoCanvas_Internal
	}
	private bgElementImg_Internal: mw.Image
	public get bgElementImg(): mw.Image {
		if(!this.bgElementImg_Internal&&this.uiWidgetBase) {
			this.bgElementImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/bgElementImg') as mw.Image
		}
		return this.bgElementImg_Internal
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
	private tagElementImg_Internal: mw.Image
	public get tagElementImg(): mw.Image {
		if(!this.tagElementImg_Internal&&this.uiWidgetBase) {
			this.tagElementImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/tagElementImg') as mw.Image
		}
		return this.tagElementImg_Internal
	}
	private nameTxt_Internal: mw.TextBlock
	public get nameTxt(): mw.TextBlock {
		if(!this.nameTxt_Internal&&this.uiWidgetBase) {
			this.nameTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/nameTxt') as mw.TextBlock
		}
		return this.nameTxt_Internal
	}
	private fightBgImg_Internal: mw.Image
	public get fightBgImg(): mw.Image {
		if(!this.fightBgImg_Internal&&this.uiWidgetBase) {
			this.fightBgImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/fightBgImg') as mw.Image
		}
		return this.fightBgImg_Internal
	}
	private levelTxt_Internal: mw.TextBlock
	public get levelTxt(): mw.TextBlock {
		if(!this.levelTxt_Internal&&this.uiWidgetBase) {
			this.levelTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/levelTxt') as mw.TextBlock
		}
		return this.levelTxt_Internal
	}
	private img_dec1_Internal: mw.Image
	public get img_dec1(): mw.Image {
		if(!this.img_dec1_Internal&&this.uiWidgetBase) {
			this.img_dec1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/img_dec1') as mw.Image
		}
		return this.img_dec1_Internal
	}
	private canvas_fight_Internal: mw.Canvas
	public get canvas_fight(): mw.Canvas {
		if(!this.canvas_fight_Internal&&this.uiWidgetBase) {
			this.canvas_fight_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_fight') as mw.Canvas
		}
		return this.canvas_fight_Internal
	}
	private fightImg_Internal: mw.Image
	public get fightImg(): mw.Image {
		if(!this.fightImg_Internal&&this.uiWidgetBase) {
			this.fightImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_fight/fightImg') as mw.Image
		}
		return this.fightImg_Internal
	}
	private txt_fight_Internal: mw.TextBlock
	public get txt_fight(): mw.TextBlock {
		if(!this.txt_fight_Internal&&this.uiWidgetBase) {
			this.txt_fight_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_fight/txt_fight') as mw.TextBlock
		}
		return this.txt_fight_Internal
	}
	private img_priceBg_Internal: mw.Image
	public get img_priceBg(): mw.Image {
		if(!this.img_priceBg_Internal&&this.uiWidgetBase) {
			this.img_priceBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/img_priceBg') as mw.Image
		}
		return this.img_priceBg_Internal
	}
	private img_price_Internal: mw.Image
	public get img_price(): mw.Image {
		if(!this.img_price_Internal&&this.uiWidgetBase) {
			this.img_price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/img_price') as mw.Image
		}
		return this.img_price_Internal
	}
	private txt_price_deploy_Internal: mw.TextBlock
	public get txt_price_deploy(): mw.TextBlock {
		if(!this.txt_price_deploy_Internal&&this.uiWidgetBase) {
			this.txt_price_deploy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/txt_price_deploy') as mw.TextBlock
		}
		return this.txt_price_deploy_Internal
	}
	private can_strategy_Internal: mw.Canvas
	public get can_strategy(): mw.Canvas {
		if(!this.can_strategy_Internal&&this.uiWidgetBase) {
			this.can_strategy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_strategy') as mw.Canvas
		}
		return this.can_strategy_Internal
	}
	private txt_Strategy_Internal: mw.TextBlock
	public get txt_Strategy(): mw.TextBlock {
		if(!this.txt_Strategy_Internal&&this.uiWidgetBase) {
			this.txt_Strategy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_strategy/txt_Strategy') as mw.TextBlock
		}
		return this.txt_Strategy_Internal
	}
	private txt_Strategy_Desc_Internal: mw.TextBlock
	public get txt_Strategy_Desc(): mw.TextBlock {
		if(!this.txt_Strategy_Desc_Internal&&this.uiWidgetBase) {
			this.txt_Strategy_Desc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/can_strategy/txt_Strategy_Desc') as mw.TextBlock
		}
		return this.txt_Strategy_Desc_Internal
	}
	private canvas_icontag_Internal: mw.Canvas
	public get canvas_icontag(): mw.Canvas {
		if(!this.canvas_icontag_Internal&&this.uiWidgetBase) {
			this.canvas_icontag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_icontag') as mw.Canvas
		}
		return this.canvas_icontag_Internal
	}
	private icontagScrollBox_Internal: mw.ScrollBox
	public get icontagScrollBox(): mw.ScrollBox {
		if(!this.icontagScrollBox_Internal&&this.uiWidgetBase) {
			this.icontagScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_icontag/icontagScrollBox') as mw.ScrollBox
		}
		return this.icontagScrollBox_Internal
	}
	private icontagCanvas_Internal: mw.Canvas
	public get icontagCanvas(): mw.Canvas {
		if(!this.icontagCanvas_Internal&&this.uiWidgetBase) {
			this.icontagCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_icontag/icontagScrollBox/icontagCanvas') as mw.Canvas
		}
		return this.icontagCanvas_Internal
	}
	private closeBtn_Internal: mw.StaleButton
	public get closeBtn(): mw.StaleButton {
		if(!this.closeBtn_Internal&&this.uiWidgetBase) {
			this.closeBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/closeBtn') as mw.StaleButton
		}
		return this.closeBtn_Internal
	}
	private txt_title_Internal: mw.TextBlock
	public get txt_title(): mw.TextBlock {
		if(!this.txt_title_Internal&&this.uiWidgetBase) {
			this.txt_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_title') as mw.TextBlock
		}
		return this.txt_title_Internal
	}



   protected onAwake() {
	   //设置能否每帧触发onUpdate
	   this.canUpdate = false;
	   this.layer = mw.UILayerBottom;
	   this.initButtons();
   }
   protected initButtons() {
	   //按钮添加点击
	   
	   this.sellBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "sellBtn");
	   })
	   this.initLanguage(this.sellBtn);
	   this.sellBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.levelBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "levelBtn");
	   })
	   this.initLanguage(this.levelBtn);
	   this.levelBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
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
	   
	   this.initLanguage(this.ownerTxt)
	   
	
	   this.initLanguage(this.valueTxt)
	   
	
	   this.initLanguage(this.txt_sell)
	   
	
	   this.initLanguage(this.txt_sell_value)
	   
	
	   this.initLanguage(this.txt_cost)
	   
	
	   this.initLanguage(this.txt_cost_value)
	   
	
	   this.initLanguage(this.nameTxt)
	   
	
	   this.initLanguage(this.levelTxt)
	   
	
	   this.initLanguage(this.txt_fight)
	   
	
	   this.initLanguage(this.txt_price_deploy)
	   
	
	   this.initLanguage(this.txt_Strategy)
	   
	
	   this.initLanguage(this.txt_Strategy_Desc)
	   
	
	   this.initLanguage(this.txt_title)
	   
	
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
