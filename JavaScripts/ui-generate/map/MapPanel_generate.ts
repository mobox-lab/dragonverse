
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/map/MapPanel.ui
*/



@UIBind('UI/map/MapPanel.ui')
export default class MapPanel_Generate extends UIScript {
		private mSmallCanvas_Internal: mw.Canvas
	public get mSmallCanvas(): mw.Canvas {
		if(!this.mSmallCanvas_Internal&&this.uiWidgetBase) {
			this.mSmallCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSmallCanvas') as mw.Canvas
		}
		return this.mSmallCanvas_Internal
	}
	private mSmallMapCanvas_Internal: mw.Canvas
	public get mSmallMapCanvas(): mw.Canvas {
		if(!this.mSmallMapCanvas_Internal&&this.uiWidgetBase) {
			this.mSmallMapCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSmallCanvas/mSmallMapCanvas') as mw.Canvas
		}
		return this.mSmallMapCanvas_Internal
	}
	private mSmallMineCanvas_Internal: mw.Canvas
	public get mSmallMineCanvas(): mw.Canvas {
		if(!this.mSmallMineCanvas_Internal&&this.uiWidgetBase) {
			this.mSmallMineCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSmallCanvas/mSmallMineCanvas') as mw.Canvas
		}
		return this.mSmallMineCanvas_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 