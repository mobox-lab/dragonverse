
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/Main/Main_HUD.ui
 */

 

 @UIBind('UI/Main/Main_HUD.ui')
 export default class Main_HUD_Generate extends UIScript {
	 	private mTouchPad_Internal: mw.TouchPad
	public get mTouchPad(): mw.TouchPad {
		if(!this.mTouchPad_Internal&&this.uiWidgetBase) {
			this.mTouchPad_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTouchPad') as mw.TouchPad
		}
		return this.mTouchPad_Internal
	}
	private mVirtualJoystickPanel_Internal: mw.VirtualJoystickPanel
	public get mVirtualJoystickPanel(): mw.VirtualJoystickPanel {
		if(!this.mVirtualJoystickPanel_Internal&&this.uiWidgetBase) {
			this.mVirtualJoystickPanel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mVirtualJoystickPanel') as mw.VirtualJoystickPanel
		}
		return this.mVirtualJoystickPanel_Internal
	}
	private mSkillSelectBox_Internal: mw.Canvas
	public get mSkillSelectBox(): mw.Canvas {
		if(!this.mSkillSelectBox_Internal&&this.uiWidgetBase) {
			this.mSkillSelectBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkillSelectBox') as mw.Canvas
		}
		return this.mSkillSelectBox_Internal
	}
	private mSkillSelectBtn_Internal: mw.Button
	public get mSkillSelectBtn(): mw.Button {
		if(!this.mSkillSelectBtn_Internal&&this.uiWidgetBase) {
			this.mSkillSelectBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkillSelectBox/mSkillSelectBtn') as mw.Button
		}
		return this.mSkillSelectBtn_Internal
	}
	private mSkillSelctCount_Internal: mw.TextBlock
	public get mSkillSelctCount(): mw.TextBlock {
		if(!this.mSkillSelctCount_Internal&&this.uiWidgetBase) {
			this.mSkillSelctCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkillSelectBox/mSkillSelctCount') as mw.TextBlock
		}
		return this.mSkillSelctCount_Internal
	}
	private hpCanvas_Internal: mw.Canvas
	public get hpCanvas(): mw.Canvas {
		if(!this.hpCanvas_Internal&&this.uiWidgetBase) {
			this.hpCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/hpCanvas') as mw.Canvas
		}
		return this.hpCanvas_Internal
	}
	private mBar_Life_back_Internal: mw.ProgressBar
	public get mBar_Life_back(): mw.ProgressBar {
		if(!this.mBar_Life_back_Internal&&this.uiWidgetBase) {
			this.mBar_Life_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/hpCanvas/mBar_Life_back') as mw.ProgressBar
		}
		return this.mBar_Life_back_Internal
	}
	private mBar_Life_Internal: mw.ProgressBar
	public get mBar_Life(): mw.ProgressBar {
		if(!this.mBar_Life_Internal&&this.uiWidgetBase) {
			this.mBar_Life_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/hpCanvas/mBar_Life') as mw.ProgressBar
		}
		return this.mBar_Life_Internal
	}
	private mText_Life_Internal: mw.TextBlock
	public get mText_Life(): mw.TextBlock {
		if(!this.mText_Life_Internal&&this.uiWidgetBase) {
			this.mText_Life_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/hpCanvas/mText_Life') as mw.TextBlock
		}
		return this.mText_Life_Internal
	}
	private mBar_Magic_back_Internal: mw.ProgressBar
	public get mBar_Magic_back(): mw.ProgressBar {
		if(!this.mBar_Magic_back_Internal&&this.uiWidgetBase) {
			this.mBar_Magic_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/hpCanvas/mBar_Magic_back') as mw.ProgressBar
		}
		return this.mBar_Magic_back_Internal
	}
	private mBar_Magic_Internal: mw.ProgressBar
	public get mBar_Magic(): mw.ProgressBar {
		if(!this.mBar_Magic_Internal&&this.uiWidgetBase) {
			this.mBar_Magic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/hpCanvas/mBar_Magic') as mw.ProgressBar
		}
		return this.mBar_Magic_Internal
	}
	private mBar_Kill_Internal: mw.ProgressBar
	public get mBar_Kill(): mw.ProgressBar {
		if(!this.mBar_Kill_Internal&&this.uiWidgetBase) {
			this.mBar_Kill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/hpCanvas/mBar_Kill') as mw.ProgressBar
		}
		return this.mBar_Kill_Internal
	}
	private mIcon_Kill_Internal: mw.Image
	public get mIcon_Kill(): mw.Image {
		if(!this.mIcon_Kill_Internal&&this.uiWidgetBase) {
			this.mIcon_Kill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/hpCanvas/mIcon_Kill') as mw.Image
		}
		return this.mIcon_Kill_Internal
	}
	private mText_Magic_Internal: mw.TextBlock
	public get mText_Magic(): mw.TextBlock {
		if(!this.mText_Magic_Internal&&this.uiWidgetBase) {
			this.mText_Magic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/hpCanvas/mText_Magic') as mw.TextBlock
		}
		return this.mText_Magic_Internal
	}
	private mBar_Fire_Internal: mw.ProgressBar
	public get mBar_Fire(): mw.ProgressBar {
		if(!this.mBar_Fire_Internal&&this.uiWidgetBase) {
			this.mBar_Fire_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/hpCanvas/mBar_Fire') as mw.ProgressBar
		}
		return this.mBar_Fire_Internal
	}
	private mBtn_Reborn_Internal: mw.Button
	public get mBtn_Reborn(): mw.Button {
		if(!this.mBtn_Reborn_Internal&&this.uiWidgetBase) {
			this.mBtn_Reborn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Reborn') as mw.Button
		}
		return this.mBtn_Reborn_Internal
	}
	private mMask_Reborn_Internal: mw.MaskButton
	public get mMask_Reborn(): mw.MaskButton {
		if(!this.mMask_Reborn_Internal&&this.uiWidgetBase) {
			this.mMask_Reborn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMask_Reborn') as mw.MaskButton
		}
		return this.mMask_Reborn_Internal
	}
	private mBtn_GM_Internal: mw.Button
	public get mBtn_GM(): mw.Button {
		if(!this.mBtn_GM_Internal&&this.uiWidgetBase) {
			this.mBtn_GM_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_GM') as mw.Button
		}
		return this.mBtn_GM_Internal
	}
	private mAttackNum_Internal: mw.TextBlock
	public get mAttackNum(): mw.TextBlock {
		if(!this.mAttackNum_Internal&&this.uiWidgetBase) {
			this.mAttackNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mAttackNum') as mw.TextBlock
		}
		return this.mAttackNum_Internal
	}
	private mVersion_Internal: mw.TextBlock
	public get mVersion(): mw.TextBlock {
		if(!this.mVersion_Internal&&this.uiWidgetBase) {
			this.mVersion_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mVersion') as mw.TextBlock
		}
		return this.mVersion_Internal
	}
	private backBtmCanvas_Internal: mw.Canvas
	public get backBtmCanvas(): mw.Canvas {
		if(!this.backBtmCanvas_Internal&&this.uiWidgetBase) {
			this.backBtmCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/backBtmCanvas') as mw.Canvas
		}
		return this.backBtmCanvas_Internal
	}
	private mCancel_Internal: mw.Button
	public get mCancel(): mw.Button {
		if(!this.mCancel_Internal&&this.uiWidgetBase) {
			this.mCancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/backBtmCanvas/mCancel') as mw.Button
		}
		return this.mCancel_Internal
	}
	private mBar_Back_Internal: mw.ProgressBar
	public get mBar_Back(): mw.ProgressBar {
		if(!this.mBar_Back_Internal&&this.uiWidgetBase) {
			this.mBar_Back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/backBtmCanvas/mBar_Back') as mw.ProgressBar
		}
		return this.mBar_Back_Internal
	}
	private mText_Back_Internal: mw.TextBlock
	public get mText_Back(): mw.TextBlock {
		if(!this.mText_Back_Internal&&this.uiWidgetBase) {
			this.mText_Back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/backBtmCanvas/mText_Back') as mw.TextBlock
		}
		return this.mText_Back_Internal
	}
	private mText_Back_Time_Internal: mw.TextBlock
	public get mText_Back_Time(): mw.TextBlock {
		if(!this.mText_Back_Time_Internal&&this.uiWidgetBase) {
			this.mText_Back_Time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/backBtmCanvas/mText_Back_Time') as mw.TextBlock
		}
		return this.mText_Back_Time_Internal
	}
	private mCanvasMoney_Internal: mw.Canvas
	public get mCanvasMoney(): mw.Canvas {
		if(!this.mCanvasMoney_Internal&&this.uiWidgetBase) {
			this.mCanvasMoney_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasMoney') as mw.Canvas
		}
		return this.mCanvasMoney_Internal
	}
	private mGold_Internal: mw.TextBlock
	public get mGold(): mw.TextBlock {
		if(!this.mGold_Internal&&this.uiWidgetBase) {
			this.mGold_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasMoney/mGold') as mw.TextBlock
		}
		return this.mGold_Internal
	}
	private mCavasTrans_Internal: mw.Canvas
	public get mCavasTrans(): mw.Canvas {
		if(!this.mCavasTrans_Internal&&this.uiWidgetBase) {
			this.mCavasTrans_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCavasTrans') as mw.Canvas
		}
		return this.mCavasTrans_Internal
	}
	private mBtn_Trans_Internal: mw.Button
	public get mBtn_Trans(): mw.Button {
		if(!this.mBtn_Trans_Internal&&this.uiWidgetBase) {
			this.mBtn_Trans_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCavasTrans/mBtn_Trans') as mw.Button
		}
		return this.mBtn_Trans_Internal
	}
	private mMask_Trans_Internal: mw.MaskButton
	public get mMask_Trans(): mw.MaskButton {
		if(!this.mMask_Trans_Internal&&this.uiWidgetBase) {
			this.mMask_Trans_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCavasTrans/mMask_Trans') as mw.MaskButton
		}
		return this.mMask_Trans_Internal
	}
	private mText_Trans_Time_cd_Internal: mw.TextBlock
	public get mText_Trans_Time_cd(): mw.TextBlock {
		if(!this.mText_Trans_Time_cd_Internal&&this.uiWidgetBase) {
			this.mText_Trans_Time_cd_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCavasTrans/mText_Trans_Time_cd') as mw.TextBlock
		}
		return this.mText_Trans_Time_cd_Internal
	}
	private mCanvasPills_Internal: mw.Canvas
	public get mCanvasPills(): mw.Canvas {
		if(!this.mCanvasPills_Internal&&this.uiWidgetBase) {
			this.mCanvasPills_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills') as mw.Canvas
		}
		return this.mCanvasPills_Internal
	}
	private canvasAttack_Internal: mw.Canvas
	public get canvasAttack(): mw.Canvas {
		if(!this.canvasAttack_Internal&&this.uiWidgetBase) {
			this.canvasAttack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasAttack') as mw.Canvas
		}
		return this.canvasAttack_Internal
	}
	private mImage_Long_Internal: mw.Image
	public get mImage_Long(): mw.Image {
		if(!this.mImage_Long_Internal&&this.uiWidgetBase) {
			this.mImage_Long_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasAttack/mImage_Long') as mw.Image
		}
		return this.mImage_Long_Internal
	}
	private mMask_Trans_Long_Internal: mw.MaskButton
	public get mMask_Trans_Long(): mw.MaskButton {
		if(!this.mMask_Trans_Long_Internal&&this.uiWidgetBase) {
			this.mMask_Trans_Long_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasAttack/mMask_Trans_Long') as mw.MaskButton
		}
		return this.mMask_Trans_Long_Internal
	}
	private mText_Long_Num_Internal: mw.TextBlock
	public get mText_Long_Num(): mw.TextBlock {
		if(!this.mText_Long_Num_Internal&&this.uiWidgetBase) {
			this.mText_Long_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasAttack/mText_Long_Num') as mw.TextBlock
		}
		return this.mText_Long_Num_Internal
	}
	private textAttack_Internal: mw.TextBlock
	public get textAttack(): mw.TextBlock {
		if(!this.textAttack_Internal&&this.uiWidgetBase) {
			this.textAttack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasAttack/textAttack') as mw.TextBlock
		}
		return this.textAttack_Internal
	}
	private mText_Trans_Time_cd_Long_Internal: mw.TextBlock
	public get mText_Trans_Time_cd_Long(): mw.TextBlock {
		if(!this.mText_Trans_Time_cd_Long_Internal&&this.uiWidgetBase) {
			this.mText_Trans_Time_cd_Long_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasAttack/mText_Trans_Time_cd_Long') as mw.TextBlock
		}
		return this.mText_Trans_Time_cd_Long_Internal
	}
	private canvasLevelF_Internal: mw.Canvas
	public get canvasLevelF(): mw.Canvas {
		if(!this.canvasLevelF_Internal&&this.uiWidgetBase) {
			this.canvasLevelF_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasAttack/canvasLevelF') as mw.Canvas
		}
		return this.canvasLevelF_Internal
	}
	private fLevel01_Internal: mw.Image
	public get fLevel01(): mw.Image {
		if(!this.fLevel01_Internal&&this.uiWidgetBase) {
			this.fLevel01_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasAttack/canvasLevelF/fLevel01') as mw.Image
		}
		return this.fLevel01_Internal
	}
	private fLevel02_Internal: mw.Image
	public get fLevel02(): mw.Image {
		if(!this.fLevel02_Internal&&this.uiWidgetBase) {
			this.fLevel02_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasAttack/canvasLevelF/fLevel02') as mw.Image
		}
		return this.fLevel02_Internal
	}
	private fLevel03_Internal: mw.Image
	public get fLevel03(): mw.Image {
		if(!this.fLevel03_Internal&&this.uiWidgetBase) {
			this.fLevel03_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasAttack/canvasLevelF/fLevel03') as mw.Image
		}
		return this.fLevel03_Internal
	}
	private fLevel04_Internal: mw.Image
	public get fLevel04(): mw.Image {
		if(!this.fLevel04_Internal&&this.uiWidgetBase) {
			this.fLevel04_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasAttack/canvasLevelF/fLevel04') as mw.Image
		}
		return this.fLevel04_Internal
	}
	private fLevel05_Internal: mw.Image
	public get fLevel05(): mw.Image {
		if(!this.fLevel05_Internal&&this.uiWidgetBase) {
			this.fLevel05_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasAttack/canvasLevelF/fLevel05') as mw.Image
		}
		return this.fLevel05_Internal
	}
	private canvasDefend_Internal: mw.Canvas
	public get canvasDefend(): mw.Canvas {
		if(!this.canvasDefend_Internal&&this.uiWidgetBase) {
			this.canvasDefend_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasDefend') as mw.Canvas
		}
		return this.canvasDefend_Internal
	}
	private mImage_Tortoise_Internal: mw.Image
	public get mImage_Tortoise(): mw.Image {
		if(!this.mImage_Tortoise_Internal&&this.uiWidgetBase) {
			this.mImage_Tortoise_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasDefend/mImage_Tortoise') as mw.Image
		}
		return this.mImage_Tortoise_Internal
	}
	private mMask_Trans_Tortoise_Internal: mw.MaskButton
	public get mMask_Trans_Tortoise(): mw.MaskButton {
		if(!this.mMask_Trans_Tortoise_Internal&&this.uiWidgetBase) {
			this.mMask_Trans_Tortoise_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasDefend/mMask_Trans_Tortoise') as mw.MaskButton
		}
		return this.mMask_Trans_Tortoise_Internal
	}
	private mText_Tortoise_Num_Internal: mw.TextBlock
	public get mText_Tortoise_Num(): mw.TextBlock {
		if(!this.mText_Tortoise_Num_Internal&&this.uiWidgetBase) {
			this.mText_Tortoise_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasDefend/mText_Tortoise_Num') as mw.TextBlock
		}
		return this.mText_Tortoise_Num_Internal
	}
	private textDefend_Internal: mw.TextBlock
	public get textDefend(): mw.TextBlock {
		if(!this.textDefend_Internal&&this.uiWidgetBase) {
			this.textDefend_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasDefend/textDefend') as mw.TextBlock
		}
		return this.textDefend_Internal
	}
	private mText_Trans_Time_cd_Tortoise_Internal: mw.TextBlock
	public get mText_Trans_Time_cd_Tortoise(): mw.TextBlock {
		if(!this.mText_Trans_Time_cd_Tortoise_Internal&&this.uiWidgetBase) {
			this.mText_Trans_Time_cd_Tortoise_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasDefend/mText_Trans_Time_cd_Tortoise') as mw.TextBlock
		}
		return this.mText_Trans_Time_cd_Tortoise_Internal
	}
	private canvasLevelD_Internal: mw.Canvas
	public get canvasLevelD(): mw.Canvas {
		if(!this.canvasLevelD_Internal&&this.uiWidgetBase) {
			this.canvasLevelD_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasDefend/canvasLevelD') as mw.Canvas
		}
		return this.canvasLevelD_Internal
	}
	private dLevel01_Internal: mw.Image
	public get dLevel01(): mw.Image {
		if(!this.dLevel01_Internal&&this.uiWidgetBase) {
			this.dLevel01_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasDefend/canvasLevelD/dLevel01') as mw.Image
		}
		return this.dLevel01_Internal
	}
	private dLevel02_Internal: mw.Image
	public get dLevel02(): mw.Image {
		if(!this.dLevel02_Internal&&this.uiWidgetBase) {
			this.dLevel02_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasDefend/canvasLevelD/dLevel02') as mw.Image
		}
		return this.dLevel02_Internal
	}
	private dLevel03_Internal: mw.Image
	public get dLevel03(): mw.Image {
		if(!this.dLevel03_Internal&&this.uiWidgetBase) {
			this.dLevel03_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasDefend/canvasLevelD/dLevel03') as mw.Image
		}
		return this.dLevel03_Internal
	}
	private dLevel04_Internal: mw.Image
	public get dLevel04(): mw.Image {
		if(!this.dLevel04_Internal&&this.uiWidgetBase) {
			this.dLevel04_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasDefend/canvasLevelD/dLevel04') as mw.Image
		}
		return this.dLevel04_Internal
	}
	private dLevel05_Internal: mw.Image
	public get dLevel05(): mw.Image {
		if(!this.dLevel05_Internal&&this.uiWidgetBase) {
			this.dLevel05_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasDefend/canvasLevelD/dLevel05') as mw.Image
		}
		return this.dLevel05_Internal
	}
	private canvasHeart_Internal: mw.Canvas
	public get canvasHeart(): mw.Canvas {
		if(!this.canvasHeart_Internal&&this.uiWidgetBase) {
			this.canvasHeart_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasHeart') as mw.Canvas
		}
		return this.canvasHeart_Internal
	}
	private mImage_Bone_Internal: mw.Image
	public get mImage_Bone(): mw.Image {
		if(!this.mImage_Bone_Internal&&this.uiWidgetBase) {
			this.mImage_Bone_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasHeart/mImage_Bone') as mw.Image
		}
		return this.mImage_Bone_Internal
	}
	private mMask_Trans_Bone_Internal: mw.MaskButton
	public get mMask_Trans_Bone(): mw.MaskButton {
		if(!this.mMask_Trans_Bone_Internal&&this.uiWidgetBase) {
			this.mMask_Trans_Bone_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasHeart/mMask_Trans_Bone') as mw.MaskButton
		}
		return this.mMask_Trans_Bone_Internal
	}
	private mText_Bone_Num_Internal: mw.TextBlock
	public get mText_Bone_Num(): mw.TextBlock {
		if(!this.mText_Bone_Num_Internal&&this.uiWidgetBase) {
			this.mText_Bone_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasHeart/mText_Bone_Num') as mw.TextBlock
		}
		return this.mText_Bone_Num_Internal
	}
	private textHeart_Internal: mw.TextBlock
	public get textHeart(): mw.TextBlock {
		if(!this.textHeart_Internal&&this.uiWidgetBase) {
			this.textHeart_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasHeart/textHeart') as mw.TextBlock
		}
		return this.textHeart_Internal
	}
	private mText_Trans_Time_cd_Bone_Internal: mw.TextBlock
	public get mText_Trans_Time_cd_Bone(): mw.TextBlock {
		if(!this.mText_Trans_Time_cd_Bone_Internal&&this.uiWidgetBase) {
			this.mText_Trans_Time_cd_Bone_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasHeart/mText_Trans_Time_cd_Bone') as mw.TextBlock
		}
		return this.mText_Trans_Time_cd_Bone_Internal
	}
	private canvasLevelH_Internal: mw.Canvas
	public get canvasLevelH(): mw.Canvas {
		if(!this.canvasLevelH_Internal&&this.uiWidgetBase) {
			this.canvasLevelH_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasHeart/canvasLevelH') as mw.Canvas
		}
		return this.canvasLevelH_Internal
	}
	private hLevel01_Internal: mw.Image
	public get hLevel01(): mw.Image {
		if(!this.hLevel01_Internal&&this.uiWidgetBase) {
			this.hLevel01_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasHeart/canvasLevelH/hLevel01') as mw.Image
		}
		return this.hLevel01_Internal
	}
	private hLevel02_Internal: mw.Image
	public get hLevel02(): mw.Image {
		if(!this.hLevel02_Internal&&this.uiWidgetBase) {
			this.hLevel02_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasHeart/canvasLevelH/hLevel02') as mw.Image
		}
		return this.hLevel02_Internal
	}
	private hLevel03_Internal: mw.Image
	public get hLevel03(): mw.Image {
		if(!this.hLevel03_Internal&&this.uiWidgetBase) {
			this.hLevel03_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasHeart/canvasLevelH/hLevel03') as mw.Image
		}
		return this.hLevel03_Internal
	}
	private hLevel04_Internal: mw.Image
	public get hLevel04(): mw.Image {
		if(!this.hLevel04_Internal&&this.uiWidgetBase) {
			this.hLevel04_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasHeart/canvasLevelH/hLevel04') as mw.Image
		}
		return this.hLevel04_Internal
	}
	private hLevel05_Internal: mw.Image
	public get hLevel05(): mw.Image {
		if(!this.hLevel05_Internal&&this.uiWidgetBase) {
			this.hLevel05_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasHeart/canvasLevelH/hLevel05') as mw.Image
		}
		return this.hLevel05_Internal
	}
	private canvasBlue_Internal: mw.Canvas
	public get canvasBlue(): mw.Canvas {
		if(!this.canvasBlue_Internal&&this.uiWidgetBase) {
			this.canvasBlue_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasBlue') as mw.Canvas
		}
		return this.canvasBlue_Internal
	}
	private mImage_Qi_Internal: mw.Image
	public get mImage_Qi(): mw.Image {
		if(!this.mImage_Qi_Internal&&this.uiWidgetBase) {
			this.mImage_Qi_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasBlue/mImage_Qi') as mw.Image
		}
		return this.mImage_Qi_Internal
	}
	private mMask_Trans_Qi_Internal: mw.MaskButton
	public get mMask_Trans_Qi(): mw.MaskButton {
		if(!this.mMask_Trans_Qi_Internal&&this.uiWidgetBase) {
			this.mMask_Trans_Qi_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasBlue/mMask_Trans_Qi') as mw.MaskButton
		}
		return this.mMask_Trans_Qi_Internal
	}
	private mText_Qi_Num_Internal: mw.TextBlock
	public get mText_Qi_Num(): mw.TextBlock {
		if(!this.mText_Qi_Num_Internal&&this.uiWidgetBase) {
			this.mText_Qi_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasBlue/mText_Qi_Num') as mw.TextBlock
		}
		return this.mText_Qi_Num_Internal
	}
	private textBlue_Internal: mw.TextBlock
	public get textBlue(): mw.TextBlock {
		if(!this.textBlue_Internal&&this.uiWidgetBase) {
			this.textBlue_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasBlue/textBlue') as mw.TextBlock
		}
		return this.textBlue_Internal
	}
	private mText_Trans_Time_cd_Qi_Internal: mw.TextBlock
	public get mText_Trans_Time_cd_Qi(): mw.TextBlock {
		if(!this.mText_Trans_Time_cd_Qi_Internal&&this.uiWidgetBase) {
			this.mText_Trans_Time_cd_Qi_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasBlue/mText_Trans_Time_cd_Qi') as mw.TextBlock
		}
		return this.mText_Trans_Time_cd_Qi_Internal
	}
	private canvasLevelB_Internal: mw.Canvas
	public get canvasLevelB(): mw.Canvas {
		if(!this.canvasLevelB_Internal&&this.uiWidgetBase) {
			this.canvasLevelB_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasBlue/canvasLevelB') as mw.Canvas
		}
		return this.canvasLevelB_Internal
	}
	private bLevel01_Internal: mw.Image
	public get bLevel01(): mw.Image {
		if(!this.bLevel01_Internal&&this.uiWidgetBase) {
			this.bLevel01_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasBlue/canvasLevelB/bLevel01') as mw.Image
		}
		return this.bLevel01_Internal
	}
	private bLevel02_Internal: mw.Image
	public get bLevel02(): mw.Image {
		if(!this.bLevel02_Internal&&this.uiWidgetBase) {
			this.bLevel02_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasBlue/canvasLevelB/bLevel02') as mw.Image
		}
		return this.bLevel02_Internal
	}
	private bLevel03_Internal: mw.Image
	public get bLevel03(): mw.Image {
		if(!this.bLevel03_Internal&&this.uiWidgetBase) {
			this.bLevel03_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasBlue/canvasLevelB/bLevel03') as mw.Image
		}
		return this.bLevel03_Internal
	}
	private bLevel04_Internal: mw.Image
	public get bLevel04(): mw.Image {
		if(!this.bLevel04_Internal&&this.uiWidgetBase) {
			this.bLevel04_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasBlue/canvasLevelB/bLevel04') as mw.Image
		}
		return this.bLevel04_Internal
	}
	private bLevel05_Internal: mw.Image
	public get bLevel05(): mw.Image {
		if(!this.bLevel05_Internal&&this.uiWidgetBase) {
			this.bLevel05_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasPills/canvasBlue/canvasLevelB/bLevel05') as mw.Image
		}
		return this.bLevel05_Internal
	}
	private pointCanvas_Internal: mw.Canvas
	public get pointCanvas(): mw.Canvas {
		if(!this.pointCanvas_Internal&&this.uiWidgetBase) {
			this.pointCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/pointCanvas') as mw.Canvas
		}
		return this.pointCanvas_Internal
	}
	private mPoint_Internal: mw.TextBlock
	public get mPoint(): mw.TextBlock {
		if(!this.mPoint_Internal&&this.uiWidgetBase) {
			this.mPoint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/pointCanvas/mPoint') as mw.TextBlock
		}
		return this.mPoint_Internal
	}
	private socialCanvas_Internal: mw.Canvas
	public get socialCanvas(): mw.Canvas {
		if(!this.socialCanvas_Internal&&this.uiWidgetBase) {
			this.socialCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/socialCanvas') as mw.Canvas
		}
		return this.socialCanvas_Internal
	}
	private mSocialBtn_Internal: mw.Button
	public get mSocialBtn(): mw.Button {
		if(!this.mSocialBtn_Internal&&this.uiWidgetBase) {
			this.mSocialBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/socialCanvas/mSocialBtn') as mw.Button
		}
		return this.mSocialBtn_Internal
	}
	private mSocialImg_Internal: mw.Image
	public get mSocialImg(): mw.Image {
		if(!this.mSocialImg_Internal&&this.uiWidgetBase) {
			this.mSocialImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/socialCanvas/mSocialImg') as mw.Image
		}
		return this.mSocialImg_Internal
	}
	private eventsCanvas_Internal: mw.Canvas
	public get eventsCanvas(): mw.Canvas {
		if(!this.eventsCanvas_Internal&&this.uiWidgetBase) {
			this.eventsCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/eventsCanvas') as mw.Canvas
		}
		return this.eventsCanvas_Internal
	}
	private mEventsBtn_Internal: mw.Button
	public get mEventsBtn(): mw.Button {
		if(!this.mEventsBtn_Internal&&this.uiWidgetBase) {
			this.mEventsBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/eventsCanvas/mEventsBtn') as mw.Button
		}
		return this.mEventsBtn_Internal
	}
	private mEventsImg_Internal: mw.Image
	public get mEventsImg(): mw.Image {
		if(!this.mEventsImg_Internal&&this.uiWidgetBase) {
			this.mEventsImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/eventsCanvas/mEventsImg') as mw.Image
		}
		return this.mEventsImg_Internal
	}
	private roomIdText_Internal: mw.TextBlock
	public get roomIdText(): mw.TextBlock {
		if(!this.roomIdText_Internal&&this.uiWidgetBase) {
			this.roomIdText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/roomIdText') as mw.TextBlock
		}
		return this.roomIdText_Internal
	}
	private canvasRecord_Internal: mw.Canvas
	public get canvasRecord(): mw.Canvas {
		if(!this.canvasRecord_Internal&&this.uiWidgetBase) {
			this.canvasRecord_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasRecord') as mw.Canvas
		}
		return this.canvasRecord_Internal
	}
	private canvasDan_Internal: mw.Canvas
	public get canvasDan(): mw.Canvas {
		if(!this.canvasDan_Internal&&this.uiWidgetBase) {
			this.canvasDan_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasRecord/canvasDan') as mw.Canvas
		}
		return this.canvasDan_Internal
	}
	private imgDan_Internal: mw.Image
	public get imgDan(): mw.Image {
		if(!this.imgDan_Internal&&this.uiWidgetBase) {
			this.imgDan_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasRecord/canvasDan/imgDan') as mw.Image
		}
		return this.imgDan_Internal
	}
	private imgDanIcon_Internal: mw.Image
	public get imgDanIcon(): mw.Image {
		if(!this.imgDanIcon_Internal&&this.uiWidgetBase) {
			this.imgDanIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasRecord/canvasDan/imgDanIcon') as mw.Image
		}
		return this.imgDanIcon_Internal
	}
	private textDanNum_Internal: mw.TextBlock
	public get textDanNum(): mw.TextBlock {
		if(!this.textDanNum_Internal&&this.uiWidgetBase) {
			this.textDanNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasRecord/canvasDan/textDanNum') as mw.TextBlock
		}
		return this.textDanNum_Internal
	}
	private canvasKillRecord_Internal: mw.Canvas
	public get canvasKillRecord(): mw.Canvas {
		if(!this.canvasKillRecord_Internal&&this.uiWidgetBase) {
			this.canvasKillRecord_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasRecord/canvasKillRecord') as mw.Canvas
		}
		return this.canvasKillRecord_Internal
	}
	private imgKill_Internal: mw.Image
	public get imgKill(): mw.Image {
		if(!this.imgKill_Internal&&this.uiWidgetBase) {
			this.imgKill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasRecord/canvasKillRecord/imgKill') as mw.Image
		}
		return this.imgKill_Internal
	}
	private imgKillIcon_Internal: mw.Image
	public get imgKillIcon(): mw.Image {
		if(!this.imgKillIcon_Internal&&this.uiWidgetBase) {
			this.imgKillIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasRecord/canvasKillRecord/imgKillIcon') as mw.Image
		}
		return this.imgKillIcon_Internal
	}
	private textKillNum_Internal: mw.TextBlock
	public get textKillNum(): mw.TextBlock {
		if(!this.textKillNum_Internal&&this.uiWidgetBase) {
			this.textKillNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasRecord/canvasKillRecord/textKillNum') as mw.TextBlock
		}
		return this.textKillNum_Internal
	}
	private canvasPayMoney_Internal: mw.Canvas
	public get canvasPayMoney(): mw.Canvas {
		if(!this.canvasPayMoney_Internal&&this.uiWidgetBase) {
			this.canvasPayMoney_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasPayMoney') as mw.Canvas
		}
		return this.canvasPayMoney_Internal
	}
	private mCanvasMCoin_Internal: mw.Canvas
	public get mCanvasMCoin(): mw.Canvas {
		if(!this.mCanvasMCoin_Internal&&this.uiWidgetBase) {
			this.mCanvasMCoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasPayMoney/mCanvasMCoin') as mw.Canvas
		}
		return this.mCanvasMCoin_Internal
	}
	private mMCoin_Internal: mw.TextBlock
	public get mMCoin(): mw.TextBlock {
		if(!this.mMCoin_Internal&&this.uiWidgetBase) {
			this.mMCoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasPayMoney/mCanvasMCoin/mMCoin') as mw.TextBlock
		}
		return this.mMCoin_Internal
	}
	private mBtn_MCoin_Add_Internal: mw.Button
	public get mBtn_MCoin_Add(): mw.Button {
		if(!this.mBtn_MCoin_Add_Internal&&this.uiWidgetBase) {
			this.mBtn_MCoin_Add_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasPayMoney/mCanvasMCoin/mBtn_MCoin_Add') as mw.Button
		}
		return this.mBtn_MCoin_Add_Internal
	}
	private mBtn_MCoin_Refresh_Internal: mw.Button
	public get mBtn_MCoin_Refresh(): mw.Button {
		if(!this.mBtn_MCoin_Refresh_Internal&&this.uiWidgetBase) {
			this.mBtn_MCoin_Refresh_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasPayMoney/mCanvasMCoin/mBtn_MCoin_Refresh') as mw.Button
		}
		return this.mBtn_MCoin_Refresh_Internal
	}
	private mCanvasBattle_Internal: mw.Canvas
	public get mCanvasBattle(): mw.Canvas {
		if(!this.mCanvasBattle_Internal&&this.uiWidgetBase) {
			this.mCanvasBattle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasPayMoney/mCanvasBattle') as mw.Canvas
		}
		return this.mCanvasBattle_Internal
	}
	private mBattle_1_Internal: mw.TextBlock
	public get mBattle_1(): mw.TextBlock {
		if(!this.mBattle_1_Internal&&this.uiWidgetBase) {
			this.mBattle_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasPayMoney/mCanvasBattle/mBattle_1') as mw.TextBlock
		}
		return this.mBattle_1_Internal
	}
	private mBattle_Internal: mw.TextBlock
	public get mBattle(): mw.TextBlock {
		if(!this.mBattle_Internal&&this.uiWidgetBase) {
			this.mBattle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasPayMoney/mCanvasBattle/mBattle') as mw.TextBlock
		}
		return this.mBattle_Internal
	}
	private mBattle_2_Internal: mw.TextBlock
	public get mBattle_2(): mw.TextBlock {
		if(!this.mBattle_2_Internal&&this.uiWidgetBase) {
			this.mBattle_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasPayMoney/mCanvasBattle/mBattle_2') as mw.TextBlock
		}
		return this.mBattle_2_Internal
	}
	private mBtn_Battle_Refresh_Internal: mw.Button
	public get mBtn_Battle_Refresh(): mw.Button {
		if(!this.mBtn_Battle_Refresh_Internal&&this.uiWidgetBase) {
			this.mBtn_Battle_Refresh_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasPayMoney/mCanvasBattle/mBtn_Battle_Refresh') as mw.Button
		}
		return this.mBtn_Battle_Refresh_Internal
	}
	private mBtn_Battle_Add_Internal: mw.Button
	public get mBtn_Battle_Add(): mw.Button {
		if(!this.mBtn_Battle_Add_Internal&&this.uiWidgetBase) {
			this.mBtn_Battle_Add_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasPayMoney/mCanvasBattle/mBtn_Battle_Add') as mw.Button
		}
		return this.mBtn_Battle_Add_Internal
	}
	private canvasIconBtn_Internal: mw.Canvas
	public get canvasIconBtn(): mw.Canvas {
		if(!this.canvasIconBtn_Internal&&this.uiWidgetBase) {
			this.canvasIconBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn') as mw.Canvas
		}
		return this.canvasIconBtn_Internal
	}
	private backCanvas_Internal: mw.Canvas
	public get backCanvas(): mw.Canvas {
		if(!this.backCanvas_Internal&&this.uiWidgetBase) {
			this.backCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn/backCanvas') as mw.Canvas
		}
		return this.backCanvas_Internal
	}
	private mBtn_Back_Internal: mw.Button
	public get mBtn_Back(): mw.Button {
		if(!this.mBtn_Back_Internal&&this.uiWidgetBase) {
			this.mBtn_Back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn/backCanvas/mBtn_Back') as mw.Button
		}
		return this.mBtn_Back_Internal
	}
	private mMask_Back_Internal: mw.MaskButton
	public get mMask_Back(): mw.MaskButton {
		if(!this.mMask_Back_Internal&&this.uiWidgetBase) {
			this.mMask_Back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn/backCanvas/mMask_Back') as mw.MaskButton
		}
		return this.mMask_Back_Internal
	}
	private mText_Back_Time_cd_Internal: mw.TextBlock
	public get mText_Back_Time_cd(): mw.TextBlock {
		if(!this.mText_Back_Time_cd_Internal&&this.uiWidgetBase) {
			this.mText_Back_Time_cd_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn/backCanvas/mText_Back_Time_cd') as mw.TextBlock
		}
		return this.mText_Back_Time_cd_Internal
	}
	private canvasJumpRoom_Internal: mw.Canvas
	public get canvasJumpRoom(): mw.Canvas {
		if(!this.canvasJumpRoom_Internal&&this.uiWidgetBase) {
			this.canvasJumpRoom_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn/canvasJumpRoom') as mw.Canvas
		}
		return this.canvasJumpRoom_Internal
	}
	private jumpRoomBtn_Internal: mw.Button
	public get jumpRoomBtn(): mw.Button {
		if(!this.jumpRoomBtn_Internal&&this.uiWidgetBase) {
			this.jumpRoomBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn/canvasJumpRoom/jumpRoomBtn') as mw.Button
		}
		return this.jumpRoomBtn_Internal
	}
	private actionimage_1_Internal: mw.Image
	public get actionimage_1(): mw.Image {
		if(!this.actionimage_1_Internal&&this.uiWidgetBase) {
			this.actionimage_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn/canvasJumpRoom/actionimage_1') as mw.Image
		}
		return this.actionimage_1_Internal
	}
	private actiontext_1_Internal: mw.TextBlock
	public get actiontext_1(): mw.TextBlock {
		if(!this.actiontext_1_Internal&&this.uiWidgetBase) {
			this.actiontext_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn/canvasJumpRoom/actiontext_1') as mw.TextBlock
		}
		return this.actiontext_1_Internal
	}
	private canvasAction_Internal: mw.Canvas
	public get canvasAction(): mw.Canvas {
		if(!this.canvasAction_Internal&&this.uiWidgetBase) {
			this.canvasAction_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn/canvasAction') as mw.Canvas
		}
		return this.canvasAction_Internal
	}
	private mActionBtn_Internal: mw.Button
	public get mActionBtn(): mw.Button {
		if(!this.mActionBtn_Internal&&this.uiWidgetBase) {
			this.mActionBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn/canvasAction/mActionBtn') as mw.Button
		}
		return this.mActionBtn_Internal
	}
	private actionimage_Internal: mw.Image
	public get actionimage(): mw.Image {
		if(!this.actionimage_Internal&&this.uiWidgetBase) {
			this.actionimage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn/canvasAction/actionimage') as mw.Image
		}
		return this.actionimage_Internal
	}
	private actiontext_Internal: mw.TextBlock
	public get actiontext(): mw.TextBlock {
		if(!this.actiontext_Internal&&this.uiWidgetBase) {
			this.actiontext_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn/canvasAction/actiontext') as mw.TextBlock
		}
		return this.actiontext_Internal
	}
	private rankCanvas_Internal: mw.Canvas
	public get rankCanvas(): mw.Canvas {
		if(!this.rankCanvas_Internal&&this.uiWidgetBase) {
			this.rankCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn/rankCanvas') as mw.Canvas
		}
		return this.rankCanvas_Internal
	}
	private mBtn_Rank_Internal: mw.Button
	public get mBtn_Rank(): mw.Button {
		if(!this.mBtn_Rank_Internal&&this.uiWidgetBase) {
			this.mBtn_Rank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn/rankCanvas/mBtn_Rank') as mw.Button
		}
		return this.mBtn_Rank_Internal
	}
	private canvasSetting_Internal: mw.Canvas
	public get canvasSetting(): mw.Canvas {
		if(!this.canvasSetting_Internal&&this.uiWidgetBase) {
			this.canvasSetting_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn/canvasSetting') as mw.Canvas
		}
		return this.canvasSetting_Internal
	}
	private mBtn_Setting_Internal: mw.Button
	public get mBtn_Setting(): mw.Button {
		if(!this.mBtn_Setting_Internal&&this.uiWidgetBase) {
			this.mBtn_Setting_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIconBtn/canvasSetting/mBtn_Setting') as mw.Button
		}
		return this.mBtn_Setting_Internal
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
		
		this.mSkillSelectBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSkillSelectBtn");
		})
		
		
	
		this.mBtn_Reborn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Reborn");
		})
		
		
	
		this.mBtn_GM.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_GM");
		})
		
		
	
		this.mCancel.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCancel");
		})
		
		
	
		this.mBtn_Trans.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Trans");
		})
		
		
	
		this.mSocialBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSocialBtn");
		})
		
		
	
		this.mEventsBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mEventsBtn");
		})
		
		
	
		this.mBtn_MCoin_Add.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_MCoin_Add");
		})
		
		
	
		this.mBtn_MCoin_Refresh.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_MCoin_Refresh");
		})
		
		
	
		this.mBtn_Battle_Refresh.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Battle_Refresh");
		})
		
		
	
		this.mBtn_Battle_Add.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Battle_Add");
		})
		
		
	
		this.mBtn_Back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Back");
		})
		
		
	
		this.jumpRoomBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "jumpRoomBtn");
		})
		
		
	
		this.mActionBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mActionBtn");
		})
		
		
	
		this.mBtn_Rank.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Rank");
		})
		
		
	
		this.mBtn_Setting.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Setting");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mSkillSelctCount)
		
	
		this.initLanguage(this.mText_Life)
		
	
		this.initLanguage(this.mText_Magic)
		
	
		this.initLanguage(this.mAttackNum)
		
	
		this.initLanguage(this.mVersion)
		
	
		this.initLanguage(this.mText_Back)
		
	
		this.initLanguage(this.mText_Back_Time)
		
	
		this.initLanguage(this.mGold)
		
	
		this.initLanguage(this.mText_Trans_Time_cd)
		
	
		this.initLanguage(this.mText_Long_Num)
		
	
		this.initLanguage(this.textAttack)
		
	
		this.initLanguage(this.mText_Trans_Time_cd_Long)
		
	
		this.initLanguage(this.mText_Tortoise_Num)
		
	
		this.initLanguage(this.textDefend)
		
	
		this.initLanguage(this.mText_Trans_Time_cd_Tortoise)
		
	
		this.initLanguage(this.mText_Bone_Num)
		
	
		this.initLanguage(this.textHeart)
		
	
		this.initLanguage(this.mText_Trans_Time_cd_Bone)
		
	
		this.initLanguage(this.mText_Qi_Num)
		
	
		this.initLanguage(this.textBlue)
		
	
		this.initLanguage(this.mText_Trans_Time_cd_Qi)
		
	
		this.initLanguage(this.mPoint)
		
	
		this.initLanguage(this.roomIdText)
		
	
		this.initLanguage(this.textDanNum)
		
	
		this.initLanguage(this.textKillNum)
		
	
		this.initLanguage(this.mMCoin)
		
	
		this.initLanguage(this.mBattle_1)
		
	
		this.initLanguage(this.mBattle)
		
	
		this.initLanguage(this.mBattle_2)
		
	
		this.initLanguage(this.mText_Back_Time_cd)
		
	
		this.initLanguage(this.actiontext_1)
		
	
		this.initLanguage(this.actiontext)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSkillSelectBox/TextBlock_4_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCavasTrans/TextBlock_5") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/socialCanvas/TextBlock_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/eventsCanvas/TextBlock_3") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvasIconBtn/backCanvas/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvasIconBtn/rankCanvas/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvasIconBtn/canvasSetting/TextBlock_4") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 