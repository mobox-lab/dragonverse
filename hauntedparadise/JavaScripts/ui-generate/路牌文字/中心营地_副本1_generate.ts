
 

 @UIBind('UI/路牌文字/中心营地_副本1.ui')
 export default class 中心营地_副本1_Generate extends UIScript {
	 	private text_map_Internal: mw.TextBlock
	public get text_map(): mw.TextBlock {
		if(!this.text_map_Internal&&this.uiWidgetBase) {
			this.text_map_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_map') as mw.TextBlock
		}
		return this.text_map_Internal
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
		
		this.initLanguage(this.text_map)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_中心营地_副本1'] = 中心营地_副本1_Generate;