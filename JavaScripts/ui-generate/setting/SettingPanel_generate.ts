/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * UI: UI/setting/SettingPanel.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/setting/SettingPanel.ui')
export default class SettingPanel_Generate extends UIScript {



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		this.initTextLan();
	}

    public initTextLan() {
        
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
        let lanFunc = mw.UIScript.getBehavior("lan");
        lanFunc && lanFunc(ui);
    }
}
 