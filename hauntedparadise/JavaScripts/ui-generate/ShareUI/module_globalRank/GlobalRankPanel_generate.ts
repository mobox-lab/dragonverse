
 

 @UIBind('UI/ShareUI/module_globalRank/GlobalRankPanel.ui')
 export default class GlobalRankPanel_Generate extends UIScript {
	 	private mTitle_txt_Internal: mw.TextBlock
	public get mTitle_txt(): mw.TextBlock {
		if(!this.mTitle_txt_Internal&&this.uiWidgetBase) {
			this.mTitle_txt_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTitle_txt') as mw.TextBlock
		}
		return this.mTitle_txt_Internal
	}
	private mCanvas_Self_Internal: mw.Canvas
	public get mCanvas_Self(): mw.Canvas {
		if(!this.mCanvas_Self_Internal&&this.uiWidgetBase) {
			this.mCanvas_Self_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Self') as mw.Canvas
		}
		return this.mCanvas_Self_Internal
	}
	private rankItemScrollBox_Internal: mw.ScrollBox
	public get rankItemScrollBox(): mw.ScrollBox {
		if(!this.rankItemScrollBox_Internal&&this.uiWidgetBase) {
			this.rankItemScrollBox_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/rankItemScrollBox') as mw.ScrollBox
		}
		return this.rankItemScrollBox_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/rankItemScrollBox/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private canvas_nobody_Internal: mw.Canvas
	public get canvas_nobody(): mw.Canvas {
		if(!this.canvas_nobody_Internal&&this.uiWidgetBase) {
			this.canvas_nobody_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/canvas_nobody') as mw.Canvas
		}
		return this.canvas_nobody_Internal
	}
	private mBtn_Tab1_Internal: mw.Button
	public get mBtn_Tab1(): mw.Button {
		if(!this.mBtn_Tab1_Internal&&this.uiWidgetBase) {
			this.mBtn_Tab1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_Tab1') as mw.Button
		}
		return this.mBtn_Tab1_Internal
	}
	private textBlock1_Internal: mw.TextBlock
	public get textBlock1(): mw.TextBlock {
		if(!this.textBlock1_Internal&&this.uiWidgetBase) {
			this.textBlock1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_Tab1/textBlock1') as mw.TextBlock
		}
		return this.textBlock1_Internal
	}
	private mBtn_Tab2_Internal: mw.Button
	public get mBtn_Tab2(): mw.Button {
		if(!this.mBtn_Tab2_Internal&&this.uiWidgetBase) {
			this.mBtn_Tab2_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_Tab2') as mw.Button
		}
		return this.mBtn_Tab2_Internal
	}
	private textBlock2_Internal: mw.TextBlock
	public get textBlock2(): mw.TextBlock {
		if(!this.textBlock2_Internal&&this.uiWidgetBase) {
			this.textBlock2_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_Tab2/textBlock2') as mw.TextBlock
		}
		return this.textBlock2_Internal
	}
	private mBtn_Tab3_Internal: mw.Button
	public get mBtn_Tab3(): mw.Button {
		if(!this.mBtn_Tab3_Internal&&this.uiWidgetBase) {
			this.mBtn_Tab3_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_Tab3') as mw.Button
		}
		return this.mBtn_Tab3_Internal
	}
	private textBlock3_Internal: mw.TextBlock
	public get textBlock3(): mw.TextBlock {
		if(!this.textBlock3_Internal&&this.uiWidgetBase) {
			this.textBlock3_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_Tab3/textBlock3') as mw.TextBlock
		}
		return this.textBlock3_Internal
	}
	private mBtn_Tab4_Internal: mw.Button
	public get mBtn_Tab4(): mw.Button {
		if(!this.mBtn_Tab4_Internal&&this.uiWidgetBase) {
			this.mBtn_Tab4_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_Tab4') as mw.Button
		}
		return this.mBtn_Tab4_Internal
	}
	private textBlock4_Internal: mw.TextBlock
	public get textBlock4(): mw.TextBlock {
		if(!this.textBlock4_Internal&&this.uiWidgetBase) {
			this.textBlock4_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_Tab4/textBlock4') as mw.TextBlock
		}
		return this.textBlock4_Internal
	}
	private mBtn_Tab5_Internal: mw.Button
	public get mBtn_Tab5(): mw.Button {
		if(!this.mBtn_Tab5_Internal&&this.uiWidgetBase) {
			this.mBtn_Tab5_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_Tab5') as mw.Button
		}
		return this.mBtn_Tab5_Internal
	}
	private textBlock5_Internal: mw.TextBlock
	public get textBlock5(): mw.TextBlock {
		if(!this.textBlock5_Internal&&this.uiWidgetBase) {
			this.textBlock5_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_Tab5/textBlock5') as mw.TextBlock
		}
		return this.textBlock5_Internal
	}
	private mClose_btn_Internal: mw.StaleButton
	public get mClose_btn(): mw.StaleButton {
		if(!this.mClose_btn_Internal&&this.uiWidgetBase) {
			this.mClose_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mClose_btn') as mw.StaleButton
		}
		return this.mClose_btn_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mClose_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GlobalRankPanel_mClose_btn");
		})
		this.initLanguage(this.mClose_btn);
		this.mClose_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mClose_btn.onPressed.add(() => {
			this.mClose_btn["preScale"] = this.mClose_btn.renderScale;
			this.mClose_btn.renderScale = Vector2.one.set(this.mClose_btn["preScale"]).multiply(1.1);
		})
		this.mClose_btn.onReleased.add(() => {
			this.mClose_btn.renderScale = this.mClose_btn["preScale"];
		})
		
		
	
		//按钮添加点击
		
		this.mBtn_Tab1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GlobalRankPanel_mBtn_Tab1");
		})
		this.mBtn_Tab1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn_Tab1.onPressed.add(() => {
			this.mBtn_Tab1["preScale"] = this.mBtn_Tab1.renderScale;
			this.mBtn_Tab1.renderScale = Vector2.one.set(this.mBtn_Tab1["preScale"]).multiply(1.1);
		})
		this.mBtn_Tab1.onReleased.add(() => {
			this.mBtn_Tab1.renderScale = this.mBtn_Tab1["preScale"];
		})
		
	
		this.mBtn_Tab2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GlobalRankPanel_mBtn_Tab2");
		})
		this.mBtn_Tab2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn_Tab2.onPressed.add(() => {
			this.mBtn_Tab2["preScale"] = this.mBtn_Tab2.renderScale;
			this.mBtn_Tab2.renderScale = Vector2.one.set(this.mBtn_Tab2["preScale"]).multiply(1.1);
		})
		this.mBtn_Tab2.onReleased.add(() => {
			this.mBtn_Tab2.renderScale = this.mBtn_Tab2["preScale"];
		})
		
	
		this.mBtn_Tab3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GlobalRankPanel_mBtn_Tab3");
		})
		this.mBtn_Tab3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn_Tab3.onPressed.add(() => {
			this.mBtn_Tab3["preScale"] = this.mBtn_Tab3.renderScale;
			this.mBtn_Tab3.renderScale = Vector2.one.set(this.mBtn_Tab3["preScale"]).multiply(1.1);
		})
		this.mBtn_Tab3.onReleased.add(() => {
			this.mBtn_Tab3.renderScale = this.mBtn_Tab3["preScale"];
		})
		
	
		this.mBtn_Tab4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GlobalRankPanel_mBtn_Tab4");
		})
		this.mBtn_Tab4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn_Tab4.onPressed.add(() => {
			this.mBtn_Tab4["preScale"] = this.mBtn_Tab4.renderScale;
			this.mBtn_Tab4.renderScale = Vector2.one.set(this.mBtn_Tab4["preScale"]).multiply(1.1);
		})
		this.mBtn_Tab4.onReleased.add(() => {
			this.mBtn_Tab4.renderScale = this.mBtn_Tab4["preScale"];
		})
		
	
		this.mBtn_Tab5.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GlobalRankPanel_mBtn_Tab5");
		})
		this.mBtn_Tab5.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn_Tab5.onPressed.add(() => {
			this.mBtn_Tab5["preScale"] = this.mBtn_Tab5.renderScale;
			this.mBtn_Tab5.renderScale = Vector2.one.set(this.mBtn_Tab5["preScale"]).multiply(1.1);
		})
		this.mBtn_Tab5.onReleased.add(() => {
			this.mBtn_Tab5.renderScale = this.mBtn_Tab5["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTitle_txt)
		
	
		this.initLanguage(this.textBlock1)
		
	
		this.initLanguage(this.textBlock2)
		
	
		this.initLanguage(this.textBlock3)
		
	
		this.initLanguage(this.textBlock4)
		
	
		this.initLanguage(this.textBlock5)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/MainView/canvas_nobody/TextBlock") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_GlobalRankPanel'] = GlobalRankPanel_Generate;