
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/LevelUp/TypeItem.ui')
export default class TypeItem_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/Canvas/mBtn_Levelup')
    public mBtn_Levelup: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mText_DiaNum')
    public mText_DiaNum: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mCanvas_Schedule/mImage_Piece_0')
    public mImage_Piece_0: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mCanvas_Schedule/mImage_Piece_1')
    public mImage_Piece_1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mCanvas_Schedule/mImage_Piece_2')
    public mImage_Piece_2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mCanvas_Schedule/mImage_Piece_3')
    public mImage_Piece_3: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mCanvas_Schedule/mImage_Piece_4')
    public mImage_Piece_4: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mCanvas_Schedule')
    public mCanvas_Schedule: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mImg_Icon')
    public mImg_Icon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mTxt_Itro')
    public mTxt_Itro: mw.TextBlock=undefined;
    


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
		
		this.mBtn_Levelup.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Levelup");
		})
		this.mBtn_Levelup.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_DiaNum)
		
	
		this.initLanguage(this.mTxt_Itro)
		
	
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
 