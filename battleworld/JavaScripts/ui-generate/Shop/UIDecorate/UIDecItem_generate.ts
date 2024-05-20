
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/Shop/UIDecorate/UIDecItem.ui
 */

 

 @UIBind('UI/Shop/UIDecorate/UIDecItem.ui')
 export default class UIDecItem_Generate extends UIScript {
	 	private mCanvasDec_Internal: mw.Canvas
	public get mCanvasDec(): mw.Canvas {
		if(!this.mCanvasDec_Internal&&this.uiWidgetBase) {
			this.mCanvasDec_Internal = this.uiWidgetBase.findChildByPath('mCanvasDec') as mw.Canvas
		}
		return this.mCanvasDec_Internal
	}
	private mImgSelect_Internal: mw.Image
	public get mImgSelect(): mw.Image {
		if(!this.mImgSelect_Internal&&this.uiWidgetBase) {
			this.mImgSelect_Internal = this.uiWidgetBase.findChildByPath('mCanvasDec/mImgSelect') as mw.Image
		}
		return this.mImgSelect_Internal
	}
	private mImgIcon_Internal: mw.Image
	public get mImgIcon(): mw.Image {
		if(!this.mImgIcon_Internal&&this.uiWidgetBase) {
			this.mImgIcon_Internal = this.uiWidgetBase.findChildByPath('mCanvasDec/mImgIcon') as mw.Image
		}
		return this.mImgIcon_Internal
	}
	private mImgRed5_Internal: mw.Image
	public get mImgRed5(): mw.Image {
		if(!this.mImgRed5_Internal&&this.uiWidgetBase) {
			this.mImgRed5_Internal = this.uiWidgetBase.findChildByPath('mCanvasDec/mImgRed5') as mw.Image
		}
		return this.mImgRed5_Internal
	}
	private mCanvasNeed_Internal: mw.Canvas
	public get mCanvasNeed(): mw.Canvas {
		if(!this.mCanvasNeed_Internal&&this.uiWidgetBase) {
			this.mCanvasNeed_Internal = this.uiWidgetBase.findChildByPath('mCanvasDec/mCanvasNeed') as mw.Canvas
		}
		return this.mCanvasNeed_Internal
	}
	private mImgNeed_Internal: mw.Image
	public get mImgNeed(): mw.Image {
		if(!this.mImgNeed_Internal&&this.uiWidgetBase) {
			this.mImgNeed_Internal = this.uiWidgetBase.findChildByPath('mCanvasDec/mCanvasNeed/Canvas/mImgNeed') as mw.Image
		}
		return this.mImgNeed_Internal
	}
	private mTextNeed_Internal: mw.TextBlock
	public get mTextNeed(): mw.TextBlock {
		if(!this.mTextNeed_Internal&&this.uiWidgetBase) {
			this.mTextNeed_Internal = this.uiWidgetBase.findChildByPath('mCanvasDec/mCanvasNeed/Canvas/mTextNeed') as mw.TextBlock
		}
		return this.mTextNeed_Internal
	}
	private mImgGift_Internal: mw.Image
	public get mImgGift(): mw.Image {
		if(!this.mImgGift_Internal&&this.uiWidgetBase) {
			this.mImgGift_Internal = this.uiWidgetBase.findChildByPath('mCanvasDec/mImgGift') as mw.Image
		}
		return this.mImgGift_Internal
	}
	private mImgDes_Internal: mw.Image
	public get mImgDes(): mw.Image {
		if(!this.mImgDes_Internal&&this.uiWidgetBase) {
			this.mImgDes_Internal = this.uiWidgetBase.findChildByPath('mCanvasDec/mImgDes') as mw.Image
		}
		return this.mImgDes_Internal
	}
	private mBtnDec_Internal: mw.Button
	public get mBtnDec(): mw.Button {
		if(!this.mBtnDec_Internal&&this.uiWidgetBase) {
			this.mBtnDec_Internal = this.uiWidgetBase.findChildByPath('mCanvasDec/mBtnDec') as mw.Button
		}
		return this.mBtnDec_Internal
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
		
		this.mBtnDec.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtnDec");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextNeed)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 