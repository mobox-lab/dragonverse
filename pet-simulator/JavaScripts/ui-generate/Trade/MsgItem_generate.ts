
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Trade/MsgItem.ui')
export default class MsgItem_Generate extends UIScript {
		private mImage_Back_Internal: mw.Image
	public get mImage_Back(): mw.Image {
		if(!this.mImage_Back_Internal&&this.uiWidgetBase) {
			this.mImage_Back_Internal = this.uiWidgetBase.findChildByPath('Canvas/mImage_Back') as mw.Image
		}
		return this.mImage_Back_Internal
	}
	private mText_Msg_Internal: mw.TextBlock
	public get mText_Msg(): mw.TextBlock {
		if(!this.mText_Msg_Internal&&this.uiWidgetBase) {
			this.mText_Msg_Internal = this.uiWidgetBase.findChildByPath('Canvas/mText_Msg') as mw.TextBlock
		}
		return this.mText_Msg_Internal
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
		
		this.initLanguage(this.mText_Msg)
		
	
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
 