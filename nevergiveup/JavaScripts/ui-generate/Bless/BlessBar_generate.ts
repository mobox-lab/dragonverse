
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Bless/BlessBar.ui')
export default class BlessBar_Generate extends UIScript {
		private img_min_Internal: mw.Image
	public get img_min(): mw.Image {
		if(!this.img_min_Internal&&this.uiWidgetBase) {
			this.img_min_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_min') as mw.Image
		}
		return this.img_min_Internal
	}
	private img_mid_Internal: mw.Image
	public get img_mid(): mw.Image {
		if(!this.img_mid_Internal&&this.uiWidgetBase) {
			this.img_mid_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_mid') as mw.Image
		}
		return this.img_mid_Internal
	}
	private img_max_Internal: mw.Image
	public get img_max(): mw.Image {
		if(!this.img_max_Internal&&this.uiWidgetBase) {
			this.img_max_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_max') as mw.Image
		}
		return this.img_max_Internal
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
