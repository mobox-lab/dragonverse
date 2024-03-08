/*
 * @Author: chen.liang chen.liang@appshahe.com
 * @Date: 2023-10-10 10:32:50
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2023-10-12 18:46:35
 * @FilePath: \catcompanion\JavaScripts\modules\procedure\const\mw.ts
 * @Description: 
 */


/**
 * 广播游戏状态变更
 * @param state 当前游戏状态
 */
export const Event_GameStateChange = "Ghost_Local_GameStateChange";

/**
 * 读档事件 进入加载游戏状态时发送，archiveData isInit为false代表新存档
 * @param data archiveData
 */
export const Event_LoadArchiveData = "Load_Archive_Data";

/**
 * 广播游戏结束
 */
export const Event_GameEnd = "Ghost_Local_GameEnd";

/**
 * 玩家进入房间
 * @param roomType 房间类型
 * @param playerId 玩家ID
 */
export const Event_RoomTriggerEnter = "Ghost_Local_RoomTriggerEnter";
/**
 * 玩家离开房间
 * @param roomType 房间类型
 * @param playerId 玩家ID
 */
export const Event_RoomTriggerLeave = "Ghost_Local_RoomTriggerLeave";

/**
 * 玩家通关
 * @param guid 物体id
 */
export const Event_PlayerPass = "Ghost_Local_PlayerPass";