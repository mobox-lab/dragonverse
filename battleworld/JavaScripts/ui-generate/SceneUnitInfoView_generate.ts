
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/SceneUnitInfoView.ui
 */

 

 @UIBind('UI/SceneUnitInfoView.ui')
 export default class SceneUnitInfoView_Generate extends UIScript {
	 	private con_damage_rank_Internal: mw.Canvas
	public get con_damage_rank(): mw.Canvas {
		if(!this.con_damage_rank_Internal&&this.uiWidgetBase) {
			this.con_damage_rank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_damage_rank') as mw.Canvas
		}
		return this.con_damage_rank_Internal
	}
	private bar_hp_back_Internal: mw.ProgressBar
	public get bar_hp_back(): mw.ProgressBar {
		if(!this.bar_hp_back_Internal&&this.uiWidgetBase) {
			this.bar_hp_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bar_hp_back') as mw.ProgressBar
		}
		return this.bar_hp_back_Internal
	}
	private bar_hp_front_Internal: mw.ProgressBar
	public get bar_hp_front(): mw.ProgressBar {
		if(!this.bar_hp_front_Internal&&this.uiWidgetBase) {
			this.bar_hp_front_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bar_hp_front') as mw.ProgressBar
		}
		return this.bar_hp_front_Internal
	}
	private image_bg_Internal: mw.Image
	public get image_bg(): mw.Image {
		if(!this.image_bg_Internal&&this.uiWidgetBase) {
			this.image_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/image_bg') as mw.Image
		}
		return this.image_bg_Internal
	}
	private txt_name_Internal: mw.TextBlock
	public get txt_name(): mw.TextBlock {
		if(!this.txt_name_Internal&&this.uiWidgetBase) {
			this.txt_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_name') as mw.TextBlock
		}
		return this.txt_name_Internal
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
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_1") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 