
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Tips/CommonTipsItemUI.ui')
export default class CommonTipsItemUI_Generate extends UIScript {
		private mImage_BG_Internal: mw.Image
	public get mImage_BG(): mw.Image {
		if(!this.mImage_BG_Internal&&this.uiWidgetBase) {
			this.mImage_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mImage_BG') as mw.Image
		}
		return this.mImage_BG_Internal
	}
	private mText_Tips_Internal: mw.TextBlock
	public get mText_Tips(): mw.TextBlock {
		if(!this.mText_Tips_Internal&&this.uiWidgetBase) {
			this.mText_Tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_Tips') as mw.TextBlock
		}
		return this.mText_Tips_Internal
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
	   
	   this.initLanguage(this.mText_Tips)
	   
	
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
