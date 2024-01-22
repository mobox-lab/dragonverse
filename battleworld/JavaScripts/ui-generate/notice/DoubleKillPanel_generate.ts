
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 提着兔子去北京
 * UI: UI/notice/DoubleKillPanel.ui
 * TIME: 2023.11.21-21.37.30
 */

 

 @UIBind('UI/notice/DoubleKillPanel.ui')
 export default class DoubleKillPanel_Generate extends UIScript {
	 	private mText_Internal: mw.TextBlock
	public get mText(): mw.TextBlock {
		if(!this.mText_Internal&&this.uiWidgetBase) {
			this.mText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText') as mw.TextBlock
		}
		return this.mText_Internal
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
		
		this.initLanguage(this.mText)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 