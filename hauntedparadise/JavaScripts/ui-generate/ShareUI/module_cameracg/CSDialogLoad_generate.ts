
 

 @UIBind('UI/ShareUI/module_cameracg/CSDialogLoad.ui')
 export default class CSDialogLoad_Generate extends UIScript {
	 	private mBtnClose_Internal: mw.Button
	public get mBtnClose(): mw.Button {
		if(!this.mBtnClose_Internal&&this.uiWidgetBase) {
			this.mBtnClose_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtnClose') as mw.Button
		}
		return this.mBtnClose_Internal
	}
	private mInput_Internal: mw.InputBox
	public get mInput(): mw.InputBox {
		if(!this.mInput_Internal&&this.uiWidgetBase) {
			this.mInput_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasDialog/Cav_in/mInput') as mw.InputBox
		}
		return this.mInput_Internal
	}
	private mBtnLoad_Internal: mw.Button
	public get mBtnLoad(): mw.Button {
		if(!this.mBtnLoad_Internal&&this.uiWidgetBase) {
			this.mBtnLoad_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasDialog/CanvasBtn5/mBtnLoad') as mw.Button
		}
		return this.mBtnLoad_Internal
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
		
		this.mBtnClose.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSDialogLoad_mBtnClose");
		})
		this.mBtnClose.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnClose.onPressed.add(() => {
			this.mBtnClose["preScale"] = this.mBtnClose.renderScale;
			this.mBtnClose.renderScale = Vector2.one.set(this.mBtnClose["preScale"]).multiply(1.1);
		})
		this.mBtnClose.onReleased.add(() => {
			this.mBtnClose.renderScale = this.mBtnClose["preScale"];
		})
		
	
		this.mBtnLoad.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSDialogLoad_mBtnLoad");
		})
		this.mBtnLoad.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnLoad.onPressed.add(() => {
			this.mBtnLoad["preScale"] = this.mBtnLoad.renderScale;
			this.mBtnLoad.renderScale = Vector2.one.set(this.mBtnLoad["preScale"]).multiply(1.1);
		})
		this.mBtnLoad.onReleased.add(() => {
			this.mBtnLoad.renderScale = this.mBtnLoad["preScale"];
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

UIService['UI_CSDialogLoad'] = CSDialogLoad_Generate;