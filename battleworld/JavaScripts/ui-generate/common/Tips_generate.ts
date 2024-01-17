
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/common/Tips.ui
 * TIME: 2023.11.15-14.12.49
 */

 

 @UIBind('UI/common/Tips.ui')
 export default class Tips_Generate extends UIScript {
	 	private mCell1_Internal: mw.Canvas
	public get mCell1(): mw.Canvas {
		if(!this.mCell1_Internal&&this.uiWidgetBase) {
			this.mCell1_Internal = this.uiWidgetBase.findChildByPath('Canvas/BoxSells/mCell1') as mw.Canvas
		}
		return this.mCell1_Internal
	}
	private mCell2_Internal: mw.Canvas
	public get mCell2(): mw.Canvas {
		if(!this.mCell2_Internal&&this.uiWidgetBase) {
			this.mCell2_Internal = this.uiWidgetBase.findChildByPath('Canvas/BoxSells/mCell2') as mw.Canvas
		}
		return this.mCell2_Internal
	}
	private mCell3_Internal: mw.Canvas
	public get mCell3(): mw.Canvas {
		if(!this.mCell3_Internal&&this.uiWidgetBase) {
			this.mCell3_Internal = this.uiWidgetBase.findChildByPath('Canvas/BoxSells/mCell3') as mw.Canvas
		}
		return this.mCell3_Internal
	}
	private mBottomText_Internal: mw.TextBlock
	public get mBottomText(): mw.TextBlock {
		if(!this.mBottomText_Internal&&this.uiWidgetBase) {
			this.mBottomText_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCell/mBottomText') as mw.TextBlock
		}
		return this.mBottomText_Internal
	}
	private mBottomCell_Internal: mw.Canvas
	public get mBottomCell(): mw.Canvas {
		if(!this.mBottomCell_Internal&&this.uiWidgetBase) {
			this.mBottomCell_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCell') as mw.Canvas
		}
		return this.mBottomCell_Internal
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
		
		this.initLanguage(this.mBottomText)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/BoxSells/mCell1/Content_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/BoxSells/mCell2/Content_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/BoxSells/mCell3/Content_txt") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 