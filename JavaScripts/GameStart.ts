import { GM } from "module_gm";
import * as mwaction from "mwaction";
import { KeyboardManager } from "./controller/KeyboardManager";
import { PlayerController } from "./controller/PlayerController";
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
import { EventDefine } from "./const/EventDefine";

@Component
export default class GameStart extends mw.Script {
    public static instance: GameStart = null;

    //region Dev Config

    @mw.Property({displayName: "是否发布", group: "发布"})
    public isRelease: boolean = false;

    @mw.Property({displayName: "语言", group: "发布", enumType: LanguageTypes})
    public language: LanguageTypes = LanguageTypes.English;

    @mw.Property({displayName: "线上存储", group: "发布"})
    public isOnline: boolean = false;

    @mw.Property({displayName: "是否 GM", group: "调试"})
    public isShowGMPanel: boolean = true;

    @mw.Property({displayName: "服务端日志等级", group: "调试", enumType: LanguageTypes})
    public serverLogLevel: DebugLevels = DebugLevels.Dev;

    @mw.Property({displayName: "客户端日志等级", group: "调试", enumType: LanguageTypes})
    public clientLogLevel: DebugLevels = DebugLevels.Dev;

    @mw.Property({displayName: "上帝模式 冲刺速度倍率", group: "调试"})
    public godModeSprintRatio: number = 10;

    @mw.Property({displayName: "上帝模式 闪现位移距离", group: "调试"})
    public godModeFlashDist: number = 1000;

    private _godMode: boolean = false;

    private _godModeSprint: boolean = false;

    //endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    protected onStart(): void {
        Log4Ts.log(GameStart, `this is ${SystemUtil.isClient() ? "client" : "server"}`);
        this.useUpdate = true;
        GameStart.instance = this;

        this.initialize();
        this.registerTestKeyT();

        //#region GodMode
        this.registerGodModeG();
        this.registerGodModeShift();
        this.registerGodModeF();
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
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
        i18n.use(this.language);

        if (this.isRelease) {
            this.isOnline = true;
            this.isShowGMPanel = false;
            this.serverLogLevel = DebugLevels.Silent;
            this.clientLogLevel = DebugLevels.Silent;
        }

        if (SystemUtil.isClient()) {
            this.initializeClient();
        } else if (SystemUtil.isServer()) {
            this.initializeServer();
        }
        this.registerModule();

        TimeManager.getInstance();
        VectorExt.initialize();
        mwaction;
    }

    private initializeClient() {
        Log4Ts.debugLevel = this.clientLogLevel;

        this.isShowGMPanel && GM.start(GMPanel);
        VisualizeDebug.init(mw.Player.localPlayer);
        KeyboardManager.getInstance();
        PlayerController.getInstance();

        UIService.show(MainPanel);
    }

    private initializeServer() {
        Log4Ts.debugLevel = this.serverLogLevel;
        DataStorage.setTemporaryStorage(!this.isOnline);
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

    }

    private registerTestKeyT() {
        InputUtil.onKeyDown(mw.Keys.T, () => {
            Log4Ts.log(GameStart, `Key T pressed`);
            Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, {message: "Hello world"});
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