
 

 @UIBind('UI/ShareUI/props/BuildStyleItem_UI.ui')
 export default class BuildStyleItem_UI_Generate extends UIScript {
	 	private canvas_styleItem_Internal: mw.Canvas
	public get canvas_styleItem(): mw.Canvas {
		if(!this.canvas_styleItem_Internal&&this.uiWidgetBase) {
			this.canvas_styleItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_styleItem') as mw.Canvas
		}
		return this.canvas_styleItem_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_styleItem/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private btn_styleItem_Internal: mw.Button
	public get btn_styleItem(): mw.Button {
		if(!this.btn_styleItem_Internal&&this.uiWidgetBase) {
			this.btn_styleItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_styleItem/btn_styleItem') as mw.Button
		}
		return this.btn_styleItem_Internal
	}
	private text_styleItem_Internal: mw.TextBlock
	public get text_styleItem(): mw.TextBlock {
		if(!this.text_styleItem_Internal&&this.uiWidgetBase) {
			this.text_styleItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_styleItem/btn_styleItem/text_styleItem') as mw.TextBlock
		}
		return this.text_styleItem_Internal
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
		
		this.btn_styleItem.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuildStyleItem_UI_btn_styleItem");
		})
		this.btn_styleItem.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_styleItem.onPressed.add(() => {
			this.btn_styleItem["preScale"] = this.btn_styleItem.renderScale;
			this.btn_styleItem.renderScale = Vector2.one.set(this.btn_styleItem["preScale"]).multiply(1.1);
		})
		this.btn_styleItem.onReleased.add(() => {
			this.btn_styleItem.renderScale = this.btn_styleItem["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_styleItem)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BuildStyleItem_UI'] = BuildStyleItem_UI_Generate;