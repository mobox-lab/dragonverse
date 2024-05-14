import { GameConfig } from "./config/GameConfig";
import { GMModuleS, GMModuleC, GMModuleData } from "./module/GM/GMModule";
import { HUDModuleS, HUDModuleC } from "./module/HudModule/HUDModule";
import { SceneActionModuleC, SceneActionModuleS } from "./module/HudModule/SceneActionBaseModule";
import { BuffModuleC } from "./module/buffModule/BuffModuleC";
import { BuffModuleS } from "./module/buffModule/BuffModuleS";
import { update } from "./tool/Tween";
import { BulletModuleS } from "./module/BulletModule/BulletModuleS";
import { BulletModuleC } from "./module/BulletModule/BulletModuleC";
import { MotionModuleC } from "./module/MotionModule/MotionModuleC";
import { MotionModuleS } from "./module/MotionModule/MotionModuleS";
import { Globaldata } from "./const/Globaldata";
import { MotionEditConst } from "./editors/motionEditor/MotionEditConst";
import { PlayerModuleC } from "./module/PlayerModule/PlayerModuleC";
import { BattleWorldPlayerModuleData } from "./module/PlayerModule/PlayerModuleData";
import { PlayerModuleS } from "./module/PlayerModule/PlayerModuleS";
import { LogManager } from "odin";
import { EquipModuleS } from "./module/EquipModule/EquipModuleS";
import { EquipModuleC } from "./module/EquipModule/EquipModuleC";
import { EquipModuleData } from "./module/EquipModule/EquipModuleData";
import { LoginModuleC } from "./module/LoginModule/LoginModuleC";
import { LoginModuleS } from "./module/LoginModule/LoginModuleS";
import { NoticeModuleS } from "./module/NoticeModule/NoticeModuleS";
import { NoticeModuleC } from "./module/NoticeModule/NoticeModuleC";
import { AreaModuleS } from "./module/AreaModule/AreaModuleS";
import { AreaModuleC } from "./module/AreaModule/AreaModuleC";
import { AnalyticsModuleS } from "./module/AnalyticsModule/AnalyticsModuleS";
import { AnalyticsModuleC } from "./module/AnalyticsModule/AnalyticsModuleC";
import { AnalyticsModuleData } from "./module/AnalyticsModule/AnalyticsModuleData";
import { ActionModuleS } from "./module/action/ActionModuleS";
import { ActionModuleC } from "./module/action/ActionModuleC";
import { AttributeModuleC } from "./module/AttributeModule/AttributeModuleC";
import { AttributeModuleS } from "./module/AttributeModule/AttributeModuleS";
import { PlayerHeadUIModuleS } from "./module/PlayerHeadUIModule/PlayerHeadUIModuleS";
import { PlayerHeadUIModuleC } from "./module/PlayerHeadUIModule/PlayerHeadUIModuleC";
import { LanguageManager } from "./tool/LanguageManager";
import { GlobalAttrModuleS } from "./module/attr/GlobalAttrModuleS";
import { GlobalAttrModuleC } from "./module/attr/GlobalAttrModuleC";
import { SettingModuleC } from "./module/SetingModule/SetingMoudleC";
import { SettingModuleS } from "./module/SetingModule/SetingMoudleS";
import { PlayerManagerExtesion } from "./Modified027Editor/ModifiedPlayer";
import { WeaponModuleS } from "./module/WeaponModule/WeaponModuleS";
import { WeaponModuleC } from "./module/WeaponModule/WeaponModuleC";
import { LandModuleC } from "./module/LandModule/LandModuleC";
import { LandModuleS } from "./module/LandModule/LandModuleS";
import { WeaponModuleData } from "./module/WeaponModule/WeaponModuleData";
import { SkillModuleS } from "./module/SkillModule/SkillModuleS";
import { SkillModuleC } from "./module/SkillModule/SkillModuleC";
import { ShopModuleC } from "./module/ShopModule/ShopModuleC";
import { ShopModuleS } from "./module/ShopModule/ShopModuleS";
import { ShopModuleData } from "./module/ShopModule/ShopModuleData";
import { PetModuleS } from "./module/petModule/PetModuleS";
import { PetModuleC } from "./module/petModule/PetModuleC";
import { TalkModuleC } from "./module/npc/talk/TalkModuleC";
import { TalkModuleS } from "./module/npc/talk/TalkModuleS";
import { MascotModuleS } from "./module/npc/mascotNpc/MascotModuleS";
import { MascotModuleC } from "./module/npc/mascotNpc/MascotModuleC";
import RankListModuleS from "./module/RankListModule/RankListModuleS";
import RankListModuleC from "./module/RankListModule/RankListModuleC";
import DressUpModuleS from "./module/DressUpModule/DressUpModuleS";
import DressUpModuleC from "./module/DressUpModule/DressUpModuleC";
// import { GuideModuleC2 } from "./module/GuideModule/GuideModuleC2";
// import { GuideModuleS2 } from "./module/GuideModule/GuideModuleS2";
import { GuideDataHelper, GuideModuleC, GuideModuleS } from "module_guide";
import { InteractiveModuleS } from "./module/InteractiveModule/InteractiveModuleS";
import { InteractiveModuleC } from "./module/InteractiveModule/InteractiveModuleC";
import { AntiCheatSystem } from "./tool/AntiCheatSystem";
import * as mwaction from "mwaction";
import BattleWorldAuthModuleData, { AuthModuleC, AuthModuleS } from "./module/auth/AuthModule";
import BattleWorldEnergyModuleData, { EnergyModuleC, EnergyModuleS } from "./module/Energy/EnergyModule";
import { SettingModuleData } from "./module/SetingModule/SettingModuleData";
import { JumpRoomModuleC, JumpRoomModuleS } from "./module/jump-room/JumpRoomModule";
import GameServiceConfig from "./const/GameServiceConfig";

declare global {
    var UE: any;
    var puerts: any;
}

@Component
export default class GameLauncher extends mw.Script {

    @mw.Property()
    public isOnline: boolean = false;

    @mw.Property({
        displayName: "语言l", selectOptions: {
            "默认": "-1",
            "英文": "0",
            "中文": "1",
        },
    })
    languageType1: string = "-1";

    @mw.Property({ displayName: "gm开关" })
    gmSwitch: boolean = true;

    @mw.Property({ displayName: "是否支持技能编辑器" })
    isMotionEdit: boolean = true;

    @mw.Property({
        displayName: "日志等级", enumType: {
            "全部": 0,
            "Error&Warning": 1,
            "Error": 2,
        },
    })
    public logLevel = 0;

    @mw.Property({ displayName: "是否发布", group: "发布" })
    public isRelease: boolean = false;

    @mw.Property({ displayName: "是否 beta 发布", group: "发布" })
    public isBeta: boolean = false;

    @mw.Property({displayName: "是否使用测试 Url", group: "发布"})
    public isUseTestUrl: boolean = true;

    @mw.Property({ displayName: "是否开启RPC统计" })
    public isRecordRPC: boolean = false;

    async onStart() {

        Globaldata.isOpenGm = this.gmSwitch;
        GameServiceConfig.isRelease = this.isRelease;
        GameServiceConfig.isBeta = this.isBeta;
        GameServiceConfig.isUseTestUrl = this.isUseTestUrl;
        mwaction;
        // 开启作弊检测
        //this.checkCheat();

        // 测试 看看能不能降低游戏进入时间
        if (SystemUtil.isClient()) {

            // 初始化多语言
            LanguageManager.init_language(Number(this.languageType1));

            ChatService.asyncEnableChatWindow(true);

            InputUtil.mouseLockOptionEnabled = true;

            let player = await Player.asyncGetLocalPlayer();
            await player.character.asyncReady();

            //锁住鼠标
            InputUtil.isLockMouse = true;
            InputUtil.mouseLockOptionEnabled = false;
        }

        // 设置玩家数据存储位置
        DataStorage.setTemporaryStorage(!this.isOnline);

        Globaldata.logLevel = this.logLevel;
        LogManager.instance.setLogLevel(Globaldata.logLevel);

        MotionEditConst.isUseEdit = this.isMotionEdit;


        this.onRegisterModule();
        this.useUpdate = true;


    }

    onUpdate(dt: number) {
        update();
        mw.TweenUtil.TWEEN.update();
        actions.AcitonMgr.update(dt * 1000);
    }

    protected onRegisterModule(): void {
        PlayerManagerExtesion.init();
        ModuleService.registerModule(AuthModuleS, AuthModuleC, BattleWorldAuthModuleData);
        ModuleService.registerModule(AttributeModuleS, AttributeModuleC, null);
        ModuleService.registerModule(PlayerModuleS, PlayerModuleC, BattleWorldPlayerModuleData);
        ModuleService.registerModule(WeaponModuleS, WeaponModuleC, WeaponModuleData);
        ModuleService.registerModule(SkillModuleS, SkillModuleC, null);
        ModuleService.registerModule(MotionModuleS, MotionModuleC, null);
        ModuleService.registerModule(PlayerHeadUIModuleS, PlayerHeadUIModuleC, null);
        ModuleService.registerModule(GMModuleS, GMModuleC, GMModuleData);
        ModuleService.registerModule(BulletModuleS, BulletModuleC, null);
        ModuleService.registerModule(BuffModuleS, BuffModuleC, null);
        ModuleService.registerModule(HUDModuleS, HUDModuleC, null);
        ModuleService.registerModule(SceneActionModuleS, SceneActionModuleC, null);
        ModuleService.registerModule(EquipModuleS, EquipModuleC, EquipModuleData);
        ModuleService.registerModule(NoticeModuleS, NoticeModuleC, null);
        ModuleService.registerModule(LoginModuleS, LoginModuleC, null);
        ModuleService.registerModule(AreaModuleS, AreaModuleC, null);
        // ModuleService.registerModule(RedPointModuleS, RedPointModuleC, null);
        ModuleService.registerModule(AnalyticsModuleS, AnalyticsModuleC, AnalyticsModuleData);
        ModuleService.registerModule(ActionModuleS, ActionModuleC, null);
        ModuleService.registerModule(GlobalAttrModuleS, GlobalAttrModuleC, null);
        ModuleService.registerModule(SettingModuleS, SettingModuleC, SettingModuleData);
        ModuleService.registerModule(TalkModuleS, TalkModuleC, null);
        ModuleService.registerModule(LandModuleS, LandModuleC, null);
        ModuleService.registerModule(PetModuleS, PetModuleC, null);
        ModuleService.registerModule(ShopModuleS, ShopModuleC, ShopModuleData);
        ModuleService.registerModule(MascotModuleS, MascotModuleC, null);
        ModuleService.registerModule(RankListModuleS, RankListModuleC, null);
        ModuleService.registerModule(DressUpModuleS, DressUpModuleC, null);
        // ModuleService.registerModule(GuideModuleS, GuideModuleC, GuideDataHelper);
        // ModuleService.registerModule(GuideModuleS2, GuideModuleC2, null);
        ModuleService.registerModule(InteractiveModuleS, InteractiveModuleC, null);
        ModuleService.registerModule(EnergyModuleS, EnergyModuleC, BattleWorldEnergyModuleData);
        ModuleService.registerModule(JumpRoomModuleS, JumpRoomModuleC, null);
    }


    //开启作弊检测
    private checkCheat() {
        // 开启作弊检测
        AntiCheatSystem.checkAccelerator();


        if (SystemUtil.isServer()) {


            return;
        }

        AntiCheatSystem.registerCheatDetectionCallback((fieldName: string, cheatValue: any, originalValue: any) => {
            console.error("===registerCheatDetectionCallback ", fieldName, cheatValue, originalValue);
        });

    }

}
