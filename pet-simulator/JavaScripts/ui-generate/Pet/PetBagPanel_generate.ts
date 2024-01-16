
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Pet/PetBagPanel.ui')
export default class PetBagPanel_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas')
    public mCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/ScrollBox/mListCanvas')
    public mListCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mCloseBtn')
    public mCloseBtn: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mTextBlock_Num')
    public mTextBlock_Num: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas_1/mReNameBtn')
    public mReNameBtn: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/Canvas_1/mDelBtn')
    public mDelBtn: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/Canvas_1/mSureDelBtn')
    public mSureDelBtn: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/Canvas_1/mEquipBtn')
    public mEquipBtn: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/Canvas_1/mEquip')
    public mEquip: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas_1/mEquipImg')
    public mEquipImg: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/Canvas_1/mTextBlock_Petequipnum')
    public mTextBlock_Petequipnum: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas_1/mSureDelBtn_Cancel')
    public mSureDelBtn_Cancel: mw.StaleButton=undefined;
    


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
		
		this.mSureDelBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSureDelBtn");
		})
		this.initLanguage(this.mSureDelBtn);
		this.mSureDelBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mEquipBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mEquipBtn");
		})
		this.initLanguage(this.mEquipBtn);
		this.mEquipBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mSureDelBtn_Cancel.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSureDelBtn_Cancel");
		})
		this.initLanguage(this.mSureDelBtn_Cancel);
		this.mSureDelBtn_Cancel.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mCloseBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseBtn");
		})
		this.mCloseBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mReNameBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mReNameBtn");
		})
		this.mReNameBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mDelBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mDelBtn");
		})
		this.mDelBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock_Num)
		
	
		this.initLanguage(this.mEquip)
		
	
		this.initLanguage(this.mTextBlock_Petequipnum)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock_Top") as any);
		
	

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
 