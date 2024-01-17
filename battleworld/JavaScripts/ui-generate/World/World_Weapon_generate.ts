
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/World/World_Weapon.ui
 * TIME: 2023.11.15-14.12.50
 */

 

 @UIBind('UI/World/World_Weapon.ui')
 export default class World_Weapon_Generate extends UIScript {
	 	private mGold_Internal: mw.TextBlock
	public get mGold(): mw.TextBlock {
		if(!this.mGold_Internal&&this.uiWidgetBase) {
			this.mGold_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGold') as mw.TextBlock
		}
		return this.mGold_Internal
	}


 
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
		
		this.initLanguage(this.mGold)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 