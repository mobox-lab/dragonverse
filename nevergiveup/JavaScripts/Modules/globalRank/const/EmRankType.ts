/*
 * @Author       : chen.liang chen.liang@appshahe.com
 * @Date         : 2023-05-17 09:56:34
 * @FilePath: \nevergiveup\JavaScripts\Modules\globalRank\const\EmRankType.ts
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-21 18:10:18
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";




export enum EmRankType {
    /** 等级榜 */
    Level,
    /** 金币榜 */
    Gold,
}

export type RankDataType = {
    key: string,
    title: string,
    typeString: string
}

export const EmRankTypeMap = new Map<EmRankType, RankDataType>();
