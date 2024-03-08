
 

 @UIBind('UI/ShareUI/GhostItem_UI.ui')
 export default class GhostItem_UI_Generate extends UIScript {
	 	private img_ghost_Internal: mw.Image
	public get img_ghost(): mw.Image {
		if(!this.img_ghost_Internal&&this.uiWidgetBase) {
			this.img_ghost_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_ghost') as mw.Image
		}
		return this.img_ghost_Internal
	}
	private btn_type_Internal: mw.Button
	public get btn_type(): mw.Button {
		if(!this.btn_type_Internal&&this.uiWidgetBase) {
			this.btn_type_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_type') as mw.Button
		}
		return this.btn_type_Internal
	}
	private nameTxt_Internal: mw.TextBlock
	public get nameTxt(): mw.TextBlock {
		if(!this.nameTxt_Internal&&this.uiWidgetBase) {
			this.nameTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/nameTxt') as mw.TextBlock
		}
		return this.nameTxt_Internal
	}
	private text_questionMark_Internal: mw.TextBlock
	public get text_questionMark(): mw.TextBlock {
		if(!this.text_questionMark_Internal&&this.uiWidgetBase) {
			this.text_questionMark_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_questionMark') as mw.TextBlock
		}
		return this.text_questionMark_Internal
	}
	private canvas_tips_Internal: mw.Canvas
	public get canvas_tips(): mw.Canvas {
		if(!this.canvas_tips_Internal&&this.uiWidgetBase) {
			this.canvas_tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tips') as mw.Canvas
		}
		return this.canvas_tips_Internal
	}
	private img_black_Internal: mw.Image
	public get img_black(): mw.Image {
		if(!this.img_black_Internal&&this.uiWidgetBase) {
			this.img_black_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tips/img_black') as mw.Image
		}
		return this.img_black_Internal
	}
	private text_tips_Internal: mw.TextBlock
	public get text_tips(): mw.TextBlock {
		if(!this.text_tips_Internal&&this.uiWidgetBase) {
			this.text_tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tips/text_tips') as mw.TextBlock
		}
		return this.text_tips_Internal
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
		
		this.btn_type.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GhostItem_UI_btn_type");
		})
		this.btn_type.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_type.onPressed.add(() => {
			this.btn_type["preScale"] = this.btn_type.renderScale;
			this.btn_type.renderScale = Vector2.one.set(this.btn_type["preScale"]).multiply(1.1);
		})
		this.btn_type.onReleased.add(() => {
			this.btn_type.renderScale = this.btn_type["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.nameTxt)
		
	
		this.initLanguage(this.text_questionMark)
		
	
		this.initLanguage(this.text_tips)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_GhostItem_UI'] = GhostItem_UI_Generate;