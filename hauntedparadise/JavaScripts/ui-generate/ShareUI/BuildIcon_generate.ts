
 

 @UIBind('UI/ShareUI/BuildIcon.ui')
 export default class BuildIcon_Generate extends UIScript {
	 	private mImgIcon_Internal: mw.Image
	public get mImgIcon(): mw.Image {
		if(!this.mImgIcon_Internal&&this.uiWidgetBase) {
			this.mImgIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImgIcon') as mw.Image
		}
		return this.mImgIcon_Internal
	}
	private materialNumber_Internal: mw.TextBlock
	public get materialNumber(): mw.TextBlock {
		if(!this.materialNumber_Internal&&this.uiWidgetBase) {
			this.materialNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/materialNumber') as mw.TextBlock
		}
		return this.materialNumber_Internal
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
		
		this.initLanguage(this.materialNumber)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BuildIcon'] = BuildIcon_Generate;