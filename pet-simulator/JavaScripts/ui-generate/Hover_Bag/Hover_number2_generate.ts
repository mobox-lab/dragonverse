
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Hover_Bag/Hover_number2.ui')
export default class Hover_number2_Generate extends UIScript {
		private can_Hover2_Internal: mw.Canvas
	public get can_Hover2(): mw.Canvas {
		if(!this.can_Hover2_Internal&&this.uiWidgetBase) {
			this.can_Hover2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Hover2') as mw.Canvas
		}
		return this.can_Hover2_Internal
	}
	private mPetInfo_Internal: mw.Canvas
	public get mPetInfo(): mw.Canvas {
		if(!this.mPetInfo_Internal&&this.uiWidgetBase) {
			this.mPetInfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Hover2/mPetInfo') as mw.Canvas
		}
		return this.mPetInfo_Internal
	}
	private mNamecanvas_Internal: mw.Canvas
	public get mNamecanvas(): mw.Canvas {
		if(!this.mNamecanvas_Internal&&this.uiWidgetBase) {
			this.mNamecanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Hover2/mPetInfo/mNamecanvas') as mw.Canvas
		}
		return this.mNamecanvas_Internal
	}
	private mNameBig_Internal: mw.TextBlock
	public get mNameBig(): mw.TextBlock {
		if(!this.mNameBig_Internal&&this.uiWidgetBase) {
			this.mNameBig_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Hover2/mPetInfo/mNamecanvas/mNameBig') as mw.TextBlock
		}
		return this.mNameBig_Internal
	}
	private mNameSmall_Internal: mw.TextBlock
	public get mNameSmall(): mw.TextBlock {
		if(!this.mNameSmall_Internal&&this.uiWidgetBase) {
			this.mNameSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Hover2/mPetInfo/mNamecanvas/mNameSmall') as mw.TextBlock
		}
		return this.mNameSmall_Internal
	}
	private mTypecanvas_Internal: mw.Canvas
	public get mTypecanvas(): mw.Canvas {
		if(!this.mTypecanvas_Internal&&this.uiWidgetBase) {
			this.mTypecanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Hover2/mPetInfo/mTypecanvas') as mw.Canvas
		}
		return this.mTypecanvas_Internal
	}
	private picRarity_Internal: mw.Image
	public get picRarity(): mw.Image {
		if(!this.picRarity_Internal&&this.uiWidgetBase) {
			this.picRarity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Hover2/mPetInfo/mTypecanvas/picRarity') as mw.Image
		}
		return this.picRarity_Internal
	}
	private textRarity_Internal: mw.TextBlock
	public get textRarity(): mw.TextBlock {
		if(!this.textRarity_Internal&&this.uiWidgetBase) {
			this.textRarity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Hover2/mPetInfo/mTypecanvas/picRarity/textRarity') as mw.TextBlock
		}
		return this.textRarity_Internal
	}
	private picLovelovelove_Internal: mw.Image
	public get picLovelovelove(): mw.Image {
		if(!this.picLovelovelove_Internal&&this.uiWidgetBase) {
			this.picLovelovelove_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Hover2/mPetInfo/mTypecanvas/picLovelovelove') as mw.Image
		}
		return this.picLovelovelove_Internal
	}
	private picRainbowowow_Internal: mw.Image
	public get picRainbowowow(): mw.Image {
		if(!this.picRainbowowow_Internal&&this.uiWidgetBase) {
			this.picRainbowowow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Hover2/mPetInfo/mTypecanvas/picRainbowowow') as mw.Image
		}
		return this.picRainbowowow_Internal
	}
	private mScrollBox_Entry_Internal: mw.ScrollBox
	public get mScrollBox_Entry(): mw.ScrollBox {
		if(!this.mScrollBox_Entry_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Entry_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Hover2/mScrollBox_Entry') as mw.ScrollBox
		}
		return this.mScrollBox_Entry_Internal
	}
	private mCanvas_Entrylist_Internal: mw.Canvas
	public get mCanvas_Entrylist(): mw.Canvas {
		if(!this.mCanvas_Entrylist_Internal&&this.uiWidgetBase) {
			this.mCanvas_Entrylist_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Hover2/mScrollBox_Entry/mCanvas_Entrylist') as mw.Canvas
		}
		return this.mCanvas_Entrylist_Internal
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
		
		this.initLanguage(this.mNameBig)
		
	
		this.initLanguage(this.mNameSmall)
		
	
		this.initLanguage(this.textRarity)
		
	
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
 