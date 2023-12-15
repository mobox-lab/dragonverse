
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/dialogue/NPCBigItem.ui
*/



@UIBind('UI/dialogue/NPCBigItem.ui')
export default class NPCBigItem_Generate extends UIScript {
		private image_2_Internal: mw.Image
	public get image_2(): mw.Image {
		if(!this.image_2_Internal&&this.uiWidgetBase) {
			this.image_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/image_2') as mw.Image
		}
		return this.image_2_Internal
	}
	private img_Thumbnail_Internal: mw.Image
	public get img_Thumbnail(): mw.Image {
		if(!this.img_Thumbnail_Internal&&this.uiWidgetBase) {
			this.img_Thumbnail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_Thumbnail') as mw.Image
		}
		return this.img_Thumbnail_Internal
	}
	private text_Name_Internal: mw.TextBlock
	public get text_Name(): mw.TextBlock {
		if(!this.text_Name_Internal&&this.uiWidgetBase) {
			this.text_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_Name') as mw.TextBlock
		}
		return this.text_Name_Internal
	}
	private button_Internal: mw.Button
	public get button(): mw.Button {
		if(!this.button_Internal&&this.uiWidgetBase) {
			this.button_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/button') as mw.Button
		}
		return this.button_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 