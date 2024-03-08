
 

 @UIBind('UI/ShareUI/Tips.ui')
 export default class Tips_Generate extends UIScript {
	 	private mCell1_Internal: mw.Canvas
	public get mCell1(): mw.Canvas {
		if(!this.mCell1_Internal&&this.uiWidgetBase) {
			this.mCell1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCell1') as mw.Canvas
		}
		return this.mCell1_Internal
	}
	private mCell2_Internal: mw.Canvas
	public get mCell2(): mw.Canvas {
		if(!this.mCell2_Internal&&this.uiWidgetBase) {
			this.mCell2_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCell2') as mw.Canvas
		}
		return this.mCell2_Internal
	}
	private mCell3_Internal: mw.Canvas
	public get mCell3(): mw.Canvas {
		if(!this.mCell3_Internal&&this.uiWidgetBase) {
			this.mCell3_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCell3') as mw.Canvas
		}
		return this.mCell3_Internal
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
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCell1/Content_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCell2/Content_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCell3/Content_txt") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Tips'] = Tips_Generate;