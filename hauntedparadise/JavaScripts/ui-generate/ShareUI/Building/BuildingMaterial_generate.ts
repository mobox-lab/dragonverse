
 

 @UIBind('UI/ShareUI/Building/BuildingMaterial.ui')
 export default class BuildingMaterial_Generate extends UIScript {
	 	private mImageBackground_1_Internal: mw.Image
	public get mImageBackground_1(): mw.Image {
		if(!this.mImageBackground_1_Internal&&this.uiWidgetBase) {
			this.mImageBackground_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImageBackground_1') as mw.Image
		}
		return this.mImageBackground_1_Internal
	}
	private mImageBackground_Internal: mw.Image
	public get mImageBackground(): mw.Image {
		if(!this.mImageBackground_Internal&&this.uiWidgetBase) {
			this.mImageBackground_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImageBackground') as mw.Image
		}
		return this.mImageBackground_Internal
	}
	private mIcon_Internal: mw.Image
	public get mIcon(): mw.Image {
		if(!this.mIcon_Internal&&this.uiWidgetBase) {
			this.mIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mIcon') as mw.Image
		}
		return this.mIcon_Internal
	}
	private mIconName_Internal: mw.TextBlock
	public get mIconName(): mw.TextBlock {
		if(!this.mIconName_Internal&&this.uiWidgetBase) {
			this.mIconName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mIconName') as mw.TextBlock
		}
		return this.mIconName_Internal
	}
	private mNumNeed_Internal: mw.TextBlock
	public get mNumNeed(): mw.TextBlock {
		if(!this.mNumNeed_Internal&&this.uiWidgetBase) {
			this.mNumNeed_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mNumNeed') as mw.TextBlock
		}
		return this.mNumNeed_Internal
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
		
		this.initLanguage(this.mIconName)
		
	
		this.initLanguage(this.mNumNeed)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BuildingMaterial'] = BuildingMaterial_Generate;