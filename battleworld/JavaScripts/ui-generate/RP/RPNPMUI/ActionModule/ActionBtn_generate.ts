
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/RP/RPNPMUI/ActionModule/ActionBtn.ui
 */

 

 @UIBind('UI/RP/RPNPMUI/ActionModule/ActionBtn.ui')
 export default class ActionBtn_Generate extends UIScript {
	 	private nameText_Internal: mw.TextBlock
	public get nameText(): mw.TextBlock {
		if(!this.nameText_Internal&&this.uiWidgetBase) {
			this.nameText_Internal = this.uiWidgetBase.findChildByPath('Canvas/nameText') as mw.TextBlock
		}
		return this.nameText_Internal
	}
	private descText_Internal: mw.TextBlock
	public get descText(): mw.TextBlock {
		if(!this.descText_Internal&&this.uiWidgetBase) {
			this.descText_Internal = this.uiWidgetBase.findChildByPath('Canvas/descText') as mw.TextBlock
		}
		return this.descText_Internal
	}
	private yesBtn_Internal: mw.StaleButton
	public get yesBtn(): mw.StaleButton {
		if(!this.yesBtn_Internal&&this.uiWidgetBase) {
			this.yesBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/yesBtn') as mw.StaleButton
		}
		return this.yesBtn_Internal
	}
	private noBtn_Internal: mw.StaleButton
	public get noBtn(): mw.StaleButton {
		if(!this.noBtn_Internal&&this.uiWidgetBase) {
			this.noBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/noBtn') as mw.StaleButton
		}
		return this.noBtn_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.yesBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "yesBtn");
		})
		this.initLanguage(this.yesBtn);
		//this.yesBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.noBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "noBtn");
		})
		this.initLanguage(this.noBtn);
		//this.noBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.nameText)
		
	
		this.initLanguage(this.descText)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 