
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Sundry/TextItemUI.ui')
export default class TextItemUI_Generate extends UIScript {
		private textCanvas_Internal: mw.Canvas
	public get textCanvas(): mw.Canvas {
		if(!this.textCanvas_Internal&&this.uiWidgetBase) {
			this.textCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textCanvas') as mw.Canvas
		}
		return this.textCanvas_Internal
	}
	private txt_title_Internal: mw.TextBlock
	public get txt_title(): mw.TextBlock {
		if(!this.txt_title_Internal&&this.uiWidgetBase) {
			this.txt_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textCanvas/txt_title') as mw.TextBlock
		}
		return this.txt_title_Internal
	}
	private img_icon_Internal: mw.Image
	public get img_icon(): mw.Image {
		if(!this.img_icon_Internal&&this.uiWidgetBase) {
			this.img_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textCanvas/Canvas/img_icon') as mw.Image
		}
		return this.img_icon_Internal
	}
	private txt_value_Internal: mw.TextBlock
	public get txt_value(): mw.TextBlock {
		if(!this.txt_value_Internal&&this.uiWidgetBase) {
			this.txt_value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textCanvas/Canvas/txt_value') as mw.TextBlock
		}
		return this.txt_value_Internal
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
	   
	   this.initLanguage(this.txt_title)
	   
	
	   this.initLanguage(this.txt_value)
	   
	
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
