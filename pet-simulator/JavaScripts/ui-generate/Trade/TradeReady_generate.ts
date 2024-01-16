
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Trade/TradeReady.ui')
export default class TradeReady_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mImage_Rbox_Internal: mw.Image
	public get mImage_Rbox(): mw.Image {
		if(!this.mImage_Rbox_Internal&&this.uiWidgetBase) {
			this.mImage_Rbox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImage_Rbox') as mw.Image
		}
		return this.mImage_Rbox_Internal
	}
	private mImage_Lbox_Internal: mw.Image
	public get mImage_Lbox(): mw.Image {
		if(!this.mImage_Lbox_Internal&&this.uiWidgetBase) {
			this.mImage_Lbox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImage_Lbox') as mw.Image
		}
		return this.mImage_Lbox_Internal
	}
	private mMyScrollBox_Internal: mw.ScrollBox
	public get mMyScrollBox(): mw.ScrollBox {
		if(!this.mMyScrollBox_Internal&&this.uiWidgetBase) {
			this.mMyScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mMyScrollBox') as mw.ScrollBox
		}
		return this.mMyScrollBox_Internal
	}
	private mCanvas_SelectPet_Internal: mw.Canvas
	public get mCanvas_SelectPet(): mw.Canvas {
		if(!this.mCanvas_SelectPet_Internal&&this.uiWidgetBase) {
			this.mCanvas_SelectPet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mMyScrollBox/mCanvas_SelectPet') as mw.Canvas
		}
		return this.mCanvas_SelectPet_Internal
	}
	private mText_already_Internal: mw.TextBlock
	public get mText_already(): mw.TextBlock {
		if(!this.mText_already_Internal&&this.uiWidgetBase) {
			this.mText_already_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_already') as mw.TextBlock
		}
		return this.mText_already_Internal
	}
	private mImage_DMbox_Internal: mw.Image
	public get mImage_DMbox(): mw.Image {
		if(!this.mImage_DMbox_Internal&&this.uiWidgetBase) {
			this.mImage_DMbox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mImage_DMbox') as mw.Image
		}
		return this.mImage_DMbox_Internal
	}
	private mInput_Diamond_Internal: mw.InputBox
	public get mInput_Diamond(): mw.InputBox {
		if(!this.mInput_Diamond_Internal&&this.uiWidgetBase) {
			this.mInput_Diamond_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mInput_Diamond') as mw.InputBox
		}
		return this.mInput_Diamond_Internal
	}
	private mText_Information_Internal: mw.TextBlock
	public get mText_Information(): mw.TextBlock {
		if(!this.mText_Information_Internal&&this.uiWidgetBase) {
			this.mText_Information_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Information') as mw.TextBlock
		}
		return this.mText_Information_Internal
	}
	private mOtherScrollBox_Internal: mw.ScrollBox
	public get mOtherScrollBox(): mw.ScrollBox {
		if(!this.mOtherScrollBox_Internal&&this.uiWidgetBase) {
			this.mOtherScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mOtherScrollBox') as mw.ScrollBox
		}
		return this.mOtherScrollBox_Internal
	}
	private mCanvas_ReceivePet_Internal: mw.Canvas
	public get mCanvas_ReceivePet(): mw.Canvas {
		if(!this.mCanvas_ReceivePet_Internal&&this.uiWidgetBase) {
			this.mCanvas_ReceivePet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mOtherScrollBox/mCanvas_ReceivePet') as mw.Canvas
		}
		return this.mCanvas_ReceivePet_Internal
	}
	private mText_Otherready_Internal: mw.TextBlock
	public get mText_Otherready(): mw.TextBlock {
		if(!this.mText_Otherready_Internal&&this.uiWidgetBase) {
			this.mText_Otherready_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Otherready') as mw.TextBlock
		}
		return this.mText_Otherready_Internal
	}
	private mText_ReceiveDM_Internal: mw.TextBlock
	public get mText_ReceiveDM(): mw.TextBlock {
		if(!this.mText_ReceiveDM_Internal&&this.uiWidgetBase) {
			this.mText_ReceiveDM_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas_2/mText_ReceiveDM') as mw.TextBlock
		}
		return this.mText_ReceiveDM_Internal
	}
	private mText_UserName_Internal: mw.TextBlock
	public get mText_UserName(): mw.TextBlock {
		if(!this.mText_UserName_Internal&&this.uiWidgetBase) {
			this.mText_UserName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_UserName') as mw.TextBlock
		}
		return this.mText_UserName_Internal
	}
	private mBtn_Cancel_Internal: mw.StaleButton
	public get mBtn_Cancel(): mw.StaleButton {
		if(!this.mBtn_Cancel_Internal&&this.uiWidgetBase) {
			this.mBtn_Cancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBtn_Cancel') as mw.StaleButton
		}
		return this.mBtn_Cancel_Internal
	}
	private mBtn_Ready_Internal: mw.StaleButton
	public get mBtn_Ready(): mw.StaleButton {
		if(!this.mBtn_Ready_Internal&&this.uiWidgetBase) {
			this.mBtn_Ready_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBtn_Ready') as mw.StaleButton
		}
		return this.mBtn_Ready_Internal
	}
	private mText_Count_Internal: mw.TextBlock
	public get mText_Count(): mw.TextBlock {
		if(!this.mText_Count_Internal&&this.uiWidgetBase) {
			this.mText_Count_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Count') as mw.TextBlock
		}
		return this.mText_Count_Internal
	}
	private mText_CountDown_Internal: mw.TextBlock
	public get mText_CountDown(): mw.TextBlock {
		if(!this.mText_CountDown_Internal&&this.uiWidgetBase) {
			this.mText_CountDown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_CountDown') as mw.TextBlock
		}
		return this.mText_CountDown_Internal
	}
	private mText_MyName_Internal: mw.TextBlock
	public get mText_MyName(): mw.TextBlock {
		if(!this.mText_MyName_Internal&&this.uiWidgetBase) {
			this.mText_MyName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_MyName') as mw.TextBlock
		}
		return this.mText_MyName_Internal
	}
	private mMSgCanvas_Internal: mw.Canvas
	public get mMSgCanvas(): mw.Canvas {
		if(!this.mMSgCanvas_Internal&&this.uiWidgetBase) {
			this.mMSgCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mMSgCanvas') as mw.Canvas
		}
		return this.mMSgCanvas_Internal
	}
	private mImage_LJT_Internal: mw.Image
	public get mImage_LJT(): mw.Image {
		if(!this.mImage_LJT_Internal&&this.uiWidgetBase) {
			this.mImage_LJT_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mMSgCanvas/mImage_LJT') as mw.Image
		}
		return this.mImage_LJT_Internal
	}
	private mImage_RJT_Internal: mw.Image
	public get mImage_RJT(): mw.Image {
		if(!this.mImage_RJT_Internal&&this.uiWidgetBase) {
			this.mImage_RJT_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mMSgCanvas/mImage_RJT') as mw.Image
		}
		return this.mImage_RJT_Internal
	}
	private mBtn_Chat_Internal: mw.Button
	public get mBtn_Chat(): mw.Button {
		if(!this.mBtn_Chat_Internal&&this.uiWidgetBase) {
			this.mBtn_Chat_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBtn_Chat') as mw.Button
		}
		return this.mBtn_Chat_Internal
	}
	private mImage_Red_Internal: mw.Image
	public get mImage_Red(): mw.Image {
		if(!this.mImage_Red_Internal&&this.uiWidgetBase) {
			this.mImage_Red_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImage_Red') as mw.Image
		}
		return this.mImage_Red_Internal
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
		
		this.mBtn_Cancel.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Cancel");
		})
		this.initLanguage(this.mBtn_Cancel);
		this.mBtn_Cancel.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Ready.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Ready");
		})
		this.initLanguage(this.mBtn_Ready);
		this.mBtn_Ready.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mBtn_Chat.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Chat");
		})
		this.mBtn_Chat.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_already)
		
	
		this.initLanguage(this.mText_Information)
		
	
		this.initLanguage(this.mText_Otherready)
		
	
		this.initLanguage(this.mText_ReceiveDM)
		
	
		this.initLanguage(this.mText_UserName)
		
	
		this.initLanguage(this.mText_Count)
		
	
		this.initLanguage(this.mText_CountDown)
		
	
		this.initLanguage(this.mText_MyName)
		
	
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
 