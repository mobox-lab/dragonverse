
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Pet/PetHud.ui')
export default class PetHud_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mCanvas_pet_Internal: mw.Canvas
	public get mCanvas_pet(): mw.Canvas {
		if(!this.mCanvas_pet_Internal&&this.uiWidgetBase) {
			this.mCanvas_pet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_pet') as mw.Canvas
		}
		return this.mCanvas_pet_Internal
	}
	private mPic_petchoose_Internal: mw.Image
	public get mPic_petchoose(): mw.Image {
		if(!this.mPic_petchoose_Internal&&this.uiWidgetBase) {
			this.mPic_petchoose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_pet/mPic_petchoose') as mw.Image
		}
		return this.mPic_petchoose_Internal
	}
	private mBtn_pet_Internal: mw.Button
	public get mBtn_pet(): mw.Button {
		if(!this.mBtn_pet_Internal&&this.uiWidgetBase) {
			this.mBtn_pet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_pet/mBtn_pet') as mw.Button
		}
		return this.mBtn_pet_Internal
	}
	private mCanvas_collect_Internal: mw.Canvas
	public get mCanvas_collect(): mw.Canvas {
		if(!this.mCanvas_collect_Internal&&this.uiWidgetBase) {
			this.mCanvas_collect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_collect') as mw.Canvas
		}
		return this.mCanvas_collect_Internal
	}
	private mPic_collectchoose_Internal: mw.Image
	public get mPic_collectchoose(): mw.Image {
		if(!this.mPic_collectchoose_Internal&&this.uiWidgetBase) {
			this.mPic_collectchoose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_collect/mPic_collectchoose') as mw.Image
		}
		return this.mPic_collectchoose_Internal
	}
	private mBtn_collect_Internal: mw.Button
	public get mBtn_collect(): mw.Button {
		if(!this.mBtn_collect_Internal&&this.uiWidgetBase) {
			this.mBtn_collect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_collect/mBtn_collect') as mw.Button
		}
		return this.mBtn_collect_Internal
	}
	private mCanvas_achve_Internal: mw.Canvas
	public get mCanvas_achve(): mw.Canvas {
		if(!this.mCanvas_achve_Internal&&this.uiWidgetBase) {
			this.mCanvas_achve_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_achve') as mw.Canvas
		}
		return this.mCanvas_achve_Internal
	}
	private mPic_achve_Internal: mw.Image
	public get mPic_achve(): mw.Image {
		if(!this.mPic_achve_Internal&&this.uiWidgetBase) {
			this.mPic_achve_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_achve/mPic_achve') as mw.Image
		}
		return this.mPic_achve_Internal
	}
	private mBtn_achve_Internal: mw.Button
	public get mBtn_achve(): mw.Button {
		if(!this.mBtn_achve_Internal&&this.uiWidgetBase) {
			this.mBtn_achve_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_achve/mBtn_achve') as mw.Button
		}
		return this.mBtn_achve_Internal
	}
	private mCanvas_Trade_Internal: mw.Canvas
	public get mCanvas_Trade(): mw.Canvas {
		if(!this.mCanvas_Trade_Internal&&this.uiWidgetBase) {
			this.mCanvas_Trade_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_Trade') as mw.Canvas
		}
		return this.mCanvas_Trade_Internal
	}
	private mPic_TradeIcon_Internal: mw.Image
	public get mPic_TradeIcon(): mw.Image {
		if(!this.mPic_TradeIcon_Internal&&this.uiWidgetBase) {
			this.mPic_TradeIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_Trade/mPic_TradeIcon') as mw.Image
		}
		return this.mPic_TradeIcon_Internal
	}
	private mBtn_Trade_Internal: mw.Button
	public get mBtn_Trade(): mw.Button {
		if(!this.mBtn_Trade_Internal&&this.uiWidgetBase) {
			this.mBtn_Trade_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCanvas_Trade/mBtn_Trade') as mw.Button
		}
		return this.mBtn_Trade_Internal
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
		
		this.mBtn_pet.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_pet");
		})
		this.mBtn_pet.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_collect.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_collect");
		})
		this.mBtn_collect.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_achve.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_achve");
		})
		this.mBtn_achve.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Trade.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Trade");
		})
		this.mBtn_Trade.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

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
 