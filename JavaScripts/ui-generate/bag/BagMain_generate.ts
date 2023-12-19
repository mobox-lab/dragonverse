
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/bag/BagMain.ui
*/



@UIBind('UI/bag/BagMain.ui')
export default class BagMain_Generate extends UIScript {
		private btn1_Internal: mw.StaleButton
	public get btn1(): mw.StaleButton {
		if(!this.btn1_Internal&&this.uiWidgetBase) {
			this.btn1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_1/btn1') as mw.StaleButton
		}
		return this.btn1_Internal
	}
	private btn2_Internal: mw.StaleButton
	public get btn2(): mw.StaleButton {
		if(!this.btn2_Internal&&this.uiWidgetBase) {
			this.btn2_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_1/btn2') as mw.StaleButton
		}
		return this.btn2_Internal
	}
	private btn3_Internal: mw.StaleButton
	public get btn3(): mw.StaleButton {
		if(!this.btn3_Internal&&this.uiWidgetBase) {
			this.btn3_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_1/btn3') as mw.StaleButton
		}
		return this.btn3_Internal
	}
	private btn4_Internal: mw.StaleButton
	public get btn4(): mw.StaleButton {
		if(!this.btn4_Internal&&this.uiWidgetBase) {
			this.btn4_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_1/btn4') as mw.StaleButton
		}
		return this.btn4_Internal
	}
	private btn5_Internal: mw.StaleButton
	public get btn5(): mw.StaleButton {
		if(!this.btn5_Internal&&this.uiWidgetBase) {
			this.btn5_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_1/btn5') as mw.StaleButton
		}
		return this.btn5_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private mIconThum_1_1_Internal: mw.Image
	public get mIconThum_1_1(): mw.Image {
		if(!this.mIconThum_1_1_Internal&&this.uiWidgetBase) {
			this.mIconThum_1_1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mIconThum_1_1') as mw.Image
		}
		return this.mIconThum_1_1_Internal
	}
	private mThumNum_Internal: mw.Image
	public get mThumNum(): mw.Image {
		if(!this.mThumNum_Internal&&this.uiWidgetBase) {
			this.mThumNum_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mThumNum') as mw.Image
		}
		return this.mThumNum_Internal
	}
	private mNumThum_Internal: mw.TextBlock
	public get mNumThum(): mw.TextBlock {
		if(!this.mNumThum_Internal&&this.uiWidgetBase) {
			this.mNumThum_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mNumThum') as mw.TextBlock
		}
		return this.mNumThum_Internal
	}
	private mIconThum_1_2_Internal: mw.Image
	public get mIconThum_1_2(): mw.Image {
		if(!this.mIconThum_1_2_Internal&&this.uiWidgetBase) {
			this.mIconThum_1_2_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mIconThum_1_2') as mw.Image
		}
		return this.mIconThum_1_2_Internal
	}
	private mIconThum_1_3_Internal: mw.Image
	public get mIconThum_1_3(): mw.Image {
		if(!this.mIconThum_1_3_Internal&&this.uiWidgetBase) {
			this.mIconThum_1_3_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mIconThum_1_3') as mw.Image
		}
		return this.mIconThum_1_3_Internal
	}
	private mIconThum_1_4_Internal: mw.Image
	public get mIconThum_1_4(): mw.Image {
		if(!this.mIconThum_1_4_Internal&&this.uiWidgetBase) {
			this.mIconThum_1_4_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mIconThum_1_4') as mw.Image
		}
		return this.mIconThum_1_4_Internal
	}
	private mIconThum_1_5_Internal: mw.Image
	public get mIconThum_1_5(): mw.Image {
		if(!this.mIconThum_1_5_Internal&&this.uiWidgetBase) {
			this.mIconThum_1_5_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mIconThum_1_5') as mw.Image
		}
		return this.mIconThum_1_5_Internal
	}
	private mIconThum_1_6_Internal: mw.Image
	public get mIconThum_1_6(): mw.Image {
		if(!this.mIconThum_1_6_Internal&&this.uiWidgetBase) {
			this.mIconThum_1_6_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mIconThum_1_6') as mw.Image
		}
		return this.mIconThum_1_6_Internal
	}
	private mIconThum_1_7_Internal: mw.Image
	public get mIconThum_1_7(): mw.Image {
		if(!this.mIconThum_1_7_Internal&&this.uiWidgetBase) {
			this.mIconThum_1_7_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mIconThum_1_7') as mw.Image
		}
		return this.mIconThum_1_7_Internal
	}
	private infoCanvas_Internal: mw.Canvas
	public get infoCanvas(): mw.Canvas {
		if(!this.infoCanvas_Internal&&this.uiWidgetBase) {
			this.infoCanvas_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas') as mw.Canvas
		}
		return this.infoCanvas_Internal
	}
	private mIcon_Internal: mw.Image
	public get mIcon(): mw.Image {
		if(!this.mIcon_Internal&&this.uiWidgetBase) {
			this.mIcon_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mIcon') as mw.Image
		}
		return this.mIcon_Internal
	}
	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mNum_Internal: mw.TextBlock
	public get mNum(): mw.TextBlock {
		if(!this.mNum_Internal&&this.uiWidgetBase) {
			this.mNum_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mNum') as mw.TextBlock
		}
		return this.mNum_Internal
	}
	private mDescBack_Internal: mw.Image
	public get mDescBack(): mw.Image {
		if(!this.mDescBack_Internal&&this.uiWidgetBase) {
			this.mDescBack_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mDescBack') as mw.Image
		}
		return this.mDescBack_Internal
	}
	private mDesc_Internal: mw.TextBlock
	public get mDesc(): mw.TextBlock {
		if(!this.mDesc_Internal&&this.uiWidgetBase) {
			this.mDesc_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mDesc') as mw.TextBlock
		}
		return this.mDesc_Internal
	}
	private mBtnOpt1_2_Internal: mw.StaleButton
	public get mBtnOpt1_2(): mw.StaleButton {
		if(!this.mBtnOpt1_2_Internal&&this.uiWidgetBase) {
			this.mBtnOpt1_2_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mBtnOpt1_2') as mw.StaleButton
		}
		return this.mBtnOpt1_2_Internal
	}
	private mBtnOpt1_1_Internal: mw.StaleButton
	public get mBtnOpt1_1(): mw.StaleButton {
		if(!this.mBtnOpt1_1_Internal&&this.uiWidgetBase) {
			this.mBtnOpt1_1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mBtnOpt1_1') as mw.StaleButton
		}
		return this.mBtnOpt1_1_Internal
	}
	private mBtnClose_Internal: mw.StaleButton
	public get mBtnClose(): mw.StaleButton {
		if(!this.mBtnClose_Internal&&this.uiWidgetBase) {
			this.mBtnClose_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtnClose') as mw.StaleButton
		}
		return this.mBtnClose_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 