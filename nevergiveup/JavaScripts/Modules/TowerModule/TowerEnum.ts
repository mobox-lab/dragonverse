/*
 * @Author: shifu.huang
 * @Date: 2023-12-04 16:00:59
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-05 09:44:47
 * @FilePath: \nevergiveup\JavaScripts\Modules\TowerModule\TowerEnum.ts
 * @Description: 修改描述
 */
export enum TowerType {
    /**攻击 */
    Attack = 1,
    /**增益 */
    Buff = 2,
    /**产出 */
    Farm = 3,
    /**投掷物 */
    Throw = 4,
}

// export enum InfoName {
//     attackDamage = "攻击力: ",
//     attackTime = "攻击间隔: ",
//     attackCount = "攻击数量: ",
//     attackRange = "伤害范围: ",
//     findRange = "索敌范围: ",

// }

export enum TowerEvent {
    /**创建 */
    Create = "CreateTower",
    Destroy = "DestroyTower",
    UpdateInfo = "UpdateInfo",
    ChooseTower = "ChooseTower",
}

/**
 * @param playerID 持有者的id
 * @param configID 配置表的id
 * @param placeID 塔的位置
 * @param level 等级
 */
export type TowerInfo = {
    playerID: number;
    playerName: string;
    configID: number;
    placeID: number;
    level: number;
    gold?: number;
};

export let RANGEUNIT = 200;
