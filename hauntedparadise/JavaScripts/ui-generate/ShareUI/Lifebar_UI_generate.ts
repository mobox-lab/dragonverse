
 

 @UIBind('UI/ShareUI/Lifebar_UI.ui')
 export default class Lifebar_UI_Generate extends UIScript {
	 	private canvas_hp_Internal: mw.Canvas
	public get canvas_hp(): mw.Canvas {
		if(!this.canvas_hp_Internal&&this.uiWidgetBase) {
			this.canvas_hp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_hp') as mw.Canvas
		}
		return this.canvas_hp_Internal
	}
	private bloodVolume_Internal: mw.ProgressBar
	public get bloodVolume(): mw.ProgressBar {
		if(!this.bloodVolume_Internal&&this.uiWidgetBase) {
			this.bloodVolume_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_hp/bloodVolume') as mw.ProgressBar
		}
		return this.bloodVolume_Internal
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

UIService['UI_Lifebar_UI'] = Lifebar_UI_Generate;