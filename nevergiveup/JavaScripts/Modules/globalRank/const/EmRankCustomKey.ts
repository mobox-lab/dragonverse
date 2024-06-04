/*
 * @Author       : chen.liang chen.liang@appshahe.com
 * @Date         : 2023-09-06 15:49:40
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2023-11-01 13:47:50
 * @FilePath: \fsRank\JavaScripts\modules\globalRank\const\EmRankCustomKey.ts
 * @Description  : 
 */


/**
 * 这是自定义的额外key用来做额外的事情
 */
export enum EmRankCustomKey {
    /** 隔一定时间更新 默认每天0点更新
     * @fixed GlobalRankData.getTimeKey
     */
    UpdateByTime = "_UpdateByTime",
    /** 仅当前服务器 */
    LocalOnly = "_CurrentServerOnly",
}