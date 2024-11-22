/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-14 15:24:22
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-21 17:51:35
 * @FilePath     : \nevergiveup\JavaScripts\Modules\PlayerModule\PlayerModuleS.ts
 * @Description  : 修改描述
 */

import { PlayerActions } from "../../Actions";
import { GameConfig } from "../../config/GameConfig";
import { ItemType } from "../../tool/Enum";
import Utils from "../../Utils";
import { StatisticModuleS } from "../statistic/StatisticModule";
import { TimerModuleUtils } from "../TimeModule/time";
// import { GlobalRankModuleS } from "../globalRank/GlobalRankModuleS";
import PlayerModuleC from "./PlayerModuleC";
import PlayerModuleData, { SumCount } from "./PlayerModuleData";
import PlayerScript from "./PlayerScript";
import { PlayerUtil } from "./PlayerUtil";

export type StageState = {
    userName?: string;
    level?: number;
    difficulty?: number;
    cards?: number[];
    stageCfgId: number;
    playerId?: number;
    groupIndex: number;
};
export class PlayerModuleS extends ModuleS<PlayerModuleC, PlayerModuleData> {
    stageStages: { [groupIndex: number]: StageState | null } = {};
    userRoomInfo: Map<string, RoomInfo | null> = new Map();

    protected onStart(): void {
        TimerModuleUtils.addOnlineDayListener(this.clearDailyCount, this);
    }
    /**
     * 设置第一次做某事
     * @param action
     */
    public net_setFirstAction(action: string) {
        this.currentData.firstAction.push(action);
        this.currentData.save(false);
    }
    protected async onPlayerEnterGame(player: mw.Player): Promise<void> {
        let script = await Script.spawnScript(PlayerScript, true);
        PlayerUtil.setPlayerScript(player.playerId, script);
        script.gameObject = player.character;
    }

    //清空data中已经完成的日常任务
    private clearDailyCount() {
        for (let player of Player.getAllPlayers()) {
            let data = this.getPlayerData(player);
            if (!data) continue;
            data.completeStageCount.daily = 0;
            data.killEnemyCount.daily = 0;
            data.killHealEnemyCount.daily = 0;
            data.killBerserkEnemyCount.daily = 0;
            data.killFlyEnemyCount.daily = 0;
            data.killStealthEnemyCount.daily = 0;
            data.perfectCompleteStageCount.daily = 0;
            data.lightTowerCount.daily = 0;
            data.darkTowerCount.daily = 0;
            data.waterTowerCount.daily = 0;
            data.fireTowerCount.daily = 0;
            data.woodTowerCount.daily = 0;
            data.earthTowerCount.daily = 0;
            data.levelThreeCount.daily = 0;
            data.infinityGameTimes.daily = 0;
            data.infinityBossCount.daily = 0;
            data.towerLevelUpCount.daily = 0;
            data.levelUpCount.daily = 0;
            data.unlockTowerDaily = 0;
            data.save(false);
        }
    }

    public clearDailyCountByPlayer(player: Player) {
        let data = this.getPlayerData(player);
        if (!data) return;
        data.completeStageCount.daily = 0;
        data.killEnemyCount.daily = 0;
        data.killHealEnemyCount.daily = 0;
        data.killBerserkEnemyCount.daily = 0;
        data.killFlyEnemyCount.daily = 0;
        data.killStealthEnemyCount.daily = 0;
        data.perfectCompleteStageCount.daily = 0;
        data.lightTowerCount.daily = 0;
        data.darkTowerCount.daily = 0;
        data.waterTowerCount.daily = 0;
        data.fireTowerCount.daily = 0;
        data.woodTowerCount.daily = 0;
        data.earthTowerCount.daily = 0;
        data.levelThreeCount.daily = 0;
        data.infinityGameTimes.daily = 0;
        data.infinityBossCount.daily = 0;
        data.towerLevelUpCount.daily = 0;
        data.levelUpCount.daily = 0;
        data.unlockTowerDaily = 0;
        data.save(true);
    }

    public net_SaveSumCount(
        sumCompleteStageCount: number,
        dailyCompleteStageCount: number,
        sumKillEnemyCount: number,
        dailyKillEnemyCount: number,
        sumPerfectCompleteStageCount: number,
        dailyPerfectCompleteStageCount: number
    ) {
        this.net_saveCompleteStageCount(sumCompleteStageCount, dailyCompleteStageCount);
        this.net_saveKillEnemyCount(sumKillEnemyCount, dailyKillEnemyCount);
        this.net_savePerfectCompleteStageCount(sumPerfectCompleteStageCount, dailyPerfectCompleteStageCount);
    }

    public net_SaveTowerSumCount(
        light: SumCount,
        dark: SumCount,
        water: SumCount,
        fire: SumCount,
        wood: SumCount,
        earth: SumCount
    ) {
        this.net_saveLightTowerCount(light.sum, light.daily);
        this.net_saveDarkTowerCount(dark.sum, dark.daily);
        this.net_saveWaterTowerCount(water.sum, water.daily);
        this.net_saveFireTowerCount(fire.sum, fire.daily);
        this.net_saveWoodTowerCount(wood.sum, wood.daily);
        this.net_saveEarthTowerCount(earth.sum, earth.daily);
    }

    public net_SaveKillTypeCount(heal: SumCount, berserk: SumCount, fly: SumCount, stealth: SumCount) {
        this.net_saveKillHealCount(heal.sum, heal.daily);
        this.net_saveKillBerserkCount(berserk.sum, berserk.daily);
        this.net_saveKillFlyCount(fly.sum, fly.daily);
        this.net_saveKillStealthCount(stealth.sum, stealth.daily);
    }

    public net_saveCompleteStageCount(sum: number, daily: number) {
        const data = this.currentData;
        const player = this.currentPlayer;
        data.completeStageCount.sum = sum;
        data.completeStageCount.daily = daily;
        if (daily === 10) {
            // 完成日常任务 100055 今日游戏10次
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100055,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }

    public net_savePerfectCompleteStageCount(sum: number, daily: number) {
        const data = this.currentData;
        const player = this.currentPlayer;
        data.perfectCompleteStageCount.sum = sum;
        data.perfectCompleteStageCount.daily = daily;
        if (daily === 10) {
            // 完成日常任务 100056 今日完美通关10次
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100056,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }

    public net_saveKillEnemyCount(sum: number, daily: number) {
        const data = this.currentData;
        const player = this.currentPlayer;
        const preDaily = data.killEnemyCount.daily;
        data.killEnemyCount.sum = sum;
        data.killEnemyCount.daily = daily;
        if (daily >= 300 && preDaily < 300) {
            // 完成日常任务 100058 今日击败怪物300个
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100058,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }

    public net_saveSetting(bgmVoiceFactor: number, attackVoiceFactor: number) {
        this.currentData.bgmVoiceFactor = bgmVoiceFactor;
        this.currentData.attackVoiceFactor = attackVoiceFactor;
        this.currentData.save(false);
    }

    public net_saveLightTowerCount(sum: number, daily: number) {
        const data = this.currentData;
        const player = this.currentPlayer;
        data.lightTowerCount.sum = sum;
        data.lightTowerCount.daily = daily;
        if (daily === 200) {
            // 完成日常任务 100060 今日部署光元素塔200次
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100060,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }
    public net_saveDarkTowerCount(sum: number, daily: number) {
        const data = this.currentData;
        const player = this.currentPlayer;
        data.darkTowerCount.sum = sum;
        data.darkTowerCount.daily = daily;
        if (daily === 200) {
            // 完成日常任务 100061 今日部署暗元素塔200次
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100061,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }

    public net_saveWaterTowerCount(sum: number, daily: number) {
        // 100062 今日部署水元素塔200次
        const data = this.currentData;
        const player = this.currentPlayer;
        data.waterTowerCount.sum = sum;
        data.waterTowerCount.daily = daily;
        if (daily === 200) {
            // 完成日常任务 100062 今日部署水元素塔200次
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100062,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }

    public net_saveFireTowerCount(sum: number, daily: number) {
        const data = this.currentData;
        const player = this.currentPlayer;
        data.fireTowerCount.sum = sum;
        data.fireTowerCount.daily = daily;
        if (daily === 200) {
            // 完成日常任务 100063 今日部署火元素塔200次
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100063,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }

    public net_saveWoodTowerCount(sum: number, daily: number) {
        const data = this.currentData;
        const player = this.currentPlayer;
        data.woodTowerCount.sum = sum;
        data.woodTowerCount.daily = daily;
        if (daily === 200) {
            // 完成日常任务 100064 今日部署木元素塔200次
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100064,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }

    public net_saveEarthTowerCount(sum: number, daily: number) {
        const data = this.currentData;
        const player = this.currentPlayer;
        data.earthTowerCount.sum = sum;
        data.earthTowerCount.daily = daily;
        if (daily === 200) {
            // 完成日常任务 100065 今日部署土元素塔200次
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100065,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }

    public net_saveInfinityWaveTimes(times: number) {
        this.currentData.infinityWaveTimes = times;
        this.currentData.save(false);
    }

    public net_saveLevelThreeCount(sum: number, daily: number) {
        const data = this.currentData;
        const player = this.currentPlayer;
        const preDaily = data.levelThreeCount.daily;
        data.levelThreeCount.sum = sum;
        data.levelThreeCount.daily = daily;
        if (daily >= 100 && preDaily < 100) {
            // 完成日常任务 100066 今日强化3级塔100次
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100066,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }

    public net_saveKillHealCount(sum: number, daily: number) {
        const data = this.currentData;
        const player = this.currentPlayer;
        const preDaily = data.killHealEnemyCount.daily;
        data.killHealEnemyCount.sum = sum;
        data.killHealEnemyCount.daily = daily;
        if (daily >= 200 && preDaily < 200) {
            // 完成日常任务 100067 今日击败复原力怪物200只
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100067,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }

    public net_saveKillBerserkCount(sum: number, daily: number) {
        const data = this.currentData;
        const player = this.currentPlayer;
        const preDaily = data.killBerserkEnemyCount.daily;
        data.killBerserkEnemyCount.sum = sum;
        data.killBerserkEnemyCount.daily = daily;
        if (daily >= 200 && preDaily < 200) {
            // 完成日常任务 100068 今日击败狂暴怪物200只
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100068,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }

    public net_saveKillFlyCount(sum: number, daily: number) {
        const data = this.currentData;
        const player = this.currentPlayer;
        const preDaily = data.killFlyEnemyCount.daily;
        data.killFlyEnemyCount.sum = sum;
        data.killFlyEnemyCount.daily = daily;
        if (daily >= 200 && preDaily < 200) {
            // 完成日常任务 100070 今日击败飞行怪物200只
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100070,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }

    public net_saveKillStealthCount(sum: number, daily: number) {
        const data = this.currentData;
        const player = this.currentPlayer;
        const preDaily = data.killStealthEnemyCount.daily;
        data.killStealthEnemyCount.sum = sum;
        data.killStealthEnemyCount.daily = daily;
        if (daily >= 200 && preDaily < 200) {
            // 完成日常任务 100069 今日击败隐身怪物200只
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100069,
                questtype: 2, // 1主线 2日常
            });
        }
        this.currentData.save(false);
    }

    public net_saveInfinityGameTimes(sum: number, daily: number) {
        const data = this.currentData;
        const player = this.currentPlayer;
        data.infinityGameTimes.sum = sum;
        data.infinityGameTimes.daily = daily;
        if (daily === 3) {
            // 完成日常任务 100057 今日挑战无尽关卡3次
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100057,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }

    public net_saveInfinityBossCount(sum: number, daily: number) {
        const data = this.currentData;
        const player = this.currentPlayer;
        data.infinityBossCount.sum = sum;
        data.infinityBossCount.daily = daily;
        if (daily === 3) {
            // 完成日常任务 100059 今日击败无尽关卡首领3个
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100059,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }

    public net_saveTowerLevelUpCount(sum: number, daily: number) {
        this.currentData.towerLevelUpCount.sum = sum;
        this.currentData.towerLevelUpCount.daily = daily;
        this.currentData.save(false);
    }

    public net_saveLevelUpCount(sum: number, daily: number) {
        // 100071 今日角色完成一次升级
        const data = this.currentData;
        const player = this.currentPlayer;
        const preDaily = data.levelUpCount.daily;
        data.levelUpCount.sum = sum;
        data.levelUpCount.daily = daily;
        if (daily >= 1 && preDaily < 1) {
            // 完成日常任务 100071 今日角色完成一次升级
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100071,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }

    public net_saveUnlockTowerDaily(daily: number) {
        // [] 100073 今日解锁一个塔 25
        const data = this.currentData;
        const player = this.currentPlayer;
        const preDaily = data.unlockTowerDaily;
        data.unlockTowerDaily = daily;
        if (daily >= 1 && preDaily < 1) {
            // 完成日常任务 100073 今日解锁一个塔
            Utils.logP12Info("A_QuestFinish", {
                timestamp: Date.now(),
                userId: player?.userId ?? "",
                questid: 100073,
                questtype: 2, // 1主线 2日常
            });
        }
        data.save(false);
    }

    protected onPlayerLeft(player: mw.Player): void {
        // 改为在 StatisticModuleS 中处理
        // PlayerUtil.deletePlayerScript(player.playerId);
    }

    getScript(): Promise<PlayerScript> {
        return mw.Script.spawnScript(PlayerScript, true);
    }

    changeGold(player: Player, gold: number) {
        if (gold == null) return false;
        let data = this.getPlayerData(player);
        if (gold >= 0 || (gold < 0 && data.gold >= -gold)) {
            data.gold += gold;
            ModuleService.getModule(StatisticModuleS)?.recordConsume(ItemType.Gold, gold, player?.userId);
            data.save(true);
            // const rankModuleS = ModuleService.getModule(GlobalRankModuleS);
            // rankModuleS.setScoreOnServer("gold", data.gold, player.playerId);
            return true;
        }
        return false;
    }

    changeTechPoint(player: Player, techPoint: number) {
        let data = this.getPlayerData(player);
        if (techPoint >= 0 || (techPoint < 0 && data.techPoint >= -techPoint)) {
            data.techPoint += techPoint;
            ModuleService.getModule(StatisticModuleS)?.recordConsume(ItemType.TechPoint, techPoint, player?.userId);
            data.save(true);
            return true;
        }
        return false;
    }

    setPerfectWin(player: Player, id: number): boolean {
        let data = this.getPlayerData(player);
        if (data.firstPerfectClears.indexOf(id) == -1) {
            data.firstPerfectClears.push(id);
            data.save(true);
            return true;
        }
        return false;
    }

    setWin(player: Player, id: number): boolean {
        let data = this.getPlayerData(player);
        if (data.firstClears.indexOf(id) == -1) {
            data.firstClears.push(id);
            data.save(true);
            return true;
        }
        return false;
    }

    changeExp(player: Player, exp: number) {
        if (exp == null) return false;
        let data = this.getPlayerData(player);
        data.exp += exp;
        ModuleService.getModule(StatisticModuleS)?.recordConsume(ItemType.Exp, exp, player?.userId);
        data.save(true);
        let script = PlayerUtil.getPlayerScript(player.playerId);
        if (!script) return false;
        let level = this.calculateLevel(player);
        this.setLevel(player, level);
        return true;
    }

    setLevel(player: Player, level: number) {
        let script = PlayerUtil.getPlayerScript(player.playerId);
        if (level > script.level && script.level !== 0) {
            let data = this.getPlayerData(player);
            const newData = {
                sum: level,
                daily: 1,
            };
            data.levelUpCount = newData;
            data.save(true);
        }
        script.level = level;
        // const rankModuleS = ModuleService.getModule(GlobalRankModuleS);
        // rankModuleS.setScoreOnServer("level", level, player.playerId);
        PlayerActions.onPlayerLevelChangedServer.call(player, level);
    }

    calculateLevel(player: Player) {
        let data = this.getPlayerData(player);
        let levels = GameConfig.Level.getAllElement();
        for (let i = 0; i < levels.length; i++) {
            if (data.exp < levels[i].needPower) {
                return levels[i].id - 1;
            }
        }
        return levels[levels.length - 1].id;
    }

    /**
     * 判断当前的钱是否够花
     * @param gold 要花的金币
     * @returns 够不够
     */
    public checkGold(player: Player, gold: number) {
        let data = DataCenterS.getData(player, PlayerModuleData);
        if (data.gold >= gold) {
            return true;
        }
        return false;
    }

    /**
     * 判断当前的钱是否够花
     * @param gold 要花的金币
     * @returns 够不够
     */
    public checkTechPoint(player: Player, techPoint: number) {
        let data = DataCenterS.getData(player, PlayerModuleData);
        if (data.techPoint >= techPoint) {
            return true;
        }
        return false;
    }

    /**
     * 判断物品是否足够
     */
    public checkItem(player: Player, itemCfg: number[]) {
        let [id, amount] = itemCfg;
        let item = GameConfig.Item.getElement(id);
        if (item.itemType == ItemType.Gold) {
            return this.checkGold(player, amount);
        } else if (item.itemType == ItemType.TechPoint) {
            return this.checkTechPoint(player, amount);
        }
        return false;
    }

    public net_checkEnouthItems(player: Player, items: number[][]) {
        return false;
        // let flag = true;
        // for (let i = 0; i < items.length; i++) {
        //     if (!this.checkItem(player, items[i])) {
        //         console.log("物品不足", items[i]);
        //         flag = false;
        //         break;
        //     }
        // }
        // if (flag) {
        //     for (let i = 0; i < items.length; i++) {
        //         let [id, amount] = items[i];
        //         let item = GameConfig.Item.getElement(id);
        //         if (item.itemType == ItemType.Gold) {
        //             this.changeGold(player, -amount);
        //         }
        //         else if (item.itemType == ItemType.TechPoint) {
        //             this.changeTechPoint(player, -amount);
        //         }
        //     }
        // }
        // return flag;
    }

    public checkTalentCost(player: Player, items: number[][]) {
        let flag = true;
        for (let i = 0; i < items.length; i++) {
            if (!this.checkItem(player, items[i])) {
                console.log("物品不足", items[i]);
                flag = false;
                break;
            }
        }
        if (flag) {
            for (let i = 0; i < items.length; i++) {
                let [id, amount] = items[i];
                let item = GameConfig.Item.getElement(id);
                if (item.itemType == ItemType.Gold) {
                    this.changeGold(player, -amount);
                } else if (item.itemType == ItemType.TechPoint) {
                    this.changeTechPoint(player, -amount);
                }
            }
        }
        return flag;
    }

    /**
     * 解锁科技树节点
     */

    public net_unlockTechNode(player: Player, id: number) {
        let data = this.getPlayerData(player);
        if (data.unlockedTechNodes.indexOf(id) == -1) {
            data.unlockedTechNodes.push(id);
            data.save(true);
            return true;
        }
        return false;
    }

    public net_getUnlockedTechNodes(players: number[]): { [key: number]: number[] } {
        let nodeMap = {};
        for (let i = 0; i < players.length; i++) {
            let data = this.getPlayerData(players[i]);
            if (data) {
                nodeMap[players[i]] = data.unlockedTechNodes;
            }
        }
        return nodeMap;
    }

    public net_setFirstMonsterTag(tagId: number) {
        let data = this.getPlayerData(this.currentPlayer);
        if (data.firstMonsterTags.indexOf(tagId) == -1) {
            data.firstMonsterTags.push(tagId);
            data.save(true);
            return true;
        }
        return false;
    }

    public setStageState(state: StageState) {
        if (state.playerId === null) {
            this.stageStages[state.groupIndex] = null;
        } else {
            this.stageStages[state.groupIndex] = state;
        }
    }

    public async net_getStageStateById(groupIndex: number): Promise<StageState | null> {
        return this.stageStages[groupIndex];
    }

    public setUserRoomInfo(userId: string, roomInfo: null | RoomInfo) {
        this.userRoomInfo.set(userId, roomInfo);
    }

    public getUserRoomInfo(userId: string) {
       return  this.userRoomInfo.get(userId);
    }
}
