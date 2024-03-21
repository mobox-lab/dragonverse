
 

 @UIBind('UI/ShareUI/Building/BuildingIcon.ui')
 export default class BuildingIcon_Generate extends UIScript {
	 	private mImgIcon_Internal: mw.Image
	public get mImgIcon(): mw.Image {
		if(!this.mImgIcon_Internal&&this.uiWidgetBase) {
			this.mImgIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImgIcon') as mw.Image
		}
		return this.mImgIcon_Internal
	}
	private mItemBtn_Internal: mw.StaleButton
	public get mItemBtn(): mw.StaleButton {
		if(!this.mItemBtn_Internal&&this.uiWidgetBase) {
			this.mItemBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mItemBtn') as mw.StaleButton
		}
		return this.mItemBtn_Internal
	}
	private mImgSelect_Internal: mw.Image
	public get mImgSelect(): mw.Image {
		if(!this.mImgSelect_Internal&&this.uiWidgetBase) {
			this.mImgSelect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImgSelect') as mw.Image
		}
		return this.mImgSelect_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mItemBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuildingIcon_mItemBtn");
		})
		this.initLanguage(this.mItemBtn);
		this.mItemBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mItemBtn.onPressed.add(() => {
			this.mItemBtn["preScale"] = this.mItemBtn.renderScale;
			this.mItemBtn.renderScale = Vector2.one.set(this.mItemBtn["preScale"]).multiply(1.1);
		})
		this.mItemBtn.onReleased.add(() => {
			this.mItemBtn.renderScale = this.mItemBtn["preScale"];
		})
		
		
	
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

UIService['UI_BuildingIcon'] = BuildingIcon_Generate;