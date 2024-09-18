
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Reward/SettleCommon.ui')
export default class SettleCommon_Generate extends UIScript {
		private btnScreen_Internal: mw.Button
	public get btnScreen(): mw.Button {
		if(!this.btnScreen_Internal&&this.uiWidgetBase) {
			this.btnScreen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnScreen') as mw.Button
		}
		return this.btnScreen_Internal
	}
	private enUI_1_Internal: mw.Image
	public get enUI_1(): mw.Image {
		if(!this.enUI_1_Internal&&this.uiWidgetBase) {
			this.enUI_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/enUI_1') as mw.Image
		}
		return this.enUI_1_Internal
	}
	private rewardText1_Internal: mw.TextBlock
	public get rewardText1(): mw.TextBlock {
		if(!this.rewardText1_Internal&&this.uiWidgetBase) {
			this.rewardText1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rewardText1') as mw.TextBlock
		}
		return this.rewardText1_Internal
	}
	private rewardImg_Internal: mw.Image
	public get rewardImg(): mw.Image {
		if(!this.rewardImg_Internal&&this.uiWidgetBase) {
			this.rewardImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rewardImg') as mw.Image
		}
		return this.rewardImg_Internal
	}
	private btnConfirm_Internal: mw.Button
	public get btnConfirm(): mw.Button {
		if(!this.btnConfirm_Internal&&this.uiWidgetBase) {
			this.btnConfirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnConfirm') as mw.Button
		}
		return this.btnConfirm_Internal
	}
	private textConfirm_Internal: mw.TextBlock
	public get textConfirm(): mw.TextBlock {
		if(!this.textConfirm_Internal&&this.uiWidgetBase) {
			this.textConfirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textConfirm') as mw.TextBlock
		}
		return this.textConfirm_Internal
	}
	private mCommon_Internal: mw.Canvas
	public get mCommon(): mw.Canvas {
		if(!this.mCommon_Internal&&this.uiWidgetBase) {
			this.mCommon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCommon') as mw.Canvas
		}
		return this.mCommon_Internal
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
	   
	   this.btnScreen.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btnScreen");
	   })
	   this.btnScreen.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.btnConfirm.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btnConfirm");
	   })
	   this.btnConfirm.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.rewardText1)
	   
	
	   this.initLanguage(this.textConfirm)
	   
	
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
