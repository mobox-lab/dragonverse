
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/RP/RPNPMUI/ActionModule/ActionHUD.ui
 * TIME: 2023.11.15-14.12.51
 */

 

 @UIBind('UI/RP/RPNPMUI/ActionModule/ActionHUD.ui')
 export default class ActionHUD_Generate extends UIScript {
	 	private mAction_btn_Internal: mw.StaleButton
	public get mAction_btn(): mw.StaleButton {
		if(!this.mAction_btn_Internal&&this.uiWidgetBase) {
			this.mAction_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mAction_btn') as mw.StaleButton
		}
		return this.mAction_btn_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mAction_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAction_btn");
		})
		this.initLanguage(this.mAction_btn);
		//this.mAction_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
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
 