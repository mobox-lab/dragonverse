export enum TowerElementType {
    Light = 1, 
    Dark, 
    Water,
    Fire, 
    Wood,
    Earth
}
export enum TowerTargetType {
    Single = 1, 
    Multiple,
}
export enum TowerDamageType {
    Physical = 1,
    Magical
}
export enum TowerStrategyType {
    WarmUp = 1, // 暖机
    AntiHidden, // 破隐
    ArmorBreak, // 破甲
    StunEffect, // 眩晕
    ArmorShred, // 削甲
    SlowEffect, // 减速
    MagicPenetration, // 法术穿越
    AntiAir, // 对空增伤
    MultiHit, // 多段伤害
    PriorityAir, // 优先对空
}