
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Tower/ShopItemUI.ui')
export default class ShopItemUI_Generate extends UIScript {
		private bgElementImg_Internal: mw.Image
	public get bgElementImg(): mw.Image {
		if(!this.bgElementImg_Internal&&this.uiWidgetBase) {
			this.bgElementImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/bgElementImg') as mw.Image
		}
		return this.bgElementImg_Internal
	}
	private towerImg_Internal: mw.Image
	public get towerImg(): mw.Image {
		if(!this.towerImg_Internal&&this.uiWidgetBase) {
			this.towerImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/towerImg') as mw.Image
		}
		return this.towerImg_Internal
	}
	private bgImg_Internal: mw.Image
	public get bgImg(): mw.Image {
		if(!this.bgImg_Internal&&this.uiWidgetBase) {
			this.bgImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/bgImg') as mw.Image
		}
		return this.bgImg_Internal
	}
	private fightBgImg_Internal: mw.Image
	public get fightBgImg(): mw.Image {
		if(!this.fightBgImg_Internal&&this.uiWidgetBase) {
			this.fightBgImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/fightBgImg') as mw.Image
		}
		return this.fightBgImg_Internal
	}
	private elementImg_Internal: mw.Image
	public get elementImg(): mw.Image {
		if(!this.elementImg_Internal&&this.uiWidgetBase) {
			this.elementImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/elementImg') as mw.Image
		}
		return this.elementImg_Internal
	}
	private canvasLock_Internal: mw.Canvas
	public get canvasLock(): mw.Canvas {
		if(!this.canvasLock_Internal&&this.uiWidgetBase) {
			this.canvasLock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvasLock') as mw.Canvas
		}
		return this.canvasLock_Internal
	}
	private moneyBgImg_Internal: mw.Image
	public get moneyBgImg(): mw.Image {
		if(!this.moneyBgImg_Internal&&this.uiWidgetBase) {
			this.moneyBgImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvasLock/moneyBgImg') as mw.Image
		}
		return this.moneyBgImg_Internal
	}
	private lockBgImg_Internal: mw.Image
	public get lockBgImg(): mw.Image {
		if(!this.lockBgImg_Internal&&this.uiWidgetBase) {
			this.lockBgImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvasLock/lockBgImg') as mw.Image
		}
		return this.lockBgImg_Internal
	}
	private lockImg_Internal: mw.Image
	public get lockImg(): mw.Image {
		if(!this.lockImg_Internal&&this.uiWidgetBase) {
			this.lockImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvasLock/lockImg') as mw.Image
		}
		return this.lockImg_Internal
	}
	private img_money_Internal: mw.Image
	public get img_money(): mw.Image {
		if(!this.img_money_Internal&&this.uiWidgetBase) {
			this.img_money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvasLock/Canvas_1/img_money') as mw.Image
		}
		return this.img_money_Internal
	}
	private txt_sell_Internal: mw.TextBlock
	public get txt_sell(): mw.TextBlock {
		if(!this.txt_sell_Internal&&this.uiWidgetBase) {
			this.txt_sell_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvasLock/Canvas_1/txt_sell') as mw.TextBlock
		}
		return this.txt_sell_Internal
	}
	private canvas_Icontag_Internal: mw.Canvas
	public get canvas_Icontag(): mw.Canvas {
		if(!this.canvas_Icontag_Internal&&this.uiWidgetBase) {
			this.canvas_Icontag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_Icontag') as mw.Canvas
		}
		return this.canvas_Icontag_Internal
	}
	private icontagScrollBox_Internal: mw.ScrollBox
	public get icontagScrollBox(): mw.ScrollBox {
		if(!this.icontagScrollBox_Internal&&this.uiWidgetBase) {
			this.icontagScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_Icontag/icontagScrollBox') as mw.ScrollBox
		}
		return this.icontagScrollBox_Internal
	}
	private icontagCanvas_Internal: mw.Canvas
	public get icontagCanvas(): mw.Canvas {
		if(!this.icontagCanvas_Internal&&this.uiWidgetBase) {
			this.icontagCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_Icontag/icontagScrollBox/icontagCanvas') as mw.Canvas
		}
		return this.icontagCanvas_Internal
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
	private txt_atk_Internal: mw.TextBlock
	public get txt_atk(): mw.TextBlock {
		if(!this.txt_atk_Internal&&this.uiWidgetBase) {
			this.txt_atk_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_fight/txt_atk') as mw.TextBlock
		}
		return this.txt_atk_Internal
	}
	private chooseImg_Internal: mw.Image
	public get chooseImg(): mw.Image {
		if(!this.chooseImg_Internal&&this.uiWidgetBase) {
			this.chooseImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/chooseImg') as mw.Image
		}
		return this.chooseImg_Internal
	}
	private equipTxt_Internal: mw.TextBlock
	public get equipTxt(): mw.TextBlock {
		if(!this.equipTxt_Internal&&this.uiWidgetBase) {
			this.equipTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/equipTxt') as mw.TextBlock
		}
		return this.equipTxt_Internal
	}
	private canvas_name_Internal: mw.Canvas
	public get canvas_name(): mw.Canvas {
		if(!this.canvas_name_Internal&&this.uiWidgetBase) {
			this.canvas_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_name') as mw.Canvas
		}
		return this.canvas_name_Internal
	}
	private nameTxt_Internal: mw.TextBlock
	public get nameTxt(): mw.TextBlock {
		if(!this.nameTxt_Internal&&this.uiWidgetBase) {
			this.nameTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_name/nameTxt') as mw.TextBlock
		}
		return this.nameTxt_Internal
	}
	private imgSelected_Internal: mw.Image
	public get imgSelected(): mw.Image {
		if(!this.imgSelected_Internal&&this.uiWidgetBase) {
			this.imgSelected_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_name/imgSelected') as mw.Image
		}
		return this.imgSelected_Internal
	}
	private unlockedTxt_Internal: mw.TextBlock
	public get unlockedTxt(): mw.TextBlock {
		if(!this.unlockedTxt_Internal&&this.uiWidgetBase) {
			this.unlockedTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/unlockedTxt') as mw.TextBlock
		}
		return this.unlockedTxt_Internal
	}
	private chooseBtn_Internal: mw.Button
	public get chooseBtn(): mw.Button {
		if(!this.chooseBtn_Internal&&this.uiWidgetBase) {
			this.chooseBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/chooseBtn') as mw.Button
		}
		return this.chooseBtn_Internal
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
	   
	   this.chooseBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "chooseBtn");
	   })
	   this.chooseBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.txt_sell)
	   
	
	   this.initLanguage(this.txt_atk)
	   
	
	   this.initLanguage(this.equipTxt)
	   
	
	   this.initLanguage(this.nameTxt)
	   
	
	   this.initLanguage(this.unlockedTxt)
	   
	
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
