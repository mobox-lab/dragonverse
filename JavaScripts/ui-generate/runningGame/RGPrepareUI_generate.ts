
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/runningGame/RGPrepareUI.ui
*/



@UIBind('UI/runningGame/RGPrepareUI.ui')
export default class RGPrepareUI_Generate extends UIScript {
		private mReady_Internal: mw.TextBlock
	public get mReady(): mw.TextBlock {
		if(!this.mReady_Internal&&this.uiWidgetBase) {
			this.mReady_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mReady') as mw.TextBlock
		}
		return this.mReady_Internal
	}
	private mGo_Internal: mw.TextBlock
	public get mGo(): mw.TextBlock {
		if(!this.mGo_Internal&&this.uiWidgetBase) {
			this.mGo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGo') as mw.TextBlock
		}
		return this.mGo_Internal
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
		
		this.initLanguage(this.mReady)
		
	
		this.initLanguage(this.mGo)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 