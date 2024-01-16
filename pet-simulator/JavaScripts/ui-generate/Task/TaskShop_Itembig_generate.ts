
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Task/TaskShop_Itembig.ui')
export default class TaskShop_Itembig_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mPic_Base')
    public mPic_Base: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_icon')
    public mCanvas_icon: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_icon/mPic_icon')
    public mPic_icon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_boardinfo')
    public mCanvas_boardinfo: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_boardinfo/mText_info')
    public mText_info: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_petinfo')
    public mCanvas_petinfo: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_petinfo/mPic_pet1')
    public mPic_pet1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_petinfo/mPic_pet2')
    public mPic_pet2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_petinfo/mText_rate1')
    public mText_rate1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_petinfo/mText_rate2')
    public mText_rate2: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mText_Price')
    public mText_Price: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mText_Name')
    public mText_Name: mw.TextBlock=undefined;
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
		
		this.initLanguage(this.mText_info)
		
	
		this.initLanguage(this.mText_rate1)
		
	
		this.initLanguage(this.mText_rate2)
		
	
		this.initLanguage(this.mText_Price)
		
	
		this.initLanguage(this.mText_Name)
		
	
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
 