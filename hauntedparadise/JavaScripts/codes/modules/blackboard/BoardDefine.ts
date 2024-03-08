import { BlackBoardModuleC } from "./BlackBoardMdouleC";

/** 难度类型 */
export enum DegreeType {

    /** 简单 */
    Simple = 1,
    /** 普通 */
    Normal,
    /** 困难 */
    Difficult,
    /** 噩梦 */
    Scary,
    /** 究极噩梦 */
    MaxScary,
}

/** 画面风格类型 */
export enum StyleType {

    /** 正常 */
    Normal = 1,
    /** 诡异 */
    Abnormal = 2,
    /** 可爱 */
    Cute = 3,
}

export class BoardHelper {
    /**
     * 当一个key的value发生改变
     * @param key 键
     * @param value 值
     */
    public static BoardValueChangeEvent = "BoardValueChange"

    /**
     * 当游戏结束后清除黑板的缓存数据
     */
    public static BoardClearEvent = "BoardClearEvent";

    public static BoardLoadingEvt = "BoardLoadingEvt";

    /**
     * 尝试获取一个键的值
     * @param key 目标键
     * @returns 对应的value值
     */
    public static GetTargetKeyValue(key: string) {
        if (SystemUtil.isClient()) {
            return ModuleService.getModule(BlackBoardModuleC).reqGetBoardValue(key);
        }
    }

    /**
     * 改变黑板的一个key的值
     * @param key 键
     * @param value 值
     */
    public static ChangeKeyValue(key: string, value: any) {
        // if (SystemUtil.isServer()) {
        //     return ModuleService.getModule(BlackBoardModuleS).net_changeBoardValue(key, value);
        // }
        if (SystemUtil.isClient()) {
            return ModuleService.getModule(BlackBoardModuleC).reqChangeBoardValue(key, value);
        }
    }
}

export class BoardKeys {
    public static TestKey = "TestKey"

    /**
     * 当前游戏难度
     */
    public static Degree = "Degree"

    /** 画面风格 */
    public static Style = "Style";

    /** 存档序号 */
    public static ArchiveID = "ArchiveID";

    /**
     * 当前游戏的密码
     */
    public static Password = "Password"

    /**
     * 交互物状态
     */
    public static InterStats = "InterStats_{0}"

    /**
     * 玩家当前的交互安全类型
     * string类型，由策划在场景里面配，。
     */
    public static PlayerSafeStat = "PlayerSafeStat"

    /**
     * {0}为key，{1}为gameobjectId
     */
    public static CustomKey = "{0}_{1}"

    /**
     * 当前玩家的物品状态
     */
    public static SpeicialItemStat = "SpeicialItemStat"
    /**玩家的无敌状态后面加上playerID */
    public static PlayerInvincible = "PlayerInvincible";
    /**玩家的死亡状态 */
    public static PlayerDeathState = "PlayerDeathState";
}
