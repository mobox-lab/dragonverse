
 

 @UIBind('UI/ShareUI/card/Recorditem_UI.ui')
 export default class Recorditem_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private canvasrecord_Internal: mw.Canvas
	public get canvasrecord(): mw.Canvas {
		if(!this.canvasrecord_Internal&&this.uiWidgetBase) {
			this.canvasrecord_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvasrecord') as mw.Canvas
		}
		return this.canvasrecord_Internal
	}
	private img_troofy_Internal: mw.Image
	public get img_troofy(): mw.Image {
		if(!this.img_troofy_Internal&&this.uiWidgetBase) {
			this.img_troofy_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvasrecord/img_troofy') as mw.Image
		}
		return this.img_troofy_Internal
	}
	private txtgamename_Internal: mw.TextBlock
	public get txtgamename(): mw.TextBlock {
		if(!this.txtgamename_Internal&&this.uiWidgetBase) {
			this.txtgamename_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvasrecord/txtgamename') as mw.TextBlock
		}
		return this.txtgamename_Internal
	}
	private txtpasstime_Internal: mw.TextBlock
	public get txtpasstime(): mw.TextBlock {
		if(!this.txtpasstime_Internal&&this.uiWidgetBase) {
			this.txtpasstime_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvasrecord/txtpasstime') as mw.TextBlock
		}
		return this.txtpasstime_Internal
	}
	private btn_Internal: mw.Button
	public get btn(): mw.Button {
		if(!this.btn_Internal&&this.uiWidgetBase) {
			this.btn_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvasrecord/btn') as mw.Button
		}
		return this.btn_Internal
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
		
		this.btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Recorditem_UI_btn");
		})
		this.btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn.onPressed.add(() => {
			this.btn["preScale"] = this.btn.renderScale;
			this.btn.renderScale = Vector2.one.set(this.btn["preScale"]).multiply(1.1);
		})
		this.btn.onReleased.add(() => {
			this.btn.renderScale = this.btn["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.txtgamename)
		
	
		this.initLanguage(this.txtpasstime)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Recorditem_UI'] = Recorditem_UI_Generate;