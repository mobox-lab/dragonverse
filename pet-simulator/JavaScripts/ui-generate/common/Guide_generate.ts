
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/common/Guide.ui')
export default class Guide_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/Canvas/mBtn_cat')
    public mBtn_cat: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mBtn_dog')
    public mBtn_dog: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mPic_check')
    public mPic_check: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mPic_check2')
    public mPic_check2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mBtn_OK')
    public mBtn_OK: mw.StaleButton=undefined;
    


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
		
		this.mBtn_OK.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_OK");
		})
		this.initLanguage(this.mBtn_OK);
		this.mBtn_OK.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mBtn_cat.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_cat");
		})
		this.mBtn_cat.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_dog.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_dog");
		})
		this.mBtn_dog.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock") as any);
		
	

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
 