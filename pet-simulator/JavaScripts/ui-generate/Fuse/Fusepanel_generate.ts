
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
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mListCanvas_Internal: mw.Canvas
	public get mListCanvas(): mw.Canvas {
		if(!this.mListCanvas_Internal&&this.uiWidgetBase) {
			this.mListCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScrollBox/mListCanvas') as mw.Canvas
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
	private mText_Money_Internal: mw.TextBlock
	public get mText_Money(): mw.TextBlock {
		if(!this.mText_Money_Internal&&this.uiWidgetBase) {
			this.mText_Money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBtn_Fuse/mText_Money') as mw.TextBlock
		}
		return this.mText_Money_Internal
	}
	private mText_Fuset_Internal: mw.TextBlock
	public get mText_Fuset(): mw.TextBlock {
		if(!this.mText_Fuset_Internal&&this.uiWidgetBase) {
			this.mText_Fuset_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBtn_Fuse/mText_Fuset') as mw.TextBlock
		}
		return this.mText_Fuset_Internal
	}
	private mText_Number_Internal: mw.TextBlock
	public get mText_Number(): mw.TextBlock {
		if(!this.mText_Number_Internal&&this.uiWidgetBase) {
			this.mText_Number_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Number') as mw.TextBlock
		}
		return this.mText_Number_Internal
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
	private mText_Love_Probability_Internal: mw.TextBlock
	public get mText_Love_Probability(): mw.TextBlock {
		if(!this.mText_Love_Probability_Internal&&this.uiWidgetBase) {
			this.mText_Love_Probability_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/probabilityCanvas/mText_Love_Probability') as mw.TextBlock
		}
		return this.mText_Love_Probability_Internal
	}
	private img_HeartIcon_Internal: mw.Image
	public get img_HeartIcon(): mw.Image {
		if(!this.img_HeartIcon_Internal&&this.uiWidgetBase) {
			this.img_HeartIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/probabilityCanvas/img_HeartIcon') as mw.Image
		}
		return this.img_HeartIcon_Internal
	}
	private mText_Rainbow_Probability_Internal: mw.TextBlock
	public get mText_Rainbow_Probability(): mw.TextBlock {
		if(!this.mText_Rainbow_Probability_Internal&&this.uiWidgetBase) {
			this.mText_Rainbow_Probability_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/probabilityCanvas/mText_Rainbow_Probability') as mw.TextBlock
		}
		return this.mText_Rainbow_Probability_Internal
	}
	private img_RainbowIcon_Internal: mw.Image
	public get img_RainbowIcon(): mw.Image {
		if(!this.img_RainbowIcon_Internal&&this.uiWidgetBase) {
			this.img_RainbowIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/probabilityCanvas/img_RainbowIcon') as mw.Image
		}
		return this.img_RainbowIcon_Internal
	}
	private mText_Normal_Probability_Internal: mw.TextBlock
	public get mText_Normal_Probability(): mw.TextBlock {
		if(!this.mText_Normal_Probability_Internal&&this.uiWidgetBase) {
			this.mText_Normal_Probability_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/probabilityCanvas/mText_Normal_Probability') as mw.TextBlock
		}
		return this.mText_Normal_Probability_Internal
	}
	private mText_Normal_Internal: mw.TextBlock
	public get mText_Normal(): mw.TextBlock {
		if(!this.mText_Normal_Internal&&this.uiWidgetBase) {
			this.mText_Normal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/probabilityCanvas/mText_Normal') as mw.TextBlock
		}
		return this.mText_Normal_Internal
	}
	private can_DetailText_Internal: mw.Canvas
	public get can_DetailText(): mw.Canvas {
		if(!this.can_DetailText_Internal&&this.uiWidgetBase) {
			this.can_DetailText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/can_DetailText') as mw.Canvas
		}
		return this.can_DetailText_Internal
	}
	private text_ResetNum_Internal: mw.TextBlock
	public get text_ResetNum(): mw.TextBlock {
		if(!this.text_ResetNum_Internal&&this.uiWidgetBase) {
			this.text_ResetNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/can_DetailText/text_ResetNum') as mw.TextBlock
		}
		return this.text_ResetNum_Internal
	}
	private text_Reset_Internal: mw.TextBlock
	public get text_Reset(): mw.TextBlock {
		if(!this.text_Reset_Internal&&this.uiWidgetBase) {
			this.text_Reset_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/can_DetailText/text_Reset') as mw.TextBlock
		}
		return this.text_Reset_Internal
	}
	private text_CumulativeNum_Internal: mw.TextBlock
	public get text_CumulativeNum(): mw.TextBlock {
		if(!this.text_CumulativeNum_Internal&&this.uiWidgetBase) {
			this.text_CumulativeNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/can_DetailText/text_CumulativeNum') as mw.TextBlock
		}
		return this.text_CumulativeNum_Internal
	}
	private text_Cumulative_Internal: mw.TextBlock
	public get text_Cumulative(): mw.TextBlock {
		if(!this.text_Cumulative_Internal&&this.uiWidgetBase) {
			this.text_Cumulative_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/can_DetailText/text_Cumulative') as mw.TextBlock
		}
		return this.text_Cumulative_Internal
	}
	private text_FuseNum_Internal: mw.TextBlock
	public get text_FuseNum(): mw.TextBlock {
		if(!this.text_FuseNum_Internal&&this.uiWidgetBase) {
			this.text_FuseNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/can_DetailText/text_FuseNum') as mw.TextBlock
		}
		return this.text_FuseNum_Internal
	}
	private text_Fuse_Internal: mw.TextBlock
	public get text_Fuse(): mw.TextBlock {
		if(!this.text_Fuse_Internal&&this.uiWidgetBase) {
			this.text_Fuse_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/can_DetailText/text_Fuse') as mw.TextBlock
		}
		return this.text_Fuse_Internal
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
		
		this.initLanguage(this.mText_Money)
		
	
		this.initLanguage(this.mText_Fuset)
		
	
		this.initLanguage(this.mText_Number)
		
	
		this.initLanguage(this.mText_Love_Probability)
		
	
		this.initLanguage(this.mText_Rainbow_Probability)
		
	
		this.initLanguage(this.mText_Normal_Probability)
		
	
		this.initLanguage(this.mText_Normal)
		
	
		this.initLanguage(this.text_ResetNum)
		
	
		this.initLanguage(this.text_Reset)
		
	
		this.initLanguage(this.text_CumulativeNum)
		
	
		this.initLanguage(this.text_Cumulative)
		
	
		this.initLanguage(this.text_FuseNum)
		
	
		this.initLanguage(this.text_Fuse)
		
	
		//文本多语言
		
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
 