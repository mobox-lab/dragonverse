
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/prompt/ProximityPrompts.ui
*/



@UIBind('UI/prompt/ProximityPrompts.ui')
export default class ProximityPrompts_Generate extends UIScript {
		private options_Internal: mw.Canvas
	public get options(): mw.Canvas {
		if(!this.options_Internal&&this.uiWidgetBase) {
			this.options_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/options') as mw.Canvas
		}
		return this.options_Internal
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
		
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 