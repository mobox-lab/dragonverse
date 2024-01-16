
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Catching/ScreenUI.ui')
export default class ScreenUI_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas_Using')
    public mCanvas_Using: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Using/mTextBlock_Name')
    public mTextBlock_Name: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Using/mTextBlock_Time')
    public mTextBlock_Time: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Using/mTextBlock_Remaining')
    public mTextBlock_Remaining: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Default')
    public mCanvas_Default: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Default/mTextBlock_Claw1')
    public mTextBlock_Claw1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Default/mTextBlock_Claw2')
    public mTextBlock_Claw2: mw.TextBlock=undefined;
    


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
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock_Name)
		
	
		this.initLanguage(this.mTextBlock_Time)
		
	
		this.initLanguage(this.mTextBlock_Remaining)
		
	
		this.initLanguage(this.mTextBlock_Claw1)
		
	
		this.initLanguage(this.mTextBlock_Claw2)
		
	
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
 