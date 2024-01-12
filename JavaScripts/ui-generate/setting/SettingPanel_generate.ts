/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 1.0.8
 * UI: UI/setting/SettingPanel.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/setting/SettingPanel.ui')
export default class SettingPanel_Generate extends UIScript {



	protected onAwake() {
		this.initTextLan();
	}

    public destroy(): void {
        this.unregisterTextLan();
        super.destroy();
    }

    protected initTextLan() {
        // 文本按钮多语言
        
        // 静态文本按钮多语言
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingButtonRename") as mw.StaleButton);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingButtonLanguage") as mw.StaleButton);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingButtonLogout") as mw.StaleButton);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingButtonModify") as mw.StaleButton);
        
	
        // 文本多语言
        
        // 静态文本多语言
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingTitle") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingDescrition") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingName") as mw.TextBlock);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        // 隐藏文本按钮多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingButtonRename") as mw.StaleButton);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingButtonLanguage") as mw.StaleButton);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingButtonLogout") as mw.StaleButton);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingButtonModify") as mw.StaleButton);
        
	
        // 文本多语言
        
        // 隐藏文本多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingTitle") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingDescrition") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("SettingCanvas/SettingName") as mw.TextBlock);
        
	
    }

    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let lanFunc = mw.UIScript.getBehavior("lan");
        lanFunc?.(ui);
    }

    private unregisterLanKey(ui: mw.StaleButton | mw.TextBlock) {
        let unregisterFunc = mw.UIScript.getBehavior("unregister");
        unregisterFunc?.(ui);
    }
}
 