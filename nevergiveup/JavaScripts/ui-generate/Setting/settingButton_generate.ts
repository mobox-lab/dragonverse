
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Setting/settingButton.ui')
export default class settingButton_Generate extends UIScript {
		private buttonCheck_Internal: mw.Canvas
	public get buttonCheck(): mw.Canvas {
		if(!this.buttonCheck_Internal&&this.uiWidgetBase) {
			this.buttonCheck_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/buttonCheck') as mw.Canvas
		}
		return this.buttonCheck_Internal
	}
	private buttonBackground_Internal: mw.Image
	public get buttonBackground(): mw.Image {
		if(!this.buttonBackground_Internal&&this.uiWidgetBase) {
			this.buttonBackground_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/buttonCheck/buttonBackground') as mw.Image
		}
		return this.buttonBackground_Internal
	}
	private selectTrue_Internal: mw.StaleButton
	public get selectTrue(): mw.StaleButton {
		if(!this.selectTrue_Internal&&this.uiWidgetBase) {
			this.selectTrue_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/buttonCheck/selectTrue') as mw.StaleButton
		}
		return this.selectTrue_Internal
	}
	private selectFalse_Internal: mw.StaleButton
	public get selectFalse(): mw.StaleButton {
		if(!this.selectFalse_Internal&&this.uiWidgetBase) {
			this.selectFalse_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/buttonCheck/selectFalse') as mw.StaleButton
		}
		return this.selectFalse_Internal
	}



   protected onAwake() {
	   //设置能否每帧触发onUpdate
	   this.canUpdate = false;
	   this.layer = mw.UILayerBottom;
	   this.initButtons();
   }
   protected initButtons() {
	   //按钮添加点击
	   
	   this.selectTrue.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "selectTrue");
	   })
	   this.initLanguage(this.selectTrue);
	   this.selectTrue.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.selectFalse.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "selectFalse");
	   })
	   this.initLanguage(this.selectFalse);
	   this.selectFalse.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
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
