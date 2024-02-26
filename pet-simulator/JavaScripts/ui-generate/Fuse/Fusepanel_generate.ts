
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Fuse/Fusepanel.ui')
export default class Fusepanel_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mListCanvas_Internal: mw.Canvas
	public get mListCanvas(): mw.Canvas {
		if(!this.mListCanvas_Internal&&this.uiWidgetBase) {
			this.mListCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/ScrollBox/mListCanvas') as mw.Canvas
		}
		return this.mListCanvas_Internal
	}
	private mBtn_Fuse_Internal: mw.Button
	public get mBtn_Fuse(): mw.Button {
		if(!this.mBtn_Fuse_Internal&&this.uiWidgetBase) {
			this.mBtn_Fuse_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBtn_Fuse') as mw.Button
		}
		return this.mBtn_Fuse_Internal
	}
	private mText_Number_Internal: mw.TextBlock
	public get mText_Number(): mw.TextBlock {
		if(!this.mText_Number_Internal&&this.uiWidgetBase) {
			this.mText_Number_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Number') as mw.TextBlock
		}
		return this.mText_Number_Internal
	}
	private mText_Money_Internal: mw.TextBlock
	public get mText_Money(): mw.TextBlock {
		if(!this.mText_Money_Internal&&this.uiWidgetBase) {
			this.mText_Money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Money') as mw.TextBlock
		}
		return this.mText_Money_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}
	private probabilityCanvas_Internal: mw.Canvas
	public get probabilityCanvas(): mw.Canvas {
		if(!this.probabilityCanvas_Internal&&this.uiWidgetBase) {
			this.probabilityCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/probabilityCanvas') as mw.Canvas
		}
		return this.probabilityCanvas_Internal
	}
	private mText_Normal_Internal: mw.TextBlock
	public get mText_Normal(): mw.TextBlock {
		if(!this.mText_Normal_Internal&&this.uiWidgetBase) {
			this.mText_Normal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/probabilityCanvas/mText_Normal') as mw.TextBlock
		}
		return this.mText_Normal_Internal
	}
	private mText_Normal_Probability_Internal: mw.TextBlock
	public get mText_Normal_Probability(): mw.TextBlock {
		if(!this.mText_Normal_Probability_Internal&&this.uiWidgetBase) {
			this.mText_Normal_Probability_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/probabilityCanvas/mText_Normal_Probability') as mw.TextBlock
		}
		return this.mText_Normal_Probability_Internal
	}
	private mText_Rainbow_Internal: mw.TextBlock
	public get mText_Rainbow(): mw.TextBlock {
		if(!this.mText_Rainbow_Internal&&this.uiWidgetBase) {
			this.mText_Rainbow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/probabilityCanvas/mText_Rainbow') as mw.TextBlock
		}
		return this.mText_Rainbow_Internal
	}
	private mText_Rainbow_Probability_Internal: mw.TextBlock
	public get mText_Rainbow_Probability(): mw.TextBlock {
		if(!this.mText_Rainbow_Probability_Internal&&this.uiWidgetBase) {
			this.mText_Rainbow_Probability_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/probabilityCanvas/mText_Rainbow_Probability') as mw.TextBlock
		}
		return this.mText_Rainbow_Probability_Internal
	}
	private mText_Love_Internal: mw.TextBlock
	public get mText_Love(): mw.TextBlock {
		if(!this.mText_Love_Internal&&this.uiWidgetBase) {
			this.mText_Love_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/probabilityCanvas/mText_Love') as mw.TextBlock
		}
		return this.mText_Love_Internal
	}
	private mText_Love_Probability_Internal: mw.TextBlock
	public get mText_Love_Probability(): mw.TextBlock {
		if(!this.mText_Love_Probability_Internal&&this.uiWidgetBase) {
			this.mText_Love_Probability_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/probabilityCanvas/mText_Love_Probability') as mw.TextBlock
		}
		return this.mText_Love_Probability_Internal
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
		
		this.mBtn_Fuse.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Fuse");
		})
		this.mBtn_Fuse.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Number)
		
	
		this.initLanguage(this.mText_Money)
		
	
		this.initLanguage(this.mText_Normal)
		
	
		this.initLanguage(this.mText_Normal_Probability)
		
	
		this.initLanguage(this.mText_Rainbow)
		
	
		this.initLanguage(this.mText_Rainbow_Probability)
		
	
		this.initLanguage(this.mText_Love)
		
	
		this.initLanguage(this.mText_Love_Probability)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mBtn_Fuse/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock_Top") as any);
		
	

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
 