
 

 @UIBind('UI/ShareUI/GhostPic_UI.ui')
 export default class GhostPic_UI_Generate extends UIScript {
	 	private btn_bg1_Internal: mw.Button
	public get btn_bg1(): mw.Button {
		if(!this.btn_bg1_Internal&&this.uiWidgetBase) {
			this.btn_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_bg1') as mw.Button
		}
		return this.btn_bg1_Internal
	}
	private btn_bg2_Internal: mw.Button
	public get btn_bg2(): mw.Button {
		if(!this.btn_bg2_Internal&&this.uiWidgetBase) {
			this.btn_bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_bg2') as mw.Button
		}
		return this.btn_bg2_Internal
	}
	private img_bg3_Internal: mw.Image
	public get img_bg3(): mw.Image {
		if(!this.img_bg3_Internal&&this.uiWidgetBase) {
			this.img_bg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg3') as mw.Image
		}
		return this.img_bg3_Internal
	}
	private img_bg2_Internal: mw.Image
	public get img_bg2(): mw.Image {
		if(!this.img_bg2_Internal&&this.uiWidgetBase) {
			this.img_bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg2') as mw.Image
		}
		return this.img_bg2_Internal
	}
	private img_bg4_Internal: mw.Image
	public get img_bg4(): mw.Image {
		if(!this.img_bg4_Internal&&this.uiWidgetBase) {
			this.img_bg4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg4') as mw.Image
		}
		return this.img_bg4_Internal
	}
	private img_ghost_Internal: mw.Image
	public get img_ghost(): mw.Image {
		if(!this.img_ghost_Internal&&this.uiWidgetBase) {
			this.img_ghost_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_ghost') as mw.Image
		}
		return this.img_ghost_Internal
	}
	private img_type_Internal: mw.Image
	public get img_type(): mw.Image {
		if(!this.img_type_Internal&&this.uiWidgetBase) {
			this.img_type_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_type') as mw.Image
		}
		return this.img_type_Internal
	}
	private nameTxt_Internal: mw.TextBlock
	public get nameTxt(): mw.TextBlock {
		if(!this.nameTxt_Internal&&this.uiWidgetBase) {
			this.nameTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/nameTxt') as mw.TextBlock
		}
		return this.nameTxt_Internal
	}
	private typeTxt_Internal: mw.TextBlock
	public get typeTxt(): mw.TextBlock {
		if(!this.typeTxt_Internal&&this.uiWidgetBase) {
			this.typeTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/typeTxt') as mw.TextBlock
		}
		return this.typeTxt_Internal
	}
	private weakTxt_Internal: mw.TextBlock
	public get weakTxt(): mw.TextBlock {
		if(!this.weakTxt_Internal&&this.uiWidgetBase) {
			this.weakTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/weakTxt') as mw.TextBlock
		}
		return this.weakTxt_Internal
	}
	private backTxt_Internal: mw.TextBlock
	public get backTxt(): mw.TextBlock {
		if(!this.backTxt_Internal&&this.uiWidgetBase) {
			this.backTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/backTxt') as mw.TextBlock
		}
		return this.backTxt_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_back') as mw.Button
		}
		return this.btn_back_Internal
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
		
		this.btn_bg1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GhostPic_UI_btn_bg1");
		})
		this.btn_bg1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_bg1.onPressed.add(() => {
			this.btn_bg1["preScale"] = this.btn_bg1.renderScale;
			this.btn_bg1.renderScale = Vector2.one.set(this.btn_bg1["preScale"]).multiply(1.1);
		})
		this.btn_bg1.onReleased.add(() => {
			this.btn_bg1.renderScale = this.btn_bg1["preScale"];
		})
		
	
		this.btn_bg2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GhostPic_UI_btn_bg2");
		})
		this.btn_bg2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_bg2.onPressed.add(() => {
			this.btn_bg2["preScale"] = this.btn_bg2.renderScale;
			this.btn_bg2.renderScale = Vector2.one.set(this.btn_bg2["preScale"]).multiply(1.1);
		})
		this.btn_bg2.onReleased.add(() => {
			this.btn_bg2.renderScale = this.btn_bg2["preScale"];
		})
		
	
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GhostPic_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.nameTxt)
		
	
		this.initLanguage(this.typeTxt)
		
	
		this.initLanguage(this.weakTxt)
		
	
		this.initLanguage(this.backTxt)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_GhostPic_UI'] = GhostPic_UI_Generate;