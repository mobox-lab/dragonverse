
 

 @UIBind('UI/ShareUI/Building/Building_UI.ui')
 export default class Building_UI_Generate extends UIScript {
	 	private imgMaskBg_Internal: mw.Image
	public get imgMaskBg(): mw.Image {
		if(!this.imgMaskBg_Internal&&this.uiWidgetBase) {
			this.imgMaskBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MWCanvas_2147482460/imgMaskBg') as mw.Image
		}
		return this.imgMaskBg_Internal
	}
	private cnvTags_Internal: mw.Canvas
	public get cnvTags(): mw.Canvas {
		if(!this.cnvTags_Internal&&this.uiWidgetBase) {
			this.cnvTags_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MWCanvas_2147482460/cnvTags') as mw.Canvas
		}
		return this.cnvTags_Internal
	}
	private btn1_Internal: mw.StaleButton
	public get btn1(): mw.StaleButton {
		if(!this.btn1_Internal&&this.uiWidgetBase) {
			this.btn1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MWCanvas_2147482460/cnvTags/btn1') as mw.StaleButton
		}
		return this.btn1_Internal
	}
	private btn2_Internal: mw.StaleButton
	public get btn2(): mw.StaleButton {
		if(!this.btn2_Internal&&this.uiWidgetBase) {
			this.btn2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MWCanvas_2147482460/cnvTags/btn2') as mw.StaleButton
		}
		return this.btn2_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MWCanvas_2147482460/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MWCanvas_2147482460/mScrollBox/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private infoCanvas_Internal: mw.Canvas
	public get infoCanvas(): mw.Canvas {
		if(!this.infoCanvas_Internal&&this.uiWidgetBase) {
			this.infoCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MWCanvas_2147482460/infoCanvas') as mw.Canvas
		}
		return this.infoCanvas_Internal
	}
	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MWCanvas_2147482460/infoCanvas/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mDesc_Internal: mw.TextBlock
	public get mDesc(): mw.TextBlock {
		if(!this.mDesc_Internal&&this.uiWidgetBase) {
			this.mDesc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MWCanvas_2147482460/infoCanvas/mDesc') as mw.TextBlock
		}
		return this.mDesc_Internal
	}
	private mDescBack_Internal: mw.Image
	public get mDescBack(): mw.Image {
		if(!this.mDescBack_Internal&&this.uiWidgetBase) {
			this.mDescBack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MWCanvas_2147482460/infoCanvas/mDescBack') as mw.Image
		}
		return this.mDescBack_Internal
	}
	private materialCanvas_Internal: mw.Canvas
	public get materialCanvas(): mw.Canvas {
		if(!this.materialCanvas_Internal&&this.uiWidgetBase) {
			this.materialCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MWCanvas_2147482460/infoCanvas/materialCanvas') as mw.Canvas
		}
		return this.materialCanvas_Internal
	}
	private mBtnOpt_Internal: mw.StaleButton
	public get mBtnOpt(): mw.StaleButton {
		if(!this.mBtnOpt_Internal&&this.uiWidgetBase) {
			this.mBtnOpt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MWCanvas_2147482460/infoCanvas/mBtnOpt') as mw.StaleButton
		}
		return this.mBtnOpt_Internal
	}
	private mBtnClose_Internal: mw.StaleButton
	public get mBtnClose(): mw.StaleButton {
		if(!this.mBtnClose_Internal&&this.uiWidgetBase) {
			this.mBtnClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MWCanvas_2147482460/mBtnClose') as mw.StaleButton
		}
		return this.mBtnClose_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btn1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Building_UI_btn1");
		})
		this.initLanguage(this.btn1);
		this.btn1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn1.onPressed.add(() => {
			this.btn1["preScale"] = this.btn1.renderScale;
			this.btn1.renderScale = Vector2.one.set(this.btn1["preScale"]).multiply(1.1);
		})
		this.btn1.onReleased.add(() => {
			this.btn1.renderScale = this.btn1["preScale"];
		})
		
		
	
		this.btn2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Building_UI_btn2");
		})
		this.initLanguage(this.btn2);
		this.btn2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn2.onPressed.add(() => {
			this.btn2["preScale"] = this.btn2.renderScale;
			this.btn2.renderScale = Vector2.one.set(this.btn2["preScale"]).multiply(1.1);
		})
		this.btn2.onReleased.add(() => {
			this.btn2.renderScale = this.btn2["preScale"];
		})
		
		
	
		this.mBtnOpt.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Building_UI_mBtnOpt");
		})
		this.initLanguage(this.mBtnOpt);
		this.mBtnOpt.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnOpt.onPressed.add(() => {
			this.mBtnOpt["preScale"] = this.mBtnOpt.renderScale;
			this.mBtnOpt.renderScale = Vector2.one.set(this.mBtnOpt["preScale"]).multiply(1.1);
		})
		this.mBtnOpt.onReleased.add(() => {
			this.mBtnOpt.renderScale = this.mBtnOpt["preScale"];
		})
		
		
	
		this.mBtnClose.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Building_UI_mBtnClose");
		})
		this.initLanguage(this.mBtnClose);
		this.mBtnClose.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnClose.onPressed.add(() => {
			this.mBtnClose["preScale"] = this.mBtnClose.renderScale;
			this.mBtnClose.renderScale = Vector2.one.set(this.mBtnClose["preScale"]).multiply(1.1);
		})
		this.mBtnClose.onReleased.add(() => {
			this.mBtnClose.renderScale = this.mBtnClose["preScale"];
		})
		
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mName)
		
	
		this.initLanguage(this.mDesc)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Building_UI'] = Building_UI_Generate;