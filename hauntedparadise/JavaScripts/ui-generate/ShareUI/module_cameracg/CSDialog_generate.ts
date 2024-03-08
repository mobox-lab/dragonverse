
 

 @UIBind('UI/ShareUI/module_cameracg/CSDialog.ui')
 export default class CSDialog_Generate extends UIScript {
	 	private mBtnClose_Internal: mw.Button
	public get mBtnClose(): mw.Button {
		if(!this.mBtnClose_Internal&&this.uiWidgetBase) {
			this.mBtnClose_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtnClose') as mw.Button
		}
		return this.mBtnClose_Internal
	}
	private mBtnYes_Internal: mw.Button
	public get mBtnYes(): mw.Button {
		if(!this.mBtnYes_Internal&&this.uiWidgetBase) {
			this.mBtnYes_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasDialog/CanvasBtnYes/mBtnYes') as mw.Button
		}
		return this.mBtnYes_Internal
	}
	private mBtnNo_Internal: mw.Button
	public get mBtnNo(): mw.Button {
		if(!this.mBtnNo_Internal&&this.uiWidgetBase) {
			this.mBtnNo_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasDialog/CanvasBtnNo/mBtnNo') as mw.Button
		}
		return this.mBtnNo_Internal
	}
	private mTextContent_Internal: mw.TextBlock
	public get mTextContent(): mw.TextBlock {
		if(!this.mTextContent_Internal&&this.uiWidgetBase) {
			this.mTextContent_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasDialog/mTextContent') as mw.TextBlock
		}
		return this.mTextContent_Internal
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
			Event.dispatchToLocal("PlayButtonClick", "CSDialog_mBtnClose");
		})
		this.mBtnClose.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnClose.onPressed.add(() => {
			this.mBtnClose["preScale"] = this.mBtnClose.renderScale;
			this.mBtnClose.renderScale = Vector2.one.set(this.mBtnClose["preScale"]).multiply(1.1);
		})
		this.mBtnClose.onReleased.add(() => {
			this.mBtnClose.renderScale = this.mBtnClose["preScale"];
		})
		
	
		this.mBtnYes.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSDialog_mBtnYes");
		})
		this.mBtnYes.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnYes.onPressed.add(() => {
			this.mBtnYes["preScale"] = this.mBtnYes.renderScale;
			this.mBtnYes.renderScale = Vector2.one.set(this.mBtnYes["preScale"]).multiply(1.1);
		})
		this.mBtnYes.onReleased.add(() => {
			this.mBtnYes.renderScale = this.mBtnYes["preScale"];
		})
		
	
		this.mBtnNo.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSDialog_mBtnNo");
		})
		this.mBtnNo.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnNo.onPressed.add(() => {
			this.mBtnNo["preScale"] = this.mBtnNo.renderScale;
			this.mBtnNo.renderScale = Vector2.one.set(this.mBtnNo["preScale"]).multiply(1.1);
		})
		this.mBtnNo.onReleased.add(() => {
			this.mBtnNo.renderScale = this.mBtnNo["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextContent)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/CanvasDialog/CanvasBtnYes/Text") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/CanvasDialog/CanvasBtnNo/Text") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CSDialog'] = CSDialog_Generate;