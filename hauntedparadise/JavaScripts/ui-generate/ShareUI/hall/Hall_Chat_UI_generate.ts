
 

 @UIBind('UI/ShareUI/hall/Hall_Chat_UI.ui')
 export default class Hall_Chat_UI_Generate extends UIScript {
	 	private mImg_DialogBox_Internal: mw.Image
	public get mImg_DialogBox(): mw.Image {
		if(!this.mImg_DialogBox_Internal&&this.uiWidgetBase) {
			this.mImg_DialogBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_DialogBox') as mw.Image
		}
		return this.mImg_DialogBox_Internal
	}
	private mText_Content_Internal: mw.TextBlock
	public get mText_Content(): mw.TextBlock {
		if(!this.mText_Content_Internal&&this.uiWidgetBase) {
			this.mText_Content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Content') as mw.TextBlock
		}
		return this.mText_Content_Internal
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
		
		this.initLanguage(this.mText_Content)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Hall_Chat_UI'] = Hall_Chat_UI_Generate;