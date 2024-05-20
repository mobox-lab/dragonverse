
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/Social/SocialItem.ui
 */

 

 @UIBind('UI/Social/SocialItem.ui')
 export default class SocialItem_Generate extends UIScript {
	 	private mitemCanvas_Internal: mw.Canvas
	public get mitemCanvas(): mw.Canvas {
		if(!this.mitemCanvas_Internal&&this.uiWidgetBase) {
			this.mitemCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mitemCanvas') as mw.Canvas
		}
		return this.mitemCanvas_Internal
	}
	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mitemCanvas/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mRank_Internal: mw.TextBlock
	public get mRank(): mw.TextBlock {
		if(!this.mRank_Internal&&this.uiWidgetBase) {
			this.mRank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mitemCanvas/mRank') as mw.TextBlock
		}
		return this.mRank_Internal
	}
	private mBtn_team_on_Internal: mw.Button
	public get mBtn_team_on(): mw.Button {
		if(!this.mBtn_team_on_Internal&&this.uiWidgetBase) {
			this.mBtn_team_on_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mitemCanvas/mBtn_team_on') as mw.Button
		}
		return this.mBtn_team_on_Internal
	}
	private mBtn_team_off_Internal: mw.Button
	public get mBtn_team_off(): mw.Button {
		if(!this.mBtn_team_off_Internal&&this.uiWidgetBase) {
			this.mBtn_team_off_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mitemCanvas/mBtn_team_off') as mw.Button
		}
		return this.mBtn_team_off_Internal
	}
	private mBtn_team_Internal: mw.Button
	public get mBtn_team(): mw.Button {
		if(!this.mBtn_team_Internal&&this.uiWidgetBase) {
			this.mBtn_team_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mitemCanvas/mBtn_team') as mw.Button
		}
		return this.mBtn_team_Internal
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
		
		this.mBtn_team_on.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_team_on");
		})
		
		
	
		this.mBtn_team_off.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_team_off");
		})
		
		
	
		this.mBtn_team.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_team");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mName)
		
	
		this.initLanguage(this.mRank)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mitemCanvas/mBtn_team_on/TextBlock_on") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mitemCanvas/mBtn_team_off/TextBlock_off") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mitemCanvas/mBtn_team/TextBlock") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 