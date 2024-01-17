
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/action/P_Game_Action.ui
 * TIME: 2023.11.15-14.12.48
 */

 

 @UIBind('UI/action/P_Game_Action.ui')
 export default class P_Game_Action_Generate extends UIScript {
	 	private mCon_Internal: mw.Canvas
	public get mCon(): mw.Canvas {
		if(!this.mCon_Internal&&this.uiWidgetBase) {
			this.mCon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon') as mw.Canvas
		}
		return this.mCon_Internal
	}
	private mScroll_Internal: mw.ScrollBox
	public get mScroll(): mw.ScrollBox {
		if(!this.mScroll_Internal&&this.uiWidgetBase) {
			this.mScroll_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon/mScroll') as mw.ScrollBox
		}
		return this.mScroll_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon/mScroll/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private mCloseBtn_Internal: mw.StaleButton
	public get mCloseBtn(): mw.StaleButton {
		if(!this.mCloseBtn_Internal&&this.uiWidgetBase) {
			this.mCloseBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon/mCloseBtn') as mw.StaleButton
		}
		return this.mCloseBtn_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mCloseBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseBtn");
		})
		this.initLanguage(this.mCloseBtn);
		//this.mCloseBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
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
 