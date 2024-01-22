
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Trade/MsgPanel.ui')
export default class MsgPanel_Generate extends UIScript {
		private mCanvas_Msg_Internal: mw.Canvas
	public get mCanvas_Msg(): mw.Canvas {
		if(!this.mCanvas_Msg_Internal&&this.uiWidgetBase) {
			this.mCanvas_Msg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Msg') as mw.Canvas
		}
		return this.mCanvas_Msg_Internal
	}
	private mList_Msg_Internal: mw.Canvas
	public get mList_Msg(): mw.Canvas {
		if(!this.mList_Msg_Internal&&this.uiWidgetBase) {
			this.mList_Msg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Msg/mList_Msg') as mw.Canvas
		}
		return this.mList_Msg_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Msg/mList_Msg/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mInputBox_Msg_Internal: mw.InputBox
	public get mInputBox_Msg(): mw.InputBox {
		if(!this.mInputBox_Msg_Internal&&this.uiWidgetBase) {
			this.mInputBox_Msg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Msg/mInputBox_Msg') as mw.InputBox
		}
		return this.mInputBox_Msg_Internal
	}
	private mBtn_Send_Internal: mw.StaleButton
	public get mBtn_Send(): mw.StaleButton {
		if(!this.mBtn_Send_Internal&&this.uiWidgetBase) {
			this.mBtn_Send_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Msg/mBtn_Send') as mw.StaleButton
		}
		return this.mBtn_Send_Internal
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
		
		this.mBtn_Send.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Send");
		})
		this.initLanguage(this.mBtn_Send);
		this.mBtn_Send.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
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
 