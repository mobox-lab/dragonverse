
 

 @UIBind('UI/ShareUI/BagUse_UI.ui')
 export default class BagUse_UI_Generate extends UIScript {
	 	private img_bg_Internal: mw.Button
	public get img_bg(): mw.Button {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg') as mw.Button
		}
		return this.img_bg_Internal
	}
	private canvas_use_Internal: mw.Canvas
	public get canvas_use(): mw.Canvas {
		if(!this.canvas_use_Internal&&this.uiWidgetBase) {
			this.canvas_use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use') as mw.Canvas
		}
		return this.canvas_use_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private img_bg1_1_Internal: mw.Image
	public get img_bg1_1(): mw.Image {
		if(!this.img_bg1_1_Internal&&this.uiWidgetBase) {
			this.img_bg1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/img_bg1_1') as mw.Image
		}
		return this.img_bg1_1_Internal
	}
	private img_bg1_1_1_Internal: mw.Image
	public get img_bg1_1_1(): mw.Image {
		if(!this.img_bg1_1_1_Internal&&this.uiWidgetBase) {
			this.img_bg1_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/img_bg1_1_1') as mw.Image
		}
		return this.img_bg1_1_1_Internal
	}
	private canvas_detail_Internal: mw.Canvas
	public get canvas_detail(): mw.Canvas {
		if(!this.canvas_detail_Internal&&this.uiWidgetBase) {
			this.canvas_detail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/canvas_detail') as mw.Canvas
		}
		return this.canvas_detail_Internal
	}
	private img_bg2_Internal: mw.Image
	public get img_bg2(): mw.Image {
		if(!this.img_bg2_Internal&&this.uiWidgetBase) {
			this.img_bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/canvas_detail/img_bg2') as mw.Image
		}
		return this.img_bg2_Internal
	}
	private text_buynum_Internal: mw.TextBlock
	public get text_buynum(): mw.TextBlock {
		if(!this.text_buynum_Internal&&this.uiWidgetBase) {
			this.text_buynum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/canvas_detail/text_buynum') as mw.TextBlock
		}
		return this.text_buynum_Internal
	}
	private btn_add_Internal: mw.Button
	public get btn_add(): mw.Button {
		if(!this.btn_add_Internal&&this.uiWidgetBase) {
			this.btn_add_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/canvas_detail/btn_add') as mw.Button
		}
		return this.btn_add_Internal
	}
	private btn_minus_Internal: mw.Button
	public get btn_minus(): mw.Button {
		if(!this.btn_minus_Internal&&this.uiWidgetBase) {
			this.btn_minus_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/canvas_detail/btn_minus') as mw.Button
		}
		return this.btn_minus_Internal
	}
	private btn_max_Internal: mw.StaleButton
	public get btn_max(): mw.StaleButton {
		if(!this.btn_max_Internal&&this.uiWidgetBase) {
			this.btn_max_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/canvas_detail/btn_max') as mw.StaleButton
		}
		return this.btn_max_Internal
	}
	private canvas_item_Internal: mw.Canvas
	public get canvas_item(): mw.Canvas {
		if(!this.canvas_item_Internal&&this.uiWidgetBase) {
			this.canvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/canvas_item') as mw.Canvas
		}
		return this.canvas_item_Internal
	}
	private itemImg_bg_Internal: mw.Image
	public get itemImg_bg(): mw.Image {
		if(!this.itemImg_bg_Internal&&this.uiWidgetBase) {
			this.itemImg_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/canvas_item/itemImg_bg') as mw.Image
		}
		return this.itemImg_bg_Internal
	}
	private itemImg_icon_Internal: mw.Image
	public get itemImg_icon(): mw.Image {
		if(!this.itemImg_icon_Internal&&this.uiWidgetBase) {
			this.itemImg_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/canvas_item/itemImg_icon') as mw.Image
		}
		return this.itemImg_icon_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private text_buytitle_Internal: mw.TextBlock
	public get text_buytitle(): mw.TextBlock {
		if(!this.text_buytitle_Internal&&this.uiWidgetBase) {
			this.text_buytitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/text_buytitle') as mw.TextBlock
		}
		return this.text_buytitle_Internal
	}
	private img_br_Internal: mw.Image
	public get img_br(): mw.Image {
		if(!this.img_br_Internal&&this.uiWidgetBase) {
			this.img_br_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/img_br') as mw.Image
		}
		return this.img_br_Internal
	}
	private btn_confirm_Internal: mw.StaleButton
	public get btn_confirm(): mw.StaleButton {
		if(!this.btn_confirm_Internal&&this.uiWidgetBase) {
			this.btn_confirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/btn_confirm') as mw.StaleButton
		}
		return this.btn_confirm_Internal
	}
	private btn_cancel_Internal: mw.StaleButton
	public get btn_cancel(): mw.StaleButton {
		if(!this.btn_cancel_Internal&&this.uiWidgetBase) {
			this.btn_cancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_use/btn_cancel') as mw.StaleButton
		}
		return this.btn_cancel_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btn_max.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BagUse_UI_btn_max");
		})
		this.initLanguage(this.btn_max);
		this.btn_max.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_max.onPressed.add(() => {
			this.btn_max["preScale"] = this.btn_max.renderScale;
			this.btn_max.renderScale = Vector2.one.set(this.btn_max["preScale"]).multiply(1.1);
		})
		this.btn_max.onReleased.add(() => {
			this.btn_max.renderScale = this.btn_max["preScale"];
		})
		
		
	
		this.btn_confirm.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BagUse_UI_btn_confirm");
		})
		this.initLanguage(this.btn_confirm);
		this.btn_confirm.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_confirm.onPressed.add(() => {
			this.btn_confirm["preScale"] = this.btn_confirm.renderScale;
			this.btn_confirm.renderScale = Vector2.one.set(this.btn_confirm["preScale"]).multiply(1.1);
		})
		this.btn_confirm.onReleased.add(() => {
			this.btn_confirm.renderScale = this.btn_confirm["preScale"];
		})
		
		
	
		this.btn_cancel.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BagUse_UI_btn_cancel");
		})
		this.initLanguage(this.btn_cancel);
		this.btn_cancel.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_cancel.onPressed.add(() => {
			this.btn_cancel["preScale"] = this.btn_cancel.renderScale;
			this.btn_cancel.renderScale = Vector2.one.set(this.btn_cancel["preScale"]).multiply(1.1);
		})
		this.btn_cancel.onReleased.add(() => {
			this.btn_cancel.renderScale = this.btn_cancel["preScale"];
		})
		
		
	
		//按钮添加点击
		
		this.img_bg.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BagUse_UI_img_bg");
		})
		this.img_bg.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.img_bg.onPressed.add(() => {
			this.img_bg["preScale"] = this.img_bg.renderScale;
			this.img_bg.renderScale = Vector2.one.set(this.img_bg["preScale"]).multiply(1.1);
		})
		this.img_bg.onReleased.add(() => {
			this.img_bg.renderScale = this.img_bg["preScale"];
		})
		
	
		this.btn_add.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BagUse_UI_btn_add");
		})
		this.btn_add.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_add.onPressed.add(() => {
			this.btn_add["preScale"] = this.btn_add.renderScale;
			this.btn_add.renderScale = Vector2.one.set(this.btn_add["preScale"]).multiply(1.1);
		})
		this.btn_add.onReleased.add(() => {
			this.btn_add.renderScale = this.btn_add["preScale"];
		})
		
	
		this.btn_minus.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BagUse_UI_btn_minus");
		})
		this.btn_minus.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_minus.onPressed.add(() => {
			this.btn_minus["preScale"] = this.btn_minus.renderScale;
			this.btn_minus.renderScale = Vector2.one.set(this.btn_minus["preScale"]).multiply(1.1);
		})
		this.btn_minus.onReleased.add(() => {
			this.btn_minus.renderScale = this.btn_minus["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_buynum)
		
	
		this.initLanguage(this.text_name)
		
	
		this.initLanguage(this.text_buytitle)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BagUse_UI'] = BagUse_UI_Generate;