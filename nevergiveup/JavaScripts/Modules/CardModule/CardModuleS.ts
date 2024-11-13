/*
 * @Author: shifu.huang
 * @Date: 2023-12-14 15:26:46
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-04 14:41:20
 * @FilePath: \nevergiveup\JavaScripts\Modules\CardModule\CardModuleS.ts
 * @Description: 修改描述
 */
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { StatisticModuleS } from "../statistic/StatisticModule";
import CardModuleC from "./CardModuleC";
import CardModuleData from "./CardModuleData";

export default class CardModuleS extends ModuleS<CardModuleC, CardModuleData> {
    @Decorator.noReply()
    public net_setEquipCard(equipCards: number[]) {
        this.currentData.equipCards = equipCards;
        this.currentData.save(false);
    }

    /**
     * 卖卡牌
     * @param cardID 卡牌ID
     */
    public net_sellCard(cardID: number) {
        const userId = this.currentPlayer?.userId ?? "";
        const data = this.currentData;
        const player = this.currentPlayer;
        console.log("#debug server net_sellCard:", cardID);
        try {
            if (!data.unlockCards.includes(cardID) || data.unlockCards.length === 1)
                return false; // 未解锁卡牌、只剩最后一张卡牌不能卖
            if (data.equipCards.includes(cardID)) data.equipCards = data.equipCards.filter((id) => id !== cardID);
            // 给金币
            const config = GameConfig.Tower.getElement(cardID);
            const sellPrice = (config?.shopPrice ?? 0) / 2;
            console.log("#debug server net_sellCard sellPrice:", sellPrice);
            const res = ModuleService.getModule(PlayerModuleS).changeGold(player, sellPrice);
            if (res) {
                data.unlockCards = data.unlockCards.filter((id) => id !== cardID); // 从解锁卡牌中移除
                Utils.logP12Info("A_TowerRecycle", {
                    // general
                    timestamp: Date.now(),
                    userId,
                    // for action
                    recycletower: cardID, // tower id
                    cost: -sellPrice //局外金币
                })
                data.save(true);
                return true;
            }
            return false;
        } catch (e) {
            Utils.logP12Info("A_Error", "net_sellCard error" + " userId:" + userId + " error:" + e);
            return false;
        }
    }

    /**
     * 购买卡牌
     * @param cardID 卡牌id
     */
    public net_buyCard(cardID: number) {
        const userId = this.currentPlayer?.userId ?? "";
        try {
            if (!this.currentData.unlockCards.includes(cardID)) {
                if (
                    ModuleService.getModule(PlayerModuleS).changeGold(
                        this.currentPlayer,
                        -GameConfig.Tower.getElement(cardID)?.shopPrice
                    )
                ) {
                    this.currentData.addUnlockCard(cardID);
                    this.currentData.save(false);
                    const cost = GameConfig.Tower.getElement(cardID)?.shopPrice ?? 0;
                    ModuleService.getModule(StatisticModuleS)?.recordTowerUnlock(cardID, cost, userId);
                    Utils.logP12Info("A_TowerUnlock", {
                        timestamp: Date.now(),
                        userId,
                        unlocktower: cardID,
                        cost,
                    });
                    return true;
                }
            }
            return false;
        } catch (e) {
            Utils.logP12Info("A_Error", "net_buyCard error" + " userId:" + userId + " error:" + e);
            return false;
        }
    }

    /**
     * 送给玩家卡牌
     * @param cardID 卡牌id
     */
    public giveCard(player: Player, cardID: number) {
        let data = ModuleService.getModule(CardModuleS).getPlayerData(player);
        if (!data.unlockCards.includes(cardID)) {
            data.addUnlockCard(cardID);
            data.save(false);
            this.getClient(player).net_addUnlockCard(cardID);
            this.getClient(player).net_equipCard(cardID, true);
        }
    }

    public getPlayerEquipCards(player: Player) {
        let data = ModuleService.getModule(CardModuleS).getPlayerData(player);
        return data.equipCards;
    }

    public getPlayerUnlockCards(player: Player) {
        let data = ModuleService.getModule(CardModuleS).getPlayerData(player);
        return data.unlockCards;
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {}
}
