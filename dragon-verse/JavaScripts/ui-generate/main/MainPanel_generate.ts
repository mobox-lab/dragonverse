﻿/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
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
	private cnv_Token_Internal: mw.Canvas
	public get cnv_Token(): mw.Canvas {
		if(!this.cnv_Token_Internal&&this.uiWidgetBase) {
			this.cnv_Token_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CnvFunctionHidden/cnv_Token') as mw.Canvas
		}
		return this.cnv_Token_Internal
	}
	private btn_Fresh_Token_Internal: mw.Button
	public get btn_Fresh_Token(): mw.Button {
		if(!this.btn_Fresh_Token_Internal&&this.uiWidgetBase) {
			this.btn_Fresh_Token_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CnvFunctionHidden/cnv_Token/btn_Fresh_Token') as mw.Button
		}
		return this.btn_Fresh_Token_Internal
	}
	private mText_token_Internal: mw.TextBlock
	public get mText_token(): mw.TextBlock {
		if(!this.mText_token_Internal&&this.uiWidgetBase) {
			this.mText_token_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CnvFunctionHidden/cnv_Token/mText_token') as mw.TextBlock
		}
		return this.mText_token_Internal
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
	private pressF_Internal: mw.TextBlock
	public get pressF(): mw.TextBlock {
		if(!this.pressF_Internal&&this.uiWidgetBase) {
			this.pressF_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvDragonBall/pressF') as mw.TextBlock
		}
		return this.pressF_Internal
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
	private transferCanvas_Internal: mw.Canvas
	public get transferCanvas(): mw.Canvas {
		if(!this.transferCanvas_Internal&&this.uiWidgetBase) {
			this.transferCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/transferCanvas') as mw.Canvas
		}
		return this.transferCanvas_Internal
	}
	private btnCow_Internal: mw.StaleButton
	public get btnCow(): mw.StaleButton {
		if(!this.btnCow_Internal&&this.uiWidgetBase) {
			this.btnCow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/transferCanvas/btnCow') as mw.StaleButton
		}
		return this.btnCow_Internal
	}
	private textCow_Internal: mw.TextBlock
	public get textCow(): mw.TextBlock {
		if(!this.textCow_Internal&&this.uiWidgetBase) {
			this.textCow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/transferCanvas/textCow') as mw.TextBlock
		}
		return this.textCow_Internal
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
	private shopCanvas_Internal: mw.Canvas
	public get shopCanvas(): mw.Canvas {
		if(!this.shopCanvas_Internal&&this.uiWidgetBase) {
			this.shopCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/shopCanvas') as mw.Canvas
		}
		return this.shopCanvas_Internal
	}
	private btnShop_Internal: mw.StaleButton
	public get btnShop(): mw.StaleButton {
		if(!this.btnShop_Internal&&this.uiWidgetBase) {
			this.btnShop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/shopCanvas/btnShop') as mw.StaleButton
		}
		return this.btnShop_Internal
	}
	private textShop_Internal: mw.TextBlock
	public get textShop(): mw.TextBlock {
		if(!this.textShop_Internal&&this.uiWidgetBase) {
			this.textShop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvMainFuntion/shopCanvas/textShop') as mw.TextBlock
		}
		return this.textShop_Internal
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
	private imgInteractIcon_Internal: mw.Image
	public get imgInteractIcon(): mw.Image {
		if(!this.imgInteractIcon_Internal&&this.uiWidgetBase) {
			this.imgInteractIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cnvInteract/imgInteractIcon') as mw.Image
		}
		return this.imgInteractIcon_Internal
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

    protected onDestroy() {
        this.unregisterTextLan();
    }

    protected initTextLan() {
        // 文本按钮
        
        this.initLanguage(this.btnCode);
        this.btnCode.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btnBag);
        this.btnBag.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btnCow);
        this.btnCow.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btnJumpGame);
        this.btnJumpGame.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btnFindPath);
        this.btnFindPath.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btnShield);
        this.btnShield.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btnShop);
        this.btnShop.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btnSound);
        this.btnSound.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btnMap);
        this.btnMap.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btnReset);
        this.btnReset.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 按钮
        
        this.btnJump.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.btn_Fresh_Token.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.btnSetting.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.btnDragonBall.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.btnInteract.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 未暴露的文本按钮
        
        // 文本控件
        
        this.initLanguage(this.mText_token)
        
	
        this.initLanguage(this.playtimecount)
        
	
        this.initLanguage(this.playtimecount_1)
        
	
        this.initLanguage(this.textcoin)
        
	
        this.initLanguage(this.pressF)
        
	
        this.initLanguage(this.txtDragonBallNum)
        
	
        this.initLanguage(this.textCow)
        
	
        this.initLanguage(this.textRoom)
        
	
        this.initLanguage(this.cost)
        
	
        this.initLanguage(this.cost_1)
        
	
        this.initLanguage(this.textShop)
        
	
        this.initLanguage(this.textSound)
        
	
        this.initLanguage(this.textMap)
        
	
        this.initLanguage(this.txtInteractContent)
        
	
        this.initLanguage(this.txtInteractKeyTips)
        
	
        this.initLanguage(this.txtOperationFeedback)
        
	
        this.initLanguage(this.roomIdText)
        
	
        // 未暴露的文本控件
        
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMainFuntion/bagCanvas/TextBlock_1") as mw.TextBlock);
        
	
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMainFuntion/resetCanvas/TextBlock_1_1") as mw.TextBlock);
        
	
    }

    protected overrideTextSetter() {
        
        overrideTextBlockTextSetter(this.mText_token);
        
	
        overrideTextBlockTextSetter(this.playtimecount);
        
	
        overrideTextBlockTextSetter(this.playtimecount_1);
        
	
        overrideTextBlockTextSetter(this.textcoin);
        
	
        overrideTextBlockTextSetter(this.pressF);
        
	
        overrideTextBlockTextSetter(this.txtDragonBallNum);
        
	
        overrideTextBlockTextSetter(this.textCow);
        
	
        overrideTextBlockTextSetter(this.textRoom);
        
	
        overrideTextBlockTextSetter(this.cost);
        
	
        overrideTextBlockTextSetter(this.cost_1);
        
	
        overrideTextBlockTextSetter(this.textShop);
        
	
        overrideTextBlockTextSetter(this.textSound);
        
	
        overrideTextBlockTextSetter(this.textMap);
        
	
        overrideTextBlockTextSetter(this.txtInteractContent);
        
	
        overrideTextBlockTextSetter(this.txtInteractKeyTips);
        
	
        overrideTextBlockTextSetter(this.txtOperationFeedback);
        
	
        overrideTextBlockTextSetter(this.roomIdText);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.btnCode);
        
	
        this.unregisterLanKey(this.btnBag);
        
	
        this.unregisterLanKey(this.btnCow);
        
	
        this.unregisterLanKey(this.btnJumpGame);
        
	
        this.unregisterLanKey(this.btnFindPath);
        
	
        this.unregisterLanKey(this.btnShield);
        
	
        this.unregisterLanKey(this.btnShop);
        
	
        this.unregisterLanKey(this.btnSound);
        
	
        this.unregisterLanKey(this.btnMap);
        
	
        this.unregisterLanKey(this.btnReset);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.mText_token)
        
	
        this.unregisterLanKey(this.playtimecount)
        
	
        this.unregisterLanKey(this.playtimecount_1)
        
	
        this.unregisterLanKey(this.textcoin)
        
	
        this.unregisterLanKey(this.pressF)
        
	
        this.unregisterLanKey(this.txtDragonBallNum)
        
	
        this.unregisterLanKey(this.textCow)
        
	
        this.unregisterLanKey(this.textRoom)
        
	
        this.unregisterLanKey(this.cost)
        
	
        this.unregisterLanKey(this.cost_1)
        
	
        this.unregisterLanKey(this.textShop)
        
	
        this.unregisterLanKey(this.textSound)
        
	
        this.unregisterLanKey(this.textMap)
        
	
        this.unregisterLanKey(this.txtInteractContent)
        
	
        this.unregisterLanKey(this.txtInteractKeyTips)
        
	
        this.unregisterLanKey(this.txtOperationFeedback)
        
	
        this.unregisterLanKey(this.roomIdText)
        
	
        // 隐藏文本多语言
        
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMainFuntion/bagCanvas/TextBlock_1") as mw.TextBlock);
        
	
        this.unregisterLanKey(this.uiWidgetBase.findChildByPath("RootCanvas/cnvMainFuntion/resetCanvas/TextBlock_1_1") as mw.TextBlock);
        
	
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

function overrideTextBlockTextSetter(textWidget: mw.TextBlock) {
    const originSetter = findPropertyDescriptor(textWidget, "text")?.set;
    if (!originSetter) return;
    Object.defineProperty(textWidget, "text", {
        set: function (value: string) {
            if (textWidget.text === value) return;
            originSetter.call(textWidget, value);
        },
        get: findPropertyDescriptor(textWidget, "text")?.get,
    });
}