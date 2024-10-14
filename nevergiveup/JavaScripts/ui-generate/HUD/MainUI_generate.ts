
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/HUD/MainUI.ui')
export default class MainUI_Generate extends UIScript {
		private canvas_monster_Internal: mw.Canvas
	public get canvas_monster(): mw.Canvas {
		if(!this.canvas_monster_Internal&&this.uiWidgetBase) {
			this.canvas_monster_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster') as mw.Canvas
		}
		return this.canvas_monster_Internal
	}
	private imgMonsterBg_Internal: mw.Image
	public get imgMonsterBg(): mw.Image {
		if(!this.imgMonsterBg_Internal&&this.uiWidgetBase) {
			this.imgMonsterBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/imgMonsterBg') as mw.Image
		}
		return this.imgMonsterBg_Internal
	}
	private canvas_monsterInfo_Internal: mw.Canvas
	public get canvas_monsterInfo(): mw.Canvas {
		if(!this.canvas_monsterInfo_Internal&&this.uiWidgetBase) {
			this.canvas_monsterInfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo') as mw.Canvas
		}
		return this.canvas_monsterInfo_Internal
	}
	private canvas_current_Internal: mw.Canvas
	public get canvas_current(): mw.Canvas {
		if(!this.canvas_current_Internal&&this.uiWidgetBase) {
			this.canvas_current_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo/canvas_current') as mw.Canvas
		}
		return this.canvas_current_Internal
	}
	private textCurrent_Internal: mw.TextBlock
	public get textCurrent(): mw.TextBlock {
		if(!this.textCurrent_Internal&&this.uiWidgetBase) {
			this.textCurrent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo/canvas_current/textCurrent') as mw.TextBlock
		}
		return this.textCurrent_Internal
	}
	private canvas_currentMonsterSkill_Internal: mw.Canvas
	public get canvas_currentMonsterSkill(): mw.Canvas {
		if(!this.canvas_currentMonsterSkill_Internal&&this.uiWidgetBase) {
			this.canvas_currentMonsterSkill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo/canvas_current/canvas_currentMonsterSkill') as mw.Canvas
		}
		return this.canvas_currentMonsterSkill_Internal
	}
	private textCurrentSkill_Internal: mw.TextBlock
	public get textCurrentSkill(): mw.TextBlock {
		if(!this.textCurrentSkill_Internal&&this.uiWidgetBase) {
			this.textCurrentSkill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo/canvas_current/canvas_currentMonsterSkill/textCurrentSkill') as mw.TextBlock
		}
		return this.textCurrentSkill_Internal
	}
	private can_skillList_1_Internal: mw.Canvas
	public get can_skillList_1(): mw.Canvas {
		if(!this.can_skillList_1_Internal&&this.uiWidgetBase) {
			this.can_skillList_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo/canvas_current/canvas_currentMonsterSkill/can_skillList_1') as mw.Canvas
		}
		return this.can_skillList_1_Internal
	}
	private canvas_currentMonsterEle_1_Internal: mw.Canvas
	public get canvas_currentMonsterEle_1(): mw.Canvas {
		if(!this.canvas_currentMonsterEle_1_Internal&&this.uiWidgetBase) {
			this.canvas_currentMonsterEle_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo/canvas_current/canvas_currentMonsterEle_1') as mw.Canvas
		}
		return this.canvas_currentMonsterEle_1_Internal
	}
	private textCurrentElement_Internal: mw.TextBlock
	public get textCurrentElement(): mw.TextBlock {
		if(!this.textCurrentElement_Internal&&this.uiWidgetBase) {
			this.textCurrentElement_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo/canvas_current/canvas_currentMonsterEle_1/textCurrentElement') as mw.TextBlock
		}
		return this.textCurrentElement_Internal
	}
	private can_waveEleList_1_Internal: mw.Canvas
	public get can_waveEleList_1(): mw.Canvas {
		if(!this.can_waveEleList_1_Internal&&this.uiWidgetBase) {
			this.can_waveEleList_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo/canvas_current/canvas_currentMonsterEle_1/can_waveEleList_1') as mw.Canvas
		}
		return this.can_waveEleList_1_Internal
	}
	private canvas_coming_Internal: mw.Canvas
	public get canvas_coming(): mw.Canvas {
		if(!this.canvas_coming_Internal&&this.uiWidgetBase) {
			this.canvas_coming_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo/canvas_coming') as mw.Canvas
		}
		return this.canvas_coming_Internal
	}
	private textCurrent_1_Internal: mw.TextBlock
	public get textCurrent_1(): mw.TextBlock {
		if(!this.textCurrent_1_Internal&&this.uiWidgetBase) {
			this.textCurrent_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo/canvas_coming/textCurrent_1') as mw.TextBlock
		}
		return this.textCurrent_1_Internal
	}
	private canvas_currentMonsterEle_2_Internal: mw.Canvas
	public get canvas_currentMonsterEle_2(): mw.Canvas {
		if(!this.canvas_currentMonsterEle_2_Internal&&this.uiWidgetBase) {
			this.canvas_currentMonsterEle_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo/canvas_coming/canvas_currentMonsterEle_2') as mw.Canvas
		}
		return this.canvas_currentMonsterEle_2_Internal
	}
	private textCurrentElement_1_Internal: mw.TextBlock
	public get textCurrentElement_1(): mw.TextBlock {
		if(!this.textCurrentElement_1_Internal&&this.uiWidgetBase) {
			this.textCurrentElement_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo/canvas_coming/canvas_currentMonsterEle_2/textCurrentElement_1') as mw.TextBlock
		}
		return this.textCurrentElement_1_Internal
	}
	private can_waveEleList_2_Internal: mw.Canvas
	public get can_waveEleList_2(): mw.Canvas {
		if(!this.can_waveEleList_2_Internal&&this.uiWidgetBase) {
			this.can_waveEleList_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo/canvas_coming/canvas_currentMonsterEle_2/can_waveEleList_2') as mw.Canvas
		}
		return this.can_waveEleList_2_Internal
	}
	private canvas_comingMonsterSkill_Internal: mw.Canvas
	public get canvas_comingMonsterSkill(): mw.Canvas {
		if(!this.canvas_comingMonsterSkill_Internal&&this.uiWidgetBase) {
			this.canvas_comingMonsterSkill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo/canvas_coming/canvas_comingMonsterSkill') as mw.Canvas
		}
		return this.canvas_comingMonsterSkill_Internal
	}
	private textComingSkill_Internal: mw.TextBlock
	public get textComingSkill(): mw.TextBlock {
		if(!this.textComingSkill_Internal&&this.uiWidgetBase) {
			this.textComingSkill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo/canvas_coming/canvas_comingMonsterSkill/textComingSkill') as mw.TextBlock
		}
		return this.textComingSkill_Internal
	}
	private can_skillList_2_Internal: mw.Canvas
	public get can_skillList_2(): mw.Canvas {
		if(!this.can_skillList_2_Internal&&this.uiWidgetBase) {
			this.can_skillList_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_monster/canvas_monsterInfo/canvas_coming/canvas_comingMonsterSkill/can_skillList_2') as mw.Canvas
		}
		return this.can_skillList_2_Internal
	}
	private img_BG_1_Internal: mw.Image
	public get img_BG_1(): mw.Image {
		if(!this.img_BG_1_Internal&&this.uiWidgetBase) {
			this.img_BG_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/img_BG_1') as mw.Image
		}
		return this.img_BG_1_Internal
	}
	private mHpBar_Internal: mw.ProgressBar
	public get mHpBar(): mw.ProgressBar {
		if(!this.mHpBar_Internal&&this.uiWidgetBase) {
			this.mHpBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mHpBar') as mw.ProgressBar
		}
		return this.mHpBar_Internal
	}
	private mHp_Internal: mw.TextBlock
	public get mHp(): mw.TextBlock {
		if(!this.mHp_Internal&&this.uiWidgetBase) {
			this.mHp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mHp') as mw.TextBlock
		}
		return this.mHp_Internal
	}
	private mSlash_Internal: mw.TextBlock
	public get mSlash(): mw.TextBlock {
		if(!this.mSlash_Internal&&this.uiWidgetBase) {
			this.mSlash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mSlash') as mw.TextBlock
		}
		return this.mSlash_Internal
	}
	private mHp_1_Internal: mw.TextBlock
	public get mHp_1(): mw.TextBlock {
		if(!this.mHp_1_Internal&&this.uiWidgetBase) {
			this.mHp_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mHp_1') as mw.TextBlock
		}
		return this.mHp_1_Internal
	}
	private mWave_Internal: mw.TextBlock
	public get mWave(): mw.TextBlock {
		if(!this.mWave_Internal&&this.uiWidgetBase) {
			this.mWave_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_2/mWave') as mw.TextBlock
		}
		return this.mWave_Internal
	}
	private mTimer_Internal: mw.TextBlock
	public get mTimer(): mw.TextBlock {
		if(!this.mTimer_Internal&&this.uiWidgetBase) {
			this.mTimer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_2/mTimer') as mw.TextBlock
		}
		return this.mTimer_Internal
	}
	private mWait_Internal: mw.TextBlock
	public get mWait(): mw.TextBlock {
		if(!this.mWait_Internal&&this.uiWidgetBase) {
			this.mWait_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_2/mWait') as mw.TextBlock
		}
		return this.mWait_Internal
	}
	private mBossContainer_Internal: mw.Canvas
	public get mBossContainer(): mw.Canvas {
		if(!this.mBossContainer_Internal&&this.uiWidgetBase) {
			this.mBossContainer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBossContainer') as mw.Canvas
		}
		return this.mBossContainer_Internal
	}
	private img_BG_Internal: mw.Image
	public get img_BG(): mw.Image {
		if(!this.img_BG_Internal&&this.uiWidgetBase) {
			this.img_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBossContainer/img_BG') as mw.Image
		}
		return this.img_BG_Internal
	}
	private mBossHP_Internal: mw.ProgressBar
	public get mBossHP(): mw.ProgressBar {
		if(!this.mBossHP_Internal&&this.uiWidgetBase) {
			this.mBossHP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBossContainer/mBossHP') as mw.ProgressBar
		}
		return this.mBossHP_Internal
	}
	private mBossInfo_Internal: mw.TextBlock
	public get mBossInfo(): mw.TextBlock {
		if(!this.mBossInfo_Internal&&this.uiWidgetBase) {
			this.mBossInfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBossContainer/mBossInfo') as mw.TextBlock
		}
		return this.mBossInfo_Internal
	}
	private mSlash01_Internal: mw.TextBlock
	public get mSlash01(): mw.TextBlock {
		if(!this.mSlash01_Internal&&this.uiWidgetBase) {
			this.mSlash01_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBossContainer/mSlash01') as mw.TextBlock
		}
		return this.mSlash01_Internal
	}
	private mBossInfo_1_Internal: mw.TextBlock
	public get mBossInfo_1(): mw.TextBlock {
		if(!this.mBossInfo_1_Internal&&this.uiWidgetBase) {
			this.mBossInfo_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBossContainer/mBossInfo_1') as mw.TextBlock
		}
		return this.mBossInfo_1_Internal
	}
	private towerCanvas_Internal: mw.Canvas
	public get towerCanvas(): mw.Canvas {
		if(!this.towerCanvas_Internal&&this.uiWidgetBase) {
			this.towerCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/towerCanvas') as mw.Canvas
		}
		return this.towerCanvas_Internal
	}
	private towerTxt_Internal: mw.TextBlock
	public get towerTxt(): mw.TextBlock {
		if(!this.towerTxt_Internal&&this.uiWidgetBase) {
			this.towerTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/towerCanvas/towerTxt') as mw.TextBlock
		}
		return this.towerTxt_Internal
	}
	private goldCanvas_Internal: mw.Canvas
	public get goldCanvas(): mw.Canvas {
		if(!this.goldCanvas_Internal&&this.uiWidgetBase) {
			this.goldCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/goldCanvas') as mw.Canvas
		}
		return this.goldCanvas_Internal
	}
	private goldImg_Internal: mw.Image
	public get goldImg(): mw.Image {
		if(!this.goldImg_Internal&&this.uiWidgetBase) {
			this.goldImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/goldCanvas/goldImg') as mw.Image
		}
		return this.goldImg_Internal
	}
	private goldTxt_Internal: mw.TextBlock
	public get goldTxt(): mw.TextBlock {
		if(!this.goldTxt_Internal&&this.uiWidgetBase) {
			this.goldTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/goldCanvas/goldTxt') as mw.TextBlock
		}
		return this.goldTxt_Internal
	}
	private mSkipWave_Internal: mw.Canvas
	public get mSkipWave(): mw.Canvas {
		if(!this.mSkipWave_Internal&&this.uiWidgetBase) {
			this.mSkipWave_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkipWave') as mw.Canvas
		}
		return this.mSkipWave_Internal
	}
	private mNotSkipCanvas_Internal: mw.Canvas
	public get mNotSkipCanvas(): mw.Canvas {
		if(!this.mNotSkipCanvas_Internal&&this.uiWidgetBase) {
			this.mNotSkipCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkipWave/mNotSkipCanvas') as mw.Canvas
		}
		return this.mNotSkipCanvas_Internal
	}
	private mNotSkip_Internal: mw.Button
	public get mNotSkip(): mw.Button {
		if(!this.mNotSkip_Internal&&this.uiWidgetBase) {
			this.mNotSkip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkipWave/mNotSkipCanvas/mNotSkip') as mw.Button
		}
		return this.mNotSkip_Internal
	}
	private mSkipCanvas_Internal: mw.Canvas
	public get mSkipCanvas(): mw.Canvas {
		if(!this.mSkipCanvas_Internal&&this.uiWidgetBase) {
			this.mSkipCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkipWave/mSkipCanvas') as mw.Canvas
		}
		return this.mSkipCanvas_Internal
	}
	private mSkip_Internal: mw.Button
	public get mSkip(): mw.Button {
		if(!this.mSkip_Internal&&this.uiWidgetBase) {
			this.mSkip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkipWave/mSkipCanvas/mSkip') as mw.Button
		}
		return this.mSkip_Internal
	}
	private plTextBlock_Internal: mw.TextBlock
	public get plTextBlock(): mw.TextBlock {
		if(!this.plTextBlock_Internal&&this.uiWidgetBase) {
			this.plTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkipWave/plTextBlock') as mw.TextBlock
		}
		return this.plTextBlock_Internal
	}
	private mSkipCount_Internal: mw.TextBlock
	public get mSkipCount(): mw.TextBlock {
		if(!this.mSkipCount_Internal&&this.uiWidgetBase) {
			this.mSkipCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSkipWave/mSkipCount') as mw.TextBlock
		}
		return this.mSkipCount_Internal
	}
	private mSpeedControl_Internal: mw.Canvas
	public get mSpeedControl(): mw.Canvas {
		if(!this.mSpeedControl_Internal&&this.uiWidgetBase) {
			this.mSpeedControl_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSpeedControl') as mw.Canvas
		}
		return this.mSpeedControl_Internal
	}
	private canvas_dec_Internal: mw.Canvas
	public get canvas_dec(): mw.Canvas {
		if(!this.canvas_dec_Internal&&this.uiWidgetBase) {
			this.canvas_dec_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSpeedControl/canvas_dec') as mw.Canvas
		}
		return this.canvas_dec_Internal
	}
	private mPause_Internal: mw.Button
	public get mPause(): mw.Button {
		if(!this.mPause_Internal&&this.uiWidgetBase) {
			this.mPause_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSpeedControl/Canvas_3/mPause') as mw.Button
		}
		return this.mPause_Internal
	}
	private mPlay_Internal: mw.Button
	public get mPlay(): mw.Button {
		if(!this.mPlay_Internal&&this.uiWidgetBase) {
			this.mPlay_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSpeedControl/Canvas_3/mPlay') as mw.Button
		}
		return this.mPlay_Internal
	}
	private mSpeedDown_Internal: mw.Button
	public get mSpeedDown(): mw.Button {
		if(!this.mSpeedDown_Internal&&this.uiWidgetBase) {
			this.mSpeedDown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSpeedControl/Canvas_3/mSpeedDown') as mw.Button
		}
		return this.mSpeedDown_Internal
	}
	private mSpeedDown2_Internal: mw.Button
	public get mSpeedDown2(): mw.Button {
		if(!this.mSpeedDown2_Internal&&this.uiWidgetBase) {
			this.mSpeedDown2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSpeedControl/Canvas_3/mSpeedDown2') as mw.Button
		}
		return this.mSpeedDown2_Internal
	}
	private mSpeedUp2_Internal: mw.Button
	public get mSpeedUp2(): mw.Button {
		if(!this.mSpeedUp2_Internal&&this.uiWidgetBase) {
			this.mSpeedUp2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSpeedControl/Canvas_3/mSpeedUp2') as mw.Button
		}
		return this.mSpeedUp2_Internal
	}
	private mSpeedUp_Internal: mw.Button
	public get mSpeedUp(): mw.Button {
		if(!this.mSpeedUp_Internal&&this.uiWidgetBase) {
			this.mSpeedUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSpeedControl/Canvas_3/mSpeedUp') as mw.Button
		}
		return this.mSpeedUp_Internal
	}
	private bagCanvas_Internal: mw.Canvas
	public get bagCanvas(): mw.Canvas {
		if(!this.bagCanvas_Internal&&this.uiWidgetBase) {
			this.bagCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bagCanvas') as mw.Canvas
		}
		return this.bagCanvas_Internal
	}
	private towerBg_Internal: mw.Image
	public get towerBg(): mw.Image {
		if(!this.towerBg_Internal&&this.uiWidgetBase) {
			this.towerBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bagCanvas/towerBg') as mw.Image
		}
		return this.towerBg_Internal
	}
	private towerItemCanvas_Internal: mw.Canvas
	public get towerItemCanvas(): mw.Canvas {
		if(!this.towerItemCanvas_Internal&&this.uiWidgetBase) {
			this.towerItemCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bagCanvas/towerItemCanvas') as mw.Canvas
		}
		return this.towerItemCanvas_Internal
	}
	private returnCanvas_Internal: mw.Canvas
	public get returnCanvas(): mw.Canvas {
		if(!this.returnCanvas_Internal&&this.uiWidgetBase) {
			this.returnCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/returnCanvas') as mw.Canvas
		}
		return this.returnCanvas_Internal
	}
	private returnBtn_Internal: mw.Button
	public get returnBtn(): mw.Button {
		if(!this.returnBtn_Internal&&this.uiWidgetBase) {
			this.returnBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/returnCanvas/returnBtn') as mw.Button
		}
		return this.returnBtn_Internal
	}
	private txtButtonReturn_Internal: mw.TextBlock
	public get txtButtonReturn(): mw.TextBlock {
		if(!this.txtButtonReturn_Internal&&this.uiWidgetBase) {
			this.txtButtonReturn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/returnCanvas/txtButtonReturn') as mw.TextBlock
		}
		return this.txtButtonReturn_Internal
	}
	private settingCanvas_Internal: mw.Canvas
	public get settingCanvas(): mw.Canvas {
		if(!this.settingCanvas_Internal&&this.uiWidgetBase) {
			this.settingCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas') as mw.Canvas
		}
		return this.settingCanvas_Internal
	}
	private settingBtn_Internal: mw.Button
	public get settingBtn(): mw.Button {
		if(!this.settingBtn_Internal&&this.uiWidgetBase) {
			this.settingBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/settingBtn') as mw.Button
		}
		return this.settingBtn_Internal
	}
	private txtButtonSetting_Internal: mw.TextBlock
	public get txtButtonSetting(): mw.TextBlock {
		if(!this.txtButtonSetting_Internal&&this.uiWidgetBase) {
			this.txtButtonSetting_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/settingCanvas/txtButtonSetting') as mw.TextBlock
		}
		return this.txtButtonSetting_Internal
	}
	private roomidCanvas_Internal: mw.Canvas
	public get roomidCanvas(): mw.Canvas {
		if(!this.roomidCanvas_Internal&&this.uiWidgetBase) {
			this.roomidCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/roomidCanvas') as mw.Canvas
		}
		return this.roomidCanvas_Internal
	}
	private text_roomid_Internal: mw.TextBlock
	public get text_roomid(): mw.TextBlock {
		if(!this.text_roomid_Internal&&this.uiWidgetBase) {
			this.text_roomid_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/roomidCanvas/text_roomid') as mw.TextBlock
		}
		return this.text_roomid_Internal
	}
	private staminaCanvas_Internal: mw.Canvas
	public get staminaCanvas(): mw.Canvas {
		if(!this.staminaCanvas_Internal&&this.uiWidgetBase) {
			this.staminaCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/staminaCanvas') as mw.Canvas
		}
		return this.staminaCanvas_Internal
	}
	private imgStaminaBg_Internal: mw.Image
	public get imgStaminaBg(): mw.Image {
		if(!this.imgStaminaBg_Internal&&this.uiWidgetBase) {
			this.imgStaminaBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/staminaCanvas/imgStaminaBg') as mw.Image
		}
		return this.imgStaminaBg_Internal
	}
	private mStamina_Internal: mw.TextBlock
	public get mStamina(): mw.TextBlock {
		if(!this.mStamina_Internal&&this.uiWidgetBase) {
			this.mStamina_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/staminaCanvas/mStamina') as mw.TextBlock
		}
		return this.mStamina_Internal
	}
	private mSlashStamina_Internal: mw.TextBlock
	public get mSlashStamina(): mw.TextBlock {
		if(!this.mSlashStamina_Internal&&this.uiWidgetBase) {
			this.mSlashStamina_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/staminaCanvas/mSlashStamina') as mw.TextBlock
		}
		return this.mSlashStamina_Internal
	}
	private mStamina_2_Internal: mw.TextBlock
	public get mStamina_2(): mw.TextBlock {
		if(!this.mStamina_2_Internal&&this.uiWidgetBase) {
			this.mStamina_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/staminaCanvas/mStamina_2') as mw.TextBlock
		}
		return this.mStamina_2_Internal
	}
	private freshBtn_Internal: mw.Button
	public get freshBtn(): mw.Button {
		if(!this.freshBtn_Internal&&this.uiWidgetBase) {
			this.freshBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/staminaCanvas/freshBtn') as mw.Button
		}
		return this.freshBtn_Internal
	}
	private addBtn_Internal: mw.Button
	public get addBtn(): mw.Button {
		if(!this.addBtn_Internal&&this.uiWidgetBase) {
			this.addBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/staminaCanvas/addBtn') as mw.Button
		}
		return this.addBtn_Internal
	}
	private imgStamina_Internal: mw.Image
	public get imgStamina(): mw.Image {
		if(!this.imgStamina_Internal&&this.uiWidgetBase) {
			this.imgStamina_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/staminaCanvas/imgStamina') as mw.Image
		}
		return this.imgStamina_Internal
	}
	private monsterInfoUnfoldBtn_Internal: mw.Button
	public get monsterInfoUnfoldBtn(): mw.Button {
		if(!this.monsterInfoUnfoldBtn_Internal&&this.uiWidgetBase) {
			this.monsterInfoUnfoldBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/monsterInfoUnfoldBtn') as mw.Button
		}
		return this.monsterInfoUnfoldBtn_Internal
	}
	private monsterInfofoldBtn_Internal: mw.Button
	public get monsterInfofoldBtn(): mw.Button {
		if(!this.monsterInfofoldBtn_Internal&&this.uiWidgetBase) {
			this.monsterInfofoldBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/monsterInfofoldBtn') as mw.Button
		}
		return this.monsterInfofoldBtn_Internal
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
	   
	   this.mNotSkip.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mNotSkip");
	   })
	   this.mNotSkip.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mSkip.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mSkip");
	   })
	   this.mSkip.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mPause.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mPause");
	   })
	   this.mPause.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mPlay.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mPlay");
	   })
	   this.mPlay.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mSpeedDown.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mSpeedDown");
	   })
	   this.mSpeedDown.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mSpeedDown2.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mSpeedDown2");
	   })
	   this.mSpeedDown2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mSpeedUp2.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mSpeedUp2");
	   })
	   this.mSpeedUp2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mSpeedUp.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mSpeedUp");
	   })
	   this.mSpeedUp.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.returnBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "returnBtn");
	   })
	   this.returnBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.settingBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "settingBtn");
	   })
	   this.settingBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.freshBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "freshBtn");
	   })
	   this.freshBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.addBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "addBtn");
	   })
	   this.addBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.monsterInfoUnfoldBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "monsterInfoUnfoldBtn");
	   })
	   this.monsterInfoUnfoldBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.monsterInfofoldBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "monsterInfofoldBtn");
	   })
	   this.monsterInfofoldBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.textCurrent)
	   
	
	   this.initLanguage(this.textCurrentSkill)
	   
	
	   this.initLanguage(this.textCurrentElement)
	   
	
	   this.initLanguage(this.textCurrent_1)
	   
	
	   this.initLanguage(this.textCurrentElement_1)
	   
	
	   this.initLanguage(this.textComingSkill)
	   
	
	   this.initLanguage(this.mHp)
	   
	
	   this.initLanguage(this.mSlash)
	   
	
	   this.initLanguage(this.mHp_1)
	   
	
	   this.initLanguage(this.mWave)
	   
	
	   this.initLanguage(this.mTimer)
	   
	
	   this.initLanguage(this.mWait)
	   
	
	   this.initLanguage(this.mBossInfo)
	   
	
	   this.initLanguage(this.mSlash01)
	   
	
	   this.initLanguage(this.mBossInfo_1)
	   
	
	   this.initLanguage(this.towerTxt)
	   
	
	   this.initLanguage(this.goldTxt)
	   
	
	   this.initLanguage(this.plTextBlock)
	   
	
	   this.initLanguage(this.mSkipCount)
	   
	
	   this.initLanguage(this.txtButtonReturn)
	   
	
	   this.initLanguage(this.txtButtonSetting)
	   
	
	   this.initLanguage(this.text_roomid)
	   
	
	   this.initLanguage(this.mStamina)
	   
	
	   this.initLanguage(this.mSlashStamina)
	   
	
	   this.initLanguage(this.mStamina_2)
	   
	
	   //文本多语言
	   
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSpeedControl/Canvas_3/mSpeedDown/TxtSpeedDown") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSpeedControl/Canvas_3/mSpeedDown2/TxtSpeedDown2") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSpeedControl/Canvas_3/mSpeedUp2/TxtSpeedUp2") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSpeedControl/Canvas_3/mSpeedUp/TxtSpeedUp") as any);
	   
	

   }
   private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
	   let call = UIScript.getBehavior("lan");
	   if (call && ui) {
		   call(ui);
	   }
   }
   protected onShow(...params: any[]): void {};

   public show(...param): void {
	   UIService.showUI(this, this.layer, ...param);
   }

   public hide(): void {
	   UIService.hideUI(this);
   }
}
