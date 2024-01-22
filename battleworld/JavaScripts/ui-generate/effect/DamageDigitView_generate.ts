
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 真爱与自由
 * UI: UI/effect/DamageDigitView.ui
 * TIME: 2023.12.15-19.34.56
 */

 

 @UIBind('UI/effect/DamageDigitView.ui')
 export default class DamageDigitView_Generate extends UIScript {
	 

 
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
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Damage_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Blood_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Recover_txt") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 