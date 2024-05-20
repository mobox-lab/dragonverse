
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/Shop/UIDecorate/UITabItem.ui
 */

 

 @UIBind('UI/Shop/UIDecorate/UITabItem.ui')
 export default class UITabItem_Generate extends UIScript {
	 	private mCanvasPlace1_Internal: mw.Canvas
	public get mCanvasPlace1(): mw.Canvas {
		if(!this.mCanvasPlace1_Internal&&this.uiWidgetBase) {
			this.mCanvasPlace1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPlace1') as mw.Canvas
		}
		return this.mCanvasPlace1_Internal
	}
	private mImgBg_Internal: mw.Image
	public get mImgBg(): mw.Image {
		if(!this.mImgBg_Internal&&this.uiWidgetBase) {
			this.mImgBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPlace1/mImgBg') as mw.Image
		}
		return this.mImgBg_Internal
	}
	private mTextPlace1_Internal: mw.TextBlock
	public get mTextPlace1(): mw.TextBlock {
		if(!this.mTextPlace1_Internal&&this.uiWidgetBase) {
			this.mTextPlace1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPlace1/mTextPlace1') as mw.TextBlock
		}
		return this.mTextPlace1_Internal
	}
	private mImgRed1_Internal: mw.Image
	public get mImgRed1(): mw.Image {
		if(!this.mImgRed1_Internal&&this.uiWidgetBase) {
			this.mImgRed1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPlace1/mImgRed1') as mw.Image
		}
		return this.mImgRed1_Internal
	}
	private mBtnPlace1_Internal: mw.Button
	public get mBtnPlace1(): mw.Button {
		if(!this.mBtnPlace1_Internal&&this.uiWidgetBase) {
			this.mBtnPlace1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPlace1/mBtnPlace1') as mw.Button
		}
		return this.mBtnPlace1_Internal
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
		
		this.mBtnPlace1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtnPlace1");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextPlace1)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 