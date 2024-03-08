
 

 @UIBind('UI/ShareUI/module_cameracg/frameInfo/CSEventItemUI.ui')
 export default class CSEventItemUI_Generate extends UIScript {
	 	private btn_select_Internal: mw.Button
	public get btn_select(): mw.Button {
		if(!this.btn_select_Internal&&this.uiWidgetBase) {
			this.btn_select_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_select') as mw.Button
		}
		return this.btn_select_Internal
	}
	private txt_name_Internal: mw.TextBlock
	public get txt_name(): mw.TextBlock {
		if(!this.txt_name_Internal&&this.uiWidgetBase) {
			this.txt_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_name') as mw.TextBlock
		}
		return this.txt_name_Internal
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
		
		this.btn_select.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEventItemUI_btn_select");
		})
		this.btn_select.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_select.onPressed.add(() => {
			this.btn_select["preScale"] = this.btn_select.renderScale;
			this.btn_select.renderScale = Vector2.one.set(this.btn_select["preScale"]).multiply(1.1);
		})
		this.btn_select.onReleased.add(() => {
			this.btn_select.renderScale = this.btn_select["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.txt_name)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CSEventItemUI'] = CSEventItemUI_Generate;