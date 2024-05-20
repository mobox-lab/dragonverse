
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/Social/SocialTeam.ui
 */

 

 @UIBind('UI/Social/SocialTeam.ui')
 export default class SocialTeam_Generate extends UIScript {
	 	private tipsCanvas_Internal: mw.Canvas
	public get tipsCanvas(): mw.Canvas {
		if(!this.tipsCanvas_Internal&&this.uiWidgetBase) {
			this.tipsCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/tipsCanvas') as mw.Canvas
		}
		return this.tipsCanvas_Internal
	}
	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/tipsCanvas/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mBtn_yes_Internal: mw.Button
	public get mBtn_yes(): mw.Button {
		if(!this.mBtn_yes_Internal&&this.uiWidgetBase) {
			this.mBtn_yes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/tipsCanvas/mBtn_yes') as mw.Button
		}
		return this.mBtn_yes_Internal
	}
	private mBtn_no_Internal: mw.Button
	public get mBtn_no(): mw.Button {
		if(!this.mBtn_no_Internal&&this.uiWidgetBase) {
			this.mBtn_no_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/tipsCanvas/mBtn_no') as mw.Button
		}
		return this.mBtn_no_Internal
	}
	private mText_no_Internal: mw.TextBlock
	public get mText_no(): mw.TextBlock {
		if(!this.mText_no_Internal&&this.uiWidgetBase) {
			this.mText_no_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/tipsCanvas/mBtn_no/mText_no') as mw.TextBlock
		}
		return this.mText_no_Internal
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
		
		this.mBtn_yes.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_yes");
		})
		
		
	
		this.mBtn_no.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_no");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mName)
		
	
		this.initLanguage(this.mText_no)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/tipsCanvas/mBtn_yes/TextBlock_1") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 