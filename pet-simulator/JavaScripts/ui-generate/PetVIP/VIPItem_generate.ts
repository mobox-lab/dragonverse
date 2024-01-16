
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/PetVIP/VIPItem.ui')
export default class VIPItem_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas')
    public mCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mBtn_Buy')
    public mBtn_Buy: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mTextBlock_Level')
    public mTextBlock_Level: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mTextBlock_StarNeed')
    public mTextBlock_StarNeed: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mTextBlock_Number')
    public mTextBlock_Number: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mTextBlock_Lock')
    public mTextBlock_Lock: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mImage_Star')
    public mImage_Star: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mImage_Icon')
    public mImage_Icon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mImage_Get')
    public mImage_Get: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mImage_Up')
    public mImage_Up: mw.Image=undefined;
    


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
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock_Level)
		
	
		this.initLanguage(this.mTextBlock_StarNeed)
		
	
		this.initLanguage(this.mTextBlock_Number)
		
	
		this.initLanguage(this.mTextBlock_Lock)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock_VIP") as any);
		
	

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
 