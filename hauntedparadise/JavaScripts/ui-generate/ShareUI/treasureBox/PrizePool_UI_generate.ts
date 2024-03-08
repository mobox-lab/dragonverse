
 

 @UIBind('UI/ShareUI/treasureBox/PrizePool_UI.ui')
 export default class PrizePool_UI_Generate extends UIScript {
	 	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private canvas_pool_Internal: mw.Canvas
	public get canvas_pool(): mw.Canvas {
		if(!this.canvas_pool_Internal&&this.uiWidgetBase) {
			this.canvas_pool_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pool') as mw.Canvas
		}
		return this.canvas_pool_Internal
	}
	private img_frame1_Internal: mw.Image
	public get img_frame1(): mw.Image {
		if(!this.img_frame1_Internal&&this.uiWidgetBase) {
			this.img_frame1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pool/img_frame1') as mw.Image
		}
		return this.img_frame1_Internal
	}
	private img_frame2_Internal: mw.Image
	public get img_frame2(): mw.Image {
		if(!this.img_frame2_Internal&&this.uiWidgetBase) {
			this.img_frame2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pool/img_frame2') as mw.Image
		}
		return this.img_frame2_Internal
	}
	private img_frame3_Internal: mw.Image
	public get img_frame3(): mw.Image {
		if(!this.img_frame3_Internal&&this.uiWidgetBase) {
			this.img_frame3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pool/img_frame3') as mw.Image
		}
		return this.img_frame3_Internal
	}
	private text_prizePool_Internal: mw.TextBlock
	public get text_prizePool(): mw.TextBlock {
		if(!this.text_prizePool_Internal&&this.uiWidgetBase) {
			this.text_prizePool_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pool/text_prizePool') as mw.TextBlock
		}
		return this.text_prizePool_Internal
	}
	private text_tips_Internal: mw.TextBlock
	public get text_tips(): mw.TextBlock {
		if(!this.text_tips_Internal&&this.uiWidgetBase) {
			this.text_tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pool/text_tips') as mw.TextBlock
		}
		return this.text_tips_Internal
	}
	private text_close_Internal: mw.TextBlock
	public get text_close(): mw.TextBlock {
		if(!this.text_close_Internal&&this.uiWidgetBase) {
			this.text_close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pool/text_close') as mw.TextBlock
		}
		return this.text_close_Internal
	}
	private canvas_prize_Internal: mw.Canvas
	public get canvas_prize(): mw.Canvas {
		if(!this.canvas_prize_Internal&&this.uiWidgetBase) {
			this.canvas_prize_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pool/ScrollBox/canvas_prize') as mw.Canvas
		}
		return this.canvas_prize_Internal
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
		
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "PrizePool_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_prizePool)
		
	
		this.initLanguage(this.text_tips)
		
	
		this.initLanguage(this.text_close)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_PrizePool_UI'] = PrizePool_UI_Generate;