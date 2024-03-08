
 

 @UIBind('UI/ShareUI/module_cameracg/item/CSTimePointUI.ui')
 export default class CSTimePointUI_Generate extends UIScript {
	 	private mImgLine_Internal: mw.Image
	public get mImgLine(): mw.Image {
		if(!this.mImgLine_Internal&&this.uiWidgetBase) {
			this.mImgLine_Internal = this.uiWidgetBase.findChildByPath('Canvas/mImgLine') as mw.Image
		}
		return this.mImgLine_Internal
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
		
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CSTimePointUI'] = CSTimePointUI_Generate;