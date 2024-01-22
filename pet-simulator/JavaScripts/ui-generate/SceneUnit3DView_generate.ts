
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/SceneUnit3DView.ui')
export default class SceneUnit3DView_Generate extends UIScript {
		private bar_AtkCd_back_Internal: mw.ProgressBar
	public get bar_AtkCd_back(): mw.ProgressBar {
		if(!this.bar_AtkCd_back_Internal&&this.uiWidgetBase) {
			this.bar_AtkCd_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bar_AtkCd_back') as mw.ProgressBar
		}
		return this.bar_AtkCd_back_Internal
	}
	private bar_hp_Internal: mw.ProgressBar
	public get bar_hp(): mw.ProgressBar {
		if(!this.bar_hp_Internal&&this.uiWidgetBase) {
			this.bar_hp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bar_hp') as mw.ProgressBar
		}
		return this.bar_hp_Internal
	}
	private mText_Blood_Internal: mw.TextBlock
	public get mText_Blood(): mw.TextBlock {
		if(!this.mText_Blood_Internal&&this.uiWidgetBase) {
			this.mText_Blood_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Blood') as mw.TextBlock
		}
		return this.mText_Blood_Internal
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
		
		this.initLanguage(this.mText_Blood)
		
	
		//文本多语言
		
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
 