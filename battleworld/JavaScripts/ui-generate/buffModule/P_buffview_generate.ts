
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/buffModule/P_buffview.ui
 */

 

 @UIBind('UI/buffModule/P_buffview.ui')
 export default class P_buffview_Generate extends UIScript {
	 	private mBuffCanvas_Internal: mw.Canvas
	public get mBuffCanvas(): mw.Canvas {
		if(!this.mBuffCanvas_Internal&&this.uiWidgetBase) {
			this.mBuffCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuffCanvas') as mw.Canvas
		}
		return this.mBuffCanvas_Internal
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
		
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 