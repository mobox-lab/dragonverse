/*
 * @Author       : dal
 * @Date         : 2023-11-16 17:05:00
 * @LastEditors  : dal
 * @LastEditTime : 2023-11-17 11:12:15
 * @FilePath     : \hauntedparadise\JavaScripts\modules\procedure\const\EmProcedureState.ts
 * @Description  : 
 */

/** 结束类型 */
export enum EndType {

    /** 无事发生 */
    None = 0,

    /** 成功 */
    Success = 1,

    /** 失败 */
    Lose = 2,
}

export enum EmProcedureState {
    /** 未开始 */
    Init = 1,
    /** 加载中 */
    Loading = 2,
    /** 开始游戏 */
    Start = 3,
    /** 结束 */
    End = 5,
}