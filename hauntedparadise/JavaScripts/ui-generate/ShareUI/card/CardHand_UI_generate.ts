
 

 @UIBind('UI/ShareUI/card/CardHand_UI.ui')
 export default class CardHand_UI_Generate extends UIScript {
	 	private btn_cardHand_Internal: mw.Button
	public get btn_cardHand(): mw.Button {
		if(!this.btn_cardHand_Internal&&this.uiWidgetBase) {
			this.btn_cardHand_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_cardHand') as mw.Button
		}
		return this.btn_cardHand_Internal
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
		
		this.btn_cardHand.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CardHand_UI_btn_cardHand");
		})
		this.btn_cardHand.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_cardHand.onPressed.add(() => {
			this.btn_cardHand["preScale"] = this.btn_cardHand.renderScale;
			this.btn_cardHand.renderScale = Vector2.one.set(this.btn_cardHand["preScale"]).multiply(1.1);
		})
		this.btn_cardHand.onReleased.add(() => {
			this.btn_cardHand.renderScale = this.btn_cardHand["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CardHand_UI'] = CardHand_UI_Generate;