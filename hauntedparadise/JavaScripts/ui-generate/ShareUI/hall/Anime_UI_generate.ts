
 

 @UIBind('UI/ShareUI/hall/Anime_UI.ui')
 export default class Anime_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mStaleButton_Skip_Internal: mw.StaleButton
	public get mStaleButton_Skip(): mw.StaleButton {
		if(!this.mStaleButton_Skip_Internal&&this.uiWidgetBase) {
			this.mStaleButton_Skip_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas/mStaleButton_Skip') as mw.StaleButton
		}
		return this.mStaleButton_Skip_Internal
	}
	private image_1_Internal: mw.Image
	public get image_1(): mw.Image {
		if(!this.image_1_Internal&&this.uiWidgetBase) {
			this.image_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas/image_1') as mw.Image
		}
		return this.image_1_Internal
	}
	private mCanvas_Subtitle_Internal: mw.Canvas
	public get mCanvas_Subtitle(): mw.Canvas {
		if(!this.mCanvas_Subtitle_Internal&&this.uiWidgetBase) {
			this.mCanvas_Subtitle_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Subtitle') as mw.Canvas
		}
		return this.mCanvas_Subtitle_Internal
	}
	private mText_Subtitle_Internal: mw.TextBlock
	public get mText_Subtitle(): mw.TextBlock {
		if(!this.mText_Subtitle_Internal&&this.uiWidgetBase) {
			this.mText_Subtitle_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Subtitle/mText_Subtitle') as mw.TextBlock
		}
		return this.mText_Subtitle_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mStaleButton_Skip.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Anime_UI_mStaleButton_Skip");
		})
		this.initLanguage(this.mStaleButton_Skip);
		this.mStaleButton_Skip.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mStaleButton_Skip.onPressed.add(() => {
			this.mStaleButton_Skip["preScale"] = this.mStaleButton_Skip.renderScale;
			this.mStaleButton_Skip.renderScale = Vector2.one.set(this.mStaleButton_Skip["preScale"]).multiply(1.1);
		})
		this.mStaleButton_Skip.onReleased.add(() => {
			this.mStaleButton_Skip.renderScale = this.mStaleButton_Skip["preScale"];
		})
		
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Subtitle)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Anime_UI'] = Anime_UI_Generate;