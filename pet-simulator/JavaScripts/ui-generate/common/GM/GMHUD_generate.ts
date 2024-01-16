
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/common/GM/GMHUD.ui')
export default class GMHUD_Generate extends mw.UIScript {
	@UIWidgetBind('MWCanvas_2147482460/argText')
    public argText: mw.InputBox=undefined;
    @UIWidgetBind('MWCanvas_2147482460/groupButton')
    public groupButton: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/cmdButton')
    public cmdButton: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/okButton')
    public okButton: mw.Button=undefined;
    @UIWidgetBind('MWCanvas_2147482460/dropList/cmdPanel')
    public cmdPanel: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/dropList')
    public dropList: mw.ScrollBox=undefined;
    


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
		
		this.groupButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "groupButton");
		})
		this.initLanguage(this.groupButton);
		this.groupButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.cmdButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "cmdButton");
		})
		this.initLanguage(this.cmdButton);
		this.cmdButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.okButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "okButton");
		})
		this.okButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/okButton/TextBlock") as any);
		
	

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
 