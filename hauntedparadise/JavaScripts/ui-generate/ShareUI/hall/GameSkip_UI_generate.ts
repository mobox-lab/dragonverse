
 

 @UIBind('UI/ShareUI/hall/GameSkip_UI.ui')
 export default class GameSkip_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private canvas_frame_Internal: mw.Canvas
	public get canvas_frame(): mw.Canvas {
		if(!this.canvas_frame_Internal&&this.uiWidgetBase) {
			this.canvas_frame_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_frame') as mw.Canvas
		}
		return this.canvas_frame_Internal
	}
	private img_frame_Internal: mw.Image
	public get img_frame(): mw.Image {
		if(!this.img_frame_Internal&&this.uiWidgetBase) {
			this.img_frame_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_frame/img_frame') as mw.Image
		}
		return this.img_frame_Internal
	}
	private mTextBlock_Internal: mw.TextBlock
	public get mTextBlock(): mw.TextBlock {
		if(!this.mTextBlock_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_frame/mTextBlock') as mw.TextBlock
		}
		return this.mTextBlock_Internal
	}
	private btn_cancel_Internal: mw.StaleButton
	public get btn_cancel(): mw.StaleButton {
		if(!this.btn_cancel_Internal&&this.uiWidgetBase) {
			this.btn_cancel_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_frame/btn_cancel') as mw.StaleButton
		}
		return this.btn_cancel_Internal
	}
	private btn_sure_Internal: mw.StaleButton
	public get btn_sure(): mw.StaleButton {
		if(!this.btn_sure_Internal&&this.uiWidgetBase) {
			this.btn_sure_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_frame/btn_sure') as mw.StaleButton
		}
		return this.btn_sure_Internal
	}
	private mTextBlock_1_Internal: mw.TextBlock
	public get mTextBlock_1(): mw.TextBlock {
		if(!this.mTextBlock_1_Internal&&this.uiWidgetBase) {
			this.mTextBlock_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_frame/mTextBlock_1') as mw.TextBlock
		}
		return this.mTextBlock_1_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btn_cancel.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GameSkip_UI_btn_cancel");
		})
		this.initLanguage(this.btn_cancel);
		this.btn_cancel.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_cancel.onPressed.add(() => {
			this.btn_cancel["preScale"] = this.btn_cancel.renderScale;
			this.btn_cancel.renderScale = Vector2.one.set(this.btn_cancel["preScale"]).multiply(1.1);
		})
		this.btn_cancel.onReleased.add(() => {
			this.btn_cancel.renderScale = this.btn_cancel["preScale"];
		})
		
		
	
		this.btn_sure.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GameSkip_UI_btn_sure");
		})
		this.initLanguage(this.btn_sure);
		this.btn_sure.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_sure.onPressed.add(() => {
			this.btn_sure["preScale"] = this.btn_sure.renderScale;
			this.btn_sure.renderScale = Vector2.one.set(this.btn_sure["preScale"]).multiply(1.1);
		})
		this.btn_sure.onReleased.add(() => {
			this.btn_sure.renderScale = this.btn_sure["preScale"];
		})
		
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock)
		
	
		this.initLanguage(this.mTextBlock_1)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_GameSkip_UI'] = GameSkip_UI_Generate;