
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/handbook/HandbookPanelItem.ui
*/



@UIBind('UI/handbook/HandbookPanelItem.ui')
export default class HandbookPanelItem_Generate extends UIScript {
		private mBgBtn_Internal: mw.StaleButton
	public get mBgBtn(): mw.StaleButton {
		if(!this.mBgBtn_Internal&&this.uiWidgetBase) {
			this.mBgBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBgBtn') as mw.StaleButton
		}
		return this.mBgBtn_Internal
	}
	private mIconImage_Internal: mw.Image
	public get mIconImage(): mw.Image {
		if(!this.mIconImage_Internal&&this.uiWidgetBase) {
			this.mIconImage_Internal = this.uiWidgetBase.findChildByPath('Canvas/mIconImage') as mw.Image
		}
		return this.mIconImage_Internal
	}
	private mTextName_Internal: mw.TextBlock
	public get mTextName(): mw.TextBlock {
		if(!this.mTextName_Internal&&this.uiWidgetBase) {
			this.mTextName_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTextName') as mw.TextBlock
		}
		return this.mTextName_Internal
	}
	private mLevelBgImage_Internal: mw.Image
	public get mLevelBgImage(): mw.Image {
		if(!this.mLevelBgImage_Internal&&this.uiWidgetBase) {
			this.mLevelBgImage_Internal = this.uiWidgetBase.findChildByPath('Canvas/mLevelBgImage') as mw.Image
		}
		return this.mLevelBgImage_Internal
	}
	private mTextLevel_Internal: mw.TextBlock
	public get mTextLevel(): mw.TextBlock {
		if(!this.mTextLevel_Internal&&this.uiWidgetBase) {
			this.mTextLevel_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTextLevel') as mw.TextBlock
		}
		return this.mTextLevel_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		
		this.initLanguage(this.mBgBtn);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextName)
		
	
		this.initLanguage(this.mTextLevel)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 