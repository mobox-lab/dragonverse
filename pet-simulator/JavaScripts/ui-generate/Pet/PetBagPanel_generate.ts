
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Pet/PetBagPanel.ui')
export default class PetBagPanel_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mListCanvas_Internal: mw.Canvas
	public get mListCanvas(): mw.Canvas {
		if(!this.mListCanvas_Internal&&this.uiWidgetBase) {
			this.mListCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/ScrollBox/mListCanvas') as mw.Canvas
		}
		return this.mListCanvas_Internal
	}
	private mTextBlock_Num_Internal: mw.TextBlock
	public get mTextBlock_Num(): mw.TextBlock {
		if(!this.mTextBlock_Num_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mTextBlock_Num') as mw.TextBlock
		}
		return this.mTextBlock_Num_Internal
	}
	private mCloseBtn_Internal: mw.Button
	public get mCloseBtn(): mw.Button {
		if(!this.mCloseBtn_Internal&&this.uiWidgetBase) {
			this.mCloseBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mCloseBtn') as mw.Button
		}
		return this.mCloseBtn_Internal
	}
	private mReNameBtn_Internal: mw.Button
	public get mReNameBtn(): mw.Button {
		if(!this.mReNameBtn_Internal&&this.uiWidgetBase) {
			this.mReNameBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/mReNameBtn') as mw.Button
		}
		return this.mReNameBtn_Internal
	}
	private mDelBtn_Internal: mw.Button
	public get mDelBtn(): mw.Button {
		if(!this.mDelBtn_Internal&&this.uiWidgetBase) {
			this.mDelBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/mDelBtn') as mw.Button
		}
		return this.mDelBtn_Internal
	}
	private mSureDelBtn_Internal: mw.StaleButton
	public get mSureDelBtn(): mw.StaleButton {
		if(!this.mSureDelBtn_Internal&&this.uiWidgetBase) {
			this.mSureDelBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/mSureDelBtn') as mw.StaleButton
		}
		return this.mSureDelBtn_Internal
	}
	private mEquipBtn_Internal: mw.StaleButton
	public get mEquipBtn(): mw.StaleButton {
		if(!this.mEquipBtn_Internal&&this.uiWidgetBase) {
			this.mEquipBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/mEquipBtn') as mw.StaleButton
		}
		return this.mEquipBtn_Internal
	}
	private mEquip_Internal: mw.TextBlock
	public get mEquip(): mw.TextBlock {
		if(!this.mEquip_Internal&&this.uiWidgetBase) {
			this.mEquip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/mEquip') as mw.TextBlock
		}
		return this.mEquip_Internal
	}
	private mEquipImg_Internal: mw.Image
	public get mEquipImg(): mw.Image {
		if(!this.mEquipImg_Internal&&this.uiWidgetBase) {
			this.mEquipImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/mEquipImg') as mw.Image
		}
		return this.mEquipImg_Internal
	}
	private mTextBlock_Petequipnum_Internal: mw.TextBlock
	public get mTextBlock_Petequipnum(): mw.TextBlock {
		if(!this.mTextBlock_Petequipnum_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Petequipnum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/mTextBlock_Petequipnum') as mw.TextBlock
		}
		return this.mTextBlock_Petequipnum_Internal
	}
	private mSureDelBtn_Cancel_Internal: mw.StaleButton
	public get mSureDelBtn_Cancel(): mw.StaleButton {
		if(!this.mSureDelBtn_Cancel_Internal&&this.uiWidgetBase) {
			this.mSureDelBtn_Cancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/mSureDelBtn_Cancel') as mw.StaleButton
		}
		return this.mSureDelBtn_Cancel_Internal
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
		
		this.mSureDelBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSureDelBtn");
		})
		this.initLanguage(this.mSureDelBtn);
		this.mSureDelBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mEquipBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mEquipBtn");
		})
		this.initLanguage(this.mEquipBtn);
		this.mEquipBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mSureDelBtn_Cancel.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSureDelBtn_Cancel");
		})
		this.initLanguage(this.mSureDelBtn_Cancel);
		this.mSureDelBtn_Cancel.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mCloseBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseBtn");
		})
		this.mCloseBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mReNameBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mReNameBtn");
		})
		this.mReNameBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mDelBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mDelBtn");
		})
		this.mDelBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock_Num)
		
	
		this.initLanguage(this.mEquip)
		
	
		this.initLanguage(this.mTextBlock_Petequipnum)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock_Top") as any);
		
	

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
 