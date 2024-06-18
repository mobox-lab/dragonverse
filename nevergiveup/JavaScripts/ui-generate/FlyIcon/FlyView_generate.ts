
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/FlyIcon/FlyView.ui')
export default class FlyView_Generate extends UIScript {
		private cav_gold_Internal: mw.Canvas
	public get cav_gold(): mw.Canvas {
		if(!this.cav_gold_Internal&&this.uiWidgetBase) {
			this.cav_gold_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cav_gold') as mw.Canvas
		}
		return this.cav_gold_Internal
	}
	private img_gold_Internal: mw.Image
	public get img_gold(): mw.Image {
		if(!this.img_gold_Internal&&this.uiWidgetBase) {
			this.img_gold_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cav_gold/img_gold') as mw.Image
		}
		return this.img_gold_Internal
	}
	private txt_count_Internal: mw.TextBlock
	public get txt_count(): mw.TextBlock {
		if(!this.txt_count_Internal&&this.uiWidgetBase) {
			this.txt_count_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cav_gold/txt_count') as mw.TextBlock
		}
		return this.txt_count_Internal
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
	   
	   this.initLanguage(this.txt_count)
	   
	
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
