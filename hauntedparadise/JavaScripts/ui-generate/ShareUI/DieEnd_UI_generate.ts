
 

 @UIBind('UI/ShareUI/DieEnd_UI.ui')
 export default class DieEnd_UI_Generate extends UIScript {
	 	private rootCanvas_Internal: mw.Canvas
	public get rootCanvas(): mw.Canvas {
		if(!this.rootCanvas_Internal&&this.uiWidgetBase) {
			this.rootCanvas_Internal = this.uiWidgetBase.findChildByPath('rootCanvas') as mw.Canvas
		}
		return this.rootCanvas_Internal
	}
	private btn_fail_Internal: mw.Button
	public get btn_fail(): mw.Button {
		if(!this.btn_fail_Internal&&this.uiWidgetBase) {
			this.btn_fail_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/btn_fail') as mw.Button
		}
		return this.btn_fail_Internal
	}
	private text_fail_Internal: mw.TextBlock
	public get text_fail(): mw.TextBlock {
		if(!this.text_fail_Internal&&this.uiWidgetBase) {
			this.text_fail_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/text_fail') as mw.TextBlock
		}
		return this.text_fail_Internal
	}
	private mDieCanvas_Internal: mw.Canvas
	public get mDieCanvas(): mw.Canvas {
		if(!this.mDieCanvas_Internal&&this.uiWidgetBase) {
			this.mDieCanvas_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/mDieCanvas') as mw.Canvas
		}
		return this.mDieCanvas_Internal
	}
	private text_tips_die_Internal: mw.TextBlock
	public get text_tips_die(): mw.TextBlock {
		if(!this.text_tips_die_Internal&&this.uiWidgetBase) {
			this.text_tips_die_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/mDieCanvas/text_tips_die') as mw.TextBlock
		}
		return this.text_tips_die_Internal
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
		
		this.btn_fail.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "DieEnd_UI_btn_fail");
		})
		this.btn_fail.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_fail.onPressed.add(() => {
			this.btn_fail["preScale"] = this.btn_fail.renderScale;
			this.btn_fail.renderScale = Vector2.one.set(this.btn_fail["preScale"]).multiply(1.1);
		})
		this.btn_fail.onReleased.add(() => {
			this.btn_fail.renderScale = this.btn_fail["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_fail)
		
	
		this.initLanguage(this.text_tips_die)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_DieEnd_UI'] = DieEnd_UI_Generate;