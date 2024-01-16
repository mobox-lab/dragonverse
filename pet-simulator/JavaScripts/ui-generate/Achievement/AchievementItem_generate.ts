
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Achievement/AchievementItem.ui')
export default class AchievementItem_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/Canvas/DetailCanvas/mText_AMdetial')
    public mText_AMdetial: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas/DetailCanvas/mText_Award')
    public mText_Award: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas/DetailCanvas/mImage_AwardType')
    public mImage_AwardType: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mImage_GradeBG')
    public mImage_GradeBG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mProgressBar')
    public mProgressBar: mw.ProgressBar=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mText_Grade')
    public mText_Grade: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mText_AMname')
    public mText_AMname: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mCanvas_Pointto')
    public mCanvas_Pointto: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mCanvas_Pointto/mText_NextLevel')
    public mText_NextLevel: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mCanvas_Pointto/mImage_Point')
    public mImage_Point: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mText_lording')
    public mText_lording: mw.TextBlock=undefined;
    


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
		
		this.initLanguage(this.mText_AMdetial)
		
	
		this.initLanguage(this.mText_Award)
		
	
		this.initLanguage(this.mText_Grade)
		
	
		this.initLanguage(this.mText_AMname)
		
	
		this.initLanguage(this.mText_NextLevel)
		
	
		this.initLanguage(this.mText_lording)
		
	
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
 