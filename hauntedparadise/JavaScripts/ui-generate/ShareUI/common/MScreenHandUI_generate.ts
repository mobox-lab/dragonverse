
 

 @UIBind('UI/ShareUI/common/MScreenHandUI.ui')
 export default class MScreenHandUI_Generate extends UIScript {
	 	private mCanvas1_Internal: mw.Canvas
	public get mCanvas1(): mw.Canvas {
		if(!this.mCanvas1_Internal&&this.uiWidgetBase) {
			this.mCanvas1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas1') as mw.Canvas
		}
		return this.mCanvas1_Internal
	}
	private img_1_Internal: mw.Image
	public get img_1(): mw.Image {
		if(!this.img_1_Internal&&this.uiWidgetBase) {
			this.img_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas1/img_1') as mw.Image
		}
		return this.img_1_Internal
	}
	private mHandBtn_Internal: mw.Button
	public get mHandBtn(): mw.Button {
		if(!this.mHandBtn_Internal&&this.uiWidgetBase) {
			this.mHandBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas1/mHandBtn') as mw.Button
		}
		return this.mHandBtn_Internal
	}
	private mCanvas2_Internal: mw.Canvas
	public get mCanvas2(): mw.Canvas {
		if(!this.mCanvas2_Internal&&this.uiWidgetBase) {
			this.mCanvas2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas2') as mw.Canvas
		}
		return this.mCanvas2_Internal
	}
	private uTextBlock_Internal: mw.TextBlock
	public get uTextBlock(): mw.TextBlock {
		if(!this.uTextBlock_Internal&&this.uiWidgetBase) {
			this.uTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas2/uTextBlock') as mw.TextBlock
		}
		return this.uTextBlock_Internal
	}
	private mHumanBtn_Internal: mw.Button
	public get mHumanBtn(): mw.Button {
		if(!this.mHumanBtn_Internal&&this.uiWidgetBase) {
			this.mHumanBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas2/mHumanBtn') as mw.Button
		}
		return this.mHumanBtn_Internal
	}
	private mPetBtn_Internal: mw.Button
	public get mPetBtn(): mw.Button {
		if(!this.mPetBtn_Internal&&this.uiWidgetBase) {
			this.mPetBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas2/mPetBtn') as mw.Button
		}
		return this.mPetBtn_Internal
	}
	private petTextBlock_1_Internal: mw.TextBlock
	public get petTextBlock_1(): mw.TextBlock {
		if(!this.petTextBlock_1_Internal&&this.uiWidgetBase) {
			this.petTextBlock_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas2/petTextBlock_1') as mw.TextBlock
		}
		return this.petTextBlock_1_Internal
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
		
		this.mHandBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "MScreenHandUI_mHandBtn");
		})
		this.mHandBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mHandBtn.onPressed.add(() => {
			this.mHandBtn["preScale"] = this.mHandBtn.renderScale;
			this.mHandBtn.renderScale = Vector2.one.set(this.mHandBtn["preScale"]).multiply(1.1);
		})
		this.mHandBtn.onReleased.add(() => {
			this.mHandBtn.renderScale = this.mHandBtn["preScale"];
		})
		
	
		this.mHumanBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "MScreenHandUI_mHumanBtn");
		})
		this.mHumanBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mHumanBtn.onPressed.add(() => {
			this.mHumanBtn["preScale"] = this.mHumanBtn.renderScale;
			this.mHumanBtn.renderScale = Vector2.one.set(this.mHumanBtn["preScale"]).multiply(1.1);
		})
		this.mHumanBtn.onReleased.add(() => {
			this.mHumanBtn.renderScale = this.mHumanBtn["preScale"];
		})
		
	
		this.mPetBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "MScreenHandUI_mPetBtn");
		})
		this.mPetBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mPetBtn.onPressed.add(() => {
			this.mPetBtn["preScale"] = this.mPetBtn.renderScale;
			this.mPetBtn.renderScale = Vector2.one.set(this.mPetBtn["preScale"]).multiply(1.1);
		})
		this.mPetBtn.onReleased.add(() => {
			this.mPetBtn.renderScale = this.mPetBtn["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.uTextBlock)
		
	
		this.initLanguage(this.petTextBlock_1)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_MScreenHandUI'] = MScreenHandUI_Generate;