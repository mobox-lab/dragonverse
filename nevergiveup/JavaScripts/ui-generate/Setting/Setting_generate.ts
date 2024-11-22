
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
	private imgBackground_1_Internal: mw.Image
	public get imgBackground_1(): mw.Image {
		if(!this.imgBackground_1_Internal&&this.uiWidgetBase) {
			this.imgBackground_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/imgBackground_1') as mw.Image
		}
		return this.imgBackground_1_Internal
	}
	private imgBackground_1_1_Internal: mw.Image
	public get imgBackground_1_1(): mw.Image {
		if(!this.imgBackground_1_1_Internal&&this.uiWidgetBase) {
			this.imgBackground_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/imgBackground_1_1') as mw.Image
		}
		return this.imgBackground_1_1_Internal
	}
	private imgTitle_Internal: mw.Image
	public get imgTitle(): mw.Image {
		if(!this.imgTitle_Internal&&this.uiWidgetBase) {
			this.imgTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/imgTitle') as mw.Image
		}
		return this.imgTitle_Internal
	}
	private imgVoice_Internal: mw.Image
	public get imgVoice(): mw.Image {
		if(!this.imgVoice_Internal&&this.uiWidgetBase) {
			this.imgVoice_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/imgVoice') as mw.Image
		}
		return this.imgVoice_Internal
	}
	private imgCamera_Internal: mw.Image
	public get imgCamera(): mw.Image {
		if(!this.imgCamera_Internal&&this.uiWidgetBase) {
			this.imgCamera_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/imgCamera') as mw.Image
		}
		return this.imgCamera_Internal
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
	private txtVoiceAttack_1_Internal: mw.TextBlock
	public get txtVoiceAttack_1(): mw.TextBlock {
		if(!this.txtVoiceAttack_1_Internal&&this.uiWidgetBase) {
			this.txtVoiceAttack_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/txtVoiceAttack_1') as mw.TextBlock
		}
		return this.txtVoiceAttack_1_Internal
	}
	private txtProgressLow_Internal: mw.TextBlock
	public get txtProgressLow(): mw.TextBlock {
		if(!this.txtProgressLow_Internal&&this.uiWidgetBase) {
			this.txtProgressLow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/txtProgressLow') as mw.TextBlock
		}
		return this.txtProgressLow_Internal
	}
	private txtProgressHigh_Internal: mw.TextBlock
	public get txtProgressHigh(): mw.TextBlock {
		if(!this.txtProgressHigh_Internal&&this.uiWidgetBase) {
			this.txtProgressHigh_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/txtProgressHigh') as mw.TextBlock
		}
		return this.txtProgressHigh_Internal
	}
	private txtSFXAttack_Internal: mw.TextBlock
	public get txtSFXAttack(): mw.TextBlock {
		if(!this.txtSFXAttack_Internal&&this.uiWidgetBase) {
			this.txtSFXAttack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/txtSFXAttack') as mw.TextBlock
		}
		return this.txtSFXAttack_Internal
	}
	private img_fakeEsc_Internal: mw.Image
	public get img_fakeEsc(): mw.Image {
		if(!this.img_fakeEsc_Internal&&this.uiWidgetBase) {
			this.img_fakeEsc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/img_fakeEsc') as mw.Image
		}
		return this.img_fakeEsc_Internal
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
	private txtVoiceOn_Internal: mw.TextBlock
	public get txtVoiceOn(): mw.TextBlock {
		if(!this.txtVoiceOn_Internal&&this.uiWidgetBase) {
			this.txtVoiceOn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasVoice/txtVoiceOn') as mw.TextBlock
		}
		return this.txtVoiceOn_Internal
	}
	private bgmSelectFalse_Internal: mw.StaleButton
	public get bgmSelectFalse(): mw.StaleButton {
		if(!this.bgmSelectFalse_Internal&&this.uiWidgetBase) {
			this.bgmSelectFalse_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasVoice/bgmSelectFalse') as mw.StaleButton
		}
		return this.bgmSelectFalse_Internal
	}
	private txtVoiceOff_Internal: mw.TextBlock
	public get txtVoiceOff(): mw.TextBlock {
		if(!this.txtVoiceOff_Internal&&this.uiWidgetBase) {
			this.txtVoiceOff_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasVoice/txtVoiceOff') as mw.TextBlock
		}
		return this.txtVoiceOff_Internal
	}
	private txtVoiceBgm_1_Internal: mw.TextBlock
	public get txtVoiceBgm_1(): mw.TextBlock {
		if(!this.txtVoiceBgm_1_Internal&&this.uiWidgetBase) {
			this.txtVoiceBgm_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/txtVoiceBgm_1') as mw.TextBlock
		}
		return this.txtVoiceBgm_1_Internal
	}
	private chooseCanvasSFX_Internal: mw.Canvas
	public get chooseCanvasSFX(): mw.Canvas {
		if(!this.chooseCanvasSFX_Internal&&this.uiWidgetBase) {
			this.chooseCanvasSFX_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasSFX') as mw.Canvas
		}
		return this.chooseCanvasSFX_Internal
	}
	private sFXSelectTrue_Internal: mw.StaleButton
	public get sFXSelectTrue(): mw.StaleButton {
		if(!this.sFXSelectTrue_Internal&&this.uiWidgetBase) {
			this.sFXSelectTrue_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasSFX/sFXSelectTrue') as mw.StaleButton
		}
		return this.sFXSelectTrue_Internal
	}
	private txtSFXOn_Internal: mw.TextBlock
	public get txtSFXOn(): mw.TextBlock {
		if(!this.txtSFXOn_Internal&&this.uiWidgetBase) {
			this.txtSFXOn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasSFX/txtSFXOn') as mw.TextBlock
		}
		return this.txtSFXOn_Internal
	}
	private sFXSelectFalse_Internal: mw.StaleButton
	public get sFXSelectFalse(): mw.StaleButton {
		if(!this.sFXSelectFalse_Internal&&this.uiWidgetBase) {
			this.sFXSelectFalse_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasSFX/sFXSelectFalse') as mw.StaleButton
		}
		return this.sFXSelectFalse_Internal
	}
	private txtSFXOff_Internal: mw.TextBlock
	public get txtSFXOff(): mw.TextBlock {
		if(!this.txtSFXOff_Internal&&this.uiWidgetBase) {
			this.txtSFXOff_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasSFX/txtSFXOff') as mw.TextBlock
		}
		return this.txtSFXOff_Internal
	}
	private imgBackground_1_1_1_Internal: mw.Image
	public get imgBackground_1_1_1(): mw.Image {
		if(!this.imgBackground_1_1_1_Internal&&this.uiWidgetBase) {
			this.imgBackground_1_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/imgBackground_1_1_1') as mw.Image
		}
		return this.imgBackground_1_1_1_Internal
	}
	private imgCamera_1_Internal: mw.Image
	public get imgCamera_1(): mw.Image {
		if(!this.imgCamera_1_Internal&&this.uiWidgetBase) {
			this.imgCamera_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/imgCamera_1') as mw.Image
		}
		return this.imgCamera_1_Internal
	}
	private txtVoiceBgm_2_Internal: mw.TextBlock
	public get txtVoiceBgm_2(): mw.TextBlock {
		if(!this.txtVoiceBgm_2_Internal&&this.uiWidgetBase) {
			this.txtVoiceBgm_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/txtVoiceBgm_2') as mw.TextBlock
		}
		return this.txtVoiceBgm_2_Internal
	}
	private chooseCanvasEffect_Internal: mw.Canvas
	public get chooseCanvasEffect(): mw.Canvas {
		if(!this.chooseCanvasEffect_Internal&&this.uiWidgetBase) {
			this.chooseCanvasEffect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasEffect') as mw.Canvas
		}
		return this.chooseCanvasEffect_Internal
	}
	private effectBackground_Internal: mw.Image
	public get effectBackground(): mw.Image {
		if(!this.effectBackground_Internal&&this.uiWidgetBase) {
			this.effectBackground_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasEffect/effectBackground') as mw.Image
		}
		return this.effectBackground_Internal
	}
	private effectSelectTrue_Internal: mw.StaleButton
	public get effectSelectTrue(): mw.StaleButton {
		if(!this.effectSelectTrue_Internal&&this.uiWidgetBase) {
			this.effectSelectTrue_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasEffect/effectSelectTrue') as mw.StaleButton
		}
		return this.effectSelectTrue_Internal
	}
	private txtEffectOn_Internal: mw.TextBlock
	public get txtEffectOn(): mw.TextBlock {
		if(!this.txtEffectOn_Internal&&this.uiWidgetBase) {
			this.txtEffectOn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasEffect/txtEffectOn') as mw.TextBlock
		}
		return this.txtEffectOn_Internal
	}
	private effectSelectFalse_Internal: mw.StaleButton
	public get effectSelectFalse(): mw.StaleButton {
		if(!this.effectSelectFalse_Internal&&this.uiWidgetBase) {
			this.effectSelectFalse_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasEffect/effectSelectFalse') as mw.StaleButton
		}
		return this.effectSelectFalse_Internal
	}
	private txtEffectOff_Internal: mw.TextBlock
	public get txtEffectOff(): mw.TextBlock {
		if(!this.txtEffectOff_Internal&&this.uiWidgetBase) {
			this.txtEffectOff_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasEffect/txtEffectOff') as mw.TextBlock
		}
		return this.txtEffectOff_Internal
	}
	private txtVoiceEffect_Internal: mw.TextBlock
	public get txtVoiceEffect(): mw.TextBlock {
		if(!this.txtVoiceEffect_Internal&&this.uiWidgetBase) {
			this.txtVoiceEffect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/txtVoiceEffect') as mw.TextBlock
		}
		return this.txtVoiceEffect_Internal
	}
	private chooseCanvasNumber_Internal: mw.Canvas
	public get chooseCanvasNumber(): mw.Canvas {
		if(!this.chooseCanvasNumber_Internal&&this.uiWidgetBase) {
			this.chooseCanvasNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasNumber') as mw.Canvas
		}
		return this.chooseCanvasNumber_Internal
	}
	private numberSelectTrue_Internal: mw.StaleButton
	public get numberSelectTrue(): mw.StaleButton {
		if(!this.numberSelectTrue_Internal&&this.uiWidgetBase) {
			this.numberSelectTrue_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasNumber/numberSelectTrue') as mw.StaleButton
		}
		return this.numberSelectTrue_Internal
	}
	private txtNumberOn_Internal: mw.TextBlock
	public get txtNumberOn(): mw.TextBlock {
		if(!this.txtNumberOn_Internal&&this.uiWidgetBase) {
			this.txtNumberOn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasNumber/txtNumberOn') as mw.TextBlock
		}
		return this.txtNumberOn_Internal
	}
	private numberSelectFalse_Internal: mw.StaleButton
	public get numberSelectFalse(): mw.StaleButton {
		if(!this.numberSelectFalse_Internal&&this.uiWidgetBase) {
			this.numberSelectFalse_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasNumber/numberSelectFalse') as mw.StaleButton
		}
		return this.numberSelectFalse_Internal
	}
	private txtNumberOff_Internal: mw.TextBlock
	public get txtNumberOff(): mw.TextBlock {
		if(!this.txtNumberOff_Internal&&this.uiWidgetBase) {
			this.txtNumberOff_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/chooseCanvasNumber/txtNumberOff') as mw.TextBlock
		}
		return this.txtNumberOff_Internal
	}
	private txtNumber_Internal: mw.TextBlock
	public get txtNumber(): mw.TextBlock {
		if(!this.txtNumber_Internal&&this.uiWidgetBase) {
			this.txtNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/txtNumber') as mw.TextBlock
		}
		return this.txtNumber_Internal
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
	   
	
	   this.sFXSelectTrue.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "sFXSelectTrue");
	   })
	   this.initLanguage(this.sFXSelectTrue);
	   this.sFXSelectTrue.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.sFXSelectFalse.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "sFXSelectFalse");
	   })
	   this.initLanguage(this.sFXSelectFalse);
	   this.sFXSelectFalse.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.effectSelectTrue.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "effectSelectTrue");
	   })
	   this.initLanguage(this.effectSelectTrue);
	   this.effectSelectTrue.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.effectSelectFalse.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "effectSelectFalse");
	   })
	   this.initLanguage(this.effectSelectFalse);
	   this.effectSelectFalse.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.numberSelectTrue.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "numberSelectTrue");
	   })
	   this.initLanguage(this.numberSelectTrue);
	   this.numberSelectTrue.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.numberSelectFalse.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "numberSelectFalse");
	   })
	   this.initLanguage(this.numberSelectFalse);
	   this.numberSelectFalse.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
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
	   
	
	   this.initLanguage(this.txtVoiceAttack_1)
	   
	
	   this.initLanguage(this.txtProgressLow)
	   
	
	   this.initLanguage(this.txtProgressHigh)
	   
	
	   this.initLanguage(this.txtSFXAttack)
	   
	
	   this.initLanguage(this.txtVoiceOn)
	   
	
	   this.initLanguage(this.txtVoiceOff)
	   
	
	   this.initLanguage(this.txtVoiceBgm_1)
	   
	
	   this.initLanguage(this.txtSFXOn)
	   
	
	   this.initLanguage(this.txtSFXOff)
	   
	
	   this.initLanguage(this.txtVoiceBgm_2)
	   
	
	   this.initLanguage(this.txtEffectOn)
	   
	
	   this.initLanguage(this.txtEffectOff)
	   
	
	   this.initLanguage(this.txtVoiceEffect)
	   
	
	   this.initLanguage(this.txtNumberOn)
	   
	
	   this.initLanguage(this.txtNumberOff)
	   
	
	   this.initLanguage(this.txtNumber)
	   
	
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
