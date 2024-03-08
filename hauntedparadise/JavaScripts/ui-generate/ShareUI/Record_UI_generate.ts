
 

 @UIBind('UI/ShareUI/Record_UI.ui')
 export default class Record_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private canvas_ed_Internal: mw.Canvas
	public get canvas_ed(): mw.Canvas {
		if(!this.canvas_ed_Internal&&this.uiWidgetBase) {
			this.canvas_ed_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_ed') as mw.Canvas
		}
		return this.canvas_ed_Internal
	}
	private text_ed1_Internal: mw.TextBlock
	public get text_ed1(): mw.TextBlock {
		if(!this.text_ed1_Internal&&this.uiWidgetBase) {
			this.text_ed1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_ed/text_ed1') as mw.TextBlock
		}
		return this.text_ed1_Internal
	}
	private canvas_ed1_Internal: mw.Canvas
	public get canvas_ed1(): mw.Canvas {
		if(!this.canvas_ed1_Internal&&this.uiWidgetBase) {
			this.canvas_ed1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_ed/canvas_ed1') as mw.Canvas
		}
		return this.canvas_ed1_Internal
	}
	private canvas_trophy1_1_Internal: mw.Canvas
	public get canvas_trophy1_1(): mw.Canvas {
		if(!this.canvas_trophy1_1_Internal&&this.uiWidgetBase) {
			this.canvas_trophy1_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_ed/canvas_ed1/canvas_trophy1_1') as mw.Canvas
		}
		return this.canvas_trophy1_1_Internal
	}
	private canvas_trophy1_2_Internal: mw.Canvas
	public get canvas_trophy1_2(): mw.Canvas {
		if(!this.canvas_trophy1_2_Internal&&this.uiWidgetBase) {
			this.canvas_trophy1_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_ed/canvas_ed1/canvas_trophy1_2') as mw.Canvas
		}
		return this.canvas_trophy1_2_Internal
	}
	private canvas_trophy1_3_Internal: mw.Canvas
	public get canvas_trophy1_3(): mw.Canvas {
		if(!this.canvas_trophy1_3_Internal&&this.uiWidgetBase) {
			this.canvas_trophy1_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_ed/canvas_ed1/canvas_trophy1_3') as mw.Canvas
		}
		return this.canvas_trophy1_3_Internal
	}
	private canvas_trophy1_4_Internal: mw.Canvas
	public get canvas_trophy1_4(): mw.Canvas {
		if(!this.canvas_trophy1_4_Internal&&this.uiWidgetBase) {
			this.canvas_trophy1_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_ed/canvas_ed1/canvas_trophy1_4') as mw.Canvas
		}
		return this.canvas_trophy1_4_Internal
	}
	private canvas_trophy1_5_Internal: mw.Canvas
	public get canvas_trophy1_5(): mw.Canvas {
		if(!this.canvas_trophy1_5_Internal&&this.uiWidgetBase) {
			this.canvas_trophy1_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_ed/canvas_ed1/canvas_trophy1_5') as mw.Canvas
		}
		return this.canvas_trophy1_5_Internal
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
		
		this.initLanguage(this.text_ed1)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("mRootCanvas/canvas_ed/canvas_ed1/canvas_trophy1_1/Diff_Txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mRootCanvas/canvas_ed/canvas_ed1/canvas_trophy1_1/Time_Txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mRootCanvas/canvas_ed/canvas_ed1/canvas_trophy1_2/Diff_Txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mRootCanvas/canvas_ed/canvas_ed1/canvas_trophy1_2/Time_Txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mRootCanvas/canvas_ed/canvas_ed1/canvas_trophy1_3/Diff_Txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mRootCanvas/canvas_ed/canvas_ed1/canvas_trophy1_3/Time_Txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mRootCanvas/canvas_ed/canvas_ed1/canvas_trophy1_4/Diff_Txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mRootCanvas/canvas_ed/canvas_ed1/canvas_trophy1_4/Time_Txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mRootCanvas/canvas_ed/canvas_ed1/canvas_trophy1_5/Diff_Txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mRootCanvas/canvas_ed/canvas_ed1/canvas_trophy1_5/Time_Txt") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Record_UI'] = Record_UI_Generate;