
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 麇沓
 * UI: UI/Main/MainUISkillButton.ui
 * TIME: 2023.11.28-09.43.44
 */

 

 @UIBind('UI/Main/MainUISkillButton.ui')
 export default class MainUISkillButton_Generate extends UIScript {
	 

 
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
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/MBtnName") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/MBlue") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 