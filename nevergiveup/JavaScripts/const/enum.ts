export enum TowerElementType {
    Light = 1, 
    Dark, 
    Water,
    Fire, 
    Wood,
    Earth
}
export enum TowerTargetType {
    Single = 1, // 单体 
    Multiple,   // 群体
    Energy,     // 产出
    Buff        // 增益
}
export enum TowerDamageType {
    Physical = 1,
    Magical
}
export enum TowerStrategyType {
    WarmUp = 1, // 暖机
    AntiHidden, // 破隐 这个不在buff中
    ArmorBreak, // 破甲
    StunEffect, // 眩晕
    ArmorShred, // 削甲
    SlowEffect, // 减速
    MagicPenetration, // 法术穿越
    AntiAir, // 对空增伤
    MultiHit, // 多段伤害
    PriorityAir, // 优先对空
}

export enum StageMonsterSkillType {
    Healing = 0,
    Berserk,
    Stealth, // 隐身
    Fly,
}

/**
 * 天赋类型
 */
export enum ETalentType {
    Base = 1, // 基础天赋
    Peak // 巅峰天赋
}

/**
 * 天赋Buff数值
 */
export enum ETalentBuffValue {
    Integer = 1, // 数字
    Percent // 百分比
}

export enum GlobalEventName {
    ServerTipsEventName = "TD_SERVER_TIPS_EVENT_NAME"
}

/** 
 * DV 中的龙娘元素类型，顺序不太一样 
 */
export enum DragonElemental {
    Fire = 1,
    Water = 2,
    Wood = 3,
    Earth = 4,
    Light = 5,
    Dark = 6,
}