
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/common/Tips.ui')
export default class Tips_Generate extends UIScript {
		private mBottomCell_Internal: mw.Canvas
	public get mBottomCell(): mw.Canvas {
		if(!this.mBottomCell_Internal&&this.uiWidgetBase) {
			this.mBottomCell_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCell') as mw.Canvas
		}
		return this.mBottomCell_Internal
	}
	private mBottomText_4_Internal: mw.TextBlock
	public get mBottomText_4(): mw.TextBlock {
		if(!this.mBottomText_4_Internal&&this.uiWidgetBase) {
			this.mBottomText_4_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCell/mBottomText_4') as mw.TextBlock
		}
		return this.mBottomText_4_Internal
	}
	private mBottomText_3_Internal: mw.TextBlock
	public get mBottomText_3(): mw.TextBlock {
		if(!this.mBottomText_3_Internal&&this.uiWidgetBase) {
			this.mBottomText_3_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCell/mBottomText_3') as mw.TextBlock
		}
		return this.mBottomText_3_Internal
	}
	private mBottomText_2_Internal: mw.TextBlock
	public get mBottomText_2(): mw.TextBlock {
		if(!this.mBottomText_2_Internal&&this.uiWidgetBase) {
			this.mBottomText_2_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCell/mBottomText_2') as mw.TextBlock
		}
		return this.mBottomText_2_Internal
	}
	private mBottomText_1_Internal: mw.TextBlock
	public get mBottomText_1(): mw.TextBlock {
		if(!this.mBottomText_1_Internal&&this.uiWidgetBase) {
			this.mBottomText_1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCell/mBottomText_1') as mw.TextBlock
		}
		return this.mBottomText_1_Internal
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
		
		this.initLanguage(this.mBottomText_4)
		
	
		this.initLanguage(this.mBottomText_3)
		
	
		this.initLanguage(this.mBottomText_2)
		
	
		this.initLanguage(this.mBottomText_1)
		
	
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
 