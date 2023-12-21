
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/collectible-item/CollectiblePanel.ui
*/



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


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		
		this.initLanguage(this.btnCollect);
		
	
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
 