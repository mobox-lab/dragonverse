
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 一只黄鹂鸣翠柳
 * UI: UI/Skill/SkillPanel.ui
 * TIME: 2023.12.27-15.47.46
 */

 

 @UIBind('UI/Skill/SkillPanel.ui')
 export default class SkillPanel_Generate extends UIScript {
	 	private mCollBox_Internal: mw.Canvas
	public get mCollBox(): mw.Canvas {
		if(!this.mCollBox_Internal&&this.uiWidgetBase) {
			this.mCollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCollBox') as mw.Canvas
		}
		return this.mCollBox_Internal
	}
	private mCollapsedBtn_Internal: mw.StaleButton
	public get mCollapsedBtn(): mw.StaleButton {
		if(!this.mCollapsedBtn_Internal&&this.uiWidgetBase) {
			this.mCollapsedBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCollBox/mCollapsedBtn') as mw.StaleButton
		}
		return this.mCollapsedBtn_Internal
	}
	private mSelectList_Internal: mw.Canvas
	public get mSelectList(): mw.Canvas {
		if(!this.mSelectList_Internal&&this.uiWidgetBase) {
			this.mSelectList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectList') as mw.Canvas
		}
		return this.mSelectList_Internal
	}
	private mInfoBtn_Internal: mw.StaleButton
	public get mInfoBtn(): mw.StaleButton {
		if(!this.mInfoBtn_Internal&&this.uiWidgetBase) {
			this.mInfoBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInfoBtn') as mw.StaleButton
		}
		return this.mInfoBtn_Internal
	}
	private mSelectBox_Internal: mw.Canvas
	public get mSelectBox(): mw.Canvas {
		if(!this.mSelectBox_Internal&&this.uiWidgetBase) {
			this.mSelectBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectBox') as mw.Canvas
		}
		return this.mSelectBox_Internal
	}
	private mWaiveBtn_Internal: mw.StaleButton
	public get mWaiveBtn(): mw.StaleButton {
		if(!this.mWaiveBtn_Internal&&this.uiWidgetBase) {
			this.mWaiveBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectBox/mWaiveBtn') as mw.StaleButton
		}
		return this.mWaiveBtn_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mCollapsedBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCollapsedBtn");
		})
		this.initLanguage(this.mCollapsedBtn);
		//this.mCollapsedBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mInfoBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mInfoBtn");
		})
		this.initLanguage(this.mInfoBtn);
		//this.mInfoBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mWaiveBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mWaiveBtn");
		})
		this.initLanguage(this.mWaiveBtn);
		//this.mWaiveBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 