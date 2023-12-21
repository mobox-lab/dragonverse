
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/prompt/PromotItem.ui
*/



@UIBind('UI/prompt/PromotItem.ui')
export default class PromotItem_Generate extends UIScript {
		private tips_Internal: mw.Canvas
	public get tips(): mw.Canvas {
		if(!this.tips_Internal&&this.uiWidgetBase) {
			this.tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/tips') as mw.Canvas
		}
		return this.tips_Internal
	}
	private keyText_Internal: mw.TextBlock
	public get keyText(): mw.TextBlock {
		if(!this.keyText_Internal&&this.uiWidgetBase) {
			this.keyText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/tips/keyText') as mw.TextBlock
		}
		return this.keyText_Internal
	}
	private item_Internal: mw.Canvas
	public get item(): mw.Canvas {
		if(!this.item_Internal&&this.uiWidgetBase) {
			this.item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/item') as mw.Canvas
		}
		return this.item_Internal
	}
	private selected_Internal: mw.Button
	public get selected(): mw.Button {
		if(!this.selected_Internal&&this.uiWidgetBase) {
			this.selected_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/item/selected') as mw.Button
		}
		return this.selected_Internal
	}
	private option_Internal: mw.TextBlock
	public get option(): mw.TextBlock {
		if(!this.option_Internal&&this.uiWidgetBase) {
			this.option_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/item/Canvas_1/option') as mw.TextBlock
		}
		return this.option_Internal
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
		
		this.initLanguage(this.keyText)
		
	
		this.initLanguage(this.option)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 