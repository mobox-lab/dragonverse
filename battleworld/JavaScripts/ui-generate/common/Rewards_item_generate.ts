
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/common/Rewards_item.ui
 * TIME: 2023.11.15-14.12.49
 */

 

 @UIBind('UI/common/Rewards_item.ui')
 export default class Rewards_item_Generate extends UIScript {
	 	private mPic_base_Internal: mw.Image
	public get mPic_base(): mw.Image {
		if(!this.mPic_base_Internal&&this.uiWidgetBase) {
			this.mPic_base_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_base') as mw.Image
		}
		return this.mPic_base_Internal
	}
	private mPic_icon_Internal: mw.Image
	public get mPic_icon(): mw.Image {
		if(!this.mPic_icon_Internal&&this.uiWidgetBase) {
			this.mPic_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_icon') as mw.Image
		}
		return this.mPic_icon_Internal
	}
	private mText_much_Internal: mw.TextBlock
	public get mText_much(): mw.TextBlock {
		if(!this.mText_much_Internal&&this.uiWidgetBase) {
			this.mText_much_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_much') as mw.TextBlock
		}
		return this.mText_much_Internal
	}
	private mText_Name_Internal: mw.TextBlock
	public get mText_Name(): mw.TextBlock {
		if(!this.mText_Name_Internal&&this.uiWidgetBase) {
			this.mText_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Name') as mw.TextBlock
		}
		return this.mText_Name_Internal
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
		
		this.initLanguage(this.mText_much)
		
	
		this.initLanguage(this.mText_Name)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 