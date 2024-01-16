
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/common/RewardTips.ui')
export default class RewardTips_Generate extends UIScript {
		private mImage_Internal: mw.Image
	public get mImage(): mw.Image {
		if(!this.mImage_Internal&&this.uiWidgetBase) {
			this.mImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTipsCanvas/mImage') as mw.Image
		}
		return this.mImage_Internal
	}
	private mValText_Internal: mw.TextBlock
	public get mValText(): mw.TextBlock {
		if(!this.mValText_Internal&&this.uiWidgetBase) {
			this.mValText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTipsCanvas/mValText') as mw.TextBlock
		}
		return this.mValText_Internal
	}
	private mTipsCanvas_Internal: mw.Canvas
	public get mTipsCanvas(): mw.Canvas {
		if(!this.mTipsCanvas_Internal&&this.uiWidgetBase) {
			this.mTipsCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTipsCanvas') as mw.Canvas
		}
		return this.mTipsCanvas_Internal
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
		
		this.initLanguage(this.mValText)
		
	
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
 