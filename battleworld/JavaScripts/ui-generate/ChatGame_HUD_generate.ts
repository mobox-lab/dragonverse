
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/ChatGame_HUD.ui
 * TIME: 2023.11.15-14.12.48
 */

 

 @UIBind('UI/ChatGame_HUD.ui')
 export default class ChatGame_HUD_Generate extends UIScript {
	 	private mCanvasWord_Internal: mw.Canvas
	public get mCanvasWord(): mw.Canvas {
		if(!this.mCanvasWord_Internal&&this.uiWidgetBase) {
			this.mCanvasWord_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_word/scrollBox_word/mCanvasWord') as mw.Canvas
		}
		return this.mCanvasWord_Internal
	}
	private scrollBox_word_Internal: mw.ScrollBox
	public get scrollBox_word(): mw.ScrollBox {
		if(!this.scrollBox_word_Internal&&this.uiWidgetBase) {
			this.scrollBox_word_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_word/scrollBox_word') as mw.ScrollBox
		}
		return this.scrollBox_word_Internal
	}
	private canvas_word_Internal: mw.Canvas
	public get canvas_word(): mw.Canvas {
		if(!this.canvas_word_Internal&&this.uiWidgetBase) {
			this.canvas_word_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_word') as mw.Canvas
		}
		return this.canvas_word_Internal
	}
	private wordBtn_Internal: mw.StaleButton
	public get wordBtn(): mw.StaleButton {
		if(!this.wordBtn_Internal&&this.uiWidgetBase) {
			this.wordBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_btn/wordBtn') as mw.StaleButton
		}
		return this.wordBtn_Internal
	}
	private canvas_btn_Internal: mw.Canvas
	public get canvas_btn(): mw.Canvas {
		if(!this.canvas_btn_Internal&&this.uiWidgetBase) {
			this.canvas_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_btn') as mw.Canvas
		}
		return this.canvas_btn_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.wordBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "wordBtn");
		})
		this.initLanguage(this.wordBtn);
		//this.wordBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 