
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/module_globalRank/GlobalRankPanel.ui')
export default class GlobalRankPanel_Generate extends UIScript {
		private mTitle_txt_Internal: mw.TextBlock
	public get mTitle_txt(): mw.TextBlock {
		if(!this.mTitle_txt_Internal&&this.uiWidgetBase) {
			this.mTitle_txt_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mTitle_txt') as mw.TextBlock
		}
		return this.mTitle_txt_Internal
	}
	private mFieldName_Internal: mw.Canvas
	public get mFieldName(): mw.Canvas {
		if(!this.mFieldName_Internal&&this.uiWidgetBase) {
			this.mFieldName_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mFieldName') as mw.Canvas
		}
		return this.mFieldName_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/ScrollView/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private mCanvas_Self_Internal: mw.Canvas
	public get mCanvas_Self(): mw.Canvas {
		if(!this.mCanvas_Self_Internal&&this.uiWidgetBase) {
			this.mCanvas_Self_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mCanvas_Self') as mw.Canvas
		}
		return this.mCanvas_Self_Internal
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
	   
	   this.initLanguage(this.mTitle_txt)
	   
	
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
