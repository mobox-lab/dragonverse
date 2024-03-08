
 

 @UIBind('UI/ShareUI/Blood.ui')
 export default class Blood_Generate extends UIScript {
	 	private m1_Internal: mw.Canvas
	public get m1(): mw.Canvas {
		if(!this.m1_Internal&&this.uiWidgetBase) {
			this.m1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/m1') as mw.Canvas
		}
		return this.m1_Internal
	}
	private m2_Internal: mw.Canvas
	public get m2(): mw.Canvas {
		if(!this.m2_Internal&&this.uiWidgetBase) {
			this.m2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/m2') as mw.Canvas
		}
		return this.m2_Internal
	}
	private m3_Internal: mw.Canvas
	public get m3(): mw.Canvas {
		if(!this.m3_Internal&&this.uiWidgetBase) {
			this.m3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/m3') as mw.Canvas
		}
		return this.m3_Internal
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

UIService['UI_Blood'] = Blood_Generate;