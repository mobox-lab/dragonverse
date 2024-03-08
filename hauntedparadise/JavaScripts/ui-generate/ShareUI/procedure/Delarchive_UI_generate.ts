
 

 @UIBind('UI/ShareUI/procedure/Delarchive_UI.ui')
 export default class Delarchive_UI_Generate extends UIScript {
	 	private canvas_question_Internal: mw.Canvas
	public get canvas_question(): mw.Canvas {
		if(!this.canvas_question_Internal&&this.uiWidgetBase) {
			this.canvas_question_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_question') as mw.Canvas
		}
		return this.canvas_question_Internal
	}
	private btn_yes_Internal: mw.StaleButton
	public get btn_yes(): mw.StaleButton {
		if(!this.btn_yes_Internal&&this.uiWidgetBase) {
			this.btn_yes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_question/btn_yes') as mw.StaleButton
		}
		return this.btn_yes_Internal
	}
	private btn_no_Internal: mw.StaleButton
	public get btn_no(): mw.StaleButton {
		if(!this.btn_no_Internal&&this.uiWidgetBase) {
			this.btn_no_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_question/btn_no') as mw.StaleButton
		}
		return this.btn_no_Internal
	}
	private text_question_Internal: mw.TextBlock
	public get text_question(): mw.TextBlock {
		if(!this.text_question_Internal&&this.uiWidgetBase) {
			this.text_question_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_question/text_question') as mw.TextBlock
		}
		return this.text_question_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btn_yes.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Delarchive_UI_btn_yes");
		})
		this.initLanguage(this.btn_yes);
		this.btn_yes.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_yes.onPressed.add(() => {
			this.btn_yes["preScale"] = this.btn_yes.renderScale;
			this.btn_yes.renderScale = Vector2.one.set(this.btn_yes["preScale"]).multiply(1.1);
		})
		this.btn_yes.onReleased.add(() => {
			this.btn_yes.renderScale = this.btn_yes["preScale"];
		})
		
		
	
		this.btn_no.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Delarchive_UI_btn_no");
		})
		this.initLanguage(this.btn_no);
		this.btn_no.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_no.onPressed.add(() => {
			this.btn_no["preScale"] = this.btn_no.renderScale;
			this.btn_no.renderScale = Vector2.one.set(this.btn_no["preScale"]).multiply(1.1);
		})
		this.btn_no.onReleased.add(() => {
			this.btn_no.renderScale = this.btn_no["preScale"];
		})
		
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_question)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Delarchive_UI'] = Delarchive_UI_Generate;