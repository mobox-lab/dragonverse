
 

 @UIBind('UI/ShareUI/Notebook_UI.ui')
 export default class Notebook_UI_Generate extends UIScript {
	 	private rootcanvas_Internal: mw.Canvas
	public get rootcanvas(): mw.Canvas {
		if(!this.rootcanvas_Internal&&this.uiWidgetBase) {
			this.rootcanvas_Internal = this.uiWidgetBase.findChildByPath('rootcanvas') as mw.Canvas
		}
		return this.rootcanvas_Internal
	}
	private btn_bg0_Internal: mw.Button
	public get btn_bg0(): mw.Button {
		if(!this.btn_bg0_Internal&&this.uiWidgetBase) {
			this.btn_bg0_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/btn_bg0') as mw.Button
		}
		return this.btn_bg0_Internal
	}
	private canvas_whiteline_Internal: mw.Canvas
	public get canvas_whiteline(): mw.Canvas {
		if(!this.canvas_whiteline_Internal&&this.uiWidgetBase) {
			this.canvas_whiteline_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_whiteline') as mw.Canvas
		}
		return this.canvas_whiteline_Internal
	}
	private canvas_pageturning_Internal: mw.Canvas
	public get canvas_pageturning(): mw.Canvas {
		if(!this.canvas_pageturning_Internal&&this.uiWidgetBase) {
			this.canvas_pageturning_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning') as mw.Canvas
		}
		return this.canvas_pageturning_Internal
	}
	private canvas_pageturning6_Internal: mw.Canvas
	public get canvas_pageturning6(): mw.Canvas {
		if(!this.canvas_pageturning6_Internal&&this.uiWidgetBase) {
			this.canvas_pageturning6_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning6') as mw.Canvas
		}
		return this.canvas_pageturning6_Internal
	}
	private btn_pageturning6_Internal: mw.Button
	public get btn_pageturning6(): mw.Button {
		if(!this.btn_pageturning6_Internal&&this.uiWidgetBase) {
			this.btn_pageturning6_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning6/btn_pageturning6') as mw.Button
		}
		return this.btn_pageturning6_Internal
	}
	private img_point6_Internal: mw.Image
	public get img_point6(): mw.Image {
		if(!this.img_point6_Internal&&this.uiWidgetBase) {
			this.img_point6_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning6/img_point6') as mw.Image
		}
		return this.img_point6_Internal
	}
	private canvas_pageturning5_Internal: mw.Canvas
	public get canvas_pageturning5(): mw.Canvas {
		if(!this.canvas_pageturning5_Internal&&this.uiWidgetBase) {
			this.canvas_pageturning5_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning5') as mw.Canvas
		}
		return this.canvas_pageturning5_Internal
	}
	private btn_pageturning5_Internal: mw.Button
	public get btn_pageturning5(): mw.Button {
		if(!this.btn_pageturning5_Internal&&this.uiWidgetBase) {
			this.btn_pageturning5_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning5/btn_pageturning5') as mw.Button
		}
		return this.btn_pageturning5_Internal
	}
	private img_point5_Internal: mw.Image
	public get img_point5(): mw.Image {
		if(!this.img_point5_Internal&&this.uiWidgetBase) {
			this.img_point5_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning5/img_point5') as mw.Image
		}
		return this.img_point5_Internal
	}
	private canvas_pageturning4_Internal: mw.Canvas
	public get canvas_pageturning4(): mw.Canvas {
		if(!this.canvas_pageturning4_Internal&&this.uiWidgetBase) {
			this.canvas_pageturning4_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning4') as mw.Canvas
		}
		return this.canvas_pageturning4_Internal
	}
	private btn_pageturning4_Internal: mw.Button
	public get btn_pageturning4(): mw.Button {
		if(!this.btn_pageturning4_Internal&&this.uiWidgetBase) {
			this.btn_pageturning4_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning4/btn_pageturning4') as mw.Button
		}
		return this.btn_pageturning4_Internal
	}
	private img_point4_Internal: mw.Image
	public get img_point4(): mw.Image {
		if(!this.img_point4_Internal&&this.uiWidgetBase) {
			this.img_point4_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning4/img_point4') as mw.Image
		}
		return this.img_point4_Internal
	}
	private canvas_pageturning3_Internal: mw.Canvas
	public get canvas_pageturning3(): mw.Canvas {
		if(!this.canvas_pageturning3_Internal&&this.uiWidgetBase) {
			this.canvas_pageturning3_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning3') as mw.Canvas
		}
		return this.canvas_pageturning3_Internal
	}
	private btn_pageturning3_Internal: mw.Button
	public get btn_pageturning3(): mw.Button {
		if(!this.btn_pageturning3_Internal&&this.uiWidgetBase) {
			this.btn_pageturning3_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning3/btn_pageturning3') as mw.Button
		}
		return this.btn_pageturning3_Internal
	}
	private img_point3_Internal: mw.Image
	public get img_point3(): mw.Image {
		if(!this.img_point3_Internal&&this.uiWidgetBase) {
			this.img_point3_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning3/img_point3') as mw.Image
		}
		return this.img_point3_Internal
	}
	private canvas_pageturning2_Internal: mw.Canvas
	public get canvas_pageturning2(): mw.Canvas {
		if(!this.canvas_pageturning2_Internal&&this.uiWidgetBase) {
			this.canvas_pageturning2_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning2') as mw.Canvas
		}
		return this.canvas_pageturning2_Internal
	}
	private btn_pageturning2_Internal: mw.Button
	public get btn_pageturning2(): mw.Button {
		if(!this.btn_pageturning2_Internal&&this.uiWidgetBase) {
			this.btn_pageturning2_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning2/btn_pageturning2') as mw.Button
		}
		return this.btn_pageturning2_Internal
	}
	private img_point2_Internal: mw.Image
	public get img_point2(): mw.Image {
		if(!this.img_point2_Internal&&this.uiWidgetBase) {
			this.img_point2_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning2/img_point2') as mw.Image
		}
		return this.img_point2_Internal
	}
	private canvas_pageturning1_Internal: mw.Canvas
	public get canvas_pageturning1(): mw.Canvas {
		if(!this.canvas_pageturning1_Internal&&this.uiWidgetBase) {
			this.canvas_pageturning1_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning1') as mw.Canvas
		}
		return this.canvas_pageturning1_Internal
	}
	private btn_pageturning1_Internal: mw.Button
	public get btn_pageturning1(): mw.Button {
		if(!this.btn_pageturning1_Internal&&this.uiWidgetBase) {
			this.btn_pageturning1_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning1/btn_pageturning1') as mw.Button
		}
		return this.btn_pageturning1_Internal
	}
	private img_point1_Internal: mw.Image
	public get img_point1(): mw.Image {
		if(!this.img_point1_Internal&&this.uiWidgetBase) {
			this.img_point1_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pageturning/canvas_pageturning1/img_point1') as mw.Image
		}
		return this.img_point1_Internal
	}
	private canvas_setting_Internal: mw.Canvas
	public get canvas_setting(): mw.Canvas {
		if(!this.canvas_setting_Internal&&this.uiWidgetBase) {
			this.canvas_setting_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_setting') as mw.Canvas
		}
		return this.canvas_setting_Internal
	}
	private canvas_back_Internal: mw.Canvas
	public get canvas_back(): mw.Canvas {
		if(!this.canvas_back_Internal&&this.uiWidgetBase) {
			this.canvas_back_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_back') as mw.Canvas
		}
		return this.canvas_back_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_back/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private canvas_rule_Internal: mw.Canvas
	public get canvas_rule(): mw.Canvas {
		if(!this.canvas_rule_Internal&&this.uiWidgetBase) {
			this.canvas_rule_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_rule') as mw.Canvas
		}
		return this.canvas_rule_Internal
	}
	private canvas_rule1_Internal: mw.Canvas
	public get canvas_rule1(): mw.Canvas {
		if(!this.canvas_rule1_Internal&&this.uiWidgetBase) {
			this.canvas_rule1_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_rule/canvas_rule1') as mw.Canvas
		}
		return this.canvas_rule1_Internal
	}
	private text_1_Internal: mw.TextBlock
	public get text_1(): mw.TextBlock {
		if(!this.text_1_Internal&&this.uiWidgetBase) {
			this.text_1_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_rule/canvas_rule1/text_1') as mw.TextBlock
		}
		return this.text_1_Internal
	}
	private canvas_rule2_Internal: mw.Canvas
	public get canvas_rule2(): mw.Canvas {
		if(!this.canvas_rule2_Internal&&this.uiWidgetBase) {
			this.canvas_rule2_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_rule/canvas_rule2') as mw.Canvas
		}
		return this.canvas_rule2_Internal
	}
	private text_2_Internal: mw.TextBlock
	public get text_2(): mw.TextBlock {
		if(!this.text_2_Internal&&this.uiWidgetBase) {
			this.text_2_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_rule/canvas_rule2/text_2') as mw.TextBlock
		}
		return this.text_2_Internal
	}
	private canvas_rule3_Internal: mw.Canvas
	public get canvas_rule3(): mw.Canvas {
		if(!this.canvas_rule3_Internal&&this.uiWidgetBase) {
			this.canvas_rule3_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_rule/canvas_rule3') as mw.Canvas
		}
		return this.canvas_rule3_Internal
	}
	private text_3_Internal: mw.TextBlock
	public get text_3(): mw.TextBlock {
		if(!this.text_3_Internal&&this.uiWidgetBase) {
			this.text_3_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_rule/canvas_rule3/text_3') as mw.TextBlock
		}
		return this.text_3_Internal
	}
	private canvas_rule4_Internal: mw.Canvas
	public get canvas_rule4(): mw.Canvas {
		if(!this.canvas_rule4_Internal&&this.uiWidgetBase) {
			this.canvas_rule4_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_rule/canvas_rule4') as mw.Canvas
		}
		return this.canvas_rule4_Internal
	}
	private text_4_Internal: mw.TextBlock
	public get text_4(): mw.TextBlock {
		if(!this.text_4_Internal&&this.uiWidgetBase) {
			this.text_4_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_rule/canvas_rule4/text_4') as mw.TextBlock
		}
		return this.text_4_Internal
	}
	private canvas_rule5_Internal: mw.Canvas
	public get canvas_rule5(): mw.Canvas {
		if(!this.canvas_rule5_Internal&&this.uiWidgetBase) {
			this.canvas_rule5_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_rule/canvas_rule5') as mw.Canvas
		}
		return this.canvas_rule5_Internal
	}
	private text_5_Internal: mw.TextBlock
	public get text_5(): mw.TextBlock {
		if(!this.text_5_Internal&&this.uiWidgetBase) {
			this.text_5_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_rule/canvas_rule5/text_5') as mw.TextBlock
		}
		return this.text_5_Internal
	}
	private canvas_rule6_Internal: mw.Canvas
	public get canvas_rule6(): mw.Canvas {
		if(!this.canvas_rule6_Internal&&this.uiWidgetBase) {
			this.canvas_rule6_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_rule/canvas_rule6') as mw.Canvas
		}
		return this.canvas_rule6_Internal
	}
	private text_6_Internal: mw.TextBlock
	public get text_6(): mw.TextBlock {
		if(!this.text_6_Internal&&this.uiWidgetBase) {
			this.text_6_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_rule/canvas_rule6/text_6') as mw.TextBlock
		}
		return this.text_6_Internal
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
		
		this.btn_bg0.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Notebook_UI_btn_bg0");
		})
		this.btn_bg0.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_bg0.onPressed.add(() => {
			this.btn_bg0["preScale"] = this.btn_bg0.renderScale;
			this.btn_bg0.renderScale = Vector2.one.set(this.btn_bg0["preScale"]).multiply(1.1);
		})
		this.btn_bg0.onReleased.add(() => {
			this.btn_bg0.renderScale = this.btn_bg0["preScale"];
		})
		
	
		this.btn_pageturning6.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Notebook_UI_btn_pageturning6");
		})
		this.btn_pageturning6.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_pageturning6.onPressed.add(() => {
			this.btn_pageturning6["preScale"] = this.btn_pageturning6.renderScale;
			this.btn_pageturning6.renderScale = Vector2.one.set(this.btn_pageturning6["preScale"]).multiply(1.1);
		})
		this.btn_pageturning6.onReleased.add(() => {
			this.btn_pageturning6.renderScale = this.btn_pageturning6["preScale"];
		})
		
	
		this.btn_pageturning5.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Notebook_UI_btn_pageturning5");
		})
		this.btn_pageturning5.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_pageturning5.onPressed.add(() => {
			this.btn_pageturning5["preScale"] = this.btn_pageturning5.renderScale;
			this.btn_pageturning5.renderScale = Vector2.one.set(this.btn_pageturning5["preScale"]).multiply(1.1);
		})
		this.btn_pageturning5.onReleased.add(() => {
			this.btn_pageturning5.renderScale = this.btn_pageturning5["preScale"];
		})
		
	
		this.btn_pageturning4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Notebook_UI_btn_pageturning4");
		})
		this.btn_pageturning4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_pageturning4.onPressed.add(() => {
			this.btn_pageturning4["preScale"] = this.btn_pageturning4.renderScale;
			this.btn_pageturning4.renderScale = Vector2.one.set(this.btn_pageturning4["preScale"]).multiply(1.1);
		})
		this.btn_pageturning4.onReleased.add(() => {
			this.btn_pageturning4.renderScale = this.btn_pageturning4["preScale"];
		})
		
	
		this.btn_pageturning3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Notebook_UI_btn_pageturning3");
		})
		this.btn_pageturning3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_pageturning3.onPressed.add(() => {
			this.btn_pageturning3["preScale"] = this.btn_pageturning3.renderScale;
			this.btn_pageturning3.renderScale = Vector2.one.set(this.btn_pageturning3["preScale"]).multiply(1.1);
		})
		this.btn_pageturning3.onReleased.add(() => {
			this.btn_pageturning3.renderScale = this.btn_pageturning3["preScale"];
		})
		
	
		this.btn_pageturning2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Notebook_UI_btn_pageturning2");
		})
		this.btn_pageturning2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_pageturning2.onPressed.add(() => {
			this.btn_pageturning2["preScale"] = this.btn_pageturning2.renderScale;
			this.btn_pageturning2.renderScale = Vector2.one.set(this.btn_pageturning2["preScale"]).multiply(1.1);
		})
		this.btn_pageturning2.onReleased.add(() => {
			this.btn_pageturning2.renderScale = this.btn_pageturning2["preScale"];
		})
		
	
		this.btn_pageturning1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Notebook_UI_btn_pageturning1");
		})
		this.btn_pageturning1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_pageturning1.onPressed.add(() => {
			this.btn_pageturning1["preScale"] = this.btn_pageturning1.renderScale;
			this.btn_pageturning1.renderScale = Vector2.one.set(this.btn_pageturning1["preScale"]).multiply(1.1);
		})
		this.btn_pageturning1.onReleased.add(() => {
			this.btn_pageturning1.renderScale = this.btn_pageturning1["preScale"];
		})
		
	
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Notebook_UI_btn_back");
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
		
		this.initLanguage(this.text_1)
		
	
		this.initLanguage(this.text_2)
		
	
		this.initLanguage(this.text_3)
		
	
		this.initLanguage(this.text_4)
		
	
		this.initLanguage(this.text_5)
		
	
		this.initLanguage(this.text_6)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Notebook_UI'] = Notebook_UI_Generate;