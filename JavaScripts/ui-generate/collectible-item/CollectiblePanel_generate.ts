/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * UI: UI/collectible-item/CollectiblePanel.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/collectible-item/CollectiblePanel.ui')
export default class CollectiblePanel_Generate extends UIScript {
	private imgCollectionBg_Internal: mw.Image
	public get imgCollectionBg(): mw.Image {
		if(!this.imgCollectionBg_Internal&&this.uiWidgetBase) {
			this.imgCollectionBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/imgCollectionBg') as mw.Image
		}
		return this.imgCollectionBg_Internal
	}
	private btnCollect_Internal: mw.StaleButton
	public get btnCollect(): mw.StaleButton {
		if(!this.btnCollect_Internal&&this.uiWidgetBase) {
			this.btnCollect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnCollect') as mw.StaleButton
		}
		return this.btnCollect_Internal
	}



	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		this.initTextLan();
	}

    public initTextLan() {
        
        this.initLanguage(this.btnCollect);
        
	
        //按钮多语言
        
        //文本多语言
        
        //文本多语言
        
    }

    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let lanFunc = mw.UIScript.getBehavior("lan");
        lanFunc && lanFunc(ui);
    }
}
 