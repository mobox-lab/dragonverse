
 

 @UIBind('UI/ShareUI/hall/HallName1_White_UI.ui')
 export default class HallName1_White_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private canvas_Internal: mw.Canvas
	public get canvas(): mw.Canvas {
		if(!this.canvas_Internal&&this.uiWidgetBase) {
			this.canvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas') as mw.Canvas
		}
		return this.canvas_Internal
	}
	private txt_Internal: mw.TextBlock
	public get txt(): mw.TextBlock {
		if(!this.txt_Internal&&this.uiWidgetBase) {
			this.txt_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas/txt') as mw.TextBlock
		}
		return this.txt_Internal
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
		
		this.initLanguage(this.txt)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_HallName1_White_UI'] = HallName1_White_UI_Generate;