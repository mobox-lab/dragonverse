
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/common/RewardUI.ui')
export default class RewardUI_Generate extends UIScript {
		private mCanvas_1_Internal: mw.Canvas
	public get mCanvas_1(): mw.Canvas {
		if(!this.mCanvas_1_Internal&&this.uiWidgetBase) {
			this.mCanvas_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_1') as mw.Canvas
		}
		return this.mCanvas_1_Internal
	}
	private mCanvas_2_Internal: mw.Canvas
	public get mCanvas_2(): mw.Canvas {
		if(!this.mCanvas_2_Internal&&this.uiWidgetBase) {
			this.mCanvas_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_2') as mw.Canvas
		}
		return this.mCanvas_2_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
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
 