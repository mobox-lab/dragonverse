
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/dialogue/DialoguePanel.ui
*/



@UIBind('UI/dialogue/DialoguePanel.ui')
export default class DialoguePanel_Generate extends UIScript {
		private cnvContentNode_Internal: mw.Canvas
	public get cnvContentNode(): mw.Canvas {
		if(!this.cnvContentNode_Internal&&this.uiWidgetBase) {
			this.cnvContentNode_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvContentNode') as mw.Canvas
		}
		return this.cnvContentNode_Internal
	}
	private txtSourceName_Internal: mw.TextBlock
	public get txtSourceName(): mw.TextBlock {
		if(!this.txtSourceName_Internal&&this.uiWidgetBase) {
			this.txtSourceName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvContentNode/txtSourceName') as mw.TextBlock
		}
		return this.txtSourceName_Internal
	}
	private txtContent_Internal: mw.TextBlock
	public get txtContent(): mw.TextBlock {
		if(!this.txtContent_Internal&&this.uiWidgetBase) {
			this.txtContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvContentNode/txtContent') as mw.TextBlock
		}
		return this.txtContent_Internal
	}
	private imgNext_Internal: mw.Image
	public get imgNext(): mw.Image {
		if(!this.imgNext_Internal&&this.uiWidgetBase) {
			this.imgNext_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvContentNode/imgNext') as mw.Image
		}
		return this.imgNext_Internal
	}
	private btnDialogueContent_Internal: mw.Button
	public get btnDialogueContent(): mw.Button {
		if(!this.btnDialogueContent_Internal&&this.uiWidgetBase) {
			this.btnDialogueContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvContentNode/btnDialogueContent') as mw.Button
		}
		return this.btnDialogueContent_Internal
	}
	private cnvOptions_Internal: mw.Canvas
	public get cnvOptions(): mw.Canvas {
		if(!this.cnvOptions_Internal&&this.uiWidgetBase) {
			this.cnvOptions_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvOptions') as mw.Canvas
		}
		return this.cnvOptions_Internal
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
		
		this.initLanguage(this.txtSourceName)
		
	
		this.initLanguage(this.txtContent)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 