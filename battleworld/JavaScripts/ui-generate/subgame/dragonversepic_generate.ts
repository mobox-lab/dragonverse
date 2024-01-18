
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 断桥烟雨
 * UI: UI/subgame/dragonversepic.ui
 * TIME: 2024.01.17-18.01.52
 */

 

 @UIBind('UI/subgame/dragonversepic.ui')
 export default class dragonversepic_Generate extends UIScript {
	 

 
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
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 