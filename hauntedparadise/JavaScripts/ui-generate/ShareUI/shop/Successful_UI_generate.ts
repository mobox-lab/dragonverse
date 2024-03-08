
 

 @UIBind('UI/ShareUI/shop/Successful_UI.ui')
 export default class Successful_UI_Generate extends UIScript {
	 	private canvas_successful_Internal: mw.Canvas
	public get canvas_successful(): mw.Canvas {
		if(!this.canvas_successful_Internal&&this.uiWidgetBase) {
			this.canvas_successful_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful') as mw.Canvas
		}
		return this.canvas_successful_Internal
	}
	private img_bg_1_Internal: mw.Image
	public get img_bg_1(): mw.Image {
		if(!this.img_bg_1_Internal&&this.uiWidgetBase) {
			this.img_bg_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/img_bg_1') as mw.Image
		}
		return this.img_bg_1_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private text_title_Internal: mw.TextBlock
	public get text_title(): mw.TextBlock {
		if(!this.text_title_Internal&&this.uiWidgetBase) {
			this.text_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/text_title') as mw.TextBlock
		}
		return this.text_title_Internal
	}
	private img_br_Internal: mw.Image
	public get img_br(): mw.Image {
		if(!this.img_br_Internal&&this.uiWidgetBase) {
			this.img_br_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/img_br') as mw.Image
		}
		return this.img_br_Internal
	}
	private img_flash_Internal: mw.Image
	public get img_flash(): mw.Image {
		if(!this.img_flash_Internal&&this.uiWidgetBase) {
			this.img_flash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/img_flash') as mw.Image
		}
		return this.img_flash_Internal
	}
	private img_br2_Internal: mw.Image
	public get img_br2(): mw.Image {
		if(!this.img_br2_Internal&&this.uiWidgetBase) {
			this.img_br2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/img_br2') as mw.Image
		}
		return this.img_br2_Internal
	}
	private btn_confirm_Internal: mw.Button
	public get btn_confirm(): mw.Button {
		if(!this.btn_confirm_Internal&&this.uiWidgetBase) {
			this.btn_confirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/btn_confirm') as mw.Button
		}
		return this.btn_confirm_Internal
	}
	private text_confirm_Internal: mw.TextBlock
	public get text_confirm(): mw.TextBlock {
		if(!this.text_confirm_Internal&&this.uiWidgetBase) {
			this.text_confirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/text_confirm') as mw.TextBlock
		}
		return this.text_confirm_Internal
	}
	private canvas_item_Internal: mw.Canvas
	public get canvas_item(): mw.Canvas {
		if(!this.canvas_item_Internal&&this.uiWidgetBase) {
			this.canvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/canvas_item') as mw.Canvas
		}
		return this.canvas_item_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/canvas_item/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private img_line_Internal: mw.Image
	public get img_line(): mw.Image {
		if(!this.img_line_Internal&&this.uiWidgetBase) {
			this.img_line_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/canvas_item/img_line') as mw.Image
		}
		return this.img_line_Internal
	}
	private img_itembg_Internal: mw.Image
	public get img_itembg(): mw.Image {
		if(!this.img_itembg_Internal&&this.uiWidgetBase) {
			this.img_itembg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/canvas_item/img_itembg') as mw.Image
		}
		return this.img_itembg_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/canvas_item/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private img_icon_Internal: mw.Image
	public get img_icon(): mw.Image {
		if(!this.img_icon_Internal&&this.uiWidgetBase) {
			this.img_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/canvas_item/img_icon') as mw.Image
		}
		return this.img_icon_Internal
	}
	private text_num_Internal: mw.TextBlock
	public get text_num(): mw.TextBlock {
		if(!this.text_num_Internal&&this.uiWidgetBase) {
			this.text_num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/canvas_item/text_num') as mw.TextBlock
		}
		return this.text_num_Internal
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
		
		this.btn_confirm.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Successful_UI_btn_confirm");
		})
		this.btn_confirm.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_confirm.onPressed.add(() => {
			this.btn_confirm["preScale"] = this.btn_confirm.renderScale;
			this.btn_confirm.renderScale = Vector2.one.set(this.btn_confirm["preScale"]).multiply(1.1);
		})
		this.btn_confirm.onReleased.add(() => {
			this.btn_confirm.renderScale = this.btn_confirm["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_title)
		
	
		this.initLanguage(this.text_confirm)
		
	
		this.initLanguage(this.text_name)
		
	
		this.initLanguage(this.text_num)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Successful_UI'] = Successful_UI_Generate;