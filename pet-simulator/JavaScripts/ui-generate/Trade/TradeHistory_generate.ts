
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Trade/TradeHistory.ui')
export default class TradeHistory_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/Canvas/ScrollBox/mCanvas_SelectPet')
    public mCanvas_SelectPet: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/Canvas/ScrollBox_1/mCanvas_ReceivePet')
    public mCanvas_ReceivePet: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mText_ReceiveDM')
    public mText_ReceiveDM: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mText_DMnum')
    public mText_DMnum: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mBtn_Back')
    public mBtn_Back: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/Canvas/yourtext')
    public yourtext: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mText_UserName')
    public mText_UserName: mw.TextBlock=undefined;
    


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
		
		this.mBtn_Back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Back");
		})
		this.initLanguage(this.mBtn_Back);
		this.mBtn_Back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_ReceiveDM)
		
	
		this.initLanguage(this.mText_DMnum)
		
	
		this.initLanguage(this.yourtext)
		
	
		this.initLanguage(this.mText_UserName)
		
	
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
 