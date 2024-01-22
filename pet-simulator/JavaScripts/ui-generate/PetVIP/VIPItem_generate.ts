
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/PetVIP/VIPItem.ui')
export default class VIPItem_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mBtn_Buy_Internal: mw.Button
	public get mBtn_Buy(): mw.Button {
		if(!this.mBtn_Buy_Internal&&this.uiWidgetBase) {
			this.mBtn_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBtn_Buy') as mw.Button
		}
		return this.mBtn_Buy_Internal
	}
	private mTextBlock_Level_Internal: mw.TextBlock
	public get mTextBlock_Level(): mw.TextBlock {
		if(!this.mTextBlock_Level_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Level_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mTextBlock_Level') as mw.TextBlock
		}
		return this.mTextBlock_Level_Internal
	}
	private mTextBlock_StarNeed_Internal: mw.TextBlock
	public get mTextBlock_StarNeed(): mw.TextBlock {
		if(!this.mTextBlock_StarNeed_Internal&&this.uiWidgetBase) {
			this.mTextBlock_StarNeed_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mTextBlock_StarNeed') as mw.TextBlock
		}
		return this.mTextBlock_StarNeed_Internal
	}
	private mTextBlock_Lock_Internal: mw.TextBlock
	public get mTextBlock_Lock(): mw.TextBlock {
		if(!this.mTextBlock_Lock_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Lock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mTextBlock_Lock') as mw.TextBlock
		}
		return this.mTextBlock_Lock_Internal
	}
	private mImage_Star_Internal: mw.Image
	public get mImage_Star(): mw.Image {
		if(!this.mImage_Star_Internal&&this.uiWidgetBase) {
			this.mImage_Star_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImage_Star') as mw.Image
		}
		return this.mImage_Star_Internal
	}
	private mImage_Icon_Internal: mw.Image
	public get mImage_Icon(): mw.Image {
		if(!this.mImage_Icon_Internal&&this.uiWidgetBase) {
			this.mImage_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImage_Icon') as mw.Image
		}
		return this.mImage_Icon_Internal
	}
	private mImage_Get_Internal: mw.Image
	public get mImage_Get(): mw.Image {
		if(!this.mImage_Get_Internal&&this.uiWidgetBase) {
			this.mImage_Get_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImage_Get') as mw.Image
		}
		return this.mImage_Get_Internal
	}
	private mImage_Up_Internal: mw.Image
	public get mImage_Up(): mw.Image {
		if(!this.mImage_Up_Internal&&this.uiWidgetBase) {
			this.mImage_Up_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImage_Up') as mw.Image
		}
		return this.mImage_Up_Internal
	}
	private mTextBlock_Number_Internal: mw.TextBlock
	public get mTextBlock_Number(): mw.TextBlock {
		if(!this.mTextBlock_Number_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Number_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mTextBlock_Number') as mw.TextBlock
		}
		return this.mTextBlock_Number_Internal
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
		
		this.mBtn_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Buy");
		})
		this.mBtn_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock_Level)
		
	
		this.initLanguage(this.mTextBlock_StarNeed)
		
	
		this.initLanguage(this.mTextBlock_Lock)
		
	
		this.initLanguage(this.mTextBlock_Number)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock_VIP") as any);
		
	

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
 