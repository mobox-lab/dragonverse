
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/Rank/Rank_mainItem.ui
 */

 

 @UIBind('UI/Rank/Rank_mainItem.ui')
 export default class Rank_mainItem_Generate extends UIScript {
	 	private rankitemCanvas_Internal: mw.Canvas
	public get rankitemCanvas(): mw.Canvas {
		if(!this.rankitemCanvas_Internal&&this.uiWidgetBase) {
			this.rankitemCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rankitemCanvas') as mw.Canvas
		}
		return this.rankitemCanvas_Internal
	}
	private mLockimg_Internal: mw.Image
	public get mLockimg(): mw.Image {
		if(!this.mLockimg_Internal&&this.uiWidgetBase) {
			this.mLockimg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rankitemCanvas/mLockimg') as mw.Image
		}
		return this.mLockimg_Internal
	}
	private mUnlockimg_Internal: mw.Image
	public get mUnlockimg(): mw.Image {
		if(!this.mUnlockimg_Internal&&this.uiWidgetBase) {
			this.mUnlockimg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rankitemCanvas/mUnlockimg') as mw.Image
		}
		return this.mUnlockimg_Internal
	}
	private mRankpic_Internal: mw.Image
	public get mRankpic(): mw.Image {
		if(!this.mRankpic_Internal&&this.uiWidgetBase) {
			this.mRankpic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rankitemCanvas/mRankpic') as mw.Image
		}
		return this.mRankpic_Internal
	}
	private mRankName_Internal: mw.TextBlock
	public get mRankName(): mw.TextBlock {
		if(!this.mRankName_Internal&&this.uiWidgetBase) {
			this.mRankName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rankitemCanvas/mRankName') as mw.TextBlock
		}
		return this.mRankName_Internal
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
		
		this.initLanguage(this.mRankName)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 