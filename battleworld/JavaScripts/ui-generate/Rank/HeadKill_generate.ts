
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/Rank/HeadKill.ui
 */

 

 @UIBind('UI/Rank/HeadKill.ui')
 export default class HeadKill_Generate extends UIScript {
	 	private mHeadKill_Internal: mw.TextBlock
	public get mHeadKill(): mw.TextBlock {
		if(!this.mHeadKill_Internal&&this.uiWidgetBase) {
			this.mHeadKill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mHeadKill') as mw.TextBlock
		}
		return this.mHeadKill_Internal
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
		
		this.initLanguage(this.mHeadKill)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 