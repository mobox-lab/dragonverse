
 

 @UIBind('UI/ShareUI/Trajectory_UI.ui')
 export default class Trajectory_UI_Generate extends UIScript {
	 	private img_trajectory1_Internal: mw.Image
	public get img_trajectory1(): mw.Image {
		if(!this.img_trajectory1_Internal&&this.uiWidgetBase) {
			this.img_trajectory1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_trajectory1') as mw.Image
		}
		return this.img_trajectory1_Internal
	}
	private img_trajectory2_Internal: mw.Image
	public get img_trajectory2(): mw.Image {
		if(!this.img_trajectory2_Internal&&this.uiWidgetBase) {
			this.img_trajectory2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_trajectory2') as mw.Image
		}
		return this.img_trajectory2_Internal
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

UIService['UI_Trajectory_UI'] = Trajectory_UI_Generate;