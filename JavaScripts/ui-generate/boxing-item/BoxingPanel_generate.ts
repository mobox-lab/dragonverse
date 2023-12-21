
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/boxing-item/BoxingPanel.ui
*/



@UIBind('UI/boxing-item/BoxingPanel.ui')
export default class BoxingPanel_Generate extends UIScript {
		private imgBoxingBG_Internal: mw.Image
	public get imgBoxingBG(): mw.Image {
		if(!this.imgBoxingBG_Internal&&this.uiWidgetBase) {
			this.imgBoxingBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/imgBoxingBG') as mw.Image
		}
		return this.imgBoxingBG_Internal
	}
	private btnBoxing_Internal: mw.StaleButton
	public get btnBoxing(): mw.StaleButton {
		if(!this.btnBoxing_Internal&&this.uiWidgetBase) {
			this.btnBoxing_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnBoxing') as mw.StaleButton
		}
		return this.btnBoxing_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		
		this.initLanguage(this.btnBoxing);
		
	
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
 