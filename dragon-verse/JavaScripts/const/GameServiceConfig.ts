import GToolkit, { GtkTypes } from "../util/GToolkit";

export default class GameServiceConfig {
    //#region CowLevel
    /**
     * 奶牛关传送门无精灵球爆炸特效
     */
    public static readonly COW_LEVEL_PORTAL_EXPLODE_EFFECT_GUID = "290031";
    /**
     * 奶牛关传送门无精灵球爆炸特效缩放
     */
    public static readonly COW_LEVEL_PORTAL_EXPLODE_EFFECT_SCALE = new Vector(1, 1, 1);
    /**
     * 奶牛关传送门无精灵球爆炸冲量
     */
    public static readonly COW_LEVEL_PORTAL_EXPLODE_FORCE = new Vector(0, -2000, 3000);
    /**
     * 奶牛关传送门无精灵球爆炸音效
     */
    public static readonly COW_LEVEL_PORTAL_EXPLODE_SOUND_ID = "";
    /**
     * 奶牛关雕像有传送门激活特效
     */
    public static readonly COW_LEVEL_PORTAL_EFFECT_GUID = "142951";
    /**
     * 奶牛关雕像有传送门激活特效位置
     */
    public static readonly COW_LEVEL_PORTAL_EFFECT_POS = new Vector(-355.7, 37.7, 878);
    /**
     * 奶牛关雕像有传送门激活特效时长（秒）
     */
    public static readonly COW_LEVEL_PORTAL_EFFECT_DURATION = 0.6;
    /**
     * 奶牛关雕像有传送门激活特效缩放最大值
     */
    public static readonly COW_LEVEL_PORTAL_EFFECT_SCALE_MAX = new Vector(12, 12, 12);
    /**
     * 奶牛关传送门显示场景名时长
     */
    public static readonly COW_LEVEL_PORTAL_SHOW_SCENE_NAME_DURATION = 2e3;
    /**
     * 奶牛关传送门tips显示时长
     */
    public static readonly COW_LEVEL_PORTAL_SHOW_TIPS_DURATION = 2;

    //#endregion
    //#region Portal
    /**
     * 主场景在场景表里的id
     */
    public static readonly MAIN_SCENE_ID = 1;
    /**
     * 中转关在场景里的id
     */
    public static readonly TRANSFER_SCENE_ID = 8;
    /**
     * 转场动画渐显时间（毫秒）
     */
    public static readonly TRANSITION_FADE_IN_DURATION = 1500;
    /**
     * 转场动画渐隐时间（毫秒）
     */
    public static readonly TRANSITION_FADE_OUT_DURATION = 1500;
    /**
     * 转场动画中间停顿时间（毫秒）
     */
    public static readonly TRANSITION_DELAY_DURATION = 500;
    //#endregion
    //#region Sub Game
    /**
     * 跳子游戏 进度条时长.
     */
    public static readonly SUB_GAME_SCENE_JUMP_PROGRESS_DURATION = 3e3;

    /**
     * 跑酷游戏退出传送位置
     */
    public static readonly ENTER_OBBY_GAME_POS = new Vector(5441, -20000, 1450);

    /**
     * 无敌护盾花费金币数
     */
    public static readonly INVINCIBLE_COST = 10;

    /**
     * 自动寻路花费金币数
     */
    public static readonly AUTO_FIND_PATH_COST = 10;
    /**
     * 护盾无敌时间
     */
    public static readonly OBBY_INVINCIBLE_TIME = 10;
    /**
     * 护盾特效Guid
     */
    public static readonly OBBY_INVINCIBLE_EFFECT_GUID = "89122";
    /**
     * 护盾特效位置偏移
     */
    public static readonly OBBY_INVINCIBLE_EFFECT_POS_OFFSET = new Vector(0, 0, 90);
    /**
     * 护盾特效旋转
     */
    public static readonly OBBY_INVINCIBLE_EFFECT_ROTATION = new Rotation(0, 0, 0);
    /**
     * 护盾特效缩放
     */
    public static readonly OBBY_INVINCIBLE_EFFECT_SCALE = new Vector(0.6, 0.6, 0.6);

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Auth

    /**
     * P12 通信 最短 子游戏信息上传 间隔.
     */
    public static readonly MIN_SUB_GAME_INFO_INTERVAL = 1e3;

    /**
     * P12 通信 每日最大 Code 验证次数.
     */
    public static readonly DAILY_MAX_TRIAL_COUNT = 100;

    /**
     * P12 通信 每小时最大 Code 验证次数.
     */
    public static readonly HOUR_MAX_TRIAL_COUNT = 10;

    /**
     * 最长等待授权时间.
     */
    public static readonly MAX_AUTH_WAITING_TIME = 5e3;

    /**
     * 巡查时间间隔.
     */
    public static readonly GUARD_PATROL_INTERVAL = GToolkit.timeConvert(3, GtkTypes.Tf.M, GtkTypes.Tf.Ms);

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Generate
    /**
     * 采集物 场景龙 单次 同型 最大尝试生成次数.
     */
    public static readonly MAX_SINGLE_GENERATE_TRIAL_COUNT = 5;

    /**
     * 采集物 场景龙 检查生成间隔.
     */
    public static readonly TRY_GENERATE_INTERVAL = 3000;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Partner Dragon
    /**
     * 伙伴龙 移动速度上限.
     */
    public static readonly PARTNER_DRAGON_MAX_WALK_SPEED = 720;

    /**
     * 伙伴龙 游泳速度上限.
     */
    public static readonly PARTNER_DRAGON_MAX_SWIM_SPEED = 610;

    /**
     * 伙伴龙 初始化时 对镜头世界坐标后向偏移最小路程.
     */
    public static readonly PARTNER_DRAGON_MIN_INITIALIZE_DISTANCE = 600;

    /**
     * 伙伴龙 初始化时 对镜头世界坐标后向偏移最大路程.
     */
    public static readonly PARTNER_DRAGON_MAX_INITIALIZE_DISTANCE = 800;

    /**
     * 伙伴龙 跟随终点 容纳偏移.
     */
    public static readonly PARTNER_DRAGON_FOLLOW_OFFSET = 500;

    /**
     * 伙伴龙 跟随终点 容纳偏移 噪音.
     */
    public static readonly PARTNER_DRAGON_FOLLOW_NOISE = 50;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Scene Dragon
    /**
     * 场景龙 最长准备捕捉时间.
     */
    public static readonly SCENE_DRAGON_MAX_PREPARE_CATCH_DURATION = 8e3;

    /**
     * 场景龙 捕捉进度条时长.
     */
    public static readonly SCENE_DRAGON_CATCH_PROGRESS_DURATION = 2e3;

    /**
     * 场景龙 最远存活距离.
     */
    public static readonly SCENE_DRAGON_MAX_LIVE_DISTANCE = 10000;

    /**
     * 场景龙 存活检查间隔.
     */
    public static readonly SCENE_DRAGON_ALIVE_CHECK_INTERVAL = 1000;

    /**
     * 场景龙 交互器 UI 活跃检测距离比例.
     */
    public static readonly SCENE_DRAGON_UI_ACTIVITY_DISTANCE_RATIO = 0.03;

    /**
     * 场景龙 交互器 UI 过渡开始距离比例.
     */
    public static readonly SCENE_DRAGON_UI_TRANSITION_START_DISTANCE_RATIO = 0.01;

    /**
     * 场景龙 交互器 UI 活跃检测间隔.
     */
    public static readonly SCENE_DRAGON_UI_DORMANT_DETECT_INTERVAL = 3000;

    /**
     * 场景龙 最远可捕捉距离.
     */
    public static readonly SCENE_DRAGON_CATCHABLE_DISTANCE = 1000;

    /**
     * 场景龙 最远存活距离平方.
     */
    public static get SQR_SCENE_DRAGON_MAX_LIVE_DISTANCE() {
        return GameServiceConfig.SCENE_DRAGON_MAX_LIVE_DISTANCE * GameServiceConfig.SCENE_DRAGON_MAX_LIVE_DISTANCE;
    }

    /**
     * 场景龙 交互器 UI 活跃检测距离平方.
     * @desc 进入活跃检测距离时 交互器 进入 **活跃态**. 否则进入 **休眠态**.
     * @desc 活跃态 交互器 将进行更加频繁的距离检测 以平滑 UI 过渡.
     */
    public static get SQR_SCENE_DRAGON_UI_ACTIVITY_DISTANCE() {
        return (
            GameServiceConfig.SQR_SCENE_DRAGON_MAX_LIVE_DISTANCE *
            this.SCENE_DRAGON_UI_ACTIVITY_DISTANCE_RATIO *
            this.SCENE_DRAGON_UI_ACTIVITY_DISTANCE_RATIO
        );
    }

    /**
     * 场景龙 可捕捉距离平方.
     */
    public static get SQR_SCENE_DRAGON_CATCHABLE_DISTANCE() {
        return this.SCENE_DRAGON_CATCHABLE_DISTANCE * this.SCENE_DRAGON_CATCHABLE_DISTANCE;
    }

    /**
     * 场景龙 交互器 UI 过渡开始距离平方.
     * @desc 进入过渡开始距离时 交互器 从此为 0 值计算过渡参数 t.
     */
    public static get SQR_SCENE_DRAGON_UI_TRANSITION_START_DISTANCE() {
        return (
            this.SQR_SCENE_DRAGON_MAX_LIVE_DISTANCE *
            this.SCENE_DRAGON_UI_TRANSITION_START_DISTANCE_RATIO *
            this.SCENE_DRAGON_UI_TRANSITION_START_DISTANCE_RATIO
        );
    }

    /**
     * 场景龙 出生特效 一阶段时长. ms
     */
    public static readonly SCENE_DRAGON_BIRTH_EFFECT_DURATION_1 = 1e3;

    /**
     * 场景龙 出生特效 二阶段时长. ms
     */
    public static readonly SCENE_DRAGON_BIRTH_EFFECT_DURATION_2 = 1e3;

    /**
     * 场景龙 出生特效 三阶段时长. ms
     */
    public static readonly SCENE_DRAGON_BIRTH_EFFECT_DURATION_3 = 0.2e3;

    /**
     * 场景龙 出生特效 四阶段时长. ms
     */
    public static readonly SCENE_DRAGON_BIRTH_EFFECT_DURATION_4 = 1e3;

    /**
     * 场景龙 出生光环特效 Guid.
     */
    public static readonly SCENE_DRAGON_BIRTH_LIGHT_EFFECT_ID = "132892";

    /**
     * 场景龙 出生特效 起始缩放.
     */
    public static get SCENE_DRAGON_BIRTH_EFFECT_START_SCALE() {
        return new Vector(0, 0, 0);
    }

    /**
     * 场景龙 出生特效 阶段 2 缩放.
     */
    public static get SCENE_DRAGON_BIRTH_EFFECT_STAGE_1_SCALE() {
        return new Vector(1, 1, 1);
    }

    /**
     * 场景龙 出生特效 阶段 3 缩放.
     */
    public static get SCENE_DRAGON_BIRTH_EFFECT_STAGE_3_SCALE() {
        return new Vector(1.5, 1.5, 1.5);
    }

    /**
     * 场景龙 出生爆炸特效 Guid.
     */
    public static readonly SCENE_DRAGON_BIRTH_EXPLODE_EFFECT_ID = "157117";

    /**
     * 场景龙 死亡上浮速度. m/s
     */
    public static readonly SCENE_DRAGON_DEATH_FLOAT_SPEED = 5;

    /**
     * 场景龙 死亡等待 时长. s
     */
    public static readonly SCENE_DRAGON_DEATH_EFFECT_DURATION = 2;

    /**
     * 场景龙 死亡等待光环特效 Guid.
     */
    public static readonly SCENE_DRAGON_DEATH_WAIT_LIGHT_EFFECT_ID = "4397";

    /**
     * 场景龙 死亡等待光环特效 位置偏移.
     * @constructor
     */
    public static get SCENE_DRAGON_DEATH_WAIT_LIGHT_EFFECT_LOCATION_OFFSET() {
        return new Vector(0, 0, 0);
    }

    /**
     * 场景龙 死亡销毁光环特效 Guid.
     */
    public static readonly SCENE_DRAGON_DEATH_DESTROY_LIGHT_EFFECT_ID = "142961";

    /**
     * 场景龙 死亡销毁光环特效 位置偏移.
     * @constructor
     */
    public static get SCENE_DRAGON_DEATH_DESTROY_LIGHT_EFFECT_LOCATION_OFFSET() {
        return new Vector(0, 0, 0);
    }

    /**
     * 场景龙 死亡销毁爆炸特效 Guid.
     */
    public static readonly SCENE_DRAGON_DEATH_DESTROY_EXPLODE_EFFECT_ID = "265661";

    /**
     * 场景龙 死亡姿态.
     */
    public static readonly SCENE_DRAGON_DEATH_STANCE_ID = "47771";

    /**
     * 场景龙 烟雾特效 Guid.
     */
    public static readonly SMOKE_EFFECT_ID = "89589";

    /**
     * 场景龙 恐惧 姿态 Guid.
     * @private
     */
    public static readonly SCENE_DRAGON_FEAR_ANIM_ID = "86094";

    /**
     * 场景龙 大笑 姿态 Guid.
     */
    public static readonly SCENE_DRAGON_LAUGH_ANIM_ID = "14598";

    /**
     * 场景龙 选中 特效 Guid.
     */
    public static readonly SELECTED_EFFECT_ID = "128903";

    /**
     * 场景龙 惊讶 特效 Guid.
     */
    public static readonly ASTOUNDED_EFFECT_ID = "11375";

    /**
     * 场景龙 头顶 UI 高度.
     */
    public static readonly HEAD_UI_HEIGHT = 115;

    /**
     * 场景龙 捕捉球 预制体 Guid.
     */
    public static readonly THROW_BALL_PREFAB_GUID = "33BCE32D4124AAFB9091F1A6CD90E3D6";

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Ecology
    /**
     * 生态 动物 自动生成间隔.
     * @type {number}
     */
    public static readonly ECOLOGY_ANIMAL_AUTO_GENERATION_INTERVAL = 5e3;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Bag
    /**
     * Dragon Ball 背包 Id.
     */
    public static readonly DRAGON_BALL_BAG_ID = 1;

    /**
     * 每日 obby coin 获取数量.
     */
    public static readonly DAILY_OBBY_COIN_OBTAIN_COUNT = 10;

    /**
     * 每日 obby ticket 获取数量.
     */
    public static readonly DAILY_OBBY_TICKET_OBTAIN_COUNT = 10;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Role

    /**
     * 角色 最大行走速度.
     */
    public static readonly ROLE_MAX_WALK_SPEED = 750;

    /**
     * 角色 最大行走加速度.
     */
    public static readonly ROLE_MAX_WALK_ACCURATE = 750;

    /**
     * 角色 最大冲刺速度.
     */
    public static readonly ROLE_MAX_SPRINT_SPEED = 1200;

    /**
     * 角色 最大冲刺加速度.
     */
    public static readonly ROLE_MAX_SPRINT_ACCURATE = 2400;

    /**
     * 角色 冲刺耐力门槛.
     */
    public static readonly ROLE_SPRINT_STAMINA_THRESHOLD = 50;

    /**
     * 角色 冲刺特效 Guid.
     */
    public static readonly ROLE_SPRINT_EFFECT_GUID = "145496";

    /**
     * 角色 冲刺特效 SlotType.
     */
    public static readonly ROLE_SPRINT_EFFECT_SLOT_TYPE = mw.HumanoidSlotType.Root;

    /**
     * 角色 冲刺特效 缩放.
     */
    public static readonly ROLE_SPRINT_EFFECT_SCALE = new Vector(0.8, 0.8, 0.8);

    /**
     * 角色 冲刺特效 位置偏移.
     */
    public static readonly ROLE_SPRINT_EFFECT_POSITION_OFFSET = new Vector(-22, 0, 20);

    /**
     * 角色 冲刺特效 残留时长.
     */
    public static readonly ROLE_SPRINT_EFFECT_RESIDUAL_DURATION = 0.5e3;

    /**
     * 角色 蒸气特效 Guid.
     */
    public static readonly STEAM_EFFECT_GUID = "89589";

    /**
     * 角色 丢弃姿态 Guid.
     */
    public static readonly THROW_STANCE_GUID = "20287";

    /**
     * 角色 爆炸特效 Guid.
     */
    public static readonly EXPLODE_EFFECT_GUID = "29393";

    /**
     * 角色 爆炸特效 缩放.
     * @constructor
     */
    public static get EXPLODE_EFFECT_SCALE() {
        return new Vector(2, 2, 2);
    }

    /**
     * 镜头推进最近距离.
     */
    public static readonly CAMERA_ZOOM_MIN_DIST = 150;

    /**
     * 镜头拉远最远距离.
     */
    public static readonly CAMERA_ZOOM_MAX_DIST = 900;

    /**
     * 角色 镜头单次滚轮缩放距离.
     */
    public static readonly CAMERA_ZOOM_PER_DIST = 100;

    /**
     * 镜头缩放 平滑动画时长. ms
     */
    public static readonly CAMERA_ZOOM_PER_DURATION = 0.8e3;

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region NPC
    public static readonly NPC_PREFAB_GUID = "EF576168418ED3113B4C43800A36A451";

    public static readonly NPC_MESH_OBJECT_NAME = "mesh";

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region UI
    /**
     * 独占提示框 存在时长. ms
     * @type {number}
     */
    public static readonly ONLY_TIPS_DURATION = 5e3;

    /**
     * 主界面 幕布 显示动画时长. ms
     */
    public static readonly MAIN_PANEL_CURTAIN_SHOWN_DURATION = 0.5e3;

    /**
     * 主界面 幕布 隐藏动画时长. ms
     */
    public static readonly MAIN_PANEL_CURTAIN_HIDDEN_DURATION = 0.25e3;

    /**
     * 主界面 指针 起始角度. °
     */
    public static readonly MAIN_PANEL_POINTER_START_ANGLE = -110;

    /**
     * 主界面 指针 终点角度. °
     */
    public static readonly MAIN_PANEL_POINTER_END_ANGLE = 110;

    /**
     * 主界面 指针 半周期时长. ms
     */
    public static readonly MAIN_PANEL_POINTER_HALF_DURATION = 1e3;

    /**
     * 主界面 冲刺 ui 特效显隐动画时长. ms
     */
    public static readonly MAIN_PANEL_CNV_SPRINT_EFFECT_DURATION = 0.5e3;

    /**
     * 主界面 体力条 ui 显隐动画时长. ms
     */
    public static readonly MAIN_PANEL_CNV_STAMINA_SHOWN_DURATION = 0.5e3;

    /**
     * 主界面 体力条 ui 世界坐标 y 偏移.
     */
    public static readonly MAIN_PANEL_CNV_STAMINA_WORLD_LOCATION_OFFSET_Y = 100;

    /**
     * 主界面 体力条 ui 世界坐标 z 偏移.
     */
    public static readonly MAIN_PANEL_CNV_STAMINA_WORLD_LOCATION_OFFSET_Z = 100;

    /**
     * 主界面 体力条 ui 屏幕坐标 x 偏移.
     */
    public static readonly MAIN_PANEL_CNV_STAMINA_SCREEN_LOCATION_OFFSET_X = 300;

    /**
     * 主界面 体力条 ui scale 计算基数.
     */
    public static readonly MAIN_PANEL_STAMINA_SCALE_CALCULATE_BASE = 300;

    /**
     * 主界面 交互按钮 捕捉 图标 Guid.
     * @type {string}
     */
    public static readonly MAIN_PANEL_INTERACTION_ICON_GUID_CATCH = "164192";

    /**
     * 主界面 交互按钮 对话 图标 Guid.
     * @type {string}
     */
    public static readonly MAIN_PANEL_INTERACTION_ICON_GUID_TALK = "324347";

    /**
     * 主界面 交互按钮 采集 图标 Guid.
     * @type {string}
     */
    public static readonly MAIN_PANEL_INTERACTION_ICON_GUID_COLLECT = "266693";

    /**
     * 主界面 交互按钮 传送 图标 Guid.
     * @type {string}
     */
    public static readonly MAIN_PANEL_INTERACTION_ICON_GUID_TRANSPORT = "267515";

    /**
     * 主界面 交互按钮 自定义 默认 图标 Guid.
     * @type {string}
     */
    public static readonly MAIN_PANEL_INTERACTION_ICON_GUID_CUSTOM = "164192";

    /**
     * 地图界面 小地图左下点的世界坐标.
     */
    public static readonly MAP_SCENE_AS_MAP_LEFT_DOWN_POS: mw.Vector = new mw.Vector(27000, -26000, 0);

    /**
     * 地图界面 小地图右上点的世界坐标.
     */
    public static readonly MAP_SCENE_AS_MAP_RIGHT_TOP_POS: mw.Vector = new mw.Vector(-25969, 35397, 0);

    /**
     * 地图界面 玩家细节 显隐动画时长. ms
     */
    public static readonly MAP_PLAYER_DETAIL_SHOWN_DURATION = 0.5e3;

    /**
     * 地图界面 地图缩放最大值.
     */
    public static readonly MAP_BIG_MAP_MAX_ZOOM = 6;

    /**
     * 地图界面 地图缩放最小值.
     */
    public static readonly MAP_BIG_MAP_MIN_ZOOM = 1;

    /**
     * 地图界面 地图缩放动画时长. ms
     */
    public static readonly MAP_ZOOM_DURATION = 0.25e3;

    /**
     * 地图界面 地图单次滚轮缩放距离.
     */
    public static readonly MAP_ZOOM_PER_DIST = 1;

    /**
     * 地图界面 地图按键位移距离.
     */
    public static readonly MAP_MOVE_PER_DIST = 40;

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Obby
    /**
     * 布娃娃 持续时长. ms
     * @type {number}
     */
    public static readonly RAGDOLL_SUSTAIN_DURATION = 2e3;

    /**
     * 角色 最大行走速度.
     */
    public static readonly ROLE_MAX_WALK_SPEED_OBBY = 600;

    /**
     * 角色 最大行走加速度.
     */
    public static readonly ROLE_MAX_WALK_ACCURATE_OBBY = 5000;

    /**
     * 角色 不可跨越高度.
     */
    public static readonly ROLE_MAX_STEP_HEIGHT_OBBY = 80;

    /**
     * 角色 最大站稳角度.
     */
    public static readonly ROLE_WALKABLE_FLOOR_ANGLE_OBBY = 30;

    /**
     * 角色 最大转向速度.
     */
    public static readonly ROLE_ROTATE_RATE_OBBY = 2048;

    /**
     * 角色 地面摩擦力.
     */
    public static readonly ROLE_GROUND_FRICTION_OBBY = 6;

    /**
     * 角色 下落速度.
     */
    public static readonly ROLE_FALLING_SPEED_OBBY = 1000;

    /**
     * 角色 重力倍率.
     */
    public static readonly ROLE_GRAVITY_SCALE_OBBY = 2.0;

    /**
     * 角色 最大跳跃高度.
     */
    public static readonly ROLE_JUMP_HEIGHT_OBBY = 180;

    /**
     * 角色 最大跳跃次数.
     */
    public static readonly ROLE_JUMP_MAX_COUNT_OBBY = 1;

    /**
     * 复活等待间隔.
     */
    public static readonly REBORN_INTERVAL_OBBY = 1;

    /**
     * 跑酷得分特效 Guid.
     */
    public static readonly SCENE_DRAGON_OBBY = "89095";

    /**
     * 跑酷星星收集特效 Guid.
     * @type {string}
     */
    public static readonly OBBY_STAR_COLLECT_EFFECT_GUID = "151580";

    /**
     * 跑酷星星触碰特效 Guid.
     * @type {string}
     */
    public static readonly OBBY_STAR_TOUCH_EFFECT_GUID = "155715";

    /**
     * 跑酷星星触碰特效 缩放.
     * @type {Vector}
     */
    public static get OBBY_STAR_TOUCH_EFFECT_SCALE() {
        return new Vector(1.0, 1.0, 1.0);
    }

    /**
     * 跑酷星星收集音效 Id.
     * @type {string}
     */
    public static readonly OBBY_STAR_COLLECT_SOUND_ID = 29;

    /**
     * 跑酷星星飞行加速度.
     * @type {number}
     */
    public static readonly OBBY_STAR_FLY_ACCELERATED = 1200;

    /**
     * 跑酷星星飞行最大速度.
     * @type {number}
     */
    public static readonly OBBY_STAR_FLY_MAX_SPEED = 3000;

    /**
     * 跑酷星星自旋速度. °/s
     * @type {number}
     */
    public static readonly OBBY_STAR_SELF_ROTATION_SPEED = 90;

    /**
     * 跑酷星星漂浮最大距离.
     * @type {number}
     */
    public static readonly OBBY_STAR_FLOAT_MAX_DIST = 50;

    /**
     * 跑酷星星漂浮阶段时间.
     * @type {number}
     */
    public static readonly OBBY_STAR_FLOAT_STAGE_DURATION = 2e3;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄ //#region Role

    public static readonly MAIN_PANEL_SOUND_BUTTON_IMG_GUID = "324601";

    public static readonly MAIN_PANEL_MUTE_BUTTON_IMG_GUID = "324594";

    public static readonly DIALOGUE_PANEL_OPTION_ON_HOVER_IMG_GUID = "324356";

    public static readonly DIALOGUE_PANEL_OPTION_NORMAL_IMG_GUID = "324342";
}
