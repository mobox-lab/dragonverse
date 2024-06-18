
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Level/TryTowerUI.ui')
export default class TryTowerUI_Generate extends UIScript {
		private mContainer_Internal: mw.Canvas
	public get mContainer(): mw.Canvas {
		if(!this.mContainer_Internal&&this.uiWidgetBase) {
			this.mContainer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer') as mw.Canvas
		}
		return this.mContainer_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private selectImg_Internal: mw.Image
	public get selectImg(): mw.Image {
		if(!this.selectImg_Internal&&this.uiWidgetBase) {
			this.selectImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer/selectImg') as mw.Image
		}
		return this.selectImg_Internal
	}
	private createBtn_Internal: mw.Button
	public get createBtn(): mw.Button {
		if(!this.createBtn_Internal&&this.uiWidgetBase) {
			this.createBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer/createBtn') as mw.Button
		}
		return this.createBtn_Internal
	}
	private towerImg_Internal: mw.Image
	public get towerImg(): mw.Image {
		if(!this.towerImg_Internal&&this.uiWidgetBase) {
			this.towerImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mContainer/towerImg') as mw.Image
		}
		return this.towerImg_Internal
	}
	private mPriceCanvas_Internal: mw.Canvas
	public get mPriceCanvas(): mw.Canvas {
		if(!this.mPriceCanvas_Internal&&this.uiWidgetBase) {
			this.mPriceCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mPriceCanvas') as mw.Canvas
		}
		return this.mPriceCanvas_Internal
	}
	private valueText_Internal: mw.TextBlock
	public get valueText(): mw.TextBlock {
		if(!this.valueText_Internal&&this.uiWidgetBase) {
			this.valueText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mPriceCanvas/valueText') as mw.TextBlock
		}
		return this.valueText_Internal
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
	   
	   this.createBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "createBtn");
	   })
	   this.createBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.valueText)
	   
	
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
