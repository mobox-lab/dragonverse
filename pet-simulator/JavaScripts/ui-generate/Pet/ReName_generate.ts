
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Pet/ReName.ui')
export default class ReName_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/Canvas/mSureBtn')
    public mSureBtn: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mBtn_Random')
    public mBtn_Random: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mNameInputBox')
    public mNameInputBox: mw.InputBox=undefined;
    


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
		
		this.mSureBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSureBtn");
		})
		this.initLanguage(this.mSureBtn);
		this.mSureBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mBtn_Random.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Random");
		})
		this.mBtn_Random.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock") as any);
		
	

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
 