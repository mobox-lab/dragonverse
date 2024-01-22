
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Catching/ScreenUI.ui')
export default class ScreenUI_Generate extends UIScript {
		private mCanvas_Using_Internal: mw.Canvas
	public get mCanvas_Using(): mw.Canvas {
		if(!this.mCanvas_Using_Internal&&this.uiWidgetBase) {
			this.mCanvas_Using_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Using') as mw.Canvas
		}
		return this.mCanvas_Using_Internal
	}
	private mTextBlock_Name_Internal: mw.TextBlock
	public get mTextBlock_Name(): mw.TextBlock {
		if(!this.mTextBlock_Name_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Using/mTextBlock_Name') as mw.TextBlock
		}
		return this.mTextBlock_Name_Internal
	}
	private mTextBlock_Time_Internal: mw.TextBlock
	public get mTextBlock_Time(): mw.TextBlock {
		if(!this.mTextBlock_Time_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Using/mTextBlock_Time') as mw.TextBlock
		}
		return this.mTextBlock_Time_Internal
	}
	private mTextBlock_Remaining_Internal: mw.TextBlock
	public get mTextBlock_Remaining(): mw.TextBlock {
		if(!this.mTextBlock_Remaining_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Remaining_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Using/mTextBlock_Remaining') as mw.TextBlock
		}
		return this.mTextBlock_Remaining_Internal
	}
	private mCanvas_Default_Internal: mw.Canvas
	public get mCanvas_Default(): mw.Canvas {
		if(!this.mCanvas_Default_Internal&&this.uiWidgetBase) {
			this.mCanvas_Default_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Default') as mw.Canvas
		}
		return this.mCanvas_Default_Internal
	}
	private mTextBlock_Claw1_Internal: mw.TextBlock
	public get mTextBlock_Claw1(): mw.TextBlock {
		if(!this.mTextBlock_Claw1_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Claw1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Default/mTextBlock_Claw1') as mw.TextBlock
		}
		return this.mTextBlock_Claw1_Internal
	}
	private mTextBlock_Claw2_Internal: mw.TextBlock
	public get mTextBlock_Claw2(): mw.TextBlock {
		if(!this.mTextBlock_Claw2_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Claw2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Default/mTextBlock_Claw2') as mw.TextBlock
		}
		return this.mTextBlock_Claw2_Internal
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
		
		this.initLanguage(this.mTextBlock_Name)
		
	
		this.initLanguage(this.mTextBlock_Time)
		
	
		this.initLanguage(this.mTextBlock_Remaining)
		
	
		this.initLanguage(this.mTextBlock_Claw1)
		
	
		this.initLanguage(this.mTextBlock_Claw2)
		
	
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
 