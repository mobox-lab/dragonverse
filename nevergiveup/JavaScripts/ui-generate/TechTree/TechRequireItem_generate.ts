
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/TechTree/TechRequireItem.ui')
export default class TechRequireItem_Generate extends UIScript {
		private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private mImg_Internal: mw.Image
	public get mImg(): mw.Image {
		if(!this.mImg_Internal&&this.uiWidgetBase) {
			this.mImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg') as mw.Image
		}
		return this.mImg_Internal
	}
	private mBtn_Internal: mw.Button
	public get mBtn(): mw.Button {
		if(!this.mBtn_Internal&&this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn') as mw.Button
		}
		return this.mBtn_Internal
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
	   
	   this.mBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mBtn");
	   })
	   this.mBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

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
