
 

 @UIBind('UI/ShareUI/Bag_UI.ui')
 export default class Bag_UI_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private canvas_bag_Internal: mw.Canvas
	public get canvas_bag(): mw.Canvas {
		if(!this.canvas_bag_Internal&&this.uiWidgetBase) {
			this.canvas_bag_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag') as mw.Canvas
		}
		return this.canvas_bag_Internal
	}
	private btn_close_Internal: mw.Button
	public get btn_close(): mw.Button {
		if(!this.btn_close_Internal&&this.uiWidgetBase) {
			this.btn_close_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/btn_close') as mw.Button
		}
		return this.btn_close_Internal
	}
	private img_bg_1_1_Internal: mw.Image
	public get img_bg_1_1(): mw.Image {
		if(!this.img_bg_1_1_Internal&&this.uiWidgetBase) {
			this.img_bg_1_1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/img_bg_1_1') as mw.Image
		}
		return this.img_bg_1_1_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private img_bg_1_Internal: mw.Image
	public get img_bg_1(): mw.Image {
		if(!this.img_bg_1_Internal&&this.uiWidgetBase) {
			this.img_bg_1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/img_bg_1') as mw.Image
		}
		return this.img_bg_1_Internal
	}
	private canvas_normalitem_Internal: mw.Canvas
	public get canvas_normalitem(): mw.Canvas {
		if(!this.canvas_normalitem_Internal&&this.uiWidgetBase) {
			this.canvas_normalitem_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_normalitem') as mw.Canvas
		}
		return this.canvas_normalitem_Internal
	}
	private scrollBox1_Internal: mw.ScrollBox
	public get scrollBox1(): mw.ScrollBox {
		if(!this.scrollBox1_Internal&&this.uiWidgetBase) {
			this.scrollBox1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_normalitem/scrollBox1') as mw.ScrollBox
		}
		return this.scrollBox1_Internal
	}
	private btn_close1_Internal: mw.Button
	public get btn_close1(): mw.Button {
		if(!this.btn_close1_Internal&&this.uiWidgetBase) {
			this.btn_close1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_normalitem/scrollBox1/btn_close1') as mw.Button
		}
		return this.btn_close1_Internal
	}
	private canvas_items01_Internal: mw.Canvas
	public get canvas_items01(): mw.Canvas {
		if(!this.canvas_items01_Internal&&this.uiWidgetBase) {
			this.canvas_items01_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_normalitem/scrollBox1/canvas_items01') as mw.Canvas
		}
		return this.canvas_items01_Internal
	}
	private text_normal_Internal: mw.TextBlock
	public get text_normal(): mw.TextBlock {
		if(!this.text_normal_Internal&&this.uiWidgetBase) {
			this.text_normal_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_normalitem/text_normal') as mw.TextBlock
		}
		return this.text_normal_Internal
	}
	private canvas_specialitem_Internal: mw.Canvas
	public get canvas_specialitem(): mw.Canvas {
		if(!this.canvas_specialitem_Internal&&this.uiWidgetBase) {
			this.canvas_specialitem_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_specialitem') as mw.Canvas
		}
		return this.canvas_specialitem_Internal
	}
	private scrollBox2_Internal: mw.ScrollBox
	public get scrollBox2(): mw.ScrollBox {
		if(!this.scrollBox2_Internal&&this.uiWidgetBase) {
			this.scrollBox2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_specialitem/scrollBox2') as mw.ScrollBox
		}
		return this.scrollBox2_Internal
	}
	private btn_close2_Internal: mw.Button
	public get btn_close2(): mw.Button {
		if(!this.btn_close2_Internal&&this.uiWidgetBase) {
			this.btn_close2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_specialitem/scrollBox2/btn_close2') as mw.Button
		}
		return this.btn_close2_Internal
	}
	private canvas_items_Internal: mw.Canvas
	public get canvas_items(): mw.Canvas {
		if(!this.canvas_items_Internal&&this.uiWidgetBase) {
			this.canvas_items_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_specialitem/scrollBox2/canvas_items') as mw.Canvas
		}
		return this.canvas_items_Internal
	}
	private text_special_Internal: mw.TextBlock
	public get text_special(): mw.TextBlock {
		if(!this.text_special_Internal&&this.uiWidgetBase) {
			this.text_special_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_specialitem/text_special') as mw.TextBlock
		}
		return this.text_special_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private img_br_Internal: mw.Image
	public get img_br(): mw.Image {
		if(!this.img_br_Internal&&this.uiWidgetBase) {
			this.img_br_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/img_br') as mw.Image
		}
		return this.img_br_Internal
	}
	private img_br1_Internal: mw.Image
	public get img_br1(): mw.Image {
		if(!this.img_br1_Internal&&this.uiWidgetBase) {
			this.img_br1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/img_br1') as mw.Image
		}
		return this.img_br1_Internal
	}
	private canvas_freemoney_Internal: mw.Canvas
	public get canvas_freemoney(): mw.Canvas {
		if(!this.canvas_freemoney_Internal&&this.uiWidgetBase) {
			this.canvas_freemoney_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_freemoney') as mw.Canvas
		}
		return this.canvas_freemoney_Internal
	}
	private img_freebg_Internal: mw.Image
	public get img_freebg(): mw.Image {
		if(!this.img_freebg_Internal&&this.uiWidgetBase) {
			this.img_freebg_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_freemoney/img_freebg') as mw.Image
		}
		return this.img_freebg_Internal
	}
	private img_freeicon_Internal: mw.Image
	public get img_freeicon(): mw.Image {
		if(!this.img_freeicon_Internal&&this.uiWidgetBase) {
			this.img_freeicon_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_freemoney/img_freeicon') as mw.Image
		}
		return this.img_freeicon_Internal
	}
	private text_freenum_Internal: mw.TextBlock
	public get text_freenum(): mw.TextBlock {
		if(!this.text_freenum_Internal&&this.uiWidgetBase) {
			this.text_freenum_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_freemoney/text_freenum') as mw.TextBlock
		}
		return this.text_freenum_Internal
	}
	private btn_free_Internal: mw.Button
	public get btn_free(): mw.Button {
		if(!this.btn_free_Internal&&this.uiWidgetBase) {
			this.btn_free_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_bag/canvas_freemoney/btn_free') as mw.Button
		}
		return this.btn_free_Internal
	}
	private canvas_tools_Internal: mw.Canvas
	public get canvas_tools(): mw.Canvas {
		if(!this.canvas_tools_Internal&&this.uiWidgetBase) {
			this.canvas_tools_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_tools') as mw.Canvas
		}
		return this.canvas_tools_Internal
	}
	private btn_openbag_Internal: mw.Button
	public get btn_openbag(): mw.Button {
		if(!this.btn_openbag_Internal&&this.uiWidgetBase) {
			this.btn_openbag_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_tools/btn_openbag') as mw.Button
		}
		return this.btn_openbag_Internal
	}
	private btn_expand_Internal: mw.Button
	public get btn_expand(): mw.Button {
		if(!this.btn_expand_Internal&&this.uiWidgetBase) {
			this.btn_expand_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_tools/btn_expand') as mw.Button
		}
		return this.btn_expand_Internal
	}
	private canvas_prop_Internal: mw.Canvas
	public get canvas_prop(): mw.Canvas {
		if(!this.canvas_prop_Internal&&this.uiWidgetBase) {
			this.canvas_prop_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_tools/canvas_prop') as mw.Canvas
		}
		return this.canvas_prop_Internal
	}
	private btn_backpackrail1_Internal: mw.Button
	public get btn_backpackrail1(): mw.Button {
		if(!this.btn_backpackrail1_Internal&&this.uiWidgetBase) {
			this.btn_backpackrail1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_tools/canvas_prop/btn_backpackrail1') as mw.Button
		}
		return this.btn_backpackrail1_Internal
	}
	private btn_backpackrail2_Internal: mw.Button
	public get btn_backpackrail2(): mw.Button {
		if(!this.btn_backpackrail2_Internal&&this.uiWidgetBase) {
			this.btn_backpackrail2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_tools/canvas_prop/btn_backpackrail2') as mw.Button
		}
		return this.btn_backpackrail2_Internal
	}
	private btn_backpackrail3_Internal: mw.Button
	public get btn_backpackrail3(): mw.Button {
		if(!this.btn_backpackrail3_Internal&&this.uiWidgetBase) {
			this.btn_backpackrail3_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_tools/canvas_prop/btn_backpackrail3') as mw.Button
		}
		return this.btn_backpackrail3_Internal
	}
	private btn_backpackrail4_Internal: mw.Button
	public get btn_backpackrail4(): mw.Button {
		if(!this.btn_backpackrail4_Internal&&this.uiWidgetBase) {
			this.btn_backpackrail4_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_tools/canvas_prop/btn_backpackrail4') as mw.Button
		}
		return this.btn_backpackrail4_Internal
	}
	private btn_backpackrail5_Internal: mw.Button
	public get btn_backpackrail5(): mw.Button {
		if(!this.btn_backpackrail5_Internal&&this.uiWidgetBase) {
			this.btn_backpackrail5_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_tools/canvas_prop/btn_backpackrail5') as mw.Button
		}
		return this.btn_backpackrail5_Internal
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
		
		this.btn_close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Bag_UI_btn_close");
		})
		this.btn_close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_close.onPressed.add(() => {
			this.btn_close["preScale"] = this.btn_close.renderScale;
			this.btn_close.renderScale = Vector2.one.set(this.btn_close["preScale"]).multiply(1.1);
		})
		this.btn_close.onReleased.add(() => {
			this.btn_close.renderScale = this.btn_close["preScale"];
		})
		
	
		this.btn_close1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Bag_UI_btn_close1");
		})
		this.btn_close1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_close1.onPressed.add(() => {
			this.btn_close1["preScale"] = this.btn_close1.renderScale;
			this.btn_close1.renderScale = Vector2.one.set(this.btn_close1["preScale"]).multiply(1.1);
		})
		this.btn_close1.onReleased.add(() => {
			this.btn_close1.renderScale = this.btn_close1["preScale"];
		})
		
	
		this.btn_close2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Bag_UI_btn_close2");
		})
		this.btn_close2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_close2.onPressed.add(() => {
			this.btn_close2["preScale"] = this.btn_close2.renderScale;
			this.btn_close2.renderScale = Vector2.one.set(this.btn_close2["preScale"]).multiply(1.1);
		})
		this.btn_close2.onReleased.add(() => {
			this.btn_close2.renderScale = this.btn_close2["preScale"];
		})
		
	
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Bag_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.btn_free.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Bag_UI_btn_free");
		})
		this.btn_free.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_free.onPressed.add(() => {
			this.btn_free["preScale"] = this.btn_free.renderScale;
			this.btn_free.renderScale = Vector2.one.set(this.btn_free["preScale"]).multiply(1.1);
		})
		this.btn_free.onReleased.add(() => {
			this.btn_free.renderScale = this.btn_free["preScale"];
		})
		
	
		this.btn_openbag.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Bag_UI_btn_openbag");
		})
		this.btn_openbag.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_openbag.onPressed.add(() => {
			this.btn_openbag["preScale"] = this.btn_openbag.renderScale;
			this.btn_openbag.renderScale = Vector2.one.set(this.btn_openbag["preScale"]).multiply(1.1);
		})
		this.btn_openbag.onReleased.add(() => {
			this.btn_openbag.renderScale = this.btn_openbag["preScale"];
		})
		
	
		this.btn_expand.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Bag_UI_btn_expand");
		})
		this.btn_expand.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_expand.onPressed.add(() => {
			this.btn_expand["preScale"] = this.btn_expand.renderScale;
			this.btn_expand.renderScale = Vector2.one.set(this.btn_expand["preScale"]).multiply(1.1);
		})
		this.btn_expand.onReleased.add(() => {
			this.btn_expand.renderScale = this.btn_expand["preScale"];
		})
		
	
		this.btn_backpackrail1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Bag_UI_btn_backpackrail1");
		})
		this.btn_backpackrail1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_backpackrail1.onPressed.add(() => {
			this.btn_backpackrail1["preScale"] = this.btn_backpackrail1.renderScale;
			this.btn_backpackrail1.renderScale = Vector2.one.set(this.btn_backpackrail1["preScale"]).multiply(1.1);
		})
		this.btn_backpackrail1.onReleased.add(() => {
			this.btn_backpackrail1.renderScale = this.btn_backpackrail1["preScale"];
		})
		
	
		this.btn_backpackrail2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Bag_UI_btn_backpackrail2");
		})
		this.btn_backpackrail2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_backpackrail2.onPressed.add(() => {
			this.btn_backpackrail2["preScale"] = this.btn_backpackrail2.renderScale;
			this.btn_backpackrail2.renderScale = Vector2.one.set(this.btn_backpackrail2["preScale"]).multiply(1.1);
		})
		this.btn_backpackrail2.onReleased.add(() => {
			this.btn_backpackrail2.renderScale = this.btn_backpackrail2["preScale"];
		})
		
	
		this.btn_backpackrail3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Bag_UI_btn_backpackrail3");
		})
		this.btn_backpackrail3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_backpackrail3.onPressed.add(() => {
			this.btn_backpackrail3["preScale"] = this.btn_backpackrail3.renderScale;
			this.btn_backpackrail3.renderScale = Vector2.one.set(this.btn_backpackrail3["preScale"]).multiply(1.1);
		})
		this.btn_backpackrail3.onReleased.add(() => {
			this.btn_backpackrail3.renderScale = this.btn_backpackrail3["preScale"];
		})
		
	
		this.btn_backpackrail4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Bag_UI_btn_backpackrail4");
		})
		this.btn_backpackrail4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_backpackrail4.onPressed.add(() => {
			this.btn_backpackrail4["preScale"] = this.btn_backpackrail4.renderScale;
			this.btn_backpackrail4.renderScale = Vector2.one.set(this.btn_backpackrail4["preScale"]).multiply(1.1);
		})
		this.btn_backpackrail4.onReleased.add(() => {
			this.btn_backpackrail4.renderScale = this.btn_backpackrail4["preScale"];
		})
		
	
		this.btn_backpackrail5.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Bag_UI_btn_backpackrail5");
		})
		this.btn_backpackrail5.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_backpackrail5.onPressed.add(() => {
			this.btn_backpackrail5["preScale"] = this.btn_backpackrail5.renderScale;
			this.btn_backpackrail5.renderScale = Vector2.one.set(this.btn_backpackrail5["preScale"]).multiply(1.1);
		})
		this.btn_backpackrail5.onReleased.add(() => {
			this.btn_backpackrail5.renderScale = this.btn_backpackrail5["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_normal)
		
	
		this.initLanguage(this.text_special)
		
	
		this.initLanguage(this.text_freenum)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Bag_UI'] = Bag_UI_Generate;