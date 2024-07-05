
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/Setting/Setting_Main.ui
 */

 

 @UIBind('UI/Setting/Setting_Main.ui')
 export default class Setting_Main_Generate extends UIScript {
	 	private mCanvas_Setting_Internal: mw.Canvas
	public get mCanvas_Setting(): mw.Canvas {
		if(!this.mCanvas_Setting_Internal&&this.uiWidgetBase) {
			this.mCanvas_Setting_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting') as mw.Canvas
		}
		return this.mCanvas_Setting_Internal
	}
	private canvas_Setting_Internal: mw.Canvas
	public get canvas_Setting(): mw.Canvas {
		if(!this.canvas_Setting_Internal&&this.uiWidgetBase) {
			this.canvas_Setting_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting') as mw.Canvas
		}
		return this.canvas_Setting_Internal
	}
	private mCanvas_Sound_Internal: mw.Canvas
	public get mCanvas_Sound(): mw.Canvas {
		if(!this.mCanvas_Sound_Internal&&this.uiWidgetBase) {
			this.mCanvas_Sound_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound') as mw.Canvas
		}
		return this.mCanvas_Sound_Internal
	}
	private mCanvas_CloseSound_Internal: mw.Canvas
	public get mCanvas_CloseSound(): mw.Canvas {
		if(!this.mCanvas_CloseSound_Internal&&this.uiWidgetBase) {
			this.mCanvas_CloseSound_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_CloseSound') as mw.Canvas
		}
		return this.mCanvas_CloseSound_Internal
	}
	private mBtn_CloseSound_Internal: mw.StaleButton
	public get mBtn_CloseSound(): mw.StaleButton {
		if(!this.mBtn_CloseSound_Internal&&this.uiWidgetBase) {
			this.mBtn_CloseSound_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_CloseSound/mBtn_CloseSound') as mw.StaleButton
		}
		return this.mBtn_CloseSound_Internal
	}
	private mCanvas_BGM_Internal: mw.Canvas
	public get mCanvas_BGM(): mw.Canvas {
		if(!this.mCanvas_BGM_Internal&&this.uiWidgetBase) {
			this.mCanvas_BGM_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_BGM') as mw.Canvas
		}
		return this.mCanvas_BGM_Internal
	}
	private mScroll_BGM_Internal: mw.ProgressBar
	public get mScroll_BGM(): mw.ProgressBar {
		if(!this.mScroll_BGM_Internal&&this.uiWidgetBase) {
			this.mScroll_BGM_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_BGM/mScroll_BGM') as mw.ProgressBar
		}
		return this.mScroll_BGM_Internal
	}
	private mCanvas_Voice_Internal: mw.Canvas
	public get mCanvas_Voice(): mw.Canvas {
		if(!this.mCanvas_Voice_Internal&&this.uiWidgetBase) {
			this.mCanvas_Voice_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_Voice') as mw.Canvas
		}
		return this.mCanvas_Voice_Internal
	}
	private mScroll_Voice_Internal: mw.ProgressBar
	public get mScroll_Voice(): mw.ProgressBar {
		if(!this.mScroll_Voice_Internal&&this.uiWidgetBase) {
			this.mScroll_Voice_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_Voice/mScroll_Voice') as mw.ProgressBar
		}
		return this.mScroll_Voice_Internal
	}
	private mCanvas_Pic_Internal: mw.Canvas
	public get mCanvas_Pic(): mw.Canvas {
		if(!this.mCanvas_Pic_Internal&&this.uiWidgetBase) {
			this.mCanvas_Pic_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic') as mw.Canvas
		}
		return this.mCanvas_Pic_Internal
	}
	private mCanvas_GPU_Internal: mw.Canvas
	public get mCanvas_GPU(): mw.Canvas {
		if(!this.mCanvas_GPU_Internal&&this.uiWidgetBase) {
			this.mCanvas_GPU_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_GPU') as mw.Canvas
		}
		return this.mCanvas_GPU_Internal
	}
	private mBtn_Return_GPU_Internal: mw.Button
	public get mBtn_Return_GPU(): mw.Button {
		if(!this.mBtn_Return_GPU_Internal&&this.uiWidgetBase) {
			this.mBtn_Return_GPU_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_GPU/mBtn_Return_GPU') as mw.Button
		}
		return this.mBtn_Return_GPU_Internal
	}
	private mScroll_GPU_Internal: mw.ProgressBar
	public get mScroll_GPU(): mw.ProgressBar {
		if(!this.mScroll_GPU_Internal&&this.uiWidgetBase) {
			this.mScroll_GPU_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_GPU/mScroll_GPU') as mw.ProgressBar
		}
		return this.mScroll_GPU_Internal
	}
	private mCanvas_CPU_Internal: mw.Canvas
	public get mCanvas_CPU(): mw.Canvas {
		if(!this.mCanvas_CPU_Internal&&this.uiWidgetBase) {
			this.mCanvas_CPU_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_CPU') as mw.Canvas
		}
		return this.mCanvas_CPU_Internal
	}
	private mBtn_Return_CPU_Internal: mw.Button
	public get mBtn_Return_CPU(): mw.Button {
		if(!this.mBtn_Return_CPU_Internal&&this.uiWidgetBase) {
			this.mBtn_Return_CPU_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_CPU/mBtn_Return_CPU') as mw.Button
		}
		return this.mBtn_Return_CPU_Internal
	}
	private mScroll_CPU_Internal: mw.ProgressBar
	public get mScroll_CPU(): mw.ProgressBar {
		if(!this.mScroll_CPU_Internal&&this.uiWidgetBase) {
			this.mScroll_CPU_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_CPU/mScroll_CPU') as mw.ProgressBar
		}
		return this.mScroll_CPU_Internal
	}
	private mCanvas_Saturation_Internal: mw.Canvas
	public get mCanvas_Saturation(): mw.Canvas {
		if(!this.mCanvas_Saturation_Internal&&this.uiWidgetBase) {
			this.mCanvas_Saturation_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_Saturation') as mw.Canvas
		}
		return this.mCanvas_Saturation_Internal
	}
	private mBtn_Return_Saturation_Internal: mw.Button
	public get mBtn_Return_Saturation(): mw.Button {
		if(!this.mBtn_Return_Saturation_Internal&&this.uiWidgetBase) {
			this.mBtn_Return_Saturation_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_Saturation/mBtn_Return_Saturation') as mw.Button
		}
		return this.mBtn_Return_Saturation_Internal
	}
	private mScroll_Saturation_Internal: mw.ProgressBar
	public get mScroll_Saturation(): mw.ProgressBar {
		if(!this.mScroll_Saturation_Internal&&this.uiWidgetBase) {
			this.mScroll_Saturation_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_Saturation/mScroll_Saturation') as mw.ProgressBar
		}
		return this.mScroll_Saturation_Internal
	}
	private mCanvas_Shadow_Internal: mw.Canvas
	public get mCanvas_Shadow(): mw.Canvas {
		if(!this.mCanvas_Shadow_Internal&&this.uiWidgetBase) {
			this.mCanvas_Shadow_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_Shadow') as mw.Canvas
		}
		return this.mCanvas_Shadow_Internal
	}
	private mBtn_Shadow_Internal: mw.StaleButton
	public get mBtn_Shadow(): mw.StaleButton {
		if(!this.mBtn_Shadow_Internal&&this.uiWidgetBase) {
			this.mBtn_Shadow_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_Shadow/mBtn_Shadow') as mw.StaleButton
		}
		return this.mBtn_Shadow_Internal
	}
	private mCanvas_Control_Internal: mw.Canvas
	public get mCanvas_Control(): mw.Canvas {
		if(!this.mCanvas_Control_Internal&&this.uiWidgetBase) {
			this.mCanvas_Control_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control') as mw.Canvas
		}
		return this.mCanvas_Control_Internal
	}
	private mCanvas_InputScale_Internal: mw.Canvas
	public get mCanvas_InputScale(): mw.Canvas {
		if(!this.mCanvas_InputScale_Internal&&this.uiWidgetBase) {
			this.mCanvas_InputScale_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_InputScale') as mw.Canvas
		}
		return this.mCanvas_InputScale_Internal
	}
	private mBtn_Return_InputScale_Internal: mw.Button
	public get mBtn_Return_InputScale(): mw.Button {
		if(!this.mBtn_Return_InputScale_Internal&&this.uiWidgetBase) {
			this.mBtn_Return_InputScale_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_InputScale/mBtn_Return_InputScale') as mw.Button
		}
		return this.mBtn_Return_InputScale_Internal
	}
	private mScroll_InputScale_Internal: mw.ProgressBar
	public get mScroll_InputScale(): mw.ProgressBar {
		if(!this.mScroll_InputScale_Internal&&this.uiWidgetBase) {
			this.mScroll_InputScale_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_InputScale/mScroll_InputScale') as mw.ProgressBar
		}
		return this.mScroll_InputScale_Internal
	}
	private mCanvas_cameraspeed_Internal: mw.Canvas
	public get mCanvas_cameraspeed(): mw.Canvas {
		if(!this.mCanvas_cameraspeed_Internal&&this.uiWidgetBase) {
			this.mCanvas_cameraspeed_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed') as mw.Canvas
		}
		return this.mCanvas_cameraspeed_Internal
	}
	private mScroll_speedInputScale_Internal: mw.ProgressBar
	public get mScroll_speedInputScale(): mw.ProgressBar {
		if(!this.mScroll_speedInputScale_Internal&&this.uiWidgetBase) {
			this.mScroll_speedInputScale_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed/mScroll_speedInputScale') as mw.ProgressBar
		}
		return this.mScroll_speedInputScale_Internal
	}
	private mCanvas_Lock_Internal: mw.Canvas
	public get mCanvas_Lock(): mw.Canvas {
		if(!this.mCanvas_Lock_Internal&&this.uiWidgetBase) {
			this.mCanvas_Lock_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_Lock') as mw.Canvas
		}
		return this.mCanvas_Lock_Internal
	}
	private mBtn_Lock_Internal: mw.StaleButton
	public get mBtn_Lock(): mw.StaleButton {
		if(!this.mBtn_Lock_Internal&&this.uiWidgetBase) {
			this.mBtn_Lock_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_Lock/mBtn_Lock') as mw.StaleButton
		}
		return this.mBtn_Lock_Internal
	}
	private mBtn_Back_Internal: mw.StaleButton
	public get mBtn_Back(): mw.StaleButton {
		if(!this.mBtn_Back_Internal&&this.uiWidgetBase) {
			this.mBtn_Back_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Setting/mBtn_Back') as mw.StaleButton
		}
		return this.mBtn_Back_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_CloseSound.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_CloseSound");
		})
		this.initLanguage(this.mBtn_CloseSound);
		//this.mBtn_CloseSound.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Shadow.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Shadow");
		})
		this.initLanguage(this.mBtn_Shadow);
		//this.mBtn_Shadow.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Lock.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Lock");
		})
		this.initLanguage(this.mBtn_Lock);
		//this.mBtn_Lock.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Back");
		})
		this.initLanguage(this.mBtn_Back);
		//this.mBtn_Back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mBtn_Return_GPU.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Return_GPU");
		})
		
		
	
		this.mBtn_Return_CPU.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Return_CPU");
		})
		
		
	
		this.mBtn_Return_Saturation.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Return_Saturation");
		})
		
		
	
		this.mBtn_Return_InputScale.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Return_InputScale");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/Text_Sound") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_CloseSound/Text_CloseSound") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_BGM/Text_Low") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_BGM/Text_High") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_BGM/Text_BGM") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_Voice/Text_Low") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_Voice/Text_High") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Sound/mCanvas_Voice/Text_Voice") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/Text_Pic") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_GPU/Text_Low") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_GPU/Text_High") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_GPU/Text_GPU") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_CPU/Text_Low") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_CPU/Text_High") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_CPU/Text_CPU") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_Saturation/Text_Low") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_Saturation/Text_High") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_Saturation/Text_Saturation") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Pic/mCanvas_Shadow/Text_Shadow") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/Text_Control") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_InputScale/Text_Low") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_InputScale/Text_High") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_InputScale/Text_InputScale") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed/Text_Speed") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed/Text_Low") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_cameraspeed/Text_High") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Setting/ScrollBox/canvas_Setting/mCanvas_Control/mCanvas_Lock/Text_Shadow") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 