
 

 @UIBind('UI/ShareUI/shop/ShopTab_UI.ui')
 export default class ShopTab_UI_Generate extends UIScript {
	 	private canvas_tab1_Internal: mw.Canvas
	public get canvas_tab1(): mw.Canvas {
		if(!this.canvas_tab1_Internal&&this.uiWidgetBase) {
			this.canvas_tab1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tab1') as mw.Canvas
		}
		return this.canvas_tab1_Internal
	}
	private btn_tab1_Internal: mw.Button
	public get btn_tab1(): mw.Button {
		if(!this.btn_tab1_Internal&&this.uiWidgetBase) {
			this.btn_tab1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tab1/btn_tab1') as mw.Button
		}
		return this.btn_tab1_Internal
	}
	private text_tab1_Internal: mw.TextBlock
	public get text_tab1(): mw.TextBlock {
		if(!this.text_tab1_Internal&&this.uiWidgetBase) {
			this.text_tab1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tab1/text_tab1') as mw.TextBlock
		}
		return this.text_tab1_Internal
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
		
		this.btn_tab1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ShopTab_UI_btn_tab1");
		})
		this.btn_tab1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_tab1.onPressed.add(() => {
			this.btn_tab1["preScale"] = this.btn_tab1.renderScale;
			this.btn_tab1.renderScale = Vector2.one.set(this.btn_tab1["preScale"]).multiply(1.1);
		})
		this.btn_tab1.onReleased.add(() => {
			this.btn_tab1.renderScale = this.btn_tab1["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_tab1)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_ShopTab_UI'] = ShopTab_UI_Generate;