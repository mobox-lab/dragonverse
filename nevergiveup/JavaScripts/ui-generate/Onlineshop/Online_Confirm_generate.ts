
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Onlineshop/Online_Confirm.ui')
export default class Online_Confirm_Generate extends UIScript {
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
	private can_Shop_Item_Internal: mw.Canvas
	public get can_Shop_Item(): mw.Canvas {
		if(!this.can_Shop_Item_Internal&&this.uiWidgetBase) {
			this.can_Shop_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Shop_Item') as mw.Canvas
		}
		return this.can_Shop_Item_Internal
	}
	private can_Item_Icon_Internal: mw.Canvas
	public get can_Item_Icon(): mw.Canvas {
		if(!this.can_Item_Icon_Internal&&this.uiWidgetBase) {
			this.can_Item_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Shop_Item/can_Item_Icon') as mw.Canvas
		}
		return this.can_Item_Icon_Internal
	}
	private img_Icon_Internal: mw.Image
	public get img_Icon(): mw.Image {
		if(!this.img_Icon_Internal&&this.uiWidgetBase) {
			this.img_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Shop_Item/can_Item_Icon/img_Icon') as mw.Image
		}
		return this.img_Icon_Internal
	}
	private canvasNumber_Internal: mw.Canvas
	public get canvasNumber(): mw.Canvas {
		if(!this.canvasNumber_Internal&&this.uiWidgetBase) {
			this.canvasNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Shop_Item/can_Item_Icon/canvasNumber') as mw.Canvas
		}
		return this.canvasNumber_Internal
	}
	private text_Number_Internal: mw.TextBlock
	public get text_Number(): mw.TextBlock {
		if(!this.text_Number_Internal&&this.uiWidgetBase) {
			this.text_Number_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Shop_Item/can_Item_Icon/canvasNumber/text_Number') as mw.TextBlock
		}
		return this.text_Number_Internal
	}
	private can_Item_Describe_Internal: mw.Canvas
	public get can_Item_Describe(): mw.Canvas {
		if(!this.can_Item_Describe_Internal&&this.uiWidgetBase) {
			this.can_Item_Describe_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Shop_Item/can_Item_Describe') as mw.Canvas
		}
		return this.can_Item_Describe_Internal
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
	private text_Use_Internal: mw.TextBlock
	public get text_Use(): mw.TextBlock {
		if(!this.text_Use_Internal&&this.uiWidgetBase) {
			this.text_Use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirm_Use/btn_Confirm_Use/text_Use') as mw.TextBlock
		}
		return this.text_Use_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
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
	   
	
	   this.btn_UnConfirm_Use.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btn_UnConfirm_Use");
	   })
	   this.btn_UnConfirm_Use.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.btn_Confirm_Use.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btn_Confirm_Use");
	   })
	   this.btn_Confirm_Use.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mBtn_Close.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
	   })
	   this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.text_Number)
	   
	
	   this.initLanguage(this.text_Use)
	   
	
	   //文本多语言
	   
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_Confirm/can_Shop_Item/can_Item_Icon/canvasNumber/MWTextBlock_2147414466") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_Confirm/can_Shop_Item/can_Item_Describe/TextBlock_1") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_Confirm/can_UnConfirm_Use/btn_UnConfirm_Use/TextBlock_2") as any);
	   
	

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
