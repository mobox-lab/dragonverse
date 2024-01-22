
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/editor_motion/MotionEditorWindow.ui
 * TIME: 2023.11.15-14.12.49
 */

 

 @UIBind('UI/editor_motion/MotionEditorWindow.ui')
 export default class MotionEditorWindow_Generate extends UIScript {
	 	private touchPad_Internal: mw.TouchPad
	public get touchPad(): mw.TouchPad {
		if(!this.touchPad_Internal&&this.uiWidgetBase) {
			this.touchPad_Internal = this.uiWidgetBase.findChildByPath('Canvas/touchPad') as mw.TouchPad
		}
		return this.touchPad_Internal
	}
	private img_sheet_bg_Internal: mw.Image
	public get img_sheet_bg(): mw.Image {
		if(!this.img_sheet_bg_Internal&&this.uiWidgetBase) {
			this.img_sheet_bg_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomBox/img_sheet_bg') as mw.Image
		}
		return this.img_sheet_bg_Internal
	}
	private mFrameContent_Internal: mw.Canvas
	public get mFrameContent(): mw.Canvas {
		if(!this.mFrameContent_Internal&&this.uiWidgetBase) {
			this.mFrameContent_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomBox/mFrameScroll/mFrameContent') as mw.Canvas
		}
		return this.mFrameContent_Internal
	}
	private mFrameScroll_Internal: mw.ScrollBox
	public get mFrameScroll(): mw.ScrollBox {
		if(!this.mFrameScroll_Internal&&this.uiWidgetBase) {
			this.mFrameScroll_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomBox/mFrameScroll') as mw.ScrollBox
		}
		return this.mFrameScroll_Internal
	}
	private btn_play_Internal: mw.Button
	public get btn_play(): mw.Button {
		if(!this.btn_play_Internal&&this.uiWidgetBase) {
			this.btn_play_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomBox/mCanvasBtns/btn_play') as mw.Button
		}
		return this.btn_play_Internal
	}
	private btn_pose_Internal: mw.Button
	public get btn_pose(): mw.Button {
		if(!this.btn_pose_Internal&&this.uiWidgetBase) {
			this.btn_pose_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomBox/mCanvasBtns/btn_pose') as mw.Button
		}
		return this.btn_pose_Internal
	}
	private btn_stop_Internal: mw.Button
	public get btn_stop(): mw.Button {
		if(!this.btn_stop_Internal&&this.uiWidgetBase) {
			this.btn_stop_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomBox/mCanvasBtns/btn_stop') as mw.Button
		}
		return this.btn_stop_Internal
	}
	private btn_add_Internal: mw.Button
	public get btn_add(): mw.Button {
		if(!this.btn_add_Internal&&this.uiWidgetBase) {
			this.btn_add_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomBox/mCanvasBtns/btn_add') as mw.Button
		}
		return this.btn_add_Internal
	}
	private btn_minus_Internal: mw.Button
	public get btn_minus(): mw.Button {
		if(!this.btn_minus_Internal&&this.uiWidgetBase) {
			this.btn_minus_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomBox/mCanvasBtns/btn_minus') as mw.Button
		}
		return this.btn_minus_Internal
	}
	private mSaveDataBtn_Internal: mw.StaleButton
	public get mSaveDataBtn(): mw.StaleButton {
		if(!this.mSaveDataBtn_Internal&&this.uiWidgetBase) {
			this.mSaveDataBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomBox/mCanvasBtns/mSaveDataBtn') as mw.StaleButton
		}
		return this.mSaveDataBtn_Internal
	}
	private mCanvasBtns_Internal: mw.Canvas
	public get mCanvasBtns(): mw.Canvas {
		if(!this.mCanvasBtns_Internal&&this.uiWidgetBase) {
			this.mCanvasBtns_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomBox/mCanvasBtns') as mw.Canvas
		}
		return this.mCanvasBtns_Internal
	}
	private mNodeContent_Internal: mw.Canvas
	public get mNodeContent(): mw.Canvas {
		if(!this.mNodeContent_Internal&&this.uiWidgetBase) {
			this.mNodeContent_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomBox/mNodeScroll/mNodeContent') as mw.Canvas
		}
		return this.mNodeContent_Internal
	}
	private mNodeScroll_Internal: mw.ScrollBox
	public get mNodeScroll(): mw.ScrollBox {
		if(!this.mNodeScroll_Internal&&this.uiWidgetBase) {
			this.mNodeScroll_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomBox/mNodeScroll') as mw.ScrollBox
		}
		return this.mNodeScroll_Internal
	}
	private mBottomBox_Internal: mw.Canvas
	public get mBottomBox(): mw.Canvas {
		if(!this.mBottomBox_Internal&&this.uiWidgetBase) {
			this.mBottomBox_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomBox') as mw.Canvas
		}
		return this.mBottomBox_Internal
	}
	private mBtnGroup_Internal: mw.StaleButton
	public get mBtnGroup(): mw.StaleButton {
		if(!this.mBtnGroup_Internal&&this.uiWidgetBase) {
			this.mBtnGroup_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasLeft/mBtnGroup') as mw.StaleButton
		}
		return this.mBtnGroup_Internal
	}
	private mBtnMotion_Internal: mw.StaleButton
	public get mBtnMotion(): mw.StaleButton {
		if(!this.mBtnMotion_Internal&&this.uiWidgetBase) {
			this.mBtnMotion_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasLeft/mBtnMotion') as mw.StaleButton
		}
		return this.mBtnMotion_Internal
	}
	private txt_currentMotion_Internal: mw.TextBlock
	public get txt_currentMotion(): mw.TextBlock {
		if(!this.txt_currentMotion_Internal&&this.uiWidgetBase) {
			this.txt_currentMotion_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasLeft/txt_currentMotion') as mw.TextBlock
		}
		return this.txt_currentMotion_Internal
	}
	private img_following_Internal: mw.Image
	public get img_following(): mw.Image {
		if(!this.img_following_Internal&&this.uiWidgetBase) {
			this.img_following_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasLeft/img_following') as mw.Image
		}
		return this.img_following_Internal
	}
	private mGroupContent_Internal: mw.Canvas
	public get mGroupContent(): mw.Canvas {
		if(!this.mGroupContent_Internal&&this.uiWidgetBase) {
			this.mGroupContent_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasLeft/mGroupScrollBox/mGroupContent') as mw.Canvas
		}
		return this.mGroupContent_Internal
	}
	private mGroupScrollBox_Internal: mw.ScrollBox
	public get mGroupScrollBox(): mw.ScrollBox {
		if(!this.mGroupScrollBox_Internal&&this.uiWidgetBase) {
			this.mGroupScrollBox_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasLeft/mGroupScrollBox') as mw.ScrollBox
		}
		return this.mGroupScrollBox_Internal
	}
	private mMotionListContent_Internal: mw.Canvas
	public get mMotionListContent(): mw.Canvas {
		if(!this.mMotionListContent_Internal&&this.uiWidgetBase) {
			this.mMotionListContent_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasLeft/mMotionListScroll/mMotionListContent') as mw.Canvas
		}
		return this.mMotionListContent_Internal
	}
	private mMotionListScroll_Internal: mw.ScrollBox
	public get mMotionListScroll(): mw.ScrollBox {
		if(!this.mMotionListScroll_Internal&&this.uiWidgetBase) {
			this.mMotionListScroll_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasLeft/mMotionListScroll') as mw.ScrollBox
		}
		return this.mMotionListScroll_Internal
	}
	private mcamera_StartBtn_Internal: mw.StaleButton
	public get mcamera_StartBtn(): mw.StaleButton {
		if(!this.mcamera_StartBtn_Internal&&this.uiWidgetBase) {
			this.mcamera_StartBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasLeft/mcamera_StartBtn') as mw.StaleButton
		}
		return this.mcamera_StartBtn_Internal
	}
	private btn_opacity_Internal: mw.Button
	public get btn_opacity(): mw.Button {
		if(!this.btn_opacity_Internal&&this.uiWidgetBase) {
			this.btn_opacity_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasLeft/btn_opacity') as mw.Button
		}
		return this.btn_opacity_Internal
	}
	private mCanvasLeft_Internal: mw.Canvas
	public get mCanvasLeft(): mw.Canvas {
		if(!this.mCanvasLeft_Internal&&this.uiWidgetBase) {
			this.mCanvasLeft_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasLeft') as mw.Canvas
		}
		return this.mCanvasLeft_Internal
	}
	private mFrameNodeContent_Internal: mw.Canvas
	public get mFrameNodeContent(): mw.Canvas {
		if(!this.mFrameNodeContent_Internal&&this.uiWidgetBase) {
			this.mFrameNodeContent_Internal = this.uiWidgetBase.findChildByPath('Canvas/mFrameBox/mFrameNodeScroll/mFrameNodeContent') as mw.Canvas
		}
		return this.mFrameNodeContent_Internal
	}
	private mFrameNodeScroll_Internal: mw.ScrollBox
	public get mFrameNodeScroll(): mw.ScrollBox {
		if(!this.mFrameNodeScroll_Internal&&this.uiWidgetBase) {
			this.mFrameNodeScroll_Internal = this.uiWidgetBase.findChildByPath('Canvas/mFrameBox/mFrameNodeScroll') as mw.ScrollBox
		}
		return this.mFrameNodeScroll_Internal
	}
	private mFrameBox_Internal: mw.Canvas
	public get mFrameBox(): mw.Canvas {
		if(!this.mFrameBox_Internal&&this.uiWidgetBase) {
			this.mFrameBox_Internal = this.uiWidgetBase.findChildByPath('Canvas/mFrameBox') as mw.Canvas
		}
		return this.mFrameBox_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mSaveDataBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSaveDataBtn");
		})
		this.initLanguage(this.mSaveDataBtn);
		//this.mSaveDataBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtnGroup.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtnGroup");
		})
		this.initLanguage(this.mBtnGroup);
		//this.mBtnGroup.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtnMotion.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtnMotion");
		})
		this.initLanguage(this.mBtnMotion);
		//this.mBtnMotion.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mcamera_StartBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mcamera_StartBtn");
		})
		this.initLanguage(this.mcamera_StartBtn);
		//this.mcamera_StartBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.btn_play.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_play");
		})
		
		
	
		this.btn_pose.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_pose");
		})
		
		
	
		this.btn_stop.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_stop");
		})
		
		
	
		this.btn_add.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_add");
		})
		
		
	
		this.btn_minus.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_minus");
		})
		
		
	
		this.btn_opacity.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_opacity");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.txt_currentMotion)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCanvasLeft/TextBlock_4") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCanvasLeft/MWTextBlock_2_3") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 