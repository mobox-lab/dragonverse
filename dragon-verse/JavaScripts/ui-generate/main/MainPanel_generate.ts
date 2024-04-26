/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.2.0
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
	private cnvStamina_Internal: mw.Canvas
	public get cnvStamina(): mw.Canvas {
		if(!this.cnvStamina_Internal&&this.uiWidgetBase) {
			this.cnvStamina_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvStamina') as mw.Canvas
		}
		return this.cnvStamina_Internal
	}
	private barStamina_Internal: mw.ProgressBar
	public get barStamina(): mw.ProgressBar {
		if(!this.barStamina_Internal&&this.uiWidgetBase) {
			this.barStamina_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvStamina/barStamina') as mw.ProgressBar
		}
		return this.barStamina_Internal
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
	private playcount_Internal: mw.Canvas
	public get playcount(): mw.Canvas {
		if(!this.playcount_Internal&&this.uiWidgetBase) {
			this.playcount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playcount') as mw.Canvas
		}
		return this.playcount_Internal
	}
	private hearticon_Internal: mw.Image
	public get hearticon(): mw.Image {
		if(!this.hearticon_Internal&&this.uiWidgetBase) {
			this.hearticon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playcount/hearticon') as mw.Image
		}
		return this.hearticon_Internal
	}
	private playtimecount_Internal: mw.TextBlock
	public get playtimecount(): mw.TextBlock {
		if(!this.playtimecount_Internal&&this.uiWidgetBase) {
			this.playtimecount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playcount/playtimecount') as mw.TextBlock
		}
		return this.playtimecount_Internal
	}
	private playtimecount_1_Internal: mw.TextBlock
	public get playtimecount_1(): mw.TextBlock {
		if(!this.playtimecount_1_Internal&&this.uiWidgetBase) {
			this.playtimecount_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playcount/playtimecount_1') as mw.TextBlock
		}
		return this.playtimecount_1_Internal
	}
	private sceneDragonInteractorContainer_Internal: mw.Canvas
	public get sceneDragonInteractorContainer(): mw.Canvas {
		if(!this.sceneDragonInteractorContainer_Internal&&this.uiWidgetBase) {
			this.sceneDragonInteractorContainer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/sceneDragonInteractorContainer') as mw.Canvas
		}
		return this.sceneDragonInteractorContainer_Internal
	}
	private coincount_Internal: mw.Canvas
	public get coincount(): mw.Canvas {
		if(!this.coincount_Internal&&this.uiWidgetBase) {
			this.coincount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/coincount') as mw.Canvas
		}
		return this.coincount_Internal
	}
	private coinback_Internal: mw.Image
	public get coinback(): mw.Image {
		if(!this.coinback_Internal&&this.uiWidgetBase) {
			this.coinback_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/coincount/coinback') as mw.Image
		}
		return this.coinback_Internal
	}
	private textcoin_Internal: mw.TextBlock
	public get textcoin(): mw.TextBlock {
		if(!this.textcoin_Internal&&this.uiWidgetBase) {
			this.textcoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/coincount/textcoin') as mw.TextBlock
		}
		return this.textcoin_Internal
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
	private obbySkillCanvas_Internal: mw.Canvas
	public get obbySkillCanvas(): mw.Canvas {
		if(!this.obbySkillCanvas_Internal&&this.uiWidgetBase) {
			this.obbySkillCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/obbySkillCanvas') as mw.Canvas
		}
		return this.obbySkillCanvas_Internal
	}
	private btnFindPath_Internal: mw.StaleButton
	public get btnFindPath(): mw.StaleButton {
		if(!this.btnFindPath_Internal&&this.uiWidgetBase) {
			this.btnFindPath_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/obbySkillCanvas/btnFindPath') as mw.StaleButton
		}
		return this.btnFindPath_Internal
	}
	private btnShield_Internal: mw.StaleButton
	public get btnShield(): mw.StaleButton {
		if(!this.btnShield_Internal&&this.uiWidgetBase) {
			this.btnShield_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/obbySkillCanvas/btnShield') as mw.StaleButton
		}
		return this.btnShield_Internal
	}
	private coin_Internal: mw.Image
	public get coin(): mw.Image {
		if(!this.coin_Internal&&this.uiWidgetBase) {
			this.coin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/obbySkillCanvas/coin') as mw.Image
		}
		return this.coin_Internal
	}
	private cost_Internal: mw.TextBlock
	public get cost(): mw.TextBlock {
		if(!this.cost_Internal&&this.uiWidgetBase) {
			this.cost_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/obbySkillCanvas/cost') as mw.TextBlock
		}
		return this.cost_Internal
	}
	private cost_1_Internal: mw.TextBlock
	public get cost_1(): mw.TextBlock {
		if(!this.cost_1_Internal&&this.uiWidgetBase) {
			this.cost_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/obbySkillCanvas/cost_1') as mw.TextBlock
		}
		return this.cost_1_Internal
	}
	private coin_1_Internal: mw.Image
	public get coin_1(): mw.Image {
		if(!this.coin_1_Internal&&this.uiWidgetBase) {
			this.coin_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/obbySkillCanvas/coin_1') as mw.Image
		}
		return this.coin_1_Internal
	}
	private resetCanvas_Internal: mw.Canvas
	public get resetCanvas(): mw.Canvas {
		if(!this.resetCanvas_Internal&&this.uiWidgetBase) {
			this.resetCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/resetCanvas') as mw.Canvas
		}
		return this.resetCanvas_Internal
	}
	private btnReset_Internal: mw.StaleButton
	public get btnReset(): mw.StaleButton {
		if(!this.btnReset_Internal&&this.uiWidgetBase) {
			this.btnReset_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/resetCanvas/btnReset') as mw.StaleButton
		}
		return this.btnReset_Internal
	}
	private bagCanvas_Internal: mw.Canvas
	public get bagCanvas(): mw.Canvas {
		if(!this.bagCanvas_Internal&&this.uiWidgetBase) {
			this.bagCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/bagCanvas') as mw.Canvas
		}
		return this.bagCanvas_Internal
	}
	private btnBag_Internal: mw.StaleButton
	public get btnBag(): mw.StaleButton {
		if(!this.btnBag_Internal&&this.uiWidgetBase) {
			this.btnBag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/bagCanvas/btnBag') as mw.StaleButton
		}
		return this.btnBag_Internal
	}
	private switchRoomCanvas_Internal: mw.Canvas
	public get switchRoomCanvas(): mw.Canvas {
		if(!this.switchRoomCanvas_Internal&&this.uiWidgetBase) {
			this.switchRoomCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/switchRoomCanvas') as mw.Canvas
		}
		return this.switchRoomCanvas_Internal
	}
	private btnJumpGame_Internal: mw.StaleButton
	public get btnJumpGame(): mw.StaleButton {
		if(!this.btnJumpGame_Internal&&this.uiWidgetBase) {
			this.btnJumpGame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/switchRoomCanvas/btnJumpGame') as mw.StaleButton
		}
		return this.btnJumpGame_Internal
	}
	private textRoom_Internal: mw.TextBlock
	public get textRoom(): mw.TextBlock {
		if(!this.textRoom_Internal&&this.uiWidgetBase) {
			this.textRoom_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/switchRoomCanvas/textRoom') as mw.TextBlock
		}
		return this.textRoom_Internal
	}
	private mapCanvas_Internal: mw.Canvas
	public get mapCanvas(): mw.Canvas {
		if(!this.mapCanvas_Internal&&this.uiWidgetBase) {
			this.mapCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/mapCanvas') as mw.Canvas
		}
		return this.mapCanvas_Internal
	}
	private btnMap_Internal: mw.StaleButton
	public get btnMap(): mw.StaleButton {
		if(!this.btnMap_Internal&&this.uiWidgetBase) {
			this.btnMap_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/mapCanvas/btnMap') as mw.StaleButton
		}
		return this.btnMap_Internal
	}
	private textMap_Internal: mw.TextBlock
	public get textMap(): mw.TextBlock {
		if(!this.textMap_Internal&&this.uiWidgetBase) {
			this.textMap_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/mapCanvas/textMap') as mw.TextBlock
		}
		return this.textMap_Internal
	}
	private soundCanvas_Internal: mw.Canvas
	public get soundCanvas(): mw.Canvas {
		if(!this.soundCanvas_Internal&&this.uiWidgetBase) {
			this.soundCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/soundCanvas') as mw.Canvas
		}
		return this.soundCanvas_Internal
	}
	private btnSound_Internal: mw.StaleButton
	public get btnSound(): mw.StaleButton {
		if(!this.btnSound_Internal&&this.uiWidgetBase) {
			this.btnSound_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/soundCanvas/btnSound') as mw.StaleButton
		}
		return this.btnSound_Internal
	}
	private textSound_Internal: mw.TextBlock
	public get textSound(): mw.TextBlock {
		if(!this.textSound_Internal&&this.uiWidgetBase) {
			this.textSound_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/soundCanvas/textSound') as mw.TextBlock
		}
		return this.textSound_Internal
	}
	private cnvInteract_Internal: mw.Canvas
	public get cnvInteract(): mw.Canvas {
		if(!this.cnvInteract_Internal&&this.uiWidgetBase) {
			this.cnvInteract_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvInteract') as mw.Canvas
		}
		return this.cnvInteract_Internal
	}
	private btnInteract_Internal: mw.Button
	public get btnInteract(): mw.Button {
		if(!this.btnInteract_Internal&&this.uiWidgetBase) {
			this.btnInteract_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvInteract/btnInteract') as mw.Button
		}
		return this.btnInteract_Internal
	}
	private txtInteractContent_Internal: mw.TextBlock
	public get txtInteractContent(): mw.TextBlock {
		if(!this.txtInteractContent_Internal&&this.uiWidgetBase) {
			this.txtInteractContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvInteract/txtInteractContent') as mw.TextBlock
		}
		return this.txtInteractContent_Internal
	}
	private imgInteractIcon_Internal: mw.Image
	public get imgInteractIcon(): mw.Image {
		if(!this.imgInteractIcon_Internal&&this.uiWidgetBase) {
			this.imgInteractIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvInteract/imgInteractIcon') as mw.Image
		}
		return this.imgInteractIcon_Internal
	}
	private imgInteractKeyTips_Internal: mw.Image
	public get imgInteractKeyTips(): mw.Image {
		if(!this.imgInteractKeyTips_Internal&&this.uiWidgetBase) {
			this.imgInteractKeyTips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvInteract/imgInteractKeyTips') as mw.Image
		}
		return this.imgInteractKeyTips_Internal
	}
	private txtInteractKeyTips_Internal: mw.TextBlock
	public get txtInteractKeyTips(): mw.TextBlock {
		if(!this.txtInteractKeyTips_Internal&&this.uiWidgetBase) {
			this.txtInteractKeyTips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvInteract/txtInteractKeyTips') as mw.TextBlock
		}
		return this.txtInteractKeyTips_Internal
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
	private roomIdText_Internal: mw.TextBlock
	public get roomIdText(): mw.TextBlock {
		if(!this.roomIdText_Internal&&this.uiWidgetBase) {
			this.roomIdText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/roomIdText') as mw.TextBlock
		}
		return this.roomIdText_Internal
	}



	protected onStart() {
    }

	protected onAwake() {
        // 强制实现其 以规避 show 自作主张的使用 .layer 覆写 onShow 的默认参数导致的接口设计哲学不统一.
        this.layer = mw.UILayerMiddle;
        this.overrideTextSetter();
		this.initTextLan();
	}

    protected onUpdate(dt: number): void {
	}

	protected onShow(...args:unknown[]) {
	}

	protected onHide() {
	}

    public destroy(): void {
        this.unregisterTextLan();
        super.destroy();
    }

    protected initTextLan() {
        // 文本按钮多语言
        
        this.initLanguage(this.btnCode);
        
	
        this.initLanguage(this.btnFindPath);
        
	
        this.initLanguage(this.btnShield);
        
	
        this.initLanguage(this.btnReset);
        
	
        this.initLanguage(this.btnBag);
        
	
        this.initLanguage(this.btnJumpGame);
        
	
        this.initLanguage(this.btnMap);
        
	
        this.initLanguage(this.btnSound);
        
	
        // 静态文本按钮多语言
        
        // 文本多语言
        
        this.initLanguage(this.playtimecount)
        
	
        this.initLanguage(this.playtimecount_1)
        
	
        this.initLanguage(this.textcoin)
        
	
        this.initLanguage(this.txtDragonBallNum)
        
	
        this.initLanguage(this.cost)
        
	
        this.initLanguage(this.cost_1)
        
	
        this.initLanguage(this.textRoom)
        
	
        this.initLanguage(this.textMap)
        
	
        this.initLanguage(this.textSound)
        
	
        this.initLanguage(this.txtInteractContent)
        
	
        this.initLanguage(this.txtInteractKeyTips)
        
	
        this.initLanguage(this.txtOperationFeedback)
        
	
        this.initLanguage(this.roomIdText)
        
	
        // 静态文本多语言
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMainFuntion/resetCanvas/TextBlock_1_1") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMainFuntion/bagCanvas/TextBlock_1") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvCatchdragon/cnvKeyPrompt/TextBlock") as mw.TextBlock);
        
	
    }

    protected overrideTextSetter() {
        
        overrideBubblingWidget(this.playtimecount);
        
	
        overrideBubblingWidget(this.playtimecount_1);
        
	
        overrideBubblingWidget(this.textcoin);
        
	
        overrideBubblingWidget(this.txtDragonBallNum);
        
	
        overrideBubblingWidget(this.cost);
        
	
        overrideBubblingWidget(this.cost_1);
        
	
        overrideBubblingWidget(this.textRoom);
        
	
        overrideBubblingWidget(this.textMap);
        
	
        overrideBubblingWidget(this.textSound);
        
	
        overrideBubblingWidget(this.txtInteractContent);
        
	
        overrideBubblingWidget(this.txtInteractKeyTips);
        
	
        overrideBubblingWidget(this.txtOperationFeedback);
        
	
        overrideBubblingWidget(this.roomIdText);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.btnCode);
        
	
        this.unregisterLanKey(this.btnFindPath);
        
	
        this.unregisterLanKey(this.btnShield);
        
	
        this.unregisterLanKey(this.btnReset);
        
	
        this.unregisterLanKey(this.btnBag);
        
	
        this.unregisterLanKey(this.btnJumpGame);
        
	
        this.unregisterLanKey(this.btnMap);
        
	
        this.unregisterLanKey(this.btnSound);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.playtimecount)
        
	
        this.unregisterLanKey(this.playtimecount_1)
        
	
        this.unregisterLanKey(this.textcoin)
        
	
        this.unregisterLanKey(this.txtDragonBallNum)
        
	
        this.unregisterLanKey(this.cost)
        
	
        this.unregisterLanKey(this.cost_1)
        
	
        this.unregisterLanKey(this.textRoom)
        
	
        this.unregisterLanKey(this.textMap)
        
	
        this.unregisterLanKey(this.textSound)
        
	
        this.unregisterLanKey(this.txtInteractContent)
        
	
        this.unregisterLanKey(this.txtInteractKeyTips)
        
	
        this.unregisterLanKey(this.txtOperationFeedback)
        
	
        this.unregisterLanKey(this.roomIdText)
        
	
        // 隐藏文本多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMainFuntion/resetCanvas/TextBlock_1_1") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMainFuntion/bagCanvas/TextBlock_1") as mw.TextBlock);
        
	
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

function findPropertyDescriptor(obj: unknown, prop: string): PropertyDescriptor | null {
    while (obj !== null) {
        let descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        if (descriptor) {
            return descriptor;
        }
        obj = Object.getPrototypeOf(obj);
    }
    return null;
}

function overrideBubblingWidget(textWidget: mw.TextBlock) {
    const originSetter = findPropertyDescriptor(textWidget, "text")?.set;
    if (!originSetter) return;
    Object.defineProperty(textWidget, "text", {
        set: function (value: string) {
            if (textWidget.text === value) return;
            originSetter.call(textWidget, value);
        },
    });
}