
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/module_leaderboard/LeaderboardItem.ui')
export default class LeaderboardItem_Generate extends UIScript {
		private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('Canvas/mContent') as mw.Canvas
		}
		return this.mContent_Internal
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
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/mContent/Field1_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/mContent/Field2_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/mContent/Field3_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/mContent/Field4_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/mContent/Field5_txt") as any);
		
	

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
 