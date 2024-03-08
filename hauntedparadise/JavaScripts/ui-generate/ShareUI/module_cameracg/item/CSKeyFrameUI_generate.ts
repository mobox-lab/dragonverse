
 

 @UIBind('UI/ShareUI/module_cameracg/item/CSKeyFrameUI.ui')
 export default class CSKeyFrameUI_Generate extends UIScript {
	 	private mImgSelect_Internal: mw.Image
	public get mImgSelect(): mw.Image {
		if(!this.mImgSelect_Internal&&this.uiWidgetBase) {
			this.mImgSelect_Internal = this.uiWidgetBase.findChildByPath('Canvas/mImgSelect') as mw.Image
		}
		return this.mImgSelect_Internal
	}
	private mBtn_Internal: mw.Button
	public get mBtn(): mw.Button {
		if(!this.mBtn_Internal&&this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn') as mw.Button
		}
		return this.mBtn_Internal
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
		
		this.mBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSKeyFrameUI_mBtn");
		})
		this.mBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn.onPressed.add(() => {
			this.mBtn["preScale"] = this.mBtn.renderScale;
			this.mBtn.renderScale = Vector2.one.set(this.mBtn["preScale"]).multiply(1.1);
		})
		this.mBtn.onReleased.add(() => {
			this.mBtn.renderScale = this.mBtn["preScale"];
		})
		
	

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

UIService['UI_CSKeyFrameUI'] = CSKeyFrameUI_Generate;