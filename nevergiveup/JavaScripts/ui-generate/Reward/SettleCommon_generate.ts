
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Reward/SettleCommon.ui')
export default class SettleCommon_Generate extends UIScript {
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
	private rewardText2_Internal: mw.TextBlock
	public get rewardText2(): mw.TextBlock {
		if(!this.rewardText2_Internal&&this.uiWidgetBase) {
			this.rewardText2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rewardText2') as mw.TextBlock
		}
		return this.rewardText2_Internal
	}
	private btnScreen_Internal: mw.Button
	public get btnScreen(): mw.Button {
		if(!this.btnScreen_Internal&&this.uiWidgetBase) {
			this.btnScreen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnScreen') as mw.Button
		}
		return this.btnScreen_Internal
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
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.rewardText1)
	   
	
	   this.initLanguage(this.rewardText2)
	   
	
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
