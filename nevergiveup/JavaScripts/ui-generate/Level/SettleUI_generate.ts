
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Level/SettleUI.ui')
export default class SettleUI_Generate extends UIScript {
		private mBtn_Mask_Internal: mw.Button
	public get mBtn_Mask(): mw.Button {
		if(!this.mBtn_Mask_Internal&&this.uiWidgetBase) {
			this.mBtn_Mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Mask') as mw.Button
		}
		return this.mBtn_Mask_Internal
	}
	private mSettle_Internal: mw.Canvas
	public get mSettle(): mw.Canvas {
		if(!this.mSettle_Internal&&this.uiWidgetBase) {
			this.mSettle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle') as mw.Canvas
		}
		return this.mSettle_Internal
	}
	private mResult_Internal: mw.Canvas
	public get mResult(): mw.Canvas {
		if(!this.mResult_Internal&&this.uiWidgetBase) {
			this.mResult_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult') as mw.Canvas
		}
		return this.mResult_Internal
	}
	private canvas_win_Internal: mw.Canvas
	public get canvas_win(): mw.Canvas {
		if(!this.canvas_win_Internal&&this.uiWidgetBase) {
			this.canvas_win_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult/canvas_win') as mw.Canvas
		}
		return this.canvas_win_Internal
	}
	private resultWin_Internal: mw.Image
	public get resultWin(): mw.Image {
		if(!this.resultWin_Internal&&this.uiWidgetBase) {
			this.resultWin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult/canvas_win/resultWin') as mw.Image
		}
		return this.resultWin_Internal
	}
	private img_star_Internal: mw.Image
	public get img_star(): mw.Image {
		if(!this.img_star_Internal&&this.uiWidgetBase) {
			this.img_star_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult/canvas_win/img_star') as mw.Image
		}
		return this.img_star_Internal
	}
	private img_lilbg2_Internal: mw.Image
	public get img_lilbg2(): mw.Image {
		if(!this.img_lilbg2_Internal&&this.uiWidgetBase) {
			this.img_lilbg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult/canvas_win/img_lilbg2') as mw.Image
		}
		return this.img_lilbg2_Internal
	}
	private canvas_TotalWin_Internal: mw.Canvas
	public get canvas_TotalWin(): mw.Canvas {
		if(!this.canvas_TotalWin_Internal&&this.uiWidgetBase) {
			this.canvas_TotalWin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult/canvas_TotalWin') as mw.Canvas
		}
		return this.canvas_TotalWin_Internal
	}
	private resultPerfectWin_Internal: mw.Image
	public get resultPerfectWin(): mw.Image {
		if(!this.resultPerfectWin_Internal&&this.uiWidgetBase) {
			this.resultPerfectWin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult/canvas_TotalWin/resultPerfectWin') as mw.Image
		}
		return this.resultPerfectWin_Internal
	}
	private img_diamond1_Internal: mw.Image
	public get img_diamond1(): mw.Image {
		if(!this.img_diamond1_Internal&&this.uiWidgetBase) {
			this.img_diamond1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult/canvas_TotalWin/img_diamond1') as mw.Image
		}
		return this.img_diamond1_Internal
	}
	private img_diamond2_Internal: mw.Image
	public get img_diamond2(): mw.Image {
		if(!this.img_diamond2_Internal&&this.uiWidgetBase) {
			this.img_diamond2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult/canvas_TotalWin/img_diamond2') as mw.Image
		}
		return this.img_diamond2_Internal
	}
	private img_lilbg3_Internal: mw.Image
	public get img_lilbg3(): mw.Image {
		if(!this.img_lilbg3_Internal&&this.uiWidgetBase) {
			this.img_lilbg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult/canvas_TotalWin/img_lilbg3') as mw.Image
		}
		return this.img_lilbg3_Internal
	}
	private canvas_lose_Internal: mw.Canvas
	public get canvas_lose(): mw.Canvas {
		if(!this.canvas_lose_Internal&&this.uiWidgetBase) {
			this.canvas_lose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult/canvas_lose') as mw.Canvas
		}
		return this.canvas_lose_Internal
	}
	private resultLose_Internal: mw.Image
	public get resultLose(): mw.Image {
		if(!this.resultLose_Internal&&this.uiWidgetBase) {
			this.resultLose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult/canvas_lose/resultLose') as mw.Image
		}
		return this.resultLose_Internal
	}
	private img_skull_Internal: mw.Image
	public get img_skull(): mw.Image {
		if(!this.img_skull_Internal&&this.uiWidgetBase) {
			this.img_skull_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult/canvas_lose/img_skull') as mw.Image
		}
		return this.img_skull_Internal
	}
	private img_skull2_Internal: mw.Image
	public get img_skull2(): mw.Image {
		if(!this.img_skull2_Internal&&this.uiWidgetBase) {
			this.img_skull2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult/canvas_lose/img_skull2') as mw.Image
		}
		return this.img_skull2_Internal
	}
	private img_lilbg4_Internal: mw.Image
	public get img_lilbg4(): mw.Image {
		if(!this.img_lilbg4_Internal&&this.uiWidgetBase) {
			this.img_lilbg4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult/canvas_lose/img_lilbg4') as mw.Image
		}
		return this.img_lilbg4_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private mResultTxt_Internal: mw.TextBlock
	public get mResultTxt(): mw.TextBlock {
		if(!this.mResultTxt_Internal&&this.uiWidgetBase) {
			this.mResultTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mResult/mResultTxt') as mw.TextBlock
		}
		return this.mResultTxt_Internal
	}
	private mCanvas_ItemDetails_Internal: mw.Canvas
	public get mCanvas_ItemDetails(): mw.Canvas {
		if(!this.mCanvas_ItemDetails_Internal&&this.uiWidgetBase) {
			this.mCanvas_ItemDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mCanvas_ItemDetails') as mw.Canvas
		}
		return this.mCanvas_ItemDetails_Internal
	}
	private img_lilbg5_Internal: mw.Image
	public get img_lilbg5(): mw.Image {
		if(!this.img_lilbg5_Internal&&this.uiWidgetBase) {
			this.img_lilbg5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mCanvas_ItemDetails/img_lilbg5') as mw.Image
		}
		return this.img_lilbg5_Internal
	}
	private mTimeTaken_Internal: mw.TextBlock
	public get mTimeTaken(): mw.TextBlock {
		if(!this.mTimeTaken_Internal&&this.uiWidgetBase) {
			this.mTimeTaken_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mCanvas_ItemDetails/mTimeTaken') as mw.TextBlock
		}
		return this.mTimeTaken_Internal
	}
	private mWaves_Internal: mw.TextBlock
	public get mWaves(): mw.TextBlock {
		if(!this.mWaves_Internal&&this.uiWidgetBase) {
			this.mWaves_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mCanvas_ItemDetails/mWaves') as mw.TextBlock
		}
		return this.mWaves_Internal
	}
	private mRewards_Internal: mw.TextBlock
	public get mRewards(): mw.TextBlock {
		if(!this.mRewards_Internal&&this.uiWidgetBase) {
			this.mRewards_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mCanvas_ItemDetails/mRewards') as mw.TextBlock
		}
		return this.mRewards_Internal
	}
	private rewardImg_Internal: mw.Image
	public get rewardImg(): mw.Image {
		if(!this.rewardImg_Internal&&this.uiWidgetBase) {
			this.rewardImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mCanvas_ItemDetails/rewardImg') as mw.Image
		}
		return this.rewardImg_Internal
	}
	private mRewardContainer_Internal: mw.Canvas
	public get mRewardContainer(): mw.Canvas {
		if(!this.mRewardContainer_Internal&&this.uiWidgetBase) {
			this.mRewardContainer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mCanvas_ItemDetails/mRewardContainer') as mw.Canvas
		}
		return this.mRewardContainer_Internal
	}
	private mCanvas_InfiniteDetails_Internal: mw.Canvas
	public get mCanvas_InfiniteDetails(): mw.Canvas {
		if(!this.mCanvas_InfiniteDetails_Internal&&this.uiWidgetBase) {
			this.mCanvas_InfiniteDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mCanvas_InfiniteDetails') as mw.Canvas
		}
		return this.mCanvas_InfiniteDetails_Internal
	}
	private mInfiniteWaves_Internal: mw.TextBlock
	public get mInfiniteWaves(): mw.TextBlock {
		if(!this.mInfiniteWaves_Internal&&this.uiWidgetBase) {
			this.mInfiniteWaves_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mCanvas_InfiniteDetails/mInfiniteWaves') as mw.TextBlock
		}
		return this.mInfiniteWaves_Internal
	}
	private mCanvas_BtnBottom_Internal: mw.Canvas
	public get mCanvas_BtnBottom(): mw.Canvas {
		if(!this.mCanvas_BtnBottom_Internal&&this.uiWidgetBase) {
			this.mCanvas_BtnBottom_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mCanvas_BtnBottom') as mw.Canvas
		}
		return this.mCanvas_BtnBottom_Internal
	}
	private mCanvas_Btn_Mint_Internal: mw.Canvas
	public get mCanvas_Btn_Mint(): mw.Canvas {
		if(!this.mCanvas_Btn_Mint_Internal&&this.uiWidgetBase) {
			this.mCanvas_Btn_Mint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mCanvas_BtnBottom/mCanvas_Btn_Mint') as mw.Canvas
		}
		return this.mCanvas_Btn_Mint_Internal
	}
	private mBack_Internal: mw.Button
	public get mBack(): mw.Button {
		if(!this.mBack_Internal&&this.uiWidgetBase) {
			this.mBack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mCanvas_BtnBottom/mCanvas_Btn_Mint/mBack') as mw.Button
		}
		return this.mBack_Internal
	}
	private mTxt_Btn_Mint_Internal: mw.TextBlock
	public get mTxt_Btn_Mint(): mw.TextBlock {
		if(!this.mTxt_Btn_Mint_Internal&&this.uiWidgetBase) {
			this.mTxt_Btn_Mint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSettle/mCanvas_BtnBottom/mCanvas_Btn_Mint/mBack/mTxt_Btn_Mint') as mw.TextBlock
		}
		return this.mTxt_Btn_Mint_Internal
	}



   protected onAwake() {
	   //设置能否每帧触发onUpdate
	   this.canUpdate = false;
	   this.layer = mw.UILayerBottom;
	   this.initButtons();
   }
   protected initButtons() {
	   //按钮添加点击
	   
	   //按钮添加点击
	   
	   this.mBtn_Mask.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mBtn_Mask");
	   })
	   this.mBtn_Mask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mBack.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mBack");
	   })
	   this.mBack.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.mResultTxt)
	   
	
	   this.initLanguage(this.mTimeTaken)
	   
	
	   this.initLanguage(this.mWaves)
	   
	
	   this.initLanguage(this.mRewards)
	   
	
	   this.initLanguage(this.mInfiniteWaves)
	   
	
	   this.initLanguage(this.mTxt_Btn_Mint)
	   
	
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
