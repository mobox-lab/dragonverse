
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Catching/ControlUI.ui')
export default class ControlUI_Generate extends UIScript {
		private mCanvas_1_Internal: mw.Canvas
	public get mCanvas_1(): mw.Canvas {
		if(!this.mCanvas_1_Internal&&this.uiWidgetBase) {
			this.mCanvas_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_1') as mw.Canvas
		}
		return this.mCanvas_1_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mButton_Up_Internal: mw.Button
	public get mButton_Up(): mw.Button {
		if(!this.mButton_Up_Internal&&this.uiWidgetBase) {
			this.mButton_Up_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mButton_Up') as mw.Button
		}
		return this.mButton_Up_Internal
	}
	private mButton_Left_Internal: mw.Button
	public get mButton_Left(): mw.Button {
		if(!this.mButton_Left_Internal&&this.uiWidgetBase) {
			this.mButton_Left_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mButton_Left') as mw.Button
		}
		return this.mButton_Left_Internal
	}
	private mButton_Right_Internal: mw.Button
	public get mButton_Right(): mw.Button {
		if(!this.mButton_Right_Internal&&this.uiWidgetBase) {
			this.mButton_Right_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mButton_Right') as mw.Button
		}
		return this.mButton_Right_Internal
	}
	private mButton_Down_Internal: mw.Button
	public get mButton_Down(): mw.Button {
		if(!this.mButton_Down_Internal&&this.uiWidgetBase) {
			this.mButton_Down_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mButton_Down') as mw.Button
		}
		return this.mButton_Down_Internal
	}
	private mButton_Catch_Internal: mw.Button
	public get mButton_Catch(): mw.Button {
		if(!this.mButton_Catch_Internal&&this.uiWidgetBase) {
			this.mButton_Catch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mButton_Catch') as mw.Button
		}
		return this.mButton_Catch_Internal
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
		
		this.mButton_Up.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Up");
		})
		this.mButton_Up.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_Left.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Left");
		})
		this.mButton_Left.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_Right.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Right");
		})
		this.mButton_Right.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_Down.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Down");
		})
		this.mButton_Down.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_Catch.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Catch");
		})
		this.mButton_Catch.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		

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
 