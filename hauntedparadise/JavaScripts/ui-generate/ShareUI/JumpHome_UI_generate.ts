
 

 @UIBind('UI/ShareUI/JumpHome_UI.ui')
 export default class JumpHome_UI_Generate extends UIScript {
	 	private codeImage_1_Internal: mw.Image
	public get codeImage_1(): mw.Image {
		if(!this.codeImage_1_Internal&&this.uiWidgetBase) {
			this.codeImage_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CodeMainCanvas/codeImage_1') as mw.Image
		}
		return this.codeImage_1_Internal
	}
	private codeImage_1_1_Internal: mw.Image
	public get codeImage_1_1(): mw.Image {
		if(!this.codeImage_1_1_Internal&&this.uiWidgetBase) {
			this.codeImage_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CodeMainCanvas/codeImage_1_1') as mw.Image
		}
		return this.codeImage_1_1_Internal
	}
	private jumpGameTitle_Internal: mw.TextBlock
	public get jumpGameTitle(): mw.TextBlock {
		if(!this.jumpGameTitle_Internal&&this.uiWidgetBase) {
			this.jumpGameTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CodeMainCanvas/jumpGameTitle') as mw.TextBlock
		}
		return this.jumpGameTitle_Internal
	}
	private jumpGameMainBody_Internal: mw.TextBlock
	public get jumpGameMainBody(): mw.TextBlock {
		if(!this.jumpGameMainBody_Internal&&this.uiWidgetBase) {
			this.jumpGameMainBody_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CodeMainCanvas/jumpGameMainBody') as mw.TextBlock
		}
		return this.jumpGameMainBody_Internal
	}
	private codeImage_2_Internal: mw.Image
	public get codeImage_2(): mw.Image {
		if(!this.codeImage_2_Internal&&this.uiWidgetBase) {
			this.codeImage_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CodeMainCanvas/codeImage_2') as mw.Image
		}
		return this.codeImage_2_Internal
	}
	private contantCanvas_Internal: mw.Canvas
	public get contantCanvas(): mw.Canvas {
		if(!this.contantCanvas_Internal&&this.uiWidgetBase) {
			this.contantCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CodeMainCanvas/contantCanvas') as mw.Canvas
		}
		return this.contantCanvas_Internal
	}
	private jumpButtonVerify_Internal: mw.StaleButton
	public get jumpButtonVerify(): mw.StaleButton {
		if(!this.jumpButtonVerify_Internal&&this.uiWidgetBase) {
			this.jumpButtonVerify_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CodeMainCanvas/contantCanvas/jumpButtonVerify') as mw.StaleButton
		}
		return this.jumpButtonVerify_Internal
	}
	private codeImage_3_Internal: mw.Image
	public get codeImage_3(): mw.Image {
		if(!this.codeImage_3_Internal&&this.uiWidgetBase) {
			this.codeImage_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CodeMainCanvas/contantCanvas/codeImage_3') as mw.Image
		}
		return this.codeImage_3_Internal
	}
	private roomIdInputBox_Internal: mw.InputBox
	public get roomIdInputBox(): mw.InputBox {
		if(!this.roomIdInputBox_Internal&&this.uiWidgetBase) {
			this.roomIdInputBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CodeMainCanvas/contantCanvas/roomIdInputBox') as mw.InputBox
		}
		return this.roomIdInputBox_Internal
	}
	private codeNum_Internal: mw.TextBlock
	public get codeNum(): mw.TextBlock {
		if(!this.codeNum_Internal&&this.uiWidgetBase) {
			this.codeNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CodeMainCanvas/codeNum') as mw.TextBlock
		}
		return this.codeNum_Internal
	}
	private codePaste_Internal: mw.TextBlock
	public get codePaste(): mw.TextBlock {
		if(!this.codePaste_Internal&&this.uiWidgetBase) {
			this.codePaste_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CodeMainCanvas/codePaste') as mw.TextBlock
		}
		return this.codePaste_Internal
	}
	private codeButtonPaste_Internal: mw.Button
	public get codeButtonPaste(): mw.Button {
		if(!this.codeButtonPaste_Internal&&this.uiWidgetBase) {
			this.codeButtonPaste_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CodeMainCanvas/codeButtonPaste') as mw.Button
		}
		return this.codeButtonPaste_Internal
	}
	private codeButtonClose_Internal: mw.Button
	public get codeButtonClose(): mw.Button {
		if(!this.codeButtonClose_Internal&&this.uiWidgetBase) {
			this.codeButtonClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CodeMainCanvas/codeButtonClose') as mw.Button
		}
		return this.codeButtonClose_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.jumpButtonVerify.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "JumpHome_UI_jumpButtonVerify");
		})
		this.initLanguage(this.jumpButtonVerify);
		this.jumpButtonVerify.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.jumpButtonVerify.onPressed.add(() => {
			this.jumpButtonVerify["preScale"] = this.jumpButtonVerify.renderScale;
			this.jumpButtonVerify.renderScale = Vector2.one.set(this.jumpButtonVerify["preScale"]).multiply(1.1);
		})
		this.jumpButtonVerify.onReleased.add(() => {
			this.jumpButtonVerify.renderScale = this.jumpButtonVerify["preScale"];
		})
		
		
	
		//按钮添加点击
		
		this.codeButtonPaste.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "JumpHome_UI_codeButtonPaste");
		})
		this.codeButtonPaste.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.codeButtonPaste.onPressed.add(() => {
			this.codeButtonPaste["preScale"] = this.codeButtonPaste.renderScale;
			this.codeButtonPaste.renderScale = Vector2.one.set(this.codeButtonPaste["preScale"]).multiply(1.1);
		})
		this.codeButtonPaste.onReleased.add(() => {
			this.codeButtonPaste.renderScale = this.codeButtonPaste["preScale"];
		})
		
	
		this.codeButtonClose.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "JumpHome_UI_codeButtonClose");
		})
		this.codeButtonClose.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.codeButtonClose.onPressed.add(() => {
			this.codeButtonClose["preScale"] = this.codeButtonClose.renderScale;
			this.codeButtonClose.renderScale = Vector2.one.set(this.codeButtonClose["preScale"]).multiply(1.1);
		})
		this.codeButtonClose.onReleased.add(() => {
			this.codeButtonClose.renderScale = this.codeButtonClose["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.jumpGameTitle)
		
	
		this.initLanguage(this.jumpGameMainBody)
		
	
		this.initLanguage(this.codeNum)
		
	
		this.initLanguage(this.codePaste)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_JumpHome_UI'] = JumpHome_UI_Generate;