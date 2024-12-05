
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Level/StageSelect.ui')
export default class StageSelect_Generate extends UIScript {
		private can_old_Internal: mw.Canvas
	public get can_old(): mw.Canvas {
		if(!this.can_old_Internal&&this.uiWidgetBase) {
			this.can_old_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_old') as mw.Canvas
		}
		return this.can_old_Internal
	}
	private img_backg_Internal: mw.Image
	public get img_backg(): mw.Image {
		if(!this.img_backg_Internal&&this.uiWidgetBase) {
			this.img_backg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_old/img_backg') as mw.Image
		}
		return this.img_backg_Internal
	}
	private mMapImage_Internal: mw.Image
	public get mMapImage(): mw.Image {
		if(!this.mMapImage_Internal&&this.uiWidgetBase) {
			this.mMapImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_old/mMapImage') as mw.Image
		}
		return this.mMapImage_Internal
	}
	private mBGImage_Internal: mw.Image
	public get mBGImage(): mw.Image {
		if(!this.mBGImage_Internal&&this.uiWidgetBase) {
			this.mBGImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_old/mBGImage') as mw.Image
		}
		return this.mBGImage_Internal
	}
	private img_lilbg2_Internal: mw.Image
	public get img_lilbg2(): mw.Image {
		if(!this.img_lilbg2_Internal&&this.uiWidgetBase) {
			this.img_lilbg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_old/img_lilbg2') as mw.Image
		}
		return this.img_lilbg2_Internal
	}
	private txt_title_Internal: mw.TextBlock
	public get txt_title(): mw.TextBlock {
		if(!this.txt_title_Internal&&this.uiWidgetBase) {
			this.txt_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_old/txt_title') as mw.TextBlock
		}
		return this.txt_title_Internal
	}
	private mMonsters_Internal: mw.TextBlock
	public get mMonsters(): mw.TextBlock {
		if(!this.mMonsters_Internal&&this.uiWidgetBase) {
			this.mMonsters_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_old/mMonsters') as mw.TextBlock
		}
		return this.mMonsters_Internal
	}
	private img_lilbg3_Internal: mw.Image
	public get img_lilbg3(): mw.Image {
		if(!this.img_lilbg3_Internal&&this.uiWidgetBase) {
			this.img_lilbg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_old/PlayerQueue/img_lilbg3') as mw.Image
		}
		return this.img_lilbg3_Internal
	}
	private vgTextBlock_3_Internal: mw.TextBlock
	public get vgTextBlock_3(): mw.TextBlock {
		if(!this.vgTextBlock_3_Internal&&this.uiWidgetBase) {
			this.vgTextBlock_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_old/PlayerQueue/vgTextBlock_3') as mw.TextBlock
		}
		return this.vgTextBlock_3_Internal
	}
	private mCountDown_Internal: mw.TextBlock
	public get mCountDown(): mw.TextBlock {
		if(!this.mCountDown_Internal&&this.uiWidgetBase) {
			this.mCountDown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_old/PlayerQueue/mCountDown') as mw.TextBlock
		}
		return this.mCountDown_Internal
	}
	private mPlayerQueue_Internal: mw.Canvas
	public get mPlayerQueue(): mw.Canvas {
		if(!this.mPlayerQueue_Internal&&this.uiWidgetBase) {
			this.mPlayerQueue_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_old/PlayerQueue/mPlayerQueue') as mw.Canvas
		}
		return this.mPlayerQueue_Internal
	}
	private mContainer_Internal: mw.Canvas
	public get mContainer(): mw.Canvas {
		if(!this.mContainer_Internal&&this.uiWidgetBase) {
			this.mContainer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer') as mw.Canvas
		}
		return this.mContainer_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private imgImperfect_Internal: mw.Image
	public get imgImperfect(): mw.Image {
		if(!this.imgImperfect_Internal&&this.uiWidgetBase) {
			this.imgImperfect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/imgImperfect') as mw.Image
		}
		return this.imgImperfect_Internal
	}
	private imgPerfect_Internal: mw.Image
	public get imgPerfect(): mw.Image {
		if(!this.imgPerfect_Internal&&this.uiWidgetBase) {
			this.imgPerfect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/imgPerfect') as mw.Image
		}
		return this.imgPerfect_Internal
	}
	private can_inner_Internal: mw.Canvas
	public get can_inner(): mw.Canvas {
		if(!this.can_inner_Internal&&this.uiWidgetBase) {
			this.can_inner_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner') as mw.Canvas
		}
		return this.can_inner_Internal
	}
	private mStageName_Internal: mw.TextBlock
	public get mStageName(): mw.TextBlock {
		if(!this.mStageName_Internal&&this.uiWidgetBase) {
			this.mStageName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/mStageName') as mw.TextBlock
		}
		return this.mStageName_Internal
	}
	private can_eleTitle_Internal: mw.Canvas
	public get can_eleTitle(): mw.Canvas {
		if(!this.can_eleTitle_Internal&&this.uiWidgetBase) {
			this.can_eleTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/Canvas_Element/can_eleTitle') as mw.Canvas
		}
		return this.can_eleTitle_Internal
	}
	private textElement_Internal: mw.TextBlock
	public get textElement(): mw.TextBlock {
		if(!this.textElement_Internal&&this.uiWidgetBase) {
			this.textElement_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/Canvas_Element/can_eleTitle/textElement') as mw.TextBlock
		}
		return this.textElement_Internal
	}
	private counterInfoBtn_Internal: mw.Button
	public get counterInfoBtn(): mw.Button {
		if(!this.counterInfoBtn_Internal&&this.uiWidgetBase) {
			this.counterInfoBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/Canvas_Element/can_eleTitle/counterInfoBtn') as mw.Button
		}
		return this.counterInfoBtn_Internal
	}
	private mCanvas_recoElements_Internal: mw.Canvas
	public get mCanvas_recoElements(): mw.Canvas {
		if(!this.mCanvas_recoElements_Internal&&this.uiWidgetBase) {
			this.mCanvas_recoElements_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/Canvas_Element/mCanvas_recoElements') as mw.Canvas
		}
		return this.mCanvas_recoElements_Internal
	}
	private elementImg1_Internal: mw.Image
	public get elementImg1(): mw.Image {
		if(!this.elementImg1_Internal&&this.uiWidgetBase) {
			this.elementImg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/Canvas_Element/mCanvas_recoElements/elementImg1') as mw.Image
		}
		return this.elementImg1_Internal
	}
	private elementImg2_Internal: mw.Image
	public get elementImg2(): mw.Image {
		if(!this.elementImg2_Internal&&this.uiWidgetBase) {
			this.elementImg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/Canvas_Element/mCanvas_recoElements/elementImg2') as mw.Image
		}
		return this.elementImg2_Internal
	}
	private elementImg3_Internal: mw.Image
	public get elementImg3(): mw.Image {
		if(!this.elementImg3_Internal&&this.uiWidgetBase) {
			this.elementImg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/Canvas_Element/mCanvas_recoElements/elementImg3') as mw.Image
		}
		return this.elementImg3_Internal
	}
	private elementImg4_Internal: mw.Image
	public get elementImg4(): mw.Image {
		if(!this.elementImg4_Internal&&this.uiWidgetBase) {
			this.elementImg4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/Canvas_Element/mCanvas_recoElements/elementImg4') as mw.Image
		}
		return this.elementImg4_Internal
	}
	private can_Monster_Internal: mw.Canvas
	public get can_Monster(): mw.Canvas {
		if(!this.can_Monster_Internal&&this.uiWidgetBase) {
			this.can_Monster_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster') as mw.Canvas
		}
		return this.can_Monster_Internal
	}
	private textMonster_Internal: mw.TextBlock
	public get textMonster(): mw.TextBlock {
		if(!this.textMonster_Internal&&this.uiWidgetBase) {
			this.textMonster_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/textMonster') as mw.TextBlock
		}
		return this.textMonster_Internal
	}
	private imgMonsterSkillBg_Internal: mw.Image
	public get imgMonsterSkillBg(): mw.Image {
		if(!this.imgMonsterSkillBg_Internal&&this.uiWidgetBase) {
			this.imgMonsterSkillBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/imgMonsterSkillBg') as mw.Image
		}
		return this.imgMonsterSkillBg_Internal
	}
	private canvas_MonsterSkillDesc_1_Internal: mw.Canvas
	public get canvas_MonsterSkillDesc_1(): mw.Canvas {
		if(!this.canvas_MonsterSkillDesc_1_Internal&&this.uiWidgetBase) {
			this.canvas_MonsterSkillDesc_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_1') as mw.Canvas
		}
		return this.canvas_MonsterSkillDesc_1_Internal
	}
	private btn_monsterSkill_1_Internal: mw.Button
	public get btn_monsterSkill_1(): mw.Button {
		if(!this.btn_monsterSkill_1_Internal&&this.uiWidgetBase) {
			this.btn_monsterSkill_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_1/btn_monsterSkill_1') as mw.Button
		}
		return this.btn_monsterSkill_1_Internal
	}
	private monsterSkillBg1_Internal: mw.Image
	public get monsterSkillBg1(): mw.Image {
		if(!this.monsterSkillBg1_Internal&&this.uiWidgetBase) {
			this.monsterSkillBg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_1/monsterSkillBg1') as mw.Image
		}
		return this.monsterSkillBg1_Internal
	}
	private monsterSkillDesc1_Internal: mw.Image
	public get monsterSkillDesc1(): mw.Image {
		if(!this.monsterSkillDesc1_Internal&&this.uiWidgetBase) {
			this.monsterSkillDesc1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_1/monsterSkillDesc1') as mw.Image
		}
		return this.monsterSkillDesc1_Internal
	}
	private textMonsterSkill1_Internal: mw.TextBlock
	public get textMonsterSkill1(): mw.TextBlock {
		if(!this.textMonsterSkill1_Internal&&this.uiWidgetBase) {
			this.textMonsterSkill1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_1/textMonsterSkill1') as mw.TextBlock
		}
		return this.textMonsterSkill1_Internal
	}
	private textMonsterSkillDesc1_Internal: mw.TextBlock
	public get textMonsterSkillDesc1(): mw.TextBlock {
		if(!this.textMonsterSkillDesc1_Internal&&this.uiWidgetBase) {
			this.textMonsterSkillDesc1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_1/textMonsterSkillDesc1') as mw.TextBlock
		}
		return this.textMonsterSkillDesc1_Internal
	}
	private canvas_MonsterSkillDesc_2_Internal: mw.Canvas
	public get canvas_MonsterSkillDesc_2(): mw.Canvas {
		if(!this.canvas_MonsterSkillDesc_2_Internal&&this.uiWidgetBase) {
			this.canvas_MonsterSkillDesc_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_2') as mw.Canvas
		}
		return this.canvas_MonsterSkillDesc_2_Internal
	}
	private btn_monsterSkill_2_Internal: mw.Button
	public get btn_monsterSkill_2(): mw.Button {
		if(!this.btn_monsterSkill_2_Internal&&this.uiWidgetBase) {
			this.btn_monsterSkill_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_2/btn_monsterSkill_2') as mw.Button
		}
		return this.btn_monsterSkill_2_Internal
	}
	private monsterSkillBg2_Internal: mw.Image
	public get monsterSkillBg2(): mw.Image {
		if(!this.monsterSkillBg2_Internal&&this.uiWidgetBase) {
			this.monsterSkillBg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_2/monsterSkillBg2') as mw.Image
		}
		return this.monsterSkillBg2_Internal
	}
	private monsterSkillDesc2_Internal: mw.Image
	public get monsterSkillDesc2(): mw.Image {
		if(!this.monsterSkillDesc2_Internal&&this.uiWidgetBase) {
			this.monsterSkillDesc2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_2/monsterSkillDesc2') as mw.Image
		}
		return this.monsterSkillDesc2_Internal
	}
	private textMonsterSkill2_Internal: mw.TextBlock
	public get textMonsterSkill2(): mw.TextBlock {
		if(!this.textMonsterSkill2_Internal&&this.uiWidgetBase) {
			this.textMonsterSkill2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_2/textMonsterSkill2') as mw.TextBlock
		}
		return this.textMonsterSkill2_Internal
	}
	private textMonsterSkillDesc2_Internal: mw.TextBlock
	public get textMonsterSkillDesc2(): mw.TextBlock {
		if(!this.textMonsterSkillDesc2_Internal&&this.uiWidgetBase) {
			this.textMonsterSkillDesc2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_2/textMonsterSkillDesc2') as mw.TextBlock
		}
		return this.textMonsterSkillDesc2_Internal
	}
	private canvas_MonsterSkillDesc_3_Internal: mw.Canvas
	public get canvas_MonsterSkillDesc_3(): mw.Canvas {
		if(!this.canvas_MonsterSkillDesc_3_Internal&&this.uiWidgetBase) {
			this.canvas_MonsterSkillDesc_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_3') as mw.Canvas
		}
		return this.canvas_MonsterSkillDesc_3_Internal
	}
	private btn_monsterSkill_3_Internal: mw.Button
	public get btn_monsterSkill_3(): mw.Button {
		if(!this.btn_monsterSkill_3_Internal&&this.uiWidgetBase) {
			this.btn_monsterSkill_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_3/btn_monsterSkill_3') as mw.Button
		}
		return this.btn_monsterSkill_3_Internal
	}
	private monsterSkillBg3_Internal: mw.Image
	public get monsterSkillBg3(): mw.Image {
		if(!this.monsterSkillBg3_Internal&&this.uiWidgetBase) {
			this.monsterSkillBg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_3/monsterSkillBg3') as mw.Image
		}
		return this.monsterSkillBg3_Internal
	}
	private monsterSkillDesc3_Internal: mw.Image
	public get monsterSkillDesc3(): mw.Image {
		if(!this.monsterSkillDesc3_Internal&&this.uiWidgetBase) {
			this.monsterSkillDesc3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_3/monsterSkillDesc3') as mw.Image
		}
		return this.monsterSkillDesc3_Internal
	}
	private textMonsterSkill3_Internal: mw.TextBlock
	public get textMonsterSkill3(): mw.TextBlock {
		if(!this.textMonsterSkill3_Internal&&this.uiWidgetBase) {
			this.textMonsterSkill3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_3/textMonsterSkill3') as mw.TextBlock
		}
		return this.textMonsterSkill3_Internal
	}
	private textMonsterSkillDesc3_Internal: mw.TextBlock
	public get textMonsterSkillDesc3(): mw.TextBlock {
		if(!this.textMonsterSkillDesc3_Internal&&this.uiWidgetBase) {
			this.textMonsterSkillDesc3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_3/textMonsterSkillDesc3') as mw.TextBlock
		}
		return this.textMonsterSkillDesc3_Internal
	}
	private canvas_MonsterSkillDesc_4_Internal: mw.Canvas
	public get canvas_MonsterSkillDesc_4(): mw.Canvas {
		if(!this.canvas_MonsterSkillDesc_4_Internal&&this.uiWidgetBase) {
			this.canvas_MonsterSkillDesc_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_4') as mw.Canvas
		}
		return this.canvas_MonsterSkillDesc_4_Internal
	}
	private btn_monsterSkill_4_Internal: mw.Button
	public get btn_monsterSkill_4(): mw.Button {
		if(!this.btn_monsterSkill_4_Internal&&this.uiWidgetBase) {
			this.btn_monsterSkill_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_4/btn_monsterSkill_4') as mw.Button
		}
		return this.btn_monsterSkill_4_Internal
	}
	private monsterSkillBg4_Internal: mw.Image
	public get monsterSkillBg4(): mw.Image {
		if(!this.monsterSkillBg4_Internal&&this.uiWidgetBase) {
			this.monsterSkillBg4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_4/monsterSkillBg4') as mw.Image
		}
		return this.monsterSkillBg4_Internal
	}
	private monsterSkillDesc4_Internal: mw.Image
	public get monsterSkillDesc4(): mw.Image {
		if(!this.monsterSkillDesc4_Internal&&this.uiWidgetBase) {
			this.monsterSkillDesc4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_4/monsterSkillDesc4') as mw.Image
		}
		return this.monsterSkillDesc4_Internal
	}
	private textMonsterSkill4_Internal: mw.TextBlock
	public get textMonsterSkill4(): mw.TextBlock {
		if(!this.textMonsterSkill4_Internal&&this.uiWidgetBase) {
			this.textMonsterSkill4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_4/textMonsterSkill4') as mw.TextBlock
		}
		return this.textMonsterSkill4_Internal
	}
	private textMonsterSkillDesc4_Internal: mw.TextBlock
	public get textMonsterSkillDesc4(): mw.TextBlock {
		if(!this.textMonsterSkillDesc4_Internal&&this.uiWidgetBase) {
			this.textMonsterSkillDesc4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_4/textMonsterSkillDesc4') as mw.TextBlock
		}
		return this.textMonsterSkillDesc4_Internal
	}
	private canvas_MonsterSkillDesc_5_Internal: mw.Canvas
	public get canvas_MonsterSkillDesc_5(): mw.Canvas {
		if(!this.canvas_MonsterSkillDesc_5_Internal&&this.uiWidgetBase) {
			this.canvas_MonsterSkillDesc_5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_5') as mw.Canvas
		}
		return this.canvas_MonsterSkillDesc_5_Internal
	}
	private btn_monsterSkill_5_Internal: mw.Button
	public get btn_monsterSkill_5(): mw.Button {
		if(!this.btn_monsterSkill_5_Internal&&this.uiWidgetBase) {
			this.btn_monsterSkill_5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_5/btn_monsterSkill_5') as mw.Button
		}
		return this.btn_monsterSkill_5_Internal
	}
	private monsterSkillDesc5_Internal: mw.Image
	public get monsterSkillDesc5(): mw.Image {
		if(!this.monsterSkillDesc5_Internal&&this.uiWidgetBase) {
			this.monsterSkillDesc5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_5/monsterSkillDesc5') as mw.Image
		}
		return this.monsterSkillDesc5_Internal
	}
	private textMonsterSkill5_Internal: mw.TextBlock
	public get textMonsterSkill5(): mw.TextBlock {
		if(!this.textMonsterSkill5_Internal&&this.uiWidgetBase) {
			this.textMonsterSkill5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_5/textMonsterSkill5') as mw.TextBlock
		}
		return this.textMonsterSkill5_Internal
	}
	private textMonsterSkillDesc5_Internal: mw.TextBlock
	public get textMonsterSkillDesc5(): mw.TextBlock {
		if(!this.textMonsterSkillDesc5_Internal&&this.uiWidgetBase) {
			this.textMonsterSkillDesc5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_Monster/canvas_MonsterSkillDesc_5/textMonsterSkillDesc5') as mw.TextBlock
		}
		return this.textMonsterSkillDesc5_Internal
	}
	private canvas_Reward_Internal: mw.Canvas
	public get canvas_Reward(): mw.Canvas {
		if(!this.canvas_Reward_Internal&&this.uiWidgetBase) {
			this.canvas_Reward_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward') as mw.Canvas
		}
		return this.canvas_Reward_Internal
	}
	private imgRewardBg1_Internal: mw.Image
	public get imgRewardBg1(): mw.Image {
		if(!this.imgRewardBg1_Internal&&this.uiWidgetBase) {
			this.imgRewardBg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/imgRewardBg1') as mw.Image
		}
		return this.imgRewardBg1_Internal
	}
	private imgRewardBg1_1_Internal: mw.Image
	public get imgRewardBg1_1(): mw.Image {
		if(!this.imgRewardBg1_1_Internal&&this.uiWidgetBase) {
			this.imgRewardBg1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/imgRewardBg1_1') as mw.Image
		}
		return this.imgRewardBg1_1_Internal
	}
	private textNormalReward_Internal: mw.TextBlock
	public get textNormalReward(): mw.TextBlock {
		if(!this.textNormalReward_Internal&&this.uiWidgetBase) {
			this.textNormalReward_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/textNormalReward') as mw.TextBlock
		}
		return this.textNormalReward_Internal
	}
	private texPerfectReward_Internal: mw.TextBlock
	public get texPerfectReward(): mw.TextBlock {
		if(!this.texPerfectReward_Internal&&this.uiWidgetBase) {
			this.texPerfectReward_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/texPerfectReward') as mw.TextBlock
		}
		return this.texPerfectReward_Internal
	}
	private can_completeRewardList_Internal: mw.Canvas
	public get can_completeRewardList(): mw.Canvas {
		if(!this.can_completeRewardList_Internal&&this.uiWidgetBase) {
			this.can_completeRewardList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_completeRewardList') as mw.Canvas
		}
		return this.can_completeRewardList_Internal
	}
	private can_rewardGoldComplete_Internal: mw.Canvas
	public get can_rewardGoldComplete(): mw.Canvas {
		if(!this.can_rewardGoldComplete_Internal&&this.uiWidgetBase) {
			this.can_rewardGoldComplete_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_completeRewardList/can_rewardGoldComplete') as mw.Canvas
		}
		return this.can_rewardGoldComplete_Internal
	}
	private imgGold1_1_Internal: mw.Image
	public get imgGold1_1(): mw.Image {
		if(!this.imgGold1_1_Internal&&this.uiWidgetBase) {
			this.imgGold1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_completeRewardList/can_rewardGoldComplete/imgGold1_1') as mw.Image
		}
		return this.imgGold1_1_Internal
	}
	private text_rewardGoldComplete_Internal: mw.TextBlock
	public get text_rewardGoldComplete(): mw.TextBlock {
		if(!this.text_rewardGoldComplete_Internal&&this.uiWidgetBase) {
			this.text_rewardGoldComplete_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_completeRewardList/can_rewardGoldComplete/text_rewardGoldComplete') as mw.TextBlock
		}
		return this.text_rewardGoldComplete_Internal
	}
	private can_rewardTechComplete_Internal: mw.Canvas
	public get can_rewardTechComplete(): mw.Canvas {
		if(!this.can_rewardTechComplete_Internal&&this.uiWidgetBase) {
			this.can_rewardTechComplete_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_completeRewardList/can_rewardTechComplete') as mw.Canvas
		}
		return this.can_rewardTechComplete_Internal
	}
	private imgTalent1_Internal: mw.Image
	public get imgTalent1(): mw.Image {
		if(!this.imgTalent1_Internal&&this.uiWidgetBase) {
			this.imgTalent1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_completeRewardList/can_rewardTechComplete/imgTalent1') as mw.Image
		}
		return this.imgTalent1_Internal
	}
	private text_rewardTechComplete_Internal: mw.TextBlock
	public get text_rewardTechComplete(): mw.TextBlock {
		if(!this.text_rewardTechComplete_Internal&&this.uiWidgetBase) {
			this.text_rewardTechComplete_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_completeRewardList/can_rewardTechComplete/text_rewardTechComplete') as mw.TextBlock
		}
		return this.text_rewardTechComplete_Internal
	}
	private can_rewardExpComplete_Internal: mw.Canvas
	public get can_rewardExpComplete(): mw.Canvas {
		if(!this.can_rewardExpComplete_Internal&&this.uiWidgetBase) {
			this.can_rewardExpComplete_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_completeRewardList/can_rewardExpComplete') as mw.Canvas
		}
		return this.can_rewardExpComplete_Internal
	}
	private imgExp1_Internal: mw.Image
	public get imgExp1(): mw.Image {
		if(!this.imgExp1_Internal&&this.uiWidgetBase) {
			this.imgExp1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_completeRewardList/can_rewardExpComplete/imgExp1') as mw.Image
		}
		return this.imgExp1_Internal
	}
	private text_rewardExpComplete_Internal: mw.TextBlock
	public get text_rewardExpComplete(): mw.TextBlock {
		if(!this.text_rewardExpComplete_Internal&&this.uiWidgetBase) {
			this.text_rewardExpComplete_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_completeRewardList/can_rewardExpComplete/text_rewardExpComplete') as mw.TextBlock
		}
		return this.text_rewardExpComplete_Internal
	}
	private can_perfectRewardList_Internal: mw.Canvas
	public get can_perfectRewardList(): mw.Canvas {
		if(!this.can_perfectRewardList_Internal&&this.uiWidgetBase) {
			this.can_perfectRewardList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_perfectRewardList') as mw.Canvas
		}
		return this.can_perfectRewardList_Internal
	}
	private can_rewardGoldPerfect_Internal: mw.Canvas
	public get can_rewardGoldPerfect(): mw.Canvas {
		if(!this.can_rewardGoldPerfect_Internal&&this.uiWidgetBase) {
			this.can_rewardGoldPerfect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_perfectRewardList/can_rewardGoldPerfect') as mw.Canvas
		}
		return this.can_rewardGoldPerfect_Internal
	}
	private imgGold1_2_Internal: mw.Image
	public get imgGold1_2(): mw.Image {
		if(!this.imgGold1_2_Internal&&this.uiWidgetBase) {
			this.imgGold1_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_perfectRewardList/can_rewardGoldPerfect/imgGold1_2') as mw.Image
		}
		return this.imgGold1_2_Internal
	}
	private text_rewardGoldPerfect_Internal: mw.TextBlock
	public get text_rewardGoldPerfect(): mw.TextBlock {
		if(!this.text_rewardGoldPerfect_Internal&&this.uiWidgetBase) {
			this.text_rewardGoldPerfect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_perfectRewardList/can_rewardGoldPerfect/text_rewardGoldPerfect') as mw.TextBlock
		}
		return this.text_rewardGoldPerfect_Internal
	}
	private can_rewardTechPerfect_Internal: mw.Canvas
	public get can_rewardTechPerfect(): mw.Canvas {
		if(!this.can_rewardTechPerfect_Internal&&this.uiWidgetBase) {
			this.can_rewardTechPerfect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_perfectRewardList/can_rewardTechPerfect') as mw.Canvas
		}
		return this.can_rewardTechPerfect_Internal
	}
	private imgTalent2_Internal: mw.Image
	public get imgTalent2(): mw.Image {
		if(!this.imgTalent2_Internal&&this.uiWidgetBase) {
			this.imgTalent2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_perfectRewardList/can_rewardTechPerfect/imgTalent2') as mw.Image
		}
		return this.imgTalent2_Internal
	}
	private text_rewardTechPerfect_Internal: mw.TextBlock
	public get text_rewardTechPerfect(): mw.TextBlock {
		if(!this.text_rewardTechPerfect_Internal&&this.uiWidgetBase) {
			this.text_rewardTechPerfect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_perfectRewardList/can_rewardTechPerfect/text_rewardTechPerfect') as mw.TextBlock
		}
		return this.text_rewardTechPerfect_Internal
	}
	private can_rewardExpPerfect_Internal: mw.Canvas
	public get can_rewardExpPerfect(): mw.Canvas {
		if(!this.can_rewardExpPerfect_Internal&&this.uiWidgetBase) {
			this.can_rewardExpPerfect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_perfectRewardList/can_rewardExpPerfect') as mw.Canvas
		}
		return this.can_rewardExpPerfect_Internal
	}
	private imgExp2_Internal: mw.Image
	public get imgExp2(): mw.Image {
		if(!this.imgExp2_Internal&&this.uiWidgetBase) {
			this.imgExp2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_perfectRewardList/can_rewardExpPerfect/imgExp2') as mw.Image
		}
		return this.imgExp2_Internal
	}
	private text_rewardExpPerfect_Internal: mw.TextBlock
	public get text_rewardExpPerfect(): mw.TextBlock {
		if(!this.text_rewardExpPerfect_Internal&&this.uiWidgetBase) {
			this.text_rewardExpPerfect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_perfectRewardList/can_rewardExpPerfect/text_rewardExpPerfect') as mw.TextBlock
		}
		return this.text_rewardExpPerfect_Internal
	}
	private can_firstPerfectRewardList_Internal: mw.Canvas
	public get can_firstPerfectRewardList(): mw.Canvas {
		if(!this.can_firstPerfectRewardList_Internal&&this.uiWidgetBase) {
			this.can_firstPerfectRewardList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_firstPerfectRewardList') as mw.Canvas
		}
		return this.can_firstPerfectRewardList_Internal
	}
	private textTowerReward_Internal: mw.TextBlock
	public get textTowerReward(): mw.TextBlock {
		if(!this.textTowerReward_Internal&&this.uiWidgetBase) {
			this.textTowerReward_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_firstPerfectRewardList/textTowerReward') as mw.TextBlock
		}
		return this.textTowerReward_Internal
	}
	private imgModragon_Internal: mw.Image
	public get imgModragon(): mw.Image {
		if(!this.imgModragon_Internal&&this.uiWidgetBase) {
			this.imgModragon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_firstPerfectRewardList/imgModragon') as mw.Image
		}
		return this.imgModragon_Internal
	}
	private textModragon_Internal: mw.TextBlock
	public get textModragon(): mw.TextBlock {
		if(!this.textModragon_Internal&&this.uiWidgetBase) {
			this.textModragon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/canvas_Reward/can_firstPerfectRewardList/textModragon') as mw.TextBlock
		}
		return this.textModragon_Internal
	}
	private mSelectDifficulty_Internal: mw.Canvas
	public get mSelectDifficulty(): mw.Canvas {
		if(!this.mSelectDifficulty_Internal&&this.uiWidgetBase) {
			this.mSelectDifficulty_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/mSelectDifficulty') as mw.Canvas
		}
		return this.mSelectDifficulty_Internal
	}
	private speedSweep_btnGroup_Internal: mw.Canvas
	public get speedSweep_btnGroup(): mw.Canvas {
		if(!this.speedSweep_btnGroup_Internal&&this.uiWidgetBase) {
			this.speedSweep_btnGroup_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/speedSweep_btnGroup') as mw.Canvas
		}
		return this.speedSweep_btnGroup_Internal
	}
	private sweepText_Internal: mw.TextBlock
	public get sweepText(): mw.TextBlock {
		if(!this.sweepText_Internal&&this.uiWidgetBase) {
			this.sweepText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/speedSweep_btnGroup/sweepText') as mw.TextBlock
		}
		return this.sweepText_Internal
	}
	private refreshBtn_Internal: mw.Button
	public get refreshBtn(): mw.Button {
		if(!this.refreshBtn_Internal&&this.uiWidgetBase) {
			this.refreshBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/speedSweep_btnGroup/refreshBtn') as mw.Button
		}
		return this.refreshBtn_Internal
	}
	private iconSweep_Internal: mw.Image
	public get iconSweep(): mw.Image {
		if(!this.iconSweep_Internal&&this.uiWidgetBase) {
			this.iconSweep_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/speedSweep_btnGroup/iconSweep') as mw.Image
		}
		return this.iconSweep_Internal
	}
	private imageInterval_Internal: mw.Image
	public get imageInterval(): mw.Image {
		if(!this.imageInterval_Internal&&this.uiWidgetBase) {
			this.imageInterval_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/speedSweep_btnGroup/imageInterval') as mw.Image
		}
		return this.imageInterval_Internal
	}
	private iconRefreshBtn_Internal: mw.Image
	public get iconRefreshBtn(): mw.Image {
		if(!this.iconRefreshBtn_Internal&&this.uiWidgetBase) {
			this.iconRefreshBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/speedSweep_btnGroup/iconRefreshBtn') as mw.Image
		}
		return this.iconRefreshBtn_Internal
	}
	private sweepBalance_Internal: mw.TextBlock
	public get sweepBalance(): mw.TextBlock {
		if(!this.sweepBalance_Internal&&this.uiWidgetBase) {
			this.sweepBalance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/speedSweep_btnGroup/sweepBalance') as mw.TextBlock
		}
		return this.sweepBalance_Internal
	}
	private canvasNumber_Internal: mw.Canvas
	public get canvasNumber(): mw.Canvas {
		if(!this.canvasNumber_Internal&&this.uiWidgetBase) {
			this.canvasNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/speedSweep_btnGroup/canvasNumber') as mw.Canvas
		}
		return this.canvasNumber_Internal
	}
	private imageBtnBg_Internal: mw.Image
	public get imageBtnBg(): mw.Image {
		if(!this.imageBtnBg_Internal&&this.uiWidgetBase) {
			this.imageBtnBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/speedSweep_btnGroup/canvasNumber/imageBtnBg') as mw.Image
		}
		return this.imageBtnBg_Internal
	}
	private btnMinus_Internal: mw.Button
	public get btnMinus(): mw.Button {
		if(!this.btnMinus_Internal&&this.uiWidgetBase) {
			this.btnMinus_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/speedSweep_btnGroup/canvasNumber/btnMinus') as mw.Button
		}
		return this.btnMinus_Internal
	}
	private btnAdd_Internal: mw.Button
	public get btnAdd(): mw.Button {
		if(!this.btnAdd_Internal&&this.uiWidgetBase) {
			this.btnAdd_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/speedSweep_btnGroup/canvasNumber/btnAdd') as mw.Button
		}
		return this.btnAdd_Internal
	}
	private sweepNumber_Internal: mw.TextBlock
	public get sweepNumber(): mw.TextBlock {
		if(!this.sweepNumber_Internal&&this.uiWidgetBase) {
			this.sweepNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/speedSweep_btnGroup/canvasNumber/sweepNumber') as mw.TextBlock
		}
		return this.sweepNumber_Internal
	}
	private mSweep_Internal: mw.StaleButton
	public get mSweep(): mw.StaleButton {
		if(!this.mSweep_Internal&&this.uiWidgetBase) {
			this.mSweep_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/speedSweep_btnGroup/mSweep') as mw.StaleButton
		}
		return this.mSweep_Internal
	}
	private can_btnGroup_Internal: mw.Canvas
	public get can_btnGroup(): mw.Canvas {
		if(!this.can_btnGroup_Internal&&this.uiWidgetBase) {
			this.can_btnGroup_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_btnGroup') as mw.Canvas
		}
		return this.can_btnGroup_Internal
	}
	private mGo_Internal: mw.StaleButton
	public get mGo(): mw.StaleButton {
		if(!this.mGo_Internal&&this.uiWidgetBase) {
			this.mGo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_btnGroup/mGo') as mw.StaleButton
		}
		return this.mGo_Internal
	}
	private mClose_Internal: mw.StaleButton
	public get mClose(): mw.StaleButton {
		if(!this.mClose_Internal&&this.uiWidgetBase) {
			this.mClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/can_inner/can_btnGroup/mClose') as mw.StaleButton
		}
		return this.mClose_Internal
	}
	private canvasElementCounter_Internal: mw.Canvas
	public get canvasElementCounter(): mw.Canvas {
		if(!this.canvasElementCounter_Internal&&this.uiWidgetBase) {
			this.canvasElementCounter_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasElementCounter') as mw.Canvas
		}
		return this.canvasElementCounter_Internal
	}
	private imgElementCounter_Internal: mw.Image
	public get imgElementCounter(): mw.Image {
		if(!this.imgElementCounter_Internal&&this.uiWidgetBase) {
			this.imgElementCounter_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasElementCounter/imgElementCounter') as mw.Image
		}
		return this.imgElementCounter_Internal
	}
	private textElementCounter_Internal: mw.TextBlock
	public get textElementCounter(): mw.TextBlock {
		if(!this.textElementCounter_Internal&&this.uiWidgetBase) {
			this.textElementCounter_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasElementCounter/textElementCounter') as mw.TextBlock
		}
		return this.textElementCounter_Internal
	}
	private mOff_Internal: mw.StaleButton
	public get mOff(): mw.StaleButton {
		if(!this.mOff_Internal&&this.uiWidgetBase) {
			this.mOff_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOff') as mw.StaleButton
		}
		return this.mOff_Internal
	}



   protected onAwake() {
	   //设置能否每帧触发onUpdate
	   this.canUpdate = false;
	   this.layer = mw.UILayerBottom;
	   this.initButtons();
   }
   protected initButtons() {
	   //按钮添加点击
	   
	   this.mSweep.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mSweep");
	   })
	   this.initLanguage(this.mSweep);
	   this.mSweep.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mGo.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mGo");
	   })
	   this.initLanguage(this.mGo);
	   this.mGo.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mClose.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mClose");
	   })
	   this.initLanguage(this.mClose);
	   this.mClose.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mOff.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mOff");
	   })
	   this.initLanguage(this.mOff);
	   this.mOff.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   //按钮添加点击
	   
	   this.counterInfoBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "counterInfoBtn");
	   })
	   this.counterInfoBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.btn_monsterSkill_1.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btn_monsterSkill_1");
	   })
	   this.btn_monsterSkill_1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.btn_monsterSkill_2.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btn_monsterSkill_2");
	   })
	   this.btn_monsterSkill_2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.btn_monsterSkill_3.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btn_monsterSkill_3");
	   })
	   this.btn_monsterSkill_3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.btn_monsterSkill_4.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btn_monsterSkill_4");
	   })
	   this.btn_monsterSkill_4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.btn_monsterSkill_5.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btn_monsterSkill_5");
	   })
	   this.btn_monsterSkill_5.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.refreshBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "refreshBtn");
	   })
	   this.refreshBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.btnMinus.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btnMinus");
	   })
	   this.btnMinus.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.btnAdd.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btnAdd");
	   })
	   this.btnAdd.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.txt_title)
	   
	
	   this.initLanguage(this.mMonsters)
	   
	
	   this.initLanguage(this.vgTextBlock_3)
	   
	
	   this.initLanguage(this.mCountDown)
	   
	
	   this.initLanguage(this.mStageName)
	   
	
	   this.initLanguage(this.textElement)
	   
	
	   this.initLanguage(this.textMonster)
	   
	
	   this.initLanguage(this.textMonsterSkill1)
	   
	
	   this.initLanguage(this.textMonsterSkillDesc1)
	   
	
	   this.initLanguage(this.textMonsterSkill2)
	   
	
	   this.initLanguage(this.textMonsterSkillDesc2)
	   
	
	   this.initLanguage(this.textMonsterSkill3)
	   
	
	   this.initLanguage(this.textMonsterSkillDesc3)
	   
	
	   this.initLanguage(this.textMonsterSkill4)
	   
	
	   this.initLanguage(this.textMonsterSkillDesc4)
	   
	
	   this.initLanguage(this.textMonsterSkill5)
	   
	
	   this.initLanguage(this.textMonsterSkillDesc5)
	   
	
	   this.initLanguage(this.textNormalReward)
	   
	
	   this.initLanguage(this.texPerfectReward)
	   
	
	   this.initLanguage(this.text_rewardGoldComplete)
	   
	
	   this.initLanguage(this.text_rewardTechComplete)
	   
	
	   this.initLanguage(this.text_rewardExpComplete)
	   
	
	   this.initLanguage(this.text_rewardGoldPerfect)
	   
	
	   this.initLanguage(this.text_rewardTechPerfect)
	   
	
	   this.initLanguage(this.text_rewardExpPerfect)
	   
	
	   this.initLanguage(this.textTowerReward)
	   
	
	   this.initLanguage(this.textModragon)
	   
	
	   this.initLanguage(this.sweepText)
	   
	
	   this.initLanguage(this.sweepBalance)
	   
	
	   this.initLanguage(this.sweepNumber)
	   
	
	   this.initLanguage(this.textElementCounter)
	   
	
	   //文本多语言
	   

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
