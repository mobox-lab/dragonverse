
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Rank/RankItem.ui')
export default class RankItem_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mText_RankNum')
    public mText_RankNum: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mText_Username')
    public mText_Username: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mImage')
    public mImage: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mText_Count')
    public mText_Count: mw.TextBlock=undefined;
    


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
		
		this.initLanguage(this.mText_RankNum)
		
	
		this.initLanguage(this.mText_Username)
		
	
		this.initLanguage(this.mText_Count)
		
	
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
 