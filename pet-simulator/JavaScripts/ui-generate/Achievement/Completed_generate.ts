﻿
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Achievement/Completed.ui')
export default class Completed_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mText_AMname_Internal: mw.TextBlock
	public get mText_AMname(): mw.TextBlock {
		if(!this.mText_AMname_Internal&&this.uiWidgetBase) {
			this.mText_AMname_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_AMname') as mw.TextBlock
		}
		return this.mText_AMname_Internal
	}
	private mProgressBar_Internal: mw.ProgressBar
	public get mProgressBar(): mw.ProgressBar {
		if(!this.mProgressBar_Internal&&this.uiWidgetBase) {
			this.mProgressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mProgressBar') as mw.ProgressBar
		}
		return this.mProgressBar_Internal
	}
	private mText_Target_Internal: mw.TextBlock
	public get mText_Target(): mw.TextBlock {
		if(!this.mText_Target_Internal&&this.uiWidgetBase) {
			this.mText_Target_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Target') as mw.TextBlock
		}
		return this.mText_Target_Internal
	}
	private mText_Finish_Internal: mw.TextBlock
	public get mText_Finish(): mw.TextBlock {
		if(!this.mText_Finish_Internal&&this.uiWidgetBase) {
			this.mText_Finish_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Finish') as mw.TextBlock
		}
		return this.mText_Finish_Internal
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
		
		this.initLanguage(this.mText_AMname)
		
	
		this.initLanguage(this.mText_Target)
		
	
		this.initLanguage(this.mText_Finish)
		
	
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
 