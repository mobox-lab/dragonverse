
 

 @UIBind('UI/ShareUI/Password_UI.ui')
 export default class Password_UI_Generate extends UIScript {
	 	private mMainCanvas_Internal: mw.Canvas
	public get mMainCanvas(): mw.Canvas {
		if(!this.mMainCanvas_Internal&&this.uiWidgetBase) {
			this.mMainCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas') as mw.Canvas
		}
		return this.mMainCanvas_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private img_inputbg_Internal: mw.Image
	public get img_inputbg(): mw.Image {
		if(!this.img_inputbg_Internal&&this.uiWidgetBase) {
			this.img_inputbg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/img_inputbg') as mw.Image
		}
		return this.img_inputbg_Internal
	}
	private mInputCanvas_Internal: mw.Canvas
	public get mInputCanvas(): mw.Canvas {
		if(!this.mInputCanvas_Internal&&this.uiWidgetBase) {
			this.mInputCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas') as mw.Canvas
		}
		return this.mInputCanvas_Internal
	}
	private minput_1_Internal: mw.Canvas
	public get minput_1(): mw.Canvas {
		if(!this.minput_1_Internal&&this.uiWidgetBase) {
			this.minput_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas/minput_1') as mw.Canvas
		}
		return this.minput_1_Internal
	}
	private text_input_1_Internal: mw.TextBlock
	public get text_input_1(): mw.TextBlock {
		if(!this.text_input_1_Internal&&this.uiWidgetBase) {
			this.text_input_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas/minput_1/text_input_1') as mw.TextBlock
		}
		return this.text_input_1_Internal
	}
	private img_input_2_Internal: mw.Image
	public get img_input_2(): mw.Image {
		if(!this.img_input_2_Internal&&this.uiWidgetBase) {
			this.img_input_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas/minput_1/img_input_2') as mw.Image
		}
		return this.img_input_2_Internal
	}
	private img_input_line_1_Internal: mw.Image
	public get img_input_line_1(): mw.Image {
		if(!this.img_input_line_1_Internal&&this.uiWidgetBase) {
			this.img_input_line_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas/minput_1/img_input_line_1') as mw.Image
		}
		return this.img_input_line_1_Internal
	}
	private minput_2_Internal: mw.Canvas
	public get minput_2(): mw.Canvas {
		if(!this.minput_2_Internal&&this.uiWidgetBase) {
			this.minput_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas/minput_2') as mw.Canvas
		}
		return this.minput_2_Internal
	}
	private img_input_1_Internal: mw.Image
	public get img_input_1(): mw.Image {
		if(!this.img_input_1_Internal&&this.uiWidgetBase) {
			this.img_input_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas/minput_2/img_input_1') as mw.Image
		}
		return this.img_input_1_Internal
	}
	private img_input_line_2_Internal: mw.Image
	public get img_input_line_2(): mw.Image {
		if(!this.img_input_line_2_Internal&&this.uiWidgetBase) {
			this.img_input_line_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas/minput_2/img_input_line_2') as mw.Image
		}
		return this.img_input_line_2_Internal
	}
	private text_input_2_Internal: mw.TextBlock
	public get text_input_2(): mw.TextBlock {
		if(!this.text_input_2_Internal&&this.uiWidgetBase) {
			this.text_input_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas/minput_2/text_input_2') as mw.TextBlock
		}
		return this.text_input_2_Internal
	}
	private minput_3_Internal: mw.Canvas
	public get minput_3(): mw.Canvas {
		if(!this.minput_3_Internal&&this.uiWidgetBase) {
			this.minput_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas/minput_3') as mw.Canvas
		}
		return this.minput_3_Internal
	}
	private img_input_3_Internal: mw.Image
	public get img_input_3(): mw.Image {
		if(!this.img_input_3_Internal&&this.uiWidgetBase) {
			this.img_input_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas/minput_3/img_input_3') as mw.Image
		}
		return this.img_input_3_Internal
	}
	private img_input_line_3_Internal: mw.Image
	public get img_input_line_3(): mw.Image {
		if(!this.img_input_line_3_Internal&&this.uiWidgetBase) {
			this.img_input_line_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas/minput_3/img_input_line_3') as mw.Image
		}
		return this.img_input_line_3_Internal
	}
	private text_input_3_Internal: mw.TextBlock
	public get text_input_3(): mw.TextBlock {
		if(!this.text_input_3_Internal&&this.uiWidgetBase) {
			this.text_input_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas/minput_3/text_input_3') as mw.TextBlock
		}
		return this.text_input_3_Internal
	}
	private minput_4_Internal: mw.Canvas
	public get minput_4(): mw.Canvas {
		if(!this.minput_4_Internal&&this.uiWidgetBase) {
			this.minput_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas/minput_4') as mw.Canvas
		}
		return this.minput_4_Internal
	}
	private img_input_4_Internal: mw.Image
	public get img_input_4(): mw.Image {
		if(!this.img_input_4_Internal&&this.uiWidgetBase) {
			this.img_input_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas/minput_4/img_input_4') as mw.Image
		}
		return this.img_input_4_Internal
	}
	private img_input_line_4_Internal: mw.Image
	public get img_input_line_4(): mw.Image {
		if(!this.img_input_line_4_Internal&&this.uiWidgetBase) {
			this.img_input_line_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas/minput_4/img_input_line_4') as mw.Image
		}
		return this.img_input_line_4_Internal
	}
	private text_input_4_Internal: mw.TextBlock
	public get text_input_4(): mw.TextBlock {
		if(!this.text_input_4_Internal&&this.uiWidgetBase) {
			this.text_input_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mInputCanvas/minput_4/text_input_4') as mw.TextBlock
		}
		return this.text_input_4_Internal
	}
	private btn_number1_Internal: mw.StaleButton
	public get btn_number1(): mw.StaleButton {
		if(!this.btn_number1_Internal&&this.uiWidgetBase) {
			this.btn_number1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_number1') as mw.StaleButton
		}
		return this.btn_number1_Internal
	}
	private btn_number2_Internal: mw.StaleButton
	public get btn_number2(): mw.StaleButton {
		if(!this.btn_number2_Internal&&this.uiWidgetBase) {
			this.btn_number2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_number2') as mw.StaleButton
		}
		return this.btn_number2_Internal
	}
	private btn_number3_Internal: mw.StaleButton
	public get btn_number3(): mw.StaleButton {
		if(!this.btn_number3_Internal&&this.uiWidgetBase) {
			this.btn_number3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_number3') as mw.StaleButton
		}
		return this.btn_number3_Internal
	}
	private btn_number4_Internal: mw.StaleButton
	public get btn_number4(): mw.StaleButton {
		if(!this.btn_number4_Internal&&this.uiWidgetBase) {
			this.btn_number4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_number4') as mw.StaleButton
		}
		return this.btn_number4_Internal
	}
	private btn_number5_Internal: mw.StaleButton
	public get btn_number5(): mw.StaleButton {
		if(!this.btn_number5_Internal&&this.uiWidgetBase) {
			this.btn_number5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_number5') as mw.StaleButton
		}
		return this.btn_number5_Internal
	}
	private btn_number6_Internal: mw.StaleButton
	public get btn_number6(): mw.StaleButton {
		if(!this.btn_number6_Internal&&this.uiWidgetBase) {
			this.btn_number6_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_number6') as mw.StaleButton
		}
		return this.btn_number6_Internal
	}
	private btn_number7_Internal: mw.StaleButton
	public get btn_number7(): mw.StaleButton {
		if(!this.btn_number7_Internal&&this.uiWidgetBase) {
			this.btn_number7_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_number7') as mw.StaleButton
		}
		return this.btn_number7_Internal
	}
	private btn_number8_Internal: mw.StaleButton
	public get btn_number8(): mw.StaleButton {
		if(!this.btn_number8_Internal&&this.uiWidgetBase) {
			this.btn_number8_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_number8') as mw.StaleButton
		}
		return this.btn_number8_Internal
	}
	private btn_number9_Internal: mw.StaleButton
	public get btn_number9(): mw.StaleButton {
		if(!this.btn_number9_Internal&&this.uiWidgetBase) {
			this.btn_number9_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_number9') as mw.StaleButton
		}
		return this.btn_number9_Internal
	}
	private btn_number0_Internal: mw.StaleButton
	public get btn_number0(): mw.StaleButton {
		if(!this.btn_number0_Internal&&this.uiWidgetBase) {
			this.btn_number0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_number0') as mw.StaleButton
		}
		return this.btn_number0_Internal
	}
	private btn_enter_Internal: mw.StaleButton
	public get btn_enter(): mw.StaleButton {
		if(!this.btn_enter_Internal&&this.uiWidgetBase) {
			this.btn_enter_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_enter') as mw.StaleButton
		}
		return this.btn_enter_Internal
	}
	private btn_enter_close_Internal: mw.StaleButton
	public get btn_enter_close(): mw.StaleButton {
		if(!this.btn_enter_close_Internal&&this.uiWidgetBase) {
			this.btn_enter_close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_enter_close') as mw.StaleButton
		}
		return this.btn_enter_close_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btn_number1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Password_UI_btn_number1");
		})
		this.initLanguage(this.btn_number1);
		this.btn_number1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_number1.onPressed.add(() => {
			this.btn_number1["preScale"] = this.btn_number1.renderScale;
			this.btn_number1.renderScale = Vector2.one.set(this.btn_number1["preScale"]).multiply(1.1);
		})
		this.btn_number1.onReleased.add(() => {
			this.btn_number1.renderScale = this.btn_number1["preScale"];
		})
		
		
	
		this.btn_number2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Password_UI_btn_number2");
		})
		this.initLanguage(this.btn_number2);
		this.btn_number2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_number2.onPressed.add(() => {
			this.btn_number2["preScale"] = this.btn_number2.renderScale;
			this.btn_number2.renderScale = Vector2.one.set(this.btn_number2["preScale"]).multiply(1.1);
		})
		this.btn_number2.onReleased.add(() => {
			this.btn_number2.renderScale = this.btn_number2["preScale"];
		})
		
		
	
		this.btn_number3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Password_UI_btn_number3");
		})
		this.initLanguage(this.btn_number3);
		this.btn_number3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_number3.onPressed.add(() => {
			this.btn_number3["preScale"] = this.btn_number3.renderScale;
			this.btn_number3.renderScale = Vector2.one.set(this.btn_number3["preScale"]).multiply(1.1);
		})
		this.btn_number3.onReleased.add(() => {
			this.btn_number3.renderScale = this.btn_number3["preScale"];
		})
		
		
	
		this.btn_number4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Password_UI_btn_number4");
		})
		this.initLanguage(this.btn_number4);
		this.btn_number4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_number4.onPressed.add(() => {
			this.btn_number4["preScale"] = this.btn_number4.renderScale;
			this.btn_number4.renderScale = Vector2.one.set(this.btn_number4["preScale"]).multiply(1.1);
		})
		this.btn_number4.onReleased.add(() => {
			this.btn_number4.renderScale = this.btn_number4["preScale"];
		})
		
		
	
		this.btn_number5.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Password_UI_btn_number5");
		})
		this.initLanguage(this.btn_number5);
		this.btn_number5.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_number5.onPressed.add(() => {
			this.btn_number5["preScale"] = this.btn_number5.renderScale;
			this.btn_number5.renderScale = Vector2.one.set(this.btn_number5["preScale"]).multiply(1.1);
		})
		this.btn_number5.onReleased.add(() => {
			this.btn_number5.renderScale = this.btn_number5["preScale"];
		})
		
		
	
		this.btn_number6.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Password_UI_btn_number6");
		})
		this.initLanguage(this.btn_number6);
		this.btn_number6.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_number6.onPressed.add(() => {
			this.btn_number6["preScale"] = this.btn_number6.renderScale;
			this.btn_number6.renderScale = Vector2.one.set(this.btn_number6["preScale"]).multiply(1.1);
		})
		this.btn_number6.onReleased.add(() => {
			this.btn_number6.renderScale = this.btn_number6["preScale"];
		})
		
		
	
		this.btn_number7.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Password_UI_btn_number7");
		})
		this.initLanguage(this.btn_number7);
		this.btn_number7.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_number7.onPressed.add(() => {
			this.btn_number7["preScale"] = this.btn_number7.renderScale;
			this.btn_number7.renderScale = Vector2.one.set(this.btn_number7["preScale"]).multiply(1.1);
		})
		this.btn_number7.onReleased.add(() => {
			this.btn_number7.renderScale = this.btn_number7["preScale"];
		})
		
		
	
		this.btn_number8.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Password_UI_btn_number8");
		})
		this.initLanguage(this.btn_number8);
		this.btn_number8.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_number8.onPressed.add(() => {
			this.btn_number8["preScale"] = this.btn_number8.renderScale;
			this.btn_number8.renderScale = Vector2.one.set(this.btn_number8["preScale"]).multiply(1.1);
		})
		this.btn_number8.onReleased.add(() => {
			this.btn_number8.renderScale = this.btn_number8["preScale"];
		})
		
		
	
		this.btn_number9.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Password_UI_btn_number9");
		})
		this.initLanguage(this.btn_number9);
		this.btn_number9.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_number9.onPressed.add(() => {
			this.btn_number9["preScale"] = this.btn_number9.renderScale;
			this.btn_number9.renderScale = Vector2.one.set(this.btn_number9["preScale"]).multiply(1.1);
		})
		this.btn_number9.onReleased.add(() => {
			this.btn_number9.renderScale = this.btn_number9["preScale"];
		})
		
		
	
		this.btn_number0.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Password_UI_btn_number0");
		})
		this.initLanguage(this.btn_number0);
		this.btn_number0.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_number0.onPressed.add(() => {
			this.btn_number0["preScale"] = this.btn_number0.renderScale;
			this.btn_number0.renderScale = Vector2.one.set(this.btn_number0["preScale"]).multiply(1.1);
		})
		this.btn_number0.onReleased.add(() => {
			this.btn_number0.renderScale = this.btn_number0["preScale"];
		})
		
		
	
		this.btn_enter.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Password_UI_btn_enter");
		})
		this.initLanguage(this.btn_enter);
		this.btn_enter.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_enter.onPressed.add(() => {
			this.btn_enter["preScale"] = this.btn_enter.renderScale;
			this.btn_enter.renderScale = Vector2.one.set(this.btn_enter["preScale"]).multiply(1.1);
		})
		this.btn_enter.onReleased.add(() => {
			this.btn_enter.renderScale = this.btn_enter["preScale"];
		})
		
		
	
		this.btn_enter_close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Password_UI_btn_enter_close");
		})
		this.initLanguage(this.btn_enter_close);
		this.btn_enter_close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_enter_close.onPressed.add(() => {
			this.btn_enter_close["preScale"] = this.btn_enter_close.renderScale;
			this.btn_enter_close.renderScale = Vector2.one.set(this.btn_enter_close["preScale"]).multiply(1.1);
		})
		this.btn_enter_close.onReleased.add(() => {
			this.btn_enter_close.renderScale = this.btn_enter_close["preScale"];
		})
		
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_input_1)
		
	
		this.initLanguage(this.text_input_2)
		
	
		this.initLanguage(this.text_input_3)
		
	
		this.initLanguage(this.text_input_4)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Password_UI'] = Password_UI_Generate;