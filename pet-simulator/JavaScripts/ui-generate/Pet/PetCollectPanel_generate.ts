
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Pet/PetCollectPanel.ui')
export default class PetCollectPanel_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas')
    public mCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mProgressCanvas')
    public mProgressCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mProgressCanvas/mbar_hp')
    public mbar_hp: mw.ProgressBar=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mProgressCanvas/mHasText')
    public mHasText: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mProgressCanvas/mALLText')
    public mALLText: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mProgressCanvas/mText_level')
    public mText_level: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mProgressCanvas/mText_Get')
    public mText_Get: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mScrollBox')
    public mScrollBox: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mScrollBox/mListCanvas')
    public mListCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mBtn_unlock')
    public mBtn_unlock: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCloseBtn')
    public mCloseBtn: mw.Button=undefined;
    


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
		
		this.mBtn_unlock.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_unlock");
		})
		this.mBtn_unlock.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseBtn");
		})
		this.mCloseBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mHasText)
		
	
		this.initLanguage(this.mALLText)
		
	
		this.initLanguage(this.mText_level)
		
	
		this.initLanguage(this.mText_Get)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock_Top") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mBtn_unlock/TextBlock") as any);
		
	

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
 