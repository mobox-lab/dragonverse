
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Trade/UserItem.ui')
export default class UserItem_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/Canvas/mbtn_Trade')
    public mbtn_Trade: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mtext_State')
    public mtext_State: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mtext_Username')
    public mtext_Username: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mImage_Go')
    public mImage_Go: mw.Image=undefined;
    


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
 