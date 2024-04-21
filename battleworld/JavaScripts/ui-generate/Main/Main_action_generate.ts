
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 安妮熊
 * UI: UI/Main/Main_action.ui
 * TIME: 2024.04.19-18.59.26
 */

 

 @UIBind('UI/Main/Main_action.ui')
 export default class Main_action_Generate extends UIScript {
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
	private canvasSkillTotal_Internal: mw.Canvas
	public get canvasSkillTotal(): mw.Canvas {
		if(!this.canvasSkillTotal_Internal&&this.uiWidgetBase) {
			this.canvasSkillTotal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasSkillTotal') as mw.Canvas
		}
		return this.canvasSkillTotal_Internal
	}
	private mCanvasSkill2_Internal: mw.Canvas
	public get mCanvasSkill2(): mw.Canvas {
		if(!this.mCanvasSkill2_Internal&&this.uiWidgetBase) {
			this.mCanvasSkill2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasSkillTotal/mCanvasSkill2') as mw.Canvas
		}
		return this.mCanvasSkill2_Internal
	}
	private mBtndash_Internal: mw.TextBlock
	public get mBtndash(): mw.TextBlock {
		if(!this.mBtndash_Internal&&this.uiWidgetBase) {
			this.mBtndash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasSkillTotal/mCanvasSkill2/mBtndash') as mw.TextBlock
		}
		return this.mBtndash_Internal
	}
	private dashname_Internal: mw.TextBlock
	public get dashname(): mw.TextBlock {
		if(!this.dashname_Internal&&this.uiWidgetBase) {
			this.dashname_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasSkillTotal/mCanvasSkill2/dashname') as mw.TextBlock
		}
		return this.dashname_Internal
	}
	private mCanvasSkill0_Internal: mw.Canvas
	public get mCanvasSkill0(): mw.Canvas {
		if(!this.mCanvasSkill0_Internal&&this.uiWidgetBase) {
			this.mCanvasSkill0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasSkillTotal/mCanvasSkill0') as mw.Canvas
		}
		return this.mCanvasSkill0_Internal
	}
	private weaponName_Internal: mw.TextBlock
	public get weaponName(): mw.TextBlock {
		if(!this.weaponName_Internal&&this.uiWidgetBase) {
			this.weaponName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasSkillTotal/mCanvasSkill0/weaponName') as mw.TextBlock
		}
		return this.weaponName_Internal
	}
	private mBtnjump_1_1_Internal: mw.TextBlock
	public get mBtnjump_1_1(): mw.TextBlock {
		if(!this.mBtnjump_1_1_Internal&&this.uiWidgetBase) {
			this.mBtnjump_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasSkillTotal/mCanvasSkill0/mBtnjump_1_1') as mw.TextBlock
		}
		return this.mBtnjump_1_1_Internal
	}
	private mCanvasSkill3_Internal: mw.UserWidget
	public get mCanvasSkill3(): mw.UserWidget {
		if(!this.mCanvasSkill3_Internal&&this.uiWidgetBase) {
			this.mCanvasSkill3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasSkillTotal/mCanvasSkill3') as mw.UserWidget
		}
		return this.mCanvasSkill3_Internal
	}
	private mCanvasSkill4_Internal: mw.UserWidget
	public get mCanvasSkill4(): mw.UserWidget {
		if(!this.mCanvasSkill4_Internal&&this.uiWidgetBase) {
			this.mCanvasSkill4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasSkillTotal/mCanvasSkill4') as mw.UserWidget
		}
		return this.mCanvasSkill4_Internal
	}
	private mCanvasSkill5_Internal: mw.UserWidget
	public get mCanvasSkill5(): mw.UserWidget {
		if(!this.mCanvasSkill5_Internal&&this.uiWidgetBase) {
			this.mCanvasSkill5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasSkillTotal/mCanvasSkill5') as mw.UserWidget
		}
		return this.mCanvasSkill5_Internal
	}
	private mCanvasSkill6_Internal: mw.UserWidget
	public get mCanvasSkill6(): mw.UserWidget {
		if(!this.mCanvasSkill6_Internal&&this.uiWidgetBase) {
			this.mCanvasSkill6_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasSkillTotal/mCanvasSkill6') as mw.UserWidget
		}
		return this.mCanvasSkill6_Internal
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
		
		this.initLanguage(this.mBtndash)
		
	
		this.initLanguage(this.dashname)
		
	
		this.initLanguage(this.weaponName)
		
	
		this.initLanguage(this.mBtnjump_1_1)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvasSkillTotal/mCanvasSkill2/MBtnName") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvasSkillTotal/mCanvasSkill2/MBlue") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvasSkillTotal/mCanvasSkill0/MBlue") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 