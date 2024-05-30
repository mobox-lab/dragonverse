/*
 * @Author: haoran.zhang haoran.zhang@appshahe.com
 * @Date: 2024-05-20 10:33:14
 * @LastEditors: haoran.zhang haoran.zhang@appshahe.com
 * @LastEditTime: 2024-05-27 15:05:01
 * @FilePath: \battleworld\JavaScripts\const\GameServiceConfig.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import GToolkit, { GtkTypes } from "../util/GToolkit";

export default class GameServiceConfig {
    /**
     * 是否开启落地爆炸冲量.
     */
    public static readonly ENABLE_LAND_IMPULSE = false;
    //#region Invincible Buff
    /**
     * 无敌buff 时长(毫秒).
     */
    public static readonly INVINCIBLE_BUFF_TIME = 60e3;
    /**
     * 无敌buff 特效guid.
     */
    public static readonly INVINCIBLE_BUFF_EFFECT_GUID = "89122";
    /**
     * 无敌buff 特效位置偏移.
     */
    public static readonly INVINCIBLE_BUFF_EFFECT_OFFSET = new Vector(0, 0, 100);
    /**
     * 无敌buff 特效缩放.
     */
    public static readonly INVINCIBLE_BUFF_EFFECT_SCALE = new Vector(1, 1, 1);
    /**
     * 无敌buff 特效旋转.
     */
    public static readonly INVINCIBLE_BUFF_EFFECT_ROTATION = new Rotation(0, 0, 0);
    /**
     * 无敌buff 累计伤害值取消
     */
    public static readonly INVINCIBLE_BUFF_DAMAGE_CANCEL = 100;
    //#endregion

    //#region Shop
    /**
     * 商店tab普通底图guid.
     */
    public static readonly SHOP_TAB_NORMAL_GUID = "295324";
    /**
     * 商店tab选中底图guid.
     */
    public static readonly SHOP_TAB_SELECTED_GUID = "341310";

    //#region Magma

    /**
     * 岩浆伤害判定间隔(毫秒).
     */
    public static readonly MAGMA_TRIGGER_HURT_INTERVAL = 200;

    /**
     * 岩浆伤害
     */
    public static readonly MAGMA_TRIGGER_HURT = 30;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Stamina

    /**
     * 体力 恢复间隔. min
     * @type {number}
     */
    public static readonly ENERGY_RECOVERY_INTERVAL: number = 2;

    /**
     * 体力 恢复间隔. ms
     * @type {number}
     */
    public static get ENERGY_RECOVERY_INTERVAL_MS(): number {
        return this.ENERGY_RECOVERY_INTERVAL * 60 * 1000;
    };

    /**
     * 进入战场体力消耗值.
     */
    public static readonly STAMINA_COST_ENTER_FIGHTING = 20;

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Global Config
    /**
     * 是否发布.
     */
    public static isRelease: boolean = undefined;

    /**
     * 是否内部 Beta 版本.
     */
    public static isBeta: boolean = undefined;

    /**
     * 是否使用测试地址.
     */
    public static isUseTestUrl: boolean = undefined;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Statistic

    /**
     * 最大登录记录统计数量.
     */
    public static readonly MAX_LOGIN_RECORD_STATISTIC_COUNT = 100;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Auth
    /**
     * 外源服务器 通信 最短通信 间隔.
     */
    public static readonly MIN_OTHER_REQUEST_INTERVAL = 1e3;

    /**
     * 最长等待授权时间.
     */
    public static readonly MAX_AUTH_WAITING_TIME = 5e3;

    /**
     * 巡查时间间隔.
     */
    public static readonly GUARD_PATROL_INTERVAL = GToolkit.timeConvert(3, GtkTypes.Tf.M, GtkTypes.Tf.Ms);

    /**
     * 上报等待间隔.
     * @type {number}
     */
    public static readonly REPORT_REQUEST_WAIT_TIME = 1e3;

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Rank Score
    /**
     * 帕姆尼击杀 段位分.
     */
    public static readonly RANK_SCORE_BOT_KILLED = 2;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}
