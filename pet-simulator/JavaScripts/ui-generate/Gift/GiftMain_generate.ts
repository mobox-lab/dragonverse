
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Gift/GiftMain.ui')
export default class GiftMain_Generate extends UIScript {
		private mCanvas_Main_Internal: mw.Canvas
	public get mCanvas_Main(): mw.Canvas {
		if(!this.mCanvas_Main_Internal&&this.uiWidgetBase) {
			this.mCanvas_Main_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Main') as mw.Canvas
		}
		return this.mCanvas_Main_Internal
	}
	private mCanvas_Gift_Internal: mw.Canvas
	public get mCanvas_Gift(): mw.Canvas {
		if(!this.mCanvas_Gift_Internal&&this.uiWidgetBase) {
			this.mCanvas_Gift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Main/mCanvas_Gift') as mw.Canvas
		}
		return this.mCanvas_Gift_Internal
	}
	private mText_Progress_Internal: mw.TextBlock
	public get mText_Progress(): mw.TextBlock {
		if(!this.mText_Progress_Internal&&this.uiWidgetBase) {
			this.mText_Progress_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Main/mText_Progress') as mw.TextBlock
		}
		return this.mText_Progress_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Main/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}



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
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Progress)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Main/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Main/TextBlock_1") as any);
		
	

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
 