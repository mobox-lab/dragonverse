
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/logo/logo_anim.ui')
export default class logo_anim_Generate extends UIScript {
		private maskImg_Internal: mw.Image
	public get maskImg(): mw.Image {
		if(!this.maskImg_Internal&&this.uiWidgetBase) {
			this.maskImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/maskImg') as mw.Image
		}
		return this.maskImg_Internal
	}
	private can_logo_Internal: mw.Canvas
	public get can_logo(): mw.Canvas {
		if(!this.can_logo_Internal&&this.uiWidgetBase) {
			this.can_logo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_logo') as mw.Canvas
		}
		return this.can_logo_Internal
	}
	private flip_anim1_Internal: mw.FlipBook
	public get flip_anim1(): mw.FlipBook {
		if(!this.flip_anim1_Internal&&this.uiWidgetBase) {
			this.flip_anim1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_logo/flip_anim1') as mw.FlipBook
		}
		return this.flip_anim1_Internal
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
