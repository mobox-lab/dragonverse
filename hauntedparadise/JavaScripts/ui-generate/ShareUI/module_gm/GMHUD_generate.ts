
 

 @UIBind('UI/ShareUI/module_gm/GMHUD.ui')
 export default class GMHUD_Generate extends UIScript {
	 	private argText_Internal: mw.InputBox
	public get argText(): mw.InputBox {
		if(!this.argText_Internal&&this.uiWidgetBase) {
			this.argText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/argText') as mw.InputBox
		}
		return this.argText_Internal
	}
	private groupButton_Internal: mw.StaleButton
	public get groupButton(): mw.StaleButton {
		if(!this.groupButton_Internal&&this.uiWidgetBase) {
			this.groupButton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/groupButton') as mw.StaleButton
		}
		return this.groupButton_Internal
	}
	private cmdButton_Internal: mw.StaleButton
	public get cmdButton(): mw.StaleButton {
		if(!this.cmdButton_Internal&&this.uiWidgetBase) {
			this.cmdButton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cmdButton') as mw.StaleButton
		}
		return this.cmdButton_Internal
	}
	private okButton_Internal: mw.Button
	public get okButton(): mw.Button {
		if(!this.okButton_Internal&&this.uiWidgetBase) {
			this.okButton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/okButton') as mw.Button
		}
		return this.okButton_Internal
	}
	private dropList_Internal: mw.ScrollBox
	public get dropList(): mw.ScrollBox {
		if(!this.dropList_Internal&&this.uiWidgetBase) {
			this.dropList_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/dropList') as mw.ScrollBox
		}
		return this.dropList_Internal
	}
	private cmdPanel_Internal: mw.Canvas
	public get cmdPanel(): mw.Canvas {
		if(!this.cmdPanel_Internal&&this.uiWidgetBase) {
			this.cmdPanel_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/dropList/cmdPanel') as mw.Canvas
		}
		return this.cmdPanel_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.groupButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GMHUD_groupButton");
		})
		this.initLanguage(this.groupButton);
		this.groupButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.groupButton.onPressed.add(() => {
			this.groupButton["preScale"] = this.groupButton.renderScale;
			this.groupButton.renderScale = Vector2.one.set(this.groupButton["preScale"]).multiply(1.1);
		})
		this.groupButton.onReleased.add(() => {
			this.groupButton.renderScale = this.groupButton["preScale"];
		})
		
		
	
		this.cmdButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GMHUD_cmdButton");
		})
		this.initLanguage(this.cmdButton);
		this.cmdButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.cmdButton.onPressed.add(() => {
			this.cmdButton["preScale"] = this.cmdButton.renderScale;
			this.cmdButton.renderScale = Vector2.one.set(this.cmdButton["preScale"]).multiply(1.1);
		})
		this.cmdButton.onReleased.add(() => {
			this.cmdButton.renderScale = this.cmdButton["preScale"];
		})
		
		
	
		//按钮添加点击
		
		this.okButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GMHUD_okButton");
		})
		this.okButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.okButton.onPressed.add(() => {
			this.okButton["preScale"] = this.okButton.renderScale;
			this.okButton.renderScale = Vector2.one.set(this.okButton["preScale"]).multiply(1.1);
		})
		this.okButton.onReleased.add(() => {
			this.okButton.renderScale = this.okButton["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/okButton/TextBlock") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_GMHUD'] = GMHUD_Generate;