
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/bubbleModule/BubbleUI.ui
*/



@UIBind('UI/bubbleModule/BubbleUI.ui')
export default class BubbleUI_Generate extends UIScript {
		private border_Internal: mw.Image
	public get border(): mw.Image {
		if(!this.border_Internal&&this.uiWidgetBase) {
			this.border_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/border') as mw.Image
		}
		return this.border_Internal
	}
	private array_Internal: mw.Image
	public get array(): mw.Image {
		if(!this.array_Internal&&this.uiWidgetBase) {
			this.array_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/array') as mw.Image
		}
		return this.array_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/bg') as mw.Image
		}
		return this.bg_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		
		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 