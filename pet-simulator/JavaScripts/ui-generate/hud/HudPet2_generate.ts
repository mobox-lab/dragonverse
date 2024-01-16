
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/hud/HudPet2.ui')
export default class HudPet2_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas_Pet/mBtn_Pet/mText_Pet')
    public mText_Pet: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Pet/mBtn_Pet')
    public mBtn_Pet: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Pet')
    public mCanvas_Pet: mw.Canvas=undefined;
    


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
		
		this.mBtn_Pet.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Pet");
		})
		this.mBtn_Pet.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Pet)
		
	
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
 