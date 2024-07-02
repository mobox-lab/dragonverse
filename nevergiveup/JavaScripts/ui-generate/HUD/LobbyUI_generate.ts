
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/HUD/LobbyUI.ui')
export default class LobbyUI_Generate extends UIScript {
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
	private mCanvas_TaskAll_Internal: mw.Canvas
	public get mCanvas_TaskAll(): mw.Canvas {
		if(!this.mCanvas_TaskAll_Internal&&this.uiWidgetBase) {
			this.mCanvas_TaskAll_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_TaskAll') as mw.Canvas
		}
		return this.mCanvas_TaskAll_Internal
	}
	private mCanvas_Tasksolo_Internal: mw.Canvas
	public get mCanvas_Tasksolo(): mw.Canvas {
		if(!this.mCanvas_Tasksolo_Internal&&this.uiWidgetBase) {
			this.mCanvas_Tasksolo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_TaskAll/mCanvas_Tasksolo') as mw.Canvas
		}
		return this.mCanvas_Tasksolo_Internal
	}
	private mTextBlock_Task_Internal: mw.TextBlock
	public get mTextBlock_Task(): mw.TextBlock {
		if(!this.mTextBlock_Task_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Task_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_TaskAll/mCanvas_Tasksolo/mTextBlock_Task') as mw.TextBlock
		}
		return this.mTextBlock_Task_Internal
	}
	private mButton_TaskSmall_Internal: mw.Button
	public get mButton_TaskSmall(): mw.Button {
		if(!this.mButton_TaskSmall_Internal&&this.uiWidgetBase) {
			this.mButton_TaskSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_TaskAll/mCanvas_Tasksolo/mButton_TaskSmall') as mw.Button
		}
		return this.mButton_TaskSmall_Internal
	}
	private mButton_Taskexpand_Internal: mw.Button
	public get mButton_Taskexpand(): mw.Button {
		if(!this.mButton_Taskexpand_Internal&&this.uiWidgetBase) {
			this.mButton_Taskexpand_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_TaskAll/mCanvas_Tasksolo/mButton_Taskexpand') as mw.Button
		}
		return this.mButton_Taskexpand_Internal
	}
	private mButton_Taskreturn2_Internal: mw.Button
	public get mButton_Taskreturn2(): mw.Button {
		if(!this.mButton_Taskreturn2_Internal&&this.uiWidgetBase) {
			this.mButton_Taskreturn2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_TaskAll/mCanvas_Tasksolo/mButton_Taskreturn2') as mw.Button
		}
		return this.mButton_Taskreturn2_Internal
	}
	private mCanvas_NewTaskList_Internal: mw.Canvas
	public get mCanvas_NewTaskList(): mw.Canvas {
		if(!this.mCanvas_NewTaskList_Internal&&this.uiWidgetBase) {
			this.mCanvas_NewTaskList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_TaskAll/mCanvas_NewTaskList') as mw.Canvas
		}
		return this.mCanvas_NewTaskList_Internal
	}
	private mScrollBox_NewTask_Internal: mw.ScrollBox
	public get mScrollBox_NewTask(): mw.ScrollBox {
		if(!this.mScrollBox_NewTask_Internal&&this.uiWidgetBase) {
			this.mScrollBox_NewTask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_TaskAll/mCanvas_NewTaskList/mScrollBox_NewTask') as mw.ScrollBox
		}
		return this.mScrollBox_NewTask_Internal
	}
	private mCanvas_NewTask_Internal: mw.Canvas
	public get mCanvas_NewTask(): mw.Canvas {
		if(!this.mCanvas_NewTask_Internal&&this.uiWidgetBase) {
			this.mCanvas_NewTask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_TaskAll/mCanvas_NewTaskList/mScrollBox_NewTask/mCanvas_NewTask') as mw.Canvas
		}
		return this.mCanvas_NewTask_Internal
	}
	private mImage_hotpoint_Internal: mw.Image
	public get mImage_hotpoint(): mw.Image {
		if(!this.mImage_hotpoint_Internal&&this.uiWidgetBase) {
			this.mImage_hotpoint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_TaskAll/mImage_hotpoint') as mw.Image
		}
		return this.mImage_hotpoint_Internal
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
	   
	
	   this.mButton_TaskSmall.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mButton_TaskSmall");
	   })
	   this.mButton_TaskSmall.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mButton_Taskexpand.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mButton_Taskexpand");
	   })
	   this.mButton_Taskexpand.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mButton_Taskreturn2.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mButton_Taskreturn2");
	   })
	   this.mButton_Taskreturn2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.mLevel)
	   
	
	   this.initLanguage(this.mExp)
	   
	
	   this.initLanguage(this.mLevel_1)
	   
	
	   this.initLanguage(this.goldTxt)
	   
	
	   this.initLanguage(this.techPointTxt)
	   
	
	   this.initLanguage(this.txTechTree)
	   
	
	   this.initLanguage(this.txtButtonCard)
	   
	
	   this.initLanguage(this.txtButtonSetting)
	   
	
	   this.initLanguage(this.mTextBlock_Task)
	   
	
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
