
 

 @UIBind('UI/ShareUI/props/Hint_UI.ui')
 export default class Hint_UI_Generate extends UIScript {
	 	private canvas_hint_Internal: mw.Canvas
	public get canvas_hint(): mw.Canvas {
		if(!this.canvas_hint_Internal&&this.uiWidgetBase) {
			this.canvas_hint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_hint') as mw.Canvas
		}
		return this.canvas_hint_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_hint/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private img_hint_Internal: mw.Image
	public get img_hint(): mw.Image {
		if(!this.img_hint_Internal&&this.uiWidgetBase) {
			this.img_hint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_hint/img_hint') as mw.Image
		}
		return this.img_hint_Internal
	}
	private btn_useHint_Internal: mw.Button
	public get btn_useHint(): mw.Button {
		if(!this.btn_useHint_Internal&&this.uiWidgetBase) {
			this.btn_useHint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_hint/btn_useHint') as mw.Button
		}
		return this.btn_useHint_Internal
	}
	private text_num_Internal: mw.TextBlock
	public get text_num(): mw.TextBlock {
		if(!this.text_num_Internal&&this.uiWidgetBase) {
			this.text_num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_hint/text_num') as mw.TextBlock
		}
		return this.text_num_Internal
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
		
		this.btn_useHint.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Hint_UI_btn_useHint");
		})
		this.btn_useHint.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_useHint.onPressed.add(() => {
			this.btn_useHint["preScale"] = this.btn_useHint.renderScale;
			this.btn_useHint.renderScale = Vector2.one.set(this.btn_useHint["preScale"]).multiply(1.1);
		})
		this.btn_useHint.onReleased.add(() => {
			this.btn_useHint.renderScale = this.btn_useHint["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_num)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Hint_UI'] = Hint_UI_Generate;