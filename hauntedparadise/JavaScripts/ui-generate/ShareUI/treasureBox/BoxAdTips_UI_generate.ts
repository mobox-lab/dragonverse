
 

 @UIBind('UI/ShareUI/treasureBox/BoxAdTips_UI.ui')
 export default class BoxAdTips_UI_Generate extends UIScript {
	 	private canvas_tips_Internal: mw.Canvas
	public get canvas_tips(): mw.Canvas {
		if(!this.canvas_tips_Internal&&this.uiWidgetBase) {
			this.canvas_tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tips') as mw.Canvas
		}
		return this.canvas_tips_Internal
	}
	private img_bg2_Internal: mw.Image
	public get img_bg2(): mw.Image {
		if(!this.img_bg2_Internal&&this.uiWidgetBase) {
			this.img_bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tips/img_bg2') as mw.Image
		}
		return this.img_bg2_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tips/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private text_ad_Internal: mw.TextBlock
	public get text_ad(): mw.TextBlock {
		if(!this.text_ad_Internal&&this.uiWidgetBase) {
			this.text_ad_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tips/text_ad') as mw.TextBlock
		}
		return this.text_ad_Internal
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
		
		this.initLanguage(this.text_ad)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BoxAdTips_UI'] = BoxAdTips_UI_Generate;