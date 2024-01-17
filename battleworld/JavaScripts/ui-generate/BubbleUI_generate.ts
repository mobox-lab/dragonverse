
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/BubbleUI.ui
 * TIME: 2023.11.15-14.12.48
 */

 

 @UIBind('UI/BubbleUI.ui')
 export default class BubbleUI_Generate extends UIScript {
	 	private dialogBg1_Internal: mw.Image
	public get dialogBg1(): mw.Image {
		if(!this.dialogBg1_Internal&&this.uiWidgetBase) {
			this.dialogBg1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/dialogBg1') as mw.Image
		}
		return this.dialogBg1_Internal
	}
	private dialogBg_Internal: mw.Image
	public get dialogBg(): mw.Image {
		if(!this.dialogBg_Internal&&this.uiWidgetBase) {
			this.dialogBg_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/dialogBg') as mw.Image
		}
		return this.dialogBg_Internal
	}
	private dialogText_Internal: mw.TextBlock
	public get dialogText(): mw.TextBlock {
		if(!this.dialogText_Internal&&this.uiWidgetBase) {
			this.dialogText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/dialogText') as mw.TextBlock
		}
		return this.dialogText_Internal
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
		
		this.initLanguage(this.dialogText)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 