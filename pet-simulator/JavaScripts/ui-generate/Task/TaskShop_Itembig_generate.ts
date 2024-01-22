
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Task/TaskShop_Itembig.ui')
export default class TaskShop_Itembig_Generate extends UIScript {
		private mPic_Base_Internal: mw.Image
	public get mPic_Base(): mw.Image {
		if(!this.mPic_Base_Internal&&this.uiWidgetBase) {
			this.mPic_Base_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_Base') as mw.Image
		}
		return this.mPic_Base_Internal
	}
	private mCanvas_icon_Internal: mw.Canvas
	public get mCanvas_icon(): mw.Canvas {
		if(!this.mCanvas_icon_Internal&&this.uiWidgetBase) {
			this.mCanvas_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_icon') as mw.Canvas
		}
		return this.mCanvas_icon_Internal
	}
	private mPic_icon_Internal: mw.Image
	public get mPic_icon(): mw.Image {
		if(!this.mPic_icon_Internal&&this.uiWidgetBase) {
			this.mPic_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_icon/mPic_icon') as mw.Image
		}
		return this.mPic_icon_Internal
	}
	private mCanvas_boardinfo_Internal: mw.Canvas
	public get mCanvas_boardinfo(): mw.Canvas {
		if(!this.mCanvas_boardinfo_Internal&&this.uiWidgetBase) {
			this.mCanvas_boardinfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_boardinfo') as mw.Canvas
		}
		return this.mCanvas_boardinfo_Internal
	}
	private mText_info_Internal: mw.TextBlock
	public get mText_info(): mw.TextBlock {
		if(!this.mText_info_Internal&&this.uiWidgetBase) {
			this.mText_info_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_boardinfo/mText_info') as mw.TextBlock
		}
		return this.mText_info_Internal
	}
	private mCanvas_petinfo_Internal: mw.Canvas
	public get mCanvas_petinfo(): mw.Canvas {
		if(!this.mCanvas_petinfo_Internal&&this.uiWidgetBase) {
			this.mCanvas_petinfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_petinfo') as mw.Canvas
		}
		return this.mCanvas_petinfo_Internal
	}
	private mPic_pet1_Internal: mw.Image
	public get mPic_pet1(): mw.Image {
		if(!this.mPic_pet1_Internal&&this.uiWidgetBase) {
			this.mPic_pet1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_petinfo/mPic_pet1') as mw.Image
		}
		return this.mPic_pet1_Internal
	}
	private mPic_pet2_Internal: mw.Image
	public get mPic_pet2(): mw.Image {
		if(!this.mPic_pet2_Internal&&this.uiWidgetBase) {
			this.mPic_pet2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_petinfo/mPic_pet2') as mw.Image
		}
		return this.mPic_pet2_Internal
	}
	private mText_rate1_Internal: mw.TextBlock
	public get mText_rate1(): mw.TextBlock {
		if(!this.mText_rate1_Internal&&this.uiWidgetBase) {
			this.mText_rate1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_petinfo/mText_rate1') as mw.TextBlock
		}
		return this.mText_rate1_Internal
	}
	private mText_rate2_Internal: mw.TextBlock
	public get mText_rate2(): mw.TextBlock {
		if(!this.mText_rate2_Internal&&this.uiWidgetBase) {
			this.mText_rate2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_petinfo/mText_rate2') as mw.TextBlock
		}
		return this.mText_rate2_Internal
	}
	private mText_Price_Internal: mw.TextBlock
	public get mText_Price(): mw.TextBlock {
		if(!this.mText_Price_Internal&&this.uiWidgetBase) {
			this.mText_Price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Price') as mw.TextBlock
		}
		return this.mText_Price_Internal
	}
	private mText_Name_Internal: mw.TextBlock
	public get mText_Name(): mw.TextBlock {
		if(!this.mText_Name_Internal&&this.uiWidgetBase) {
			this.mText_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Name') as mw.TextBlock
		}
		return this.mText_Name_Internal
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
		
		this.initLanguage(this.mText_info)
		
	
		this.initLanguage(this.mText_rate1)
		
	
		this.initLanguage(this.mText_rate2)
		
	
		this.initLanguage(this.mText_Price)
		
	
		this.initLanguage(this.mText_Name)
		
	
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
 