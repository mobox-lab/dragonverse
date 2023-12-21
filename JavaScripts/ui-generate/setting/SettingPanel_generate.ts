
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/setting/SettingPanel.ui
*/



@UIBind('UI/setting/SettingPanel.ui')
export default class SettingPanel_Generate extends UIScript {
	

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		
		//按钮多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingButtonRename") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingButtonLanguage") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingButtonLogout") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingButtonModify") as any);
		
	
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingTitle") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingDescrition") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingName") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 