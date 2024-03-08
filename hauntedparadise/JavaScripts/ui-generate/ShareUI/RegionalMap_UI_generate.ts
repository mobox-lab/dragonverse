
 

 @UIBind('UI/ShareUI/RegionalMap_UI.ui')
 export default class RegionalMap_UI_Generate extends UIScript {
	 	private text_map_Internal: mw.TextBlock
	public get text_map(): mw.TextBlock {
		if(!this.text_map_Internal&&this.uiWidgetBase) {
			this.text_map_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_map') as mw.TextBlock
		}
		return this.text_map_Internal
	}
	private text_maptips_Internal: mw.TextBlock
	public get text_maptips(): mw.TextBlock {
		if(!this.text_maptips_Internal&&this.uiWidgetBase) {
			this.text_maptips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_maptips') as mw.TextBlock
		}
		return this.text_maptips_Internal
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
		
	
		this.initLanguage(this.text_maptips)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_RegionalMap_UI'] = RegionalMap_UI_Generate;