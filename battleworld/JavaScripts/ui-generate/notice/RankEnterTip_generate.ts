
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 冷风吹
 * UI: UI/notice/RankEnterTip.ui
 * TIME: 2023.12.14-16.52.15
 */

 

 @UIBind('UI/notice/RankEnterTip.ui')
 export default class RankEnterTip_Generate extends UIScript {
	 	private mRank_Internal: mw.TextBlock
	public get mRank(): mw.TextBlock {
		if(!this.mRank_Internal&&this.uiWidgetBase) {
			this.mRank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mRank') as mw.TextBlock
		}
		return this.mRank_Internal
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
		
		this.initLanguage(this.mRank)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 