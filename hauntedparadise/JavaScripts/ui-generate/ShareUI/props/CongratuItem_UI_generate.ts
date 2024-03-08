
 

 @UIBind('UI/ShareUI/props/CongratuItem_UI.ui')
 export default class CongratuItem_UI_Generate extends UIScript {
	 	private canvas_item_Internal: mw.Canvas
	public get canvas_item(): mw.Canvas {
		if(!this.canvas_item_Internal&&this.uiWidgetBase) {
			this.canvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item') as mw.Canvas
		}
		return this.canvas_item_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private img_icon1_Internal: mw.Image
	public get img_icon1(): mw.Image {
		if(!this.img_icon1_Internal&&this.uiWidgetBase) {
			this.img_icon1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/img_icon1') as mw.Image
		}
		return this.img_icon1_Internal
	}
	private text_name1_Internal: mw.TextBlock
	public get text_name1(): mw.TextBlock {
		if(!this.text_name1_Internal&&this.uiWidgetBase) {
			this.text_name1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/text_name1') as mw.TextBlock
		}
		return this.text_name1_Internal
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
		
		this.initLanguage(this.text_name1)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CongratuItem_UI'] = CongratuItem_UI_Generate;