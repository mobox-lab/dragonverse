
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 断桥烟雨
 * UI: UI/Buy/BuyUI.ui
 * TIME: 2024.01.31-14.36.04
 */

 

 @UIBind('UI/Buy/BuyUI.ui')
 export default class BuyUI_Generate extends UIScript {
	 	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mCanvas_List_Internal: mw.Canvas
	public get mCanvas_List(): mw.Canvas {
		if(!this.mCanvas_List_Internal&&this.uiWidgetBase) {
			this.mCanvas_List_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScrollBox/mCanvas_List') as mw.Canvas
		}
		return this.mCanvas_List_Internal
	}
	private mBtn_close_Internal: mw.Button
	public get mBtn_close(): mw.Button {
		if(!this.mBtn_close_Internal&&this.uiWidgetBase) {
			this.mBtn_close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBtn_close') as mw.Button
		}
		return this.mBtn_close_Internal
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
		
		//按钮添加点击
		
		this.mBtn_close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_close");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 