
 

 @UIBind('UI/ShareUI/module_gm/GMItem.ui')
 export default class GMItem_Generate extends UIScript {
	 	private button_Internal: mw.StaleButton
	public get button(): mw.StaleButton {
		if(!this.button_Internal&&this.uiWidgetBase) {
			this.button_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/button') as mw.StaleButton
		}
		return this.button_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.button.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GMItem_button");
		})
		this.initLanguage(this.button);
		this.button.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.button.onPressed.add(() => {
			this.button["preScale"] = this.button.renderScale;
			this.button.renderScale = Vector2.one.set(this.button["preScale"]).multiply(1.1);
		})
		this.button.onReleased.add(() => {
			this.button.renderScale = this.button["preScale"];
		})
		
		
	
		//按钮添加点击
		

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

UIService['UI_GMItem'] = GMItem_Generate;