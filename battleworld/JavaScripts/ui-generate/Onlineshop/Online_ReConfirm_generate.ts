﻿
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/Onlineshop/Online_ReConfirm.ui
 */

 

 @UIBind('UI/Onlineshop/Online_ReConfirm.ui')
 export default class Online_ReConfirm_Generate extends UIScript {
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
	private can_Confirming_Internal: mw.Canvas
	public get can_Confirming(): mw.Canvas {
		if(!this.can_Confirming_Internal&&this.uiWidgetBase) {
			this.can_Confirming_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirming') as mw.Canvas
		}
		return this.can_Confirming_Internal
	}
	private btn_Confirming_Internal: mw.Button
	public get btn_Confirming(): mw.Button {
		if(!this.btn_Confirming_Internal&&this.uiWidgetBase) {
			this.btn_Confirming_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirming/btn_Confirming') as mw.Button
		}
		return this.btn_Confirming_Internal
	}
	private text_Confirming_Internal: mw.TextBlock
	public get text_Confirming(): mw.TextBlock {
		if(!this.text_Confirming_Internal&&this.uiWidgetBase) {
			this.text_Confirming_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Confirm/can_Confirming/btn_Confirming/text_Confirming') as mw.TextBlock
		}
		return this.text_Confirming_Internal
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
		
		this.btn_Confirm_Use.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_Confirm_Use");
		})
		
		
	
		this.btn_UnConfirm_Use.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_UnConfirm_Use");
		})
		
		
	
		this.btn_Confirming.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_Confirming");
		})
		
		
	
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_Confirm_Use)
		
	
		this.initLanguage(this.text_UnConfirm_Use)
		
	
		this.initLanguage(this.text_Confirming)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_Confirm/can_Item_Describe/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_Confirm/TextBlock") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 