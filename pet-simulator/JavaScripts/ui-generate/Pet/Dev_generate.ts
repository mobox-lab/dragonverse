
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Pet/Dev.ui')
export default class Dev_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas')
    public mCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mScrollBox')
    public mScrollBox: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mScrollBox/mCanvas_List')
    public mCanvas_List: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mButton_Close')
    public mButton_Close: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_Left')
    public mCanvas_Left: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_Left/mTextBlock_Rate')
    public mTextBlock_Rate: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_Left/mTextBlock_Intro')
    public mTextBlock_Intro: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_Left/mTextBlock_Diamond')
    public mTextBlock_Diamond: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_Left/mTextBlock_Explain')
    public mTextBlock_Explain: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_Left/mStaleButton_Ok')
    public mStaleButton_Ok: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_Left/mTextBlock_Worn')
    public mTextBlock_Worn: mw.TextBlock=undefined;
    


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
		
		this.mStaleButton_Ok.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mStaleButton_Ok");
		})
		this.initLanguage(this.mStaleButton_Ok);
		this.mStaleButton_Ok.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mButton_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Close");
		})
		this.mButton_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock_Rate)
		
	
		this.initLanguage(this.mTextBlock_Intro)
		
	
		this.initLanguage(this.mTextBlock_Diamond)
		
	
		this.initLanguage(this.mTextBlock_Explain)
		
	
		this.initLanguage(this.mTextBlock_Worn)
		
	
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
 