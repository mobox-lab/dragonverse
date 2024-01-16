
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/OverHeadUI.ui')
export default class OverHeadUI_Generate extends UIScript {
		private mCanvas_1_Internal: mw.Canvas
	public get mCanvas_1(): mw.Canvas {
		if(!this.mCanvas_1_Internal&&this.uiWidgetBase) {
			this.mCanvas_1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_1') as mw.Canvas
		}
		return this.mCanvas_1_Internal
	}
	private mTex_name_Internal: mw.TextBlock
	public get mTex_name(): mw.TextBlock {
		if(!this.mTex_name_Internal&&this.uiWidgetBase) {
			this.mTex_name_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_1/mTex_name') as mw.TextBlock
		}
		return this.mTex_name_Internal
	}
	private mTex_count_Internal: mw.TextBlock
	public get mTex_count(): mw.TextBlock {
		if(!this.mTex_count_Internal&&this.uiWidgetBase) {
			this.mTex_count_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_1/mTex_count') as mw.TextBlock
		}
		return this.mTex_count_Internal
	}
	private mTex_speed_Internal: mw.TextBlock
	public get mTex_speed(): mw.TextBlock {
		if(!this.mTex_speed_Internal&&this.uiWidgetBase) {
			this.mTex_speed_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_1/Canvas_1/mTex_speed') as mw.TextBlock
		}
		return this.mTex_speed_Internal
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
		
		this.initLanguage(this.mTex_name)
		
	
		this.initLanguage(this.mTex_count)
		
	
		this.initLanguage(this.mTex_speed)
		
	
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
 