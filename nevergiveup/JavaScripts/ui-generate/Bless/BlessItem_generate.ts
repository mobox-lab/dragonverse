
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Bless/BlessItem.ui')
export default class BlessItem_Generate extends UIScript {
		private img_IconBg_Internal: mw.Image
	public get img_IconBg(): mw.Image {
		if(!this.img_IconBg_Internal&&this.uiWidgetBase) {
			this.img_IconBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_IconBg') as mw.Image
		}
		return this.img_IconBg_Internal
	}
	private img_Icon_Internal: mw.Image
	public get img_Icon(): mw.Image {
		if(!this.img_Icon_Internal&&this.uiWidgetBase) {
			this.img_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_Icon') as mw.Image
		}
		return this.img_Icon_Internal
	}
	private txt_Percent_Internal: mw.TextBlock
	public get txt_Percent(): mw.TextBlock {
		if(!this.txt_Percent_Internal&&this.uiWidgetBase) {
			this.txt_Percent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_Percent') as mw.TextBlock
		}
		return this.txt_Percent_Internal
	}
	private img_Corner_Internal: mw.Image
	public get img_Corner(): mw.Image {
		if(!this.img_Corner_Internal&&this.uiWidgetBase) {
			this.img_Corner_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_Corner') as mw.Image
		}
		return this.img_Corner_Internal
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
	   
	   this.initLanguage(this.txt_Percent)
	   
	
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
