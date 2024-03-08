
 

 @UIBind('UI/ShareUI/shop/TipsBox_UI.ui')
 export default class TipsBox_UI_Generate extends UIScript {
	 	private canvas_tipsbox_Internal: mw.Canvas
	public get canvas_tipsbox(): mw.Canvas {
		if(!this.canvas_tipsbox_Internal&&this.uiWidgetBase) {
			this.canvas_tipsbox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tipsbox') as mw.Canvas
		}
		return this.canvas_tipsbox_Internal
	}
	private img_bg_1_Internal: mw.Image
	public get img_bg_1(): mw.Image {
		if(!this.img_bg_1_Internal&&this.uiWidgetBase) {
			this.img_bg_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tipsbox/img_bg_1') as mw.Image
		}
		return this.img_bg_1_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tipsbox/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private text_content_Internal: mw.TextBlock
	public get text_content(): mw.TextBlock {
		if(!this.text_content_Internal&&this.uiWidgetBase) {
			this.text_content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tipsbox/text_content') as mw.TextBlock
		}
		return this.text_content_Internal
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
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_content)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_TipsBox_UI'] = TipsBox_UI_Generate;