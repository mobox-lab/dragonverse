﻿
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Transmit/PointItem.ui')
export default class PointItem_Generate extends UIScript {
		private mBtn_Point_Internal: mw.StaleButton
	public get mBtn_Point(): mw.StaleButton {
		if(!this.mBtn_Point_Internal&&this.uiWidgetBase) {
			this.mBtn_Point_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Point') as mw.StaleButton
		}
		return this.mBtn_Point_Internal
	}
	private mPic_type_Internal: mw.Image
	public get mPic_type(): mw.Image {
		if(!this.mPic_type_Internal&&this.uiWidgetBase) {
			this.mPic_type_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_type') as mw.Image
		}
		return this.mPic_type_Internal
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
		
		this.mBtn_Point.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Point");
		})
		this.initLanguage(this.mBtn_Point);
		this.mBtn_Point.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

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
 