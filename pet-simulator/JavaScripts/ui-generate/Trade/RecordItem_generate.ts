
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Trade/RecordItem.ui')
export default class RecordItem_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mBtn_RecordDetail/mText_Count')
    public mText_Count: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mBtn_RecordDetail/mText_Time')
    public mText_Time: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mBtn_RecordDetail')
    public mBtn_RecordDetail: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mBtn_Good')
    public mBtn_Good: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mBtn_Bad')
    public mBtn_Bad: mw.Button=undefined;
    


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
		
		this.mBtn_RecordDetail.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_RecordDetail");
		})
		this.mBtn_RecordDetail.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Good.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Good");
		})
		this.mBtn_Good.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Bad.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Bad");
		})
		this.mBtn_Bad.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Count)
		
	
		this.initLanguage(this.mText_Time)
		
	
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
 