
 

 @UIBind('UI/ShareUI/hall/Hall_Content_UI.ui')
 export default class Hall_Content_UI_Generate extends UIScript {
	 	private mCanvas_Chat_Internal: mw.Canvas
	public get mCanvas_Chat(): mw.Canvas {
		if(!this.mCanvas_Chat_Internal&&this.uiWidgetBase) {
			this.mCanvas_Chat_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Chat') as mw.Canvas
		}
		return this.mCanvas_Chat_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Chat/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private content_Internal: mw.Canvas
	public get content(): mw.Canvas {
		if(!this.content_Internal&&this.uiWidgetBase) {
			this.content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Chat/mScrollBox/content') as mw.Canvas
		}
		return this.content_Internal
	}
	private mBtnSkip_Internal: mw.Button
	public get mBtnSkip(): mw.Button {
		if(!this.mBtnSkip_Internal&&this.uiWidgetBase) {
			this.mBtnSkip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtnSkip') as mw.Button
		}
		return this.mBtnSkip_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mBtnSkip.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Hall_Content_UI_mBtnSkip");
		})
		this.mBtnSkip.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnSkip.onPressed.add(() => {
			this.mBtnSkip["preScale"] = this.mBtnSkip.renderScale;
			this.mBtnSkip.renderScale = Vector2.one.set(this.mBtnSkip["preScale"]).multiply(1.1);
		})
		this.mBtnSkip.onReleased.add(() => {
			this.mBtnSkip.renderScale = this.mBtnSkip["preScale"];
		})
		
	

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
 }

UIService['UI_Hall_Content_UI'] = Hall_Content_UI_Generate;