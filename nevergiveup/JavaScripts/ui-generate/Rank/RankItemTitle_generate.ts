
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Rank/RankItemTitle.ui')
export default class RankItemTitle_Generate extends UIScript {
		private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mGold_Internal: mw.TextBlock
	public get mGold(): mw.TextBlock {
		if(!this.mGold_Internal&&this.uiWidgetBase) {
			this.mGold_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mGold') as mw.TextBlock
		}
		return this.mGold_Internal
	}
	private mDamage_Internal: mw.TextBlock
	public get mDamage(): mw.TextBlock {
		if(!this.mDamage_Internal&&this.uiWidgetBase) {
			this.mDamage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas_1/mDamage') as mw.TextBlock
		}
		return this.mDamage_Internal
	}
	private mCollapseBtn_Internal: mw.Button
	public get mCollapseBtn(): mw.Button {
		if(!this.mCollapseBtn_Internal&&this.uiWidgetBase) {
			this.mCollapseBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas_1/mCollapseBtn') as mw.Button
		}
		return this.mCollapseBtn_Internal
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
	   
	   this.mCollapseBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mCollapseBtn");
	   })
	   this.mCollapseBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.mName)
	   
	
	   this.initLanguage(this.mGold)
	   
	
	   this.initLanguage(this.mDamage)
	   
	
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
