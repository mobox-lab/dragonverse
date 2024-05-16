import { PlayerManagerExtesion } from "../../Modified027Editor/ModifiedPlayer";
import { MapEx } from "odin";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import { oTraceError } from "../../util/LogManager";
import MessageBox from "../../util/MessageBox";
import { utils } from "../../util/uitls";
import AchievementModuleC from "../AchievementModule/AchievementModuleC";
import { AnalyticsTool, ButtonAnaly } from "../Analytics/AnalyticsTool";
import { AreaDivideManager } from "../AreaDivide/AreaDivideManager";
import { AreaModuleC } from "../AreaDivide/AreaModuleC";
import { P_HudUI } from "../Hud/P_HudUI";
import { TipsManager } from "../Hud/P_TipUI";
import { InputModuleC } from "../Input/InputModule";
import { PetBagModuleC } from "../PetBag/PetBagModuleC";
import { Task_ModuleC } from "../Task/TaskModuleC";
import { PlayerNameManager } from "../Trading/PlayerNameManager";
import { P_GlobalTips } from "../UI/P_GlobalTips";
import { P_LevelUI } from "./P_LevelUI";
import PlayerBehavior from "./PlayerBehavior";
import { PetSimulatorPlayerModuleData } from "./PlayerModuleData";
import { PlayerModuleS } from "./PlayerModuleS";
import { IGradientElement } from "../../config/Gradient";
import Player = mw.Player;

/**玩家模块 */
export class PlayerModuleC extends ModuleC<PlayerModuleS, PetSimulatorPlayerModuleData> {
    private achievementModuleC: AchievementModuleC = null;
    private hudUI: P_HudUI = null;
    private curBehavior: PlayerBehavior;
    private static _curBehavior: PlayerBehavior;

    /**当前玩家行为 */
    public static get curPlayer(): PlayerBehavior {
        return this._curBehavior;
    }

    /**输入模块 */
    private inputModule: InputModuleC;
    /**金币改变回调 */
    public onGoldChange: mw.Action2<GlobalEnum.CoinType, number> = new mw.Action2<GlobalEnum.CoinType, number>();
    /**钻石改变回调 */
    public onDiamondChange: mw.Action1<number> = new mw.Action1<number>();
    /**区域模块 */
    private areaModuleC: AreaModuleC = null;
    /**当前是否使用左手攻击 */
    public isLeftAttack: boolean = false;

    protected onStart(): void {
        this.inputModule = ModuleService.getModule(InputModuleC);
        this.areaModuleC = ModuleService.getModule(AreaModuleC);
        this.achievementModuleC = ModuleService.getModule(AchievementModuleC);
        this.areaModuleC.onTransmit.add((id) => {
            this.playerTeleport(id);
        });
        this.inputModule.onLineTraceAC.add((resource, isTouch) => {
            this.curBehavior?.onClickDestroyable(resource, isTouch);
        });
        this.data.onGoldChange.add((coinType: GlobalEnum.CoinType) => {
            switch (coinType) {
                case GlobalEnum.CoinType.FirstWorldGold:
                    this.onGoldChange.call(GlobalEnum.CoinType.FirstWorldGold, this.data.gold);
                    this.checkCoinGradient(coinType, this.data.gold);
                    break;
                case GlobalEnum.CoinType.SecondWorldGold:
                    this.onGoldChange.call(GlobalEnum.CoinType.SecondWorldGold, this.data.gold2);
                    this.checkCoinGradient(coinType, this.data.gold2);
                    break;
                case GlobalEnum.CoinType.ThirdWorldGold:
                    this.onGoldChange.call(GlobalEnum.CoinType.ThirdWorldGold, this.data.gold3);
                    //TODO this.checkCoinGradient(coinType, this.data.gold3);
                    break;
                case GlobalEnum.CoinType.SummerGold:
                    this.onGoldChange.call(GlobalEnum.CoinType.SummerGold, this.data.summerCoin);
                    break;
                default:
                    break;
            }
        });
        this.data.onDiamondChange.add(() => {
            this.onDiamondChange.call(this.data.diamond);
            this.checkCoinGradient(GlobalEnum.CoinType.Diamond, this.data.diamond);
        });
        this.data.onLevelChange.add((id, grade) => {
            this.onLevelChange(id, grade);
            AnalyticsTool.action_upgrade_skill(id + 1, this.data.getLevelData(id));
        });
        GlobalData.LevelUp.initPlayer(Player.localPlayer.playerId, this.data.levelData);
        this.hudUI = mw.UIService.getUI(P_HudUI);
        this.hudUI.mClickAction.add(this.onClickAttackSpeed, this);
        this.hudUI.mLongPressAction.add(this.onLongPressAttackSpeed, this);
        this.hudUI.mReleaseAction.add(this.onReleaseAttackSpeed, this);
        this.hudUI.onSkateboardAction.add(this.onSkateboardAction, this);
        InputUtil.onKeyDown(Keys.L, () => {
            this.showLevelUp();
        });
        utils.triInit(GlobalData.LevelUp.triggerGuid, () => {
            this.showLevelUp();
        }, () => {
            mw.UIService.getUI(P_LevelUI).hide();
        });
        this.setFastTranCanvasVis();
    }

    public get SummerCoin(): number {
        return this.data.summerCoin;
    }

    /**使用机器 */
    public useMachine(isLove: boolean): void {
        this.server.net_useMachine(isLove);
    }

    /**控制FastTranCanvas的显隐 */
    private setFastTranCanvasVis(): void {
        AreaDivideManager.instance.onAreaChangeAC.add((preId: number, curId: number) => {
            let vis = mw.SlateVisibility.Collapsed;
            let coinIconType: string = "";

            if (curId >= 1000 && curId < 2000) {
                vis = mw.SlateVisibility.SelfHitTestInvisible;
                coinIconType = GlobalData.CoinsIcon.firstWorldCoinIcon;
                this.onGoldChange.call(GlobalEnum.CoinType.FirstWorldGold, this.data.gold);
            } else if (curId >= 2000 && curId < 3000) {
                vis = mw.SlateVisibility.Collapsed;
                coinIconType = GlobalData.CoinsIcon.secondWorldCoinIcon;
                this.onGoldChange.call(GlobalEnum.CoinType.SecondWorldGold, this.data.gold2);
            } else if (curId >= 3000) {
                vis = mw.SlateVisibility.Collapsed;
                coinIconType = GlobalData.CoinsIcon.thirdWorldCoinIcon;
                this.onGoldChange.call(GlobalEnum.CoinType.ThirdWorldGold, this.data.gold3);
            }
            this.hudUI.mCanvas_fasttran.visibility = vis;
            vis == mw.SlateVisibility.Collapsed ? this.hudUI.stopFastTranBtnTween() : this.hudUI.startFastTranBtnTween();
            this.hudUI.mPic_coin.imageGuid = coinIconType;
        });
    }

    async onSkateboardAction(): Promise<void> {
        let isHave: boolean = ModuleService.getModule(Task_ModuleC).isHaveSkateboard();
        if (!isHave) {
            if (GlobalData.Global.isFreeSkateboard) {
                TipsManager.instance.showTip("因为三七二十一，所以滑板限时3天免费");
            } else {
                TipsManager.instance.showTip(GameConfig.Language.Tips_huaban_1.Value);
                return;
            }
        }
        let bool = await this.server.net_skateboard();
        let hudUI = mw.UIService.getUI(P_HudUI);
        hudUI.mBtn_skid.normalImageGuid = bool ? GlobalData.Ripstik.unLockIcon[1] : GlobalData.Ripstik.unLockIcon[0];
        hudUI.mBtn_skid.pressedImageGuid = bool ? GlobalData.Ripstik.unLockIcon[1] : GlobalData.Ripstik.unLockIcon[0];
        hudUI.mBtn_skid.disableImageGuid = bool ? GlobalData.Ripstik.unLockIcon[1] : GlobalData.Ripstik.unLockIcon[0];
        hudUI.mBtn_skid.enable = false;
        setTimeout(() => {
            hudUI.mBtn_skid.enable = true;
        }, 1000);

    }

    /**单击攻速按钮 */
    private onClickAttackSpeed(): void {
        if (!this.curBehavior) return;
        let anim = GlobalData.SpeedUp.leftAttack;
        let time = GlobalData.SpeedUp.leftAttackDelay;
        this.isLeftAttack = !this.isLeftAttack;
        if (this.isLeftAttack) {
            anim = GlobalData.SpeedUp.rightAttack;
            time = GlobalData.SpeedUp.rightAttackDelay;
            AnalyticsTool.action_click(ButtonAnaly.speed);
        }
        if (!this.curBehavior.isPetAttack) {
            TipsManager.instance.showTip(GameConfig.Language.Text_tips_7.Value);
            return;
        }

        let currAnim = PlayerManagerExtesion.loadAnimationExtesion(this.localPlayer.character, anim, false);
        currAnim.play();
        currAnim.onFinish.add(() => {
            oTraceError("攻速动作播放完毕");
            if (this.curBehavior.skateboardState) {
                this.curBehavior.onSkateboardContinue();
            }
        });
        TimeUtil.delaySecond(time).then(() => {
            this.curBehavior.onClickAttackSpeed();
        });
    }

    /**长按攻速动作 */
    private pressAnim: mw.SubStance = null;

    /**长按攻速按钮 */
    private onLongPressAttackSpeed(): void {
        if (!this.curBehavior) return;
        if (!this.curBehavior.isPetAttack) {
            TipsManager.instance.showTip(GameConfig.Language.Text_tips_7.Value);
            return;
        }
        if (!this.pressAnim) this.pressAnim = PlayerManagerExtesion.loadStanceExtesion(this.localPlayer.character, GlobalData.SpeedUp.longPressAttack, false);
        this.pressAnim.blendMode = mw.StanceBlendMode.BlendUpper;
        this.pressAnim.play();
        this.curBehavior.onLongPressAttackSpeed();
    }

    /**松开攻速按钮 */
    private onReleaseAttackSpeed(): void {
        PlayerManagerExtesion.stopStanceExtesion(this.localPlayer.character);
        this.pressAnim?.stop();
        this.curBehavior?.onReleaseAttackSpeed();
    }

    protected onEnterScene(sceneType: number): void {
        let loc: mw.Vector = null;
        if (this.data.playerQuitLoc < 2000) {
            loc = GameConfig.AreaDivide.getElement(1001).Loc;
        } else if (this.data.playerQuitLoc < 3000) {
            loc = GameConfig.AreaDivide.getElement(2001).Loc;
        } else if (this.data.playerQuitLoc < 4000) {
            loc = GameConfig.AreaDivide.getElement(3001).Loc;
        }
        this.localPlayer.character.worldTransform.position = loc.add(new mw.Vector(0, 0, 150));
        this.server.net_enterGame(AccountService.getNickName());
        if (GlobalData.Global.isUseAvatar) {
            AccountService.downloadData(this.localPlayer.character, () => {
                this.changePlatformSkin(1, false);
            });
        } else {
            // setTimeout(() => {
            //TODO:临时代码
            this.changePlatformSkin(1, false);
            // }, 1000);
        }
        if (this.data.playerQuitLoc < 2000) {//开局进入第一世界
            this.onGoldChange.call(GlobalEnum.CoinType.FirstWorldGold, this.data.gold);
        } else if (this.data.playerQuitLoc < 3000) {//开局进入第二世界
            this.onGoldChange.call(GlobalEnum.CoinType.SecondWorldGold, this.data.gold2);
        } else if (this.data.playerQuitLoc < 4000) {//开局进入第三世界
            this.onGoldChange.call(GlobalEnum.CoinType.ThirdWorldGold, this.data.gold3);
        }
        this.onDiamondChange.call(this.data.diamond);
    }

    /**检查玩家财富埋点 */
    private checkPlayerWealth(): void {
        let cfgid = MapEx.get(this.data.buryingPoint, GlobalEnum.CoinType.FirstWorldGold);
        if (!cfgid) cfgid = 0;
    }

    private checkCoinCount(cfgid: number, coinType: GlobalEnum.CoinType): void {
        let cfg = GameConfig.Gradient.getElement(cfgid);
    }

    /**显示升级界面 */
    public showLevelUp(): void {
        let infos = GameConfig.Upgrade.getAllElement();
        for (let i = 0; i < infos.length; i++) {
            let grade = this.data.getLevelData(i);
            this.onLevelChange(i, grade);
        }
        mw.UIService.getUI(P_LevelUI).show();
    }

    /**单个进度升级 */
    public async levelUp(id: number): Promise<void> {
        this.server.net_levelUp(id).then(value => {
                if (value) {
                    oTraceError("[升级]");
                    this.achievementModuleC.onExecuteAchievementAction.call(GlobalEnum.AchievementType.UpgradeNum, 1);//升级次数
                } else {
                    MessageBox.showOneBtnMessage(GameConfig.Language.Text_Fuse_UI_3.Value);
                }
            },
        );

    }

    /**单个进度变化 */
    private onLevelChange(id: number, level: number): void {
        let info = GameConfig.Upgrade.getAllElement()[id];
        let upgrade = info.Upgradenum[level - 1];
        if (upgrade == null) upgrade = 0;
        switch (id) {
            case 0:
                GlobalData.LevelUp.levelRangeMap.set(Player.localPlayer.playerId, 1 + upgrade);
                break;
            case 1:
                GlobalData.LevelUp.moreDiamondMap.set(Player.localPlayer.playerId, 1 + upgrade);
                break;
            case 2:
                GlobalData.LevelUp.petDamageMap.set(Player.localPlayer.playerId, 1 + upgrade);
                break;
            case 3:
                GlobalData.LevelUp.petAttackSpeedMap.set(Player.localPlayer.playerId, 1 + upgrade);
                break;
            case 4:
                ModuleService.getModule(PetBagModuleC).addBagCapacity(info.PetNum);
                break;
        }
        mw.UIService.getUI(P_LevelUI).initItem(id, level);
    }

    /**玩家进行传送 */
    public playerTeleport(id: number): void {
        this.server.net_playerTeleport(id);
    }

    // /**生成一个宠物 */
    // public creatPet(id: number): void {
    //     this.server.net_equipPet(this.localPlayerId, utils.GetRandomNum(1, 1000), id, 200, "三七");
    // }

    // /**销毁所有宠物 */
    // public destroyAllPet(): void {
    //     this.server.net_destroyAllPet();
    // }

    public initBehaviors(player: PlayerBehavior): void {
        this.curBehavior = player;
        PlayerModuleC._curBehavior = player;
    }

    public setPlaza(isPlaza: boolean): void {
        this.data.isPlaza = isPlaza;
        this.server.net_setPlaza(isPlaza);
    }

    protected onUpdate(dt: number): void {

    }

    public async buyDollCoin(configId: number): Promise<boolean> {
        return await this.server.net_buyDollCoin(configId);
    }

    // /**增加金币 */
    // public addGold(value: number, coinType: GlobalEnum.CoinType): void {
    //     if (value > 0) this.server.net_addGold(value, coinType);
    // }

    /**查询金币数量 */
    public checkGold(coinType: GlobalEnum.CoinType) {
        switch (coinType) {
            case GlobalEnum.CoinType.FirstWorldGold:
                return this.data.gold;
            case GlobalEnum.CoinType.SecondWorldGold:
                return this.data.gold2;
            case GlobalEnum.CoinType.ThirdWorldGold:
                return this.data.gold3;
            case GlobalEnum.CoinType.Diamond:
                return this.data.diamond;
            case GlobalEnum.CoinType.SummerGold:
                return this.data.summerCoin;
            default:
                break;
        }
    }

    /**增加钻石 */
    public addDiamond(value: number): void {
        if (value > 0) this.server.net_addDiamond(value);
    }

    /**判断钻石数量是否足够 */
    public isDiamondEnough(value: number): boolean {
        return this.data.diamond >= value;
    }

    /**减少金币 */
    public async reduceGold(value: number, coinType: GlobalEnum.CoinType): Promise<boolean> {
        return await this.server.net_reduceGold(value, coinType);
    }

    /**减少钻石 */
    public async reduceDiamond(value: number): Promise<boolean> {
        return await this.server.net_reduceDiamond(value);
    }

    // public async clearGoldGem(): Promise<void> {
    //     await this.reduceDiamond(this.data.diamond);
    //     await this.reduceGold(this.data.gold, GlobalEnum.CoinType.FirstWorldGold);
    //     await this.reduceGold(this.data.gold2, GlobalEnum.CoinType.SecondWorldGold);
    //     await this.reduceGold(this.data.gold3, GlobalEnum.CoinType.ThirdWorldGold);
    //     await this.reduceGold(this.data.summerCoin, GlobalEnum.CoinType.SummerGold);
    // }

    public async net_levelNotice(playerId: number, count: number) {
        let str = await PlayerNameManager.instance.getPlayerName(playerId);
        if (count == GlobalData.Notice.levelUpTipsCount[0]) {
            str = str + " " + GameConfig.Language.World_Tips_10.Value;
        } else {
            str = str + " " + GameConfig.Language.World_Tips_11.Value;
        }
        mw.UIService.getUI(P_GlobalTips).showTips(str);
    }

    /**发送梯度埋点 */
    public net_sendPoint() {

        let type = GlobalEnum.BuryingPointCoin;
        this.sendPoint(this.data.buryingPoint[type.FirstWorldGold], 0, type.FirstWorldGold);
        this.sendPoint(this.data.buryingPoint[type.SecondWorldGold], 0, type.SecondWorldGold);
        this.sendPoint(this.data.buryingPoint[type.Diamond], 0, type.Diamond);
        this.sendPoint(this.data.buryingPoint[type.Star], 0, type.Star);
    }

    /**检查货币梯度 */
    public checkCoinGradient(coinType: GlobalEnum.CoinType | GlobalEnum.BuryingPointCoin, count: number): void {

        const type = GlobalEnum.BuryingPointCoin;

        let curType: GlobalEnum.BuryingPointCoin = null;
        let curLevel: number = null;
        let cfg: IGradientElement = null;
        switch (coinType) {
            case GlobalEnum.CoinType.FirstWorldGold:
                curType = type.FirstWorldGold;
                curLevel = this.data.buryingPoint[curType];
                cfg = GameConfig.Gradient.getElement(curLevel + 1);
                if (!cfg) return;
                if (count >= cfg.Coinnum_1) {
                    this.sendPoint(curLevel + 1, curLevel, curType);
                    this.server.net_setPointLevel(curType, curLevel + 1);
                }
                break;
            case GlobalEnum.CoinType.SecondWorldGold:
                curType = type.SecondWorldGold;
                curLevel = this.data.buryingPoint[curType];
                cfg = GameConfig.Gradient.getElement(curLevel + 1);
                if (!cfg) return;
                if (count >= cfg.Coinnum_2) {
                    this.sendPoint(curLevel + 1, curLevel, curType);
                    this.server.net_setPointLevel(curType, curLevel + 1);
                }
                break;
            case GlobalEnum.CoinType.ThirdWorldGold:
                // curType = type.ThirdWorldGold;
                // curLevel = this.data.buryingPoint[curType];
                // cfg = GameConfig.Gradient.getElement(curLevel + 1);
                // if (!cfg) return;
                // if (count >= cfg.Coinnum_3) {
                //     this.sendPoint(curLevel + 1, curLevel, curType);
                //     this.server.net_setPointLevel(curType, curLevel + 1);
                // }
                break;
            case GlobalEnum.CoinType.Diamond:
                curType = type.Diamond;
                curLevel = this.data.buryingPoint[curType];
                cfg = GameConfig.Gradient.getElement(curLevel + 1);
                if (!cfg) return;
                if (count >= cfg.DMnum) {
                    this.sendPoint(curLevel + 1, curLevel, curType);
                    this.server.net_setPointLevel(curType, curLevel + 1);
                }
                break;
            case GlobalEnum.BuryingPointCoin.Star:
                curType = type.Star;
                curLevel = this.data.buryingPoint[curType];
                cfg = GameConfig.Gradient.getElement(curLevel + 1);
                if (!cfg) return;
                if (count >= cfg.PassNum) {
                    this.sendPoint(curLevel + 1, curLevel, curType);
                    this.server.net_setPointLevel(curType, curLevel + 1);
                }
                break;
            default:
                return;
        }
    }

    /**发送梯度埋点 */
    private async sendPoint(count: number, start: number, type: GlobalEnum.BuryingPointCoin) {
        let tar: string = "";
        switch (type) {
            case GlobalEnum.BuryingPointCoin.FirstWorldGold:
                tar = "a";
                break;
            case GlobalEnum.BuryingPointCoin.SecondWorldGold:
                tar = "d";
                break;
            case GlobalEnum.BuryingPointCoin.Diamond:
                tar = "b";
                break;
            case GlobalEnum.BuryingPointCoin.Star:
                tar = "c";
                break;
            default:
                break;
        }
        for (let i = count; i > start; i--) {
            AnalyticsTool.game_result(i + "" + tar);
            await TimeUtil.delaySecond(0.1);
        }
    }

    /**修改平台形象 */
    public changePlatformSkin(skinId: number, isSync: boolean): void {
        let v2 = this.localPlayer.character;

        let skinInfo = GameConfig.Avatar.getElement(skinId);
        v2.description.advance.bodyFeatures.body.height = skinInfo.characterHeight, isSync;
        v2.description.advance.headFeatures.head.headOverallScale = skinInfo.headScale, isSync;
        v2.description.advance.bodyFeatures.breast.breastOverallScale = skinInfo.breastScale, isSync;
        v2.description.advance.bodyFeatures.neck.neckHorizontalScale = skinInfo.neckWidth, isSync;
        v2.description.advance.bodyFeatures.neck.neckFrontalScale = skinInfo.neckThick, isSync;
        v2.description.advance.bodyFeatures.chest.chestHorizontalScale = skinInfo.shoulderWidth, isSync;
        v2.description.advance.bodyFeatures.chest.chestFrontalScale = skinInfo.shoulderThick, isSync;
        v2.description.advance.bodyFeatures.ribs.ribHorizontalScale = skinInfo.ribWidth, isSync;
        v2.description.advance.bodyFeatures.waist.waistHorizontalScale = skinInfo.waistWidth, isSync;
        v2.description.advance.bodyFeatures.waist.waistFrontalScale = skinInfo.waistThick, isSync;
        v2.description.advance.bodyFeatures.neck.neckVerticalScale = skinInfo.neckStretch, isSync;
        v2.description.advance.bodyFeatures.chest.chestVerticalScale = skinInfo.breastStretch, isSync;
        v2.description.advance.bodyFeatures.waist.waistVerticalScale = skinInfo.waistStretch, isSync;
        v2.description.advance.bodyFeatures.hips.hipHorizontalScale = skinInfo.groinWidth, isSync;
        v2.description.advance.bodyFeatures.hips.hipFrontalScale = skinInfo.groinThick, isSync;
        v2.description.advance.bodyFeatures.arms.shoulderHorizontalScale = skinInfo.shoulderArmWidth, isSync;
        v2.description.advance.bodyFeatures.arms.upperArmHorizontalScale = skinInfo.upperArmsWidth, isSync;
        v2.description.advance.bodyFeatures.arms.upperArmFrontalScale = skinInfo.upperArmsThick, isSync;
        v2.description.advance.bodyFeatures.arms.forearmHorizontalScale = skinInfo.lowerArmsWidth, isSync;
        v2.description.advance.bodyFeatures.arms.forearmFrontalScale = skinInfo.lowerArmsThick, isSync;
        v2.description.advance.bodyFeatures.arms.upperArmVerticalScale = skinInfo.upperArmsStreth, isSync;
        v2.description.advance.bodyFeatures.arms.forearmVerticalScale = skinInfo.lowerArmsStreth, isSync;
        v2.description.advance.bodyFeatures.hands.handOverallScale = skinInfo.handScale, isSync;
        v2.description.advance.bodyFeatures.legs.thighVerticalScale = skinInfo.thighStreth, isSync;
        v2.description.advance.bodyFeatures.legs.thighHorizontalScale = skinInfo.thighThicknessX, isSync;
        v2.description.advance.bodyFeatures.legs.thighFrontalScale = skinInfo.thighThicknessZ, isSync;
        v2.description.advance.bodyFeatures.legs.calfVerticalScale = skinInfo.shankStreth, isSync;
        v2.description.advance.bodyFeatures.legs.calfHorizontalScale = skinInfo.shankScaleX, isSync;
        v2.description.advance.bodyFeatures.legs.calfFrontalScale = skinInfo.shankScaleZ, isSync;
        v2.description.advance.bodyFeatures.feet.feetOverallScale = skinInfo.footScale, isSync;
        v2.syncDescription();
    }

    /**客户端通过id获取另一个客户端玩家的name */
    public async getPlayerNameById(id: number) {
        return await this.server.net_getPlayerNameById(id);
    }

    /**服务端获取客户端玩家name */
    public net_getPlayerName() {
        return AccountService.getNickName();
    }
}
