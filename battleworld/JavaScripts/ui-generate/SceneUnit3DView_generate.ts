
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/SceneUnit3DView.ui
 */

 

 @UIBind('UI/SceneUnit3DView.ui')
 export default class SceneUnit3DView_Generate extends UIScript {
	 	private txt_name_Internal: mw.TextBlock
	public get txt_name(): mw.TextBlock {
		if(!this.txt_name_Internal&&this.uiWidgetBase) {
			this.txt_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_name') as mw.TextBlock
		}
		return this.txt_name_Internal
	}
	private bar_hp_back_Internal: mw.ProgressBar
	public get bar_hp_back(): mw.ProgressBar {
		if(!this.bar_hp_back_Internal&&this.uiWidgetBase) {
			this.bar_hp_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bar_hp_back') as mw.ProgressBar
		}
		return this.bar_hp_back_Internal
	}
	private bar_hp_Internal: mw.ProgressBar
	public get bar_hp(): mw.ProgressBar {
		if(!this.bar_hp_Internal&&this.uiWidgetBase) {
			this.bar_hp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bar_hp') as mw.ProgressBar
		}
		return this.bar_hp_Internal
	}
	private txt_lv_Internal: mw.TextBlock
	public get txt_lv(): mw.TextBlock {
		if(!this.txt_lv_Internal&&this.uiWidgetBase) {
			this.txt_lv_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_lv') as mw.TextBlock
		}
		return this.txt_lv_Internal
	}
	private bar_AtkCd_back_Internal: mw.ProgressBar
	public get bar_AtkCd_back(): mw.ProgressBar {
		if(!this.bar_AtkCd_back_Internal&&this.uiWidgetBase) {
			this.bar_AtkCd_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bar_AtkCd_back') as mw.ProgressBar
		}
		return this.bar_AtkCd_back_Internal
	}
	private bar_AtkCd_Internal: mw.ProgressBar
	public get bar_AtkCd(): mw.ProgressBar {
		if(!this.bar_AtkCd_Internal&&this.uiWidgetBase) {
			this.bar_AtkCd_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bar_AtkCd') as mw.ProgressBar
		}
		return this.bar_AtkCd_Internal
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
		
		this.initLanguage(this.txt_name)
		
	
		this.initLanguage(this.txt_lv)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 