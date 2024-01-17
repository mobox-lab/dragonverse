
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 一只黄鹂鸣翠柳
 * UI: UI/talk/P_Game_Talk.ui
 * TIME: 2023.12.14-14.38.45
 */

 

 @UIBind('UI/talk/P_Game_Talk.ui')
 export default class P_Game_Talk_Generate extends UIScript {
	 	private mCanvas_npc_Internal: mw.Canvas
	public get mCanvas_npc(): mw.Canvas {
		if(!this.mCanvas_npc_Internal&&this.uiWidgetBase) {
			this.mCanvas_npc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_npc') as mw.Canvas
		}
		return this.mCanvas_npc_Internal
	}
	private mText_1_Internal: mw.TextBlock
	public get mText_1(): mw.TextBlock {
		if(!this.mText_1_Internal&&this.uiWidgetBase) {
			this.mText_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_npc/mText_1') as mw.TextBlock
		}
		return this.mText_1_Internal
	}
	private mCanvas_choose_Internal: mw.Canvas
	public get mCanvas_choose(): mw.Canvas {
		if(!this.mCanvas_choose_Internal&&this.uiWidgetBase) {
			this.mCanvas_choose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_npc/mCanvas_choose') as mw.Canvas
		}
		return this.mCanvas_choose_Internal
	}
	private mBtn_1_Internal: mw.StaleButton
	public get mBtn_1(): mw.StaleButton {
		if(!this.mBtn_1_Internal&&this.uiWidgetBase) {
			this.mBtn_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_npc/mCanvas_choose/mBtn_1') as mw.StaleButton
		}
		return this.mBtn_1_Internal
	}
	private mBtn_2_Internal: mw.StaleButton
	public get mBtn_2(): mw.StaleButton {
		if(!this.mBtn_2_Internal&&this.uiWidgetBase) {
			this.mBtn_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_npc/mCanvas_choose/mBtn_2') as mw.StaleButton
		}
		return this.mBtn_2_Internal
	}
	private mBtn_3_Internal: mw.StaleButton
	public get mBtn_3(): mw.StaleButton {
		if(!this.mBtn_3_Internal&&this.uiWidgetBase) {
			this.mBtn_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_npc/mCanvas_choose/mBtn_3') as mw.StaleButton
		}
		return this.mBtn_3_Internal
	}
	private mBtn_4_Internal: mw.StaleButton
	public get mBtn_4(): mw.StaleButton {
		if(!this.mBtn_4_Internal&&this.uiWidgetBase) {
			this.mBtn_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_npc/mCanvas_choose/mBtn_4') as mw.StaleButton
		}
		return this.mBtn_4_Internal
	}
	private mCloseBtn_Internal: mw.Button
	public get mCloseBtn(): mw.Button {
		if(!this.mCloseBtn_Internal&&this.uiWidgetBase) {
			this.mCloseBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_npc/mCloseBtn') as mw.Button
		}
		return this.mCloseBtn_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_npc/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private mText_Name_Internal: mw.TextBlock
	public get mText_Name(): mw.TextBlock {
		if(!this.mText_Name_Internal&&this.uiWidgetBase) {
			this.mText_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_npc/mContent/mText_Name') as mw.TextBlock
		}
		return this.mText_Name_Internal
	}
	private mText_Desc_Internal: mw.TextBlock
	public get mText_Desc(): mw.TextBlock {
		if(!this.mText_Desc_Internal&&this.uiWidgetBase) {
			this.mText_Desc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_npc/mContent/mText_Desc') as mw.TextBlock
		}
		return this.mText_Desc_Internal
	}
	private mText_Coin_Internal: mw.TextBlock
	public get mText_Coin(): mw.TextBlock {
		if(!this.mText_Coin_Internal&&this.uiWidgetBase) {
			this.mText_Coin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_npc/mContent/mText_Coin') as mw.TextBlock
		}
		return this.mText_Coin_Internal
	}
	private mIcon_Internal: mw.Image
	public get mIcon(): mw.Image {
		if(!this.mIcon_Internal&&this.uiWidgetBase) {
			this.mIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_npc/mContent/mIcon') as mw.Image
		}
		return this.mIcon_Internal
	}
	private mCanvas_cash_Internal: mw.Canvas
	public get mCanvas_cash(): mw.Canvas {
		if(!this.mCanvas_cash_Internal&&this.uiWidgetBase) {
			this.mCanvas_cash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_npc/mCanvas_cash') as mw.Canvas
		}
		return this.mCanvas_cash_Internal
	}
	private mPic_Cashicon_Internal: mw.Image
	public get mPic_Cashicon(): mw.Image {
		if(!this.mPic_Cashicon_Internal&&this.uiWidgetBase) {
			this.mPic_Cashicon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_npc/mCanvas_cash/mPic_Cashicon') as mw.Image
		}
		return this.mPic_Cashicon_Internal
	}
	private mText_value_Internal: mw.TextBlock
	public get mText_value(): mw.TextBlock {
		if(!this.mText_value_Internal&&this.uiWidgetBase) {
			this.mText_value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_npc/mCanvas_cash/mText_value') as mw.TextBlock
		}
		return this.mText_value_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_1");
		})
		this.initLanguage(this.mBtn_1);
		//this.mBtn_1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_2");
		})
		this.initLanguage(this.mBtn_2);
		//this.mBtn_2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_3");
		})
		this.initLanguage(this.mBtn_3);
		//this.mBtn_3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_4");
		})
		this.initLanguage(this.mBtn_4);
		//this.mBtn_4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mCloseBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseBtn");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_1)
		
	
		this.initLanguage(this.mText_Name)
		
	
		this.initLanguage(this.mText_Desc)
		
	
		this.initLanguage(this.mText_Coin)
		
	
		this.initLanguage(this.mText_value)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 