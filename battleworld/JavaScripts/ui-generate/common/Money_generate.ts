
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/common/Money.ui
 * TIME: 2023.11.15-14.12.48
 */

 

 @UIBind('UI/common/Money.ui')
 export default class Money_Generate extends UIScript {
	 	private mText_money_Internal: mw.TextBlock
	public get mText_money(): mw.TextBlock {
		if(!this.mText_money_Internal&&this.uiWidgetBase) {
			this.mText_money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMoney_Canvas/mText_money') as mw.TextBlock
		}
		return this.mText_money_Internal
	}
	private mMoney_Canvas_Internal: mw.Canvas
	public get mMoney_Canvas(): mw.Canvas {
		if(!this.mMoney_Canvas_Internal&&this.uiWidgetBase) {
			this.mMoney_Canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMoney_Canvas') as mw.Canvas
		}
		return this.mMoney_Canvas_Internal
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
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_money)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 