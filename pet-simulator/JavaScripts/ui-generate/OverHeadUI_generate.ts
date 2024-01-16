
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/OverHeadUI.ui')
export default class OverHeadUI_Generate extends mw.UIScript {
	@UIWidgetBind('Canvas/mCanvas_1')
    public mCanvas_1: mw.Canvas=undefined;
    @UIWidgetBind('Canvas/mCanvas_1/mTex_name')
    public mTex_name: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/mCanvas_1/mTex_count')
    public mTex_count: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/mCanvas_1/Canvas_1/mTex_speed')
    public mTex_speed: mw.TextBlock=undefined;
    


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
		
		this.initLanguage(this.mTex_name)
		
	
		this.initLanguage(this.mTex_count)
		
	
		this.initLanguage(this.mTex_speed)
		
	
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
 