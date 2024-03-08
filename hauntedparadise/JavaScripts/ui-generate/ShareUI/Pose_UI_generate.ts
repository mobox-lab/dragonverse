
 

 @UIBind('UI/ShareUI/Pose_UI.ui')
 export default class Pose_UI_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private canvas_switchpose_Internal: mw.Canvas
	public get canvas_switchpose(): mw.Canvas {
		if(!this.canvas_switchpose_Internal&&this.uiWidgetBase) {
			this.canvas_switchpose_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_switchpose') as mw.Canvas
		}
		return this.canvas_switchpose_Internal
	}
	private scrollbox_pose_Internal: mw.ScrollBox
	public get scrollbox_pose(): mw.ScrollBox {
		if(!this.scrollbox_pose_Internal&&this.uiWidgetBase) {
			this.scrollbox_pose_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_switchpose/scrollbox_pose') as mw.ScrollBox
		}
		return this.scrollbox_pose_Internal
	}
	private canvas_pose1_Internal: mw.Canvas
	public get canvas_pose1(): mw.Canvas {
		if(!this.canvas_pose1_Internal&&this.uiWidgetBase) {
			this.canvas_pose1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_switchpose/scrollbox_pose/canvas_pose1') as mw.Canvas
		}
		return this.canvas_pose1_Internal
	}
	private img_1_Internal: mw.Image
	public get img_1(): mw.Image {
		if(!this.img_1_Internal&&this.uiWidgetBase) {
			this.img_1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_switchpose/scrollbox_pose/canvas_pose1/img_1') as mw.Image
		}
		return this.img_1_Internal
	}
	private btn_pose1_Internal: mw.Button
	public get btn_pose1(): mw.Button {
		if(!this.btn_pose1_Internal&&this.uiWidgetBase) {
			this.btn_pose1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_switchpose/scrollbox_pose/canvas_pose1/btn_pose1') as mw.Button
		}
		return this.btn_pose1_Internal
	}
	private canvas_pose2_Internal: mw.Canvas
	public get canvas_pose2(): mw.Canvas {
		if(!this.canvas_pose2_Internal&&this.uiWidgetBase) {
			this.canvas_pose2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_switchpose/scrollbox_pose/canvas_pose2') as mw.Canvas
		}
		return this.canvas_pose2_Internal
	}
	private img_2_Internal: mw.Image
	public get img_2(): mw.Image {
		if(!this.img_2_Internal&&this.uiWidgetBase) {
			this.img_2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_switchpose/scrollbox_pose/canvas_pose2/img_2') as mw.Image
		}
		return this.img_2_Internal
	}
	private btn_pose2_Internal: mw.Button
	public get btn_pose2(): mw.Button {
		if(!this.btn_pose2_Internal&&this.uiWidgetBase) {
			this.btn_pose2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_switchpose/scrollbox_pose/canvas_pose2/btn_pose2') as mw.Button
		}
		return this.btn_pose2_Internal
	}
	private canvas_pose3_Internal: mw.Canvas
	public get canvas_pose3(): mw.Canvas {
		if(!this.canvas_pose3_Internal&&this.uiWidgetBase) {
			this.canvas_pose3_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_switchpose/scrollbox_pose/canvas_pose3') as mw.Canvas
		}
		return this.canvas_pose3_Internal
	}
	private img_3_Internal: mw.Image
	public get img_3(): mw.Image {
		if(!this.img_3_Internal&&this.uiWidgetBase) {
			this.img_3_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_switchpose/scrollbox_pose/canvas_pose3/img_3') as mw.Image
		}
		return this.img_3_Internal
	}
	private btn_pose3_Internal: mw.Button
	public get btn_pose3(): mw.Button {
		if(!this.btn_pose3_Internal&&this.uiWidgetBase) {
			this.btn_pose3_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_switchpose/scrollbox_pose/canvas_pose3/btn_pose3') as mw.Button
		}
		return this.btn_pose3_Internal
	}
	private canvas_pose4_Internal: mw.Canvas
	public get canvas_pose4(): mw.Canvas {
		if(!this.canvas_pose4_Internal&&this.uiWidgetBase) {
			this.canvas_pose4_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_switchpose/scrollbox_pose/canvas_pose4') as mw.Canvas
		}
		return this.canvas_pose4_Internal
	}
	private img_4_Internal: mw.Image
	public get img_4(): mw.Image {
		if(!this.img_4_Internal&&this.uiWidgetBase) {
			this.img_4_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_switchpose/scrollbox_pose/canvas_pose4/img_4') as mw.Image
		}
		return this.img_4_Internal
	}
	private btn_pose4_Internal: mw.Button
	public get btn_pose4(): mw.Button {
		if(!this.btn_pose4_Internal&&this.uiWidgetBase) {
			this.btn_pose4_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_switchpose/scrollbox_pose/canvas_pose4/btn_pose4') as mw.Button
		}
		return this.btn_pose4_Internal
	}
	private btn_offposition_Internal: mw.Button
	public get btn_offposition(): mw.Button {
		if(!this.btn_offposition_Internal&&this.uiWidgetBase) {
			this.btn_offposition_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/btn_offposition') as mw.Button
		}
		return this.btn_offposition_Internal
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
		
		this.btn_pose1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Pose_UI_btn_pose1");
		})
		this.btn_pose1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_pose1.onPressed.add(() => {
			this.btn_pose1["preScale"] = this.btn_pose1.renderScale;
			this.btn_pose1.renderScale = Vector2.one.set(this.btn_pose1["preScale"]).multiply(1.1);
		})
		this.btn_pose1.onReleased.add(() => {
			this.btn_pose1.renderScale = this.btn_pose1["preScale"];
		})
		
	
		this.btn_pose2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Pose_UI_btn_pose2");
		})
		this.btn_pose2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_pose2.onPressed.add(() => {
			this.btn_pose2["preScale"] = this.btn_pose2.renderScale;
			this.btn_pose2.renderScale = Vector2.one.set(this.btn_pose2["preScale"]).multiply(1.1);
		})
		this.btn_pose2.onReleased.add(() => {
			this.btn_pose2.renderScale = this.btn_pose2["preScale"];
		})
		
	
		this.btn_pose3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Pose_UI_btn_pose3");
		})
		this.btn_pose3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_pose3.onPressed.add(() => {
			this.btn_pose3["preScale"] = this.btn_pose3.renderScale;
			this.btn_pose3.renderScale = Vector2.one.set(this.btn_pose3["preScale"]).multiply(1.1);
		})
		this.btn_pose3.onReleased.add(() => {
			this.btn_pose3.renderScale = this.btn_pose3["preScale"];
		})
		
	
		this.btn_pose4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Pose_UI_btn_pose4");
		})
		this.btn_pose4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_pose4.onPressed.add(() => {
			this.btn_pose4["preScale"] = this.btn_pose4.renderScale;
			this.btn_pose4.renderScale = Vector2.one.set(this.btn_pose4["preScale"]).multiply(1.1);
		})
		this.btn_pose4.onReleased.add(() => {
			this.btn_pose4.renderScale = this.btn_pose4["preScale"];
		})
		
	
		this.btn_offposition.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Pose_UI_btn_offposition");
		})
		this.btn_offposition.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_offposition.onPressed.add(() => {
			this.btn_offposition["preScale"] = this.btn_offposition.renderScale;
			this.btn_offposition.renderScale = Vector2.one.set(this.btn_offposition["preScale"]).multiply(1.1);
		})
		this.btn_offposition.onReleased.add(() => {
			this.btn_offposition.renderScale = this.btn_offposition["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Pose_UI'] = Pose_UI_Generate;