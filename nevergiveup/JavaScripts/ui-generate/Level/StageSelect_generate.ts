
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Level/StageSelect.ui')
export default class StageSelect_Generate extends UIScript {
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
	private bg_1_Internal: mw.Image
	public get bg_1(): mw.Image {
		if(!this.bg_1_Internal&&this.uiWidgetBase) {
			this.bg_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/bg_1') as mw.Image
		}
		return this.bg_1_Internal
	}
	private txt_title_Internal: mw.TextBlock
	public get txt_title(): mw.TextBlock {
		if(!this.txt_title_Internal&&this.uiWidgetBase) {
			this.txt_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/txt_title') as mw.TextBlock
		}
		return this.txt_title_Internal
	}
	private img_lilbg2_Internal: mw.Image
	public get img_lilbg2(): mw.Image {
		if(!this.img_lilbg2_Internal&&this.uiWidgetBase) {
			this.img_lilbg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/img_lilbg2') as mw.Image
		}
		return this.img_lilbg2_Internal
	}
	private mSelectDifficulty_Internal: mw.Canvas
	public get mSelectDifficulty(): mw.Canvas {
		if(!this.mSelectDifficulty_Internal&&this.uiWidgetBase) {
			this.mSelectDifficulty_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/mSelectDifficulty') as mw.Canvas
		}
		return this.mSelectDifficulty_Internal
	}
	private mMonsters_Internal: mw.TextBlock
	public get mMonsters(): mw.TextBlock {
		if(!this.mMonsters_Internal&&this.uiWidgetBase) {
			this.mMonsters_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/mMonsters') as mw.TextBlock
		}
		return this.mMonsters_Internal
	}
	private textElement_Internal: mw.TextBlock
	public get textElement(): mw.TextBlock {
		if(!this.textElement_Internal&&this.uiWidgetBase) {
			this.textElement_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Element/textElement') as mw.TextBlock
		}
		return this.textElement_Internal
	}
	private elementImg1_Internal: mw.Image
	public get elementImg1(): mw.Image {
		if(!this.elementImg1_Internal&&this.uiWidgetBase) {
			this.elementImg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Element/elementImg1') as mw.Image
		}
		return this.elementImg1_Internal
	}
	private elementImg2_Internal: mw.Image
	public get elementImg2(): mw.Image {
		if(!this.elementImg2_Internal&&this.uiWidgetBase) {
			this.elementImg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Element/elementImg2') as mw.Image
		}
		return this.elementImg2_Internal
	}
	private elementImg3_Internal: mw.Image
	public get elementImg3(): mw.Image {
		if(!this.elementImg3_Internal&&this.uiWidgetBase) {
			this.elementImg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Element/elementImg3') as mw.Image
		}
		return this.elementImg3_Internal
	}
	private elementImg4_Internal: mw.Image
	public get elementImg4(): mw.Image {
		if(!this.elementImg4_Internal&&this.uiWidgetBase) {
			this.elementImg4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Element/elementImg4') as mw.Image
		}
		return this.elementImg4_Internal
	}
	private textMonster_Internal: mw.TextBlock
	public get textMonster(): mw.TextBlock {
		if(!this.textMonster_Internal&&this.uiWidgetBase) {
			this.textMonster_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/textMonster') as mw.TextBlock
		}
		return this.textMonster_Internal
	}
	private canvas_MonsterSkillDesc_1_Internal: mw.Canvas
	public get canvas_MonsterSkillDesc_1(): mw.Canvas {
		if(!this.canvas_MonsterSkillDesc_1_Internal&&this.uiWidgetBase) {
			this.canvas_MonsterSkillDesc_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_1') as mw.Canvas
		}
		return this.canvas_MonsterSkillDesc_1_Internal
	}
	private btn_monsterSkill_1_Internal: mw.Button
	public get btn_monsterSkill_1(): mw.Button {
		if(!this.btn_monsterSkill_1_Internal&&this.uiWidgetBase) {
			this.btn_monsterSkill_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_1/btn_monsterSkill_1') as mw.Button
		}
		return this.btn_monsterSkill_1_Internal
	}
	private monsterSkillDesc1_Internal: mw.Image
	public get monsterSkillDesc1(): mw.Image {
		if(!this.monsterSkillDesc1_Internal&&this.uiWidgetBase) {
			this.monsterSkillDesc1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_1/monsterSkillDesc1') as mw.Image
		}
		return this.monsterSkillDesc1_Internal
	}
	private textMonsterSkill1_Internal: mw.TextBlock
	public get textMonsterSkill1(): mw.TextBlock {
		if(!this.textMonsterSkill1_Internal&&this.uiWidgetBase) {
			this.textMonsterSkill1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_1/textMonsterSkill1') as mw.TextBlock
		}
		return this.textMonsterSkill1_Internal
	}
	private textMonsterSkillDesc1_Internal: mw.TextBlock
	public get textMonsterSkillDesc1(): mw.TextBlock {
		if(!this.textMonsterSkillDesc1_Internal&&this.uiWidgetBase) {
			this.textMonsterSkillDesc1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_1/textMonsterSkillDesc1') as mw.TextBlock
		}
		return this.textMonsterSkillDesc1_Internal
	}
	private canvas_MonsterSkillDesc_2_Internal: mw.Canvas
	public get canvas_MonsterSkillDesc_2(): mw.Canvas {
		if(!this.canvas_MonsterSkillDesc_2_Internal&&this.uiWidgetBase) {
			this.canvas_MonsterSkillDesc_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_2') as mw.Canvas
		}
		return this.canvas_MonsterSkillDesc_2_Internal
	}
	private btn_monsterSkill_2_Internal: mw.Button
	public get btn_monsterSkill_2(): mw.Button {
		if(!this.btn_monsterSkill_2_Internal&&this.uiWidgetBase) {
			this.btn_monsterSkill_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_2/btn_monsterSkill_2') as mw.Button
		}
		return this.btn_monsterSkill_2_Internal
	}
	private monsterSkillDesc2_Internal: mw.Image
	public get monsterSkillDesc2(): mw.Image {
		if(!this.monsterSkillDesc2_Internal&&this.uiWidgetBase) {
			this.monsterSkillDesc2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_2/monsterSkillDesc2') as mw.Image
		}
		return this.monsterSkillDesc2_Internal
	}
	private textMonsterSkill2_Internal: mw.TextBlock
	public get textMonsterSkill2(): mw.TextBlock {
		if(!this.textMonsterSkill2_Internal&&this.uiWidgetBase) {
			this.textMonsterSkill2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_2/textMonsterSkill2') as mw.TextBlock
		}
		return this.textMonsterSkill2_Internal
	}
	private textMonsterSkillDesc2_Internal: mw.TextBlock
	public get textMonsterSkillDesc2(): mw.TextBlock {
		if(!this.textMonsterSkillDesc2_Internal&&this.uiWidgetBase) {
			this.textMonsterSkillDesc2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_2/textMonsterSkillDesc2') as mw.TextBlock
		}
		return this.textMonsterSkillDesc2_Internal
	}
	private canvas_MonsterSkillDesc_3_Internal: mw.Canvas
	public get canvas_MonsterSkillDesc_3(): mw.Canvas {
		if(!this.canvas_MonsterSkillDesc_3_Internal&&this.uiWidgetBase) {
			this.canvas_MonsterSkillDesc_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_3') as mw.Canvas
		}
		return this.canvas_MonsterSkillDesc_3_Internal
	}
	private btn_monsterSkill_3_Internal: mw.Button
	public get btn_monsterSkill_3(): mw.Button {
		if(!this.btn_monsterSkill_3_Internal&&this.uiWidgetBase) {
			this.btn_monsterSkill_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_3/btn_monsterSkill_3') as mw.Button
		}
		return this.btn_monsterSkill_3_Internal
	}
	private monsterSkillDesc3_Internal: mw.Image
	public get monsterSkillDesc3(): mw.Image {
		if(!this.monsterSkillDesc3_Internal&&this.uiWidgetBase) {
			this.monsterSkillDesc3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_3/monsterSkillDesc3') as mw.Image
		}
		return this.monsterSkillDesc3_Internal
	}
	private textMonsterSkill3_Internal: mw.TextBlock
	public get textMonsterSkill3(): mw.TextBlock {
		if(!this.textMonsterSkill3_Internal&&this.uiWidgetBase) {
			this.textMonsterSkill3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_3/textMonsterSkill3') as mw.TextBlock
		}
		return this.textMonsterSkill3_Internal
	}
	private textMonsterSkillDesc3_Internal: mw.TextBlock
	public get textMonsterSkillDesc3(): mw.TextBlock {
		if(!this.textMonsterSkillDesc3_Internal&&this.uiWidgetBase) {
			this.textMonsterSkillDesc3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_3/textMonsterSkillDesc3') as mw.TextBlock
		}
		return this.textMonsterSkillDesc3_Internal
	}
	private canvas_MonsterSkillDesc_4_Internal: mw.Canvas
	public get canvas_MonsterSkillDesc_4(): mw.Canvas {
		if(!this.canvas_MonsterSkillDesc_4_Internal&&this.uiWidgetBase) {
			this.canvas_MonsterSkillDesc_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_4') as mw.Canvas
		}
		return this.canvas_MonsterSkillDesc_4_Internal
	}
	private btn_monsterSkill_4_Internal: mw.Button
	public get btn_monsterSkill_4(): mw.Button {
		if(!this.btn_monsterSkill_4_Internal&&this.uiWidgetBase) {
			this.btn_monsterSkill_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_4/btn_monsterSkill_4') as mw.Button
		}
		return this.btn_monsterSkill_4_Internal
	}
	private monsterSkillDesc4_Internal: mw.Image
	public get monsterSkillDesc4(): mw.Image {
		if(!this.monsterSkillDesc4_Internal&&this.uiWidgetBase) {
			this.monsterSkillDesc4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_4/monsterSkillDesc4') as mw.Image
		}
		return this.monsterSkillDesc4_Internal
	}
	private textMonsterSkill4_Internal: mw.TextBlock
	public get textMonsterSkill4(): mw.TextBlock {
		if(!this.textMonsterSkill4_Internal&&this.uiWidgetBase) {
			this.textMonsterSkill4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_4/textMonsterSkill4') as mw.TextBlock
		}
		return this.textMonsterSkill4_Internal
	}
	private textMonsterSkillDesc4_Internal: mw.TextBlock
	public get textMonsterSkillDesc4(): mw.TextBlock {
		if(!this.textMonsterSkillDesc4_Internal&&this.uiWidgetBase) {
			this.textMonsterSkillDesc4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_4/textMonsterSkillDesc4') as mw.TextBlock
		}
		return this.textMonsterSkillDesc4_Internal
	}
	private canvas_MonsterSkillDesc_5_Internal: mw.Canvas
	public get canvas_MonsterSkillDesc_5(): mw.Canvas {
		if(!this.canvas_MonsterSkillDesc_5_Internal&&this.uiWidgetBase) {
			this.canvas_MonsterSkillDesc_5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_5') as mw.Canvas
		}
		return this.canvas_MonsterSkillDesc_5_Internal
	}
	private btn_monsterSkill_5_Internal: mw.Button
	public get btn_monsterSkill_5(): mw.Button {
		if(!this.btn_monsterSkill_5_Internal&&this.uiWidgetBase) {
			this.btn_monsterSkill_5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_5/btn_monsterSkill_5') as mw.Button
		}
		return this.btn_monsterSkill_5_Internal
	}
	private monsterSkillDesc5_Internal: mw.Image
	public get monsterSkillDesc5(): mw.Image {
		if(!this.monsterSkillDesc5_Internal&&this.uiWidgetBase) {
			this.monsterSkillDesc5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_5/monsterSkillDesc5') as mw.Image
		}
		return this.monsterSkillDesc5_Internal
	}
	private textMonsterSkill5_Internal: mw.TextBlock
	public get textMonsterSkill5(): mw.TextBlock {
		if(!this.textMonsterSkill5_Internal&&this.uiWidgetBase) {
			this.textMonsterSkill5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_5/textMonsterSkill5') as mw.TextBlock
		}
		return this.textMonsterSkill5_Internal
	}
	private textMonsterSkillDesc5_Internal: mw.TextBlock
	public get textMonsterSkillDesc5(): mw.TextBlock {
		if(!this.textMonsterSkillDesc5_Internal&&this.uiWidgetBase) {
			this.textMonsterSkillDesc5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_Monster/canvas_MonsterSkillDesc_5/textMonsterSkillDesc5') as mw.TextBlock
		}
		return this.textMonsterSkillDesc5_Internal
	}
	private img_lilbg3_Internal: mw.Image
	public get img_lilbg3(): mw.Image {
		if(!this.img_lilbg3_Internal&&this.uiWidgetBase) {
			this.img_lilbg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/PlayerQueue/img_lilbg3') as mw.Image
		}
		return this.img_lilbg3_Internal
	}
	private vgTextBlock_3_Internal: mw.TextBlock
	public get vgTextBlock_3(): mw.TextBlock {
		if(!this.vgTextBlock_3_Internal&&this.uiWidgetBase) {
			this.vgTextBlock_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/PlayerQueue/vgTextBlock_3') as mw.TextBlock
		}
		return this.vgTextBlock_3_Internal
	}
	private mCountDown_Internal: mw.TextBlock
	public get mCountDown(): mw.TextBlock {
		if(!this.mCountDown_Internal&&this.uiWidgetBase) {
			this.mCountDown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/PlayerQueue/mCountDown') as mw.TextBlock
		}
		return this.mCountDown_Internal
	}
	private mPlayerQueue_Internal: mw.Canvas
	public get mPlayerQueue(): mw.Canvas {
		if(!this.mPlayerQueue_Internal&&this.uiWidgetBase) {
			this.mPlayerQueue_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/PlayerQueue/mPlayerQueue') as mw.Canvas
		}
		return this.mPlayerQueue_Internal
	}
	private mGo_Internal: mw.StaleButton
	public get mGo(): mw.StaleButton {
		if(!this.mGo_Internal&&this.uiWidgetBase) {
			this.mGo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/mGo') as mw.StaleButton
		}
		return this.mGo_Internal
	}
	private mClose_Internal: mw.StaleButton
	public get mClose(): mw.StaleButton {
		if(!this.mClose_Internal&&this.uiWidgetBase) {
			this.mClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/mClose') as mw.StaleButton
		}
		return this.mClose_Internal
	}
	private img_backg_Internal: mw.Image
	public get img_backg(): mw.Image {
		if(!this.img_backg_Internal&&this.uiWidgetBase) {
			this.img_backg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_1/img_backg') as mw.Image
		}
		return this.img_backg_Internal
	}
	private mMapImage_Internal: mw.Image
	public get mMapImage(): mw.Image {
		if(!this.mMapImage_Internal&&this.uiWidgetBase) {
			this.mMapImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_1/mMapImage') as mw.Image
		}
		return this.mMapImage_Internal
	}
	private mStageName_Internal: mw.TextBlock
	public get mStageName(): mw.TextBlock {
		if(!this.mStageName_Internal&&this.uiWidgetBase) {
			this.mStageName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/Canvas_1/mStageName') as mw.TextBlock
		}
		return this.mStageName_Internal
	}
	private mOff_Internal: mw.StaleButton
	public get mOff(): mw.StaleButton {
		if(!this.mOff_Internal&&this.uiWidgetBase) {
			this.mOff_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContainer/mOff') as mw.StaleButton
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
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.txt_title)
	   
	
	   this.initLanguage(this.mMonsters)
	   
	
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
	   
	
	   this.initLanguage(this.vgTextBlock_3)
	   
	
	   this.initLanguage(this.mCountDown)
	   
	
	   this.initLanguage(this.mStageName)
	   
	
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
