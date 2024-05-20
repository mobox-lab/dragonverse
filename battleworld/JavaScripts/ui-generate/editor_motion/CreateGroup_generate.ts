
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/editor_motion/CreateGroup.ui
 */

 

 @UIBind('UI/editor_motion/CreateGroup.ui')
 export default class CreateGroup_Generate extends UIScript {
	 	private mCloseBtn_Internal: mw.Button
	public get mCloseBtn(): mw.Button {
		if(!this.mCloseBtn_Internal&&this.uiWidgetBase) {
			this.mCloseBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCloseBtn') as mw.Button
		}
		return this.mCloseBtn_Internal
	}
	private mInput_Internal: mw.InputBox
	public get mInput(): mw.InputBox {
		if(!this.mInput_Internal&&this.uiWidgetBase) {
			this.mInput_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBox/mInput') as mw.InputBox
		}
		return this.mInput_Internal
	}
	private mBtn_Internal: mw.StaleButton
	public get mBtn(): mw.StaleButton {
		if(!this.mBtn_Internal&&this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBox/mBtn') as mw.StaleButton
		}
		return this.mBtn_Internal
	}
	private mBox_Internal: mw.Canvas
	public get mBox(): mw.Canvas {
		if(!this.mBox_Internal&&this.uiWidgetBase) {
			this.mBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBox') as mw.Canvas
		}
		return this.mBox_Internal
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
		
		this.mCloseBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseBtn");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mBox/TextBlock") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 