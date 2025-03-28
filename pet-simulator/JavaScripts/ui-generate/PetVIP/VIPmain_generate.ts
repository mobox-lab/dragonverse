﻿
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/PetVIP/VIPmain.ui')
export default class VIPmain_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mCanvas_1_Internal: mw.Canvas
	public get mCanvas_1(): mw.Canvas {
		if(!this.mCanvas_1_Internal&&this.uiWidgetBase) {
			this.mCanvas_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScrollBox/mCanvas_1') as mw.Canvas
		}
		return this.mCanvas_1_Internal
	}
	private mStar_Text_Internal: mw.TextBlock
	public get mStar_Text(): mw.TextBlock {
		if(!this.mStar_Text_Internal&&this.uiWidgetBase) {
			this.mStar_Text_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mStar_Text') as mw.TextBlock
		}
		return this.mStar_Text_Internal
	}
	private mBtn_Buy_Internal: mw.Button
	public get mBtn_Buy(): mw.Button {
		if(!this.mBtn_Buy_Internal&&this.uiWidgetBase) {
			this.mBtn_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBtn_Buy') as mw.Button
		}
		return this.mBtn_Buy_Internal
	}
	private mBtn_Unlock_Internal: mw.Button
	public get mBtn_Unlock(): mw.Button {
		if(!this.mBtn_Unlock_Internal&&this.uiWidgetBase) {
			this.mBtn_Unlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBtn_Unlock') as mw.Button
		}
		return this.mBtn_Unlock_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
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
		
		this.mBtn_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Buy");
		})
		this.mBtn_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Unlock.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Unlock");
		})
		this.mBtn_Unlock.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mStar_Text)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mBtn_Buy/TextBlock_3") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/mBtn_Unlock/TextBlock_4") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock_1") as any);
		
	

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
 