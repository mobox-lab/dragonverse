
 

 @UIBind('UI/ShareUI/props/CompletRewardTip_UI.ui')
 export default class CompletRewardTip_UI_Generate extends UIScript {
	 	private text_tip_Internal: mw.TextBlock
	public get text_tip(): mw.TextBlock {
		if(!this.text_tip_Internal&&this.uiWidgetBase) {
			this.text_tip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_tip') as mw.TextBlock
		}
		return this.text_tip_Internal
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
		
		this.initLanguage(this.text_tip)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CompletRewardTip_UI'] = CompletRewardTip_UI_Generate;