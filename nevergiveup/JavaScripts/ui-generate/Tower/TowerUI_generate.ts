
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Tower/TowerUI.ui')
export default class TowerUI_Generate extends UIScript {
		private towerCanvas_Internal: mw.Canvas
	public get towerCanvas(): mw.Canvas {
		if(!this.towerCanvas_Internal&&this.uiWidgetBase) {
			this.towerCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/towerCanvas') as mw.Canvas
		}
		return this.towerCanvas_Internal
	}
	private destroyBtn_Internal: mw.StaleButton
	public get destroyBtn(): mw.StaleButton {
		if(!this.destroyBtn_Internal&&this.uiWidgetBase) {
			this.destroyBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/towerCanvas/destroyBtn') as mw.StaleButton
		}
		return this.destroyBtn_Internal
	}
	private towerBg_Internal: mw.Image
	public get towerBg(): mw.Image {
		if(!this.towerBg_Internal&&this.uiWidgetBase) {
			this.towerBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/towerCanvas/towerBg') as mw.Image
		}
		return this.towerBg_Internal
	}
	private towerItemCanvas_Internal: mw.Canvas
	public get towerItemCanvas(): mw.Canvas {
		if(!this.towerItemCanvas_Internal&&this.uiWidgetBase) {
			this.towerItemCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/towerCanvas/towerItemCanvas') as mw.Canvas
		}
		return this.towerItemCanvas_Internal
	}
	private shopBtn_Internal: mw.StaleButton
	public get shopBtn(): mw.StaleButton {
		if(!this.shopBtn_Internal&&this.uiWidgetBase) {
			this.shopBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/towerCanvas/shopBtn') as mw.StaleButton
		}
		return this.shopBtn_Internal
	}



   protected onAwake() {
	   //设置能否每帧触发onUpdate
	   this.canUpdate = false;
	   this.layer = mw.UILayerBottom;
	   this.initButtons();
   }
   protected initButtons() {
	   //按钮添加点击
	   
	   this.destroyBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "destroyBtn");
	   })
	   this.initLanguage(this.destroyBtn);
	   this.destroyBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.shopBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "shopBtn");
	   })
	   this.initLanguage(this.shopBtn);
	   this.shopBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   //按钮添加点击
	   

	   //按钮多语言
	   
	   //文本多语言
	   
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
