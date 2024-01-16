
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/PetVIP/VIPmain.ui')
export default class VIPmain_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas')
    public mCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mScrollBox')
    public mScrollBox: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mScrollBox/mCanvas_1')
    public mCanvas_1: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mStar_Text')
    public mStar_Text: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mBtn_Buy')
    public mBtn_Buy: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mBtn_Unlock')
    public mBtn_Unlock: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mBtn_Close')
    public mBtn_Close: mw.Button=undefined;
    


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
		
		this.mBtn_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Buy");
		})
		this.mBtn_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Unlock.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Unlock");
		})
		this.mBtn_Unlock.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mStar_Text)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mBtn_Buy/TextBlock_3") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mBtn_Unlock/TextBlock_4") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock_1") as any);
		
	

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
 