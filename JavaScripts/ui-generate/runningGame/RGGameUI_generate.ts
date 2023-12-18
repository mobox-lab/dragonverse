
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/runningGame/RGGameUI.ui
*/



@UIBind('UI/runningGame/RGGameUI.ui')
export default class RGGameUI_Generate extends UIScript {
		private mScoreCanvas_Internal: mw.Canvas
	public get mScoreCanvas(): mw.Canvas {
		if(!this.mScoreCanvas_Internal&&this.uiWidgetBase) {
			this.mScoreCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScoreCanvas') as mw.Canvas
		}
		return this.mScoreCanvas_Internal
	}
	private mImage_Internal: mw.Image
	public get mImage(): mw.Image {
		if(!this.mImage_Internal&&this.uiWidgetBase) {
			this.mImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScoreCanvas/mImage') as mw.Image
		}
		return this.mImage_Internal
	}
	private mScoreText_Internal: mw.TextBlock
	public get mScoreText(): mw.TextBlock {
		if(!this.mScoreText_Internal&&this.uiWidgetBase) {
			this.mScoreText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScoreCanvas/mScoreText') as mw.TextBlock
		}
		return this.mScoreText_Internal
	}
	private mScoreFly_Internal: mw.TextBlock
	public get mScoreFly(): mw.TextBlock {
		if(!this.mScoreFly_Internal&&this.uiWidgetBase) {
			this.mScoreFly_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScoreCanvas/mScoreFly') as mw.TextBlock
		}
		return this.mScoreFly_Internal
	}
	private mTimeCanvas_Internal: mw.Canvas
	public get mTimeCanvas(): mw.Canvas {
		if(!this.mTimeCanvas_Internal&&this.uiWidgetBase) {
			this.mTimeCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTimeCanvas') as mw.Canvas
		}
		return this.mTimeCanvas_Internal
	}
	private mCountDown_Internal: mw.TextBlock
	public get mCountDown(): mw.TextBlock {
		if(!this.mCountDown_Internal&&this.uiWidgetBase) {
			this.mCountDown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTimeCanvas/mCountDown') as mw.TextBlock
		}
		return this.mCountDown_Internal
	}
	private mTimeFly_Internal: mw.TextBlock
	public get mTimeFly(): mw.TextBlock {
		if(!this.mTimeFly_Internal&&this.uiWidgetBase) {
			this.mTimeFly_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTimeCanvas/mTimeFly') as mw.TextBlock
		}
		return this.mTimeFly_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private info_Internal: mw.TextBlock
	public get info(): mw.TextBlock {
		if(!this.info_Internal&&this.uiWidgetBase) {
			this.info_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScrollBox/info') as mw.TextBlock
		}
		return this.info_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 