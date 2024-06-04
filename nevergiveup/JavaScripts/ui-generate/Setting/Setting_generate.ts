
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Setting/Setting.ui')
export default class Setting_Generate extends UIScript {
		private closeBtn_Internal: mw.Button
	public get closeBtn(): mw.Button {
		if(!this.closeBtn_Internal&&this.uiWidgetBase) {
			this.closeBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/closeBtn') as mw.Button
		}
		return this.closeBtn_Internal
	}
	private img_fakeEsc_Internal: mw.Image
	public get img_fakeEsc(): mw.Image {
		if(!this.img_fakeEsc_Internal&&this.uiWidgetBase) {
			this.img_fakeEsc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_fakeEsc') as mw.Image
		}
		return this.img_fakeEsc_Internal
	}
	private settingCanvas_Internal: mw.Canvas
	public get settingCanvas(): mw.Canvas {
		if(!this.settingCanvas_Internal&&this.uiWidgetBase) {
			this.settingCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas') as mw.Canvas
		}
		return this.settingCanvas_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private txt_title_Internal: mw.TextBlock
	public get txt_title(): mw.TextBlock {
		if(!this.txt_title_Internal&&this.uiWidgetBase) {
			this.txt_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/txt_title') as mw.TextBlock
		}
		return this.txt_title_Internal
	}
	private txtVoiceBgm_Internal: mw.TextBlock
	public get txtVoiceBgm(): mw.TextBlock {
		if(!this.txtVoiceBgm_Internal&&this.uiWidgetBase) {
			this.txtVoiceBgm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/txtVoiceBgm') as mw.TextBlock
		}
		return this.txtVoiceBgm_Internal
	}
	private txtVoiceAttack_Internal: mw.TextBlock
	public get txtVoiceAttack(): mw.TextBlock {
		if(!this.txtVoiceAttack_Internal&&this.uiWidgetBase) {
			this.txtVoiceAttack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/txtVoiceAttack') as mw.TextBlock
		}
		return this.txtVoiceAttack_Internal
	}
	private chooseCanvasAttack_Internal: mw.Canvas
	public get chooseCanvasAttack(): mw.Canvas {
		if(!this.chooseCanvasAttack_Internal&&this.uiWidgetBase) {
			this.chooseCanvasAttack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasAttack') as mw.Canvas
		}
		return this.chooseCanvasAttack_Internal
	}
	private attackBackground_Internal: mw.Image
	public get attackBackground(): mw.Image {
		if(!this.attackBackground_Internal&&this.uiWidgetBase) {
			this.attackBackground_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasAttack/attackBackground') as mw.Image
		}
		return this.attackBackground_Internal
	}
	private attackSelectTrue_Internal: mw.StaleButton
	public get attackSelectTrue(): mw.StaleButton {
		if(!this.attackSelectTrue_Internal&&this.uiWidgetBase) {
			this.attackSelectTrue_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasAttack/attackSelectTrue') as mw.StaleButton
		}
		return this.attackSelectTrue_Internal
	}
	private attackSelectFalse_Internal: mw.StaleButton
	public get attackSelectFalse(): mw.StaleButton {
		if(!this.attackSelectFalse_Internal&&this.uiWidgetBase) {
			this.attackSelectFalse_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasAttack/attackSelectFalse') as mw.StaleButton
		}
		return this.attackSelectFalse_Internal
	}
	private chooseCanvasVoice_Internal: mw.Canvas
	public get chooseCanvasVoice(): mw.Canvas {
		if(!this.chooseCanvasVoice_Internal&&this.uiWidgetBase) {
			this.chooseCanvasVoice_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasVoice') as mw.Canvas
		}
		return this.chooseCanvasVoice_Internal
	}
	private bgmBackground_Internal: mw.Image
	public get bgmBackground(): mw.Image {
		if(!this.bgmBackground_Internal&&this.uiWidgetBase) {
			this.bgmBackground_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasVoice/bgmBackground') as mw.Image
		}
		return this.bgmBackground_Internal
	}
	private bgmSelectTrue_Internal: mw.StaleButton
	public get bgmSelectTrue(): mw.StaleButton {
		if(!this.bgmSelectTrue_Internal&&this.uiWidgetBase) {
			this.bgmSelectTrue_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasVoice/bgmSelectTrue') as mw.StaleButton
		}
		return this.bgmSelectTrue_Internal
	}
	private bgmSelectFalse_Internal: mw.StaleButton
	public get bgmSelectFalse(): mw.StaleButton {
		if(!this.bgmSelectFalse_Internal&&this.uiWidgetBase) {
			this.bgmSelectFalse_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasVoice/bgmSelectFalse') as mw.StaleButton
		}
		return this.bgmSelectFalse_Internal
	}



   protected onAwake() {
	   //设置能否每帧触发onUpdate
	   this.canUpdate = false;
	   this.layer = mw.UILayerBottom;
	   this.initButtons();
   }
   protected initButtons() {
	   //按钮添加点击
	   
	   this.attackSelectTrue.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "attackSelectTrue");
	   })
	   this.initLanguage(this.attackSelectTrue);
	   this.attackSelectTrue.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.attackSelectFalse.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "attackSelectFalse");
	   })
	   this.initLanguage(this.attackSelectFalse);
	   this.attackSelectFalse.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.bgmSelectTrue.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "bgmSelectTrue");
	   })
	   this.initLanguage(this.bgmSelectTrue);
	   this.bgmSelectTrue.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.bgmSelectFalse.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "bgmSelectFalse");
	   })
	   this.initLanguage(this.bgmSelectFalse);
	   this.bgmSelectFalse.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   //按钮添加点击
	   
	   this.closeBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "closeBtn");
	   })
	   this.closeBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.txt_title)
	   
	
	   this.initLanguage(this.txtVoiceBgm)
	   
	
	   this.initLanguage(this.txtVoiceAttack)
	   
	
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
