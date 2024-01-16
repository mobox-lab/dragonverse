
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Task/TaskShop_Itemmid.ui')
export default class TaskShop_Itemmid_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mPic_Base')
    public mPic_Base: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mPic_Icon')
    public mPic_Icon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mText_Name')
    public mText_Name: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mText_Info')
    public mText_Info: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mText_Price')
    public mText_Price: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mBtn')
    public mBtn: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_undo')
    public mCanvas_undo: mw.Canvas=undefined;
    


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
		
		this.mBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn");
		})
		this.mBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Name)
		
	
		this.initLanguage(this.mText_Info)
		
	
		this.initLanguage(this.mText_Price)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_undo/TextBlock") as any);
		
	

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
 