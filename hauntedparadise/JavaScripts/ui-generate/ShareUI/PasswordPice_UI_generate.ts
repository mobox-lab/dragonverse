
 

 @UIBind('UI/ShareUI/PasswordPice_UI.ui')
 export default class PasswordPice_UI_Generate extends UIScript {
	 	private num_txt_Internal: mw.TextBlock
	public get num_txt(): mw.TextBlock {
		if(!this.num_txt_Internal&&this.uiWidgetBase) {
			this.num_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/num_txt') as mw.TextBlock
		}
		return this.num_txt_Internal
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
		
		this.initLanguage(this.num_txt)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_PasswordPice_UI'] = PasswordPice_UI_Generate;