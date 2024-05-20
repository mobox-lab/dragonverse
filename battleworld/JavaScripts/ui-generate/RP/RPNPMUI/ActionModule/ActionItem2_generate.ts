
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/RP/RPNPMUI/ActionModule/ActionItem2.ui
 */

 

 @UIBind('UI/RP/RPNPMUI/ActionModule/ActionItem2.ui')
 export default class ActionItem2_Generate extends UIScript {
	 	private mBg_Internal: mw.Image
	public get mBg(): mw.Image {
		if(!this.mBg_Internal&&this.uiWidgetBase) {
			this.mBg_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBg') as mw.Image
		}
		return this.mBg_Internal
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
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/Btn") as any);
		
	
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
 