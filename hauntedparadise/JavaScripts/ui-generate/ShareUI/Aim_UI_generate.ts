
 

 @UIBind('UI/ShareUI/Aim_UI.ui')
 export default class Aim_UI_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private canvas_move_Internal: mw.Canvas
	public get canvas_move(): mw.Canvas {
		if(!this.canvas_move_Internal&&this.uiWidgetBase) {
			this.canvas_move_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_move') as mw.Canvas
		}
		return this.canvas_move_Internal
	}
	private mVirtualJoystickPanel_Internal: mw.VirtualJoystickPanel
	public get mVirtualJoystickPanel(): mw.VirtualJoystickPanel {
		if(!this.mVirtualJoystickPanel_Internal&&this.uiWidgetBase) {
			this.mVirtualJoystickPanel_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_move/mVirtualJoystickPanel') as mw.VirtualJoystickPanel
		}
		return this.mVirtualJoystickPanel_Internal
	}
	private canvas_turntable_Internal: mw.Canvas
	public get canvas_turntable(): mw.Canvas {
		if(!this.canvas_turntable_Internal&&this.uiWidgetBase) {
			this.canvas_turntable_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_turntable') as mw.Canvas
		}
		return this.canvas_turntable_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_turntable/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private img_marker1_Internal: mw.Image
	public get img_marker1(): mw.Image {
		if(!this.img_marker1_Internal&&this.uiWidgetBase) {
			this.img_marker1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_turntable/img_marker1') as mw.Image
		}
		return this.img_marker1_Internal
	}
	private img_marker2_Internal: mw.Image
	public get img_marker2(): mw.Image {
		if(!this.img_marker2_Internal&&this.uiWidgetBase) {
			this.img_marker2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_turntable/img_marker2') as mw.Image
		}
		return this.img_marker2_Internal
	}
	private img_marker3_Internal: mw.Image
	public get img_marker3(): mw.Image {
		if(!this.img_marker3_Internal&&this.uiWidgetBase) {
			this.img_marker3_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_turntable/img_marker3') as mw.Image
		}
		return this.img_marker3_Internal
	}
	private img_marker4_Internal: mw.Image
	public get img_marker4(): mw.Image {
		if(!this.img_marker4_Internal&&this.uiWidgetBase) {
			this.img_marker4_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_turntable/img_marker4') as mw.Image
		}
		return this.img_marker4_Internal
	}
	private img_turntable_Internal: mw.Image
	public get img_turntable(): mw.Image {
		if(!this.img_turntable_Internal&&this.uiWidgetBase) {
			this.img_turntable_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_turntable/img_turntable') as mw.Image
		}
		return this.img_turntable_Internal
	}
	private canvas_rotate_Internal: mw.Canvas
	public get canvas_rotate(): mw.Canvas {
		if(!this.canvas_rotate_Internal&&this.uiWidgetBase) {
			this.canvas_rotate_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_turntable/canvas_rotate') as mw.Canvas
		}
		return this.canvas_rotate_Internal
	}
	private img_gear_Internal: mw.Image
	public get img_gear(): mw.Image {
		if(!this.img_gear_Internal&&this.uiWidgetBase) {
			this.img_gear_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_turntable/canvas_rotate/img_gear') as mw.Image
		}
		return this.img_gear_Internal
	}
	private img_pointer1_Internal: mw.Image
	public get img_pointer1(): mw.Image {
		if(!this.img_pointer1_Internal&&this.uiWidgetBase) {
			this.img_pointer1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_turntable/canvas_rotate/img_pointer1') as mw.Image
		}
		return this.img_pointer1_Internal
	}
	private img_pointer2_Internal: mw.Image
	public get img_pointer2(): mw.Image {
		if(!this.img_pointer2_Internal&&this.uiWidgetBase) {
			this.img_pointer2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_turntable/canvas_rotate/img_pointer2') as mw.Image
		}
		return this.img_pointer2_Internal
	}
	private img_pointer3_Internal: mw.Image
	public get img_pointer3(): mw.Image {
		if(!this.img_pointer3_Internal&&this.uiWidgetBase) {
			this.img_pointer3_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_turntable/canvas_rotate/img_pointer3') as mw.Image
		}
		return this.img_pointer3_Internal
	}
	private img_pointer4_Internal: mw.Image
	public get img_pointer4(): mw.Image {
		if(!this.img_pointer4_Internal&&this.uiWidgetBase) {
			this.img_pointer4_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_turntable/canvas_rotate/img_pointer4') as mw.Image
		}
		return this.img_pointer4_Internal
	}
	private canvas_back_Internal: mw.Canvas
	public get canvas_back(): mw.Canvas {
		if(!this.canvas_back_Internal&&this.uiWidgetBase) {
			this.canvas_back_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_back') as mw.Canvas
		}
		return this.canvas_back_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_back/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private canvas_hand_Internal: mw.Canvas
	public get canvas_hand(): mw.Canvas {
		if(!this.canvas_hand_Internal&&this.uiWidgetBase) {
			this.canvas_hand_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_hand') as mw.Canvas
		}
		return this.canvas_hand_Internal
	}
	private btn_hand_Internal: mw.Button
	public get btn_hand(): mw.Button {
		if(!this.btn_hand_Internal&&this.uiWidgetBase) {
			this.btn_hand_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_hand/btn_hand') as mw.Button
		}
		return this.btn_hand_Internal
	}
	private canvas_tips_Internal: mw.Canvas
	public get canvas_tips(): mw.Canvas {
		if(!this.canvas_tips_Internal&&this.uiWidgetBase) {
			this.canvas_tips_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_tips') as mw.Canvas
		}
		return this.canvas_tips_Internal
	}
	private text_tip_Internal: mw.TextBlock
	public get text_tip(): mw.TextBlock {
		if(!this.text_tip_Internal&&this.uiWidgetBase) {
			this.text_tip_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_tips/text_tip') as mw.TextBlock
		}
		return this.text_tip_Internal
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
			Event.dispatchToLocal("PlayButtonClick", "Aim_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.btn_hand.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Aim_UI_btn_hand");
		})
		this.btn_hand.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_hand.onPressed.add(() => {
			this.btn_hand["preScale"] = this.btn_hand.renderScale;
			this.btn_hand.renderScale = Vector2.one.set(this.btn_hand["preScale"]).multiply(1.1);
		})
		this.btn_hand.onReleased.add(() => {
			this.btn_hand.renderScale = this.btn_hand["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_tip)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Aim_UI'] = Aim_UI_Generate;