
 

 @UIBind('UI/ShareUI/Story_UI.ui')
 export default class Story_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private canvas_bg_Internal: mw.Canvas
	public get canvas_bg(): mw.Canvas {
		if(!this.canvas_bg_Internal&&this.uiWidgetBase) {
			this.canvas_bg_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_bg') as mw.Canvas
		}
		return this.canvas_bg_Internal
	}
	private img_frame_Internal: mw.Image
	public get img_frame(): mw.Image {
		if(!this.img_frame_Internal&&this.uiWidgetBase) {
			this.img_frame_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_bg/img_frame') as mw.Image
		}
		return this.img_frame_Internal
	}
	private text_story_Internal: mw.TextBlock
	public get text_story(): mw.TextBlock {
		if(!this.text_story_Internal&&this.uiWidgetBase) {
			this.text_story_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_bg/text_story') as mw.TextBlock
		}
		return this.text_story_Internal
	}
	private text_Title_Internal: mw.TextBlock
	public get text_Title(): mw.TextBlock {
		if(!this.text_Title_Internal&&this.uiWidgetBase) {
			this.text_Title_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_bg/text_Title') as mw.TextBlock
		}
		return this.text_Title_Internal
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
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_story)
		
	
		this.initLanguage(this.text_Title)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Story_UI'] = Story_UI_Generate;