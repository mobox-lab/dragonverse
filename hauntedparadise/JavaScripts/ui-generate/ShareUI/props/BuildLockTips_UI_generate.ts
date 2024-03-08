
 

 @UIBind('UI/ShareUI/props/BuildLockTips_UI.ui')
 export default class BuildLockTips_UI_Generate extends UIScript {
	 	private canvas_window_Internal: mw.Canvas
	public get canvas_window(): mw.Canvas {
		if(!this.canvas_window_Internal&&this.uiWidgetBase) {
			this.canvas_window_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window') as mw.Canvas
		}
		return this.canvas_window_Internal
	}
	private img_bg1_1_Internal: mw.Image
	public get img_bg1_1(): mw.Image {
		if(!this.img_bg1_1_Internal&&this.uiWidgetBase) {
			this.img_bg1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/img_bg1_1') as mw.Image
		}
		return this.img_bg1_1_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private text_tipstitle_Internal: mw.TextBlock
	public get text_tipstitle(): mw.TextBlock {
		if(!this.text_tipstitle_Internal&&this.uiWidgetBase) {
			this.text_tipstitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/text_tipstitle') as mw.TextBlock
		}
		return this.text_tipstitle_Internal
	}
	private text_tipscontent_Internal: mw.TextBlock
	public get text_tipscontent(): mw.TextBlock {
		if(!this.text_tipscontent_Internal&&this.uiWidgetBase) {
			this.text_tipscontent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/text_tipscontent') as mw.TextBlock
		}
		return this.text_tipscontent_Internal
	}
	private img_br1_Internal: mw.Image
	public get img_br1(): mw.Image {
		if(!this.img_br1_Internal&&this.uiWidgetBase) {
			this.img_br1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/img_br1') as mw.Image
		}
		return this.img_br1_Internal
	}
	private btn_confirm_Internal: mw.Button
	public get btn_confirm(): mw.Button {
		if(!this.btn_confirm_Internal&&this.uiWidgetBase) {
			this.btn_confirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/btn_confirm') as mw.Button
		}
		return this.btn_confirm_Internal
	}
	private text_confirm_Internal: mw.TextBlock
	public get text_confirm(): mw.TextBlock {
		if(!this.text_confirm_Internal&&this.uiWidgetBase) {
			this.text_confirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_window/btn_confirm/text_confirm') as mw.TextBlock
		}
		return this.text_confirm_Internal
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
		
		this.btn_confirm.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuildLockTips_UI_btn_confirm");
		})
		this.btn_confirm.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_confirm.onPressed.add(() => {
			this.btn_confirm["preScale"] = this.btn_confirm.renderScale;
			this.btn_confirm.renderScale = Vector2.one.set(this.btn_confirm["preScale"]).multiply(1.1);
		})
		this.btn_confirm.onReleased.add(() => {
			this.btn_confirm.renderScale = this.btn_confirm["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_tipstitle)
		
	
		this.initLanguage(this.text_tipscontent)
		
	
		this.initLanguage(this.text_confirm)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BuildLockTips_UI'] = BuildLockTips_UI_Generate;