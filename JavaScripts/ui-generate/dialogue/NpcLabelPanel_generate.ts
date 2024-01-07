/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * UI: UI/dialogue/NpcLabelPanel.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/dialogue/NpcLabelPanel.ui')
export default class NpcLabelPanel_Generate extends UIScript {
	private imgFuncIcon_Internal: mw.Image
	public get imgFuncIcon(): mw.Image {
		if(!this.imgFuncIcon_Internal&&this.uiWidgetBase) {
			this.imgFuncIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/imgFuncIcon') as mw.Image
		}
		return this.imgFuncIcon_Internal
	}
	private txtName_Internal: mw.TextBlock
	public get txtName(): mw.TextBlock {
		if(!this.txtName_Internal&&this.uiWidgetBase) {
			this.txtName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txtName') as mw.TextBlock
		}
		return this.txtName_Internal
	}
	private txtIdentity_Internal: mw.TextBlock
	public get txtIdentity(): mw.TextBlock {
		if(!this.txtIdentity_Internal&&this.uiWidgetBase) {
			this.txtIdentity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txtIdentity') as mw.TextBlock
		}
		return this.txtIdentity_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		this.initTextLan();
	}

    protected initTextLan() {
        
        //按钮多语言
        
        //文本多语言
        
        this.initLanguage(this.txtName)
        
	
        this.initLanguage(this.txtIdentity)
        
	
        //文本多语言
        
    }

    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let lanFunc = mw.UIScript.getBehavior("lan");
        lanFunc && lanFunc(ui);
    }
}
 