
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Tower/InteractUI.ui')
export default class InteractUI_Generate extends UIScript {
		private interactBtn_Internal: mw.StaleButton
	public get interactBtn(): mw.StaleButton {
		if(!this.interactBtn_Internal&&this.uiWidgetBase) {
			this.interactBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/interactBtn') as mw.StaleButton
		}
		return this.interactBtn_Internal
	}



   protected onAwake() {
	   //设置能否每帧触发onUpdate
	   this.canUpdate = false;
	   this.layer = mw.UILayerBottom;
	   this.initButtons();
   }
   protected initButtons() {
	   //按钮添加点击
	   
	   this.interactBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "interactBtn");
	   })
	   this.initLanguage(this.interactBtn);
	   this.interactBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
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
