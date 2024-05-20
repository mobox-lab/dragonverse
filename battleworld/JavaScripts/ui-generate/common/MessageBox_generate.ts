
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/common/MessageBox.ui
 */

 

 @UIBind('UI/common/MessageBox.ui')
 export default class MessageBox_Generate extends UIScript {
	 	private mContent_txt_Internal: mw.TextBlock
	public get mContent_txt(): mw.TextBlock {
		if(!this.mContent_txt_Internal&&this.uiWidgetBase) {
			this.mContent_txt_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mContent_txt') as mw.TextBlock
		}
		return this.mContent_txt_Internal
	}
	private mRichText_Internal: mw.TextBlock
	public get mRichText(): mw.TextBlock {
		if(!this.mRichText_Internal&&this.uiWidgetBase) {
			this.mRichText_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mRichText') as mw.TextBlock
		}
		return this.mRichText_Internal
	}
	private mYes_btn_Internal: mw.StaleButton
	public get mYes_btn(): mw.StaleButton {
		if(!this.mYes_btn_Internal&&this.uiWidgetBase) {
			this.mYes_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mYes_btn') as mw.StaleButton
		}
		return this.mYes_btn_Internal
	}
	private mNo_btn_Internal: mw.StaleButton
	public get mNo_btn(): mw.StaleButton {
		if(!this.mNo_btn_Internal&&this.uiWidgetBase) {
			this.mNo_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mNo_btn') as mw.StaleButton
		}
		return this.mNo_btn_Internal
	}
	private mTitle_txt_Internal: mw.TextBlock
	public get mTitle_txt(): mw.TextBlock {
		if(!this.mTitle_txt_Internal&&this.uiWidgetBase) {
			this.mTitle_txt_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mTitle_txt') as mw.TextBlock
		}
		return this.mTitle_txt_Internal
	}
	private mOK_btn_Internal: mw.StaleButton
	public get mOK_btn(): mw.StaleButton {
		if(!this.mOK_btn_Internal&&this.uiWidgetBase) {
			this.mOK_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mOK_btn') as mw.StaleButton
		}
		return this.mOK_btn_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mYes_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mYes_btn");
		})
		this.initLanguage(this.mYes_btn);
		//this.mYes_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mNo_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mNo_btn");
		})
		this.initLanguage(this.mNo_btn);
		//this.mNo_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mOK_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mOK_btn");
		})
		this.initLanguage(this.mOK_btn);
		//this.mOK_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mContent_txt)
		
	
		this.initLanguage(this.mRichText)
		
	
		this.initLanguage(this.mTitle_txt)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 