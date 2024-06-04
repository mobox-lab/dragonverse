
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Sundry/CutsceneUI.ui')
export default class CutsceneUI_Generate extends UIScript {
		private showCanvas_Internal: mw.Canvas
	public get showCanvas(): mw.Canvas {
		if(!this.showCanvas_Internal&&this.uiWidgetBase) {
			this.showCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/showCanvas') as mw.Canvas
		}
		return this.showCanvas_Internal
	}
	private upImage_1_Internal: mw.Image
	public get upImage_1(): mw.Image {
		if(!this.upImage_1_Internal&&this.uiWidgetBase) {
			this.upImage_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/showCanvas/upImage_1') as mw.Image
		}
		return this.upImage_1_Internal
	}
	private downImage_1_1_Internal: mw.Image
	public get downImage_1_1(): mw.Image {
		if(!this.downImage_1_1_Internal&&this.uiWidgetBase) {
			this.downImage_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/showCanvas/downImage_1_1') as mw.Image
		}
		return this.downImage_1_1_Internal
	}
	private upImage_1_1_Internal: mw.Image
	public get upImage_1_1(): mw.Image {
		if(!this.upImage_1_1_Internal&&this.uiWidgetBase) {
			this.upImage_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/showCanvas/upImage_1_1') as mw.Image
		}
		return this.upImage_1_1_Internal
	}
	private upImage_1_1_1_Internal: mw.Image
	public get upImage_1_1_1(): mw.Image {
		if(!this.upImage_1_1_1_Internal&&this.uiWidgetBase) {
			this.upImage_1_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/showCanvas/upImage_1_1_1') as mw.Image
		}
		return this.upImage_1_1_1_Internal
	}
	private maskBtn_Internal: mw.MaskButton
	public get maskBtn(): mw.MaskButton {
		if(!this.maskBtn_Internal&&this.uiWidgetBase) {
			this.maskBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/maskBtn') as mw.MaskButton
		}
		return this.maskBtn_Internal
	}
	private mMaskCanvas_Internal: mw.Canvas
	public get mMaskCanvas(): mw.Canvas {
		if(!this.mMaskCanvas_Internal&&this.uiWidgetBase) {
			this.mMaskCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMaskCanvas') as mw.Canvas
		}
		return this.mMaskCanvas_Internal
	}
	private maskImg_Internal: mw.Image
	public get maskImg(): mw.Image {
		if(!this.maskImg_Internal&&this.uiWidgetBase) {
			this.maskImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMaskCanvas/maskImg') as mw.Image
		}
		return this.maskImg_Internal
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
