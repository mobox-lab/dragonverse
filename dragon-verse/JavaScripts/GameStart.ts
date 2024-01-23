import { GM } from "module_gm";
import * as mwaction from "mwaction";
import { HeadUIController } from "./controller/HeadUIController";
import { KeyboardManager } from "./controller/KeyboardManager";
import { TimeManager } from "./controller/TimeManager";
import { VectorExt } from "./declaration/vectorext";
import Log4Ts, { DebugLevels } from "./depend/log4ts/Log4Ts";
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
import GMPanel from "./ui/gm/GmPanel";
import MainPanel from "./ui/main/MainPanel";
import { VisualizeDebug } from "./util/VisualizeDebug";
import { MapManager } from "./gameplay/map/MapManager";
import { Delegate } from "./depend/delegate/Delegate";
import GToolkit from "./util/GToolkit";
import SystemUtil = mw.SystemUtil;
import Nolan from "./depend/nolan/Nolan";
import GameServiceConfig from "./const/GameServiceConfig";
import AudioController, { BgmPlayStrategy } from "./controller/audio/AudioController";
import DialogifyManager from "./depend/dialogify/DialogifyManager";
import DialoguePanelController from "./depend/dialogify/dialogue-panel-controller/DialoguePanelController";
import GlobalPromptPanel_Generate from "./ui-generate/main/GlobalPromptPanel_generate";
import GlobalProperty from "./GlobalProperty";

@Component
export default class GameStart extends mw.Script {
//#region Dev Config

    @mw.Property({displayName: "是否发布", group: "发布"})
    public isRelease: boolean = false;

    @mw.Property({
        displayName: "语言",
        group: "发布",
        enumType: LanguageTypes,
        tooltip: "发布时语言 将依赖于 LocalUtil 获取本地化.",
    })
    public language: LanguageTypes = LanguageTypes.English;

    @mw.Property({displayName: "画质等级设置", group: "发布", enumType: GraphicsLevel})
    public graphicsLevel: GraphicsLevel = GraphicsLevel.Cinematic3;

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
        GlobalProperty.getInstance().isRelease = this.isRelease;
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
        if (this.isRelease) {
            this.isOnline = true;
            this.isShowGMPanel = false;
            i18n.release();
        }

        if (SystemUtil.isClient()) {
            this.initializeClient();
        } else if (SystemUtil.isServer()) {
            this.initializeServer();
        }
        this.registerModule();

        HeadUIController.getInstance().initialize();
        TimeManager.getInstance();
        VectorExt.initialize();
        mwaction;
    }

    private initI18n() {
        if (this.language !== LanguageTypes.English) {
            i18n.use(this.language);
            Log4Ts.log(GameStart, `i18n use default language: ${this.language} because using specified non-English language.`);
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

        this.registerKeyScrollUp();
        this.registerKeyScrollDown();

        //#region GodMode
        if (!this.isRelease) {
            this.registerTestKeyT();
            this.registerGodModeG();
            this.registerGodModeShift();
            this.registerGodModeF();

            //#region Exist for Test
            //R <<<<<<
            //
            //  ------
            //T >>>>>>
            //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

        }
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

        this.initI18n();
        this.isShowGMPanel && GM.start(GMPanel);
        VisualizeDebug.init(mw.Player.localPlayer);
        KeyboardManager.getInstance();

        DialogifyManager.getInstance().initController(new DialoguePanelController());

        GraphicsSettings.setGraphicsCPULevel(this.graphicsLevel);
        GraphicsSettings.setGraphicsGPULevel(this.graphicsLevel);

        MapManager.instance.showMap();

        AudioController.getInstance().playBgm(undefined, BgmPlayStrategy.Rnd);
    }

    private initializeServer() {
        Log4Ts.debugLevel = this.serverLogLevel;
        DataStorage.setTemporaryStorage(!this.isOnline);
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
        moduleService.registerModule(RoleModuleS, RoleModuleC, RoleModuleData);
        moduleService.registerModule(AuthModuleS, AuthModuleC, AuthModuleData);
        moduleService.registerModule(BagModuleS, BagModuleC, BagModuleData);
        moduleService.registerModule(CollectibleItemModuleS, CollectibleItemModuleC, CollectibleItemModuleData);
        moduleService.registerModule(SceneDragonModuleS, SceneDragonModuleC, SceneDragonModuleData);
        moduleService.registerModule(NpcModuleS, NpcModuleC, NpcModuleData);
        moduleService.registerModule(CompanionModule_S, CompanionModule_C, CompanionData);
        moduleService.registerModule(QuestModuleS, QuestModuleC, QuestData);
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

    private registerKeyScrollUp() {
        InputUtil.onKeyDown(mw.Keys.MouseScrollUp, () => {
            if (!this._nolan) {
                Log4Ts.warn(GameStart, `nolan not ready.`);
                return;
            }

            const dist = Math.max(GameServiceConfig.CAMERA_ZOOM_MIN_DIST, this._nolan.armLength - GameServiceConfig.CAMERA_ZOOM_PER_DIST);
            this._nolan.zoom(dist, true, GameServiceConfig.CAMERA_ZOOM_PER_DURATION);
        });
    }

    private registerKeyScrollDown() {
        InputUtil.onKeyDown(mw.Keys.MouseScrollDown, () => {
            if (!this._nolan) {
                Log4Ts.warn(GameStart, `nolan not ready.`);
                return;
            }

            const dist = Math.min(GameServiceConfig.CAMERA_ZOOM_MAX_DIST, this._nolan.armLength + GameServiceConfig.CAMERA_ZOOM_PER_DIST);
            this._nolan.zoom(dist, true, GameServiceConfig.CAMERA_ZOOM_PER_DURATION);
        });
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
            Log4Ts.log(GameStart,
                `Key G pressed`,
                `God Mode: ${this._godMode ? "On" : "Off"}`);
            if (this._godMode) {
                Player.localPlayer.character.switchToFlying();
            } else {
                if (this._godModeSprint) {
                    this._godModeSprint = false;
                    Player.localPlayer.character.maxFlySpeed /= this.godModeSprintRatio;
                }
                Player.localPlayer.character.switchToWalking();
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
                Player.localPlayer.character.worldTransform.position =
                    currPos
                        .add(Player
                            .getControllerRotation()
                            .rotateVector(Vector
                                .forward)
                            .multiply(this.godModeFlashDist));
            }
        });
    }
}
