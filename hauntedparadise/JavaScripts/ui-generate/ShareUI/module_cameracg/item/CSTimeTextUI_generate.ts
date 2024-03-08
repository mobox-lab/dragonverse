
 

 @UIBind('UI/ShareUI/module_cameracg/item/CSTimeTextUI.ui')
 export default class CSTimeTextUI_Generate extends UIScript {
	 	private mTextTime_Internal: mw.TextBlock
	public get mTextTime(): mw.TextBlock {
		if(!this.mTextTime_Internal&&this.uiWidgetBase) {
			this.mTextTime_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTextTime') as mw.TextBlock
		}
		return this.mTextTime_Internal
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
		
		this.initLanguage(this.mTextTime)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CSTimeTextUI'] = CSTimeTextUI_Generate;