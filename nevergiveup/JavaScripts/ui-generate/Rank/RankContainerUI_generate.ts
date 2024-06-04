
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Rank/RankContainerUI.ui')
export default class RankContainerUI_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private mRankCanvas_Internal: mw.Canvas
	public get mRankCanvas(): mw.Canvas {
		if(!this.mRankCanvas_Internal&&this.uiWidgetBase) {
			this.mRankCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mRankCanvas') as mw.Canvas
		}
		return this.mRankCanvas_Internal
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
