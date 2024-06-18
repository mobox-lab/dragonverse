
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Tips/LastWave.ui')
export default class LastWave_Generate extends UIScript {
		private canvas_LastWave_Internal: mw.Canvas
	public get canvas_LastWave(): mw.Canvas {
		if(!this.canvas_LastWave_Internal&&this.uiWidgetBase) {
			this.canvas_LastWave_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LastWave') as mw.Canvas
		}
		return this.canvas_LastWave_Internal
	}
	private txt_hint_Internal: mw.TextBlock
	public get txt_hint(): mw.TextBlock {
		if(!this.txt_hint_Internal&&this.uiWidgetBase) {
			this.txt_hint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LastWave/txt_hint') as mw.TextBlock
		}
		return this.txt_hint_Internal
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
	   
	   this.initLanguage(this.txt_hint)
	   
	
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
