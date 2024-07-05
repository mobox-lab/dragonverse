
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/WorldUI/WallInteract.ui')
export default class WallInteract_Generate extends UIScript {
		private mBtn_Interact_Internal: mw.Button
	public get mBtn_Interact(): mw.Button {
		if(!this.mBtn_Interact_Internal&&this.uiWidgetBase) {
			this.mBtn_Interact_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Interact') as mw.Button
		}
		return this.mBtn_Interact_Internal
	}
	private clickImg_Internal: mw.Image
	public get clickImg(): mw.Image {
		if(!this.clickImg_Internal&&this.uiWidgetBase) {
			this.clickImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/clickImg') as mw.Image
		}
		return this.clickImg_Internal
	}
	private textBlock_Internal: mw.TextBlock
	public get textBlock(): mw.TextBlock {
		if(!this.textBlock_Internal&&this.uiWidgetBase) {
			this.textBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/clickImg/textBlock') as mw.TextBlock
		}
		return this.textBlock_Internal
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
		
		this.mBtn_Interact.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Interact");
		})
		this.mBtn_Interact.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.textBlock)
		
	
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
 