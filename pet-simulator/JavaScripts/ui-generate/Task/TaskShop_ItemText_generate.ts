﻿
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Task/TaskShop_ItemText.ui')
export default class TaskShop_ItemText_Generate extends UIScript {
		private mText_title_Internal: mw.TextBlock
	public get mText_title(): mw.TextBlock {
		if(!this.mText_title_Internal&&this.uiWidgetBase) {
			this.mText_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_title') as mw.TextBlock
		}
		return this.mText_title_Internal
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
		
		this.initLanguage(this.mText_title)
		
	
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
 