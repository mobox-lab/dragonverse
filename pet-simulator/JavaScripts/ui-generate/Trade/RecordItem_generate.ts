
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Trade/RecordItem.ui')
export default class RecordItem_Generate extends UIScript {
		private mBtn_RecordDetail_Internal: mw.Button
	public get mBtn_RecordDetail(): mw.Button {
		if(!this.mBtn_RecordDetail_Internal&&this.uiWidgetBase) {
			this.mBtn_RecordDetail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_RecordDetail') as mw.Button
		}
		return this.mBtn_RecordDetail_Internal
	}
	private mText_Count_Internal: mw.TextBlock
	public get mText_Count(): mw.TextBlock {
		if(!this.mText_Count_Internal&&this.uiWidgetBase) {
			this.mText_Count_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_RecordDetail/mText_Count') as mw.TextBlock
		}
		return this.mText_Count_Internal
	}
	private mText_Time_Internal: mw.TextBlock
	public get mText_Time(): mw.TextBlock {
		if(!this.mText_Time_Internal&&this.uiWidgetBase) {
			this.mText_Time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_RecordDetail/mText_Time') as mw.TextBlock
		}
		return this.mText_Time_Internal
	}
	private mBtn_Good_Internal: mw.Button
	public get mBtn_Good(): mw.Button {
		if(!this.mBtn_Good_Internal&&this.uiWidgetBase) {
			this.mBtn_Good_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Good') as mw.Button
		}
		return this.mBtn_Good_Internal
	}
	private mBtn_Bad_Internal: mw.Button
	public get mBtn_Bad(): mw.Button {
		if(!this.mBtn_Bad_Internal&&this.uiWidgetBase) {
			this.mBtn_Bad_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Bad') as mw.Button
		}
		return this.mBtn_Bad_Internal
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
		
		this.mBtn_RecordDetail.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_RecordDetail");
		})
		this.mBtn_RecordDetail.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Good.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Good");
		})
		this.mBtn_Good.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Bad.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Bad");
		})
		this.mBtn_Bad.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Count)
		
	
		this.initLanguage(this.mText_Time)
		
	
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
 