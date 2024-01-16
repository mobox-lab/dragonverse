
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/common/MessageBox.ui')
export default class MessageBox_Generate extends mw.UIScript {
	@UIWidgetBind('Canvas/BodyCanvas/mNo_btn')
    public mNo_btn: mw.StaleButton=undefined;
    @UIWidgetBind('Canvas/BodyCanvas/mYes_btn')
    public mYes_btn: mw.StaleButton=undefined;
    @UIWidgetBind('Canvas/BodyCanvas/mContent_txt')
    public mContent_txt: mw.TextBlock=undefined;
    


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
		
		this.mNo_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mNo_btn");
		})
		this.initLanguage(this.mNo_btn);
		this.mNo_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mYes_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mYes_btn");
		})
		this.initLanguage(this.mYes_btn);
		this.mYes_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mContent_txt)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/BodyCanvas/TextBlock") as any);
		
	

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
 