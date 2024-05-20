
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/Rank/LiveRank.ui
 */

 

 @UIBind('UI/Rank/LiveRank.ui')
 export default class LiveRank_Generate extends UIScript {
	 	private mRankCanvas_Internal: mw.Canvas
	public get mRankCanvas(): mw.Canvas {
		if(!this.mRankCanvas_Internal&&this.uiWidgetBase) {
			this.mRankCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ScrollBox/mRankCanvas') as mw.Canvas
		}
		return this.mRankCanvas_Internal
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
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_3") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 