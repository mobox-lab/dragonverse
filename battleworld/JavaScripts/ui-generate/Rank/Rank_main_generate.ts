
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 安妮熊
 * UI: UI/Rank/Rank_main.ui
 * TIME: 2024.04.19-17.15.39
 */

 

 @UIBind('UI/Rank/Rank_main.ui')
 export default class Rank_main_Generate extends UIScript {
	 	private rankCanvas_Internal: mw.Canvas
	public get rankCanvas(): mw.Canvas {
		if(!this.rankCanvas_Internal&&this.uiWidgetBase) {
			this.rankCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rankCanvas') as mw.Canvas
		}
		return this.rankCanvas_Internal
	}
	private mrank_ScrollBox_Internal: mw.ScrollBox
	public get mrank_ScrollBox(): mw.ScrollBox {
		if(!this.mrank_ScrollBox_Internal&&this.uiWidgetBase) {
			this.mrank_ScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rankCanvas/mrank_ScrollBox') as mw.ScrollBox
		}
		return this.mrank_ScrollBox_Internal
	}
	private mrank_ProgressBar_Internal: mw.ProgressBar
	public get mrank_ProgressBar(): mw.ProgressBar {
		if(!this.mrank_ProgressBar_Internal&&this.uiWidgetBase) {
			this.mrank_ProgressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rankCanvas/mrank_ScrollBox/mrank_ProgressBar') as mw.ProgressBar
		}
		return this.mrank_ProgressBar_Internal
	}
	private itemCanvas_Internal: mw.Canvas
	public get itemCanvas(): mw.Canvas {
		if(!this.itemCanvas_Internal&&this.uiWidgetBase) {
			this.itemCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rankCanvas/mrank_ScrollBox/itemCanvas') as mw.Canvas
		}
		return this.itemCanvas_Internal
	}
	private ruleCanvas_Internal: mw.Canvas
	public get ruleCanvas(): mw.Canvas {
		if(!this.ruleCanvas_Internal&&this.uiWidgetBase) {
			this.ruleCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ruleCanvas') as mw.Canvas
		}
		return this.ruleCanvas_Internal
	}
	private mRankImage_Internal: mw.Image
	public get mRankImage(): mw.Image {
		if(!this.mRankImage_Internal&&this.uiWidgetBase) {
			this.mRankImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ruleCanvas/mRankImage') as mw.Image
		}
		return this.mRankImage_Internal
	}
	private mRanktext_Internal: mw.TextBlock
	public get mRanktext(): mw.TextBlock {
		if(!this.mRanktext_Internal&&this.uiWidgetBase) {
			this.mRanktext_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ruleCanvas/mRanktext') as mw.TextBlock
		}
		return this.mRanktext_Internal
	}
	private mProgressBar_Internal: mw.ProgressBar
	public get mProgressBar(): mw.ProgressBar {
		if(!this.mProgressBar_Internal&&this.uiWidgetBase) {
			this.mProgressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ruleCanvas/mProgressBar') as mw.ProgressBar
		}
		return this.mProgressBar_Internal
	}
	private mProgressText_Internal: mw.TextBlock
	public get mProgressText(): mw.TextBlock {
		if(!this.mProgressText_Internal&&this.uiWidgetBase) {
			this.mProgressText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ruleCanvas/mProgressText') as mw.TextBlock
		}
		return this.mProgressText_Internal
	}
	private upProgress_Text_Internal: mw.TextBlock
	public get upProgress_Text(): mw.TextBlock {
		if(!this.upProgress_Text_Internal&&this.uiWidgetBase) {
			this.upProgress_Text_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ruleCanvas/upProgress_Text') as mw.TextBlock
		}
		return this.upProgress_Text_Internal
	}
	private mNextRank_Internal: mw.TextBlock
	public get mNextRank(): mw.TextBlock {
		if(!this.mNextRank_Internal&&this.uiWidgetBase) {
			this.mNextRank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ruleCanvas/mNextRank') as mw.TextBlock
		}
		return this.mNextRank_Internal
	}
	private mRestPoints_Internal: mw.TextBlock
	public get mRestPoints(): mw.TextBlock {
		if(!this.mRestPoints_Internal&&this.uiWidgetBase) {
			this.mRestPoints_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ruleCanvas/mRestPoints') as mw.TextBlock
		}
		return this.mRestPoints_Internal
	}
	private unlockCanvas_Internal: mw.Canvas
	public get unlockCanvas(): mw.Canvas {
		if(!this.unlockCanvas_Internal&&this.uiWidgetBase) {
			this.unlockCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/unlockCanvas') as mw.Canvas
		}
		return this.unlockCanvas_Internal
	}
	private mUnlockImg_Internal: mw.Image
	public get mUnlockImg(): mw.Image {
		if(!this.mUnlockImg_Internal&&this.uiWidgetBase) {
			this.mUnlockImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/unlockCanvas/mUnlockImg') as mw.Image
		}
		return this.mUnlockImg_Internal
	}
	private mUnlock_Internal: mw.TextBlock
	public get mUnlock(): mw.TextBlock {
		if(!this.mUnlock_Internal&&this.uiWidgetBase) {
			this.mUnlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/unlockCanvas/mUnlock') as mw.TextBlock
		}
		return this.mUnlock_Internal
	}
	private escCanvas_Internal: mw.Canvas
	public get escCanvas(): mw.Canvas {
		if(!this.escCanvas_Internal&&this.uiWidgetBase) {
			this.escCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/escCanvas') as mw.Canvas
		}
		return this.escCanvas_Internal
	}
	private mbtn_esc_Internal: mw.Button
	public get mbtn_esc(): mw.Button {
		if(!this.mbtn_esc_Internal&&this.uiWidgetBase) {
			this.mbtn_esc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/escCanvas/mbtn_esc') as mw.Button
		}
		return this.mbtn_esc_Internal
	}
	private mRankSwicth_Internal: mw.Canvas
	public get mRankSwicth(): mw.Canvas {
		if(!this.mRankSwicth_Internal&&this.uiWidgetBase) {
			this.mRankSwicth_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRankSwicth') as mw.Canvas
		}
		return this.mRankSwicth_Internal
	}
	private mBtn_Rank_Internal: mw.StaleButton
	public get mBtn_Rank(): mw.StaleButton {
		if(!this.mBtn_Rank_Internal&&this.uiWidgetBase) {
			this.mBtn_Rank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRankSwicth/mBtn_Rank') as mw.StaleButton
		}
		return this.mBtn_Rank_Internal
	}
	private mBtn_Rank_On_Internal: mw.StaleButton
	public get mBtn_Rank_On(): mw.StaleButton {
		if(!this.mBtn_Rank_On_Internal&&this.uiWidgetBase) {
			this.mBtn_Rank_On_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRankSwicth/mBtn_Rank_On') as mw.StaleButton
		}
		return this.mBtn_Rank_On_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Rank.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Rank");
		})
		this.initLanguage(this.mBtn_Rank);
		//this.mBtn_Rank.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Rank_On.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Rank_On");
		})
		this.initLanguage(this.mBtn_Rank_On);
		//this.mBtn_Rank_On.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mbtn_esc.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mbtn_esc");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mRanktext)
		
	
		this.initLanguage(this.mProgressText)
		
	
		this.initLanguage(this.upProgress_Text)
		
	
		this.initLanguage(this.mNextRank)
		
	
		this.initLanguage(this.mRestPoints)
		
	
		this.initLanguage(this.mUnlock)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/ruleCanvas/TextBlock_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/ruleCanvas/TextBlock_2_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/unlockCanvas/TextBlock_7_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRankSwicth/TextBlock_1") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 