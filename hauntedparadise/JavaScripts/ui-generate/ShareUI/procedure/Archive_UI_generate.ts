
 

 @UIBind('UI/ShareUI/procedure/Archive_UI.ui')
 export default class Archive_UI_Generate extends UIScript {
	 	private canvas_save1_Internal: mw.Canvas
	public get canvas_save1(): mw.Canvas {
		if(!this.canvas_save1_Internal&&this.uiWidgetBase) {
			this.canvas_save1_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save1') as mw.Canvas
		}
		return this.canvas_save1_Internal
	}
	private btn_del1_Internal: mw.Button
	public get btn_del1(): mw.Button {
		if(!this.btn_del1_Internal&&this.uiWidgetBase) {
			this.btn_del1_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save1/btn_del1') as mw.Button
		}
		return this.btn_del1_Internal
	}
	private text_save1_Internal: mw.TextBlock
	public get text_save1(): mw.TextBlock {
		if(!this.text_save1_Internal&&this.uiWidgetBase) {
			this.text_save1_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save1/text_save1') as mw.TextBlock
		}
		return this.text_save1_Internal
	}
	private text_diffi1_Internal: mw.TextBlock
	public get text_diffi1(): mw.TextBlock {
		if(!this.text_diffi1_Internal&&this.uiWidgetBase) {
			this.text_diffi1_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save1/text_diffi1') as mw.TextBlock
		}
		return this.text_diffi1_Internal
	}
	private text_day1_Internal: mw.TextBlock
	public get text_day1(): mw.TextBlock {
		if(!this.text_day1_Internal&&this.uiWidgetBase) {
			this.text_day1_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save1/text_day1') as mw.TextBlock
		}
		return this.text_day1_Internal
	}
	private text_time1_Internal: mw.TextBlock
	public get text_time1(): mw.TextBlock {
		if(!this.text_time1_Internal&&this.uiWidgetBase) {
			this.text_time1_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save1/text_time1') as mw.TextBlock
		}
		return this.text_time1_Internal
	}
	private text_unknown1_Internal: mw.TextBlock
	public get text_unknown1(): mw.TextBlock {
		if(!this.text_unknown1_Internal&&this.uiWidgetBase) {
			this.text_unknown1_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save1/text_unknown1') as mw.TextBlock
		}
		return this.text_unknown1_Internal
	}
	private text_date1_Internal: mw.TextBlock
	public get text_date1(): mw.TextBlock {
		if(!this.text_date1_Internal&&this.uiWidgetBase) {
			this.text_date1_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save1/text_date1') as mw.TextBlock
		}
		return this.text_date1_Internal
	}
	private canvas_save2_Internal: mw.Canvas
	public get canvas_save2(): mw.Canvas {
		if(!this.canvas_save2_Internal&&this.uiWidgetBase) {
			this.canvas_save2_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save2') as mw.Canvas
		}
		return this.canvas_save2_Internal
	}
	private btn_del2_Internal: mw.Button
	public get btn_del2(): mw.Button {
		if(!this.btn_del2_Internal&&this.uiWidgetBase) {
			this.btn_del2_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save2/btn_del2') as mw.Button
		}
		return this.btn_del2_Internal
	}
	private text_save2_Internal: mw.TextBlock
	public get text_save2(): mw.TextBlock {
		if(!this.text_save2_Internal&&this.uiWidgetBase) {
			this.text_save2_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save2/text_save2') as mw.TextBlock
		}
		return this.text_save2_Internal
	}
	private text_diffi2_Internal: mw.TextBlock
	public get text_diffi2(): mw.TextBlock {
		if(!this.text_diffi2_Internal&&this.uiWidgetBase) {
			this.text_diffi2_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save2/text_diffi2') as mw.TextBlock
		}
		return this.text_diffi2_Internal
	}
	private text_unknown2_Internal: mw.TextBlock
	public get text_unknown2(): mw.TextBlock {
		if(!this.text_unknown2_Internal&&this.uiWidgetBase) {
			this.text_unknown2_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save2/text_unknown2') as mw.TextBlock
		}
		return this.text_unknown2_Internal
	}
	private text_date2_Internal: mw.TextBlock
	public get text_date2(): mw.TextBlock {
		if(!this.text_date2_Internal&&this.uiWidgetBase) {
			this.text_date2_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save2/text_date2') as mw.TextBlock
		}
		return this.text_date2_Internal
	}
	private text_day2_Internal: mw.TextBlock
	public get text_day2(): mw.TextBlock {
		if(!this.text_day2_Internal&&this.uiWidgetBase) {
			this.text_day2_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save2/text_day2') as mw.TextBlock
		}
		return this.text_day2_Internal
	}
	private text_time2_Internal: mw.TextBlock
	public get text_time2(): mw.TextBlock {
		if(!this.text_time2_Internal&&this.uiWidgetBase) {
			this.text_time2_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save2/text_time2') as mw.TextBlock
		}
		return this.text_time2_Internal
	}
	private canvas_save3_Internal: mw.Canvas
	public get canvas_save3(): mw.Canvas {
		if(!this.canvas_save3_Internal&&this.uiWidgetBase) {
			this.canvas_save3_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save3') as mw.Canvas
		}
		return this.canvas_save3_Internal
	}
	private btn_del3_Internal: mw.Button
	public get btn_del3(): mw.Button {
		if(!this.btn_del3_Internal&&this.uiWidgetBase) {
			this.btn_del3_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save3/btn_del3') as mw.Button
		}
		return this.btn_del3_Internal
	}
	private text_day3_Internal: mw.TextBlock
	public get text_day3(): mw.TextBlock {
		if(!this.text_day3_Internal&&this.uiWidgetBase) {
			this.text_day3_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save3/text_day3') as mw.TextBlock
		}
		return this.text_day3_Internal
	}
	private text_time3_Internal: mw.TextBlock
	public get text_time3(): mw.TextBlock {
		if(!this.text_time3_Internal&&this.uiWidgetBase) {
			this.text_time3_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save3/text_time3') as mw.TextBlock
		}
		return this.text_time3_Internal
	}
	private text_unknown3_Internal: mw.TextBlock
	public get text_unknown3(): mw.TextBlock {
		if(!this.text_unknown3_Internal&&this.uiWidgetBase) {
			this.text_unknown3_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save3/text_unknown3') as mw.TextBlock
		}
		return this.text_unknown3_Internal
	}
	private text_diffi3_Internal: mw.TextBlock
	public get text_diffi3(): mw.TextBlock {
		if(!this.text_diffi3_Internal&&this.uiWidgetBase) {
			this.text_diffi3_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save3/text_diffi3') as mw.TextBlock
		}
		return this.text_diffi3_Internal
	}
	private text_date3_Internal: mw.TextBlock
	public get text_date3(): mw.TextBlock {
		if(!this.text_date3_Internal&&this.uiWidgetBase) {
			this.text_date3_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save3/text_date3') as mw.TextBlock
		}
		return this.text_date3_Internal
	}
	private text_save3_Internal: mw.TextBlock
	public get text_save3(): mw.TextBlock {
		if(!this.text_save3_Internal&&this.uiWidgetBase) {
			this.text_save3_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/canvas_save3/text_save3') as mw.TextBlock
		}
		return this.text_save3_Internal
	}
	private btn_start1_Internal: mw.Button
	public get btn_start1(): mw.Button {
		if(!this.btn_start1_Internal&&this.uiWidgetBase) {
			this.btn_start1_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/btn_start1') as mw.Button
		}
		return this.btn_start1_Internal
	}
	private btn_start2_Internal: mw.Button
	public get btn_start2(): mw.Button {
		if(!this.btn_start2_Internal&&this.uiWidgetBase) {
			this.btn_start2_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/btn_start2') as mw.Button
		}
		return this.btn_start2_Internal
	}
	private btn_start3_Internal: mw.Button
	public get btn_start3(): mw.Button {
		if(!this.btn_start3_Internal&&this.uiWidgetBase) {
			this.btn_start3_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/btn_start3') as mw.Button
		}
		return this.btn_start3_Internal
	}
	private text_start1_Internal: mw.TextBlock
	public get text_start1(): mw.TextBlock {
		if(!this.text_start1_Internal&&this.uiWidgetBase) {
			this.text_start1_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/text_start1') as mw.TextBlock
		}
		return this.text_start1_Internal
	}
	private text_start2_Internal: mw.TextBlock
	public get text_start2(): mw.TextBlock {
		if(!this.text_start2_Internal&&this.uiWidgetBase) {
			this.text_start2_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/text_start2') as mw.TextBlock
		}
		return this.text_start2_Internal
	}
	private text_start3_Internal: mw.TextBlock
	public get text_start3(): mw.TextBlock {
		if(!this.text_start3_Internal&&this.uiWidgetBase) {
			this.text_start3_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/Canvas_save/text_start3') as mw.TextBlock
		}
		return this.text_start3_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('Rootcanvas/btn_back') as mw.Button
		}
		return this.btn_back_Internal
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
		
		this.btn_del1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Archive_UI_btn_del1");
		})
		this.btn_del1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_del1.onPressed.add(() => {
			this.btn_del1["preScale"] = this.btn_del1.renderScale;
			this.btn_del1.renderScale = Vector2.one.set(this.btn_del1["preScale"]).multiply(1.1);
		})
		this.btn_del1.onReleased.add(() => {
			this.btn_del1.renderScale = this.btn_del1["preScale"];
		})
		
	
		this.btn_del2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Archive_UI_btn_del2");
		})
		this.btn_del2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_del2.onPressed.add(() => {
			this.btn_del2["preScale"] = this.btn_del2.renderScale;
			this.btn_del2.renderScale = Vector2.one.set(this.btn_del2["preScale"]).multiply(1.1);
		})
		this.btn_del2.onReleased.add(() => {
			this.btn_del2.renderScale = this.btn_del2["preScale"];
		})
		
	
		this.btn_del3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Archive_UI_btn_del3");
		})
		this.btn_del3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_del3.onPressed.add(() => {
			this.btn_del3["preScale"] = this.btn_del3.renderScale;
			this.btn_del3.renderScale = Vector2.one.set(this.btn_del3["preScale"]).multiply(1.1);
		})
		this.btn_del3.onReleased.add(() => {
			this.btn_del3.renderScale = this.btn_del3["preScale"];
		})
		
	
		this.btn_start1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Archive_UI_btn_start1");
		})
		this.btn_start1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_start1.onPressed.add(() => {
			this.btn_start1["preScale"] = this.btn_start1.renderScale;
			this.btn_start1.renderScale = Vector2.one.set(this.btn_start1["preScale"]).multiply(1.1);
		})
		this.btn_start1.onReleased.add(() => {
			this.btn_start1.renderScale = this.btn_start1["preScale"];
		})
		
	
		this.btn_start2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Archive_UI_btn_start2");
		})
		this.btn_start2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_start2.onPressed.add(() => {
			this.btn_start2["preScale"] = this.btn_start2.renderScale;
			this.btn_start2.renderScale = Vector2.one.set(this.btn_start2["preScale"]).multiply(1.1);
		})
		this.btn_start2.onReleased.add(() => {
			this.btn_start2.renderScale = this.btn_start2["preScale"];
		})
		
	
		this.btn_start3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Archive_UI_btn_start3");
		})
		this.btn_start3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_start3.onPressed.add(() => {
			this.btn_start3["preScale"] = this.btn_start3.renderScale;
			this.btn_start3.renderScale = Vector2.one.set(this.btn_start3["preScale"]).multiply(1.1);
		})
		this.btn_start3.onReleased.add(() => {
			this.btn_start3.renderScale = this.btn_start3["preScale"];
		})
		
	
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Archive_UI_btn_back");
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
		
		this.initLanguage(this.text_save1)
		
	
		this.initLanguage(this.text_diffi1)
		
	
		this.initLanguage(this.text_day1)
		
	
		this.initLanguage(this.text_time1)
		
	
		this.initLanguage(this.text_unknown1)
		
	
		this.initLanguage(this.text_date1)
		
	
		this.initLanguage(this.text_save2)
		
	
		this.initLanguage(this.text_diffi2)
		
	
		this.initLanguage(this.text_unknown2)
		
	
		this.initLanguage(this.text_date2)
		
	
		this.initLanguage(this.text_day2)
		
	
		this.initLanguage(this.text_time2)
		
	
		this.initLanguage(this.text_day3)
		
	
		this.initLanguage(this.text_time3)
		
	
		this.initLanguage(this.text_unknown3)
		
	
		this.initLanguage(this.text_diffi3)
		
	
		this.initLanguage(this.text_date3)
		
	
		this.initLanguage(this.text_save3)
		
	
		this.initLanguage(this.text_start1)
		
	
		this.initLanguage(this.text_start2)
		
	
		this.initLanguage(this.text_start3)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("Rootcanvas/Canvas_save/Text_save") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Archive_UI'] = Archive_UI_Generate;