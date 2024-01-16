
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Task/TaskShop.ui')
export default class TaskShop_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas')
    public mCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mScrollBox')
    public mScrollBox: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mScrollBox/mCanvas_List')
    public mCanvas_List: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mText_Point')
    public mText_Point: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mBtn_close')
    public mBtn_close: mw.Button=undefined;
    


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
		
		this.mBtn_close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_close");
		})
		this.mBtn_close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Point)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock") as any);
		
	

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
 