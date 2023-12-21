
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/scene-dragon/SceneDragonPanel.ui
*/



@UIBind('UI/scene-dragon/SceneDragonPanel.ui')
export default class SceneDragonPanel_Generate extends UIScript {
		private imgBoxingBG_Internal: mw.Image
	public get imgBoxingBG(): mw.Image {
		if(!this.imgBoxingBG_Internal&&this.uiWidgetBase) {
			this.imgBoxingBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/imgBoxingBG') as mw.Image
		}
		return this.imgBoxingBG_Internal
	}
	private btnCatch_Internal: mw.StaleButton
	public get btnCatch(): mw.StaleButton {
		if(!this.btnCatch_Internal&&this.uiWidgetBase) {
			this.btnCatch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnCatch') as mw.StaleButton
		}
		return this.btnCatch_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		
		this.initLanguage(this.btnCatch);
		
	
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
 