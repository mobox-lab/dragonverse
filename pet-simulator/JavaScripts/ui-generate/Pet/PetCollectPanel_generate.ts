
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Pet/PetCollectPanel.ui')
export default class PetCollectPanel_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mProgressCanvas_Internal: mw.Canvas
	public get mProgressCanvas(): mw.Canvas {
		if(!this.mProgressCanvas_Internal&&this.uiWidgetBase) {
			this.mProgressCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mProgressCanvas') as mw.Canvas
		}
		return this.mProgressCanvas_Internal
	}
	private mbar_hp_Internal: mw.ProgressBar
	public get mbar_hp(): mw.ProgressBar {
		if(!this.mbar_hp_Internal&&this.uiWidgetBase) {
			this.mbar_hp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mProgressCanvas/mbar_hp') as mw.ProgressBar
		}
		return this.mbar_hp_Internal
	}
	private mHasText_Internal: mw.TextBlock
	public get mHasText(): mw.TextBlock {
		if(!this.mHasText_Internal&&this.uiWidgetBase) {
			this.mHasText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mProgressCanvas/mHasText') as mw.TextBlock
		}
		return this.mHasText_Internal
	}
	private mALLText_Internal: mw.TextBlock
	public get mALLText(): mw.TextBlock {
		if(!this.mALLText_Internal&&this.uiWidgetBase) {
			this.mALLText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mProgressCanvas/mALLText') as mw.TextBlock
		}
		return this.mALLText_Internal
	}
	private mText_level_Internal: mw.TextBlock
	public get mText_level(): mw.TextBlock {
		if(!this.mText_level_Internal&&this.uiWidgetBase) {
			this.mText_level_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mProgressCanvas/mText_level') as mw.TextBlock
		}
		return this.mText_level_Internal
	}
	private mText_Get_Internal: mw.TextBlock
	public get mText_Get(): mw.TextBlock {
		if(!this.mText_Get_Internal&&this.uiWidgetBase) {
			this.mText_Get_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mProgressCanvas/mText_Get') as mw.TextBlock
		}
		return this.mText_Get_Internal
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
	private mBtn_unlock_Internal: mw.Button
	public get mBtn_unlock(): mw.Button {
		if(!this.mBtn_unlock_Internal&&this.uiWidgetBase) {
			this.mBtn_unlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBtn_unlock') as mw.Button
		}
		return this.mBtn_unlock_Internal
	}
	private mCloseBtn_Internal: mw.Button
	public get mCloseBtn(): mw.Button {
		if(!this.mCloseBtn_Internal&&this.uiWidgetBase) {
			this.mCloseBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCloseBtn') as mw.Button
		}
		return this.mCloseBtn_Internal
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
		
		this.mBtn_unlock.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_unlock");
		})
		this.mBtn_unlock.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseBtn");
		})
		this.mCloseBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mHasText)
		
	
		this.initLanguage(this.mALLText)
		
	
		this.initLanguage(this.mText_level)
		
	
		this.initLanguage(this.mText_Get)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock_Top") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mBtn_unlock/TextBlock") as any);
		
	

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
 