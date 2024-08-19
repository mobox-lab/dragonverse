
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Level/WorldinfinityUI.ui')
export default class WorldinfinityUI_Generate extends UIScript {
		private textBlock_1_Internal: mw.TextBlock
	public get textBlock_1(): mw.TextBlock {
		if(!this.textBlock_1_Internal&&this.uiWidgetBase) {
			this.textBlock_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textBlock_1') as mw.TextBlock
		}
		return this.textBlock_1_Internal
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
	   
	   this.initLanguage(this.textBlock_1)
	   
	
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
