
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Buy/NewBuyUI.ui')
export default class NewBuyUI_Generate extends UIScript {
		private can_Main_Internal: mw.Canvas
	public get can_Main(): mw.Canvas {
		if(!this.can_Main_Internal&&this.uiWidgetBase) {
			this.can_Main_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Main') as mw.Canvas
		}
		return this.can_Main_Internal
	}
	private img_Bg_Internal: mw.Image
	public get img_Bg(): mw.Image {
		if(!this.img_Bg_Internal&&this.uiWidgetBase) {
			this.img_Bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Main/img_Bg') as mw.Image
		}
		return this.img_Bg_Internal
	}
	private can_Up_Down_Internal: mw.Canvas
	public get can_Up_Down(): mw.Canvas {
		if(!this.can_Up_Down_Internal&&this.uiWidgetBase) {
			this.can_Up_Down_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Main/can_Up_Down') as mw.Canvas
		}
		return this.can_Up_Down_Internal
	}
	private inp_Number_Internal: mw.InputBox
	public get inp_Number(): mw.InputBox {
		if(!this.inp_Number_Internal&&this.uiWidgetBase) {
			this.inp_Number_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Main/can_Up_Down/inp_Number') as mw.InputBox
		}
		return this.inp_Number_Internal
	}
	private btn_Up_Internal: mw.Button
	public get btn_Up(): mw.Button {
		if(!this.btn_Up_Internal&&this.uiWidgetBase) {
			this.btn_Up_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Main/can_Up_Down/btn_Up') as mw.Button
		}
		return this.btn_Up_Internal
	}
	private btn_Down_Internal: mw.Button
	public get btn_Down(): mw.Button {
		if(!this.btn_Down_Internal&&this.uiWidgetBase) {
			this.btn_Down_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Main/can_Up_Down/btn_Down') as mw.Button
		}
		return this.btn_Down_Internal
	}
	private text_Title_Internal: mw.TextBlock
	public get text_Title(): mw.TextBlock {
		if(!this.text_Title_Internal&&this.uiWidgetBase) {
			this.text_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Main/text_Title') as mw.TextBlock
		}
		return this.text_Title_Internal
	}
	private can_Buy_Internal: mw.Canvas
	public get can_Buy(): mw.Canvas {
		if(!this.can_Buy_Internal&&this.uiWidgetBase) {
			this.can_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Main/can_Buy') as mw.Canvas
		}
		return this.can_Buy_Internal
	}
	private btn_Buy_Internal: mw.Button
	public get btn_Buy(): mw.Button {
		if(!this.btn_Buy_Internal&&this.uiWidgetBase) {
			this.btn_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Main/can_Buy/btn_Buy') as mw.Button
		}
		return this.btn_Buy_Internal
	}
	private text_Buy_Internal: mw.TextBlock
	public get text_Buy(): mw.TextBlock {
		if(!this.text_Buy_Internal&&this.uiWidgetBase) {
			this.text_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Main/can_Buy/btn_Buy/text_Buy') as mw.TextBlock
		}
		return this.text_Buy_Internal
	}
	private can_NumberLeft_Internal: mw.Canvas
	public get can_NumberLeft(): mw.Canvas {
		if(!this.can_NumberLeft_Internal&&this.uiWidgetBase) {
			this.can_NumberLeft_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Main/can_NumberLeft') as mw.Canvas
		}
		return this.can_NumberLeft_Internal
	}
	private text_Left_Internal: mw.TextBlock
	public get text_Left(): mw.TextBlock {
		if(!this.text_Left_Internal&&this.uiWidgetBase) {
			this.text_Left_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Main/can_NumberLeft/text_Left') as mw.TextBlock
		}
		return this.text_Left_Internal
	}
	private text_All_Internal: mw.TextBlock
	public get text_All(): mw.TextBlock {
		if(!this.text_All_Internal&&this.uiWidgetBase) {
			this.text_All_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Main/can_NumberLeft/text_All') as mw.TextBlock
		}
		return this.text_All_Internal
	}
	private btn_Close_Internal: mw.Button
	public get btn_Close(): mw.Button {
		if(!this.btn_Close_Internal&&this.uiWidgetBase) {
			this.btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_Main/btn_Close') as mw.Button
		}
		return this.btn_Close_Internal
	}



	public showAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
	public hideAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}

	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.btn_Up.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_Up");
		})
		this.btn_Up.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btn_Down.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_Down");
		})
		this.btn_Down.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btn_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_Buy");
		})
		this.btn_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_Close");
		})
		this.btn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_Title)
		
	
		this.initLanguage(this.text_Buy)
		
	
		this.initLanguage(this.text_Left)
		
	
		this.initLanguage(this.text_All)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_Main/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_Main/can_NumberLeft/TextBlock_1_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/can_Main/can_NumberLeft/TextBlock_1") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

    public show(...param): void {
		Event.dispatchToLocal("ShowUIAction_37", this);
		this.showAction.call(this);
		mw.UIService.showUI(this, this.layer, ...param);
	}

    public hide(): void {
		Event.dispatchToLocal("HideUIAction_37", this);
		this.hideAction.call(this);
		mw.UIService.hideUI(this);
	}
}
 