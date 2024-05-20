
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/editor_motion/MotionFrameClip.ui
 */

 

 @UIBind('UI/editor_motion/MotionFrameClip.ui')
 export default class MotionFrameClip_Generate extends UIScript {
	 	private mBtn_Internal: mw.StaleButton
	public get mBtn(): mw.StaleButton {
		if(!this.mBtn_Internal&&this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn') as mw.StaleButton
		}
		return this.mBtn_Internal
	}
	private mFrameText_Internal: mw.TextBlock
	public get mFrameText(): mw.TextBlock {
		if(!this.mFrameText_Internal&&this.uiWidgetBase) {
			this.mFrameText_Internal = this.uiWidgetBase.findChildByPath('Canvas/mFrameText') as mw.TextBlock
		}
		return this.mFrameText_Internal
	}
	private mSelected_Internal: mw.Image
	public get mSelected(): mw.Image {
		if(!this.mSelected_Internal&&this.uiWidgetBase) {
			this.mSelected_Internal = this.uiWidgetBase.findChildByPath('Canvas/mSelected') as mw.Image
		}
		return this.mSelected_Internal
	}
	private mDataTag_Internal: mw.Image
	public get mDataTag(): mw.Image {
		if(!this.mDataTag_Internal&&this.uiWidgetBase) {
			this.mDataTag_Internal = this.uiWidgetBase.findChildByPath('Canvas/mDataTag') as mw.Image
		}
		return this.mDataTag_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn");
		})
		this.initLanguage(this.mBtn);
		//this.mBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mFrameText)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 