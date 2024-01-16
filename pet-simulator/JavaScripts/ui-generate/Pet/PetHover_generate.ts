
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Pet/PetHover.ui')
export default class PetHover_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas')
    public mCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mFrameImg')
    public mFrameImg: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mNameText')
    public mNameText: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mNiknameText')
    public mNiknameText: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mBackImage')
    public mBackImage: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mValueText')
    public mValueText: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mQualityText')
    public mQualityText: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mImage')
    public mImage: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mPic_SpecialTips')
    public mPic_SpecialTips: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mBuffText_1')
    public mBuffText_1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mText_SpecialTips')
    public mText_SpecialTips: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mBuffText_2')
    public mBuffText_2: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mBuffText_3')
    public mBuffText_3: mw.TextBlock=undefined;
    


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
		
		this.initLanguage(this.mNameText)
		
	
		this.initLanguage(this.mNiknameText)
		
	
		this.initLanguage(this.mValueText)
		
	
		this.initLanguage(this.mQualityText)
		
	
		this.initLanguage(this.mBuffText_1)
		
	
		this.initLanguage(this.mText_SpecialTips)
		
	
		this.initLanguage(this.mBuffText_2)
		
	
		this.initLanguage(this.mBuffText_3)
		
	
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
 