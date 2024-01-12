/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 1.0.8
 * UI: UI/main/MainPanel.ui
*/

import UIScript = mw.UIScript;


@UIBind('UI/main/MainPanel.ui')
export default class MainPanel_Generate extends UIScript {
	private btnJump_Internal: mw.Button
	public get btnJump(): mw.Button {
		if(!this.btnJump_Internal&&this.uiWidgetBase) {
			this.btnJump_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CnvFunctionHidden/btnJump') as mw.Button
		}
		return this.btnJump_Internal
	}
	private collectibleInteractorContainer_Internal: mw.Canvas
	public get collectibleInteractorContainer(): mw.Canvas {
		if(!this.collectibleInteractorContainer_Internal&&this.uiWidgetBase) {
			this.collectibleInteractorContainer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/collectibleInteractorContainer') as mw.Canvas
		}
		return this.collectibleInteractorContainer_Internal
	}
	private bar_physical_power_Internal: mw.ProgressBar
	public get bar_physical_power(): mw.ProgressBar {
		if(!this.bar_physical_power_Internal&&this.uiWidgetBase) {
			this.bar_physical_power_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Physical/bar_physical_power') as mw.ProgressBar
		}
		return this.bar_physical_power_Internal
	}
	private cnvSprintEffect_Internal: mw.Canvas
	public get cnvSprintEffect(): mw.Canvas {
		if(!this.cnvSprintEffect_Internal&&this.uiWidgetBase) {
			this.cnvSprintEffect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvSprintEffect') as mw.Canvas
		}
		return this.cnvSprintEffect_Internal
	}
	private imgSprintEffect1_Internal: mw.Image
	public get imgSprintEffect1(): mw.Image {
		if(!this.imgSprintEffect1_Internal&&this.uiWidgetBase) {
			this.imgSprintEffect1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvSprintEffect/imgSprintEffect1') as mw.Image
		}
		return this.imgSprintEffect1_Internal
	}
	private imgSprintEffect2_Internal: mw.Image
	public get imgSprintEffect2(): mw.Image {
		if(!this.imgSprintEffect2_Internal&&this.uiWidgetBase) {
			this.imgSprintEffect2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvSprintEffect/imgSprintEffect2') as mw.Image
		}
		return this.imgSprintEffect2_Internal
	}
	private imgSprintEffect3_Internal: mw.Image
	public get imgSprintEffect3(): mw.Image {
		if(!this.imgSprintEffect3_Internal&&this.uiWidgetBase) {
			this.imgSprintEffect3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvSprintEffect/imgSprintEffect3') as mw.Image
		}
		return this.imgSprintEffect3_Internal
	}
	private sceneDragonInteractorContainer_Internal: mw.Canvas
	public get sceneDragonInteractorContainer(): mw.Canvas {
		if(!this.sceneDragonInteractorContainer_Internal&&this.uiWidgetBase) {
			this.sceneDragonInteractorContainer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/sceneDragonInteractorContainer') as mw.Canvas
		}
		return this.sceneDragonInteractorContainer_Internal
	}
	private cnvSetting_Internal: mw.Canvas
	public get cnvSetting(): mw.Canvas {
		if(!this.cnvSetting_Internal&&this.uiWidgetBase) {
			this.cnvSetting_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvSetting') as mw.Canvas
		}
		return this.cnvSetting_Internal
	}
	private imgUserAvatarIcon_Internal: mw.Image
	public get imgUserAvatarIcon(): mw.Image {
		if(!this.imgUserAvatarIcon_Internal&&this.uiWidgetBase) {
			this.imgUserAvatarIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvSetting/imgUserAvatarIcon') as mw.Image
		}
		return this.imgUserAvatarIcon_Internal
	}
	private btnSetting_Internal: mw.Button
	public get btnSetting(): mw.Button {
		if(!this.btnSetting_Internal&&this.uiWidgetBase) {
			this.btnSetting_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvSetting/btnSetting') as mw.Button
		}
		return this.btnSetting_Internal
	}
	private cnvDragonBall_Internal: mw.Canvas
	public get cnvDragonBall(): mw.Canvas {
		if(!this.cnvDragonBall_Internal&&this.uiWidgetBase) {
			this.cnvDragonBall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvDragonBall') as mw.Canvas
		}
		return this.cnvDragonBall_Internal
	}
	private btnDragonBall_Internal: mw.Button
	public get btnDragonBall(): mw.Button {
		if(!this.btnDragonBall_Internal&&this.uiWidgetBase) {
			this.btnDragonBall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvDragonBall/btnDragonBall') as mw.Button
		}
		return this.btnDragonBall_Internal
	}
	private txtDragonBallNum_Internal: mw.TextBlock
	public get txtDragonBallNum(): mw.TextBlock {
		if(!this.txtDragonBallNum_Internal&&this.uiWidgetBase) {
			this.txtDragonBallNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvDragonBall/txtDragonBallNum') as mw.TextBlock
		}
		return this.txtDragonBallNum_Internal
	}
	private cnvPointer_Internal: mw.Canvas
	public get cnvPointer(): mw.Canvas {
		if(!this.cnvPointer_Internal&&this.uiWidgetBase) {
			this.cnvPointer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvDragonBall/cnvPointer') as mw.Canvas
		}
		return this.cnvPointer_Internal
	}
	private cnvExtraFuntion_Internal: mw.Canvas
	public get cnvExtraFuntion(): mw.Canvas {
		if(!this.cnvExtraFuntion_Internal&&this.uiWidgetBase) {
			this.cnvExtraFuntion_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvExtraFuntion') as mw.Canvas
		}
		return this.cnvExtraFuntion_Internal
	}
	private btnCode_Internal: mw.StaleButton
	public get btnCode(): mw.StaleButton {
		if(!this.btnCode_Internal&&this.uiWidgetBase) {
			this.btnCode_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvExtraFuntion/btnCode') as mw.StaleButton
		}
		return this.btnCode_Internal
	}
	private btnMail_Internal: mw.StaleButton
	public get btnMail(): mw.StaleButton {
		if(!this.btnMail_Internal&&this.uiWidgetBase) {
			this.btnMail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvExtraFuntion/btnMail') as mw.StaleButton
		}
		return this.btnMail_Internal
	}
	private cnvProgressBar_Internal: mw.Canvas
	public get cnvProgressBar(): mw.Canvas {
		if(!this.cnvProgressBar_Internal&&this.uiWidgetBase) {
			this.cnvProgressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvProgressBar') as mw.Canvas
		}
		return this.cnvProgressBar_Internal
	}
	private progressBar_Internal: mw.ProgressBar
	public get progressBar(): mw.ProgressBar {
		if(!this.progressBar_Internal&&this.uiWidgetBase) {
			this.progressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvProgressBar/progressBar') as mw.ProgressBar
		}
		return this.progressBar_Internal
	}
	private cnvMainFuntion_Internal: mw.Canvas
	public get cnvMainFuntion(): mw.Canvas {
		if(!this.cnvMainFuntion_Internal&&this.uiWidgetBase) {
			this.cnvMainFuntion_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion') as mw.Canvas
		}
		return this.cnvMainFuntion_Internal
	}
	private btnBag_Internal: mw.StaleButton
	public get btnBag(): mw.StaleButton {
		if(!this.btnBag_Internal&&this.uiWidgetBase) {
			this.btnBag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/btnBag') as mw.StaleButton
		}
		return this.btnBag_Internal
	}
	private btnBook_Internal: mw.StaleButton
	public get btnBook(): mw.StaleButton {
		if(!this.btnBook_Internal&&this.uiWidgetBase) {
			this.btnBook_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/btnBook') as mw.StaleButton
		}
		return this.btnBook_Internal
	}
	private btnDragon_Internal: mw.StaleButton
	public get btnDragon(): mw.StaleButton {
		if(!this.btnDragon_Internal&&this.uiWidgetBase) {
			this.btnDragon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/btnDragon') as mw.StaleButton
		}
		return this.btnDragon_Internal
	}
	private btnReset_Internal: mw.StaleButton
	public get btnReset(): mw.StaleButton {
		if(!this.btnReset_Internal&&this.uiWidgetBase) {
			this.btnReset_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/btnReset') as mw.StaleButton
		}
		return this.btnReset_Internal
	}
	private btnRunning_Internal: mw.StaleButton
	public get btnRunning(): mw.StaleButton {
		if(!this.btnRunning_Internal&&this.uiWidgetBase) {
			this.btnRunning_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/btnRunning') as mw.StaleButton
		}
		return this.btnRunning_Internal
	}
	private miniMap_Internal: mw.Image
	public get miniMap(): mw.Image {
		if(!this.miniMap_Internal&&this.uiWidgetBase) {
			this.miniMap_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/miniMap') as mw.Image
		}
		return this.miniMap_Internal
	}
	private cnvOperationalFeedback_Internal: mw.Canvas
	public get cnvOperationalFeedback(): mw.Canvas {
		if(!this.cnvOperationalFeedback_Internal&&this.uiWidgetBase) {
			this.cnvOperationalFeedback_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvOperationalFeedback') as mw.Canvas
		}
		return this.cnvOperationalFeedback_Internal
	}
	private txtOperationFeedback_Internal: mw.TextBlock
	public get txtOperationFeedback(): mw.TextBlock {
		if(!this.txtOperationFeedback_Internal&&this.uiWidgetBase) {
			this.txtOperationFeedback_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvOperationalFeedback/txtOperationFeedback') as mw.TextBlock
		}
		return this.txtOperationFeedback_Internal
	}
	private imgOperationFail_Internal: mw.Image
	public get imgOperationFail(): mw.Image {
		if(!this.imgOperationFail_Internal&&this.uiWidgetBase) {
			this.imgOperationFail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvOperationalFeedback/imgOperationFail') as mw.Image
		}
		return this.imgOperationFail_Internal
	}
	private imgOperationSuccess_Internal: mw.Image
	public get imgOperationSuccess(): mw.Image {
		if(!this.imgOperationSuccess_Internal&&this.uiWidgetBase) {
			this.imgOperationSuccess_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvOperationalFeedback/imgOperationSuccess') as mw.Image
		}
		return this.imgOperationSuccess_Internal
	}
	private cnvCatchdragon_Internal: mw.Canvas
	public get cnvCatchdragon(): mw.Canvas {
		if(!this.cnvCatchdragon_Internal&&this.uiWidgetBase) {
			this.cnvCatchdragon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvCatchdragon') as mw.Canvas
		}
		return this.cnvCatchdragon_Internal
	}
	private catchBg_Internal: mw.Image
	public get catchBg(): mw.Image {
		if(!this.catchBg_Internal&&this.uiWidgetBase) {
			this.catchBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvCatchdragon/catchBg') as mw.Image
		}
		return this.catchBg_Internal
	}
	private catchBgBorder_Internal: mw.Image
	public get catchBgBorder(): mw.Image {
		if(!this.catchBgBorder_Internal&&this.uiWidgetBase) {
			this.catchBgBorder_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvCatchdragon/catchBgBorder') as mw.Image
		}
		return this.catchBgBorder_Internal
	}
	private catchIcon_Internal: mw.Image
	public get catchIcon(): mw.Image {
		if(!this.catchIcon_Internal&&this.uiWidgetBase) {
			this.catchIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvCatchdragon/catchIcon') as mw.Image
		}
		return this.catchIcon_Internal
	}
	private btnCatch_Internal: mw.Button
	public get btnCatch(): mw.Button {
		if(!this.btnCatch_Internal&&this.uiWidgetBase) {
			this.btnCatch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvCatchdragon/btnCatch') as mw.Button
		}
		return this.btnCatch_Internal
	}
	private cnvKeyPrompt_Internal: mw.Canvas
	public get cnvKeyPrompt(): mw.Canvas {
		if(!this.cnvKeyPrompt_Internal&&this.uiWidgetBase) {
			this.cnvKeyPrompt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvCatchdragon/cnvKeyPrompt') as mw.Canvas
		}
		return this.cnvKeyPrompt_Internal
	}



	protected onAwake() {
		this.initTextLan();
	}

    public destroy(): void {
        this.unregisterTextLan();
        super.destroy();
    }

    protected initTextLan() {
        // 文本按钮多语言
        
        this.initLanguage(this.btnCode);
        
	
        this.initLanguage(this.btnMail);
        
	
        this.initLanguage(this.btnBag);
        
	
        this.initLanguage(this.btnBook);
        
	
        this.initLanguage(this.btnDragon);
        
	
        this.initLanguage(this.btnReset);
        
	
        this.initLanguage(this.btnRunning);
        
	
        // 静态文本按钮多语言
        
        // 文本多语言
        
        this.initLanguage(this.txtDragonBallNum)
        
	
        this.initLanguage(this.txtOperationFeedback)
        
	
        // 静态文本多语言
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMainFuntion/TextBlock_1") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMainFuntion/TextBlock_1_1") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvCatchdragon/cnvKeyPrompt/TextBlock") as mw.TextBlock);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.btnCode);
        
	
        this.unregisterLanKey(this.btnMail);
        
	
        this.unregisterLanKey(this.btnBag);
        
	
        this.unregisterLanKey(this.btnBook);
        
	
        this.unregisterLanKey(this.btnDragon);
        
	
        this.unregisterLanKey(this.btnReset);
        
	
        this.unregisterLanKey(this.btnRunning);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.txtDragonBallNum)
        
	
        this.unregisterLanKey(this.txtOperationFeedback)
        
	
        // 隐藏文本多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMainFuntion/TextBlock_1") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMainFuntion/TextBlock_1_1") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/cnvCatchdragon/cnvKeyPrompt/TextBlock") as mw.TextBlock);
        
	
    }

    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let lanFunc = mw.UIScript.getBehavior("lan");
        lanFunc?.(ui);
    }

    private unregisterLanKey(ui: mw.StaleButton | mw.TextBlock) {
        let unregisterFunc = mw.UIScript.getBehavior("unregister");
        unregisterFunc?.(ui);
    }
}
 