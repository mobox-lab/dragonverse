
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/editor_motion/ItemMotionGroup.ui
 * TIME: 2023.11.15-14.12.49
 */

 

 @UIBind('UI/editor_motion/ItemMotionGroup.ui')
 export default class ItemMotionGroup_Generate extends UIScript {
	 	private mBtn_Internal: mw.Button
	public get mBtn(): mw.Button {
		if(!this.mBtn_Internal&&this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn') as mw.Button
		}
		return this.mBtn_Internal
	}
	private mText_Internal: mw.TextBlock
	public get mText(): mw.TextBlock {
		if(!this.mText_Internal&&this.uiWidgetBase) {
			this.mText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText') as mw.TextBlock
		}
		return this.mText_Internal
	}
	private mDelBtn_Internal: mw.Button
	public get mDelBtn(): mw.Button {
		if(!this.mDelBtn_Internal&&this.uiWidgetBase) {
			this.mDelBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDelBtn') as mw.Button
		}
		return this.mDelBtn_Internal
	}
	private mSelect_Internal: mw.Image
	public get mSelect(): mw.Image {
		if(!this.mSelect_Internal&&this.uiWidgetBase) {
			this.mSelect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelect') as mw.Image
		}
		return this.mSelect_Internal
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
		
		this.mBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn");
		})
		
		
	
		this.mDelBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mDelBtn");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 