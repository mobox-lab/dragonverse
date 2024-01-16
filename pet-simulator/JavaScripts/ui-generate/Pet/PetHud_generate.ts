
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Pet/PetHud.ui')
export default class PetHud_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas')
    public mCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_pet')
    public mCanvas_pet: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_pet/mPic_petchoose')
    public mPic_petchoose: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_pet/mBtn_pet')
    public mBtn_pet: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_collect')
    public mCanvas_collect: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_collect/mPic_collectchoose')
    public mPic_collectchoose: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_collect/mBtn_collect')
    public mBtn_collect: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_Trade')
    public mCanvas_Trade: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_Trade/mPic_TradeIcon')
    public mPic_TradeIcon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_Trade/mBtn_Trade')
    public mBtn_Trade: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_achve')
    public mCanvas_achve: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_achve/mPic_achve')
    public mPic_achve: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_achve/mBtn_achve')
    public mBtn_achve: mw.Button=undefined;
    


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
		
		this.mBtn_pet.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_pet");
		})
		this.mBtn_pet.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_collect.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_collect");
		})
		this.mBtn_collect.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Trade.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Trade");
		})
		this.mBtn_Trade.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_achve.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_achve");
		})
		this.mBtn_achve.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

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
 