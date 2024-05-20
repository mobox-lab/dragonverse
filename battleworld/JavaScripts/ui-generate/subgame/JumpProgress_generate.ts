
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/subgame/JumpProgress.ui
 */

 

 @UIBind('UI/subgame/JumpProgress.ui')
 export default class JumpProgress_Generate extends UIScript {
	 	private cnvProgressBar_Internal: mw.Canvas
	public get cnvProgressBar(): mw.Canvas {
		if(!this.cnvProgressBar_Internal&&this.uiWidgetBase) {
			this.cnvProgressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvProgressBar') as mw.Canvas
		}
		return this.cnvProgressBar_Internal
	}
	private progressBar_Internal: mw.ProgressBar
	public get progressBar(): mw.ProgressBar {
		if(!this.progressBar_Internal&&this.uiWidgetBase) {
			this.progressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvProgressBar/progressBar') as mw.ProgressBar
		}
		return this.progressBar_Internal
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
 