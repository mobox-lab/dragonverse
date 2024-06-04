
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/guideModule/DialogUI.ui')
export default class DialogUI_Generate extends UIScript {
		private mbackground_Internal: mw.Image
	public get mbackground(): mw.Image {
		if(!this.mbackground_Internal&&this.uiWidgetBase) {
			this.mbackground_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mbackground') as mw.Image
		}
		return this.mbackground_Internal
	}
	private mCanvasRight_Internal: mw.Canvas
	public get mCanvasRight(): mw.Canvas {
		if(!this.mCanvasRight_Internal&&this.uiWidgetBase) {
			this.mCanvasRight_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvasRight') as mw.Canvas
		}
		return this.mCanvasRight_Internal
	}
	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvasRight/Canvas_2/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mMessage_Internal: mw.TextBlock
	public get mMessage(): mw.TextBlock {
		if(!this.mMessage_Internal&&this.uiWidgetBase) {
			this.mMessage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvasRight/mMessage') as mw.TextBlock
		}
		return this.mMessage_Internal
	}
	private mContinue_Internal: mw.Button
	public get mContinue(): mw.Button {
		if(!this.mContinue_Internal&&this.uiWidgetBase) {
			this.mContinue_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContinue') as mw.Button
		}
		return this.mContinue_Internal
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
	   
	   this.mContinue.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mContinue");
	   })
	   this.mContinue.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.mName)
	   
	
	   this.initLanguage(this.mMessage)
	   
	
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
