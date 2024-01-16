
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/PetVIP/VIPHud.ui')
export default class VIPHud_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas')
    public mCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_3')
    public mCanvas_3: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_3/mStarText_3')
    public mStarText_3: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_2')
    public mCanvas_2: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_2/mStarText_2')
    public mStarText_2: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_1')
    public mCanvas_1: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_1/mStarText_1')
    public mStarText_1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mBtn_Main')
    public mBtn_Main: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_vip')
    public mCanvas_vip: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_vip/mBtn_Vip')
    public mBtn_Vip: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_vip/mBtn_Flush')
    public mBtn_Flush: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_vip/mBtn_Flush/mTextBlock')
    public mTextBlock: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCanvas_vip/mPoint')
    public mPoint: mw.Image=undefined;
    


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
		
		this.mBtn_Main.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Main");
		})
		this.mBtn_Main.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Vip.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Vip");
		})
		this.mBtn_Vip.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Flush.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Flush");
		})
		this.mBtn_Flush.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mStarText_3)
		
	
		this.initLanguage(this.mStarText_2)
		
	
		this.initLanguage(this.mStarText_1)
		
	
		this.initLanguage(this.mTextBlock)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mCanvas_vip/TextBlock_1") as any);
		
	

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
 