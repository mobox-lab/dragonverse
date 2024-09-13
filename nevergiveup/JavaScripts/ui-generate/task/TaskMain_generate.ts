
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/task/TaskMain.ui')
export default class TaskMain_Generate extends UIScript {
		private btn_Close_Internal: mw.Button
	public get btn_Close(): mw.Button {
		if(!this.btn_Close_Internal&&this.uiWidgetBase) {
			this.btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_Close') as mw.Button
		}
		return this.btn_Close_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private img_lilbg2_1_Internal: mw.Image
	public get img_lilbg2_1(): mw.Image {
		if(!this.img_lilbg2_1_Internal&&this.uiWidgetBase) {
			this.img_lilbg2_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/img_lilbg2_1') as mw.Image
		}
		return this.img_lilbg2_1_Internal
	}
	private txt_title_Internal: mw.TextBlock
	public get txt_title(): mw.TextBlock {
		if(!this.txt_title_Internal&&this.uiWidgetBase) {
			this.txt_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/txt_title') as mw.TextBlock
		}
		return this.txt_title_Internal
	}
	private img_dec1_Internal: mw.Image
	public get img_dec1(): mw.Image {
		if(!this.img_dec1_Internal&&this.uiWidgetBase) {
			this.img_dec1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/img_dec1') as mw.Image
		}
		return this.img_dec1_Internal
	}
	private taskName_Internal: mw.TextBlock
	public get taskName(): mw.TextBlock {
		if(!this.taskName_Internal&&this.uiWidgetBase) {
			this.taskName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/taskName') as mw.TextBlock
		}
		return this.taskName_Internal
	}
	private btn_Esc_Internal: mw.Button
	public get btn_Esc(): mw.Button {
		if(!this.btn_Esc_Internal&&this.uiWidgetBase) {
			this.btn_Esc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/btn_Esc') as mw.Button
		}
		return this.btn_Esc_Internal
	}
	private taskCountdown_Internal: mw.TextBlock
	public get taskCountdown(): mw.TextBlock {
		if(!this.taskCountdown_Internal&&this.uiWidgetBase) {
			this.taskCountdown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/taskCountdown') as mw.TextBlock
		}
		return this.taskCountdown_Internal
	}
	private taskCountdownTime_Internal: mw.TextBlock
	public get taskCountdownTime(): mw.TextBlock {
		if(!this.taskCountdownTime_Internal&&this.uiWidgetBase) {
			this.taskCountdownTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/taskCountdownTime') as mw.TextBlock
		}
		return this.taskCountdownTime_Internal
	}
	private changeBtnCanvas_Internal: mw.Canvas
	public get changeBtnCanvas(): mw.Canvas {
		if(!this.changeBtnCanvas_Internal&&this.uiWidgetBase) {
			this.changeBtnCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/changeBtnCanvas') as mw.Canvas
		}
		return this.changeBtnCanvas_Internal
	}
	private mainTaskCanvas_Internal: mw.Canvas
	public get mainTaskCanvas(): mw.Canvas {
		if(!this.mainTaskCanvas_Internal&&this.uiWidgetBase) {
			this.mainTaskCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/changeBtnCanvas/mainTaskCanvas') as mw.Canvas
		}
		return this.mainTaskCanvas_Internal
	}
	private mainTaskBtn_Internal: mw.StaleButton
	public get mainTaskBtn(): mw.StaleButton {
		if(!this.mainTaskBtn_Internal&&this.uiWidgetBase) {
			this.mainTaskBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/changeBtnCanvas/mainTaskCanvas/mainTaskBtn') as mw.StaleButton
		}
		return this.mainTaskBtn_Internal
	}
	private mImage_hotpoint_1_Internal: mw.Image
	public get mImage_hotpoint_1(): mw.Image {
		if(!this.mImage_hotpoint_1_Internal&&this.uiWidgetBase) {
			this.mImage_hotpoint_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/changeBtnCanvas/mainTaskCanvas/mImage_hotpoint_1') as mw.Image
		}
		return this.mImage_hotpoint_1_Internal
	}
	private text_Task_Internal: mw.TextBlock
	public get text_Task(): mw.TextBlock {
		if(!this.text_Task_Internal&&this.uiWidgetBase) {
			this.text_Task_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/changeBtnCanvas/mainTaskCanvas/text_Task') as mw.TextBlock
		}
		return this.text_Task_Internal
	}
	private dailyTaskCanvas_Internal: mw.Canvas
	public get dailyTaskCanvas(): mw.Canvas {
		if(!this.dailyTaskCanvas_Internal&&this.uiWidgetBase) {
			this.dailyTaskCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/changeBtnCanvas/dailyTaskCanvas') as mw.Canvas
		}
		return this.dailyTaskCanvas_Internal
	}
	private dailyTaskBtn_Internal: mw.StaleButton
	public get dailyTaskBtn(): mw.StaleButton {
		if(!this.dailyTaskBtn_Internal&&this.uiWidgetBase) {
			this.dailyTaskBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/changeBtnCanvas/dailyTaskCanvas/dailyTaskBtn') as mw.StaleButton
		}
		return this.dailyTaskBtn_Internal
	}
	private mImage_hotpoint_2_Internal: mw.Image
	public get mImage_hotpoint_2(): mw.Image {
		if(!this.mImage_hotpoint_2_Internal&&this.uiWidgetBase) {
			this.mImage_hotpoint_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/changeBtnCanvas/dailyTaskCanvas/mImage_hotpoint_2') as mw.Image
		}
		return this.mImage_hotpoint_2_Internal
	}
	private text_dailyTask_Internal: mw.TextBlock
	public get text_dailyTask(): mw.TextBlock {
		if(!this.text_dailyTask_Internal&&this.uiWidgetBase) {
			this.text_dailyTask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/changeBtnCanvas/dailyTaskCanvas/text_dailyTask') as mw.TextBlock
		}
		return this.text_dailyTask_Internal
	}
	private scroll_Task_Internal: mw.ScrollBox
	public get scroll_Task(): mw.ScrollBox {
		if(!this.scroll_Task_Internal&&this.uiWidgetBase) {
			this.scroll_Task_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/scroll_Task') as mw.ScrollBox
		}
		return this.scroll_Task_Internal
	}
	private content_Internal: mw.Canvas
	public get content(): mw.Canvas {
		if(!this.content_Internal&&this.uiWidgetBase) {
			this.content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/scroll_Task/content') as mw.Canvas
		}
		return this.content_Internal
	}



   protected onAwake() {
	   //设置能否每帧触发onUpdate
	   this.canUpdate = false;
	   this.layer = mw.UILayerBottom;
	   this.initButtons();
   }
   protected initButtons() {
	   //按钮添加点击
	   
	   this.mainTaskBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mainTaskBtn");
	   })
	   this.initLanguage(this.mainTaskBtn);
	   this.mainTaskBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.dailyTaskBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "dailyTaskBtn");
	   })
	   this.initLanguage(this.dailyTaskBtn);
	   this.dailyTaskBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   //按钮添加点击
	   
	   this.btn_Close.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btn_Close");
	   })
	   this.btn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.btn_Esc.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "btn_Esc");
	   })
	   this.btn_Esc.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.txt_title)
	   
	
	   this.initLanguage(this.taskName)
	   
	
	   this.initLanguage(this.taskCountdown)
	   
	
	   this.initLanguage(this.taskCountdownTime)
	   
	
	   this.initLanguage(this.text_Task)
	   
	
	   this.initLanguage(this.text_dailyTask)
	   
	
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
