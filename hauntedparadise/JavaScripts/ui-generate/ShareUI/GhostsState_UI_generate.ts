
 

 @UIBind('UI/ShareUI/GhostsState_UI.ui')
 export default class GhostsState_UI_Generate extends UIScript {
	 	private mBtn_giveup_Internal: mw.Button
	public get mBtn_giveup(): mw.Button {
		if(!this.mBtn_giveup_Internal&&this.uiWidgetBase) {
			this.mBtn_giveup_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_giveup') as mw.Button
		}
		return this.mBtn_giveup_Internal
	}
	private mTouchPad_Internal: mw.TouchPad
	public get mTouchPad(): mw.TouchPad {
		if(!this.mTouchPad_Internal&&this.uiWidgetBase) {
			this.mTouchPad_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTouchPad') as mw.TouchPad
		}
		return this.mTouchPad_Internal
	}
	private canvas_sos_Internal: mw.Canvas
	public get canvas_sos(): mw.Canvas {
		if(!this.canvas_sos_Internal&&this.uiWidgetBase) {
			this.canvas_sos_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_sos') as mw.Canvas
		}
		return this.canvas_sos_Internal
	}
	private btn_sos_Internal: mw.Button
	public get btn_sos(): mw.Button {
		if(!this.btn_sos_Internal&&this.uiWidgetBase) {
			this.btn_sos_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_sos/btn_sos') as mw.Button
		}
		return this.btn_sos_Internal
	}
	private progressBar_Internal: mw.ProgressBar
	public get progressBar(): mw.ProgressBar {
		if(!this.progressBar_Internal&&this.uiWidgetBase) {
			this.progressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/progressBar') as mw.ProgressBar
		}
		return this.progressBar_Internal
	}
	private text_giveUp_Internal: mw.TextBlock
	public get text_giveUp(): mw.TextBlock {
		if(!this.text_giveUp_Internal&&this.uiWidgetBase) {
			this.text_giveUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_giveUp') as mw.TextBlock
		}
		return this.text_giveUp_Internal
	}
	private mText_GhostGuide_Internal: mw.TextBlock
	public get mText_GhostGuide(): mw.TextBlock {
		if(!this.mText_GhostGuide_Internal&&this.uiWidgetBase) {
			this.mText_GhostGuide_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_GhostGuide') as mw.TextBlock
		}
		return this.mText_GhostGuide_Internal
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
		
		this.mBtn_giveup.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GhostsState_UI_mBtn_giveup");
		})
		this.mBtn_giveup.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn_giveup.onPressed.add(() => {
			this.mBtn_giveup["preScale"] = this.mBtn_giveup.renderScale;
			this.mBtn_giveup.renderScale = Vector2.one.set(this.mBtn_giveup["preScale"]).multiply(1.1);
		})
		this.mBtn_giveup.onReleased.add(() => {
			this.mBtn_giveup.renderScale = this.mBtn_giveup["preScale"];
		})
		
	
		this.btn_sos.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GhostsState_UI_btn_sos");
		})
		this.btn_sos.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_sos.onPressed.add(() => {
			this.btn_sos["preScale"] = this.btn_sos.renderScale;
			this.btn_sos.renderScale = Vector2.one.set(this.btn_sos["preScale"]).multiply(1.1);
		})
		this.btn_sos.onReleased.add(() => {
			this.btn_sos.renderScale = this.btn_sos["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_giveUp)
		
	
		this.initLanguage(this.mText_GhostGuide)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_GhostsState_UI'] = GhostsState_UI_Generate;