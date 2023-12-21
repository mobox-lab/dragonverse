
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/head/HeadUIPanel.ui
*/



@UIBind('UI/head/HeadUIPanel.ui')
export default class HeadUIPanel_Generate extends UIScript {
		private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private title_Internal: mw.TextBlock
	public get title(): mw.TextBlock {
		if(!this.title_Internal&&this.uiWidgetBase) {
			this.title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/title') as mw.TextBlock
		}
		return this.title_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.title)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 