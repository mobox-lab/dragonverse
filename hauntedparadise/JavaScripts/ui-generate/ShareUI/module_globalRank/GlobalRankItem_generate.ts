
 

 @UIBind('UI/ShareUI/module_globalRank/GlobalRankItem.ui')
 export default class GlobalRankItem_Generate extends UIScript {
	 	private text_num_Internal: mw.TextBlock
	public get text_num(): mw.TextBlock {
		if(!this.text_num_Internal&&this.uiWidgetBase) {
			this.text_num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_num') as mw.TextBlock
		}
		return this.text_num_Internal
	}
	private mTxt_name_Internal: mw.TextBlock
	public get mTxt_name(): mw.TextBlock {
		if(!this.mTxt_name_Internal&&this.uiWidgetBase) {
			this.mTxt_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTxt_name') as mw.TextBlock
		}
		return this.mTxt_name_Internal
	}
	private mTxt_time_Internal: mw.TextBlock
	public get mTxt_time(): mw.TextBlock {
		if(!this.mTxt_time_Internal&&this.uiWidgetBase) {
			this.mTxt_time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTxt_time') as mw.TextBlock
		}
		return this.mTxt_time_Internal
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
		
		this.initLanguage(this.text_num)
		
	
		this.initLanguage(this.mTxt_name)
		
	
		this.initLanguage(this.mTxt_time)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_GlobalRankItem'] = GlobalRankItem_Generate;