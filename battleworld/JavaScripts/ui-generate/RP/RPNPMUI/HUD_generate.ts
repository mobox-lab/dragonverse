
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/RP/RPNPMUI/HUD.ui
 * TIME: 2023.11.15-14.12.51
 */

 

 @UIBind('UI/RP/RPNPMUI/HUD.ui')
 export default class HUD_Generate extends UIScript {
	 	private mTouchPadDesigner_Internal: mw.TouchPad
	public get mTouchPadDesigner(): mw.TouchPad {
		if(!this.mTouchPadDesigner_Internal&&this.uiWidgetBase) {
			this.mTouchPadDesigner_Internal = this.uiWidgetBase.findChildByPath('Canvas/JoyStick/mTouchPadDesigner') as mw.TouchPad
		}
		return this.mTouchPadDesigner_Internal
	}
	private mJump_btn_Internal: mw.StaleButton
	public get mJump_btn(): mw.StaleButton {
		if(!this.mJump_btn_Internal&&this.uiWidgetBase) {
			this.mJump_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mRightDownCon/mJump_btn') as mw.StaleButton
		}
		return this.mJump_btn_Internal
	}
	private mExitInteractive_btn_Internal: mw.StaleButton
	public get mExitInteractive_btn(): mw.StaleButton {
		if(!this.mExitInteractive_btn_Internal&&this.uiWidgetBase) {
			this.mExitInteractive_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mRightDownCon/mExitInteractive_btn') as mw.StaleButton
		}
		return this.mExitInteractive_btn_Internal
	}
	private mRightDownCon_Internal: mw.Canvas
	public get mRightDownCon(): mw.Canvas {
		if(!this.mRightDownCon_Internal&&this.uiWidgetBase) {
			this.mRightDownCon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mRightDownCon') as mw.Canvas
		}
		return this.mRightDownCon_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mJump_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mJump_btn");
		})
		this.initLanguage(this.mJump_btn);
		//this.mJump_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mExitInteractive_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mExitInteractive_btn");
		})
		this.initLanguage(this.mExitInteractive_btn);
		//this.mExitInteractive_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
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
 