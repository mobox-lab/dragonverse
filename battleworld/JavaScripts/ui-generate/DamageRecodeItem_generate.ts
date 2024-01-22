
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/DamageRecodeItem.ui
 * TIME: 2023.11.15-14.12.48
 */

 

 @UIBind('UI/DamageRecodeItem.ui')
 export default class DamageRecodeItem_Generate extends UIScript {
	 	private txt_id_Internal: mw.TextBlock
	public get txt_id(): mw.TextBlock {
		if(!this.txt_id_Internal&&this.uiWidgetBase) {
			this.txt_id_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_id') as mw.TextBlock
		}
		return this.txt_id_Internal
	}
	private txt_damage_Internal: mw.TextBlock
	public get txt_damage(): mw.TextBlock {
		if(!this.txt_damage_Internal&&this.uiWidgetBase) {
			this.txt_damage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_damage') as mw.TextBlock
		}
		return this.txt_damage_Internal
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
		
		this.initLanguage(this.txt_id)
		
	
		this.initLanguage(this.txt_damage)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 