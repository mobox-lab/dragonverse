
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/TechTree/TechItem.ui')
export default class TechItem_Generate extends UIScript {
		private mItem_Internal: mw.Button
	public get mItem(): mw.Button {
		if(!this.mItem_Internal&&this.uiWidgetBase) {
			this.mItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mItem') as mw.Button
		}
		return this.mItem_Internal
	}
	private mSelected_Internal: mw.Image
	public get mSelected(): mw.Image {
		if(!this.mSelected_Internal&&this.uiWidgetBase) {
			this.mSelected_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelected') as mw.Image
		}
		return this.mSelected_Internal
	}
	private mLocked_Internal: mw.Image
	public get mLocked(): mw.Image {
		if(!this.mLocked_Internal&&this.uiWidgetBase) {
			this.mLocked_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mLocked') as mw.Image
		}
		return this.mLocked_Internal
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
	   
	   this.mItem.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mItem");
	   })
	   this.mItem.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

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
