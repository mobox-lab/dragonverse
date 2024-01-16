
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/common/Loading.ui')
export default class Loading_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mPic_load_Internal: mw.Image
	public get mPic_load(): mw.Image {
		if(!this.mPic_load_Internal&&this.uiWidgetBase) {
			this.mPic_load_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mPic_load') as mw.Image
		}
		return this.mPic_load_Internal
	}
	private mPic_load_1_Internal: mw.Image
	public get mPic_load_1(): mw.Image {
		if(!this.mPic_load_1_Internal&&this.uiWidgetBase) {
			this.mPic_load_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mPic_load_1') as mw.Image
		}
		return this.mPic_load_1_Internal
	}
	private mText_world_Internal: mw.TextBlock
	public get mText_world(): mw.TextBlock {
		if(!this.mText_world_Internal&&this.uiWidgetBase) {
			this.mText_world_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_world') as mw.TextBlock
		}
		return this.mText_world_Internal
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
		
		this.initLanguage(this.mText_world)
		
	
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
 