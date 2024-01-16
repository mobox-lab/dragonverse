
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Trade/UserItem.ui')
export default class UserItem_Generate extends UIScript {
		private mbtn_Trade_Internal: mw.Button
	public get mbtn_Trade(): mw.Button {
		if(!this.mbtn_Trade_Internal&&this.uiWidgetBase) {
			this.mbtn_Trade_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mbtn_Trade') as mw.Button
		}
		return this.mbtn_Trade_Internal
	}
	private mtext_State_Internal: mw.TextBlock
	public get mtext_State(): mw.TextBlock {
		if(!this.mtext_State_Internal&&this.uiWidgetBase) {
			this.mtext_State_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mtext_State') as mw.TextBlock
		}
		return this.mtext_State_Internal
	}
	private mtext_Username_Internal: mw.TextBlock
	public get mtext_Username(): mw.TextBlock {
		if(!this.mtext_Username_Internal&&this.uiWidgetBase) {
			this.mtext_Username_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mtext_Username') as mw.TextBlock
		}
		return this.mtext_Username_Internal
	}
	private mImage_Go_Internal: mw.Image
	public get mImage_Go(): mw.Image {
		if(!this.mImage_Go_Internal&&this.uiWidgetBase) {
			this.mImage_Go_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mImage_Go') as mw.Image
		}
		return this.mImage_Go_Internal
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
		
		this.mbtn_Trade.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mbtn_Trade");
		})
		this.mbtn_Trade.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mtext_State)
		
	
		this.initLanguage(this.mtext_Username)
		
	
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
 