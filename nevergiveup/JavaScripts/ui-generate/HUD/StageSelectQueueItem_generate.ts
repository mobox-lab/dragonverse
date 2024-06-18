
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/HUD/StageSelectQueueItem.ui')
export default class StageSelectQueueItem_Generate extends UIScript {
		private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mLevel_Internal: mw.TextBlock
	public get mLevel(): mw.TextBlock {
		if(!this.mLevel_Internal&&this.uiWidgetBase) {
			this.mLevel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mLevel') as mw.TextBlock
		}
		return this.mLevel_Internal
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
	   
	   this.initLanguage(this.mName)
	   
	
	   this.initLanguage(this.mLevel)
	   
	
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
