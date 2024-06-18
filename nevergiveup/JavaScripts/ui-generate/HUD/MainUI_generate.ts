
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/HUD/MainUI.ui')
export default class MainUI_Generate extends UIScript {
		private mHpBar_Internal: mw.ProgressBar
	public get mHpBar(): mw.ProgressBar {
		if(!this.mHpBar_Internal&&this.uiWidgetBase) {
			this.mHpBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mHpBar') as mw.ProgressBar
		}
		return this.mHpBar_Internal
	}
	private img_BG_1_Internal: mw.Image
	public get img_BG_1(): mw.Image {
		if(!this.img_BG_1_Internal&&this.uiWidgetBase) {
			this.img_BG_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/img_BG_1') as mw.Image
		}
		return this.img_BG_1_Internal
	}
	private mHp_Internal: mw.TextBlock
	public get mHp(): mw.TextBlock {
		if(!this.mHp_Internal&&this.uiWidgetBase) {
			this.mHp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mHp') as mw.TextBlock
		}
		return this.mHp_Internal
	}
	private mWait_Internal: mw.TextBlock
	public get mWait(): mw.TextBlock {
		if(!this.mWait_Internal&&this.uiWidgetBase) {
			this.mWait_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_2/mWait') as mw.TextBlock
		}
		return this.mWait_Internal
	}
	private mWave_Internal: mw.TextBlock
	public get mWave(): mw.TextBlock {
		if(!this.mWave_Internal&&this.uiWidgetBase) {
			this.mWave_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_2/mWave') as mw.TextBlock
		}
		return this.mWave_Internal
	}
	private mTimer_Internal: mw.TextBlock
	public get mTimer(): mw.TextBlock {
		if(!this.mTimer_Internal&&this.uiWidgetBase) {
			this.mTimer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_2/mTimer') as mw.TextBlock
		}
		return this.mTimer_Internal
	}
	private mBossContainer_Internal: mw.Canvas
	public get mBossContainer(): mw.Canvas {
		if(!this.mBossContainer_Internal&&this.uiWidgetBase) {
			this.mBossContainer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBossContainer') as mw.Canvas
		}
		return this.mBossContainer_Internal
	}
	private mBossHP_Internal: mw.ProgressBar
	public get mBossHP(): mw.ProgressBar {
		if(!this.mBossHP_Internal&&this.uiWidgetBase) {
			this.mBossHP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBossContainer/mBossHP') as mw.ProgressBar
		}
		return this.mBossHP_Internal
	}
	private mBossInfo_Internal: mw.TextBlock
	public get mBossInfo(): mw.TextBlock {
		if(!this.mBossInfo_Internal&&this.uiWidgetBase) {
			this.mBossInfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBossContainer/mBossInfo') as mw.TextBlock
		}
		return this.mBossInfo_Internal
	}
	private img_BG_Internal: mw.Image
	public get img_BG(): mw.Image {
		if(!this.img_BG_Internal&&this.uiWidgetBase) {
			this.img_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBossContainer/img_BG') as mw.Image
		}
		return this.img_BG_Internal
	}
	private towerCanvas_Internal: mw.Canvas
	public get towerCanvas(): mw.Canvas {
		if(!this.towerCanvas_Internal&&this.uiWidgetBase) {
			this.towerCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/towerCanvas') as mw.Canvas
		}
		return this.towerCanvas_Internal
	}
	private towerTxt_Internal: mw.TextBlock
	public get towerTxt(): mw.TextBlock {
		if(!this.towerTxt_Internal&&this.uiWidgetBase) {
			this.towerTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/towerCanvas/towerTxt') as mw.TextBlock
		}
		return this.towerTxt_Internal
	}
	private goldCanvas_Internal: mw.Canvas
	public get goldCanvas(): mw.Canvas {
		if(!this.goldCanvas_Internal&&this.uiWidgetBase) {
			this.goldCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/goldCanvas') as mw.Canvas
		}
		return this.goldCanvas_Internal
	}
	private goldImg_Internal: mw.Image
	public get goldImg(): mw.Image {
		if(!this.goldImg_Internal&&this.uiWidgetBase) {
			this.goldImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/goldCanvas/goldImg') as mw.Image
		}
		return this.goldImg_Internal
	}
	private goldTxt_Internal: mw.TextBlock
	public get goldTxt(): mw.TextBlock {
		if(!this.goldTxt_Internal&&this.uiWidgetBase) {
			this.goldTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/goldCanvas/goldTxt') as mw.TextBlock
		}
		return this.goldTxt_Internal
	}
	private mSkipWave_Internal: mw.Canvas
	public get mSkipWave(): mw.Canvas {
		if(!this.mSkipWave_Internal&&this.uiWidgetBase) {
			this.mSkipWave_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkipWave') as mw.Canvas
		}
		return this.mSkipWave_Internal
	}
	private mNotSkipCanvas_Internal: mw.Canvas
	public get mNotSkipCanvas(): mw.Canvas {
		if(!this.mNotSkipCanvas_Internal&&this.uiWidgetBase) {
			this.mNotSkipCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkipWave/mNotSkipCanvas') as mw.Canvas
		}
		return this.mNotSkipCanvas_Internal
	}
	private mNotSkip_Internal: mw.Button
	public get mNotSkip(): mw.Button {
		if(!this.mNotSkip_Internal&&this.uiWidgetBase) {
			this.mNotSkip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkipWave/mNotSkipCanvas/mNotSkip') as mw.Button
		}
		return this.mNotSkip_Internal
	}
	private mSkipCanvas_Internal: mw.Canvas
	public get mSkipCanvas(): mw.Canvas {
		if(!this.mSkipCanvas_Internal&&this.uiWidgetBase) {
			this.mSkipCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkipWave/mSkipCanvas') as mw.Canvas
		}
		return this.mSkipCanvas_Internal
	}
	private mSkip_Internal: mw.Button
	public get mSkip(): mw.Button {
		if(!this.mSkip_Internal&&this.uiWidgetBase) {
			this.mSkip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkipWave/mSkipCanvas/mSkip') as mw.Button
		}
		return this.mSkip_Internal
	}
	private plTextBlock_Internal: mw.TextBlock
	public get plTextBlock(): mw.TextBlock {
		if(!this.plTextBlock_Internal&&this.uiWidgetBase) {
			this.plTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkipWave/plTextBlock') as mw.TextBlock
		}
		return this.plTextBlock_Internal
	}
	private mSkipCount_Internal: mw.TextBlock
	public get mSkipCount(): mw.TextBlock {
		if(!this.mSkipCount_Internal&&this.uiWidgetBase) {
			this.mSkipCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkipWave/mSkipCount') as mw.TextBlock
		}
		return this.mSkipCount_Internal
	}
	private mSpeedControl_Internal: mw.Canvas
	public get mSpeedControl(): mw.Canvas {
		if(!this.mSpeedControl_Internal&&this.uiWidgetBase) {
			this.mSpeedControl_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSpeedControl') as mw.Canvas
		}
		return this.mSpeedControl_Internal
	}
	private canvas_dec_Internal: mw.Canvas
	public get canvas_dec(): mw.Canvas {
		if(!this.canvas_dec_Internal&&this.uiWidgetBase) {
			this.canvas_dec_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSpeedControl/canvas_dec') as mw.Canvas
		}
		return this.canvas_dec_Internal
	}
	private mPause_Internal: mw.Button
	public get mPause(): mw.Button {
		if(!this.mPause_Internal&&this.uiWidgetBase) {
			this.mPause_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSpeedControl/Canvas_3/mPause') as mw.Button
		}
		return this.mPause_Internal
	}
	private mPlay_Internal: mw.Button
	public get mPlay(): mw.Button {
		if(!this.mPlay_Internal&&this.uiWidgetBase) {
			this.mPlay_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSpeedControl/Canvas_3/mPlay') as mw.Button
		}
		return this.mPlay_Internal
	}
	private mSpeeddown_Internal: mw.Button
	public get mSpeeddown(): mw.Button {
		if(!this.mSpeeddown_Internal&&this.uiWidgetBase) {
			this.mSpeeddown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSpeedControl/Canvas_3/mSpeeddown') as mw.Button
		}
		return this.mSpeeddown_Internal
	}
	private mSpeedUp_Internal: mw.Button
	public get mSpeedUp(): mw.Button {
		if(!this.mSpeedUp_Internal&&this.uiWidgetBase) {
			this.mSpeedUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSpeedControl/Canvas_3/mSpeedUp') as mw.Button
		}
		return this.mSpeedUp_Internal
	}
	private mSpeed_Internal: mw.TextBlock
	public get mSpeed(): mw.TextBlock {
		if(!this.mSpeed_Internal&&this.uiWidgetBase) {
			this.mSpeed_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSpeedControl/Canvas_3/mSpeed') as mw.TextBlock
		}
		return this.mSpeed_Internal
	}
	private bagCanvas_Internal: mw.Canvas
	public get bagCanvas(): mw.Canvas {
		if(!this.bagCanvas_Internal&&this.uiWidgetBase) {
			this.bagCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bagCanvas') as mw.Canvas
		}
		return this.bagCanvas_Internal
	}
	private towerBg_Internal: mw.Image
	public get towerBg(): mw.Image {
		if(!this.towerBg_Internal&&this.uiWidgetBase) {
			this.towerBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bagCanvas/towerBg') as mw.Image
		}
		return this.towerBg_Internal
	}
	private towerItemCanvas_Internal: mw.Canvas
	public get towerItemCanvas(): mw.Canvas {
		if(!this.towerItemCanvas_Internal&&this.uiWidgetBase) {
			this.towerItemCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bagCanvas/towerItemCanvas') as mw.Canvas
		}
		return this.towerItemCanvas_Internal
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
	   
	   this.mNotSkip.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mNotSkip");
	   })
	   this.mNotSkip.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mSkip.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mSkip");
	   })
	   this.mSkip.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mPause.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mPause");
	   })
	   this.mPause.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mPlay.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mPlay");
	   })
	   this.mPlay.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mSpeeddown.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mSpeeddown");
	   })
	   this.mSpeeddown.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mSpeedUp.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mSpeedUp");
	   })
	   this.mSpeedUp.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.mHp)
	   
	
	   this.initLanguage(this.mWait)
	   
	
	   this.initLanguage(this.mWave)
	   
	
	   this.initLanguage(this.mTimer)
	   
	
	   this.initLanguage(this.mBossInfo)
	   
	
	   this.initLanguage(this.towerTxt)
	   
	
	   this.initLanguage(this.goldTxt)
	   
	
	   this.initLanguage(this.plTextBlock)
	   
	
	   this.initLanguage(this.mSkipCount)
	   
	
	   this.initLanguage(this.mSpeed)
	   
	
	   //文本多语言
	   
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSpeedControl/Canvas_3/mPause/TextBlock_1") as any);
	   
	

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
