
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/module_leaderboard/LeaderboardPanel.ui')
export default class LeaderboardPanel_Generate extends mw.UIScript {
	@UIWidgetBind('Canvas/MainView/mTitle_txt')
    public mTitle_txt: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/MainView/mFieldName')
    public mFieldName: mw.Canvas=undefined;
    @UIWidgetBind('Canvas/MainView/ScrollView/mContent')
    public mContent: mw.Canvas=undefined;
    @UIWidgetBind('Canvas/MainView/mSelfList')
    public mSelfList: mw.Canvas=undefined;
    @UIWidgetBind('Canvas/MainView/mClose_btn')
    public mClose_btn: mw.StaleButton=undefined;
    


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
		
		this.mClose_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mClose_btn");
		})
		this.initLanguage(this.mClose_btn);
		this.mClose_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTitle_txt)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/MainView/mFieldName/Field1_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/MainView/mFieldName/Field2_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/MainView/mFieldName/Field3_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/MainView/mFieldName/Field4_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/MainView/mFieldName/Field5_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/MainView/mSelfList/Field1_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/MainView/mSelfList/Field2_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/MainView/mSelfList/Field3_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/MainView/mSelfList/Field4_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/MainView/mSelfList/Field5_txt") as any);
		
	

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
 