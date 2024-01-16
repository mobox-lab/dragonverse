
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Pet/Pet_item.ui')
export default class Pet_item_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas')
    public mCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mPic_Equip')
    public mPic_Equip: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mPic_Equip_3')
    public mPic_Equip_3: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mPic_Peticon')
    public mPic_Peticon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mText_Value')
    public mText_Value: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mPic_Rainbow')
    public mPic_Rainbow: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mPic_Heart')
    public mPic_Heart: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mPic_star3')
    public mPic_star3: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mPic_star2')
    public mPic_star2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mPic_star1')
    public mPic_star1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mPic_delete')
    public mPic_delete: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mPic_Effect')
    public mPic_Effect: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mPic_Equip_2')
    public mPic_Equip_2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mButton_Equip')
    public mButton_Equip: mw.Button=undefined;
    


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
		
		this.mButton_Equip.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Equip");
		})
		this.mButton_Equip.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Value)
		
	
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
 