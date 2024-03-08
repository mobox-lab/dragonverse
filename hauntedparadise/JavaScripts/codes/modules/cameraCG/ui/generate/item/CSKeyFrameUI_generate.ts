

@UIBind('UI/ShareUI/module_cameracg/item/CSKeyFrameUI.ui')
export class CSKeyFrameUI_Generate extends UIScript {
	private mImgSelect_Internal: mw.Image
	public get mImgSelect(): mw.Image {
		if (!this.mImgSelect_Internal && this.uiWidgetBase) {
			this.mImgSelect_Internal = this.uiWidgetBase.findChildByPath('Canvas/mImgSelect') as mw.Image
		}
		return this.mImgSelect_Internal
	}
	private mBtn_Internal: mw.Button
	public get mBtn(): mw.Button {
		if (!this.mBtn_Internal && this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn') as mw.Button
		}
		return this.mBtn_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

}
