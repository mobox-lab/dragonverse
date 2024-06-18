
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Sundry/ResultUI.ui')
export default class ResultUI_Generate extends UIScript {
		private mResultSettle_Internal: mw.Canvas
	public get mResultSettle(): mw.Canvas {
		if(!this.mResultSettle_Internal&&this.uiWidgetBase) {
			this.mResultSettle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mResultSettle') as mw.Canvas
		}
		return this.mResultSettle_Internal
	}
	private resultWin_Internal: mw.Image
	public get resultWin(): mw.Image {
		if(!this.resultWin_Internal&&this.uiWidgetBase) {
			this.resultWin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mResultSettle/resultWin') as mw.Image
		}
		return this.resultWin_Internal
	}
	private resultPerfectWin_Internal: mw.Image
	public get resultPerfectWin(): mw.Image {
		if(!this.resultPerfectWin_Internal&&this.uiWidgetBase) {
			this.resultPerfectWin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mResultSettle/resultPerfectWin') as mw.Image
		}
		return this.resultPerfectWin_Internal
	}
	private resultLose_Internal: mw.Image
	public get resultLose(): mw.Image {
		if(!this.resultLose_Internal&&this.uiWidgetBase) {
			this.resultLose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mResultSettle/resultLose') as mw.Image
		}
		return this.resultLose_Internal
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
