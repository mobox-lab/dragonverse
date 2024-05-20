
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/Buy/BuyPanel.ui
 */

 

 @UIBind('UI/Buy/BuyPanel.ui')
 export default class BuyPanel_Generate extends UIScript {
	 	private mainCanvas_Internal: mw.Canvas
	public get mainCanvas(): mw.Canvas {
		if(!this.mainCanvas_Internal&&this.uiWidgetBase) {
			this.mainCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mainCanvas') as mw.Canvas
		}
		return this.mainCanvas_Internal
	}
	private mCollBox_Internal: mw.Canvas
	public get mCollBox(): mw.Canvas {
		if(!this.mCollBox_Internal&&this.uiWidgetBase) {
			this.mCollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mainCanvas/mCollBox') as mw.Canvas
		}
		return this.mCollBox_Internal
	}
	private mCollapsedBtn_Internal: mw.StaleButton
	public get mCollapsedBtn(): mw.StaleButton {
		if(!this.mCollapsedBtn_Internal&&this.uiWidgetBase) {
			this.mCollapsedBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mainCanvas/mCollBox/mCollapsedBtn') as mw.StaleButton
		}
		return this.mCollapsedBtn_Internal
	}
	private mSelectList_Internal: mw.Canvas
	public get mSelectList(): mw.Canvas {
		if(!this.mSelectList_Internal&&this.uiWidgetBase) {
			this.mSelectList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mainCanvas/ScrollBox/mSelectList') as mw.Canvas
		}
		return this.mSelectList_Internal
	}
	private mInfoBtn_Internal: mw.StaleButton
	public get mInfoBtn(): mw.StaleButton {
		if(!this.mInfoBtn_Internal&&this.uiWidgetBase) {
			this.mInfoBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mainCanvas/mInfoBtn') as mw.StaleButton
		}
		return this.mInfoBtn_Internal
	}
	private mCanvas_undo_Internal: mw.Canvas
	public get mCanvas_undo(): mw.Canvas {
		if(!this.mCanvas_undo_Internal&&this.uiWidgetBase) {
			this.mCanvas_undo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_undo') as mw.Canvas
		}
		return this.mCanvas_undo_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mCollapsedBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCollapsedBtn");
		})
		this.initLanguage(this.mCollapsedBtn);
		//this.mCollapsedBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mInfoBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mInfoBtn");
		})
		this.initLanguage(this.mInfoBtn);
		//this.mInfoBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mainCanvas/TextBlock") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 