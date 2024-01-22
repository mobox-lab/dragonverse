
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Transmit/TransmitMain.ui')
export default class TransmitMain_Generate extends UIScript {
		private mWorldCanvas_Internal: mw.Canvas
	public get mWorldCanvas(): mw.Canvas {
		if(!this.mWorldCanvas_Internal&&this.uiWidgetBase) {
			this.mWorldCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Main/ScrollBox/mWorldCanvas') as mw.Canvas
		}
		return this.mWorldCanvas_Internal
	}
	private mPointCanvas_Internal: mw.Canvas
	public get mPointCanvas(): mw.Canvas {
		if(!this.mPointCanvas_Internal&&this.uiWidgetBase) {
			this.mPointCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Main/ScrollBox_1/mPointCanvas') as mw.Canvas
		}
		return this.mPointCanvas_Internal
	}
	private mText_world_Internal: mw.TextBlock
	public get mText_world(): mw.TextBlock {
		if(!this.mText_world_Internal&&this.uiWidgetBase) {
			this.mText_world_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Main/mText_world') as mw.TextBlock
		}
		return this.mText_world_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Close') as mw.Button
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
		
		this.initLanguage(this.mText_world)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Main/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_1") as any);
		
	

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
 