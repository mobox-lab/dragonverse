
 

 @UIBind('UI/ShareUI/card/LikeName_UI.ui')
 export default class LikeName_UI_Generate extends UIScript {
	 	private btn_likeName_Internal: mw.Button
	public get btn_likeName(): mw.Button {
		if(!this.btn_likeName_Internal&&this.uiWidgetBase) {
			this.btn_likeName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_likeName') as mw.Button
		}
		return this.btn_likeName_Internal
	}
	private text_likeName_Internal: mw.TextBlock
	public get text_likeName(): mw.TextBlock {
		if(!this.text_likeName_Internal&&this.uiWidgetBase) {
			this.text_likeName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_likeName/text_likeName') as mw.TextBlock
		}
		return this.text_likeName_Internal
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
		
		this.btn_likeName.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "LikeName_UI_btn_likeName");
		})
		this.btn_likeName.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_likeName.onPressed.add(() => {
			this.btn_likeName["preScale"] = this.btn_likeName.renderScale;
			this.btn_likeName.renderScale = Vector2.one.set(this.btn_likeName["preScale"]).multiply(1.1);
		})
		this.btn_likeName.onReleased.add(() => {
			this.btn_likeName.renderScale = this.btn_likeName["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_likeName)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_LikeName_UI'] = LikeName_UI_Generate;