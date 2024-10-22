
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/HUD/LobbyUI.ui')
export default class LobbyUI_Generate extends UIScript {
		private staminaCanvas_Internal: mw.Canvas
	public get staminaCanvas(): mw.Canvas {
		if(!this.staminaCanvas_Internal&&this.uiWidgetBase) {
			this.staminaCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/staminaCanvas') as mw.Canvas
		}
		return this.staminaCanvas_Internal
	}
	private mStamina_Internal: mw.TextBlock
	public get mStamina(): mw.TextBlock {
		if(!this.mStamina_Internal&&this.uiWidgetBase) {
			this.mStamina_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/staminaCanvas/mStamina') as mw.TextBlock
		}
		return this.mStamina_Internal
	}
	private mSlash_Internal: mw.TextBlock
	public get mSlash(): mw.TextBlock {
		if(!this.mSlash_Internal&&this.uiWidgetBase) {
			this.mSlash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/staminaCanvas/mSlash') as mw.TextBlock
		}
		return this.mSlash_Internal
	}
	private mStamina_2_Internal: mw.TextBlock
	public get mStamina_2(): mw.TextBlock {
		if(!this.mStamina_2_Internal&&this.uiWidgetBase) {
			this.mStamina_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/staminaCanvas/mStamina_2') as mw.TextBlock
		}
		return this.mStamina_2_Internal
	}
	private freshBtn_Internal: mw.Button
	public get freshBtn(): mw.Button {
		if(!this.freshBtn_Internal&&this.uiWidgetBase) {
			this.freshBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/staminaCanvas/freshBtn') as mw.Button
		}
		return this.freshBtn_Internal
	}
	private addBtn_Internal: mw.Button
	public get addBtn(): mw.Button {
		if(!this.addBtn_Internal&&this.uiWidgetBase) {
			this.addBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/staminaCanvas/addBtn') as mw.Button
		}
		return this.addBtn_Internal
	}
	private imgStamina_Internal: mw.Image
	public get imgStamina(): mw.Image {
		if(!this.imgStamina_Internal&&this.uiWidgetBase) {
			this.imgStamina_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/staminaCanvas/imgStamina') as mw.Image
		}
		return this.imgStamina_Internal
	}
	private expCanvas_Internal: mw.Canvas
	public get expCanvas(): mw.Canvas {
		if(!this.expCanvas_Internal&&this.uiWidgetBase) {
			this.expCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/expCanvas') as mw.Canvas
		}
		return this.expCanvas_Internal
	}
	private mLevel_Internal: mw.TextBlock
	public get mLevel(): mw.TextBlock {
		if(!this.mLevel_Internal&&this.uiWidgetBase) {
			this.mLevel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/expCanvas/mLevel') as mw.TextBlock
		}
		return this.mLevel_Internal
	}
	private mExpbar_Internal: mw.ProgressBar
	public get mExpbar(): mw.ProgressBar {
		if(!this.mExpbar_Internal&&this.uiWidgetBase) {
			this.mExpbar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas/mExpbar') as mw.ProgressBar
		}
		return this.mExpbar_Internal
	}
	private mExp_Internal: mw.TextBlock
	public get mExp(): mw.TextBlock {
		if(!this.mExp_Internal&&this.uiWidgetBase) {
			this.mExp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas/mExp') as mw.TextBlock
		}
		return this.mExp_Internal
	}
	private mLevel_1_Internal: mw.TextBlock
	public get mLevel_1(): mw.TextBlock {
		if(!this.mLevel_1_Internal&&this.uiWidgetBase) {
			this.mLevel_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas/mLevel_1') as mw.TextBlock
		}
		return this.mLevel_1_Internal
	}
	private teamCanvas_Internal: mw.Canvas
	public get teamCanvas(): mw.Canvas {
		if(!this.teamCanvas_Internal&&this.uiWidgetBase) {
			this.teamCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/teamCanvas') as mw.Canvas
		}
		return this.teamCanvas_Internal
	}
	private addTowerBtn_Internal: mw.Button
	public get addTowerBtn(): mw.Button {
		if(!this.addTowerBtn_Internal&&this.uiWidgetBase) {
			this.addTowerBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/teamCanvas/addTowerBtn') as mw.Button
		}
		return this.addTowerBtn_Internal
	}
	private moneyCanvas_Internal: mw.Canvas
	public get moneyCanvas(): mw.Canvas {
		if(!this.moneyCanvas_Internal&&this.uiWidgetBase) {
			this.moneyCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/moneyCanvas') as mw.Canvas
		}
		return this.moneyCanvas_Internal
	}
	private goldCanvas_Internal: mw.Canvas
	public get goldCanvas(): mw.Canvas {
		if(!this.goldCanvas_Internal&&this.uiWidgetBase) {
			this.goldCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/moneyCanvas/goldCanvas') as mw.Canvas
		}
		return this.goldCanvas_Internal
	}
	private goldTxt_Internal: mw.TextBlock
	public get goldTxt(): mw.TextBlock {
		if(!this.goldTxt_Internal&&this.uiWidgetBase) {
			this.goldTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/moneyCanvas/goldCanvas/goldTxt') as mw.TextBlock
		}
		return this.goldTxt_Internal
	}
	private techPointCanvas_Internal: mw.Canvas
	public get techPointCanvas(): mw.Canvas {
		if(!this.techPointCanvas_Internal&&this.uiWidgetBase) {
			this.techPointCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/moneyCanvas/techPointCanvas') as mw.Canvas
		}
		return this.techPointCanvas_Internal
	}
	private techPointTxt_Internal: mw.TextBlock
	public get techPointTxt(): mw.TextBlock {
		if(!this.techPointTxt_Internal&&this.uiWidgetBase) {
			this.techPointTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/moneyCanvas/techPointCanvas/techPointTxt') as mw.TextBlock
		}
		return this.techPointTxt_Internal
	}
	private buttonCanvas_Internal: mw.Canvas
	public get buttonCanvas(): mw.Canvas {
		if(!this.buttonCanvas_Internal&&this.uiWidgetBase) {
			this.buttonCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas') as mw.Canvas
		}
		return this.buttonCanvas_Internal
	}
	private techTreeCanvas_Internal: mw.Canvas
	public get techTreeCanvas(): mw.Canvas {
		if(!this.techTreeCanvas_Internal&&this.uiWidgetBase) {
			this.techTreeCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/techTreeCanvas') as mw.Canvas
		}
		return this.techTreeCanvas_Internal
	}
	private techTreeBtn_Internal: mw.Button
	public get techTreeBtn(): mw.Button {
		if(!this.techTreeBtn_Internal&&this.uiWidgetBase) {
			this.techTreeBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/techTreeCanvas/techTreeBtn') as mw.Button
		}
		return this.techTreeBtn_Internal
	}
	private txTechTree_Internal: mw.TextBlock
	public get txTechTree(): mw.TextBlock {
		if(!this.txTechTree_Internal&&this.uiWidgetBase) {
			this.txTechTree_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/techTreeCanvas/txTechTree') as mw.TextBlock
		}
		return this.txTechTree_Internal
	}
	private cardCanvas_Internal: mw.Canvas
	public get cardCanvas(): mw.Canvas {
		if(!this.cardCanvas_Internal&&this.uiWidgetBase) {
			this.cardCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/cardCanvas') as mw.Canvas
		}
		return this.cardCanvas_Internal
	}
	private cardBtn_Internal: mw.Button
	public get cardBtn(): mw.Button {
		if(!this.cardBtn_Internal&&this.uiWidgetBase) {
			this.cardBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/cardCanvas/cardBtn') as mw.Button
		}
		return this.cardBtn_Internal
	}
	private txtButtonCard_Internal: mw.TextBlock
	public get txtButtonCard(): mw.TextBlock {
		if(!this.txtButtonCard_Internal&&this.uiWidgetBase) {
			this.txtButtonCard_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/cardCanvas/txtButtonCard') as mw.TextBlock
		}
		return this.txtButtonCard_Internal
	}
	private settingCanvas_Internal: mw.Canvas
	public get settingCanvas(): mw.Canvas {
		if(!this.settingCanvas_Internal&&this.uiWidgetBase) {
			this.settingCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/settingCanvas') as mw.Canvas
		}
		return this.settingCanvas_Internal
	}
	private settingBtn_Internal: mw.Button
	public get settingBtn(): mw.Button {
		if(!this.settingBtn_Internal&&this.uiWidgetBase) {
			this.settingBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/settingCanvas/settingBtn') as mw.Button
		}
		return this.settingBtn_Internal
	}
	private txtButtonSetting_Internal: mw.TextBlock
	public get txtButtonSetting(): mw.TextBlock {
		if(!this.txtButtonSetting_Internal&&this.uiWidgetBase) {
			this.txtButtonSetting_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/settingCanvas/txtButtonSetting') as mw.TextBlock
		}
		return this.txtButtonSetting_Internal
	}
	private jumpCanvas_Internal: mw.Canvas
	public get jumpCanvas(): mw.Canvas {
		if(!this.jumpCanvas_Internal&&this.uiWidgetBase) {
			this.jumpCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/jumpCanvas') as mw.Canvas
		}
		return this.jumpCanvas_Internal
	}
	private jumpBtn_Internal: mw.Button
	public get jumpBtn(): mw.Button {
		if(!this.jumpBtn_Internal&&this.uiWidgetBase) {
			this.jumpBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/jumpCanvas/jumpBtn') as mw.Button
		}
		return this.jumpBtn_Internal
	}
	private txtButtonJump_Internal: mw.TextBlock
	public get txtButtonJump(): mw.TextBlock {
		if(!this.txtButtonJump_Internal&&this.uiWidgetBase) {
			this.txtButtonJump_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/jumpCanvas/txtButtonJump') as mw.TextBlock
		}
		return this.txtButtonJump_Internal
	}
	private returnCanvas_Internal: mw.Canvas
	public get returnCanvas(): mw.Canvas {
		if(!this.returnCanvas_Internal&&this.uiWidgetBase) {
			this.returnCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/returnCanvas') as mw.Canvas
		}
		return this.returnCanvas_Internal
	}
	private returnBtn_Internal: mw.Button
	public get returnBtn(): mw.Button {
		if(!this.returnBtn_Internal&&this.uiWidgetBase) {
			this.returnBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/returnCanvas/returnBtn') as mw.Button
		}
		return this.returnBtn_Internal
	}
	private txtButtonReturn_Internal: mw.TextBlock
	public get txtButtonReturn(): mw.TextBlock {
		if(!this.txtButtonReturn_Internal&&this.uiWidgetBase) {
			this.txtButtonReturn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/returnCanvas/txtButtonReturn') as mw.TextBlock
		}
		return this.txtButtonReturn_Internal
	}
	private taskCanvas_Internal: mw.Canvas
	public get taskCanvas(): mw.Canvas {
		if(!this.taskCanvas_Internal&&this.uiWidgetBase) {
			this.taskCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/taskCanvas') as mw.Canvas
		}
		return this.taskCanvas_Internal
	}
	private taskBtn_Internal: mw.Button
	public get taskBtn(): mw.Button {
		if(!this.taskBtn_Internal&&this.uiWidgetBase) {
			this.taskBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/taskCanvas/taskBtn') as mw.Button
		}
		return this.taskBtn_Internal
	}
	private txtButtontask_Internal: mw.TextBlock
	public get txtButtontask(): mw.TextBlock {
		if(!this.txtButtontask_Internal&&this.uiWidgetBase) {
			this.txtButtontask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/taskCanvas/txtButtontask') as mw.TextBlock
		}
		return this.txtButtontask_Internal
	}
	private mImage_hotpoint_Internal: mw.Image
	public get mImage_hotpoint(): mw.Image {
		if(!this.mImage_hotpoint_Internal&&this.uiWidgetBase) {
			this.mImage_hotpoint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/taskCanvas/mImage_hotpoint') as mw.Image
		}
		return this.mImage_hotpoint_Internal
	}
	private announcerCanvas_Internal: mw.Canvas
	public get announcerCanvas(): mw.Canvas {
		if(!this.announcerCanvas_Internal&&this.uiWidgetBase) {
			this.announcerCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/announcerCanvas') as mw.Canvas
		}
		return this.announcerCanvas_Internal
	}
	private announcerBtn_Internal: mw.Button
	public get announcerBtn(): mw.Button {
		if(!this.announcerBtn_Internal&&this.uiWidgetBase) {
			this.announcerBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/announcerCanvas/announcerBtn') as mw.Button
		}
		return this.announcerBtn_Internal
	}
	private txtButtonAnnouncer_Internal: mw.TextBlock
	public get txtButtonAnnouncer(): mw.TextBlock {
		if(!this.txtButtonAnnouncer_Internal&&this.uiWidgetBase) {
			this.txtButtonAnnouncer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/announcerCanvas/txtButtonAnnouncer') as mw.TextBlock
		}
		return this.txtButtonAnnouncer_Internal
	}
	private shopCanvas_Internal: mw.Canvas
	public get shopCanvas(): mw.Canvas {
		if(!this.shopCanvas_Internal&&this.uiWidgetBase) {
			this.shopCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/shopCanvas') as mw.Canvas
		}
		return this.shopCanvas_Internal
	}
	private shopBtn_Internal: mw.Button
	public get shopBtn(): mw.Button {
		if(!this.shopBtn_Internal&&this.uiWidgetBase) {
			this.shopBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/shopCanvas/shopBtn') as mw.Button
		}
		return this.shopBtn_Internal
	}
	private txtButtonshop_Internal: mw.TextBlock
	public get txtButtonshop(): mw.TextBlock {
		if(!this.txtButtonshop_Internal&&this.uiWidgetBase) {
			this.txtButtonshop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/shopCanvas/txtButtonshop') as mw.TextBlock
		}
		return this.txtButtonshop_Internal
	}
	private questionCanvas_Internal: mw.Canvas
	public get questionCanvas(): mw.Canvas {
		if(!this.questionCanvas_Internal&&this.uiWidgetBase) {
			this.questionCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/questionCanvas') as mw.Canvas
		}
		return this.questionCanvas_Internal
	}
	private questionBtn_Internal: mw.Button
	public get questionBtn(): mw.Button {
		if(!this.questionBtn_Internal&&this.uiWidgetBase) {
			this.questionBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/questionCanvas/questionBtn') as mw.Button
		}
		return this.questionBtn_Internal
	}
	private imgQuestion_Internal: mw.Image
	public get imgQuestion(): mw.Image {
		if(!this.imgQuestion_Internal&&this.uiWidgetBase) {
			this.imgQuestion_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/questionCanvas/imgQuestion') as mw.Image
		}
		return this.imgQuestion_Internal
	}
	private txtBtnQuestion_Internal: mw.TextBlock
	public get txtBtnQuestion(): mw.TextBlock {
		if(!this.txtBtnQuestion_Internal&&this.uiWidgetBase) {
			this.txtBtnQuestion_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/buttonCanvas/questionCanvas/txtBtnQuestion') as mw.TextBlock
		}
		return this.txtBtnQuestion_Internal
	}
	private roomidCanvas_Internal: mw.Canvas
	public get roomidCanvas(): mw.Canvas {
		if(!this.roomidCanvas_Internal&&this.uiWidgetBase) {
			this.roomidCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/roomidCanvas') as mw.Canvas
		}
		return this.roomidCanvas_Internal
	}
	private text_roomid_Internal: mw.TextBlock
	public get text_roomid(): mw.TextBlock {
		if(!this.text_roomid_Internal&&this.uiWidgetBase) {
			this.text_roomid_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/roomidCanvas/text_roomid') as mw.TextBlock
		}
		return this.text_roomid_Internal
	}
	private tokenCanvas_Internal: mw.Canvas
	public get tokenCanvas(): mw.Canvas {
		if(!this.tokenCanvas_Internal&&this.uiWidgetBase) {
			this.tokenCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/tokenCanvas') as mw.Canvas
		}
		return this.tokenCanvas_Internal
	}
	private tokenBg_Internal: mw.Image
	public get tokenBg(): mw.Image {
		if(!this.tokenBg_Internal&&this.uiWidgetBase) {
			this.tokenBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/tokenCanvas/tokenBg') as mw.Image
		}
		return this.tokenBg_Internal
	}
	private mToken_Internal: mw.TextBlock
	public get mToken(): mw.TextBlock {
		if(!this.mToken_Internal&&this.uiWidgetBase) {
			this.mToken_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/tokenCanvas/mToken') as mw.TextBlock
		}
		return this.mToken_Internal
	}
	private freshTokenBtn_Internal: mw.Button
	public get freshTokenBtn(): mw.Button {
		if(!this.freshTokenBtn_Internal&&this.uiWidgetBase) {
			this.freshTokenBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/tokenCanvas/freshTokenBtn') as mw.Button
		}
		return this.freshTokenBtn_Internal
	}
	private imgToekn_Internal: mw.Image
	public get imgToekn(): mw.Image {
		if(!this.imgToekn_Internal&&this.uiWidgetBase) {
			this.imgToekn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/tokenCanvas/imgToekn') as mw.Image
		}
		return this.imgToekn_Internal
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
	   
	   this.freshBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "freshBtn");
	   })
	   this.freshBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.addBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "addBtn");
	   })
	   this.addBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.addTowerBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "addTowerBtn");
	   })
	   this.addTowerBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.techTreeBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "techTreeBtn");
	   })
	   this.techTreeBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.cardBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "cardBtn");
	   })
	   this.cardBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.settingBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "settingBtn");
	   })
	   this.settingBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.jumpBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "jumpBtn");
	   })
	   this.jumpBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.returnBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "returnBtn");
	   })
	   this.returnBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.taskBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "taskBtn");
	   })
	   this.taskBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.announcerBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "announcerBtn");
	   })
	   this.announcerBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.shopBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "shopBtn");
	   })
	   this.shopBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.questionBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "questionBtn");
	   })
	   this.questionBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.freshTokenBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "freshTokenBtn");
	   })
	   this.freshTokenBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.mStamina)
	   
	
	   this.initLanguage(this.mSlash)
	   
	
	   this.initLanguage(this.mStamina_2)
	   
	
	   this.initLanguage(this.mLevel)
	   
	
	   this.initLanguage(this.mExp)
	   
	
	   this.initLanguage(this.mLevel_1)
	   
	
	   this.initLanguage(this.goldTxt)
	   
	
	   this.initLanguage(this.techPointTxt)
	   
	
	   this.initLanguage(this.txTechTree)
	   
	
	   this.initLanguage(this.txtButtonCard)
	   
	
	   this.initLanguage(this.txtButtonSetting)
	   
	
	   this.initLanguage(this.txtButtonJump)
	   
	
	   this.initLanguage(this.txtButtonReturn)
	   
	
	   this.initLanguage(this.txtButtontask)
	   
	
	   this.initLanguage(this.txtButtonAnnouncer)
	   
	
	   this.initLanguage(this.txtButtonshop)
	   
	
	   this.initLanguage(this.txtBtnQuestion)
	   
	
	   this.initLanguage(this.text_roomid)
	   
	
	   this.initLanguage(this.mToken)
	   
	
	   //文本多语言
	   
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/teamCanvas/LineupTxt") as any);
	   
	

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
