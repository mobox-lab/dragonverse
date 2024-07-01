
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Onlineshop/Online_shopItem.ui')
export default class Online_shopItem_Generate extends UIScript {
		private can_ShopItem_Internal: mw.Canvas
	public get can_ShopItem(): mw.Canvas {
		if(!this.can_ShopItem_Internal&&this.uiWidgetBase) {
			this.can_ShopItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem') as mw.Canvas
		}
		return this.can_ShopItem_Internal
	}
	private btn_Item_Internal: mw.Button
	public get btn_Item(): mw.Button {
		if(!this.btn_Item_Internal&&this.uiWidgetBase) {
			this.btn_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/btn_Item') as mw.Button
		}
		return this.btn_Item_Internal
	}
	private img_Background_Internal: mw.Image
	public get img_Background(): mw.Image {
		if(!this.img_Background_Internal&&this.uiWidgetBase) {
			this.img_Background_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/img_Background') as mw.Image
		}
		return this.img_Background_Internal
	}
	private img_Background2_Internal: mw.Image
	public get img_Background2(): mw.Image {
		if(!this.img_Background2_Internal&&this.uiWidgetBase) {
			this.img_Background2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/img_Background2') as mw.Image
		}
		return this.img_Background2_Internal
	}
	private can_Up_Down_Internal: mw.Canvas
	public get can_Up_Down(): mw.Canvas {
		if(!this.can_Up_Down_Internal&&this.uiWidgetBase) {
			this.can_Up_Down_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/can_Up_Down') as mw.Canvas
		}
		return this.can_Up_Down_Internal
	}
	private img_TextBg_Internal: mw.Image
	public get img_TextBg(): mw.Image {
		if(!this.img_TextBg_Internal&&this.uiWidgetBase) {
			this.img_TextBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/can_Up_Down/img_TextBg') as mw.Image
		}
		return this.img_TextBg_Internal
	}
	private inp_Number_Internal: mw.InputBox
	public get inp_Number(): mw.InputBox {
		if(!this.inp_Number_Internal&&this.uiWidgetBase) {
			this.inp_Number_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/can_Up_Down/inp_Number') as mw.InputBox
		}
		return this.inp_Number_Internal
	}
	private btn_Up_Internal: mw.Button
	public get btn_Up(): mw.Button {
		if(!this.btn_Up_Internal&&this.uiWidgetBase) {
			this.btn_Up_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/can_Up_Down/btn_Up') as mw.Button
		}
		return this.btn_Up_Internal
	}
	private btn_Down_Internal: mw.Button
	public get btn_Down(): mw.Button {
		if(!this.btn_Down_Internal&&this.uiWidgetBase) {
			this.btn_Down_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/can_Up_Down/btn_Down') as mw.Button
		}
		return this.btn_Down_Internal
	}
	private text_Describe_Internal: mw.TextBlock
	public get text_Describe(): mw.TextBlock {
		if(!this.text_Describe_Internal&&this.uiWidgetBase) {
			this.text_Describe_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/text_Describe') as mw.TextBlock
		}
		return this.text_Describe_Internal
	}
	private img_Icon_Internal: mw.Image
	public get img_Icon(): mw.Image {
		if(!this.img_Icon_Internal&&this.uiWidgetBase) {
			this.img_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/img_Icon') as mw.Image
		}
		return this.img_Icon_Internal
	}
	private can_Mobox_Internal: mw.Canvas
	public get can_Mobox(): mw.Canvas {
		if(!this.can_Mobox_Internal&&this.uiWidgetBase) {
			this.can_Mobox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/can_Mobox') as mw.Canvas
		}
		return this.can_Mobox_Internal
	}
	private text_MoboxNumber_Internal: mw.TextBlock
	public get text_MoboxNumber(): mw.TextBlock {
		if(!this.text_MoboxNumber_Internal&&this.uiWidgetBase) {
			this.text_MoboxNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/can_Mobox/text_MoboxNumber') as mw.TextBlock
		}
		return this.text_MoboxNumber_Internal
	}
	private img_MoboxImg_Internal: mw.Image
	public get img_MoboxImg(): mw.Image {
		if(!this.img_MoboxImg_Internal&&this.uiWidgetBase) {
			this.img_MoboxImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/can_Mobox/img_MoboxImg') as mw.Image
		}
		return this.img_MoboxImg_Internal
	}
	private text_Name_Internal: mw.TextBlock
	public get text_Name(): mw.TextBlock {
		if(!this.text_Name_Internal&&this.uiWidgetBase) {
			this.text_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_ShopItem/text_Name') as mw.TextBlock
		}
		return this.text_Name_Internal
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
		
		this.btn_Item.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_Item");
		})
		this.btn_Item.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btn_Up.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_Up");
		})
		this.btn_Up.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btn_Down.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_Down");
		})
		this.btn_Down.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_Describe)
		
	
		this.initLanguage(this.text_MoboxNumber)
		
	
		this.initLanguage(this.text_Name)
		
	
		//文本多语言
		

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
 