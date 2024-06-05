
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Setting_Main.ui')
export default class Setting_Main_Generate extends UIScript {
		private mCanvas_Setting_Internal: mw.Canvas
	public get mCanvas_Setting(): mw.Canvas {
		if(!this.mCanvas_Setting_Internal&&this.uiWidgetBase) {
			this.mCanvas_Setting_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting') as mw.Canvas
		}
		return this.mCanvas_Setting_Internal
	}
	private canvas_Setting_Internal: mw.Canvas
	public get canvas_Setting(): mw.Canvas {
		if(!this.canvas_Setting_Internal&&this.uiWidgetBase) {
			this.canvas_Setting_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting') as mw.Canvas
		}
		return this.canvas_Setting_Internal
	}
	private mCanvas_Sound_Internal: mw.Canvas
	public get mCanvas_Sound(): mw.Canvas {
		if(!this.mCanvas_Sound_Internal&&this.uiWidgetBase) {
			this.mCanvas_Sound_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound') as mw.Canvas
		}
		return this.mCanvas_Sound_Internal
	}
	private mCanvas_CloseSound_Internal: mw.Canvas
	public get mCanvas_CloseSound(): mw.Canvas {
		if(!this.mCanvas_CloseSound_Internal&&this.uiWidgetBase) {
			this.mCanvas_CloseSound_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_CloseSound') as mw.Canvas
		}
		return this.mCanvas_CloseSound_Internal
	}
	private mBtn_CloseSound_Internal: mw.StaleButton
	public get mBtn_CloseSound(): mw.StaleButton {
		if(!this.mBtn_CloseSound_Internal&&this.uiWidgetBase) {
			this.mBtn_CloseSound_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_CloseSound/mBtn_CloseSound') as mw.StaleButton
		}
		return this.mBtn_CloseSound_Internal
	}
	private mCanvas_Pic_Internal: mw.Canvas
	public get mCanvas_Pic(): mw.Canvas {
		if(!this.mCanvas_Pic_Internal&&this.uiWidgetBase) {
			this.mCanvas_Pic_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic') as mw.Canvas
		}
		return this.mCanvas_Pic_Internal
	}
	private mCanvas_Control_Internal: mw.Canvas
	public get mCanvas_Control(): mw.Canvas {
		if(!this.mCanvas_Control_Internal&&this.uiWidgetBase) {
			this.mCanvas_Control_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control') as mw.Canvas
		}
		return this.mCanvas_Control_Internal
	}
	private mCanvas_cameraspeed_Internal: mw.Canvas
	public get mCanvas_cameraspeed(): mw.Canvas {
		if(!this.mCanvas_cameraspeed_Internal&&this.uiWidgetBase) {
			this.mCanvas_cameraspeed_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed') as mw.Canvas
		}
		return this.mCanvas_cameraspeed_Internal
	}
	private mScroll_speedInputScale_Internal: mw.ProgressBar
	public get mScroll_speedInputScale(): mw.ProgressBar {
		if(!this.mScroll_speedInputScale_Internal&&this.uiWidgetBase) {
			this.mScroll_speedInputScale_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed/mScroll_speedInputScale') as mw.ProgressBar
		}
		return this.mScroll_speedInputScale_Internal
	}
	private mBtn_Back_Internal: mw.StaleButton
	public get mBtn_Back(): mw.StaleButton {
		if(!this.mBtn_Back_Internal&&this.uiWidgetBase) {
			this.mBtn_Back_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/mBtn_Back') as mw.StaleButton
		}
		return this.mBtn_Back_Internal
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
		
		this.mBtn_CloseSound.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_CloseSound");
		})
		this.initLanguage(this.mBtn_CloseSound);
		this.mBtn_CloseSound.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Back");
		})
		this.initLanguage(this.mBtn_Back);
		this.mBtn_Back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/Text_Sound") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_CloseSound/Text_CloseSound") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/Text_Pic") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/Text_Control") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed/Text_Speed") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed/Text_Low") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed/Text_High") as any);
		
	

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
 