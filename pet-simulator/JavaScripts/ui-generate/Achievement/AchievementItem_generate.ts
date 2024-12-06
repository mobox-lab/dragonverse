
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Achievement/AchievementItem.ui')
export default class AchievementItem_Generate extends UIScript {
		private mText_AMdetial_Internal: mw.TextBlock
	public get mText_AMdetial(): mw.TextBlock {
		if(!this.mText_AMdetial_Internal&&this.uiWidgetBase) {
			this.mText_AMdetial_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/DetailCanvas/mText_AMdetial') as mw.TextBlock
		}
		return this.mText_AMdetial_Internal
	}
	private mText_Award_Internal: mw.TextBlock
	public get mText_Award(): mw.TextBlock {
		if(!this.mText_Award_Internal&&this.uiWidgetBase) {
			this.mText_Award_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/DetailCanvas/mText_Award') as mw.TextBlock
		}
		return this.mText_Award_Internal
	}
	private mImage_AwardType_Internal: mw.Image
	public get mImage_AwardType(): mw.Image {
		if(!this.mImage_AwardType_Internal&&this.uiWidgetBase) {
			this.mImage_AwardType_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/DetailCanvas/mImage_AwardType') as mw.Image
		}
		return this.mImage_AwardType_Internal
	}
	private mText_Award2_Internal: mw.TextBlock
	public get mText_Award2(): mw.TextBlock {
		if(!this.mText_Award2_Internal&&this.uiWidgetBase) {
			this.mText_Award2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/DetailCanvas/mText_Award2') as mw.TextBlock
		}
		return this.mText_Award2_Internal
	}
	private mImage_AwardType2_Internal: mw.Image
	public get mImage_AwardType2(): mw.Image {
		if(!this.mImage_AwardType2_Internal&&this.uiWidgetBase) {
			this.mImage_AwardType2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/DetailCanvas/mImage_AwardType2') as mw.Image
		}
		return this.mImage_AwardType2_Internal
	}
	private mImage_GradeBG_Internal: mw.Image
	public get mImage_GradeBG(): mw.Image {
		if(!this.mImage_GradeBG_Internal&&this.uiWidgetBase) {
			this.mImage_GradeBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mImage_GradeBG') as mw.Image
		}
		return this.mImage_GradeBG_Internal
	}
	private mImgProgressBarBg_Internal: mw.Image
	public get mImgProgressBarBg(): mw.Image {
		if(!this.mImgProgressBarBg_Internal&&this.uiWidgetBase) {
			this.mImgProgressBarBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mImgProgressBarBg') as mw.Image
		}
		return this.mImgProgressBarBg_Internal
	}
	private mProgressBar_Internal: mw.ProgressBar
	public get mProgressBar(): mw.ProgressBar {
		if(!this.mProgressBar_Internal&&this.uiWidgetBase) {
			this.mProgressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mProgressBar') as mw.ProgressBar
		}
		return this.mProgressBar_Internal
	}
	private mText_AMname_Internal: mw.TextBlock
	public get mText_AMname(): mw.TextBlock {
		if(!this.mText_AMname_Internal&&this.uiWidgetBase) {
			this.mText_AMname_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_AMname') as mw.TextBlock
		}
		return this.mText_AMname_Internal
	}
	private mText_lording_Internal: mw.TextBlock
	public get mText_lording(): mw.TextBlock {
		if(!this.mText_lording_Internal&&this.uiWidgetBase) {
			this.mText_lording_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_lording') as mw.TextBlock
		}
		return this.mText_lording_Internal
	}
	private mText_Grade_Internal: mw.TextBlock
	public get mText_Grade(): mw.TextBlock {
		if(!this.mText_Grade_Internal&&this.uiWidgetBase) {
			this.mText_Grade_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_Grade') as mw.TextBlock
		}
		return this.mText_Grade_Internal
	}
	private mCanvas_Pointto_Internal: mw.Canvas
	public get mCanvas_Pointto(): mw.Canvas {
		if(!this.mCanvas_Pointto_Internal&&this.uiWidgetBase) {
			this.mCanvas_Pointto_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Pointto') as mw.Canvas
		}
		return this.mCanvas_Pointto_Internal
	}
	private mImage_Point_Internal: mw.Image
	public get mImage_Point(): mw.Image {
		if(!this.mImage_Point_Internal&&this.uiWidgetBase) {
			this.mImage_Point_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Pointto/mImage_Point') as mw.Image
		}
		return this.mImage_Point_Internal
	}
	private mText_NextLevel_Internal: mw.TextBlock
	public get mText_NextLevel(): mw.TextBlock {
		if(!this.mText_NextLevel_Internal&&this.uiWidgetBase) {
			this.mText_NextLevel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Pointto/mText_NextLevel') as mw.TextBlock
		}
		return this.mText_NextLevel_Internal
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
		
		this.initLanguage(this.mText_AMdetial)
		
	
		this.initLanguage(this.mText_Award)
		
	
		this.initLanguage(this.mText_Award2)
		
	
		this.initLanguage(this.mText_AMname)
		
	
		this.initLanguage(this.mText_lording)
		
	
		this.initLanguage(this.mText_Grade)
		
	
		this.initLanguage(this.mText_NextLevel)
		
	
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
 