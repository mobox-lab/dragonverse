
 

 @UIBind('UI/ShareUI/module_cameracg/CSDialogSave.ui')
 export default class CSDialogSave_Generate extends UIScript {
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
			Event.dispatchToLocal("PlayButtonClick", "CSDialogSave_mBtnClose");
		})
		this.mBtnClose.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnClose.onPressed.add(() => {
			this.mBtnClose["preScale"] = this.mBtnClose.renderScale;
			this.mBtnClose.renderScale = Vector2.one.set(this.mBtnClose["preScale"]).multiply(1.1);
		})
		this.mBtnClose.onReleased.add(() => {
			this.mBtnClose.renderScale = this.mBtnClose["preScale"];
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

UIService['UI_CSDialogSave'] = CSDialogSave_Generate;