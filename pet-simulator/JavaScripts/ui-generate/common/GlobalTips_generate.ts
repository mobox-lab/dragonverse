
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/common/GlobalTips.ui')
export default class GlobalTips_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas_back/mImage_Head')
    public mImage_Head: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_back')
    public mCanvas_back: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Text/mText')
    public mText: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Text')
    public mCanvas_Text: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mTextcopy')
    public mTextcopy: mw.TextBlock=undefined;
    


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
		
		this.initLanguage(this.mText)
		
	
		this.initLanguage(this.mTextcopy)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as any);
		
	

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
 