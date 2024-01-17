
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/editor_bullet/Edit_BulletBtn.ui
 * TIME: 2023.11.15-14.12.49
 */

 

 @UIBind('UI/editor_bullet/Edit_BulletBtn.ui')
 export default class Edit_BulletBtn_Generate extends UIScript {
	 	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mSelected_Internal: mw.StaleButton
	public get mSelected(): mw.StaleButton {
		if(!this.mSelected_Internal&&this.uiWidgetBase) {
			this.mSelected_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelected') as mw.StaleButton
		}
		return this.mSelected_Internal
	}
	private mDeleted_Internal: mw.StaleButton
	public get mDeleted(): mw.StaleButton {
		if(!this.mDeleted_Internal&&this.uiWidgetBase) {
			this.mDeleted_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDeleted') as mw.StaleButton
		}
		return this.mDeleted_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mSelected.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSelected");
		})
		this.initLanguage(this.mSelected);
		//this.mSelected.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mDeleted.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mDeleted");
		})
		this.initLanguage(this.mDeleted);
		//this.mDeleted.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mName)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 