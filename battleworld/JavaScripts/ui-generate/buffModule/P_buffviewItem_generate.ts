
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/buffModule/P_buffviewItem.ui
 * TIME: 2023.11.15-14.12.49
 */

 

 @UIBind('UI/buffModule/P_buffviewItem.ui')
 export default class P_buffviewItem_Generate extends UIScript {
	 	private mCanvas_1_Internal: mw.Canvas
	public get mCanvas_1(): mw.Canvas {
		if(!this.mCanvas_1_Internal&&this.uiWidgetBase) {
			this.mCanvas_1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mCanvas_1') as mw.Canvas
		}
		return this.mCanvas_1_Internal
	}
	private mImg_buff_Internal: mw.Image
	public get mImg_buff(): mw.Image {
		if(!this.mImg_buff_Internal&&this.uiWidgetBase) {
			this.mImg_buff_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mCanvas_1/mImg_buff') as mw.Image
		}
		return this.mImg_buff_Internal
	}
	private mText_time_Internal: mw.TextBlock
	public get mText_time(): mw.TextBlock {
		if(!this.mText_time_Internal&&this.uiWidgetBase) {
			this.mText_time_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mCanvas_1/mText_time') as mw.TextBlock
		}
		return this.mText_time_Internal
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
		
		this.initLanguage(this.mText_time)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 