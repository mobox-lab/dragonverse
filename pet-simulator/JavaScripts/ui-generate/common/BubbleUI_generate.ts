
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/common/BubbleUI.ui')
export default class BubbleUI_Generate extends UIScript {
		private array_Internal: mw.Image
	public get array(): mw.Image {
		if(!this.array_Internal&&this.uiWidgetBase) {
			this.array_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/array') as mw.Image
		}
		return this.array_Internal
	}
	private border_Internal: mw.Image
	public get border(): mw.Image {
		if(!this.border_Internal&&this.uiWidgetBase) {
			this.border_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/border') as mw.Image
		}
		return this.border_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private text_Internal: mw.TextBlock
	public get text(): mw.TextBlock {
		if(!this.text_Internal&&this.uiWidgetBase) {
			this.text_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/text') as mw.TextBlock
		}
		return this.text_Internal
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
		
		this.initLanguage(this.text)
		
	
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
 