
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/guideModule/GuideDialog.ui
 */

 

 @UIBind('UI/guideModule/GuideDialog.ui')
 export default class GuideDialog_Generate extends UIScript {
	 	private mGuideBtn_Internal: mw.StaleButton
	public get mGuideBtn(): mw.StaleButton {
		if(!this.mGuideBtn_Internal&&this.uiWidgetBase) {
			this.mGuideBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGuideBtn') as mw.StaleButton
		}
		return this.mGuideBtn_Internal
	}
	private mGuideText_Internal: mw.TextBlock
	public get mGuideText(): mw.TextBlock {
		if(!this.mGuideText_Internal&&this.uiWidgetBase) {
			this.mGuideText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGuideText') as mw.TextBlock
		}
		return this.mGuideText_Internal
	}
	private mTextBlock_Internal: mw.TextBlock
	public get mTextBlock(): mw.TextBlock {
		if(!this.mTextBlock_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTextBlock') as mw.TextBlock
		}
		return this.mTextBlock_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mGuideBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mGuideBtn");
		})
		this.initLanguage(this.mGuideBtn);
		//this.mGuideBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mGuideText)
		
	
		this.initLanguage(this.mTextBlock)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 