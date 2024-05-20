
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/action/ActionItem.ui
 */

 

 @UIBind('UI/action/ActionItem.ui')
 export default class ActionItem_Generate extends UIScript {
	 	private mBg_Internal: mw.Image
	public get mBg(): mw.Image {
		if(!this.mBg_Internal&&this.uiWidgetBase) {
			this.mBg_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBg') as mw.Image
		}
		return this.mBg_Internal
	}
	private mIcon_Internal: mw.Image
	public get mIcon(): mw.Image {
		if(!this.mIcon_Internal&&this.uiWidgetBase) {
			this.mIcon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mIcon') as mw.Image
		}
		return this.mIcon_Internal
	}
	private mNametxt_Internal: mw.TextBlock
	public get mNametxt(): mw.TextBlock {
		if(!this.mNametxt_Internal&&this.uiWidgetBase) {
			this.mNametxt_Internal = this.uiWidgetBase.findChildByPath('Canvas/mNametxt') as mw.TextBlock
		}
		return this.mNametxt_Internal
	}
	private mBtn_Internal: mw.StaleButton
	public get mBtn(): mw.StaleButton {
		if(!this.mBtn_Internal&&this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn') as mw.StaleButton
		}
		return this.mBtn_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn");
		})
		this.initLanguage(this.mBtn);
		//this.mBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mNametxt)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 