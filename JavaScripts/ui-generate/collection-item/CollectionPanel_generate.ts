
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/collection-item/CollectionPanel.ui
*/



@UIBind('UI/collection-item/CollectionPanel.ui')
export default class CollectionPanel_Generate extends UIScript {
		private btnCollection_Internal: mw.StaleButton
	public get btnCollection(): mw.StaleButton {
		if(!this.btnCollection_Internal&&this.uiWidgetBase) {
			this.btnCollection_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnCollection') as mw.StaleButton
		}
		return this.btnCollection_Internal
	}
	private imgCollectionBG_Internal: mw.Image
	public get imgCollectionBG(): mw.Image {
		if(!this.imgCollectionBG_Internal&&this.uiWidgetBase) {
			this.imgCollectionBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/imgCollectionBG') as mw.Image
		}
		return this.imgCollectionBG_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		
		this.initLanguage(this.btnCollection);
		
	
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
 