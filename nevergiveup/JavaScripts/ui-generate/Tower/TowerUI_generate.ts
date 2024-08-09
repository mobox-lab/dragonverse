
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
	private towerItemCanvas_Internal: mw.Canvas
	public get towerItemCanvas(): mw.Canvas {
		if(!this.towerItemCanvas_Internal&&this.uiWidgetBase) {
			this.towerItemCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/towerCanvas/towerItemCanvas') as mw.Canvas
		}
		return this.towerItemCanvas_Internal
	}
	private destroyBtn_Internal: mw.StaleButton
	public get destroyBtn(): mw.StaleButton {
		if(!this.destroyBtn_Internal&&this.uiWidgetBase) {
			this.destroyBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/towerCanvas/destroyBtn') as mw.StaleButton
		}
		return this.destroyBtn_Internal
	}
	private mImage_5_Internal: mw.Image
	public get mImage_5(): mw.Image {
		if(!this.mImage_5_Internal&&this.uiWidgetBase) {
			this.mImage_5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/towerCanvas/mImage_5') as mw.Image
		}
		return this.mImage_5_Internal
	}
	private shopBtn_Internal: mw.StaleButton
	public get shopBtn(): mw.StaleButton {
		if(!this.shopBtn_Internal&&this.uiWidgetBase) {
			this.shopBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/towerCanvas/shopBtn') as mw.StaleButton
		}
		return this.shopBtn_Internal
	}
	private settingUp_Internal: mw.Canvas
	public get settingUp(): mw.Canvas {
		if(!this.settingUp_Internal&&this.uiWidgetBase) {
			this.settingUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/towerCanvas/settingUp') as mw.Canvas
		}
		return this.settingUp_Internal
	}
	private setBtn_Internal: mw.Button
	public get setBtn(): mw.Button {
		if(!this.setBtn_Internal&&this.uiWidgetBase) {
			this.setBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/towerCanvas/settingUp/setBtn') as mw.Button
		}
		return this.setBtn_Internal
	}
	private textSet_Internal: mw.TextBlock
	public get textSet(): mw.TextBlock {
		if(!this.textSet_Internal&&this.uiWidgetBase) {
			this.textSet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/towerCanvas/settingUp/textSet') as mw.TextBlock
		}
		return this.textSet_Internal
	}
	private lineUp_Internal: mw.Canvas
	public get lineUp(): mw.Canvas {
		if(!this.lineUp_Internal&&this.uiWidgetBase) {
			this.lineUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/towerCanvas/lineUp') as mw.Canvas
		}
		return this.lineUp_Internal
	}
	private textLineup_Internal: mw.TextBlock
	public get textLineup(): mw.TextBlock {
		if(!this.textLineup_Internal&&this.uiWidgetBase) {
			this.textLineup_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/towerCanvas/lineUp/textLineup') as mw.TextBlock
		}
		return this.textLineup_Internal
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
	   
	   this.setBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "setBtn");
	   })
	   this.setBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.textSet)
	   
	
	   this.initLanguage(this.textLineup)
	   
	
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
