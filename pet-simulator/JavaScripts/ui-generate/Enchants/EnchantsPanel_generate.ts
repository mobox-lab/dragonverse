
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Enchants/EnchantsPanel.ui')
export default class EnchantsPanel_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mCanvas')
    public mCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mScrollBox')
    public mScrollBox: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mScrollBox/mlistCanvas')
    public mlistCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mButton')
    public mButton: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mButton_Enchant')
    public mButton_Enchant: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mButton_Enchant/mTextBlock_Enchant')
    public mTextBlock_Enchant: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mTextBlock_1')
    public mTextBlock_1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas/mTextBlock_Cost')
    public mTextBlock_Cost: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Entry')
    public mCanvas_Entry: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Entry/mScrollBox_Entry')
    public mScrollBox_Entry: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Entry/mScrollBox_Entry/mCanvas_Entrylist')
    public mCanvas_Entrylist: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Entry/mScrollBox_Entry/mCanvas_Entrylist/mTextBlock_2')
    public mTextBlock_2: mw.TextBlock=undefined;
    


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
		
		this.mButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton");
		})
		this.mButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_Enchant.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Enchant");
		})
		this.mButton_Enchant.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock_Enchant)
		
	
		this.initLanguage(this.mTextBlock_1)
		
	
		this.initLanguage(this.mTextBlock_Cost)
		
	
		this.initLanguage(this.mTextBlock_2)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock_Top") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Entry/TextBlock_Top2") as any);
		
	

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
 