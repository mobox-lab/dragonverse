
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 冷风吹
 * UI: UI/PlayerHeadUI.ui
 * TIME: 2023.12.20-15.03.29
 */

 

 @UIBind('UI/PlayerHeadUI.ui')
 export default class PlayerHeadUI_Generate extends UIScript {
	 	private mEnemyHP_Internal: mw.Canvas
	public get mEnemyHP(): mw.Canvas {
		if(!this.mEnemyHP_Internal&&this.uiWidgetBase) {
			this.mEnemyHP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mEnemyHP') as mw.Canvas
		}
		return this.mEnemyHP_Internal
	}
	private hpImageEnemy_Internal: mw.Image
	public get hpImageEnemy(): mw.Image {
		if(!this.hpImageEnemy_Internal&&this.uiWidgetBase) {
			this.hpImageEnemy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mEnemyHP/hpImageEnemy') as mw.Image
		}
		return this.hpImageEnemy_Internal
	}
	private mEnemyName_txt_Internal: mw.TextBlock
	public get mEnemyName_txt(): mw.TextBlock {
		if(!this.mEnemyName_txt_Internal&&this.uiWidgetBase) {
			this.mEnemyName_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mEnemyHP/mEnemyName_txt') as mw.TextBlock
		}
		return this.mEnemyName_txt_Internal
	}
	private mEnemyName_bar_hp_back_Internal: mw.ProgressBar
	public get mEnemyName_bar_hp_back(): mw.ProgressBar {
		if(!this.mEnemyName_bar_hp_back_Internal&&this.uiWidgetBase) {
			this.mEnemyName_bar_hp_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mEnemyHP/mEnemyName_bar_hp_back') as mw.ProgressBar
		}
		return this.mEnemyName_bar_hp_back_Internal
	}
	private mEnemy_bar_hp_Internal: mw.ProgressBar
	public get mEnemy_bar_hp(): mw.ProgressBar {
		if(!this.mEnemy_bar_hp_Internal&&this.uiWidgetBase) {
			this.mEnemy_bar_hp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mEnemyHP/mEnemy_bar_hp') as mw.ProgressBar
		}
		return this.mEnemy_bar_hp_Internal
	}
	private mOwnHP_Internal: mw.Canvas
	public get mOwnHP(): mw.Canvas {
		if(!this.mOwnHP_Internal&&this.uiWidgetBase) {
			this.mOwnHP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOwnHP') as mw.Canvas
		}
		return this.mOwnHP_Internal
	}
	private hpImageOwn_Internal: mw.Image
	public get hpImageOwn(): mw.Image {
		if(!this.hpImageOwn_Internal&&this.uiWidgetBase) {
			this.hpImageOwn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOwnHP/hpImageOwn') as mw.Image
		}
		return this.hpImageOwn_Internal
	}
	private mOwnName_txt_Internal: mw.TextBlock
	public get mOwnName_txt(): mw.TextBlock {
		if(!this.mOwnName_txt_Internal&&this.uiWidgetBase) {
			this.mOwnName_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOwnHP/mOwnName_txt') as mw.TextBlock
		}
		return this.mOwnName_txt_Internal
	}
	private mOwn_bar_hp_back_Internal: mw.ProgressBar
	public get mOwn_bar_hp_back(): mw.ProgressBar {
		if(!this.mOwn_bar_hp_back_Internal&&this.uiWidgetBase) {
			this.mOwn_bar_hp_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOwnHP/mOwn_bar_hp_back') as mw.ProgressBar
		}
		return this.mOwn_bar_hp_back_Internal
	}
	private mOwn_bar_hp_Internal: mw.ProgressBar
	public get mOwn_bar_hp(): mw.ProgressBar {
		if(!this.mOwn_bar_hp_Internal&&this.uiWidgetBase) {
			this.mOwn_bar_hp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOwnHP/mOwn_bar_hp') as mw.ProgressBar
		}
		return this.mOwn_bar_hp_Internal
	}
	private mBox_Internal: mw.Canvas
	public get mBox(): mw.Canvas {
		if(!this.mBox_Internal&&this.uiWidgetBase) {
			this.mBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBox') as mw.Canvas
		}
		return this.mBox_Internal
	}
	private mBountyCanvas_Internal: mw.Canvas
	public get mBountyCanvas(): mw.Canvas {
		if(!this.mBountyCanvas_Internal&&this.uiWidgetBase) {
			this.mBountyCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBox/mBountyCanvas') as mw.Canvas
		}
		return this.mBountyCanvas_Internal
	}
	private mBounty_txt_Internal: mw.TextBlock
	public get mBounty_txt(): mw.TextBlock {
		if(!this.mBounty_txt_Internal&&this.uiWidgetBase) {
			this.mBounty_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBox/mBountyCanvas/mBounty_txt') as mw.TextBlock
		}
		return this.mBounty_txt_Internal
	}
	private mBounty_icon_Internal: mw.Image
	public get mBounty_icon(): mw.Image {
		if(!this.mBounty_icon_Internal&&this.uiWidgetBase) {
			this.mBounty_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBox/mBountyCanvas/mBounty_icon') as mw.Image
		}
		return this.mBounty_icon_Internal
	}
	private mBountyNumber_txt_Internal: mw.TextBlock
	public get mBountyNumber_txt(): mw.TextBlock {
		if(!this.mBountyNumber_txt_Internal&&this.uiWidgetBase) {
			this.mBountyNumber_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBox/mBountyCanvas/mBountyNumber_txt') as mw.TextBlock
		}
		return this.mBountyNumber_txt_Internal
	}
	private mRankCanvas_Internal: mw.Canvas
	public get mRankCanvas(): mw.Canvas {
		if(!this.mRankCanvas_Internal&&this.uiWidgetBase) {
			this.mRankCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBox/mRankCanvas') as mw.Canvas
		}
		return this.mRankCanvas_Internal
	}
	private mRankIcon_txt_Internal: mw.Image
	public get mRankIcon_txt(): mw.Image {
		if(!this.mRankIcon_txt_Internal&&this.uiWidgetBase) {
			this.mRankIcon_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBox/mRankCanvas/mRankIcon_txt') as mw.Image
		}
		return this.mRankIcon_txt_Internal
	}
	private mRankName_txt_Internal: mw.TextBlock
	public get mRankName_txt(): mw.TextBlock {
		if(!this.mRankName_txt_Internal&&this.uiWidgetBase) {
			this.mRankName_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBox/mRankCanvas/mRankName_txt') as mw.TextBlock
		}
		return this.mRankName_txt_Internal
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
		
		this.initLanguage(this.mEnemyName_txt)
		
	
		this.initLanguage(this.mOwnName_txt)
		
	
		this.initLanguage(this.mBounty_txt)
		
	
		this.initLanguage(this.mBountyNumber_txt)
		
	
		this.initLanguage(this.mRankName_txt)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 