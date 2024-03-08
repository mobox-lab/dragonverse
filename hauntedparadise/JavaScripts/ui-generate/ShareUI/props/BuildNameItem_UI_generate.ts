
 

 @UIBind('UI/ShareUI/props/BuildNameItem_UI.ui')
 export default class BuildNameItem_UI_Generate extends UIScript {
	 	private canvas_item_Internal: mw.Canvas
	public get canvas_item(): mw.Canvas {
		if(!this.canvas_item_Internal&&this.uiWidgetBase) {
			this.canvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item') as mw.Canvas
		}
		return this.canvas_item_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private img_itemLv_Internal: mw.Image
	public get img_itemLv(): mw.Image {
		if(!this.img_itemLv_Internal&&this.uiWidgetBase) {
			this.img_itemLv_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/img_itemLv') as mw.Image
		}
		return this.img_itemLv_Internal
	}
	private img_itemBg_Internal: mw.Image
	public get img_itemBg(): mw.Image {
		if(!this.img_itemBg_Internal&&this.uiWidgetBase) {
			this.img_itemBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/img_itemBg') as mw.Image
		}
		return this.img_itemBg_Internal
	}
	private img_item_Internal: mw.Image
	public get img_item(): mw.Image {
		if(!this.img_item_Internal&&this.uiWidgetBase) {
			this.img_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/img_item') as mw.Image
		}
		return this.img_item_Internal
	}
	private canvas_choose_Internal: mw.Canvas
	public get canvas_choose(): mw.Canvas {
		if(!this.canvas_choose_Internal&&this.uiWidgetBase) {
			this.canvas_choose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_choose') as mw.Canvas
		}
		return this.canvas_choose_Internal
	}
	private img_itemChoose0_Internal: mw.Image
	public get img_itemChoose0(): mw.Image {
		if(!this.img_itemChoose0_Internal&&this.uiWidgetBase) {
			this.img_itemChoose0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_choose/img_itemChoose0') as mw.Image
		}
		return this.img_itemChoose0_Internal
	}
	private img_look_Internal: mw.Image
	public get img_look(): mw.Image {
		if(!this.img_look_Internal&&this.uiWidgetBase) {
			this.img_look_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_choose/img_look') as mw.Image
		}
		return this.img_look_Internal
	}
	private btn_look_Internal: mw.Button
	public get btn_look(): mw.Button {
		if(!this.btn_look_Internal&&this.uiWidgetBase) {
			this.btn_look_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_choose/btn_look') as mw.Button
		}
		return this.btn_look_Internal
	}
	private btn_choose_Internal: mw.Button
	public get btn_choose(): mw.Button {
		if(!this.btn_choose_Internal&&this.uiWidgetBase) {
			this.btn_choose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_choose/btn_choose') as mw.Button
		}
		return this.btn_choose_Internal
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
		
		this.btn_look.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuildNameItem_UI_btn_look");
		})
		this.btn_look.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_look.onPressed.add(() => {
			this.btn_look["preScale"] = this.btn_look.renderScale;
			this.btn_look.renderScale = Vector2.one.set(this.btn_look["preScale"]).multiply(1.1);
		})
		this.btn_look.onReleased.add(() => {
			this.btn_look.renderScale = this.btn_look["preScale"];
		})
		
	
		this.btn_choose.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuildNameItem_UI_btn_choose");
		})
		this.btn_choose.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_choose.onPressed.add(() => {
			this.btn_choose["preScale"] = this.btn_choose.renderScale;
			this.btn_choose.renderScale = Vector2.one.set(this.btn_choose["preScale"]).multiply(1.1);
		})
		this.btn_choose.onReleased.add(() => {
			this.btn_choose.renderScale = this.btn_choose["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_name)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_choose/btn_choose/TextBlock") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BuildNameItem_UI'] = BuildNameItem_UI_Generate;