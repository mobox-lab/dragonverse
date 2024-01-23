
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Enchants/EnchantsPanel.ui')
export default class EnchantsPanel_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mTextBlock_1_Internal: mw.TextBlock
	public get mTextBlock_1(): mw.TextBlock {
		if(!this.mTextBlock_1_Internal&&this.uiWidgetBase) {
			this.mTextBlock_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mTextBlock_1') as mw.TextBlock
		}
		return this.mTextBlock_1_Internal
	}
	private mTextBlock_Cost_Internal: mw.TextBlock
	public get mTextBlock_Cost(): mw.TextBlock {
		if(!this.mTextBlock_Cost_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Cost_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mTextBlock_Cost') as mw.TextBlock
		}
		return this.mTextBlock_Cost_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mlistCanvas_Internal: mw.Canvas
	public get mlistCanvas(): mw.Canvas {
		if(!this.mlistCanvas_Internal&&this.uiWidgetBase) {
			this.mlistCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScrollBox/mlistCanvas') as mw.Canvas
		}
		return this.mlistCanvas_Internal
	}
	private mButton_Internal: mw.Button
	public get mButton(): mw.Button {
		if(!this.mButton_Internal&&this.uiWidgetBase) {
			this.mButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mButton') as mw.Button
		}
		return this.mButton_Internal
	}
	private mButton_Enchant_Internal: mw.Button
	public get mButton_Enchant(): mw.Button {
		if(!this.mButton_Enchant_Internal&&this.uiWidgetBase) {
			this.mButton_Enchant_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mButton_Enchant') as mw.Button
		}
		return this.mButton_Enchant_Internal
	}
	private mTextBlock_Enchant_Internal: mw.TextBlock
	public get mTextBlock_Enchant(): mw.TextBlock {
		if(!this.mTextBlock_Enchant_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Enchant_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mButton_Enchant/mTextBlock_Enchant') as mw.TextBlock
		}
		return this.mTextBlock_Enchant_Internal
	}
	private mCanvas_Entry_Internal: mw.Canvas
	public get mCanvas_Entry(): mw.Canvas {
		if(!this.mCanvas_Entry_Internal&&this.uiWidgetBase) {
			this.mCanvas_Entry_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Entry') as mw.Canvas
		}
		return this.mCanvas_Entry_Internal
	}
	private mScrollBox_Entry_Internal: mw.ScrollBox
	public get mScrollBox_Entry(): mw.ScrollBox {
		if(!this.mScrollBox_Entry_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Entry_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Entry/mScrollBox_Entry') as mw.ScrollBox
		}
		return this.mScrollBox_Entry_Internal
	}
	private mCanvas_Entrylist_Internal: mw.Canvas
	public get mCanvas_Entrylist(): mw.Canvas {
		if(!this.mCanvas_Entrylist_Internal&&this.uiWidgetBase) {
			this.mCanvas_Entrylist_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Entry/mScrollBox_Entry/mCanvas_Entrylist') as mw.Canvas
		}
		return this.mCanvas_Entrylist_Internal
	}
	private mTextBlock_2_Internal: mw.TextBlock
	public get mTextBlock_2(): mw.TextBlock {
		if(!this.mTextBlock_2_Internal&&this.uiWidgetBase) {
			this.mTextBlock_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Entry/mScrollBox_Entry/mCanvas_Entrylist/mTextBlock_2') as mw.TextBlock
		}
		return this.mTextBlock_2_Internal
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
		
		this.mButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton");
		})
		this.mButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_Enchant.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Enchant");
		})
		this.mButton_Enchant.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock_1)
		
	
		this.initLanguage(this.mTextBlock_Cost)
		
	
		this.initLanguage(this.mTextBlock_Enchant)
		
	
		this.initLanguage(this.mTextBlock_2)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock_Top") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Entry/TextBlock_Top2") as any);
		
	

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
 