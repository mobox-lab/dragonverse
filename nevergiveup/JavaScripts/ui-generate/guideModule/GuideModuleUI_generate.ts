
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/guideModule/GuideModuleUI.ui')
export default class GuideModuleUI_Generate extends UIScript {
		private mLeftMask_Internal: mw.StaleButton
	public get mLeftMask(): mw.StaleButton {
		if(!this.mLeftMask_Internal&&this.uiWidgetBase) {
			this.mLeftMask_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mLeftMask') as mw.StaleButton
		}
		return this.mLeftMask_Internal
	}
	private mTopMask_Internal: mw.StaleButton
	public get mTopMask(): mw.StaleButton {
		if(!this.mTopMask_Internal&&this.uiWidgetBase) {
			this.mTopMask_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mTopMask') as mw.StaleButton
		}
		return this.mTopMask_Internal
	}
	private mButtomMask_Internal: mw.StaleButton
	public get mButtomMask(): mw.StaleButton {
		if(!this.mButtomMask_Internal&&this.uiWidgetBase) {
			this.mButtomMask_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mButtomMask') as mw.StaleButton
		}
		return this.mButtomMask_Internal
	}
	private mRightMask_Internal: mw.StaleButton
	public get mRightMask(): mw.StaleButton {
		if(!this.mRightMask_Internal&&this.uiWidgetBase) {
			this.mRightMask_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mRightMask') as mw.StaleButton
		}
		return this.mRightMask_Internal
	}
	private mBtn_Internal: mw.StaleButton
	public get mBtn(): mw.StaleButton {
		if(!this.mBtn_Internal&&this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtn') as mw.StaleButton
		}
		return this.mBtn_Internal
	}
	private mBtnHand_Internal: mw.Image
	public get mBtnHand(): mw.Image {
		if(!this.mBtnHand_Internal&&this.uiWidgetBase) {
			this.mBtnHand_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtnHand') as mw.Image
		}
		return this.mBtnHand_Internal
	}
	private mTextHand_Internal: mw.TextBlock
	public get mTextHand(): mw.TextBlock {
		if(!this.mTextHand_Internal&&this.uiWidgetBase) {
			this.mTextHand_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mTextHand') as mw.TextBlock
		}
		return this.mTextHand_Internal
	}



   protected onAwake() {
	   //设置能否每帧触发onUpdate
	   this.canUpdate = false;
	   this.layer = mw.UILayerBottom;
	   this.initButtons();
   }
   protected initButtons() {
	   //按钮添加点击
	   
	   this.mLeftMask.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mLeftMask");
	   })
	   this.initLanguage(this.mLeftMask);
	   this.mLeftMask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mTopMask.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mTopMask");
	   })
	   this.initLanguage(this.mTopMask);
	   this.mTopMask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mButtomMask.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mButtomMask");
	   })
	   this.initLanguage(this.mButtomMask);
	   this.mButtomMask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mRightMask.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mRightMask");
	   })
	   this.initLanguage(this.mRightMask);
	   this.mRightMask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mBtn");
	   })
	   this.initLanguage(this.mBtn);
	   this.mBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   //按钮添加点击
	   

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.mTextHand)
	   
	
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
