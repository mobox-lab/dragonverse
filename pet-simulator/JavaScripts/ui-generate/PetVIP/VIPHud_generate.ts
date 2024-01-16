
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/PetVIP/VIPHud.ui')
export default class VIPHud_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mCanvas_3_Internal: mw.Canvas
	public get mCanvas_3(): mw.Canvas {
		if(!this.mCanvas_3_Internal&&this.uiWidgetBase) {
			this.mCanvas_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_3') as mw.Canvas
		}
		return this.mCanvas_3_Internal
	}
	private mStarText_3_Internal: mw.TextBlock
	public get mStarText_3(): mw.TextBlock {
		if(!this.mStarText_3_Internal&&this.uiWidgetBase) {
			this.mStarText_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_3/mStarText_3') as mw.TextBlock
		}
		return this.mStarText_3_Internal
	}
	private mCanvas_2_Internal: mw.Canvas
	public get mCanvas_2(): mw.Canvas {
		if(!this.mCanvas_2_Internal&&this.uiWidgetBase) {
			this.mCanvas_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_2') as mw.Canvas
		}
		return this.mCanvas_2_Internal
	}
	private mStarText_2_Internal: mw.TextBlock
	public get mStarText_2(): mw.TextBlock {
		if(!this.mStarText_2_Internal&&this.uiWidgetBase) {
			this.mStarText_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_2/mStarText_2') as mw.TextBlock
		}
		return this.mStarText_2_Internal
	}
	private mCanvas_1_Internal: mw.Canvas
	public get mCanvas_1(): mw.Canvas {
		if(!this.mCanvas_1_Internal&&this.uiWidgetBase) {
			this.mCanvas_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_1') as mw.Canvas
		}
		return this.mCanvas_1_Internal
	}
	private mStarText_1_Internal: mw.TextBlock
	public get mStarText_1(): mw.TextBlock {
		if(!this.mStarText_1_Internal&&this.uiWidgetBase) {
			this.mStarText_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_1/mStarText_1') as mw.TextBlock
		}
		return this.mStarText_1_Internal
	}
	private mBtn_Main_Internal: mw.Button
	public get mBtn_Main(): mw.Button {
		if(!this.mBtn_Main_Internal&&this.uiWidgetBase) {
			this.mBtn_Main_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBtn_Main') as mw.Button
		}
		return this.mBtn_Main_Internal
	}
	private mCanvas_vip_Internal: mw.Canvas
	public get mCanvas_vip(): mw.Canvas {
		if(!this.mCanvas_vip_Internal&&this.uiWidgetBase) {
			this.mCanvas_vip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_vip') as mw.Canvas
		}
		return this.mCanvas_vip_Internal
	}
	private mBtn_Vip_Internal: mw.Button
	public get mBtn_Vip(): mw.Button {
		if(!this.mBtn_Vip_Internal&&this.uiWidgetBase) {
			this.mBtn_Vip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_vip/mBtn_Vip') as mw.Button
		}
		return this.mBtn_Vip_Internal
	}
	private mBtn_Flush_Internal: mw.Button
	public get mBtn_Flush(): mw.Button {
		if(!this.mBtn_Flush_Internal&&this.uiWidgetBase) {
			this.mBtn_Flush_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_vip/mBtn_Flush') as mw.Button
		}
		return this.mBtn_Flush_Internal
	}
	private mTextBlock_Internal: mw.TextBlock
	public get mTextBlock(): mw.TextBlock {
		if(!this.mTextBlock_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_vip/mBtn_Flush/mTextBlock') as mw.TextBlock
		}
		return this.mTextBlock_Internal
	}
	private mPoint_Internal: mw.Image
	public get mPoint(): mw.Image {
		if(!this.mPoint_Internal&&this.uiWidgetBase) {
			this.mPoint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_vip/mPoint') as mw.Image
		}
		return this.mPoint_Internal
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
		
		this.mBtn_Main.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Main");
		})
		this.mBtn_Main.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Vip.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Vip");
		})
		this.mBtn_Vip.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Flush.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Flush");
		})
		this.mBtn_Flush.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mStarText_3)
		
	
		this.initLanguage(this.mStarText_2)
		
	
		this.initLanguage(this.mStarText_1)
		
	
		this.initLanguage(this.mTextBlock)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mCanvas_vip/TextBlock_1") as any);
		
	

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
 