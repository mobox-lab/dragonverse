
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/module_globalRank/GlobalRankItem.ui')
export default class GlobalRankItem_Generate extends UIScript {
		private mTxt_Field_Internal: mw.TextBlock
	public get mTxt_Field(): mw.TextBlock {
		if(!this.mTxt_Field_Internal&&this.uiWidgetBase) {
			this.mTxt_Field_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTxt_Field') as mw.TextBlock
		}
		return this.mTxt_Field_Internal
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
	   
	   this.initLanguage(this.mTxt_Field)
	   
	
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
