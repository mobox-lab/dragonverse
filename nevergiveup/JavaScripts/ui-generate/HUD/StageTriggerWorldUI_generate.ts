
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/HUD/StageTriggerWorldUI.ui')
export default class StageTriggerWorldUI_Generate extends UIScript {
		private mMapName_Internal: mw.TextBlock
	public get mMapName(): mw.TextBlock {
		if(!this.mMapName_Internal&&this.uiWidgetBase) {
			this.mMapName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMapName') as mw.TextBlock
		}
		return this.mMapName_Internal
	}
	private mWaitProgress_Internal: mw.ProgressBar
	public get mWaitProgress(): mw.ProgressBar {
		if(!this.mWaitProgress_Internal&&this.uiWidgetBase) {
			this.mWaitProgress_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mWaitProgress') as mw.ProgressBar
		}
		return this.mWaitProgress_Internal
	}
	private mTranportText_Internal: mw.TextBlock
	public get mTranportText(): mw.TextBlock {
		if(!this.mTranportText_Internal&&this.uiWidgetBase) {
			this.mTranportText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mTranportText') as mw.TextBlock
		}
		return this.mTranportText_Internal
	}
	private mPlayerCount_Internal: mw.TextBlock
	public get mPlayerCount(): mw.TextBlock {
		if(!this.mPlayerCount_Internal&&this.uiWidgetBase) {
			this.mPlayerCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mPlayerCount') as mw.TextBlock
		}
		return this.mPlayerCount_Internal
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
	   
	   this.initLanguage(this.mMapName)
	   
	
	   this.initLanguage(this.mTranportText)
	   
	
	   this.initLanguage(this.mPlayerCount)
	   
	
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
