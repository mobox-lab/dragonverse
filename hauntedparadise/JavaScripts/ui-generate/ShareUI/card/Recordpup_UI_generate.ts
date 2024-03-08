
 

 @UIBind('UI/ShareUI/card/Recordpup_UI.ui')
 export default class Recordpup_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private canvas_troofy_Internal: mw.Canvas
	public get canvas_troofy(): mw.Canvas {
		if(!this.canvas_troofy_Internal&&this.uiWidgetBase) {
			this.canvas_troofy_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_troofy') as mw.Canvas
		}
		return this.canvas_troofy_Internal
	}
	private img_shadow_Internal: mw.Image
	public get img_shadow(): mw.Image {
		if(!this.img_shadow_Internal&&this.uiWidgetBase) {
			this.img_shadow_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_troofy/img_shadow') as mw.Image
		}
		return this.img_shadow_Internal
	}
	private img_trophy1_Internal: mw.Image
	public get img_trophy1(): mw.Image {
		if(!this.img_trophy1_Internal&&this.uiWidgetBase) {
			this.img_trophy1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_troofy/img_trophy1') as mw.Image
		}
		return this.img_trophy1_Internal
	}
	private img_trophy2_Internal: mw.Image
	public get img_trophy2(): mw.Image {
		if(!this.img_trophy2_Internal&&this.uiWidgetBase) {
			this.img_trophy2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_troofy/img_trophy2') as mw.Image
		}
		return this.img_trophy2_Internal
	}
	private txt_time_Internal: mw.TextBlock
	public get txt_time(): mw.TextBlock {
		if(!this.txt_time_Internal&&this.uiWidgetBase) {
			this.txt_time_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_troofy/txt_time') as mw.TextBlock
		}
		return this.txt_time_Internal
	}
	private txt_diffi_Internal: mw.TextBlock
	public get txt_diffi(): mw.TextBlock {
		if(!this.txt_diffi_Internal&&this.uiWidgetBase) {
			this.txt_diffi_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_troofy/txt_diffi') as mw.TextBlock
		}
		return this.txt_diffi_Internal
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
		
		this.initLanguage(this.txt_time)
		
	
		this.initLanguage(this.txt_diffi)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Recordpup_UI'] = Recordpup_UI_Generate;