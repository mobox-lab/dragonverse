
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Trade/TradeReady.ui')
export default class TradeReady_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas')
    public mCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mImage_Rbox')
    public mImage_Rbox: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mImage_Lbox')
    public mImage_Lbox: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mMyScrollBox')
    public mMyScrollBox: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mMyScrollBox/mCanvas_SelectPet')
    public mCanvas_SelectPet: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mText_already')
    public mText_already: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/Canvas/mImage_DMbox')
    public mImage_DMbox: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/Canvas/mInput_Diamond')
    public mInput_Diamond: mw.InputBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mText_Information')
    public mText_Information: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mOtherScrollBox')
    public mOtherScrollBox: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mOtherScrollBox/mCanvas_ReceivePet')
    public mCanvas_ReceivePet: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mText_Otherready')
    public mText_Otherready: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/Canvas_2/mText_ReceiveDM')
    public mText_ReceiveDM: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mText_UserName')
    public mText_UserName: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mBtn_Cancel')
    public mBtn_Cancel: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mBtn_Ready')
    public mBtn_Ready: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mText_Count')
    public mText_Count: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mText_CountDown')
    public mText_CountDown: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mText_MyName')
    public mText_MyName: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mMSgCanvas')
    public mMSgCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mMSgCanvas/mImage_LJT')
    public mImage_LJT: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mMSgCanvas/mImage_RJT')
    public mImage_RJT: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mBtn_Chat')
    public mBtn_Chat: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mImage_Red')
    public mImage_Red: mw.Image=undefined;
    


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
		
		this.mBtn_Cancel.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Cancel");
		})
		this.initLanguage(this.mBtn_Cancel);
		this.mBtn_Cancel.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Ready.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Ready");
		})
		this.initLanguage(this.mBtn_Ready);
		this.mBtn_Ready.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mBtn_Chat.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Chat");
		})
		this.mBtn_Chat.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_already)
		
	
		this.initLanguage(this.mText_Information)
		
	
		this.initLanguage(this.mText_Otherready)
		
	
		this.initLanguage(this.mText_ReceiveDM)
		
	
		this.initLanguage(this.mText_UserName)
		
	
		this.initLanguage(this.mText_Count)
		
	
		this.initLanguage(this.mText_CountDown)
		
	
		this.initLanguage(this.mText_MyName)
		
	
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
 