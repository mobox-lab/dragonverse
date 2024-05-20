
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/editor_motion/FrameNodeView.ui
 */

 

 @UIBind('UI/editor_motion/FrameNodeView.ui')
 export default class FrameNodeView_Generate extends UIScript {
	 	private mSelect_Internal: mw.Image
	public get mSelect(): mw.Image {
		if(!this.mSelect_Internal&&this.uiWidgetBase) {
			this.mSelect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelect') as mw.Image
		}
		return this.mSelect_Internal
	}
	private mSelectBtn_Internal: mw.StaleButton
	public get mSelectBtn(): mw.StaleButton {
		if(!this.mSelectBtn_Internal&&this.uiWidgetBase) {
			this.mSelectBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectBtn') as mw.StaleButton
		}
		return this.mSelectBtn_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScrollView/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private mScrollView_Internal: mw.ScrollBox
	public get mScrollView(): mw.ScrollBox {
		if(!this.mScrollView_Internal&&this.uiWidgetBase) {
			this.mScrollView_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScrollView') as mw.ScrollBox
		}
		return this.mScrollView_Internal
	}
	private mCopyBtn_Internal: mw.StaleButton
	public get mCopyBtn(): mw.StaleButton {
		if(!this.mCopyBtn_Internal&&this.uiWidgetBase) {
			this.mCopyBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCopyBtn') as mw.StaleButton
		}
		return this.mCopyBtn_Internal
	}
	private mDeleBtn_Internal: mw.StaleButton
	public get mDeleBtn(): mw.StaleButton {
		if(!this.mDeleBtn_Internal&&this.uiWidgetBase) {
			this.mDeleBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDeleBtn') as mw.StaleButton
		}
		return this.mDeleBtn_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mSelectBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSelectBtn");
		})
		this.initLanguage(this.mSelectBtn);
		//this.mSelectBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCopyBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCopyBtn");
		})
		this.initLanguage(this.mCopyBtn);
		//this.mCopyBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mDeleBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mDeleBtn");
		})
		this.initLanguage(this.mDeleBtn);
		//this.mDeleBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

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
 