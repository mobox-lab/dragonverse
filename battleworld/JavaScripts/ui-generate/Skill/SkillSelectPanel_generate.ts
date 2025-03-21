﻿
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/Skill/SkillSelectPanel.ui
 */

 

 @UIBind('UI/Skill/SkillSelectPanel.ui')
 export default class SkillSelectPanel_Generate extends UIScript {
	 	private mBgblack_Internal: mw.Image
	public get mBgblack(): mw.Image {
		if(!this.mBgblack_Internal&&this.uiWidgetBase) {
			this.mBgblack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBgblack') as mw.Image
		}
		return this.mBgblack_Internal
	}
	private mTipCanvas_Internal: mw.Canvas
	public get mTipCanvas(): mw.Canvas {
		if(!this.mTipCanvas_Internal&&this.uiWidgetBase) {
			this.mTipCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTipCanvas') as mw.Canvas
		}
		return this.mTipCanvas_Internal
	}
	private mTipText_Internal: mw.TextBlock
	public get mTipText(): mw.TextBlock {
		if(!this.mTipText_Internal&&this.uiWidgetBase) {
			this.mTipText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTipCanvas/mTipText') as mw.TextBlock
		}
		return this.mTipText_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTipCanvas/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private mSelectPanel_Internal: mw.Canvas
	public get mSelectPanel(): mw.Canvas {
		if(!this.mSelectPanel_Internal&&this.uiWidgetBase) {
			this.mSelectPanel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectPanel') as mw.Canvas
		}
		return this.mSelectPanel_Internal
	}
	private mSelectBtn1_Internal: mw.StaleButton
	public get mSelectBtn1(): mw.StaleButton {
		if(!this.mSelectBtn1_Internal&&this.uiWidgetBase) {
			this.mSelectBtn1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectPanel/mSelectBtn1') as mw.StaleButton
		}
		return this.mSelectBtn1_Internal
	}
	private mSelectBtn2_Internal: mw.StaleButton
	public get mSelectBtn2(): mw.StaleButton {
		if(!this.mSelectBtn2_Internal&&this.uiWidgetBase) {
			this.mSelectBtn2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectPanel/mSelectBtn2') as mw.StaleButton
		}
		return this.mSelectBtn2_Internal
	}
	private mSelectBtn3_Internal: mw.StaleButton
	public get mSelectBtn3(): mw.StaleButton {
		if(!this.mSelectBtn3_Internal&&this.uiWidgetBase) {
			this.mSelectBtn3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectPanel/mSelectBtn3') as mw.StaleButton
		}
		return this.mSelectBtn3_Internal
	}
	private mSelectBtn4_Internal: mw.StaleButton
	public get mSelectBtn4(): mw.StaleButton {
		if(!this.mSelectBtn4_Internal&&this.uiWidgetBase) {
			this.mSelectBtn4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectPanel/mSelectBtn4') as mw.StaleButton
		}
		return this.mSelectBtn4_Internal
	}
	private skill4_Internal: mw.TextBlock
	public get skill4(): mw.TextBlock {
		if(!this.skill4_Internal&&this.uiWidgetBase) {
			this.skill4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectPanel/skill4') as mw.TextBlock
		}
		return this.skill4_Internal
	}
	private skill3_Internal: mw.TextBlock
	public get skill3(): mw.TextBlock {
		if(!this.skill3_Internal&&this.uiWidgetBase) {
			this.skill3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectPanel/skill3') as mw.TextBlock
		}
		return this.skill3_Internal
	}
	private skill2_Internal: mw.TextBlock
	public get skill2(): mw.TextBlock {
		if(!this.skill2_Internal&&this.uiWidgetBase) {
			this.skill2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectPanel/skill2') as mw.TextBlock
		}
		return this.skill2_Internal
	}
	private skill1_Internal: mw.TextBlock
	public get skill1(): mw.TextBlock {
		if(!this.skill1_Internal&&this.uiWidgetBase) {
			this.skill1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectPanel/skill1') as mw.TextBlock
		}
		return this.skill1_Internal
	}
	private mSelectBtn_Internal: mw.StaleButton
	public get mSelectBtn(): mw.StaleButton {
		if(!this.mSelectBtn_Internal&&this.uiWidgetBase) {
			this.mSelectBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectBtn') as mw.StaleButton
		}
		return this.mSelectBtn_Internal
	}
	private mDiscardBtn_Internal: mw.StaleButton
	public get mDiscardBtn(): mw.StaleButton {
		if(!this.mDiscardBtn_Internal&&this.uiWidgetBase) {
			this.mDiscardBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDiscardBtn') as mw.StaleButton
		}
		return this.mDiscardBtn_Internal
	}
	private mClosebtn_Internal: mw.Button
	public get mClosebtn(): mw.Button {
		if(!this.mClosebtn_Internal&&this.uiWidgetBase) {
			this.mClosebtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mClosebtn') as mw.Button
		}
		return this.mClosebtn_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mSelectBtn1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSelectBtn1");
		})
		this.initLanguage(this.mSelectBtn1);
		//this.mSelectBtn1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mSelectBtn2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSelectBtn2");
		})
		this.initLanguage(this.mSelectBtn2);
		//this.mSelectBtn2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mSelectBtn3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSelectBtn3");
		})
		this.initLanguage(this.mSelectBtn3);
		//this.mSelectBtn3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mSelectBtn4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSelectBtn4");
		})
		this.initLanguage(this.mSelectBtn4);
		//this.mSelectBtn4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mSelectBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSelectBtn");
		})
		this.initLanguage(this.mSelectBtn);
		//this.mSelectBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mDiscardBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mDiscardBtn");
		})
		this.initLanguage(this.mDiscardBtn);
		//this.mDiscardBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mClosebtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mClosebtn");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTipText)
		
	
		this.initLanguage(this.skill4)
		
	
		this.initLanguage(this.skill3)
		
	
		this.initLanguage(this.skill2)
		
	
		this.initLanguage(this.skill1)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mTipCanvas/Text") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 