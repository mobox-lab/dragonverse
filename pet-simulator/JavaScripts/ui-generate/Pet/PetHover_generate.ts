
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Pet/PetHover.ui')
export default class PetHover_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mFrameImg_Internal: mw.Image
	public get mFrameImg(): mw.Image {
		if(!this.mFrameImg_Internal&&this.uiWidgetBase) {
			this.mFrameImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mFrameImg') as mw.Image
		}
		return this.mFrameImg_Internal
	}
	private mNameText_Internal: mw.TextBlock
	public get mNameText(): mw.TextBlock {
		if(!this.mNameText_Internal&&this.uiWidgetBase) {
			this.mNameText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mNameText') as mw.TextBlock
		}
		return this.mNameText_Internal
	}
	private mNiknameText_Internal: mw.TextBlock
	public get mNiknameText(): mw.TextBlock {
		if(!this.mNiknameText_Internal&&this.uiWidgetBase) {
			this.mNiknameText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mNiknameText') as mw.TextBlock
		}
		return this.mNiknameText_Internal
	}
	private mBackImage_Internal: mw.Image
	public get mBackImage(): mw.Image {
		if(!this.mBackImage_Internal&&this.uiWidgetBase) {
			this.mBackImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBackImage') as mw.Image
		}
		return this.mBackImage_Internal
	}
	private mValueText_Internal: mw.TextBlock
	public get mValueText(): mw.TextBlock {
		if(!this.mValueText_Internal&&this.uiWidgetBase) {
			this.mValueText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mValueText') as mw.TextBlock
		}
		return this.mValueText_Internal
	}
	private mQualityText_Internal: mw.TextBlock
	public get mQualityText(): mw.TextBlock {
		if(!this.mQualityText_Internal&&this.uiWidgetBase) {
			this.mQualityText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mQualityText') as mw.TextBlock
		}
		return this.mQualityText_Internal
	}
	private mImage_Internal: mw.Image
	public get mImage(): mw.Image {
		if(!this.mImage_Internal&&this.uiWidgetBase) {
			this.mImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImage') as mw.Image
		}
		return this.mImage_Internal
	}
	private mPic_SpecialTips_Internal: mw.Image
	public get mPic_SpecialTips(): mw.Image {
		if(!this.mPic_SpecialTips_Internal&&this.uiWidgetBase) {
			this.mPic_SpecialTips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mPic_SpecialTips') as mw.Image
		}
		return this.mPic_SpecialTips_Internal
	}
	private mBuffText_1_Internal: mw.TextBlock
	public get mBuffText_1(): mw.TextBlock {
		if(!this.mBuffText_1_Internal&&this.uiWidgetBase) {
			this.mBuffText_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBuffText_1') as mw.TextBlock
		}
		return this.mBuffText_1_Internal
	}
	private mText_SpecialTips_Internal: mw.TextBlock
	public get mText_SpecialTips(): mw.TextBlock {
		if(!this.mText_SpecialTips_Internal&&this.uiWidgetBase) {
			this.mText_SpecialTips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_SpecialTips') as mw.TextBlock
		}
		return this.mText_SpecialTips_Internal
	}
	private mBuffText_2_Internal: mw.TextBlock
	public get mBuffText_2(): mw.TextBlock {
		if(!this.mBuffText_2_Internal&&this.uiWidgetBase) {
			this.mBuffText_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBuffText_2') as mw.TextBlock
		}
		return this.mBuffText_2_Internal
	}
	private mBuffText_3_Internal: mw.TextBlock
	public get mBuffText_3(): mw.TextBlock {
		if(!this.mBuffText_3_Internal&&this.uiWidgetBase) {
			this.mBuffText_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBuffText_3') as mw.TextBlock
		}
		return this.mBuffText_3_Internal
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
		
		this.initLanguage(this.mNameText)
		
	
		this.initLanguage(this.mNiknameText)
		
	
		this.initLanguage(this.mValueText)
		
	
		this.initLanguage(this.mQualityText)
		
	
		this.initLanguage(this.mBuffText_1)
		
	
		this.initLanguage(this.mText_SpecialTips)
		
	
		this.initLanguage(this.mBuffText_2)
		
	
		this.initLanguage(this.mBuffText_3)
		
	
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
 