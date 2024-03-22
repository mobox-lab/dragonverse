/*
 * @Author       : dal
 * @Date         : 2023-11-03 14:01:00
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2023-12-25 09:43:14
 * @FilePath: \hauntedparadise\JavaScripts\codes\GameStart.ts
 * @Description  : 
 */
import {AddGMCommand, GM} from "module_gm";
import {GameConfig} from "../config/GameConfig";
import {I18n} from "./I18n";
import {GMBasePanelUI} from "./common/gm/GmUI";
import {localGMConfig} from "./common/gm/config";
import PlayerArchiveData from "./modules/archive/ArchiveData";
import ArchiveModuleC from "./modules/archive/ArchiveModuleC";
import ArchiveModuleS from "./modules/archive/ArchiveModuleS";
import {BagModuleC} from "./modules/bag/BagModuleC";
import {BagModuleS} from "./modules/bag/BagModuleS";
import {BlackBoardModuleC} from "./modules/blackboard/BlackBoardMdouleC";
import {BlackBoardModuleS} from "./modules/blackboard/BlackBoardModuleS";
import {CameraModuleC, CameraModuleS} from "./modules/camera/CameraModule";
import {CameraCG} from "./modules/cameraCG/CameraCG";
import {EquipModuleC} from "./modules/equip/EquipModuleC";
import {EquipModuleS} from "./modules/equip/EquipModuleS";
// import {GhostModuleC} from "./modules/ghost/GhostModuleC";
// import {GhostModuleS} from "./modules/ghost/GhostModuleS";
import {GlobalRankModuleC} from "./modules/globalRank/GlobalRankModuleC";
import {GlobalRankModuleS} from "./modules/globalRank/GlobalRankModuleS";
import PlayerRankData from "./modules/globalRank/PlayerRankData";
import HelpModuleC from "./modules/help/HelpModuleC";
import HelpModuleS from "./modules/help/HelpModuleS";
import HotWeaponModuleC from "./modules/hotweapon/HotWeaponC";
import HotWeaponModuleS from "./modules/hotweapon/HotWeaponS";
import {InterSaveModuleC, InterSaveModuleS} from "./modules/inter/InterSaveHelper";
import {ObjInterModuleC} from "./modules/inter/ObjInterModuleC";
import {ObjInterModuleS} from "./modules/inter/ObjInterModuleS";
import {PlayerInterModuleC, PlayerInterModuleS} from "./modules/inter/PlayerInterModule";
import MeleeWeaponModuleC from "./modules/meleeweapon/MeleeWeaponC";
import MeleeWeaponModuleS from "./modules/meleeweapon/MeleeWeaponS";
import PlayerData from "./modules/player/PlayerData";
import {PlayerModuleC} from "./modules/player/PlayerModuleC";
import {PlayerModuleS} from "./modules/player/PlayerModuleS";
import ProcedureData from "./modules/procedure/ProcedureData";
import {ProcedureModuleC} from "./modules/procedure/ProcedureModuleC";
import {ProcedureModuleS} from "./modules/procedure/ProcedureModuleS";
import TimeModuleC from "./modules/time/TimeModuleC";
import TimeModuleS from "./modules/time/TimeModuleS";
import AutoGraphic from "./utils/AutoGraphic";
import {UtilEx} from "./utils/UtilEx";
import {DanmakuModuleC, DanmakuModuleS} from "./modules/danmaku/DanmakuModule";
import {GhostTraceHelper} from "./utils/TraceHelper";
import {GamesStartDefines} from "./Defines";
import ExGuideModuleS from "./modules/guide/ExGuideModuleS";
import ExGuideModuleC from "./modules/guide/ExGuideModuleC";
import ExGuideData from "./modules/guide/ExGuideData";
import {RouteModuleS, RouteModuleC} from "./modules/route/RouteModule";
import {PlayerManagerExtension} from "./Modified027Editor/ModifiedPlayer";
import MergeConfigHelper from "./utils/MergeConfigHelper";
import StoreModuleS from "./modules/store/StoreModuleS";
import StoreModuleC from "./modules/store/StoreModuleC";
import StoreData from "./modules/store/StoreData";
import TreasureModuleS from "./modules/treasure/TreasureModuleS";
import TreasureModuleC from "./modules/treasure/TreasureModuleC";
import TreasureData from "./modules/treasure/TreasureData";
import {IDCardModuleC, IDCardModuleS} from "./modules/idcard/IDCardModule";
import {ScenePropsModuleS, ScenePropsModuleC} from "./modules/sceneProps/ScenePropsModule";
import {ScenePropsData} from "./modules/sceneProps/ScenePropsData";
import {BuffModuleC, BuffModuleS} from "./modules/buff/BuffModule";
import {MailBoxData, MailBoxModuleC, MailBoxModuleS} from "../modules/mailbox/MailBoxModule";
import {BuildModuleS} from "../modules/build/BuildModuleS";
import {BuildModuleC} from "../modules/build/BuildModuleC";
import {HomeModuleS} from "../modules/home/HomeModuleS";
import {HomeModuleC} from "../modules/home/HomeModuleC";

/**
 * 游戏主题
 * @deprecated 容易和gameStart形成循环依赖，建议用Defines下的EGameTheme
 */
export enum EGameTheme {

    /** 大厅 */
    Hall = "Hall",

    /** 学校 */
    School = "School",

    /** 医院 */
    Hospital = "Hospital",

    /** 孤岛 */
    Graveyard = "Graveyard",

    /** 小镇 */
    Town = "Town",

    /** 占位 */
    Empty = "Empty"
}
/** odin启动类 */
@Component
export default class GameStart extends mw.Script {

    public static isOpenHelp: boolean = false;

    public static isGPark: boolean = false;

    /** 是否功能测试 */
    public static IsTesting: boolean = false;

    @mw.Property({group: "辅助功能", displayName: "速开游戏", tooltip: "帮助功能测提效"})
    public isTesting: boolean = false;

    @mw.Property({group: "全局设置", displayName: "有存档模式"})
    public notDB: boolean = false;

    @mw.Property({group: "全局设置", displayName: "启用GM命令"})
    private useGM = true;

    @mw.Property({group: "全局设置", displayName: "当前语言:-1系统0英1中"})
    public language: number = -1;

    @Property({group: "全局设置", displayName: "是否是海外"})
    public isGark: boolean = false;

    @Property({group: "全局设置", displayName: "是否开启时间系统"})
    public isOpenTimer: boolean = false;

    @Property({group: "全局设置", displayName: "游戏主题", enumType: EGameTheme, selectOptions: EGameTheme})
    public readonly gameTheme: EGameTheme = EGameTheme.School;

    @Property({group: "全局设置", displayName: "打开救人系统"})
    public isOpenHelp: boolean = false;

    @Property({group: "全局设置", displayName: "打开玩家间碰撞"})
    public isOpenCharCollsion: boolean = false;

    /** 全局 */
    public static GameTheme: EGameTheme = EGameTheme.School;

    /** 是否A包 */
    @Property({group: "全局设置", displayName: "是否A包"})
    public isA: boolean = true;

    /** 是否A包 */
    public static IsAPackage: boolean = true;

    private _autoGraphic: AutoGraphic = null;

    protected override onStart(): void {
        GameStart.IsTesting = this.isTesting;
        GameStart.GameTheme = this.gameTheme;
        GameStart.IsAPackage = this.isA;
        GameStart.isGPark = this.isGark;
        GameStart.isOpenHelp = this.isOpenHelp;
        GamesStartDefines.isOpenCharCollsion = this.isOpenCharCollsion;
        GamesStartDefines.gameTheme = this.gameTheme;
        ScriptingSettings.setGlobalAsyncTimeout(1000 * 10);
        // 设置存档模式
        DataStorage.setTemporaryStorage(SystemUtil.isPIE || !this.notDB);
        I18n.initLanguage(this.language);
        // GM
        if (this.useGM) {
            localGMConfig.forEach(cmd => {
                AddGMCommand(cmd.label, cmd.clientCmd, cmd.serverCmd, cmd.group);
            });
            SystemUtil.isClient() && GM.start(GMBasePanelUI);
        }

        this.registerModule();

        // 先临时处理一下
        setTimeout(() => {
            MergeConfigHelper.merge(GameConfig.Item, GameConfig.SubItem);
            GameConfig.Item.getAllElement().forEach(e => {
                if (e.clazz == "Currency") {
                    e.type = 1;
                }
            });
        }, 1e3);

        //Event.dispatchToLocal(EVENT_REG_COMM_MODULE);
        // AdapterFunction.onInitGame();
        this.useUpdate = true;
        if (SystemUtil.isClient()) {
            this._autoGraphic = new AutoGraphic();
            this._autoGraphic.onStart();
            this.initAssets();
            CameraCG.instance.init();
            /**  重写ShowUI进行埋点 */
            const originalShowUI = mw.UIService.showUI.bind(mw.UIService);

            mw.UIService.showUI = (panel: mw.UIScript, layer?: number, ...params: any[]) => {
                GhostTraceHelper.uishowTrace(panel.constructor.name);
                return originalShowUI(panel, layer, ...params);
            };

            Event.addLocalListener("PlayButtonClick", (btnname: string) => {
                GhostTraceHelper.buttonTrace(btnname);
            });
        }
        console.info("[GameStart] 初始化游戏结束");
        const mainTween = TweenUtil.TWEEN;
        mainTween.update = (time = TweenUtil["now"](), preserve = false) => {
            let tweenIds = Object.keys(mainTween["_tweens"]);
            if (tweenIds.length === 0) {
                return false;
            }
            while (tweenIds.length > 0) {
                mainTween["_tweensAddedDuringUpdate"] = {};
                for (let i = 0; i < tweenIds.length; i++) {
                    const tween = mainTween["_tweens"][tweenIds[i]];
                    const autoStart = !preserve;
                    try {
                        if (tween && tween.update(time, autoStart) === false && !preserve) {
                            delete mainTween["_tweens"][tweenIds[i]];
                        }
                    } catch (error) {
                        delete mainTween["_tweens"][tweenIds[i]];
                        console.error(error);
                        console.error(error.stack);
                    }
                }
                tweenIds = Object.keys(mainTween["_tweensAddedDuringUpdate"]);
            }
            return true;
        };
    }

    private async initAssets() {
        let cfgs = GameConfig.GhostGraphic.getAllElement();
        for (let index = 0; index < cfgs.length; index++) {
            const element = cfgs[index];
            await UtilEx.asyncLoadAsset(element.deathAni);
        }
    }

    registerModule() {
        ModuleService.registerModule(CameraModuleS, CameraModuleC);
        ModuleService.registerModule(BagModuleS, BagModuleC);
        ModuleService.registerModule(BlackBoardModuleS, BlackBoardModuleC);
        ModuleService.registerModule(EquipModuleS, EquipModuleC);
        // ModuleService.registerModule(GhostModuleS, GhostModuleC);
        ModuleService.registerModule(ObjInterModuleS, ObjInterModuleC);
        ModuleService.registerModule(PlayerModuleS, PlayerModuleC, PlayerData);
        ModuleService.registerModule(ProcedureModuleS, ProcedureModuleC, ProcedureData);
        ModuleService.registerModule(PlayerInterModuleS, PlayerInterModuleC);
        ModuleService.registerModule(ArchiveModuleS, ArchiveModuleC, PlayerArchiveData);
        ModuleService.registerModule(GlobalRankModuleS, GlobalRankModuleC, PlayerRankData);
        // ModuleService.registerModule(InterSaveModuleS, InterSaveModuleC);
        ModuleService.registerModule(HotWeaponModuleS, HotWeaponModuleC);
        ModuleService.registerModule(MeleeWeaponModuleS, MeleeWeaponModuleC);
        ModuleService.registerModule(DanmakuModuleS, DanmakuModuleC);
        ModuleService.registerModule(HelpModuleS, HelpModuleC);
        ModuleService.registerModule(RouteModuleS, RouteModuleC);
        ModuleService.registerModule(ScenePropsModuleS, ScenePropsModuleC, ScenePropsData);
        ModuleService.registerModule(StoreModuleS, StoreModuleC, StoreData);
        ModuleService.registerModule(MailBoxModuleS, MailBoxModuleC, MailBoxData);
        PlayerManagerExtension.init();
        if (this.gameTheme === EGameTheme.Hall) {
            ModuleService.registerModule(ExGuideModuleS, ExGuideModuleC, ExGuideData);
            ModuleService.registerModule(TreasureModuleS, TreasureModuleC, TreasureData);
        }
        this.isOpenTimer && ModuleService.registerModule(TimeModuleS, TimeModuleC);
        ModuleService.registerModule(IDCardModuleS, IDCardModuleC);
        ModuleService.registerModule(BuildModuleS, BuildModuleC);
        ModuleService.registerModule(BuffModuleS, BuffModuleC);
        ModuleService.registerModule(HomeModuleS, HomeModuleC);
    }

    protected override onDestroy(): void {
    }

    protected override onUpdate(dt: number) {
        super.onUpdate(dt);
        TweenUtil.TWEEN.update();
        if (SystemUtil.isClient()) {
            this._autoGraphic.onUpdate(dt);
        }
    }


}
