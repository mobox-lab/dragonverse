
 

 @UIBind('UI/ShareUI/DiffiRecord_UI.ui')
 export default class DiffiRecord_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private canvas_introduce_Internal: mw.Canvas
	public get canvas_introduce(): mw.Canvas {
		if(!this.canvas_introduce_Internal&&this.uiWidgetBase) {
			this.canvas_introduce_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_introduce') as mw.Canvas
		}
		return this.canvas_introduce_Internal
	}
	private btn_introduce_Internal: mw.StaleButton
	public get btn_introduce(): mw.StaleButton {
		if(!this.btn_introduce_Internal&&this.uiWidgetBase) {
			this.btn_introduce_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_introduce/btn_introduce') as mw.StaleButton
		}
		return this.btn_introduce_Internal
	}
	private containCav_Internal: mw.Canvas
	public get containCav(): mw.Canvas {
		if(!this.containCav_Internal&&this.uiWidgetBase) {
			this.containCav_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/ScrollBox/containCav') as mw.Canvas
		}
		return this.containCav_Internal
	}
	private canvas_records_Internal: mw.Canvas
	public get canvas_records(): mw.Canvas {
		if(!this.canvas_records_Internal&&this.uiWidgetBase) {
			this.canvas_records_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_records') as mw.Canvas
		}
		return this.canvas_records_Internal
	}
	private img_frame_Internal: mw.Image
	public get img_frame(): mw.Image {
		if(!this.img_frame_Internal&&this.uiWidgetBase) {
			this.img_frame_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_records/img_frame') as mw.Image
		}
		return this.img_frame_Internal
	}
	private text_records_Internal: mw.TextBlock
	public get text_records(): mw.TextBlock {
		if(!this.text_records_Internal&&this.uiWidgetBase) {
			this.text_records_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_records/text_records') as mw.TextBlock
		}
		return this.text_records_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btn_introduce.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "DiffiRecord_UI_btn_introduce");
		})
		this.initLanguage(this.btn_introduce);
		this.btn_introduce.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_introduce.onPressed.add(() => {
			this.btn_introduce["preScale"] = this.btn_introduce.renderScale;
			this.btn_introduce.renderScale = Vector2.one.set(this.btn_introduce["preScale"]).multiply(1.1);
		})
		this.btn_introduce.onReleased.add(() => {
			this.btn_introduce.renderScale = this.btn_introduce["preScale"];
		})
		
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_records)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_DiffiRecord_UI'] = DiffiRecord_UI_Generate;