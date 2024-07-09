
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Level/StageSelect.ui')
export default class StageSelect_Generate extends UIScript {
		private mContainer_Internal: mw.Canvas
	public get mContainer(): mw.Canvas {
		if(!this.mContainer_Internal&&this.uiWidgetBase) {
			this.mContainer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer') as mw.Canvas
		}
		return this.mContainer_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private bg_1_Internal: mw.Image
	public get bg_1(): mw.Image {
		if(!this.bg_1_Internal&&this.uiWidgetBase) {
			this.bg_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/bg_1') as mw.Image
		}
		return this.bg_1_Internal
	}
	private txt_title_Internal: mw.TextBlock
	public get txt_title(): mw.TextBlock {
		if(!this.txt_title_Internal&&this.uiWidgetBase) {
			this.txt_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/txt_title') as mw.TextBlock
		}
		return this.txt_title_Internal
	}
	private img_lilbg2_Internal: mw.Image
	public get img_lilbg2(): mw.Image {
		if(!this.img_lilbg2_Internal&&this.uiWidgetBase) {
			this.img_lilbg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/img_lilbg2') as mw.Image
		}
		return this.img_lilbg2_Internal
	}
	private mSelectDifficulty_Internal: mw.Canvas
	public get mSelectDifficulty(): mw.Canvas {
		if(!this.mSelectDifficulty_Internal&&this.uiWidgetBase) {
			this.mSelectDifficulty_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/mSelectDifficulty') as mw.Canvas
		}
		return this.mSelectDifficulty_Internal
	}
	private mMonsters_Internal: mw.TextBlock
	public get mMonsters(): mw.TextBlock {
		if(!this.mMonsters_Internal&&this.uiWidgetBase) {
			this.mMonsters_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/mMonsters') as mw.TextBlock
		}
		return this.mMonsters_Internal
	}
	private img_lilbg3_Internal: mw.Image
	public get img_lilbg3(): mw.Image {
		if(!this.img_lilbg3_Internal&&this.uiWidgetBase) {
			this.img_lilbg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/PlayerQueue/img_lilbg3') as mw.Image
		}
		return this.img_lilbg3_Internal
	}
	private vgTextBlock_3_Internal: mw.TextBlock
	public get vgTextBlock_3(): mw.TextBlock {
		if(!this.vgTextBlock_3_Internal&&this.uiWidgetBase) {
			this.vgTextBlock_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/PlayerQueue/vgTextBlock_3') as mw.TextBlock
		}
		return this.vgTextBlock_3_Internal
	}
	private mCountDown_Internal: mw.TextBlock
	public get mCountDown(): mw.TextBlock {
		if(!this.mCountDown_Internal&&this.uiWidgetBase) {
			this.mCountDown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/PlayerQueue/mCountDown') as mw.TextBlock
		}
		return this.mCountDown_Internal
	}
	private mPlayerQueue_Internal: mw.Canvas
	public get mPlayerQueue(): mw.Canvas {
		if(!this.mPlayerQueue_Internal&&this.uiWidgetBase) {
			this.mPlayerQueue_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/PlayerQueue/mPlayerQueue') as mw.Canvas
		}
		return this.mPlayerQueue_Internal
	}
	private mGo_Internal: mw.StaleButton
	public get mGo(): mw.StaleButton {
		if(!this.mGo_Internal&&this.uiWidgetBase) {
			this.mGo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/mGo') as mw.StaleButton
		}
		return this.mGo_Internal
	}
	private img_backg_Internal: mw.Image
	public get img_backg(): mw.Image {
		if(!this.img_backg_Internal&&this.uiWidgetBase) {
			this.img_backg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_1/img_backg') as mw.Image
		}
		return this.img_backg_Internal
	}
	private mMapImage_Internal: mw.Image
	public get mMapImage(): mw.Image {
		if(!this.mMapImage_Internal&&this.uiWidgetBase) {
			this.mMapImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_1/mMapImage') as mw.Image
		}
		return this.mMapImage_Internal
	}
	private mStageName_Internal: mw.TextBlock
	public get mStageName(): mw.TextBlock {
		if(!this.mStageName_Internal&&this.uiWidgetBase) {
			this.mStageName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_1/mStageName') as mw.TextBlock
		}
		return this.mStageName_Internal
	}
	private mClose_Internal: mw.StaleButton
	public get mClose(): mw.StaleButton {
		if(!this.mClose_Internal&&this.uiWidgetBase) {
			this.mClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/mClose') as mw.StaleButton
		}
		return this.mClose_Internal
	}



   protected onAwake() {
	   //设置能否每帧触发onUpdate
	   this.canUpdate = false;
	   this.layer = mw.UILayerBottom;
	   this.initButtons();
   }
   protected initButtons() {
	   //按钮添加点击
	   
	   this.mGo.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mGo");
	   })
	   this.initLanguage(this.mGo);
	   this.mGo.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mClose.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mClose");
	   })
	   this.initLanguage(this.mClose);
	   this.mClose.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   //按钮添加点击
	   

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.txt_title)
	   
	
	   this.initLanguage(this.mMonsters)
	   
	
	   this.initLanguage(this.vgTextBlock_3)
	   
	
	   this.initLanguage(this.mCountDown)
	   
	
	   this.initLanguage(this.mStageName)
	   
	
	   //文本多语言
	   

   }
   private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
	   let call = UIScript.getBehavior("lan");
	   if (call && ui) {
		   call(ui);
	   }
   }
   protected onShow(...params: any[]): void {};

   public show(...param): void {
	   UIService.showUI(this, this.layer, ...param);
   }

   public hide(): void {
	   UIService.hideUI(this);
   }
}
