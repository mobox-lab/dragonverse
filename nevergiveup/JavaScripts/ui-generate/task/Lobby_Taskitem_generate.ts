
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/task/Lobby_Taskitem.ui')
export default class Lobby_Taskitem_Generate extends UIScript {
		private mCanvas_Taskitem_Internal: mw.Canvas
	public get mCanvas_Taskitem(): mw.Canvas {
		if(!this.mCanvas_Taskitem_Internal&&this.uiWidgetBase) {
			this.mCanvas_Taskitem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Taskitem') as mw.Canvas
		}
		return this.mCanvas_Taskitem_Internal
	}
	private mImage_TaskBG_Internal: mw.Image
	public get mImage_TaskBG(): mw.Image {
		if(!this.mImage_TaskBG_Internal&&this.uiWidgetBase) {
			this.mImage_TaskBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Taskitem/mImage_TaskBG') as mw.Image
		}
		return this.mImage_TaskBG_Internal
	}
	private mTextBlock_TaskName_Internal: mw.TextBlock
	public get mTextBlock_TaskName(): mw.TextBlock {
		if(!this.mTextBlock_TaskName_Internal&&this.uiWidgetBase) {
			this.mTextBlock_TaskName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Taskitem/mTextBlock_TaskName') as mw.TextBlock
		}
		return this.mTextBlock_TaskName_Internal
	}
	private mTextBlock_TaskSchedule_Internal: mw.TextBlock
	public get mTextBlock_TaskSchedule(): mw.TextBlock {
		if(!this.mTextBlock_TaskSchedule_Internal&&this.uiWidgetBase) {
			this.mTextBlock_TaskSchedule_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Taskitem/mTextBlock_TaskSchedule') as mw.TextBlock
		}
		return this.mTextBlock_TaskSchedule_Internal
	}
	private mTextBlock_Finish_Internal: mw.TextBlock
	public get mTextBlock_Finish(): mw.TextBlock {
		if(!this.mTextBlock_Finish_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Finish_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Taskitem/mTextBlock_Finish') as mw.TextBlock
		}
		return this.mTextBlock_Finish_Internal
	}
	private mTextBlock_TaskContent_Internal: mw.TextBlock
	public get mTextBlock_TaskContent(): mw.TextBlock {
		if(!this.mTextBlock_TaskContent_Internal&&this.uiWidgetBase) {
			this.mTextBlock_TaskContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Taskitem/mTextBlock_TaskContent') as mw.TextBlock
		}
		return this.mTextBlock_TaskContent_Internal
	}
	private mButton_OpenUI_Internal: mw.Button
	public get mButton_OpenUI(): mw.Button {
		if(!this.mButton_OpenUI_Internal&&this.uiWidgetBase) {
			this.mButton_OpenUI_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Taskitem/mButton_OpenUI') as mw.Button
		}
		return this.mButton_OpenUI_Internal
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
	   
	   this.mButton_OpenUI.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mButton_OpenUI");
	   })
	   this.mButton_OpenUI.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.mTextBlock_TaskName)
	   
	
	   this.initLanguage(this.mTextBlock_TaskSchedule)
	   
	
	   this.initLanguage(this.mTextBlock_Finish)
	   
	
	   this.initLanguage(this.mTextBlock_TaskContent)
	   
	
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
