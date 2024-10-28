
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Hover_Bag/Hover_item.ui')
export default class Hover_item_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mButton_Entry_Internal: mw.Button
	public get mButton_Entry(): mw.Button {
		if(!this.mButton_Entry_Internal&&this.uiWidgetBase) {
			this.mButton_Entry_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mButton_Entry') as mw.Button
		}
		return this.mButton_Entry_Internal
	}
	private textEnhanceName_Internal: mw.TextBlock
	public get textEnhanceName(): mw.TextBlock {
		if(!this.textEnhanceName_Internal&&this.uiWidgetBase) {
			this.textEnhanceName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/textEnhanceName') as mw.TextBlock
		}
		return this.textEnhanceName_Internal
	}
	private mTextBlock_Entry_Internal: mw.TextBlock
	public get mTextBlock_Entry(): mw.TextBlock {
		if(!this.mTextBlock_Entry_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Entry_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mTextBlock_Entry') as mw.TextBlock
		}
		return this.mTextBlock_Entry_Internal
	}
	private textScoreUp_Internal: mw.TextBlock
	public get textScoreUp(): mw.TextBlock {
		if(!this.textScoreUp_Internal&&this.uiWidgetBase) {
			this.textScoreUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/textScoreUp') as mw.TextBlock
		}
		return this.textScoreUp_Internal
	}
	private textScoreNumber_Internal: mw.TextBlock
	public get textScoreNumber(): mw.TextBlock {
		if(!this.textScoreNumber_Internal&&this.uiWidgetBase) {
			this.textScoreNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/textScoreNumber') as mw.TextBlock
		}
		return this.textScoreNumber_Internal
	}
	private picScore_Internal: mw.Image
	public get picScore(): mw.Image {
		if(!this.picScore_Internal&&this.uiWidgetBase) {
			this.picScore_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/picScore') as mw.Image
		}
		return this.picScore_Internal
	}
	private picSelect_Internal: mw.Image
	public get picSelect(): mw.Image {
		if(!this.picSelect_Internal&&this.uiWidgetBase) {
			this.picSelect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/picSelect') as mw.Image
		}
		return this.picSelect_Internal
	}
	private can_SlotText_Internal: mw.Canvas
	public get can_SlotText(): mw.Canvas {
		if(!this.can_SlotText_Internal&&this.uiWidgetBase) {
			this.can_SlotText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/can_SlotText') as mw.Canvas
		}
		return this.can_SlotText_Internal
	}
	private text_Slot_Internal: mw.TextBlock
	public get text_Slot(): mw.TextBlock {
		if(!this.text_Slot_Internal&&this.uiWidgetBase) {
			this.text_Slot_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/can_SlotText/text_Slot') as mw.TextBlock
		}
		return this.text_Slot_Internal
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
		
		this.mButton_Entry.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Entry");
		})
		this.mButton_Entry.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.textEnhanceName)
		
	
		this.initLanguage(this.mTextBlock_Entry)
		
	
		this.initLanguage(this.textScoreUp)
		
	
		this.initLanguage(this.textScoreNumber)
		
	
		this.initLanguage(this.text_Slot)
		
	
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
 