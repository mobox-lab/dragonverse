
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Task/Task3D.ui')
export default class Task3D_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas_task')
    public mCanvas_task: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_task/mCanvas_TaskItem1')
    public mCanvas_TaskItem1: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_task/mCanvas_TaskItem1/mPic_startandstatus1')
    public mPic_startandstatus1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_task/mCanvas_TaskItem1/mText_mission1')
    public mText_mission1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_task/mCanvas_TaskItem2')
    public mCanvas_TaskItem2: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_task/mCanvas_TaskItem2/mPic_startandstatus2')
    public mPic_startandstatus2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_task/mCanvas_TaskItem2/mText_mission2')
    public mText_mission2: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_task/mCanvas_TaskItem3')
    public mCanvas_TaskItem3: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_task/mCanvas_TaskItem3/mPic_startandstatus3')
    public mPic_startandstatus3: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_task/mCanvas_TaskItem3/mText_mission3')
    public mText_mission3: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_shop')
    public mCanvas_shop: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_shop/mBtn_shop')
    public mBtn_shop: mw.Button=undefined;
    


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
		
		this.mBtn_shop.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_shop");
		})
		this.mBtn_shop.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_mission1)
		
	
		this.initLanguage(this.mText_mission2)
		
	
		this.initLanguage(this.mText_mission3)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_shop/TextBlock_2") as any);
		
	

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
 