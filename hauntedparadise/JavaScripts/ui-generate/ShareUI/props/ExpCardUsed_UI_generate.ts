
 

 @UIBind('UI/ShareUI/props/ExpCardUsed_UI.ui')
 export default class ExpCardUsed_UI_Generate extends UIScript {
	 	private text_time_Internal: mw.TextBlock
	public get text_time(): mw.TextBlock {
		if(!this.text_time_Internal&&this.uiWidgetBase) {
			this.text_time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_time') as mw.TextBlock
		}
		return this.text_time_Internal
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
		
		this.initLanguage(this.text_time)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_ExpCardUsed_UI'] = ExpCardUsed_UI_Generate;