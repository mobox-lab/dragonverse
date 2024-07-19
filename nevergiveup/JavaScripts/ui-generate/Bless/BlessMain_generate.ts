
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Bless/BlessMain.ui')
export default class BlessMain_Generate extends UIScript {
	


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
	   
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextTitle") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextDesc") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextLight") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextDark") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextWater") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextFire") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextWood") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextEarth") as any);
	   
	

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
