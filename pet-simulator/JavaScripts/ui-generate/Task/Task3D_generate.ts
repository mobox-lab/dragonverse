
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Task/Task3D.ui')
export default class Task3D_Generate extends UIScript {
		private mCanvas_task_Internal: mw.Canvas
	public get mCanvas_task(): mw.Canvas {
		if(!this.mCanvas_task_Internal&&this.uiWidgetBase) {
			this.mCanvas_task_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_task') as mw.Canvas
		}
		return this.mCanvas_task_Internal
	}
	private mCanvas_TaskItem1_Internal: mw.Canvas
	public get mCanvas_TaskItem1(): mw.Canvas {
		if(!this.mCanvas_TaskItem1_Internal&&this.uiWidgetBase) {
			this.mCanvas_TaskItem1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_task/mCanvas_TaskItem1') as mw.Canvas
		}
		return this.mCanvas_TaskItem1_Internal
	}
	private mPic_startandstatus1_Internal: mw.Image
	public get mPic_startandstatus1(): mw.Image {
		if(!this.mPic_startandstatus1_Internal&&this.uiWidgetBase) {
			this.mPic_startandstatus1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_task/mCanvas_TaskItem1/mPic_startandstatus1') as mw.Image
		}
		return this.mPic_startandstatus1_Internal
	}
	private mText_mission1_Internal: mw.TextBlock
	public get mText_mission1(): mw.TextBlock {
		if(!this.mText_mission1_Internal&&this.uiWidgetBase) {
			this.mText_mission1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_task/mCanvas_TaskItem1/mText_mission1') as mw.TextBlock
		}
		return this.mText_mission1_Internal
	}
	private mCanvas_TaskItem2_Internal: mw.Canvas
	public get mCanvas_TaskItem2(): mw.Canvas {
		if(!this.mCanvas_TaskItem2_Internal&&this.uiWidgetBase) {
			this.mCanvas_TaskItem2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_task/mCanvas_TaskItem2') as mw.Canvas
		}
		return this.mCanvas_TaskItem2_Internal
	}
	private mPic_startandstatus2_Internal: mw.Image
	public get mPic_startandstatus2(): mw.Image {
		if(!this.mPic_startandstatus2_Internal&&this.uiWidgetBase) {
			this.mPic_startandstatus2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_task/mCanvas_TaskItem2/mPic_startandstatus2') as mw.Image
		}
		return this.mPic_startandstatus2_Internal
	}
	private mText_mission2_Internal: mw.TextBlock
	public get mText_mission2(): mw.TextBlock {
		if(!this.mText_mission2_Internal&&this.uiWidgetBase) {
			this.mText_mission2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_task/mCanvas_TaskItem2/mText_mission2') as mw.TextBlock
		}
		return this.mText_mission2_Internal
	}
	private mCanvas_TaskItem3_Internal: mw.Canvas
	public get mCanvas_TaskItem3(): mw.Canvas {
		if(!this.mCanvas_TaskItem3_Internal&&this.uiWidgetBase) {
			this.mCanvas_TaskItem3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_task/mCanvas_TaskItem3') as mw.Canvas
		}
		return this.mCanvas_TaskItem3_Internal
	}
	private mPic_startandstatus3_Internal: mw.Image
	public get mPic_startandstatus3(): mw.Image {
		if(!this.mPic_startandstatus3_Internal&&this.uiWidgetBase) {
			this.mPic_startandstatus3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_task/mCanvas_TaskItem3/mPic_startandstatus3') as mw.Image
		}
		return this.mPic_startandstatus3_Internal
	}
	private mText_mission3_Internal: mw.TextBlock
	public get mText_mission3(): mw.TextBlock {
		if(!this.mText_mission3_Internal&&this.uiWidgetBase) {
			this.mText_mission3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_task/mCanvas_TaskItem3/mText_mission3') as mw.TextBlock
		}
		return this.mText_mission3_Internal
	}
	private mCanvas_shop_Internal: mw.Canvas
	public get mCanvas_shop(): mw.Canvas {
		if(!this.mCanvas_shop_Internal&&this.uiWidgetBase) {
			this.mCanvas_shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_shop') as mw.Canvas
		}
		return this.mCanvas_shop_Internal
	}
	private mBtn_shop_Internal: mw.Button
	public get mBtn_shop(): mw.Button {
		if(!this.mBtn_shop_Internal&&this.uiWidgetBase) {
			this.mBtn_shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_shop/mBtn_shop') as mw.Button
		}
		return this.mBtn_shop_Internal
	}



	public showAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
	public hideAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}

	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mBtn_shop.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_shop");
		})
		this.mBtn_shop.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_mission1)
		
	
		this.initLanguage(this.mText_mission2)
		
	
		this.initLanguage(this.mText_mission3)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_shop/TextBlock_2") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

    public show(...param): void {
		Event.dispatchToLocal("ShowUIAction_37", this);
		this.showAction.call(this);
		mw.UIService.showUI(this, this.layer, ...param);
	}

    public hide(): void {
		Event.dispatchToLocal("HideUIAction_37", this);
		this.hideAction.call(this);
		mw.UIService.hideUI(this);
	}
}
 