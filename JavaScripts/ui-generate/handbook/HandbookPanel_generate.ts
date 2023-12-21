
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/handbook/HandbookPanel.ui
*/



@UIBind('UI/handbook/HandbookPanel.ui')
export default class HandbookPanel_Generate extends UIScript {
		private mProBackground_Internal: mw.Image
	public get mProBackground(): mw.Image {
		if(!this.mProBackground_Internal&&this.uiWidgetBase) {
			this.mProBackground_Internal = this.uiWidgetBase.findChildByPath('Canvas/mProBackground') as mw.Image
		}
		return this.mProBackground_Internal
	}
	private mBackground_Internal: mw.Image
	public get mBackground(): mw.Image {
		if(!this.mBackground_Internal&&this.uiWidgetBase) {
			this.mBackground_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBackground') as mw.Image
		}
		return this.mBackground_Internal
	}
	private mScrollView_Internal: mw.ScrollBox
	public get mScrollView(): mw.ScrollBox {
		if(!this.mScrollView_Internal&&this.uiWidgetBase) {
			this.mScrollView_Internal = this.uiWidgetBase.findChildByPath('Canvas/mScrollView') as mw.ScrollBox
		}
		return this.mScrollView_Internal
	}
	private mProgressBar_Internal: mw.ProgressBar
	public get mProgressBar(): mw.ProgressBar {
		if(!this.mProgressBar_Internal&&this.uiWidgetBase) {
			this.mProgressBar_Internal = this.uiWidgetBase.findChildByPath('Canvas/mProgressBar') as mw.ProgressBar
		}
		return this.mProgressBar_Internal
	}
	private mTextFound_Internal: mw.TextBlock
	public get mTextFound(): mw.TextBlock {
		if(!this.mTextFound_Internal&&this.uiWidgetBase) {
			this.mTextFound_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTextFound') as mw.TextBlock
		}
		return this.mTextFound_Internal
	}
	private mTextCompletion_Internal: mw.TextBlock
	public get mTextCompletion(): mw.TextBlock {
		if(!this.mTextCompletion_Internal&&this.uiWidgetBase) {
			this.mTextCompletion_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTextCompletion') as mw.TextBlock
		}
		return this.mTextCompletion_Internal
	}
	private btnClose_Internal: mw.StaleButton
	public get btnClose(): mw.StaleButton {
		if(!this.btnClose_Internal&&this.uiWidgetBase) {
			this.btnClose_Internal = this.uiWidgetBase.findChildByPath('Canvas/btnClose') as mw.StaleButton
		}
		return this.btnClose_Internal
	}
	private mTittle_Internal: mw.TextBlock
	public get mTittle(): mw.TextBlock {
		if(!this.mTittle_Internal&&this.uiWidgetBase) {
			this.mTittle_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTittle') as mw.TextBlock
		}
		return this.mTittle_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		
		this.initLanguage(this.btnClose);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextFound)
		
	
		this.initLanguage(this.mTextCompletion)
		
	
		this.initLanguage(this.mTittle)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 