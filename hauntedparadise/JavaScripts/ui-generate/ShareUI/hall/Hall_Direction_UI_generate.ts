
 

 @UIBind('UI/ShareUI/hall/Hall_Direction_UI.ui')
 export default class Hall_Direction_UI_Generate extends UIScript {
	 	private mCanvas_Arror_Internal: mw.Canvas
	public get mCanvas_Arror(): mw.Canvas {
		if(!this.mCanvas_Arror_Internal&&this.uiWidgetBase) {
			this.mCanvas_Arror_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Arror') as mw.Canvas
		}
		return this.mCanvas_Arror_Internal
	}
	private mImg_Arror_Internal: mw.Image
	public get mImg_Arror(): mw.Image {
		if(!this.mImg_Arror_Internal&&this.uiWidgetBase) {
			this.mImg_Arror_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Arror/mImg_Arror') as mw.Image
		}
		return this.mImg_Arror_Internal
	}
	private mImage_Point_Internal: mw.Image
	public get mImage_Point(): mw.Image {
		if(!this.mImage_Point_Internal&&this.uiWidgetBase) {
			this.mImage_Point_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Arror/mImage_Point') as mw.Image
		}
		return this.mImage_Point_Internal
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

UIService['UI_Hall_Direction_UI'] = Hall_Direction_UI_Generate;