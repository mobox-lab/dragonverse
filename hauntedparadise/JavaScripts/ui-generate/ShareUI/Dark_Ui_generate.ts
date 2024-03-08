
 

 @UIBind('UI/ShareUI/Dark_Ui.ui')
 export default class Dark_Ui_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private canvas_dark_Internal: mw.Canvas
	public get canvas_dark(): mw.Canvas {
		if(!this.canvas_dark_Internal&&this.uiWidgetBase) {
			this.canvas_dark_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_dark') as mw.Canvas
		}
		return this.canvas_dark_Internal
	}
	private img_dark_Internal: mw.Image
	public get img_dark(): mw.Image {
		if(!this.img_dark_Internal&&this.uiWidgetBase) {
			this.img_dark_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_dark/img_dark') as mw.Image
		}
		return this.img_dark_Internal
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

UIService['UI_Dark_Ui'] = Dark_Ui_Generate;