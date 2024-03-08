
 

 @UIBind('UI/ShareUI/props/BuyreItem_UI.ui')
 export default class BuyreItem_UI_Generate extends UIScript {
	 	private canvas_frame_Internal: mw.Canvas
	public get canvas_frame(): mw.Canvas {
		if(!this.canvas_frame_Internal&&this.uiWidgetBase) {
			this.canvas_frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame') as mw.Canvas
		}
		return this.canvas_frame_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private img_bg2_Internal: mw.Image
	public get img_bg2(): mw.Image {
		if(!this.img_bg2_Internal&&this.uiWidgetBase) {
			this.img_bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_bg2') as mw.Image
		}
		return this.img_bg2_Internal
	}
	private img_bg3_Internal: mw.Image
	public get img_bg3(): mw.Image {
		if(!this.img_bg3_Internal&&this.uiWidgetBase) {
			this.img_bg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_bg3') as mw.Image
		}
		return this.img_bg3_Internal
	}
	private text_question_Internal: mw.TextBlock
	public get text_question(): mw.TextBlock {
		if(!this.text_question_Internal&&this.uiWidgetBase) {
			this.text_question_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/text_question') as mw.TextBlock
		}
		return this.text_question_Internal
	}
	private img_icon1_Internal: mw.Image
	public get img_icon1(): mw.Image {
		if(!this.img_icon1_Internal&&this.uiWidgetBase) {
			this.img_icon1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_icon1') as mw.Image
		}
		return this.img_icon1_Internal
	}
	private img_coin1_Internal: mw.Image
	public get img_coin1(): mw.Image {
		if(!this.img_coin1_Internal&&this.uiWidgetBase) {
			this.img_coin1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_coin1') as mw.Image
		}
		return this.img_coin1_Internal
	}
	private text_coinNum_Internal: mw.TextBlock
	public get text_coinNum(): mw.TextBlock {
		if(!this.text_coinNum_Internal&&this.uiWidgetBase) {
			this.text_coinNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/text_coinNum') as mw.TextBlock
		}
		return this.text_coinNum_Internal
	}
	private btn_buyItem_Internal: mw.Button
	public get btn_buyItem(): mw.Button {
		if(!this.btn_buyItem_Internal&&this.uiWidgetBase) {
			this.btn_buyItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/btn_buyItem') as mw.Button
		}
		return this.btn_buyItem_Internal
	}
	private text_buy_Internal: mw.TextBlock
	public get text_buy(): mw.TextBlock {
		if(!this.text_buy_Internal&&this.uiWidgetBase) {
			this.text_buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/btn_buyItem/text_buy') as mw.TextBlock
		}
		return this.text_buy_Internal
	}
	private img_coin2_Internal: mw.Image
	public get img_coin2(): mw.Image {
		if(!this.img_coin2_Internal&&this.uiWidgetBase) {
			this.img_coin2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_coin2') as mw.Image
		}
		return this.img_coin2_Internal
	}
	private text_num_Internal: mw.TextBlock
	public get text_num(): mw.TextBlock {
		if(!this.text_num_Internal&&this.uiWidgetBase) {
			this.text_num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/text_num') as mw.TextBlock
		}
		return this.text_num_Internal
	}
	private btn_no_Internal: mw.Button
	public get btn_no(): mw.Button {
		if(!this.btn_no_Internal&&this.uiWidgetBase) {
			this.btn_no_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/btn_no') as mw.Button
		}
		return this.btn_no_Internal
	}
	private text_no_Internal: mw.TextBlock
	public get text_no(): mw.TextBlock {
		if(!this.text_no_Internal&&this.uiWidgetBase) {
			this.text_no_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/btn_no/text_no') as mw.TextBlock
		}
		return this.text_no_Internal
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
		
		this.btn_buyItem.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuyreItem_UI_btn_buyItem");
		})
		this.btn_buyItem.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_buyItem.onPressed.add(() => {
			this.btn_buyItem["preScale"] = this.btn_buyItem.renderScale;
			this.btn_buyItem.renderScale = Vector2.one.set(this.btn_buyItem["preScale"]).multiply(1.1);
		})
		this.btn_buyItem.onReleased.add(() => {
			this.btn_buyItem.renderScale = this.btn_buyItem["preScale"];
		})
		
	
		this.btn_no.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuyreItem_UI_btn_no");
		})
		this.btn_no.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_no.onPressed.add(() => {
			this.btn_no["preScale"] = this.btn_no.renderScale;
			this.btn_no.renderScale = Vector2.one.set(this.btn_no["preScale"]).multiply(1.1);
		})
		this.btn_no.onReleased.add(() => {
			this.btn_no.renderScale = this.btn_no["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_question)
		
	
		this.initLanguage(this.text_coinNum)
		
	
		this.initLanguage(this.text_buy)
		
	
		this.initLanguage(this.text_num)
		
	
		this.initLanguage(this.text_no)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BuyreItem_UI'] = BuyreItem_UI_Generate;