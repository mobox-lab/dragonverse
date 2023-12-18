
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/main/MainPanel.ui
*/



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
	private btnSetting_Internal: mw.Button
	public get btnSetting(): mw.Button {
		if(!this.btnSetting_Internal&&this.uiWidgetBase) {
			this.btnSetting_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvSetting/btnSetting') as mw.Button
		}
		return this.btnSetting_Internal
	}
	private imgUserAvatarIcon_Internal: mw.Image
	public get imgUserAvatarIcon(): mw.Image {
		if(!this.imgUserAvatarIcon_Internal&&this.uiWidgetBase) {
			this.imgUserAvatarIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvSetting/imgUserAvatarIcon') as mw.Image
		}
		return this.imgUserAvatarIcon_Internal
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
	private miniMap_Internal: mw.Image
	public get miniMap(): mw.Image {
		if(!this.miniMap_Internal&&this.uiWidgetBase) {
			this.miniMap_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/miniMap') as mw.Image
		}
		return this.miniMap_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 