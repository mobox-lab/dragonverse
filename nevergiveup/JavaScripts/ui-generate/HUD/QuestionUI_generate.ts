
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/HUD/QuestionUI.ui')
export default class QuestionUI_Generate extends UIScript {
		private closeBtn_Internal: mw.Button
	public get closeBtn(): mw.Button {
		if(!this.closeBtn_Internal&&this.uiWidgetBase) {
			this.closeBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/closeBtn') as mw.Button
		}
		return this.closeBtn_Internal
	}
	private can_Confirm_Internal: mw.Canvas
	public get can_Confirm(): mw.Canvas {
		if(!this.can_Confirm_Internal&&this.uiWidgetBase) {
			this.can_Confirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm') as mw.Canvas
		}
		return this.can_Confirm_Internal
	}
	private can_Item_Describe_Internal: mw.Canvas
	public get can_Item_Describe(): mw.Canvas {
		if(!this.can_Item_Describe_Internal&&this.uiWidgetBase) {
			this.can_Item_Describe_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Item_Describe') as mw.Canvas
		}
		return this.can_Item_Describe_Internal
	}
	private text_Recovery_Internal: mw.TextBlock
	public get text_Recovery(): mw.TextBlock {
		if(!this.text_Recovery_Internal&&this.uiWidgetBase) {
			this.text_Recovery_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Item_Describe/text_Recovery') as mw.TextBlock
		}
		return this.text_Recovery_Internal
	}
	private can_Confirm_Use_Internal: mw.Canvas
	public get can_Confirm_Use(): mw.Canvas {
		if(!this.can_Confirm_Use_Internal&&this.uiWidgetBase) {
			this.can_Confirm_Use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirm_Use') as mw.Canvas
		}
		return this.can_Confirm_Use_Internal
	}
	private btn_Confirm_Use_Internal: mw.Button
	public get btn_Confirm_Use(): mw.Button {
		if(!this.btn_Confirm_Use_Internal&&this.uiWidgetBase) {
			this.btn_Confirm_Use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirm_Use/btn_Confirm_Use') as mw.Button
		}
		return this.btn_Confirm_Use_Internal
	}
	private text_Confirm_Use_Internal: mw.TextBlock
	public get text_Confirm_Use(): mw.TextBlock {
		if(!this.text_Confirm_Use_Internal&&this.uiWidgetBase) {
			this.text_Confirm_Use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirm_Use/btn_Confirm_Use/text_Confirm_Use') as mw.TextBlock
		}
		return this.text_Confirm_Use_Internal
	}
	private can_UnConfirm_Use_Internal: mw.Canvas
	public get can_UnConfirm_Use(): mw.Canvas {
		if(!this.can_UnConfirm_Use_Internal&&this.uiWidgetBase) {
			this.can_UnConfirm_Use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_UnConfirm_Use') as mw.Canvas
		}
		return this.can_UnConfirm_Use_Internal
	}
	private btn_UnConfirm_Use_Internal: mw.Button
	public get btn_UnConfirm_Use(): mw.Button {
		if(!this.btn_UnConfirm_Use_Internal&&this.uiWidgetBase) {
			this.btn_UnConfirm_Use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_UnConfirm_Use/btn_UnConfirm_Use') as mw.Button
		}
		return this.btn_UnConfirm_Use_Internal
	}
	private text_UnConfirm_Use_Internal: mw.TextBlock
	public get text_UnConfirm_Use(): mw.TextBlock {
		if(!this.text_UnConfirm_Use_Internal&&this.uiWidgetBase) {
			this.text_UnConfirm_Use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_UnConfirm_Use/btn_UnConfirm_Use/text_UnConfirm_Use') as mw.TextBlock
		}
		return this.text_UnConfirm_Use_Internal
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
	   
	   this.closeBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "closeBtn");
	   })
	   this.closeBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.btn_Confirm_Use.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btn_Confirm_Use");
	   })
	   this.btn_Confirm_Use.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.btn_UnConfirm_Use.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btn_UnConfirm_Use");
	   })
	   this.btn_UnConfirm_Use.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.text_Recovery)
	   
	
	   this.initLanguage(this.text_Confirm_Use)
	   
	
	   this.initLanguage(this.text_UnConfirm_Use)
	   
	
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
