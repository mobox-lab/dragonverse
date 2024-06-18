
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Sundry/TextItemUI.ui')
export default class TextItemUI_Generate extends UIScript {
		private textCanvas_Internal: mw.Canvas
	public get textCanvas(): mw.Canvas {
		if(!this.textCanvas_Internal&&this.uiWidgetBase) {
			this.textCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textCanvas') as mw.Canvas
		}
		return this.textCanvas_Internal
	}
	private valueTxt_Internal: mw.TextBlock
	public get valueTxt(): mw.TextBlock {
		if(!this.valueTxt_Internal&&this.uiWidgetBase) {
			this.valueTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textCanvas/valueTxt') as mw.TextBlock
		}
		return this.valueTxt_Internal
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
	   

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.valueTxt)
	   
	
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
