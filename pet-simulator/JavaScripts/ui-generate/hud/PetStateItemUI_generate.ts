
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/hud/PetStateItemUI.ui')
export default class PetStateItemUI_Generate extends UIScript {
		private itemCanvas_Internal: mw.Canvas
	public get itemCanvas(): mw.Canvas {
		if(!this.itemCanvas_Internal&&this.uiWidgetBase) {
			this.itemCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/itemCanvas') as mw.Canvas
		}
		return this.itemCanvas_Internal
	}
	private bgLineImg_Internal: mw.Image
	public get bgLineImg(): mw.Image {
		if(!this.bgLineImg_Internal&&this.uiWidgetBase) {
			this.bgLineImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/itemCanvas/bgLineImg') as mw.Image
		}
		return this.bgLineImg_Internal
	}
	private bgImg_Internal: mw.Image
	public get bgImg(): mw.Image {
		if(!this.bgImg_Internal&&this.uiWidgetBase) {
			this.bgImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/itemCanvas/bgImg') as mw.Image
		}
		return this.bgImg_Internal
	}
	private petImg_Internal: mw.Image
	public get petImg(): mw.Image {
		if(!this.petImg_Internal&&this.uiWidgetBase) {
			this.petImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/itemCanvas/petImg') as mw.Image
		}
		return this.petImg_Internal
	}
	private attackImg_Internal: mw.Image
	public get attackImg(): mw.Image {
		if(!this.attackImg_Internal&&this.uiWidgetBase) {
			this.attackImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/itemCanvas/attackImg') as mw.Image
		}
		return this.attackImg_Internal
	}
	private imgLoveRainbow_Internal: mw.Image
	public get imgLoveRainbow(): mw.Image {
		if(!this.imgLoveRainbow_Internal&&this.uiWidgetBase) {
			this.imgLoveRainbow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/itemCanvas/imgLoveRainbow') as mw.Image
		}
		return this.imgLoveRainbow_Internal
	}
	private imgEnhance_Internal: mw.Image
	public get imgEnhance(): mw.Image {
		if(!this.imgEnhance_Internal&&this.uiWidgetBase) {
			this.imgEnhance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/itemCanvas/imgEnhance') as mw.Image
		}
		return this.imgEnhance_Internal
	}
	private textEnhancenum_Internal: mw.TextBlock
	public get textEnhancenum(): mw.TextBlock {
		if(!this.textEnhancenum_Internal&&this.uiWidgetBase) {
			this.textEnhancenum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/itemCanvas/imgEnhance/textEnhancenum') as mw.TextBlock
		}
		return this.textEnhancenum_Internal
	}
	private textEnhancenumber_Internal: mw.TextBlock
	public get textEnhancenumber(): mw.TextBlock {
		if(!this.textEnhancenumber_Internal&&this.uiWidgetBase) {
			this.textEnhancenumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/itemCanvas/textEnhancenumber') as mw.TextBlock
		}
		return this.textEnhancenumber_Internal
	}
	private mBtn_Pet_Internal: mw.Button
	public get mBtn_Pet(): mw.Button {
		if(!this.mBtn_Pet_Internal&&this.uiWidgetBase) {
			this.mBtn_Pet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Pet') as mw.Button
		}
		return this.mBtn_Pet_Internal
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
		
		this.mBtn_Pet.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Pet");
		})
		this.mBtn_Pet.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.textEnhancenum)
		
	
		this.initLanguage(this.textEnhancenumber)
		
	
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
 