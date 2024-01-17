
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 冷风吹
 * UI: UI/Rank/Rankitem.ui
 * TIME: 2023.12.13-17.27.44
 */

 

 @UIBind('UI/Rank/Rankitem.ui')
 export default class Rankitem_Generate extends UIScript {
	 	private mRank_Internal: mw.TextBlock
	public get mRank(): mw.TextBlock {
		if(!this.mRank_Internal&&this.uiWidgetBase) {
			this.mRank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRank') as mw.TextBlock
		}
		return this.mRank_Internal
	}
	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mCount_Internal: mw.TextBlock
	public get mCount(): mw.TextBlock {
		if(!this.mCount_Internal&&this.uiWidgetBase) {
			this.mCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCount') as mw.TextBlock
		}
		return this.mCount_Internal
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
		
	
		this.initLanguage(this.mName)
		
	
		this.initLanguage(this.mCount)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 