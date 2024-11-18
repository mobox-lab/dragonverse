/*
 * @Author: shifu.huang
 * @Date: 2023-12-10 16:12:05
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-02-22 16:08:06
 * @FilePath: \nevergiveup\JavaScripts\GameStart.ts
 * @Description: 修改描述
 */
// import { GM } from "module_gm";
import { GuideDataHelper, GuideModuleC, GuideModuleS } from "module_guide";
import { AirdropManager } from "./Airdrop/AirdropManager";
import { DanmuManager } from "./Danmu/DanmuManager";
// import { GMPanel } from "./GMPanel";
import { GameManager } from "./GameManager";
import { GuideManager } from "./Guide/GuideManager";
import CardModuleC from "./Modules/CardModule/CardModuleC";
import CardModuleData from "./Modules/CardModule/CardModuleData";
import CardModuleS from "./Modules/CardModule/CardModuleS";
import PlayerModuleC from "./Modules/PlayerModule/PlayerModuleC";
import PlayerModuleData from "./Modules/PlayerModule/PlayerModuleData";
import { PlayerModuleS } from "./Modules/PlayerModule/PlayerModuleS";
import { TimerModuleC, TimerModuleData, TimerModuleS } from "./Modules/TimeModule/time";
import { TowerModuleC } from "./Modules/TowerModule/TowerModuleC";
import { TowerModuleData } from "./Modules/TowerModule/TowerModuleData";
import { TowerModuleS } from "./Modules/TowerModule/TowerModuleS";
import { TaskModuleC } from "./Modules/taskModule/TaskModuleC";
import { TaskModuleDataHelper } from "./Modules/taskModule/TaskModuleDataHelper";
import { TaskModuleS } from "./Modules/taskModule/TaskModuleS";
import { GuideDialog } from "./UI/UIDialog";
import Utils from "./Utils";
import { GameConfig } from "./config/GameConfig";
import { EventsTool } from "./tool/EventsTool";
import { Reward } from "./tool/Reward";
import { SoundUtil } from "./tool/SoundUtil";
import { ComponentFactory } from "./enemy/components/ComponentFactory";
import GodModService from "mw-god-mod";
import AuthModuleData, { AuthModuleC, AuthModuleS } from "./Modules/auth/AuthModule";
import TDEnergyModuleData, { EnergyModuleC, EnergyModuleS } from "./Modules/Energy/EnergyModule";
import * as mwaction from "mwaction";
import TalentModuleC from "./Modules/talent/TalentModuleC";
import TalentModuleS from "./Modules/talent/TalentModuleS";
import TalentModuleData from "./Modules/talent/TalentModuleData";
import GameServiceConfig from "./const/GameServiceConfig";
import { DragonDataModuleS } from "./Modules/dragonData/DragonDataModuleS";
import { DragonDataModuleC } from "./Modules/dragonData/DragonDataModuleC";
import DragonDataModuleData from "./Modules/dragonData/DragonDataModuleData";
import { ChainId, Chains } from "./const/Chains";
import { WaveModuleS } from "./Modules/waveModule/WaveModuleS";
import { WaveModuleC } from "./Modules/waveModule/WaveModuleC";
import WaveModuleData from "./Modules/waveModule/WaveModuleData";
import { JumpRoomModuleC, JumpRoomModuleS } from "./Modules/JumpRoom/JumpRoomModule";
import LogoAnimUI from "./UI/LogoAnimUI";
import { P12BagModuleC, P12BagModuleS, TdP12BagModuleData } from "./Modules/bag/P12BagModule";
import Log4Ts from "mw-log4ts";
import TdStatisticModuleData, { StatisticModuleC, StatisticModuleS } from "./Modules/statistic/StatisticModule";

export namespace Config {
    export let skipGuide: boolean = false;
    export let danmukuSpeed: number = 300;
    export let hurtTextColor: LinearColor = new LinearColor(1, 0, 0, 1);
    export let hurtTextOutlineColor: LinearColor = new LinearColor(0, 0, 0, 1);
    export let hurtTextOutlineWidth: number = 3;
    export let hurtTextSize: Vector2 = new Vector2(330 / 2, 150 / 2);
    export let hurtTextDuration: number = 0.8;
    export let goldAnimInitTime: number = 1.4;
    export let goldAnimBackTime: number = 0.5;
    export let goldAnimRandAmount: Vector2 = new Vector2(1, 3);

    export let animationTime: number = 1;
}
@Component
export default class GameStart extends Script {
    @mw.Property()
    private isOnline: boolean = false;

    @mw.Property({ displayName: "是否发布", group: "发布" })
    public isRelease: boolean = false;

    @mw.Property({ displayName: "是否 Beta 发布", group: "发布" })
    public isBeta: boolean = false;

    @mw.Property({ displayName: "是否使用测试 Url", group: "发布" })
    public isUseTestUrl: boolean = true;

    @mw.Property({ displayName: "主网链", group: "发布", selectOptions: Chains })
    public customChainId: ChainId = Chains.Merlin;

    @mw.Property({ displayName: "是否开启gm（勾选开启）", group: "测试" })
    public isGM: boolean = true;
    @mw.Property({ displayName: "持久存档（勾选为持久存档）", group: "测试" })
    presistSaving: boolean = true;
    /**语言设置 */
    @mw.Property({
        displayName: "语言设置",
        selectOptions: {
            默认: "-1",
            英文: "0",
            中文: "1",
        },
    })
    selectedIndex: string = "-1";
    @mw.Property({ displayName: "忽略引导" })
    skipGuide: boolean = false;
    @mw.Property({ displayName: "弹幕速度" })
    danmukuSpeed: number = 300;
    @mw.Property({ replicated: false, displayName: "受击跳字颜色", group: "受击跳字" })
    hurtTextColor: LinearColor = new LinearColor(1, 0, 0, 1);
    @mw.Property({ replicated: false, displayName: "受击跳字描边颜色", group: "受击跳字" })
    hurtTextOutlineColor: LinearColor = new LinearColor(0, 0, 0, 1);
    @mw.Property({ replicated: false, displayName: "受击跳字描边粗细", group: "受击跳字" })
    hurtTextOutlineWidth: number = 3;
    @mw.Property({ replicated: false, displayName: "受击跳字大小", group: "受击跳字" })
    hurtTextSize: Vector2 = new Vector2(330 / 2, 150 / 2);
    @mw.Property({ replicated: false, displayName: "受击跳字持续时间", group: "受击跳字" })
    hurtTextDuration: number = 0.8;
    @mw.Property({ replicated: false, displayName: "加钱跳字初始持续时间", group: "加钱跳字" })
    goldAnimInitTime: number = 1.4;
    @mw.Property({ replicated: false, displayName: "加钱跳字回弹持续时间", group: "加钱跳字" })
    goldAnimBackTime: number = 0.5;
    @mw.Property({ replicated: false, displayName: "加钱跳字随机数量(最小值/最大值)", group: "加钱跳字" })
    goldAnimRandAmount: Vector2 = new Vector2(1, 3);
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {
        GameServiceConfig.isRelease = this.isRelease;
        GameServiceConfig.isBeta = this.isBeta;
        GameServiceConfig.isUseTestUrl = this.isUseTestUrl;
        GameServiceConfig.chainId = this.customChainId;
        console.log(`isPIE: ${SystemUtil.isPIE}`);
        DataStorage.setTemporaryStorage(SystemUtil.isPIE);
        this.setlanguage();
        for (const k in Config) {
            if (this.hasOwnProperty(k)) {
                Config[k] = this[k];
            }
        }
        this.registerModules();
        this.useUpdate = true;
        if (SystemUtil.isServer()) {
            EventsTool.start();
        } else {
            InputUtil.isCursorVisible = true;
            InputUtil.isLockMouse = false;
            // this.checkGM();
            if (SystemUtil.isClient()) {
                if (this.isGM) {
                    GodModService.getInstance().showGm();
                }
            }

            ModuleService.ready().then(() => {
                GuideManager.init();
                // GuideManager.triggerNextGuide(true);
            });
            Utils.requestAssetIcons(GameConfig.Tower.getAllElement(), "imgGuid", true);
            DanmuManager.init();
            ComponentFactory.init();

            SettingService.setSettingButtonVisible(false);
        }
        mwaction;
        GameManager.init(this);
        AirdropManager.init();
        SoundUtil.init();
        // SoundUtil.playBGM();
        Reward.init();
        UIService.show(LogoAnimUI);
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        GameManager.onUpdate(dt);
        GuideDialog.onUpdate(dt);
        DanmuManager.update(dt);
        TweenUtil.TWEEN.update();
        actions.AcitonMgr.update(dt * 1000);
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {}

    private registerModules() {
        ModuleService.registerModule(AuthModuleS, AuthModuleC, AuthModuleData);
        ModuleService.registerModule(EnergyModuleS, EnergyModuleC, TDEnergyModuleData);
        ModuleService.registerModule(TimerModuleS, TimerModuleC, TimerModuleData);
        ModuleService.registerModule(TowerModuleS, TowerModuleC, TowerModuleData);
        ModuleService.registerModule(PlayerModuleS, PlayerModuleC, PlayerModuleData);
        ModuleService.registerModule(CardModuleS, CardModuleC, CardModuleData);
        ModuleService.registerModule(GuideModuleS, GuideModuleC, GuideDataHelper);
        ModuleService.registerModule(TaskModuleS, TaskModuleC, TaskModuleDataHelper);
        ModuleService.registerModule(TalentModuleS, TalentModuleC, TalentModuleData);
        ModuleService.registerModule(DragonDataModuleS, DragonDataModuleC, DragonDataModuleData);
        ModuleService.registerModule(StatisticModuleS, StatisticModuleC, TdStatisticModuleData);
        ModuleService.registerModule(WaveModuleS, WaveModuleC, WaveModuleData);
        ModuleService.registerModule(JumpRoomModuleS, JumpRoomModuleC, null);
        ModuleService.registerModule(P12BagModuleS, P12BagModuleC, TdP12BagModuleData);
    }

    // private checkGM() {
    //     GM.checkAuthority((isGm) => {
    //         if (isGm || this.isGM) {
    //             GM.start(GMPanel);
    //             EventsTool.start();
    //             // UIService.getUI(UIMain).maxSpeed = 15;
    //         }
    //     });
    // }

    /**
     * 设置多语言
     * UI多语言设置
     */
    private setlanguage() {
        //初始化表格语言
        GameConfig.initLanguage(Number(this.selectedIndex), (key) => {
            let ele = GameConfig.Language.getElement(key);
            if (ele == null) return "unknow_" + key;
            return ele.Value;
        });
        if (mw.SystemUtil.isClient()) {
            mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
                if (ui == null) return;
                const key: string = ui.text;
                if (key == null) return;
                if (key) {
                    let lan = GameConfig.Language.getElement(key);
                    if (lan) {
                        ui.text = lan.Value;
                    }
                }
            });
            Event.dispatchToLocal(`LanguageInit`);
            console.error("初始化多语言.....");
        }
    }

    public getLanguageId() {
        return Number(this.selectedIndex);
    }
}
