
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Pet/Pet_item.ui')
export default class Pet_item_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mPic_Equip_Internal: mw.Image
	public get mPic_Equip(): mw.Image {
		if(!this.mPic_Equip_Internal&&this.uiWidgetBase) {
			this.mPic_Equip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mPic_Equip') as mw.Image
		}
		return this.mPic_Equip_Internal
	}
	private mPic_Equip_3_Internal: mw.Image
	public get mPic_Equip_3(): mw.Image {
		if(!this.mPic_Equip_3_Internal&&this.uiWidgetBase) {
			this.mPic_Equip_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mPic_Equip_3') as mw.Image
		}
		return this.mPic_Equip_3_Internal
	}
	private mPic_Peticon_Internal: mw.Image
	public get mPic_Peticon(): mw.Image {
		if(!this.mPic_Peticon_Internal&&this.uiWidgetBase) {
			this.mPic_Peticon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_Peticon') as mw.Image
		}
		return this.mPic_Peticon_Internal
	}
	private mText_Value_Internal: mw.TextBlock
	public get mText_Value(): mw.TextBlock {
		if(!this.mText_Value_Internal&&this.uiWidgetBase) {
			this.mText_Value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Value') as mw.TextBlock
		}
		return this.mText_Value_Internal
	}
	private mPic_Rainbow_Internal: mw.Image
	public get mPic_Rainbow(): mw.Image {
		if(!this.mPic_Rainbow_Internal&&this.uiWidgetBase) {
			this.mPic_Rainbow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_Rainbow') as mw.Image
		}
		return this.mPic_Rainbow_Internal
	}
	private mPic_Heart_Internal: mw.Image
	public get mPic_Heart(): mw.Image {
		if(!this.mPic_Heart_Internal&&this.uiWidgetBase) {
			this.mPic_Heart_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_Heart') as mw.Image
		}
		return this.mPic_Heart_Internal
	}
	private mPic_star3_Internal: mw.Image
	public get mPic_star3(): mw.Image {
		if(!this.mPic_star3_Internal&&this.uiWidgetBase) {
			this.mPic_star3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_star3') as mw.Image
		}
		return this.mPic_star3_Internal
	}
	private mPic_star2_Internal: mw.Image
	public get mPic_star2(): mw.Image {
		if(!this.mPic_star2_Internal&&this.uiWidgetBase) {
			this.mPic_star2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_star2') as mw.Image
		}
		return this.mPic_star2_Internal
	}
	private mPic_star1_Internal: mw.Image
	public get mPic_star1(): mw.Image {
		if(!this.mPic_star1_Internal&&this.uiWidgetBase) {
			this.mPic_star1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_star1') as mw.Image
		}
		return this.mPic_star1_Internal
	}
	private mPic_delete_Internal: mw.Image
	public get mPic_delete(): mw.Image {
		if(!this.mPic_delete_Internal&&this.uiWidgetBase) {
			this.mPic_delete_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_delete') as mw.Image
		}
		return this.mPic_delete_Internal
	}
	private mPic_Effect_Internal: mw.Image
	public get mPic_Effect(): mw.Image {
		if(!this.mPic_Effect_Internal&&this.uiWidgetBase) {
			this.mPic_Effect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_Effect') as mw.Image
		}
		return this.mPic_Effect_Internal
	}
	private mPic_Equip_2_Internal: mw.Image
	public get mPic_Equip_2(): mw.Image {
		if(!this.mPic_Equip_2_Internal&&this.uiWidgetBase) {
			this.mPic_Equip_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_Equip_2') as mw.Image
		}
		return this.mPic_Equip_2_Internal
	}
	private mButton_Equip_Internal: mw.Button
	public get mButton_Equip(): mw.Button {
		if(!this.mButton_Equip_Internal&&this.uiWidgetBase) {
			this.mButton_Equip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Equip') as mw.Button
		}
		return this.mButton_Equip_Internal
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
		
		this.mButton_Equip.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Equip");
		})
		this.mButton_Equip.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Value)
		
	
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
 