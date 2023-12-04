import i18n, { LanguageTypes } from "./language/i18n";
import AuthModuleData, { AuthModuleC, AuthModuleS } from "./module/AuthModule";
import GMPanel from "./ui/gm/GmPanel";
import CollectibleItemModuleData, {
    CollectibleItemModuleC,
    CollectibleItemModuleS,
} from "./module/collectible-item/CollectibleItemModule";
import BagModuleData, { BagModuleC, BagModuleS } from "./module/bag/BagModule";
import SceneDragonModuleData, { SceneDragonModuleC, SceneDragonModuleS } from "./module/scene-dragon/SceneDragonModule";
import Log4Ts, { DebugLevels } from "./depend/log4ts/Log4Ts";
import { GM } from "module_gm";

@Component
export default class GameStart extends mw.Script {
    public static instance: GameStart = null;

//region Dev Config

    @mw.Property({displayName: "是否发布", group: "发布"})
    public isRelease: boolean = false;

    @mw.Property({displayName: "语言", group: "发布", enumType: LanguageTypes})
    public language: LanguageTypes = LanguageTypes.Chinese;

    @mw.Property({displayName: "线上存储", group: "发布"})
    public isOnline: boolean = false;

    @mw.Property({displayName: "是否 GM", group: "调试"})
    public isShowGMPanel: boolean = true;

    @mw.Property({displayName: "服务端日志等级", group: "调试", enumType: LanguageTypes})
    public serverLogLevel: DebugLevels = DebugLevels.Dev;

    @mw.Property({displayName: "客户端日志等级", group: "调试", enumType: LanguageTypes})
    public clientLogLevel: DebugLevels = DebugLevels.Dev;

    private _godMode: boolean = false;

//endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    protected onStart(): void {
        this.useUpdate = true;
        GameStart.instance = this;

        this.initialize();
        this.registerTestKeyT();
        this.registerGodModeG();
    }

    protected onUpdate(dt: number): void {
    }

    protected onDestroy(): void {
    }

    /**
     * 游戏初始化.
     * @private
     */
    private initialize() {
        this.registerModule();

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
    }

    private initializeClient() {
        Log4Ts.debugLevel = this.clientLogLevel;

        this.isShowGMPanel && GM.start(GMPanel);
    }

    private initializeServer() {
        Log4Ts.debugLevel = this.serverLogLevel;
        DataStorage.setTemporaryStorage(!this.isOnline);
    }

    private registerModule(): void {
        const moduleService = ModuleService;
        // moduleService.registerModule(PlayerModuleS, PlayerModuleC, PlayerData);
        moduleService.registerModule(AuthModuleS, AuthModuleC, AuthModuleData);
        moduleService.registerModule(CollectibleItemModuleS, CollectibleItemModuleC, CollectibleItemModuleData);
        moduleService.registerModule(SceneDragonModuleS, SceneDragonModuleC, SceneDragonModuleData);
        moduleService.registerModule(BagModuleS, BagModuleC, BagModuleData);
    }

    private registerTestKeyT() {
        InputUtil.onKeyDown(mw.Keys.T, () => {
            Log4Ts.log(GameStart, `Key T pressed`);
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
                Player.localPlayer.character.switchToWalking();
            }
        });
    }
}