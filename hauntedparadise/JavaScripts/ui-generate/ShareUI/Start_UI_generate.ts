
 

 @UIBind('UI/ShareUI/Start_UI.ui')
 export default class Start_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private canvas_strat_Internal: mw.Canvas
	public get canvas_strat(): mw.Canvas {
		if(!this.canvas_strat_Internal&&this.uiWidgetBase) {
			this.canvas_strat_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_strat') as mw.Canvas
		}
		return this.canvas_strat_Internal
	}
	private text_Title_Internal: mw.TextBlock
	public get text_Title(): mw.TextBlock {
		if(!this.text_Title_Internal&&this.uiWidgetBase) {
			this.text_Title_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_strat/text_Title') as mw.TextBlock
		}
		return this.text_Title_Internal
	}
	private btn_start_Internal: mw.StaleButton
	public get btn_start(): mw.StaleButton {
		if(!this.btn_start_Internal&&this.uiWidgetBase) {
			this.btn_start_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_strat/btn_start') as mw.StaleButton
		}
		return this.btn_start_Internal
	}
	private img_paint1_Internal: mw.Image
	public get img_paint1(): mw.Image {
		if(!this.img_paint1_Internal&&this.uiWidgetBase) {
			this.img_paint1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_strat/img_paint1') as mw.Image
		}
		return this.img_paint1_Internal
	}
	private btn_rankinglist_Internal: mw.Button
	public get btn_rankinglist(): mw.Button {
		if(!this.btn_rankinglist_Internal&&this.uiWidgetBase) {
			this.btn_rankinglist_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_strat/btn_rankinglist') as mw.Button
		}
		return this.btn_rankinglist_Internal
	}
	private canvas_subtitles_Internal: mw.Canvas
	public get canvas_subtitles(): mw.Canvas {
		if(!this.canvas_subtitles_Internal&&this.uiWidgetBase) {
			this.canvas_subtitles_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_strat/canvas_subtitles') as mw.Canvas
		}
		return this.canvas_subtitles_Internal
	}
	private text_subtitles_Internal: mw.TextBlock
	public get text_subtitles(): mw.TextBlock {
		if(!this.text_subtitles_Internal&&this.uiWidgetBase) {
			this.text_subtitles_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_strat/canvas_subtitles/text_subtitles') as mw.TextBlock
		}
		return this.text_subtitles_Internal
	}
	private newCanvas_Internal: mw.Canvas
	public get newCanvas(): mw.Canvas {
		if(!this.newCanvas_Internal&&this.uiWidgetBase) {
			this.newCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_strat/newCanvas') as mw.Canvas
		}
		return this.newCanvas_Internal
	}
	private canvas_switch_Internal: mw.Canvas
	public get canvas_switch(): mw.Canvas {
		if(!this.canvas_switch_Internal&&this.uiWidgetBase) {
			this.canvas_switch_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_strat/newCanvas/canvas_switch') as mw.Canvas
		}
		return this.canvas_switch_Internal
	}
	private img_paint2_Internal: mw.Image
	public get img_paint2(): mw.Image {
		if(!this.img_paint2_Internal&&this.uiWidgetBase) {
			this.img_paint2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_strat/newCanvas/canvas_switch/img_paint2') as mw.Image
		}
		return this.img_paint2_Internal
	}
	private text_style_Internal: mw.TextBlock
	public get text_style(): mw.TextBlock {
		if(!this.text_style_Internal&&this.uiWidgetBase) {
			this.text_style_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_strat/newCanvas/canvas_switch/text_style') as mw.TextBlock
		}
		return this.text_style_Internal
	}
	private btn_switchstyle_Internal: mw.StaleButton
	public get btn_switchstyle(): mw.StaleButton {
		if(!this.btn_switchstyle_Internal&&this.uiWidgetBase) {
			this.btn_switchstyle_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_strat/newCanvas/canvas_switch/btn_switchstyle') as mw.StaleButton
		}
		return this.btn_switchstyle_Internal
	}
	private canvas_hall_Internal: mw.Canvas
	public get canvas_hall(): mw.Canvas {
		if(!this.canvas_hall_Internal&&this.uiWidgetBase) {
			this.canvas_hall_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_strat/newCanvas/canvas_hall') as mw.Canvas
		}
		return this.canvas_hall_Internal
	}
	private img_paint3_Internal: mw.Image
	public get img_paint3(): mw.Image {
		if(!this.img_paint3_Internal&&this.uiWidgetBase) {
			this.img_paint3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_strat/newCanvas/canvas_hall/img_paint3') as mw.Image
		}
		return this.img_paint3_Internal
	}
	private btn_backToHall_Internal: mw.StaleButton
	public get btn_backToHall(): mw.StaleButton {
		if(!this.btn_backToHall_Internal&&this.uiWidgetBase) {
			this.btn_backToHall_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_strat/newCanvas/canvas_hall/btn_backToHall') as mw.StaleButton
		}
		return this.btn_backToHall_Internal
	}
	private text_Title1_Internal: mw.TextBlock
	public get text_Title1(): mw.TextBlock {
		if(!this.text_Title1_Internal&&this.uiWidgetBase) {
			this.text_Title1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_strat/text_Title1') as mw.TextBlock
		}
		return this.text_Title1_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btn_start.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Start_UI_btn_start");
		})
		this.initLanguage(this.btn_start);
		this.btn_start.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_start.onPressed.add(() => {
			this.btn_start["preScale"] = this.btn_start.renderScale;
			this.btn_start.renderScale = Vector2.one.set(this.btn_start["preScale"]).multiply(1.1);
		})
		this.btn_start.onReleased.add(() => {
			this.btn_start.renderScale = this.btn_start["preScale"];
		})
		
		
	
		this.btn_switchstyle.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Start_UI_btn_switchstyle");
		})
		this.initLanguage(this.btn_switchstyle);
		this.btn_switchstyle.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_switchstyle.onPressed.add(() => {
			this.btn_switchstyle["preScale"] = this.btn_switchstyle.renderScale;
			this.btn_switchstyle.renderScale = Vector2.one.set(this.btn_switchstyle["preScale"]).multiply(1.1);
		})
		this.btn_switchstyle.onReleased.add(() => {
			this.btn_switchstyle.renderScale = this.btn_switchstyle["preScale"];
		})
		
		
	
		this.btn_backToHall.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Start_UI_btn_backToHall");
		})
		this.initLanguage(this.btn_backToHall);
		this.btn_backToHall.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_backToHall.onPressed.add(() => {
			this.btn_backToHall["preScale"] = this.btn_backToHall.renderScale;
			this.btn_backToHall.renderScale = Vector2.one.set(this.btn_backToHall["preScale"]).multiply(1.1);
		})
		this.btn_backToHall.onReleased.add(() => {
			this.btn_backToHall.renderScale = this.btn_backToHall["preScale"];
		})
		
		
	
		//按钮添加点击
		
		this.btn_rankinglist.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Start_UI_btn_rankinglist");
		})
		this.btn_rankinglist.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_rankinglist.onPressed.add(() => {
			this.btn_rankinglist["preScale"] = this.btn_rankinglist.renderScale;
			this.btn_rankinglist.renderScale = Vector2.one.set(this.btn_rankinglist["preScale"]).multiply(1.1);
		})
		this.btn_rankinglist.onReleased.add(() => {
			this.btn_rankinglist.renderScale = this.btn_rankinglist["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_Title)
		
	
		this.initLanguage(this.text_subtitles)
		
	
		this.initLanguage(this.text_style)
		
	
		this.initLanguage(this.text_Title1)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Start_UI'] = Start_UI_Generate;