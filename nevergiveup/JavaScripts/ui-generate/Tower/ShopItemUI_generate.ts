
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
			this.img_money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvasLock/img_money') as mw.Image
		}
		return this.img_money_Internal
	}
	private txt_sell_Internal: mw.TextBlock
	public get txt_sell(): mw.TextBlock {
		if(!this.txt_sell_Internal&&this.uiWidgetBase) {
			this.txt_sell_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvasLock/txt_sell') as mw.TextBlock
		}
		return this.txt_sell_Internal
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
	private nameTxt_Internal: mw.TextBlock
	public get nameTxt(): mw.TextBlock {
		if(!this.nameTxt_Internal&&this.uiWidgetBase) {
			this.nameTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/nameTxt') as mw.TextBlock
		}
		return this.nameTxt_Internal
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
