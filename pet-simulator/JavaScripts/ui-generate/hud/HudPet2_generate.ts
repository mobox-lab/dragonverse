
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/hud/HudPet2.ui')
export default class HudPet2_Generate extends UIScript {
		private mCanvas_Pet_Internal: mw.Canvas
	public get mCanvas_Pet(): mw.Canvas {
		if(!this.mCanvas_Pet_Internal&&this.uiWidgetBase) {
			this.mCanvas_Pet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Pet') as mw.Canvas
		}
		return this.mCanvas_Pet_Internal
	}
	private mBtn_Pet_Internal: mw.Button
	public get mBtn_Pet(): mw.Button {
		if(!this.mBtn_Pet_Internal&&this.uiWidgetBase) {
			this.mBtn_Pet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Pet/mBtn_Pet') as mw.Button
		}
		return this.mBtn_Pet_Internal
	}
	private mText_Pet_Internal: mw.TextBlock
	public get mText_Pet(): mw.TextBlock {
		if(!this.mText_Pet_Internal&&this.uiWidgetBase) {
			this.mText_Pet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Pet/mBtn_Pet/mText_Pet') as mw.TextBlock
		}
		return this.mText_Pet_Internal
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
		
		this.mBtn_Pet.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Pet");
		})
		this.mBtn_Pet.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Pet)
		
	
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
 