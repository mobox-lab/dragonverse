import * as mwaction from "mwaction";
import { HeadUIController } from "./controller/HeadUIController";
import { TimeManager } from "./controller/TimeManager";
import { VectorExt } from "./declaration/vectorext";
import Log4Ts, { DebugLevels } from "mw-log4ts";
import i18n, { LanguageTypes } from "./language/i18n";
import AuthModuleData, { AuthModuleC, AuthModuleS } from "./module/auth/AuthModule";
import BagModuleData, { BagModuleC, BagModuleS } from "./module/bag/BagModule";
import CollectibleItemModuleData, {
    CollectibleItemModuleC,
    CollectibleItemModuleS,
} from "./module/collectible-item/CollectibleItemModule";
import { CompanionData } from "./module/companion/CompanionData";
import { CompanionModule_C } from "./module/companion/CompanionModule_C";
import { CompanionModule_S } from "./module/companion/CompanionModule_S";
import NpcModuleData, { NpcModuleC, NpcModuleS } from "./module/npc/NpcModule";
import { QuestData } from "./module/quest/QuestData";
import { QuestModuleC } from "./module/quest/QuestModuleC";
import { QuestModuleS } from "./module/quest/QuestModuleS";
import RoleModuleData, { RoleModuleC, RoleModuleS } from "./module/role/RoleModule";
import SceneDragonModuleData, { SceneDragonModuleC, SceneDragonModuleS } from "./module/scene-dragon/SceneDragonModule";
import MainPanel from "./ui/main/MainPanel";
import { MapManager } from "./gameplay/map/MapManager";
import { Delegate } from "./depend/delegate/Delegate";
import GToolkit, { GtkTypes } from "gtoolkit";
import SystemUtil = mw.SystemUtil;
import Nolan from "./depend/nolan/Nolan";
import AudioController, { BgmPlayStrategy } from "./controller/audio/AudioController";
import DialogifyManager from "./depend/dialogify/DialogifyManager";
import DialoguePanelController from "./depend/dialogify/dialogue-panel-controller/DialoguePanelController";
import ObbyModuleData, { ObbyModuleC, ObbyModuleS } from "./module/obby/ObbyModule";
import { JumpRoomModuleC, JumpRoomModuleS } from "./module/jump-room/JumpRoomModule";
import PlayerSettingModuleData, {
    PlayerSettingModuleC,
    PlayerSettingModuleS,
} from "./module/player-setting/PlayerSettingModule";
import { InteractiveObjModuleC, InteractiveObjModuleS } from "./gameplay/interactiveObj/InteractiveObjModule";
import GlobalTips from "./depend/global-tips/GlobalTips";
import Balancing from "./depend/balancing/Balancing";
import EcologyModuleData, { EcologyModuleC, EcologyModuleS } from "./module/ecology/EcologyModule";
import DvStatisticModuleData, { StatisticModuleC, StatisticModuleS } from "./module/statistic/StatisticModule";
import GuideModuleData, { GuideModuleC, GuideModuleS } from "./module/guide/GuideModule";
import GameServiceConfig from "./const/GameServiceConfig";
import GMHUD_Generate from "./ui-generate/gm/GMHUD_generate";
import GodModService, { addGMCommand } from "mw-god-mod";
import { DvP12BagModuleData, P12BagModuleC, P12BagModuleS } from "./module/bag/P12BagModule";
import { ChainId, Chains } from "./const/Chains";

// 新版本的GM

addGMCommand(
    "TP 传送",
    "string",
    undefined,
    (player, positionStr: string) => {
        let index = 0;
        for (let i = 0; i < positionStr.length; i++) {
            if (isNaN(parseInt(positionStr[i])) && positionStr[i] != ".") {
                index = i;
                break;
            }
        }
        let x = parseFloat(positionStr.substring(0, index));
        let y = parseFloat(positionStr.substring(index + 1));

        Log4Ts.log(addGMCommand, `tp player to ${x},${y}.`);
        player.character.worldTransform.position = new mw.Vector(x, y);
    },
    undefined,
    "探针",
);

addGMCommand(
    "Language 切换语言",
    "string",
    (value) => {
        const v = Number(value);
        if (Number.isNaN(v) || LanguageTypes[v] === undefined) {
            Log4Ts.log(addGMCommand, `非法输入. 需要输入正确的数字.`);
            for (const enumVal of GToolkit.enumVals(LanguageTypes)) {
                Log4Ts.log(undefined, `${LanguageTypes[enumVal]}: ${enumVal}`);
            }
            return;
        }

        i18n.use(v, true);
        Log4Ts.log(addGMCommand, `change language to ${LanguageTypes[v]}`);
    },
    undefined,
    undefined,
    "多语言",
);

addGMCommand(
    "Global Tips | 冒泡提示",
    "string",
    (value) => {
        GlobalTips.getInstance().showGlobalTips(value);
    },
    undefined,
    undefined,
    "提示",
);

@Component
export default class GameStart extends mw.Script {
    //#region Dev Config

    @mw.Property({displayName: "是否发布", group: "发布"})
    public isRelease: boolean = false;

    @mw.Property({displayName: "是否 Beta 发布", group: "发布"})
    public isBeta: boolean = false;

    @mw.Property({displayName: "是否使用测试 Url", group: "发布"})
    public isUseTestUrl: boolean = true;

    @mw.Property({displayName: "主网链", group: "发布", selectOptions: Chains})
    public customChainId: ChainId = Chains.Merlin;

    @mw.Property({
        displayName: "语言",
        group: "发布",
        enumType: LanguageTypes,
        tooltip: "发布时语言 将依赖于 LocalUtil 获取本地化.",
    })
    public language: LanguageTypes = LanguageTypes.English;

    // @mw.Property({ displayName: "画质等级设置", group: "发布", enumType: GraphicsLevel })
    // public graphicsLevel: GraphicsLevel = GraphicsLevel.Cinematic3;

    @mw.Property({displayName: "线上存储", group: "发布"})
    public isOnline: boolean = false;

    @mw.Property({displayName: "是否 GM", group: "调试"})
    public isShowGMPanel: boolean = true;

    @mw.Property({displayName: "服务端日志等级", group: "调试", enumType: DebugLevels})
    public serverLogLevel: DebugLevels = DebugLevels.Dev;

    @mw.Property({displayName: "客户端日志等级", group: "调试", enumType: DebugLevels})
    public clientLogLevel: DebugLevels = DebugLevels.Dev;

    @mw.Property({displayName: "上帝模式 冲刺速度倍率", group: "调试"})
    public godModeSprintRatio: number = 10;

    @mw.Property({displayName: "上帝模式 闪现位移距离", group: "调试"})
    public godModeFlashDist: number = 1000;

    private _godMode: boolean = false;

    private _godModeSprint: boolean = false;

    private _moduleReady: boolean = false;

    private _moduleReadyWaitingPool: Delegate.SimpleDelegate<void> = new Delegate.SimpleDelegate<void>();

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    private _nolan: Nolan;

    onStart(): void {
        Log4Ts.log(GameStart, `this is ${SystemUtil.isClient() ? "client" : "server"}`);
        this.useUpdate = true;
        GameServiceConfig.isRelease = this.isRelease;
        GameServiceConfig.isBeta = this.isBeta;
        GameServiceConfig.isUseTestUrl = this.isUseTestUrl;
        GameServiceConfig.chainId = this.customChainId;
        this.initialize();
    }

    protected onUpdate(dt: number): void {
        TweenUtil.TWEEN.update();
        actions.AcitonMgr.update(dt * 1000);
    }

    protected onDestroy(): void {
    }

    /**
     * 游戏初始化.
     * @private
     */
    private initialize() {
        if (GameServiceConfig.isRelease || GameServiceConfig.isBeta) {
            this.isOnline = true;
            i18n.release();
        }

        if (SystemUtil.isClient()) {
            this.initializeClient();
        } else if (SystemUtil.isServer()) {
            this.initializeServer();
        }

        if (GameServiceConfig.isRelease) {
            GodModService.getInstance().setAuthStrategy("strong");
        }
        GodModService.getInstance().authShowGm();

        Balancing.getInstance()
            .registerUpdater((callback) => {
                mw.TimeUtil.onEnterFrame.add(callback);
            })
            .setThreshold(GtkTypes.Interval.Hz144);
        this.registerModule();

        HeadUIController.getInstance().initialize();
        TimeManager.getInstance();
        VectorExt.initialize();
        mwaction;
    }

    private initI18n() {
        if (!GameServiceConfig.isRelease && this.language !== LanguageTypes.English) {
            i18n.use(this.language);
            Log4Ts.log(
                GameStart,
                `i18n use default language: ${this.language} because using specified non-English language.`,
            );
            return;
        }
        const localStr = LocaleUtil.getDefaultLocale();
        Log4Ts.log(GameStart, `current local: ${localStr}`);
        let useType: LanguageTypes = this.language;
        if (!GToolkit.isNullOrEmpty(localStr)) {
            if (RegExp(/([Zz][Hh])|([Tt][Ww])|([Hh][Kk])|([Mm][Oo])/).exec(localStr)) {
                useType = LanguageTypes.Chinese;
            } else if (RegExp(/[Ee][Nn]/).exec(localStr)) {
                useType = LanguageTypes.English;
            } else if (RegExp(/[Jj][Pp]/).exec(localStr)) {
                useType = LanguageTypes.Japanese;
                // } else if (localStr.match(/[Dd][Ee]/)) {
                //     useType = LanguageTypes.German;
            }
        }
        Log4Ts.log(GameStart, `use language: ${useType}`);
        i18n.use(useType);
    }

    private initializeClient() {
        Log4Ts.debugLevel = this.clientLogLevel;

        this._nolan = Nolan.getInstance();

        UIService.show(MainPanel);
        //#region GodMode
        if (!GameServiceConfig.isRelease) {
            this.registerTestKeyT();
            this.registerGodModeG();
            this.registerGodModeShift();
            this.registerGodModeF();
            this.registerGMVisibleKey();
            //#region Exist for Test
            //R <<<<<<
            //
            //  ------
            //T >>>>>>
            //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
        }
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

        this.initI18n();

        DialogifyManager.getInstance().initController(new DialoguePanelController());

        // GraphicsSettings.setGraphicsCPULevel(this.graphicsLevel);
        // GraphicsSettings.setGraphicsGPULevel(this.graphicsLevel);

        MapManager.instance.showMap();

        AudioController.getInstance().playBgm(undefined, BgmPlayStrategy.Rnd);

        ChatService.asyncEnableChatWindow(false);

        InputUtil.mouseLockOptionEnabled = false;
        InputUtil.isLockMouse = true;
        // InputUtil.isCursorLocked = true;

        SettingService.setSettingButtonVisible(false);
    }

    private initializeServer() {
        Log4Ts.debugLevel = this.serverLogLevel;
        console.log(`isPIE: ${SystemUtil.isPIE}`);
        DataStorage.setTemporaryStorage(SystemUtil.isPIE);
        GameObject.asyncFindGameObjectById("0B48E050").then((value) => {
            const effect = value as mw.Effect;
            effect.loopCount = 1;
            setInterval(
                () => {
                    Log4Ts.log(GameStart, `force re awake effect at ${new Date()}`);
                    effect.play();
                },
                effect.timeLength < 1e3 ? GtkTypes.Interval.PerMin / 2 : effect.timeLength,
            );
        });
    }

    private whenModuleReady(callback: Delegate.SimpleDelegateFunction<void>) {
        if (this._moduleReady) {
            try {
                callback();
            } catch (e) {
                Log4Ts.error(GameStart, e);
            }
        } else {
            this._moduleReadyWaitingPool.once(callback);
        }
    }

    private registerModule(): void {
        const moduleService = ModuleService;
        // moduleService.registerModule(PlayerModuleS, PlayerModuleC, PlayerData);
        moduleService.registerModule(StatisticModuleS, StatisticModuleC, DvStatisticModuleData);
        moduleService.registerModule(RoleModuleS, RoleModuleC, RoleModuleData);
        moduleService.registerModule(AuthModuleS, AuthModuleC, AuthModuleData);
        moduleService.registerModule(BagModuleS, BagModuleC, BagModuleData);
        moduleService.registerModule(CollectibleItemModuleS, CollectibleItemModuleC, CollectibleItemModuleData);
        moduleService.registerModule(SceneDragonModuleS, SceneDragonModuleC, SceneDragonModuleData);
        moduleService.registerModule(NpcModuleS, NpcModuleC, NpcModuleData);
        moduleService.registerModule(CompanionModule_S, CompanionModule_C, CompanionData);
        moduleService.registerModule(QuestModuleS, QuestModuleC, QuestData);
        moduleService.registerModule(ObbyModuleS, ObbyModuleC, ObbyModuleData);
        moduleService.registerModule(JumpRoomModuleS, JumpRoomModuleC, null);
        moduleService.registerModule(PlayerSettingModuleS, PlayerSettingModuleC, PlayerSettingModuleData);
        moduleService.registerModule(InteractiveObjModuleS, InteractiveObjModuleC, null);
        moduleService.registerModule(EcologyModuleS, EcologyModuleC, EcologyModuleData);
        moduleService.registerModule(GuideModuleS, GuideModuleC, GuideModuleData);
        moduleService.registerModule(P12BagModuleS, P12BagModuleC, DvP12BagModuleData);

        if (SystemUtil.isClient()) {
            moduleService.getModule(RoleModuleC).delegateOnReady(() => {
                this._moduleReady = true;
                this._moduleReadyWaitingPool.invoke();
            });
        } else if (SystemUtil.isServer()) {
            this._moduleReady = true;
            this._moduleReadyWaitingPool.invoke();
        }
    }

    private show: boolean = false;

    private registerTestKeyT() {
        InputUtil.onKeyDown(mw.Keys.T, () => {
            Log4Ts.log(GameStart, `Key T pressed`);
            this.show = !this.show;
            UIService.getUI(MainPanel).showSprintUiEffect(this.show);
        });
    }

    private registerGodModeG() {
        InputUtil.onKeyDown(mw.Keys.G, () => {
            this._godMode = !this._godMode;
            Log4Ts.log(GameStart, `Key G pressed`, `God Mode: ${this._godMode ? "On" : "Off"}`);
            if (this._godMode) {
                Player.localPlayer.character.changeState(CharacterStateType.Flying);
            } else {
                if (this._godModeSprint) {
                    this._godModeSprint = false;
                    Player.localPlayer.character.maxFlySpeed /= this.godModeSprintRatio;
                }
                Player.localPlayer.character.changeState(CharacterStateType.Running);
            }
        });
    }

    private registerGodModeShift() {
        InputUtil.onKeyDown(mw.Keys.LeftShift, () => {
            if (this._godMode && !this._godModeSprint) {
                this._godModeSprint = true;
                Player.localPlayer.character.maxFlySpeed *= this.godModeSprintRatio;
            }
        });
        InputUtil.onKeyUp(mw.Keys.LeftShift, () => {
            if (this._godMode && this._godModeSprint) {
                this._godModeSprint = false;
                Player.localPlayer.character.maxFlySpeed /= this.godModeSprintRatio;
            }
        });
    }

    private registerGodModeF() {
        InputUtil.onKeyDown(mw.Keys.F, () => {
            Log4Ts.log(GameStart, `Key T pressed. is god mode: ${this._godMode}`);
            if (this._godMode) {
                let currPos = Player.localPlayer.character.worldTransform.position;
                Player.localPlayer.character.worldTransform.position = currPos.add(
                    Player.getControllerRotation().rotateVector(Vector.forward).multiply(this.godModeFlashDist),
                );
            }
        });
    }

    private isGMVisible: boolean = true;

    private registerGMVisibleKey() {
        InputUtil.onKeyUp(mw.Keys.F12, () => {
            this.isGMVisible = !this.isGMVisible;
            if (this.isGMVisible) {
                UIService.show(GMHUD_Generate);
            } else {
                UIService.hide(GMHUD_Generate);
            }
        });
    }
}
