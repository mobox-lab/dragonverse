import i18n, { LanguageTypes } from "./language/i18n";
import GToolkit, { DebugLevels } from "./util/GToolkit";
import AuthModuleData, { AuthModuleC, AuthModuleS } from "./module/AuthModule";

@Component
export default class GameStart extends mw.Script {
    public static instance: GameStart = null;

    //region Dev Config
    @mw.Property({displayName: "线上存储"})
    isOnline: boolean = false;

    @mw.Property({displayName: "语言", enumType: LanguageTypes})
    public language: LanguageTypes = LanguageTypes.Chinese;

    @mw.Property({displayName: "是否开启GM", group: "调试"})
    public isShowGMPanel: boolean = true;

    @mw.Property({displayName: "服务端log等级", group: "调试"})
    public serverLogLevel: DebugLevels = DebugLevels.Dev;

    @mw.Property({displayName: "客户端log等级", group: "调试"})
    public clientLogLevel: DebugLevels = DebugLevels.Dev;

    //endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    protected onStart(): void {
        this.useUpdate = true;
        GameStart.instance = this;

        this.initialize();
        this.registerTestKeyT();
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

        if (SystemUtil.isClient()) {
            this.initializeClient();
        } else if (SystemUtil.isServer()) {
            this.initializeServer();
        }
    }

    private initializeClient() {
        GToolkit.debugLevel = this.clientLogLevel;

        // this.isShowGMPanel && GM.start(GMPanel);
    }

    private initializeServer() {
        GToolkit.debugLevel = this.serverLogLevel;
        DataStorage.setTemporaryStorage(!this.isOnline);
    }

    private registerModule(): void {
        const moduleService = ModuleService;
        // moduleService.registerModule(PlayerModuleS, PlayerModuleC, PlayerData);
        moduleService.registerModule(AuthModuleS, AuthModuleC, AuthModuleData);
    }

    private registerTestKeyT() {
        GToolkit.log(GameStart, `Key T pressed`);
    }
}