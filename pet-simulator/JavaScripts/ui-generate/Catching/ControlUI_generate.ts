
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Catching/ControlUI.ui')
export default class ControlUI_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas_1')
    public mCanvas_1: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas')
    public mCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/Canvas/mButton_Up')
    public mButton_Up: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/Canvas/mButton_Left')
    public mButton_Left: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/Canvas/mButton_Right')
    public mButton_Right: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/Canvas/mButton_Down')
    public mButton_Down: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mButton_Catch')
    public mButton_Catch: mw.Button=undefined;
    


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
		
		this.mButton_Up.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Up");
		})
		this.mButton_Up.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_Left.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Left");
		})
		this.mButton_Left.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_Right.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Right");
		})
		this.mButton_Right.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_Down.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Down");
		})
		this.mButton_Down.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_Catch.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Catch");
		})
		this.mButton_Catch.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
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
 