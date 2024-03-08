/**
 * 配在Gamestart上面，但是，不是游戏的开始，而是游戏的定义
 */
export class GamesStartDefines {
    /** 是否打开玩家间碰撞 */
    public static isOpenCharCollsion: boolean = false;

    public static gameTheme: string = "Hall";
}

/** 游戏主题 -  */
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

export class Const {

    /** 假设特殊道具的type是这个 */
    public static readonly SpecialItemType: number = 555;
}