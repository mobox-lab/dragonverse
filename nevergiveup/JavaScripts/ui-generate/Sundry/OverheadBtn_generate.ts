
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Sundry/OverheadBtn.ui')
export default class OverheadBtn_Generate extends UIScript {
		private mbtn_Internal: mw.Button
	public get mbtn(): mw.Button {
		if(!this.mbtn_Internal&&this.uiWidgetBase) {
			this.mbtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mbtn') as mw.Button
		}
		return this.mbtn_Internal
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
	   
	   this.mbtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mbtn");
	   })
	   this.mbtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

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
