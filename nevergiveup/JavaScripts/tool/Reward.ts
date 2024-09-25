import CardModuleS from "../Modules/CardModule/CardModuleS";
import { PlayerModuleS } from "../Modules/PlayerModule/PlayerModuleS";
import { UISettleCommon } from "../UI/Reward/UISettleCommon";
import Utils from "../Utils";
import { GameConfig } from "../config/GameConfig";
import { ItemType } from "./Enum";

/*
 * @Author: shifu.huang
 * @Date: 2023-07-31 15:23:33
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-07 11:15:49
 * @FilePath: \nevergiveup\JavaScripts\tool\Reward.ts
 * @Description: 修改描述
 */
export type RewardInfo = { count: number, rewardId: number }
export type RewardUIInfo = { guid: number, level: number, count: number, assetID: number }
/**
 * 与奖励表的奖励类型一一对应
 */

export namespace Reward {
    export function init() {
        if (SystemUtil.isClient()) {//c
            Event.addServerListener("grantRewardS2C", (rewardArr: number[][]) => {
                showCommonRewards(rewardArr);
            });
        } else {//s
            Event.addClientListener("grantRewardC2S", (player: Player, rewardArr: number[][]) => {
                makeReward(player, rewardArr)
            })
        }
    }
    /**获取图片guid */
    export function getGuid(level: number): string {
        let guid = "144373";
        switch (level) {
            case 1:
                guid = "144373";
                break;
            case 2:
                guid = "144364";
                break;
            case 3:
                guid = "144366";
                break;
            case 4:
                guid = "144371";
                break;
            case 5:
                guid = "144372";
                break;
            default: break;
        }
        return guid;
    }

    export function grantReward(player: Player, rewardArr: number[][], callBack: Function = null, taskId?: number) {
        if (SystemUtil.isClient()) {
            showCommonRewards(rewardArr, callBack);
            Event.dispatchToServer("grantRewardC2S", rewardArr);
        } else {
            const userId = player?.userId ?? '';
            makeReward(player, rewardArr, callBack);
            Event.dispatchToClient(player, "grantRewardS2C", rewardArr);
            const cfg = GameConfig.Task.getElement(taskId);
            if(cfg?.rewards){
                const reward = cfg.rewards.map(([id, count]) => count); // 局外金币，科技点，exp
                Utils.logP12Info("A_QuestClaim", {
                    timestamp: Date.now(),
                    userId,
                    questid: taskId,
                    questtype: cfg?.taskType, // 1主线 2日常
                    reward,
                })
            }
        }
    }

    function makeReward(player: Player, rewardArr: number[][], callBack: Function = null) {
        if (!rewardArr || rewardArr.length <= 0) return false;
        let rewards: RewardInfo[] = [];
        rewardArr.forEach(reward => {
            let temp = {
                count: reward[1],
                rewardId: reward[0]
            }
            rewards.push(temp);
        })
        rewards?.forEach(reward => {
            const cfg = GameConfig.Item.getElement(reward.rewardId);
            if (cfg) {
                switch (cfg.itemType) {
                    case ItemType.Gold:
                        ModuleService.getModule(PlayerModuleS)?.changeGold(player, reward.count);
                        break;
                    case ItemType.Card:
                        const cardCfg = GameConfig.Tower.getElement(cfg.itemTypeid);
                        ModuleService.getModule(CardModuleS)?.giveCard(player, cardCfg.id);
                        break;
                    case ItemType.TechPoint:
                        ModuleService.getModule(PlayerModuleS)?.changeTechPoint(player, reward.count);
                        break;
                    case ItemType.Exp:
                        ModuleService.getModule(PlayerModuleS)?.changeExp(player, reward.count);
                        break;
                    default:
                        break;
                }
            } else {
                console.log('hsf找不到奖励表id ====================== ', JSON.stringify(reward.rewardId))
            }
        })
    }

    /**
     * 奖励展示
     * @param rewards {rewardId:奖励表ID，count:number}[] 
     * @param callBack 关闭回调
     */
    export function showCommonRewards(rewardArr: number[][], callBack: Function = null): boolean {
        if (!rewardArr || rewardArr.length <= 0) return false;
        let rewards: RewardInfo[] = [];
        rewardArr.forEach(reward => {
            let temp = {
                count: reward[1],
                rewardId: reward[0]
            }
            rewards.push(temp);
        })
        //分发奖励
        let infos: RewardUIInfo[] = [];
        rewards?.forEach(reward => {
            const cfg = GameConfig.Item.getElement(reward.rewardId);
            let info: RewardUIInfo = {
                guid: 0,
                level: 1,
                count: 0,
                assetID: null,
            };
            if (cfg) {
                info.count = reward.count;
                info.guid = +cfg.itemImgGuid;
                info.level = cfg.itemLevel;
                info.assetID = cfg.itemType == ItemType.Card ? reward.rewardId : null;
                infos.push(info);
            } else {
                console.log('hsf找不到奖励表id ====================== ', JSON.stringify(reward.rewardId))
            }
        })
        // 显示 获得 界面
        mw.UIService.show(UISettleCommon, () => {
            callBack && callBack();
        }, infos);
        return true;
    }
}

// /**
//  * 用于在批量发放奖励时，需要玩家依次点击才自动领取下一个奖励时使用，表示一个节点，记录调用显示下一个UI的回调
//  */
// export class RewardQueueItem {
//     /** 奖励 */
//     rewardArr: number[][];
//     /** 提供给外部的回调 */
//     callBack: Function;
//     /** 指向下一个弹出的回调 */
//     nextCall: Function;
// }

// /**
//  * 需要依次发放奖励时提供的名称空间
//  */
// export namespace RewardQueue {
//     /** 奖励发放队列 */
//     const rewardQueue: RewardQueueItem[] = [];

//     /**
//      * 添加依次发放的奖励到队列中
//      * @param rewardArr 发放的奖励
//      * @param callBack 回调
//      */
//     export function addReward(rewardArr: number[][], callBack: Function): void {
//         //超出数量上限，不再给添加
//         if (rewardQueue && rewardQueue.length >= 50) return;
//         if (rewardQueue.length == 0) {
//             //队列为空，直接添加
//             rewardQueue.push({ rewardArr, callBack, nextCall: () => rewardQueue.length = 0 });
//         } else {
//             //拿到上一个节点
//             const prev = rewardQueue[rewardQueue.length - 1];
//             //如果当前节点
//             const current: RewardQueueItem = {
//                 rewardArr,
//                 callBack,
//                 nextCall: () => rewardQueue.length = 0
//             };
//             prev.nextCall = () => {
//                 Reward.showCommonRewards(current.rewardArr, () => {
//                     current.callBack && current.callBack();
//                     current.nextCall();
//                 });
//             }
//             rewardQueue.push(current);
//         }
//     }

//     /**
//      * 开始弹
//      */
//     export function startShowCommonRewards(): void {
//         if (rewardQueue && rewardQueue.length > 0) {
//             Reward.showCommonRewards(rewardQueue[0].rewardArr, () => {
//                 rewardQueue[0].callBack && rewardQueue[0].callBack();
//                 rewardQueue[0].nextCall();
//             });
//         }
//     }
// }