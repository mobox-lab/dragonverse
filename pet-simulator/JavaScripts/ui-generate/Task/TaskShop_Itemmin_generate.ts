
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Task/TaskShop_Itemmin.ui')
export default class TaskShop_Itemmin_Generate extends UIScript {
		private mPic_Base_Internal: mw.Image
	public get mPic_Base(): mw.Image {
		if(!this.mPic_Base_Internal&&this.uiWidgetBase) {
			this.mPic_Base_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_Base') as mw.Image
		}
		return this.mPic_Base_Internal
	}
	private mText_Name_Internal: mw.TextBlock
	public get mText_Name(): mw.TextBlock {
		if(!this.mText_Name_Internal&&this.uiWidgetBase) {
			this.mText_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Name') as mw.TextBlock
		}
		return this.mText_Name_Internal
	}
	private mText_Info_Internal: mw.TextBlock
	public get mText_Info(): mw.TextBlock {
		if(!this.mText_Info_Internal&&this.uiWidgetBase) {
			this.mText_Info_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Info') as mw.TextBlock
		}
		return this.mText_Info_Internal
	}
	private mText_Price_Internal: mw.TextBlock
	public get mText_Price(): mw.TextBlock {
		if(!this.mText_Price_Internal&&this.uiWidgetBase) {
			this.mText_Price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Price') as mw.TextBlock
		}
		return this.mText_Price_Internal
	}
	private mBtn_Internal: mw.Button
	public get mBtn(): mw.Button {
		if(!this.mBtn_Internal&&this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn') as mw.Button
		}
		return this.mBtn_Internal
	}
	private mCanvas_undo_Internal: mw.Canvas
	public get mCanvas_undo(): mw.Canvas {
		if(!this.mCanvas_undo_Internal&&this.uiWidgetBase) {
			this.mCanvas_undo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_undo') as mw.Canvas
		}
		return this.mCanvas_undo_Internal
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
		
		this.mBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn");
		})
		this.mBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Name)
		
	
		this.initLanguage(this.mText_Info)
		
	
		this.initLanguage(this.mText_Price)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_undo/TextBlock") as any);
		
	

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
 