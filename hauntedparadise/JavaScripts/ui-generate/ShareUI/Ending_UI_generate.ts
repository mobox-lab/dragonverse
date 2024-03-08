
 

 @UIBind('UI/ShareUI/Ending_UI.ui')
 export default class Ending_UI_Generate extends UIScript {
	 	private rootCanvas_Internal: mw.Canvas
	public get rootCanvas(): mw.Canvas {
		if(!this.rootCanvas_Internal&&this.uiWidgetBase) {
			this.rootCanvas_Internal = this.uiWidgetBase.findChildByPath('rootCanvas') as mw.Canvas
		}
		return this.rootCanvas_Internal
	}
	private btn_backtomain_Internal: mw.StaleButton
	public get btn_backtomain(): mw.StaleButton {
		if(!this.btn_backtomain_Internal&&this.uiWidgetBase) {
			this.btn_backtomain_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/btn_backtomain') as mw.StaleButton
		}
		return this.btn_backtomain_Internal
	}
	private text_time_Internal: mw.TextBlock
	public get text_time(): mw.TextBlock {
		if(!this.text_time_Internal&&this.uiWidgetBase) {
			this.text_time_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/text_time') as mw.TextBlock
		}
		return this.text_time_Internal
	}
	private text_timetips_Internal: mw.TextBlock
	public get text_timetips(): mw.TextBlock {
		if(!this.text_timetips_Internal&&this.uiWidgetBase) {
			this.text_timetips_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/text_timetips') as mw.TextBlock
		}
		return this.text_timetips_Internal
	}
	private text_diffi_Internal: mw.TextBlock
	public get text_diffi(): mw.TextBlock {
		if(!this.text_diffi_Internal&&this.uiWidgetBase) {
			this.text_diffi_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/text_diffi') as mw.TextBlock
		}
		return this.text_diffi_Internal
	}
	private canvas_ed_Internal: mw.Canvas
	public get canvas_ed(): mw.Canvas {
		if(!this.canvas_ed_Internal&&this.uiWidgetBase) {
			this.canvas_ed_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/canvas_ed') as mw.Canvas
		}
		return this.canvas_ed_Internal
	}
	private img_text_Internal: mw.Image
	public get img_text(): mw.Image {
		if(!this.img_text_Internal&&this.uiWidgetBase) {
			this.img_text_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/canvas_ed/img_text') as mw.Image
		}
		return this.img_text_Internal
	}
	private text_ed_Internal: mw.TextBlock
	public get text_ed(): mw.TextBlock {
		if(!this.text_ed_Internal&&this.uiWidgetBase) {
			this.text_ed_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/canvas_ed/text_ed') as mw.TextBlock
		}
		return this.text_ed_Internal
	}
	private text_edtips_Internal: mw.TextBlock
	public get text_edtips(): mw.TextBlock {
		if(!this.text_edtips_Internal&&this.uiWidgetBase) {
			this.text_edtips_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/canvas_ed/text_edtips') as mw.TextBlock
		}
		return this.text_edtips_Internal
	}
	private canvas_victory_Internal: mw.Canvas
	public get canvas_victory(): mw.Canvas {
		if(!this.canvas_victory_Internal&&this.uiWidgetBase) {
			this.canvas_victory_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/canvas_victory') as mw.Canvas
		}
		return this.canvas_victory_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btn_backtomain.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Ending_UI_btn_backtomain");
		})
		this.initLanguage(this.btn_backtomain);
		this.btn_backtomain.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_backtomain.onPressed.add(() => {
			this.btn_backtomain["preScale"] = this.btn_backtomain.renderScale;
			this.btn_backtomain.renderScale = Vector2.one.set(this.btn_backtomain["preScale"]).multiply(1.1);
		})
		this.btn_backtomain.onReleased.add(() => {
			this.btn_backtomain.renderScale = this.btn_backtomain["preScale"];
		})
		
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_time)
		
	
		this.initLanguage(this.text_timetips)
		
	
		this.initLanguage(this.text_diffi)
		
	
		this.initLanguage(this.text_ed)
		
	
		this.initLanguage(this.text_edtips)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Ending_UI'] = Ending_UI_Generate;