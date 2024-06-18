
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Level/SettleRewardItemUI.ui')
export default class SettleRewardItemUI_Generate extends UIScript {
		private mRewardBG_Internal: mw.Image
	public get mRewardBG(): mw.Image {
		if(!this.mRewardBG_Internal&&this.uiWidgetBase) {
			this.mRewardBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRewardBG') as mw.Image
		}
		return this.mRewardBG_Internal
	}
	private mRewardItem_Internal: mw.Image
	public get mRewardItem(): mw.Image {
		if(!this.mRewardItem_Internal&&this.uiWidgetBase) {
			this.mRewardItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRewardItem') as mw.Image
		}
		return this.mRewardItem_Internal
	}
	private mAmount_Internal: mw.TextBlock
	public get mAmount(): mw.TextBlock {
		if(!this.mAmount_Internal&&this.uiWidgetBase) {
			this.mAmount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mAmount') as mw.TextBlock
		}
		return this.mAmount_Internal
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
	   
	   this.initLanguage(this.mAmount)
	   
	
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
