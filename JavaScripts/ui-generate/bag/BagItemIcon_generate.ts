
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/bag/BagItemIcon.ui
*/



@UIBind('UI/bag/BagItemIcon.ui')
export default class BagItemIcon_Generate extends UIScript {
		private mImgSelect_Internal: mw.Image
	public get mImgSelect(): mw.Image {
		if(!this.mImgSelect_Internal&&this.uiWidgetBase) {
			this.mImgSelect_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mImgSelect') as mw.Image
		}
		return this.mImgSelect_Internal
	}
	private mImgIcon_Internal: mw.Image
	public get mImgIcon(): mw.Image {
		if(!this.mImgIcon_Internal&&this.uiWidgetBase) {
			this.mImgIcon_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mImgIcon') as mw.Image
		}
		return this.mImgIcon_Internal
	}
	private mItemBtn_Internal: mw.StaleButton
	public get mItemBtn(): mw.StaleButton {
		if(!this.mItemBtn_Internal&&this.uiWidgetBase) {
			this.mItemBtn_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mItemBtn') as mw.StaleButton
		}
		return this.mItemBtn_Internal
	}
	private mItemNum_Internal: mw.TextBlock
	public get mItemNum(): mw.TextBlock {
		if(!this.mItemNum_Internal&&this.uiWidgetBase) {
			this.mItemNum_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mItemNum') as mw.TextBlock
		}
		return this.mItemNum_Internal
	}
	private mItemNumBG_Internal: mw.Image
	public get mItemNumBG(): mw.Image {
		if(!this.mItemNumBG_Internal&&this.uiWidgetBase) {
			this.mItemNumBG_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mItemNumBG') as mw.Image
		}
		return this.mItemNumBG_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 