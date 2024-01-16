
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/hud/Hud.ui')
export default class Hud_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mVirtualJoystickPanel')
    public mVirtualJoystickPanel: mw.VirtualJoystickPanel=undefined;
    @UIWidgetBind('RootCanvas/mTouchPad')
    public mTouchPad: mw.TouchPad=undefined;
    @UIWidgetBind('RootCanvas/mAtk_Canvas')
    public mAtk_Canvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mAtk_Canvas/mJump_Btn')
    public mJump_Btn: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mAtk_Canvas/mBtn_petspeed')
    public mBtn_petspeed: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_coin')
    public mCanvas_coin: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_coin/mCanvas_diamond')
    public mCanvas_diamond: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_coin/mCanvas_diamond/mPic_diamond')
    public mPic_diamond: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_coin/mCanvas_diamond/mText_diamond')
    public mText_diamond: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_coin/mCanvas_specailcoin')
    public mCanvas_specailcoin: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_coin/mCanvas_specailcoin/mPic_coin')
    public mPic_coin: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_coin/mCanvas_specailcoin/mText_coin')
    public mText_coin: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Transmit')
    public mCanvas_Transmit: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Transmit/mBtn_Transmit')
    public mBtn_Transmit: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_buff')
    public mCanvas_buff: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_fasttran')
    public mCanvas_fasttran: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_fasttran/mBtn_FastTran')
    public mBtn_FastTran: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Camera')
    public mCanvas_Camera: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Camera/mBtn_long')
    public mBtn_long: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Camera/mBtn_near')
    public mBtn_near: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Camera/mBtn_nomal')
    public mBtn_nomal: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mGM')
    public mGM: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_skid')
    public mCanvas_skid: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_skid/mBtn_skid')
    public mBtn_skid: mw.Button=undefined;
    


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
		
		this.mBtn_long.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_long");
		})
		this.initLanguage(this.mBtn_long);
		this.mBtn_long.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_near.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_near");
		})
		this.initLanguage(this.mBtn_near);
		this.mBtn_near.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_nomal.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_nomal");
		})
		this.initLanguage(this.mBtn_nomal);
		this.mBtn_nomal.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mJump_Btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mJump_Btn");
		})
		this.mJump_Btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_petspeed.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_petspeed");
		})
		this.mBtn_petspeed.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Transmit.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Transmit");
		})
		this.mBtn_Transmit.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_FastTran.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_FastTran");
		})
		this.mBtn_FastTran.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mGM.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mGM");
		})
		this.mGM.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_skid.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_skid");
		})
		this.mBtn_skid.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_diamond)
		
	
		this.initLanguage(this.mText_coin)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_fasttran/TextBlock") as any);
		
	

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
 