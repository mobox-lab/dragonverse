import { GM } from "module_gm";
import { GameConfig } from "./config/GameConfig";
import { GlobalData } from "./const/GlobalData";
import { GMBasePanelUI } from "./modules/GM/GMModule";
import { HudModuleC, HudModuleS } from "./modules/Hud/HudModule";
import { PlayerModuleC } from "./modules/Player/PlayerModuleC";
import { PlayerModuleS } from "./modules/Player/PlayerModuleS";
import { LogManager as mLogManager, oTrace, oTraceError, oTraceWarning } from "./util/LogManager";
import { GameObjectFactory } from "./modules/Resources/GameObjectPool";
import { Resource } from "./modules/Resources/resource";
import { AreaModuleS } from "./modules/AreaDivide/AreaModuleS";
import { AreaModuleC } from "./modules/AreaDivide/AreaModuleC";
import { AreaModuleData } from "./modules/AreaDivide/AreaModuleData";
import { InputModuleC, InputModuleS } from "./modules/Input/InputModule";
import { ResourceModuleC, ResourceModuleS } from "./modules/Resources/ResourceModule";
import { PetSimulatorPlayerModuleData } from "./modules/Player/PlayerModuleData";
import { PetBagModuleS } from "./modules/PetBag/PetBagModuleS";
import { PetBagModuleC } from "./modules/PetBag/PetBagModuleC";
import { PetBagModuleData } from "./modules/PetBag/PetBagModuleData";
import { CollectModuleS } from "./modules/PetCollect/CollectModuleS";
import { CollectModuleC } from "./modules/PetCollect/CollectModuleC";
import { CollectModuleData } from "./modules/PetCollect/CollectModuleData";
import { OnlineMoudleS } from "./modules/OnlineModule.ts/OnlineModuleS";
import { OnlineMoudleC } from "./modules/OnlineModule.ts/OnlineModuleC";
import { OnlineModuleData } from "./modules/OnlineModule.ts/OnlineModuleData";
import { TradingModuleS } from "./modules/Trading/TradingModuleS";
import { TradingModuleC } from "./modules/Trading/TradingModuleC";
import { TradingModuleData } from "./modules/Trading/TradingModuleData";
import { BuffModuleS } from "./modules/buff/BuffModuleS";
import { BuffModuleC } from "./modules/buff/BuffModuleC";
import { BuffData } from "./modules/buff/BuffData";
import AchievementModuleS from "./modules/AchievementModule/AchievementModuleS";
import AchievementModuleC from "./modules/AchievementModule/AchievementModuleC";
import AchievementData from "./modules/AchievementModule/AchievementData";
import { Task_ModuleC } from "./modules/Task/TaskModuleC";
import { TaskModuleData } from "./modules/Task/TaskModuleData";
import { Task_ModuleS } from "./modules/Task/Task_ModuleS";
import { LogManager } from "odin";
import { RankModuleS } from "./modules/Rank/RankModuleS";
import { RankModuleC } from "./modules/Rank/RankModuleC";
import { DollMachineModuleC } from "./modules/DollMachine/DollMachineModuleC";
import { DollMachineModuleS } from "./modules/DollMachine/DollMachineModuleS";
import * as mwaction from "mwaction";
import PetSimulatorEnergyModuleData, { EnergyModuleC, EnergyModuleS } from "./modules/Energy/EnergyModule";
import PetSimulatorAuthModuleData, { AuthModuleC, AuthModuleS } from "./modules/auth/AuthModule";
import { JumpRoomModuleC, JumpRoomModuleS } from "./modules/jump-room/JumpRoomModule";

// declare global {
//     var UE: any;
//     var puerts: any;
// }
// 监听玩家数据初始化失败
if (SystemUtil.isClient()) {

    // 用来检测数据存储是否失败情况
    Event.addServerListener("ErrorInfo_setCustomData", (saveKey: string, code: number) => {
        let errorMsg = `${saveKey}_${code}`;
        //console.error("====ErrorInfo_setCustomData ", errorMsg)
    });


}

@Component
export default class GameStart extends mw.Script {

    @mw.Property()
    private isOnline: boolean = false;

    @mw.Property({ displayName: "是否发布", group: "发布" })
    public isRelease: boolean = false;
    @mw.Property({ displayName: "是否 Beta 发布", group: "发布" })
    public isBeta: boolean = false;
    @mw.Property({ displayName: "是否开启主页GM开关按钮" })
    private isOpenGm = false;
    @mw.Property({ displayName: "是否免费送滑板" })
    private isFreeSkateboard = false;
    @mw.Property({ displayName: "是否使用平台形象" })
    private isUseAvatar = true;
    @mw.Property({ displayName: "是否使海外发布" })
    private isOverSea = true;
    @mw.Property({ displayName: "是否同去同回" })
    private isSameGoBack = false;
    @mw.Property({ displayName: "是否开启收集图鉴机器" })
    private isOpenCollectMachine = true;
    @mw.Property({
        displayName: "语言类型",
        group: "Odin设置",
        selectOptions: { "系统默认": "-1", "English": "0", "简体中文": "1", "日本語": "2", "Deutsch": "3" },
    })
    private selectedLanguageIndex: string = "-1";

    @mw.Property({
        displayName: "Log级别",
        group: "Odin设置",
        selectOptions: { "None": "0", "Error": "1", "Warn": "2", "Log": "3" },
    })
    private logLevel: string = "0";

    /**下载资源 */
    private assetsInit() {
        let assetsCfg = GameConfig.Assets.getAllElement();
        for (let index = 0; index < assetsCfg.length; index++) {
            let cfg = assetsCfg[index];
            if (mw.StringUtil.isEmpty(cfg.Guid)) {
                oTraceWarning("assetsInit isEmpty  ", cfg.id, cfg.Guid);
                continue;
            }
            if (mw.AssetUtil.assetLoaded(cfg.Guid)) {
                oTrace("assetsInit isAssetLoaded ", cfg.id, cfg.Guid);
                continue;
            }
            mw.AssetUtil.asyncDownloadAsset(cfg.Guid).then((result: boolean) => {
                oTrace("assetsInit result ", result, cfg.Guid);
            });
        }
    }

    override async onStart() {
        // if (!this.isOnline) {
        //     EventsTool.start();
        // }
        mLogManager.instance.setLogLevel(1);
        LogManager.instance.setLogLevel(1);
        GlobalData.Global.isRelease = this.isRelease;
        GlobalData.Global.isBeta = this.isBeta;
        GlobalData.Global.isSameGoBack = this.isSameGoBack;
        GlobalData.Global.isOpenCollectMachine = this.isOpenCollectMachine;
        GlobalData.Global.isShowGM = this.isOpenGm;
        GlobalData.Global.isFreeSkateboard = this.isFreeSkateboard;
        GlobalData.Global.selectedLanguageIndex = Number(this.selectedLanguageIndex);
        GlobalData.Global.isUseAvatar = this.isUseAvatar;
        GlobalData.Global.isOverSea = this.isOverSea;
        this.onRegisterModule();
        mwaction;

        DataStorage.setTemporaryStorage(!this.isOnline);
        if (mw.SystemUtil.isClient()) {
            if (GlobalData.Global.selectedLanguageIndex == -1) {
                GlobalData.Global.selectedLanguageIndex = this.getSystemLanguageIndex();
            }
            //初始化表格语言
            GameConfig.initLanguage(Number(this.selectedLanguageIndex), (key) => {
                let ele = GameConfig.Language.getElement(key);
                if (ele == null)
                    return "unknow_" + key;
                return ele.Value;
            });
            mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
                if (ui == null) return;
                let key: string = ui.text;
                if (key == null) return;
                let langueConfig = GameConfig.Language.findElement("Name", key);
                if (!langueConfig) {
                    return;
                }
                ui.text = langueConfig.Value;
            });
            ChatService.asyncEnableChatWindow(false);
            InputUtil.mouseLockOptionEnabled = false;
            InputUtil.isCursorVisible = true;

        }

        this.useUpdate = true;

        if (SystemUtil.isClient()) {
            if (this.isOpenGm) {
                GM.start(GMBasePanelUI);
                return;
            }
            GM.checkAuthority((res) => {
                if (res) {
                    GM.start(GMBasePanelUI);
                }
            });
            GameObjectFactory.instance;
        } else {
            Resource.instance;
        }
    }

    //获取系统语言索引
    private getSystemLanguageIndex(): number {
        let language = mw.LocaleUtil.getDefaultLocale().toString().toLowerCase();
        if (!!language.match("en")) {
            return 0;
        }
        if (!!language.match("zh")) {
            return 1;
        }
        if (!!language.match("ja")) {
            return 2;
        }
        if (!!language.match("de")) {
            return 3;
        }
        return 0;
    }

    onUpdate(dt: number): void {
        mw.TweenUtil.TWEEN.update();
        actions.AcitonMgr.update(dt * 1000);
    }

    protected onRegisterModule(): void {
        ModuleService.registerModule(AuthModuleS, AuthModuleC, PetSimulatorAuthModuleData);
        ModuleService.registerModule(HudModuleS, HudModuleC, null);
        ModuleService.registerModule(AreaModuleS, AreaModuleC, AreaModuleData);
        ModuleService.registerModule(InputModuleS, InputModuleC, null);
        ModuleService.registerModule(ResourceModuleS, ResourceModuleC, null);
        ModuleService.registerModule(CollectModuleS, CollectModuleC, CollectModuleData);
        ModuleService.registerModule(OnlineMoudleS, OnlineMoudleC, OnlineModuleData);
        ModuleService.registerModule(TradingModuleS, TradingModuleC, TradingModuleData);
        ModuleService.registerModule(BuffModuleS, BuffModuleC, BuffData);
        ModuleService.registerModule(AchievementModuleS, AchievementModuleC, AchievementData);
        ModuleService.registerModule(Task_ModuleS, Task_ModuleC, TaskModuleData);
        ModuleService.registerModule(RankModuleS, RankModuleC, null);
        ModuleService.registerModule(DollMachineModuleS, DollMachineModuleC, null);
        ModuleService.registerModule(PlayerModuleS, PlayerModuleC, PetSimulatorPlayerModuleData);
        ModuleService.registerModule(PetBagModuleS, PetBagModuleC, PetBagModuleData);
        ModuleService.registerModule(EnergyModuleS, EnergyModuleC, PetSimulatorEnergyModuleData);
        ModuleService.registerModule(JumpRoomModuleS, JumpRoomModuleC, null);
    }

    /**
     * 手动初始化客户端(如果没有勾选自动初始化，会调用这个方法)
     */
    protected async onInitClientByHand() {
        await DataCenterC.ready();
        await Player.asyncGetLocalPlayer();
    }

}