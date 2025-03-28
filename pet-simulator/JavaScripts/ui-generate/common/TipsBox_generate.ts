﻿
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/common/TipsBox.ui')
export default class TipsBox_Generate extends UIScript {
		private mBtn_OK_Internal: mw.StaleButton
	public get mBtn_OK(): mw.StaleButton {
		if(!this.mBtn_OK_Internal&&this.uiWidgetBase) {
			this.mBtn_OK_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_OK') as mw.StaleButton
		}
		return this.mBtn_OK_Internal
	}
	private mText_message_Internal: mw.TextBlock
	public get mText_message(): mw.TextBlock {
		if(!this.mText_message_Internal&&this.uiWidgetBase) {
			this.mText_message_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_message') as mw.TextBlock
		}
		return this.mText_message_Internal
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
		
		this.mBtn_OK.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_OK");
		})
		this.initLanguage(this.mBtn_OK);
		this.mBtn_OK.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_message)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock") as any);
		
	

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
 