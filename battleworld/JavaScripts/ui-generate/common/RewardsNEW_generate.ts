
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/common/RewardsNEW.ui
 * TIME: 2023.11.15-14.12.48
 */

 

 @UIBind('UI/common/RewardsNEW.ui')
 export default class RewardsNEW_Generate extends UIScript {
	 	private mCanvas_item_Internal: mw.Canvas
	public get mCanvas_item(): mw.Canvas {
		if(!this.mCanvas_item_Internal&&this.uiWidgetBase) {
			this.mCanvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_item') as mw.Canvas
		}
		return this.mCanvas_item_Internal
	}
	private mBtn_yes_Internal: mw.Button
	public get mBtn_yes(): mw.Button {
		if(!this.mBtn_yes_Internal&&this.uiWidgetBase) {
			this.mBtn_yes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_yes') as mw.Button
		}
		return this.mBtn_yes_Internal
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
		
		this.mBtn_yes.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_yes");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mBtn_yes/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock_1") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 