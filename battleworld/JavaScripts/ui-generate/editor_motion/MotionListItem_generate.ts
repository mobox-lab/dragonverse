
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/editor_motion/MotionListItem.ui
 * TIME: 2023.11.15-14.12.49
 */

 

 @UIBind('UI/editor_motion/MotionListItem.ui')
 export default class MotionListItem_Generate extends UIScript {
	 	private mBtn_Internal: mw.Button
	public get mBtn(): mw.Button {
		if(!this.mBtn_Internal&&this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn') as mw.Button
		}
		return this.mBtn_Internal
	}
	private mSelected_Internal: mw.Image
	public get mSelected(): mw.Image {
		if(!this.mSelected_Internal&&this.uiWidgetBase) {
			this.mSelected_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelected') as mw.Image
		}
		return this.mSelected_Internal
	}
	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mFrameCount_Internal: mw.TextBlock
	public get mFrameCount(): mw.TextBlock {
		if(!this.mFrameCount_Internal&&this.uiWidgetBase) {
			this.mFrameCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mFrameCount') as mw.TextBlock
		}
		return this.mFrameCount_Internal
	}
	private mDelete_Internal: mw.Button
	public get mDelete(): mw.Button {
		if(!this.mDelete_Internal&&this.uiWidgetBase) {
			this.mDelete_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDelete') as mw.Button
		}
		return this.mDelete_Internal
	}
	private mIndex_Internal: mw.TextBlock
	public get mIndex(): mw.TextBlock {
		if(!this.mIndex_Internal&&this.uiWidgetBase) {
			this.mIndex_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mIndex') as mw.TextBlock
		}
		return this.mIndex_Internal
	}
	private txt_name_1_Internal: mw.TextBlock
	public get txt_name_1(): mw.TextBlock {
		if(!this.txt_name_1_Internal&&this.uiWidgetBase) {
			this.txt_name_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_name_1') as mw.TextBlock
		}
		return this.txt_name_1_Internal
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
		
		this.mBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn");
		})
		
		
	
		this.mDelete.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mDelete");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mName)
		
	
		this.initLanguage(this.mFrameCount)
		
	
		this.initLanguage(this.mIndex)
		
	
		this.initLanguage(this.txt_name_1)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 