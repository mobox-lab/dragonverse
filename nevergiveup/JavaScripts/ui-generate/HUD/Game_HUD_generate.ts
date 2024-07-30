
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/HUD/Game_HUD.ui')
export default class Game_HUD_Generate extends UIScript {
		private canvas_emoji_Internal: mw.Canvas
	public get canvas_emoji(): mw.Canvas {
		if(!this.canvas_emoji_Internal&&this.uiWidgetBase) {
			this.canvas_emoji_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_emoji') as mw.Canvas
		}
		return this.canvas_emoji_Internal
	}
	private scrollBox_emoji_Internal: mw.ScrollBox
	public get scrollBox_emoji(): mw.ScrollBox {
		if(!this.scrollBox_emoji_Internal&&this.uiWidgetBase) {
			this.scrollBox_emoji_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_emoji/scrollBox_emoji') as mw.ScrollBox
		}
		return this.scrollBox_emoji_Internal
	}
	private mCanvasEmoji_Internal: mw.Canvas
	public get mCanvasEmoji(): mw.Canvas {
		if(!this.mCanvasEmoji_Internal&&this.uiWidgetBase) {
			this.mCanvasEmoji_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_emoji/scrollBox_emoji/mCanvasEmoji') as mw.Canvas
		}
		return this.mCanvasEmoji_Internal
	}
	private canvas_btn_Internal: mw.Canvas
	public get canvas_btn(): mw.Canvas {
		if(!this.canvas_btn_Internal&&this.uiWidgetBase) {
			this.canvas_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_btn') as mw.Canvas
		}
		return this.canvas_btn_Internal
	}
	private emojiBtn_Internal: mw.StaleButton
	public get emojiBtn(): mw.StaleButton {
		if(!this.emojiBtn_Internal&&this.uiWidgetBase) {
			this.emojiBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_btn/emojiBtn') as mw.StaleButton
		}
		return this.emojiBtn_Internal
	}



   protected onAwake() {
	   //设置能否每帧触发onUpdate
	   this.canUpdate = false;
	   this.layer = mw.UILayerBottom;
	   this.initButtons();
   }
   protected initButtons() {
	   //按钮添加点击
	   
	   this.emojiBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "emojiBtn");
	   })
	   this.initLanguage(this.emojiBtn);
	   this.emojiBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
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
