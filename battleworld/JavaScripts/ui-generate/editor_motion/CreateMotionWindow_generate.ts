
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/editor_motion/CreateMotionWindow.ui
 */

 

 @UIBind('UI/editor_motion/CreateMotionWindow.ui')
 export default class CreateMotionWindow_Generate extends UIScript {
	 	private bg_Internal: mw.Button
	public get bg(): mw.Button {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/bg') as mw.Button
		}
		return this.bg_Internal
	}
	private mBox_Internal: mw.Canvas
	public get mBox(): mw.Canvas {
		if(!this.mBox_Internal&&this.uiWidgetBase) {
			this.mBox_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBox') as mw.Canvas
		}
		return this.mBox_Internal
	}
	private btn_create_Internal: mw.StaleButton
	public get btn_create(): mw.StaleButton {
		if(!this.btn_create_Internal&&this.uiWidgetBase) {
			this.btn_create_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBox/btn_create') as mw.StaleButton
		}
		return this.btn_create_Internal
	}
	private input_name_Internal: mw.InputBox
	public get input_name(): mw.InputBox {
		if(!this.input_name_Internal&&this.uiWidgetBase) {
			this.input_name_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBox/input_name') as mw.InputBox
		}
		return this.input_name_Internal
	}
	private input_frame_count_Internal: mw.InputBox
	public get input_frame_count(): mw.InputBox {
		if(!this.input_frame_count_Internal&&this.uiWidgetBase) {
			this.input_frame_count_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBox/input_frame_count') as mw.InputBox
		}
		return this.input_frame_count_Internal
	}
	private mDropList_Internal: mw.Canvas
	public get mDropList(): mw.Canvas {
		if(!this.mDropList_Internal&&this.uiWidgetBase) {
			this.mDropList_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBox/mDropList') as mw.Canvas
		}
		return this.mDropList_Internal
	}
	private mDropBtn_Internal: mw.StaleButton
	public get mDropBtn(): mw.StaleButton {
		if(!this.mDropBtn_Internal&&this.uiWidgetBase) {
			this.mDropBtn_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBox/mDropList/mDropBtn') as mw.StaleButton
		}
		return this.mDropBtn_Internal
	}
	private mDropScroll_Internal: mw.ScrollBox
	public get mDropScroll(): mw.ScrollBox {
		if(!this.mDropScroll_Internal&&this.uiWidgetBase) {
			this.mDropScroll_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBox/mDropList/mDropScroll') as mw.ScrollBox
		}
		return this.mDropScroll_Internal
	}
	private mDropContent_Internal: mw.Canvas
	public get mDropContent(): mw.Canvas {
		if(!this.mDropContent_Internal&&this.uiWidgetBase) {
			this.mDropContent_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBox/mDropList/mDropScroll/mDropContent') as mw.Canvas
		}
		return this.mDropContent_Internal
	}
	private mConfigId_Internal: mw.InputBox
	public get mConfigId(): mw.InputBox {
		if(!this.mConfigId_Internal&&this.uiWidgetBase) {
			this.mConfigId_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBox/mConfigId') as mw.InputBox
		}
		return this.mConfigId_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btn_create.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_create");
		})
		this.initLanguage(this.btn_create);
		//this.btn_create.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mDropBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mDropBtn");
		})
		this.initLanguage(this.mDropBtn);
		//this.mDropBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.bg.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "bg");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/mBox/MWTextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/mBox/MWTextBlock_1_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/mBox/MWTextBlock_1_1_1") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 