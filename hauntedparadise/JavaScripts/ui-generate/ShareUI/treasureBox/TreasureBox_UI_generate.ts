
 

 @UIBind('UI/ShareUI/treasureBox/TreasureBox_UI.ui')
 export default class TreasureBox_UI_Generate extends UIScript {
	 	private button_BG_Internal: mw.Button
	public get button_BG(): mw.Button {
		if(!this.button_BG_Internal&&this.uiWidgetBase) {
			this.button_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/button_BG') as mw.Button
		}
		return this.button_BG_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private canvas_boxdetail_Internal: mw.Canvas
	public get canvas_boxdetail(): mw.Canvas {
		if(!this.canvas_boxdetail_Internal&&this.uiWidgetBase) {
			this.canvas_boxdetail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_boxdetail') as mw.Canvas
		}
		return this.canvas_boxdetail_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_boxdetail/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private img_bg1_1_Internal: mw.Image
	public get img_bg1_1(): mw.Image {
		if(!this.img_bg1_1_Internal&&this.uiWidgetBase) {
			this.img_bg1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_boxdetail/img_bg1_1') as mw.Image
		}
		return this.img_bg1_1_Internal
	}
	private img_bg1_2_Internal: mw.Image
	public get img_bg1_2(): mw.Image {
		if(!this.img_bg1_2_Internal&&this.uiWidgetBase) {
			this.img_bg1_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_boxdetail/img_bg1_2') as mw.Image
		}
		return this.img_bg1_2_Internal
	}
	private text_boxtitle_Internal: mw.TextBlock
	public get text_boxtitle(): mw.TextBlock {
		if(!this.text_boxtitle_Internal&&this.uiWidgetBase) {
			this.text_boxtitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_boxdetail/text_boxtitle') as mw.TextBlock
		}
		return this.text_boxtitle_Internal
	}
	private text_boxtips_Internal: mw.TextBlock
	public get text_boxtips(): mw.TextBlock {
		if(!this.text_boxtips_Internal&&this.uiWidgetBase) {
			this.text_boxtips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_boxdetail/text_boxtips') as mw.TextBlock
		}
		return this.text_boxtips_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_boxdetail/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private img_boxUi_Internal: mw.Image
	public get img_boxUi(): mw.Image {
		if(!this.img_boxUi_Internal&&this.uiWidgetBase) {
			this.img_boxUi_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_boxdetail/img_boxUi') as mw.Image
		}
		return this.img_boxUi_Internal
	}
	private canvas_prizePool_Internal: mw.Canvas
	public get canvas_prizePool(): mw.Canvas {
		if(!this.canvas_prizePool_Internal&&this.uiWidgetBase) {
			this.canvas_prizePool_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_boxdetail/canvas_prizePool') as mw.Canvas
		}
		return this.canvas_prizePool_Internal
	}
	private btn_prizePool_Internal: mw.Button
	public get btn_prizePool(): mw.Button {
		if(!this.btn_prizePool_Internal&&this.uiWidgetBase) {
			this.btn_prizePool_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_boxdetail/canvas_prizePool/btn_prizePool') as mw.Button
		}
		return this.btn_prizePool_Internal
	}
	private img_bag_Internal: mw.Image
	public get img_bag(): mw.Image {
		if(!this.img_bag_Internal&&this.uiWidgetBase) {
			this.img_bag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_boxdetail/canvas_prizePool/img_bag') as mw.Image
		}
		return this.img_bag_Internal
	}
	private text_prizePool_Internal: mw.TextBlock
	public get text_prizePool(): mw.TextBlock {
		if(!this.text_prizePool_Internal&&this.uiWidgetBase) {
			this.text_prizePool_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_boxdetail/canvas_prizePool/text_prizePool') as mw.TextBlock
		}
		return this.text_prizePool_Internal
	}
	private canvas_open_Internal: mw.Canvas
	public get canvas_open(): mw.Canvas {
		if(!this.canvas_open_Internal&&this.uiWidgetBase) {
			this.canvas_open_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_boxdetail/canvas_open') as mw.Canvas
		}
		return this.canvas_open_Internal
	}
	private btn_open_Internal: mw.Button
	public get btn_open(): mw.Button {
		if(!this.btn_open_Internal&&this.uiWidgetBase) {
			this.btn_open_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_boxdetail/canvas_open/btn_open') as mw.Button
		}
		return this.btn_open_Internal
	}
	private text_open_Internal: mw.TextBlock
	public get text_open(): mw.TextBlock {
		if(!this.text_open_Internal&&this.uiWidgetBase) {
			this.text_open_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_boxdetail/canvas_open/btn_open/text_open') as mw.TextBlock
		}
		return this.text_open_Internal
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
		
		this.button_BG.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "TreasureBox_UI_button_BG");
		})
		this.button_BG.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.button_BG.onPressed.add(() => {
			this.button_BG["preScale"] = this.button_BG.renderScale;
			this.button_BG.renderScale = Vector2.one.set(this.button_BG["preScale"]).multiply(1.1);
		})
		this.button_BG.onReleased.add(() => {
			this.button_BG.renderScale = this.button_BG["preScale"];
		})
		
	
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "TreasureBox_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.btn_prizePool.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "TreasureBox_UI_btn_prizePool");
		})
		this.btn_prizePool.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_prizePool.onPressed.add(() => {
			this.btn_prizePool["preScale"] = this.btn_prizePool.renderScale;
			this.btn_prizePool.renderScale = Vector2.one.set(this.btn_prizePool["preScale"]).multiply(1.1);
		})
		this.btn_prizePool.onReleased.add(() => {
			this.btn_prizePool.renderScale = this.btn_prizePool["preScale"];
		})
		
	
		this.btn_open.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "TreasureBox_UI_btn_open");
		})
		this.btn_open.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_open.onPressed.add(() => {
			this.btn_open["preScale"] = this.btn_open.renderScale;
			this.btn_open.renderScale = Vector2.one.set(this.btn_open["preScale"]).multiply(1.1);
		})
		this.btn_open.onReleased.add(() => {
			this.btn_open.renderScale = this.btn_open["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_boxtitle)
		
	
		this.initLanguage(this.text_boxtips)
		
	
		this.initLanguage(this.text_prizePool)
		
	
		this.initLanguage(this.text_open)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_TreasureBox_UI'] = TreasureBox_UI_Generate;