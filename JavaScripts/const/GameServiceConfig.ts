import GToolkit, { Tf } from "../util/GToolkit";

export default class GameServiceConfig {
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
    public static readonly GUARD_PATROL_INTERVAL = GToolkit.timeConvert(3, Tf.M, Tf.Ms);

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Generate
    /**
     * 采集物 场景龙 单次 同型 最大尝试生成次数.
     */
    public static readonly MAX_SINGLE_GENERATE_TRIAL_COUNT = 5;

    /**
     * 采集物 场景龙 检查生成间隔.
     */
    public static readonly TRY_GENERATE_INTERVAL = 1000;
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Scene Dragon
    /**
     * 场景龙 最长准备捕捉时间.
     */
    public static readonly SCENE_DRAGON_MAX_PREPARE_CATCH_DURATION = 2e3;

    /**
     * 场景龙 最远存活距离.
     */
    public static readonly SCENE_DRAGON_MAX_LIVE_DISTANCE = 100000;

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
    public static readonly SCENE_DRAGON_CATCHABLE_DISTANCE = 300;

    /**
     * 场景龙 最远存活距离平方.
     */
    public static get SQR_SCENE_DRAGON_MAX_LIVE_DISTANCE() {
        return GameServiceConfig.SCENE_DRAGON_MAX_LIVE_DISTANCE *
            GameServiceConfig.SCENE_DRAGON_MAX_LIVE_DISTANCE;
    }

    /**
     * 场景龙 交互器 UI 活跃检测距离平方.
     * @desc 进入活跃检测距离时 交互器 进入 **活跃态**. 否则进入 **休眠态**.
     * @desc 活跃态 交互器 将进行更加频繁的距离检测 以平滑 UI 过渡.
     */
    public static get SQR_SCENE_DRAGON_UI_ACTIVITY_DISTANCE() {
        return GameServiceConfig.SQR_SCENE_DRAGON_MAX_LIVE_DISTANCE *
            this.SCENE_DRAGON_UI_ACTIVITY_DISTANCE_RATIO *
            this.SCENE_DRAGON_UI_ACTIVITY_DISTANCE_RATIO;
    }

    /**
     * 场景龙 可捕捉距离平方.
     */
    public static get SQR_SCENE_DRAGON_CATCHABLE_DISTANCE() {
        return this.SCENE_DRAGON_CATCHABLE_DISTANCE *
            this.SCENE_DRAGON_CATCHABLE_DISTANCE;
    }

    /**
     * 场景龙 交互器 UI 过渡开始距离平方.
     * @desc 进入过渡开始距离时 交互器 从此为 0 值计算过渡参数 t.
     */
    public static get SQR_SCENE_DRAGON_UI_TRANSITION_START_DISTANCE() {
        return this.SQR_SCENE_DRAGON_MAX_LIVE_DISTANCE *
            this.SCENE_DRAGON_UI_TRANSITION_START_DISTANCE_RATIO *
            this.SCENE_DRAGON_UI_TRANSITION_START_DISTANCE_RATIO;
    }

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
     * Dragon Ball 飞翔时间.
     */
    public static readonly DRAGON_BALL_THROW_DURATION = 2e3;

    /**
     * 场景龙 选中 特效 Guid.
     */
    public static readonly SELECTED_EFFECT_ID = "128903";

    /**
     * 场景龙 惊讶 特效 Guid.
     */
    public static readonly ASTOUNDED_EFFECT_ID = "11375";

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Role
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

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region UI
    /**
     * {@link DialoguePanel.cnvOptions} 最大选项容量.
     */
    public static readonly CNV_OPTIONS_MAX_CAPACITY = 4;
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}