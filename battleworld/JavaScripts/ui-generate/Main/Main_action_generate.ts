
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 一只黄鹂鸣翠柳
 * UI: UI/Main/Main_action.ui
 * TIME: 2024.01.07-13.57.15
 */

 

 @UIBind('UI/Main/Main_action.ui')
 export default class Main_action_Generate extends UIScript {
	 	private mCanvasSkill0_Internal: mw.Canvas
	public get mCanvasSkill0(): mw.Canvas {
		if(!this.mCanvasSkill0_Internal&&this.uiWidgetBase) {
			this.mCanvasSkill0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasSkill0') as mw.Canvas
		}
		return this.mCanvasSkill0_Internal
	}
	private mCanvasSkill1_Internal: mw.Canvas
	public get mCanvasSkill1(): mw.Canvas {
		if(!this.mCanvasSkill1_Internal&&this.uiWidgetBase) {
			this.mCanvasSkill1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasSkill1') as mw.Canvas
		}
		return this.mCanvasSkill1_Internal
	}
	private mCanvasSkill2_Internal: mw.Canvas
	public get mCanvasSkill2(): mw.Canvas {
		if(!this.mCanvasSkill2_Internal&&this.uiWidgetBase) {
			this.mCanvasSkill2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasSkill2') as mw.Canvas
		}
		return this.mCanvasSkill2_Internal
	}
	private mCanvasSkill3_Internal: mw.UserWidget
	public get mCanvasSkill3(): mw.UserWidget {
		if(!this.mCanvasSkill3_Internal&&this.uiWidgetBase) {
			this.mCanvasSkill3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasSkill3') as mw.UserWidget
		}
		return this.mCanvasSkill3_Internal
	}
	private mCanvasSkill4_Internal: mw.UserWidget
	public get mCanvasSkill4(): mw.UserWidget {
		if(!this.mCanvasSkill4_Internal&&this.uiWidgetBase) {
			this.mCanvasSkill4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasSkill4') as mw.UserWidget
		}
		return this.mCanvasSkill4_Internal
	}
	private mCanvasSkill5_Internal: mw.UserWidget
	public get mCanvasSkill5(): mw.UserWidget {
		if(!this.mCanvasSkill5_Internal&&this.uiWidgetBase) {
			this.mCanvasSkill5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasSkill5') as mw.UserWidget
		}
		return this.mCanvasSkill5_Internal
	}
	private mCanvasSkill6_Internal: mw.UserWidget
	public get mCanvasSkill6(): mw.UserWidget {
		if(!this.mCanvasSkill6_Internal&&this.uiWidgetBase) {
			this.mCanvasSkill6_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasSkill6') as mw.UserWidget
		}
		return this.mCanvasSkill6_Internal
	}
	private mFireCanvas_Internal: mw.Canvas
	public get mFireCanvas(): mw.Canvas {
		if(!this.mFireCanvas_Internal&&this.uiWidgetBase) {
			this.mFireCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mFireCanvas') as mw.Canvas
		}
		return this.mFireCanvas_Internal
	}
	private mBackImg_Internal: mw.Image
	public get mBackImg(): mw.Image {
		if(!this.mBackImg_Internal&&this.uiWidgetBase) {
			this.mBackImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mFireCanvas/mBackImg') as mw.Image
		}
		return this.mBackImg_Internal
	}
	private mFinalSkill_Internal: mw.StaleButton
	public get mFinalSkill(): mw.StaleButton {
		if(!this.mFinalSkill_Internal&&this.uiWidgetBase) {
			this.mFinalSkill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mFireCanvas/mFinalSkill') as mw.StaleButton
		}
		return this.mFinalSkill_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mFinalSkill.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mFinalSkill");
		})
		this.initLanguage(this.mFinalSkill);
		//this.mFinalSkill.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvasSkill0/MBtnName") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvasSkill0/MBlue") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvasSkill1/MBtnName") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvasSkill1/MBlue") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvasSkill2/MBtnName") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvasSkill2/MBlue") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 