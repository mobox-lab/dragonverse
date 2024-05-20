
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/Word.ui
 */

 

 @UIBind('UI/Word.ui')
 export default class Word_Generate extends UIScript {
	 	private mBtn_word_Internal: mw.StaleButton
	public get mBtn_word(): mw.StaleButton {
		if(!this.mBtn_word_Internal&&this.uiWidgetBase) {
			this.mBtn_word_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_word') as mw.StaleButton
		}
		return this.mBtn_word_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_word.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_word");
		})
		this.initLanguage(this.mBtn_word);
		//this.mBtn_word.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
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
 