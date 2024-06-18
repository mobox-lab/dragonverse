
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Sundry/Emoji.ui')
export default class Emoji_Generate extends UIScript {
		private mBtn_expression_Internal: mw.StaleButton
	public get mBtn_expression(): mw.StaleButton {
		if(!this.mBtn_expression_Internal&&this.uiWidgetBase) {
			this.mBtn_expression_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_expression') as mw.StaleButton
		}
		return this.mBtn_expression_Internal
	}



   protected onAwake() {
	   //设置能否每帧触发onUpdate
	   this.canUpdate = false;
	   this.layer = mw.UILayerBottom;
	   this.initButtons();
   }
   protected initButtons() {
	   //按钮添加点击
	   
	   this.mBtn_expression.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mBtn_expression");
	   })
	   this.initLanguage(this.mBtn_expression);
	   this.mBtn_expression.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
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
