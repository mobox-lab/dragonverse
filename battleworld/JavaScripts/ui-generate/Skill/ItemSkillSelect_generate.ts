
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/Skill/ItemSkillSelect.ui
 * TIME: 2023.11.15-14.12.50
 */

 

 @UIBind('UI/Skill/ItemSkillSelect.ui')
 export default class ItemSkillSelect_Generate extends UIScript {
	 	private mSkillName_Internal: mw.TextBlock
	public get mSkillName(): mw.TextBlock {
		if(!this.mSkillName_Internal&&this.uiWidgetBase) {
			this.mSkillName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkillName') as mw.TextBlock
		}
		return this.mSkillName_Internal
	}
	private mSkillDesc_Internal: mw.TextBlock
	public get mSkillDesc(): mw.TextBlock {
		if(!this.mSkillDesc_Internal&&this.uiWidgetBase) {
			this.mSkillDesc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkillDesc') as mw.TextBlock
		}
		return this.mSkillDesc_Internal
	}
	private mSelectBtn_Internal: mw.StaleButton
	public get mSelectBtn(): mw.StaleButton {
		if(!this.mSelectBtn_Internal&&this.uiWidgetBase) {
			this.mSelectBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectBtn') as mw.StaleButton
		}
		return this.mSelectBtn_Internal
	}
	private mHasBtn_Internal: mw.StaleButton
	public get mHasBtn(): mw.StaleButton {
		if(!this.mHasBtn_Internal&&this.uiWidgetBase) {
			this.mHasBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mHasBtn') as mw.StaleButton
		}
		return this.mHasBtn_Internal
	}
	private mReplaceBtn_Internal: mw.StaleButton
	public get mReplaceBtn(): mw.StaleButton {
		if(!this.mReplaceBtn_Internal&&this.uiWidgetBase) {
			this.mReplaceBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mReplaceBtn') as mw.StaleButton
		}
		return this.mReplaceBtn_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mSelectBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSelectBtn");
		})
		this.initLanguage(this.mSelectBtn);
		//this.mSelectBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mHasBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mHasBtn");
		})
		this.initLanguage(this.mHasBtn);
		//this.mHasBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mReplaceBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mReplaceBtn");
		})
		this.initLanguage(this.mReplaceBtn);
		//this.mReplaceBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mSkillName)
		
	
		this.initLanguage(this.mSkillDesc)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 