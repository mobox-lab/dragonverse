
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Tower/TowerItemUI.ui')
export default class TowerItemUI_Generate extends UIScript {
		private itemBtn_Internal: mw.Button
	public get itemBtn(): mw.Button {
		if(!this.itemBtn_Internal&&this.uiWidgetBase) {
			this.itemBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/itemBtn') as mw.Button
		}
		return this.itemBtn_Internal
	}
	private selectImg_Internal: mw.Image
	public get selectImg(): mw.Image {
		if(!this.selectImg_Internal&&this.uiWidgetBase) {
			this.selectImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/selectImg') as mw.Image
		}
		return this.selectImg_Internal
	}
	private mCanvas_add_Internal: mw.Canvas
	public get mCanvas_add(): mw.Canvas {
		if(!this.mCanvas_add_Internal&&this.uiWidgetBase) {
			this.mCanvas_add_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_add') as mw.Canvas
		}
		return this.mCanvas_add_Internal
	}
	private bgAddImg_Internal: mw.Image
	public get bgAddImg(): mw.Image {
		if(!this.bgAddImg_Internal&&this.uiWidgetBase) {
			this.bgAddImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_add/bgAddImg') as mw.Image
		}
		return this.bgAddImg_Internal
	}
	private mContainer_tower_Internal: mw.Canvas
	public get mContainer_tower(): mw.Canvas {
		if(!this.mContainer_tower_Internal&&this.uiWidgetBase) {
			this.mContainer_tower_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer_tower') as mw.Canvas
		}
		return this.mContainer_tower_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer_tower/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private bgElementImg_Internal: mw.Image
	public get bgElementImg(): mw.Image {
		if(!this.bgElementImg_Internal&&this.uiWidgetBase) {
			this.bgElementImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer_tower/bgElementImg') as mw.Image
		}
		return this.bgElementImg_Internal
	}
	private img_Icon_Internal: mw.Image
	public get img_Icon(): mw.Image {
		if(!this.img_Icon_Internal&&this.uiWidgetBase) {
			this.img_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer_tower/img_Icon') as mw.Image
		}
		return this.img_Icon_Internal
	}
	private elementImg_Internal: mw.Image
	public get elementImg(): mw.Image {
		if(!this.elementImg_Internal&&this.uiWidgetBase) {
			this.elementImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer_tower/elementImg') as mw.Image
		}
		return this.elementImg_Internal
	}
	private nameTxt_Internal: mw.TextBlock
	public get nameTxt(): mw.TextBlock {
		if(!this.nameTxt_Internal&&this.uiWidgetBase) {
			this.nameTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer_tower/nameTxt') as mw.TextBlock
		}
		return this.nameTxt_Internal
	}
	private canvas_fight_Internal: mw.Canvas
	public get canvas_fight(): mw.Canvas {
		if(!this.canvas_fight_Internal&&this.uiWidgetBase) {
			this.canvas_fight_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer_tower/canvas_fight') as mw.Canvas
		}
		return this.canvas_fight_Internal
	}
	private fightImg_Internal: mw.Image
	public get fightImg(): mw.Image {
		if(!this.fightImg_Internal&&this.uiWidgetBase) {
			this.fightImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer_tower/canvas_fight/fightImg') as mw.Image
		}
		return this.fightImg_Internal
	}
	private txt_attack_Internal: mw.TextBlock
	public get txt_attack(): mw.TextBlock {
		if(!this.txt_attack_Internal&&this.uiWidgetBase) {
			this.txt_attack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer_tower/canvas_fight/txt_attack') as mw.TextBlock
		}
		return this.txt_attack_Internal
	}
	private canvas_tag_Internal: mw.Canvas
	public get canvas_tag(): mw.Canvas {
		if(!this.canvas_tag_Internal&&this.uiWidgetBase) {
			this.canvas_tag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer_tower/canvas_tag') as mw.Canvas
		}
		return this.canvas_tag_Internal
	}
	private tagScrollBox_Internal: mw.ScrollBox
	public get tagScrollBox(): mw.ScrollBox {
		if(!this.tagScrollBox_Internal&&this.uiWidgetBase) {
			this.tagScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer_tower/canvas_tag/tagScrollBox') as mw.ScrollBox
		}
		return this.tagScrollBox_Internal
	}
	private tagCanvas_Internal: mw.Canvas
	public get tagCanvas(): mw.Canvas {
		if(!this.tagCanvas_Internal&&this.uiWidgetBase) {
			this.tagCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer_tower/canvas_tag/tagScrollBox/tagCanvas') as mw.Canvas
		}
		return this.tagCanvas_Internal
	}
	private mPriceCanvas_Internal: mw.Canvas
	public get mPriceCanvas(): mw.Canvas {
		if(!this.mPriceCanvas_Internal&&this.uiWidgetBase) {
			this.mPriceCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer_tower/mPriceCanvas') as mw.Canvas
		}
		return this.mPriceCanvas_Internal
	}
	private txt_spend_Internal: mw.TextBlock
	public get txt_spend(): mw.TextBlock {
		if(!this.txt_spend_Internal&&this.uiWidgetBase) {
			this.txt_spend_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer_tower/mPriceCanvas/txt_spend') as mw.TextBlock
		}
		return this.txt_spend_Internal
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
	   
	   this.itemBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "itemBtn");
	   })
	   this.itemBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.nameTxt)
	   
	
	   this.initLanguage(this.txt_attack)
	   
	
	   this.initLanguage(this.txt_spend)
	   
	
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
