﻿
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/WorldUI/collect.ui')
export default class collect_Generate extends UIScript {
		private undefImage_Internal: mw.Image
	public get undefImage(): mw.Image {
		if(!this.undefImage_Internal&&this.uiWidgetBase) {
			this.undefImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/undefImage') as mw.Image
		}
		return this.undefImage_Internal
	}
	private curPetText_Internal: mw.TextBlock
	public get curPetText(): mw.TextBlock {
		if(!this.curPetText_Internal&&this.uiWidgetBase) {
			this.curPetText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/curPetText') as mw.TextBlock
		}
		return this.curPetText_Internal
	}
	private curPercentText_Internal: mw.TextBlock
	public get curPercentText(): mw.TextBlock {
		if(!this.curPercentText_Internal&&this.uiWidgetBase) {
			this.curPercentText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/curPercentText') as mw.TextBlock
		}
		return this.curPercentText_Internal
	}



	public showAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
	public hideAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
 
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
		
		this.initLanguage(this.curPetText)
		
	
		this.initLanguage(this.curPercentText)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

    public show(...param): void {
		Event.dispatchToLocal("ShowUIAction_37", this);
		this.showAction.call(this);
		mw.UIService.showUI(this, this.layer, ...param);
	}

    public hide(): void {
		Event.dispatchToLocal("HideUIAction_37", this);
		this.hideAction.call(this);
		mw.UIService.hideUI(this);
	}
}
 