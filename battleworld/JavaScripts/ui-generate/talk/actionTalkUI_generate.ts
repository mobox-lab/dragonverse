
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/talk/actionTalkUI.ui
 */

 

 @UIBind('UI/talk/actionTalkUI.ui')
 export default class actionTalkUI_Generate extends UIScript {
	 	private btnInteractive_Internal: mw.StaleButton
	public get btnInteractive(): mw.StaleButton {
		if(!this.btnInteractive_Internal&&this.uiWidgetBase) {
			this.btnInteractive_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/btnInteractive') as mw.StaleButton
		}
		return this.btnInteractive_Internal
	}
	private imgHoverround_Internal: mw.Image
	public get imgHoverround(): mw.Image {
		if(!this.imgHoverround_Internal&&this.uiWidgetBase) {
			this.imgHoverround_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/imgHoverround') as mw.Image
		}
		return this.imgHoverround_Internal
	}
	private imgIcon_Internal: mw.Image
	public get imgIcon(): mw.Image {
		if(!this.imgIcon_Internal&&this.uiWidgetBase) {
			this.imgIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/imgHoverround/imgIcon') as mw.Image
		}
		return this.imgIcon_Internal
	}
	private textTalk_Internal: mw.TextBlock
	public get textTalk(): mw.TextBlock {
		if(!this.textTalk_Internal&&this.uiWidgetBase) {
			this.textTalk_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/imgHoverround/textTalk') as mw.TextBlock
		}
		return this.textTalk_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btnInteractive.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btnInteractive");
		})
		this.initLanguage(this.btnInteractive);
		//this.btnInteractive.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.textTalk)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 