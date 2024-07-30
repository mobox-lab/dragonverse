
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Tips/CommonTipsUI.ui')
export default class CommonTipsUI_Generate extends UIScript {
		private start_Internal: mw.TextBlock
	public get start(): mw.TextBlock {
		if(!this.start_Internal&&this.uiWidgetBase) {
			this.start_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/start') as mw.TextBlock
		}
		return this.start_Internal
	}
	private end_Internal: mw.TextBlock
	public get end(): mw.TextBlock {
		if(!this.end_Internal&&this.uiWidgetBase) {
			this.end_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/end') as mw.TextBlock
		}
		return this.end_Internal
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
	   
	   this.initLanguage(this.start)
	   
	
	   this.initLanguage(this.end)
	   
	
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
