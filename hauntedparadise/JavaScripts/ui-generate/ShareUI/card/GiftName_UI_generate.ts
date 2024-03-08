
 

 @UIBind('UI/ShareUI/card/GiftName_UI.ui')
 export default class GiftName_UI_Generate extends UIScript {
	 	private canvas_giftName0_Internal: mw.Canvas
	public get canvas_giftName0(): mw.Canvas {
		if(!this.canvas_giftName0_Internal&&this.uiWidgetBase) {
			this.canvas_giftName0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftName0') as mw.Canvas
		}
		return this.canvas_giftName0_Internal
	}
	private img_giftItem_Internal: mw.Image
	public get img_giftItem(): mw.Image {
		if(!this.img_giftItem_Internal&&this.uiWidgetBase) {
			this.img_giftItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftName0/img_giftItem') as mw.Image
		}
		return this.img_giftItem_Internal
	}
	private btn_giftName_Internal: mw.Button
	public get btn_giftName(): mw.Button {
		if(!this.btn_giftName_Internal&&this.uiWidgetBase) {
			this.btn_giftName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftName0/btn_giftName') as mw.Button
		}
		return this.btn_giftName_Internal
	}
	private text_giftName_Internal: mw.TextBlock
	public get text_giftName(): mw.TextBlock {
		if(!this.text_giftName_Internal&&this.uiWidgetBase) {
			this.text_giftName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftName0/btn_giftName/text_giftName') as mw.TextBlock
		}
		return this.text_giftName_Internal
	}
	private text_giftNum1_Internal: mw.TextBlock
	public get text_giftNum1(): mw.TextBlock {
		if(!this.text_giftNum1_Internal&&this.uiWidgetBase) {
			this.text_giftNum1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftName0/text_giftNum1') as mw.TextBlock
		}
		return this.text_giftNum1_Internal
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
		
		this.btn_giftName.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GiftName_UI_btn_giftName");
		})
		this.btn_giftName.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_giftName.onPressed.add(() => {
			this.btn_giftName["preScale"] = this.btn_giftName.renderScale;
			this.btn_giftName.renderScale = Vector2.one.set(this.btn_giftName["preScale"]).multiply(1.1);
		})
		this.btn_giftName.onReleased.add(() => {
			this.btn_giftName.renderScale = this.btn_giftName["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_giftName)
		
	
		this.initLanguage(this.text_giftNum1)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_GiftName_UI'] = GiftName_UI_Generate;