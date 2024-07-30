/*
 * @Author: shifu.huang
 * @Date: 2023-12-29 11:42:11
 * @LastEditors: shifu.huang
 * @LastEditTime: 2023-12-29 11:44:01
 * @FilePath: \nevergiveup\JavaScripts\tool\Enum.ts
 * @Description: 修改描述
 */

export enum ItemType {
    /**货币 */
    Gold = 1,
    /**塔的卡牌 */
    Card = 2,
    /**科技点 */
    TechPoint = 3,
    /**经验 */
    Exp = 4,
}

/**任务事件 */
export enum EmTaskEvent {
    /**任务完成 */
    TaskFinish = "TaskFinish",
}

export enum BuffApplyType {
    /**塔 */
    Tower = 1,
    /**怪物 */
    Enemy = 2
}

export enum EEnemyComponentType {
    Stealth = 1,
    Flying,
    Armored,
    ImmuneControl,
    Boss
}