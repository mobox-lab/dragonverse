
 

 @UIBind('UI/ShareUI/hall/Hall_titleground3_UI.ui')
 export default class Hall_titleground3_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private canvas_Internal: mw.Canvas
	public get canvas(): mw.Canvas {
		if(!this.canvas_Internal&&this.uiWidgetBase) {
			this.canvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas') as mw.Canvas
		}
		return this.canvas_Internal
	}
	private img_1_1_4_5_6_Internal: mw.Image
	public get img_1_1_4_5_6(): mw.Image {
		if(!this.img_1_1_4_5_6_Internal&&this.uiWidgetBase) {
			this.img_1_1_4_5_6_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas/img_1_1_4_5_6') as mw.Image
		}
		return this.img_1_1_4_5_6_Internal
	}
	private img_1_1_4_5_6_1_Internal: mw.Image
	public get img_1_1_4_5_6_1(): mw.Image {
		if(!this.img_1_1_4_5_6_1_Internal&&this.uiWidgetBase) {
			this.img_1_1_4_5_6_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas/img_1_1_4_5_6_1') as mw.Image
		}
		return this.img_1_1_4_5_6_1_Internal
	}
	private img_1_1_4_5_6_2_Internal: mw.Image
	public get img_1_1_4_5_6_2(): mw.Image {
		if(!this.img_1_1_4_5_6_2_Internal&&this.uiWidgetBase) {
			this.img_1_1_4_5_6_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas/img_1_1_4_5_6_2') as mw.Image
		}
		return this.img_1_1_4_5_6_2_Internal
	}
	private img_1_1_4_5_6_3_Internal: mw.Image
	public get img_1_1_4_5_6_3(): mw.Image {
		if(!this.img_1_1_4_5_6_3_Internal&&this.uiWidgetBase) {
			this.img_1_1_4_5_6_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas/img_1_1_4_5_6_3') as mw.Image
		}
		return this.img_1_1_4_5_6_3_Internal
	}
	private img_1_1_4_5_6_4_Internal: mw.Image
	public get img_1_1_4_5_6_4(): mw.Image {
		if(!this.img_1_1_4_5_6_4_Internal&&this.uiWidgetBase) {
			this.img_1_1_4_5_6_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas/img_1_1_4_5_6_4') as mw.Image
		}
		return this.img_1_1_4_5_6_4_Internal
	}
	private img_1_1_4_5_6_5_Internal: mw.Image
	public get img_1_1_4_5_6_5(): mw.Image {
		if(!this.img_1_1_4_5_6_5_Internal&&this.uiWidgetBase) {
			this.img_1_1_4_5_6_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas/img_1_1_4_5_6_5') as mw.Image
		}
		return this.img_1_1_4_5_6_5_Internal
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
		
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Hall_titleground3_UI'] = Hall_titleground3_UI_Generate;