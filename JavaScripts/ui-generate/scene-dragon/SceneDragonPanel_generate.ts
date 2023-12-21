
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/scene-dragon/SceneDragonPanel.ui
*/



@UIBind('UI/scene-dragon/SceneDragonPanel.ui')
export default class SceneDragonPanel_Generate extends UIScript {
		private btnCatch_Internal: mw.StaleButton
	public get btnCatch(): mw.StaleButton {
		if(!this.btnCatch_Internal&&this.uiWidgetBase) {
			this.btnCatch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnCatch') as mw.StaleButton
		}
		return this.btnCatch_Internal
	}
	private imgIcon_Internal: mw.Image
	public get imgIcon(): mw.Image {
		if(!this.imgIcon_Internal&&this.uiWidgetBase) {
			this.imgIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/imgIcon') as mw.Image
		}
		return this.imgIcon_Internal
	}
	private txtName_Internal: mw.TextBlock
	public get txtName(): mw.TextBlock {
		if(!this.txtName_Internal&&this.uiWidgetBase) {
			this.txtName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txtName') as mw.TextBlock
		}
		return this.txtName_Internal
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
		
		this.initLanguage(this.txtName)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 