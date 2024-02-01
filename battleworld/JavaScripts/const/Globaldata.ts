import { GameConfig } from "../config/GameConfig";

export class Globaldata {

    /**
     * DragonVerse 游戏id
     */
    public static dragonverseGameId = "P_bf83f6a1f880460bc61d3e1e41e810487db4ce18";
    /**
     * 宠物模拟器游戏id
     */
    public static petSimulatorGameId = "P_01da004d7f22f9eedeabe5e2a837a9e2fb8ca2b9";
    /**
     * 跳游戏进度时长
     */
    public static jumpGameProgressDuration = 3e3;
    /**充值网址 */
    public static copyUrl = "https://www.mobox.io";
    /**
     * 拳头普攻图片id
     */
    public static punchImgGuid = "295281";

    /**单手剑普攻图片id */
    public static singleSwordImgGuid = "295344";

    /**杖普攻图片id */
    public static wandImgGuid = "295287";

    /**双手剑普攻图片id */
    public static twoHandedSwordImgGuid = "295273";

    /**
     * 拳头背景图片id
     */
    public static punchBgImgGuid = "295322";

    /**单手剑背景图片id */
    public static singleSwordBgImgGuid = "295333";

    /**杖背景图片id */
    public static wandBgImgGuid = "295346";

    /**双手剑背景图片id */
    public static twoHandedSwordBgImgGuid = "295328";

    /**--------------------------------------系统--------------------------------- */
    /**所选择的语言索引(-1:系统 0:英语 1:汉语 2:日语 3:德语)*/
    public static selectedLanguageIndex: number = -1;
    /**日志等级 */
    public static logLevel: number = 0;
    /**是否开启GM */
    public static isOpenGm: boolean = false;

    /**
     * 是否 发布.
     * @type {boolean}
     */
    public static isRelease = false;
    /**相机缩放最大距离 */
    public static targetArmMaxLen: number = 2400;
    /**相机缩放最短距离 */
    public static targetArmMinLen: number = 300;
    /**值加成属性差值 */
    public static addAttribueTypeVale: number = 100;
    /**百分比加成属性差值 */
    public static multiplyAttribueTypeVale: number = 200;
    /**只参与计算 不参与存储 */
    public static tmpVector: mw.Vector = mw.Vector.zero;
    public static tmpVector1: mw.Vector = mw.Vector.zero;
    public static tmpVector2: mw.Vector = mw.Vector.zero;
    public static tmpRotation: mw.Rotation = mw.Rotation.zero;
    public static tmpRotation1: mw.Rotation = mw.Rotation.zero;
    /**只参与赋值 */
    public static tmpLinearColor: mw.LinearColor = mw.LinearColor.white;

    /**拷贝临时 计算 */
    public static copyVector(loc: mw.Vector) {
        this.tmpVector.x = loc.x;
        this.tmpVector.y = loc.y;
        this.tmpVector.z = loc.z;
    }

    public static tmpUIVector: mw.Vector2 = mw.Vector2.zero;

    /**飘字最远剔除距离 */
    public static headUIMaxVisibleDistance: number = 5000;
    public static distanceScaleFactor: number = 300;
    /**动画融合时间 0.25 */
    public static mixAnimationTime: number = 0.25;
    /**世界UIguid数组*/
    public static worldUI: string[] = ["333498BE", "333EA6D4", "1D627A26", "16A3295B", "1A940929"];

    /**是否默认开启杀戮头顶UI */
    public static default_open_massacreUI: boolean = true;
    /**是否默认开启段位头顶UI */
    public static default_open_danUI: boolean = false;
    /**是否自动锁敌 */
    public static isAutoLockEnemy: boolean = true;

    /**-----------------------------------角色-------------------------------------- */
    //玩家最多金币限制 9999999999
    public static playerMaxMoney: number = 9999999999;
    /**玩家每日获取段位分限制 */
    public static maxRankScore: number = 1000;
    /**扣除段位分系数 */
    public static rankScoreRate: number = 0.7;
    /**玩家默认重力系数 */
    public static dfgravityScale: number = 2.5;
    /**血量回复值（非战斗状态每0.2恢复一次，战斗状态0.5秒恢复一次）*/
    public static hpRecover: number = 10;
    /**能量回复值（非战斗状态每0.2恢复一次，战斗状态0.5秒恢复一次）*/
    public static energyRecover: number = 10;
    /**战斗状态血量回复倍率（0.5：衰减一半 hpRecover*hpRecoverfightRate）*/
    public static hpRecoverfightRate: number = 0.5;
    /**战斗状态能量回复倍率（0.5：衰减一半energyRecover*energyRecoverfightRate）*/
    public static energyRecoverfightRate: number = 0.5;
    /**能量延迟恢复时间 秒*/
    public static energyDelayRecoverTime: number = 2;
    /**玩家获取坐标频率 秒*/
    public static getPlayerLocInterval: number = 0.1 * 1000;
    /**是否无敌 */
    public static isInvincible: boolean = false;
    /**是否无限能量 */
    public static isInfiniteEnergy: boolean = false;
    /**玩家掉落最低点传送Z */
    public static playerBottomZ: number = 1250 + 10;//33350
    /**相机默认弹簧臂长度 */
    public static defaultCameraLen: number = 300;
    /**玩家默认最大下落速度 */
    public static defaultMaxFllSpeed: number = 0;
    /**玩家默认fov */
    public static defaultCamerFov: number = 0;

    /**玩家重置时间 */
    public static player_rebornTime: number = 30;
    /**玩家回城按钮cd */
    public static player_backTime_cd: number = 15;
    /**玩家回城主动取消按钮cd */
    public static player_backTime_self_cancle_cd: number = 7;
    /**玩家回城时间 */
    public static player_backTime: number = 5;
    /*** 死亡等待复活时长*/
    public static deathTime: number = 3;
    /**玩家复活时间 */
    public static reviveTime: number = 3.4;
    /**玩家死亡动作 */
    public static player_deadAnim: string = "46287";
    /**玩家死亡特效*/
    public static deatheffetIds: number[] = [];
    /**玩家复活特效 */
    public static reviveeffetIds: number[] = [];
    /**玩家默认爬坡角度(可行走的最大角度) */
    public static playerSlopeAngle: number = 60;

    /*跑墙-玩家相机FOV*/
    public static runWallCameraFov: number = 110;
    /*跑墙-玩家相机OV切换时间 */
    public static runWallCameraFovSwitchTime: number = 0.5;
    /* 跑墙-玩家相机追背跟随（旋转延迟） */
    public static runWallCameraFollowDelay: number = 5;
    //跑墙相机向上角度限制
    public static wallRun_cameraUpLimitAngle: number = 89;
    //跑墙相机向下角度限制
    public static wallRun_cameraDownLimitAngle: number = 90;
    //默认相机向上角度限制
    public static df_cameraUpLimitAngle: number = 60;
    //默认相机向下角度限制
    public static df_cameraDownLimitAngle: number = 40;
    /* 防御长按时间判定 */
    public static defenseLongPressTime: number = 0.3;

    /**下落攻击判定高度 */
    public static fallAttackHeight: number = 300;
    /**下落攻击-动画恢复高度*/
    public static jump_resumeHight: number = 250;
    /**下落攻击-中途停止帧数*/
    public static jump_stopFrame: number = 6;
    /**冲刺MotionID */
    public static sprintMotionID: number = 1;
    /**反弹动效 */
    public static beParryMotionSkillId: number = 8;

    /**相机抖动-水平(min/max) */
    public static cameraShakeHorizontal: number[] = [-0.5, 0.5];
    /**相机抖动-垂直(min/max) */
    public static cameraShakeVertical: number[] = [-0.5, 0.5];
    /**相机抖动-后坐力幅度 */
    public static cameraShakeRecoil: number = 10;
    /**相机抖动-单次时间(毫秒)*/
    public static cameraShakeTime: number = 1000;
    /**玩家升级特效id */
    public static playerLevelUpEffectId: number[] = [5, 56];

    /**玩家被击飞时播放的动画 */
    public static blowUpAnim: string = "266357";
    /**玩家被击飞动画播放速率*/
    public static blowUpAnimSpeed: number = 1;
    /**玩家被击飞的动画暂停时间 秒*/
    public static blowUpAnimPauseTime: number = 0.15;
    /**玩家被击飞时，检测地面的射线距离= 玩家坐标z - (胶囊体高度/2 + blowUpCheckOffsetZ)  距离单位 */
    public static blowUpCheckOffsetZ: number = 150;
    /**玩家被击飞时，要播放的 motionid */
    public static blowUpOverMotionId: number = 27;
    /**击飞特效id  特效表id */
    public static blowUpEffectId: number = 5;


    /**检测玩家下落时 检测地面的射线距离= 玩家坐标z - (胶囊体高度/2 + diveCheckOffsetZ)  距离单位  */
    public static diveCheckOffsetZ: number = 10;

    public static playerHeadUIOffset: mw.Vector = new mw.Vector(0, 0, 10);

    /**-----------------------------------技能-------------------------------------- */
    /**普攻连击重置时间 秒 */
    public static doubleHitResetTime: number = 2;
    /**技能子弹最小命中距离 */
    public static bulletMinDistance: number = 2000;
    /**战斗状态持续时间   没攻击到敌人 或没被攻击到 */
    public static fightKeepTime: number = 10;
    /**战斗状态持续时间   没攻击到敌人 或没被攻击到 */
    public static fightKeepTimeHP: number = 5;
    /**被攻击防御时音效 */
    public static define_beAttackSound: string = "130806";
    /**技能按钮最小点击时间 */
    public static motionSkill_btnMinTime: number = 0.01;

    /**------------------------技能选择-------------------------- */
    /**最大装配技能数量 */
    public static maxEquipSkillCount: number = 4;
    /**技能库每次最大随机数量 */
    public static maxRandomSkillLibCount: number = 3;

    /**----------------------武器------------------------ */
    /**炮管起始相对位置 */
    public static cannon_startPos: mw.Vector = new mw.Vector(50, 0, 4);
    /**炮管目标相对位置 */
    public static cannon_endPos = new mw.Vector(25, 0, 0);
    /**炮管 滑膛时间 秒 */
    public static cannon_startTime: number = 0.1;
    /**炮管 回膛时间 秒 */
    public static cannon_endTime: number = 0.5;


    /**攻击后收刀延迟时间 */
    public static putWeaponTime_motion: number = 3;
    /**移动时延迟收刀时间 */
    public static putWeaponTime_move: number = 0.3;
    /**收刀 */
    public static putWeaponTime: number = 0.65;
    /**收刀材质切换时间 */
    public static putWeaponMaterial: number = 0.65;

    /**---------------------------掉落物------------------------------------ */
    /**掉落物刷新时间*/
    public static land_refash_pickup_time: number = 60; //60
    /**刷新前5秒时，显示刷新tips*/
    public static land_refash_pickup_tip_time: number = 5;
    /**掉落物刷新 技能球 数量*/
    public static land_pickup_skll_count: number = 6;
    /**掉落物刷新 血包 数量*/
    public static land_pickup_hp_count: number = 4;
    /**掉落物刷新 金钱数量*/
    public static land_pickup_money_count: number = 4;
    /**掉落物刷新 初级丹药数量*/
    public static land_pickup_primary_pill_count: number = 2;
    /**可破坏物刷新 破坏物数量 */
    public static land_destroy_count: number = 0;
    /**变装道具刷新 数量 */
    public static land_dressup_count: number = 5;
    /**拾取换装掉落物后持续的时间 */
    public static land_dressup_duration = 60;
    /**地形 Buff随机数量*/
    public static land_Parcess_Buffcount: number = 0;
    /**地形 运动&&显隐随机数量 */
    public static land_Parcess_count: number = 8;
    /**地形 运动刷新时间*/
    public static land_Parcess_refash_time: number = 180; //120
    /**地形 运动速度*/
    public static land_Parcess_speed: number = 100;
    /**地形 运动最大移动距离 */
    public static land_Parcess_maxDistances: number[] = [500, 500, 500, 500, 500];
    /**地形刷新前5秒时，显示刷新tips*/
    public static land_Parcess_refash__tip_time: number = 5;
    /**地形材质偏移高度*/
    public static land_matieral_offect: number = 0;
    /**地形材质透明度渐变时间*/
    public static land_matieral_Opacity_time: number = 30;
    /**地形原材质 */
    public static land_material: string = "03E54A30490E2390C63403879210157E";
    /**地形子节点原材质 */
    public static land_childMaterial: string = "B242851944FFCAA464D14B8603E4ACD0";
    /**地形显隐替换材质 */
    public static land_replaceMaterial: string = "88F0DC074C850BDD6CF70183069ACDF5";
    /**拾取血瓶飘字-相对玩家偏移*/
    public static land_pickUp_hp_offect: Vector = new Vector(0, 0, 50);
    /**技能球检测时间 */
    public static land_creSkill_time: number = 10;

    /**---------------------------游戏------------------------------------ */
    /**战斗触发器 */
    public static battle_tirgger_guid: string = "12A7E723";
    /**回城特效 */
    public static backEffectId: number[] = [156];
    /**回城动作(动作表id) */
    public static backAction: number = 69;
    /*** 敌方血条颜色 */
    public static redHpColor: string = "#D94133";
    /*** 敌方血条颜色背景  */
    public static redHpColorback: string = "#FF0000";
    /*** 队友血条颜色 */
    public static buleHpColor: string = "#0FFF00";
    /*** 队友血条颜色背景 */
    public static buleHpColorback: string = "#06FF9F";

    /**----------------------------------BUFF----------------------------------------- */
    /**易伤最大上限 */
    public static vulnerableMultipleMax: number = 150;

    /**----------------------------------Notice提示----------------------------------------- */
    /**Notice提示存在时间 */
    public static noticeTime: number = 2;
    /**Notice提示ui垂直间隔 */
    public static noticeVerticalInterval: number = 65;
    /* Notice提示最多存在数量 */
    public static noticeMaxCount: number = 10;
    /**每加一个前面Notice提示减少时间x数量*/
    public static noticeReduceTime: number = 0;

    /**击杀数量提示最多显示刷零 */
    public static noticeKillMaxCount: number = 2;
    /**段位进入公告时间(ms) */
    public static rankNoticeTime: number = 6000;
    /**红点缩放时间(ms) */
    public static redDotScaleTime: number = 200;

    /**----------------------------------商店----------------------------------------- */
    /**商店重置icon */
    public static shop_reset: string = "189589";
    /**商店tap多语言*/
    public static shop_tap_language: string[] = ["Shop_btn_1", "Shop_btn_2", "Shop_title_1", "Shop_title_2"];
    /**商店触发器 */
    public static shop_trigger_guid: string = "3E30B848";
    /**商店摄像机偏移 */
    public static shop_camera_offset: Vector = new Vector(0, 100, 0);

    /**--------------------------------------NPC对话相关--------------------------------- */
    /**对话文字写入间隔(s)最小是dt -1直接显示*/
    public static talkTextInterval: number = 0.03;
    /**步长 */
    public static talkTextStep: number = 2;

    /**--------------------------------------NPC--------------------------------- */
    /** 寻路x轴范围 */
    public static npc_pathRangeX: Vector2 = new Vector2(207866.44, 215557.70);
    /** 寻路y轴范围 */
    public static npc_pathRangeY: Vector2 = new Vector2(6778.77, 14290.39);
    /** npc默认重力系数 */
    public static npc_gravityScale: number = 1;
    /** 展示npc头顶ui渲染缩放 */
    public static npc_headUISize: Vector2 = new Vector2(2, 2);
    /** 展示npc模型guid */
    public static npc_modelGuid: string = "0F38CF89";
    /** 展示npc动作 */
    public static npc_modelAnim: string = "232755";
    /** 展示npc位置 */
    public static npc_modelPos: Vector = new Vector(209877.88, 20959.30, 2642.37);

    /**----------------------------------其他----------------------------------------- */
    /**满星数量TODO*/
    public static maxStarCount: number = 3;
    /**道具和技能 触发时间戳    避免换职业和技能释放同时触发 */
    public static quick_skill_allTime: number = 0;
    public static quick_prop_allTime: number = 0;


    /**-----------------------------------宠物------------------------------------------- */
    /**飞行的移动数组 改的是z轴高度 */
    public static flyArr: mw.Vector2[] = [new mw.Vector2(0, 0), new mw.Vector2(8, 0), new mw.Vector2(0, 0), new mw.Vector2(-8, 0), new mw.Vector2(0, 0)];
    /**飞行的贝塞尔曲线 */
    public static flyBezier: number[] = [0.26, 0.59, 0.61, 0.28];
    /**飞行到最高点所用时间(ms) */
    public static flyTime: number = 300;
    /**宠物距离玩家的位置 */
    public static petOffset: mw.Vector = new mw.Vector(-30, -60, 40);
    /**位置移动平滑值 */
    public static petSmoothLoc: number = 0.1;
    /**旋转移动平滑值 */
    public static petSmoothRot: number = 0.5;

    /**下落UI特效变化间隔 */
    public static flyUIEffectInterval: number = 0.1;

    /**--------------------------------------飞天大炮------------------------------------------ */
    /**大炮俯冲下落时，FOV切换到该值 */
    public static diveFovTarget = 120;
    /**大炮俯冲下落时，FOV变化 动画时间 */
    public static diveFovTweenTime = 0.3;
    /**上升旋转Y */
    public static diveUpRotationY: number = 60;
    /**下落时旋转Y */
    public static diveDownRotationY: number = -60;
    /**俯冲动画 */
    public static diveAnimGuid: string = "121646";
    /**落地动画guid */
    public static diveGroundAnimGuid: string = "159224";
    /**落地特效guid */
    public static diveGroundEffectGuid: string = "92828";
    /**落地音效id 音效表*/
    public static diveGroundSoundId: number = 33;


    /**----------------------------------------地形相关----------------------------------------------- */
    /**隐藏到显示的延迟时间 */
    public static showToHideDelayTime: number = 3000;
    /**开启碰撞延迟时间 */
    public static landCollisionTime: number = 1000;


    /**------------------------------------------杀戮悬赏------------------------------------------------ */

    /**杀戮值最大层数  杀戮值与层数 1：1 */
    public static massacre_max_layerCount: number = 20;
    /**每层的易伤百分比 */
    public static massacre_VulnerabilityPer: number = 10;

    /**赏金基数 */
    public static massacre_base_moneyReward: number = 100;
    /**每击杀一个玩家增加的杀戮值 */
    public static massacre_killPlayerAddValue: number = 1;


    /**--------------------------------------------新手引导------------------------------------------------ */
    /**新手引导出生点 */
    public static guide_bornPos: mw.Vector = new mw.Vector(199708, 10129, 2527);

    /**技能球生成位置 */
    public static guide_skillPrefabBorns: mw.Vector[] = [
        new mw.Vector(200110, 9478, 2457),
        new mw.Vector(199557, 9378, 2457),
        new mw.Vector(200553, 9731, 2457),
    ];
    /**技能球预制体 */
    public static guide_skillPrefabGuid: string = "147DCB9A4B7FDB75926F50B33104E415";
    /**木桩guid */
    public static guide_woodPrefabGuid: string = "216549";
    /**木桩生成位置 */
    public static guide_npcBorn: mw.Vector = new mw.Vector(200099.22, 11062.03, 2350.51);
    public static guide_npcScale: mw.Vector = new mw.Vector(2, 2, 2);
    /**最大血量 */
    public static guide_npcMaxHp: number = 9999999999999999999;
    /**npc头顶UI偏移 */
    public static guide_npcHudLos: mw.Vector = new mw.Vector(0, 0, 300);
    /**引导npcid */
    public static guide_npcId: number = -9000;


    /**步骤B多语言key */
    public static guide_stepB_Dialogs: string[] = [
        "guide_dialog_1",
        "guide_dialog_2",
        "guide_dialog_3",
        "guide_dialog_4",
    ];
    /**步骤B  UI引导提示偏移 */
    public static guide_stepB_tipOffset: mw.Vector2 = new mw.Vector2(-200, 0);
    /**步骤F  UI引导提示偏移 */
    public static guide_stepF_tipOffset: mw.Vector2 = new mw.Vector2(-200, 0);

    /**步骤C多语言key */
    public static guide_stepC_Dialogs: string[] = [
        "guide_dialog_5",
        "guide_dialog_6",
        "guide_dialog_7",
    ];
    /**步骤F多语言key */
    public static guide_stepE_Dialogs: string[] = [
        "guide_dialog_8",
        "guide_dialog_9",
        "guide_dialog_10",
    ];

    /**步骤G多语言key */
    public static guide_stepG_Dialogs: string[] = [
        "guide_dialog_11",
        "guide_dialog_12",
        "guide_dialog_13",
    ];

    /**大炮触发器guid */
    public static guide_triggerGuid: string = "11786957";

    /**引导C 引导线距离目的地多近触发下一步骤*/
    public static guide_guideRangeC: number = 100;
    /**引导E 引导线距离目的地多近触发下一步骤*/
    public static guide_guideRangeE: number = 1000;
    /**玩家旋转 */
    public static guide_player_rotation: mw.Rotation = new mw.Rotation(0, 0, 0);
    /**相机相对旋转 */
    public static guide_player_cameraRotation: mw.Rotation = new mw.Rotation(0, 0, 0);

    /**-------------------------冲刺相关配置------------------------------- */
    /**冲刺后的地面增加最大速度值 */
    public static sprintAddSpeed: number = 350;
    /**冲刺重置时间（秒）*/
    public static sptintRestTime: number = 1;
    /**每0.1秒衰减速度 */
    public static sptintReduceValue: number = 60;
    /**玩家疾跑状态特效*/
    public static sprintEffectId: number[] = [66, 67];


    /**------------------------------怒气----------------------------------- */

    /**怒气值增长间隔 单位 秒 */
    public static anger_addValueInterval: number = 0.25;
    /**怒气增长值 列：每秒增加10 */
    public static anger_addValue: number = 1;

    /**怒气衰减间隔 单位 秒 */
    public static anger_cutBackInterval: number = 0.25;

    //#region Auth
    /**
     * 最小访问间隔. ms
     * @type {number}
     */
    public static readonly MIN_ACCESS_INTERVAL = 0.5e3;

    /**
     * 最大订单日志数量.
     * @type {number}
     */
    public static readonly MAX_ORDER_LOG_COUNT = 50;

    /**
     * Token 过期刷新间隔. ms
     * @type {number}
     */
    public static readonly EXPIRED_REFRESH_INTERVAL = 10e3;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Energy
    /**
     * 体力容量.
     * @type {number}
     */
    public static readonly ENERGY_MAX: number = 24;

    /**
     * 体力系数采样数量.
     * @type {number}
     */
    public static readonly ENERGY_RECOVERY_SAMPLE_COUNT: number = 5;

    /**
     * 体力 恢复间隔. min
     * @type {number}
     */
    public static readonly ENERGY_RECOVERY_INTERVAL: number = 30;

    /**
     * 体力 恢复间隔. ms
     * @type {number}
     */
    public static get ENERGY_RECOVERY_INTERVAL_MS(): number {
        return this.ENERGY_RECOVERY_INTERVAL * 60 * 1000;
    };

    /**
     * 体力 恢复量.
     * @type {number}
     */
    public static readonly ENERGY_RECOVERY_COUNT = 1;

    /**
     * 体力 失效再唤醒间隔.
     * @type {number}
     */
    public static readonly ENERGY_INVALID_RE_ALIVE_DURATION: number = 100;

    /**
     * 体力 修改合批次数.
     * @type {number}
     */
    public static readonly ENERGY_PATCH_RPC_COUNT = 10;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄


}