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
    stageStages: Map<number, StageState | null> = new Map();

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
            data.unlockTowerDaily = 0;
            data.save(false);
        }
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
        this.currentData.completeStageCount.sum = sum;
        this.currentData.completeStageCount.daily = daily;
        this.currentData.save(false);
    }

    public net_savePerfectCompleteStageCount(sum: number, daily: number) {
        this.currentData.perfectCompleteStageCount.sum = sum;
        this.currentData.perfectCompleteStageCount.daily = daily;
        this.currentData.save(false);
    }

    public net_saveKillEnemyCount(sum: number, daily: number) {
        this.currentData.killEnemyCount.sum = sum;
        this.currentData.killEnemyCount.daily = daily;
        this.currentData.save(false);
    }

    public net_saveSetting(bgmVoiceFactor: number, attackVoiceFactor: number) {
        this.currentData.bgmVoiceFactor = bgmVoiceFactor;
        this.currentData.attackVoiceFactor = attackVoiceFactor;
        this.currentData.save(false);
    }

    public net_saveLightTowerCount(sum: number, daily: number) {
        this.currentData.lightTowerCount.sum = sum;
        this.currentData.lightTowerCount.daily = daily;
        this.currentData.save(false);
    }

    public net_saveDarkTowerCount(sum: number, daily: number) {
        this.currentData.darkTowerCount.sum = sum;
        this.currentData.darkTowerCount.daily = daily;
        this.currentData.save(false);
    }

    public net_saveWaterTowerCount(sum: number, daily: number) {
        this.currentData.waterTowerCount.sum = sum;
        this.currentData.waterTowerCount.daily = daily;
        this.currentData.save(false);
    }

    public net_saveFireTowerCount(sum: number, daily: number) {
        this.currentData.fireTowerCount.sum = sum;
        this.currentData.fireTowerCount.daily = daily;
        this.currentData.save(false);
    }

    public net_saveWoodTowerCount(sum: number, daily: number) {
        this.currentData.woodTowerCount.sum = sum;
        this.currentData.woodTowerCount.daily = daily;
        this.currentData.save(false);
    }

    public net_saveEarthTowerCount(sum: number, daily: number) {
        this.currentData.earthTowerCount.sum = sum;
        this.currentData.earthTowerCount.daily = daily;
        this.currentData.save(false);
    }

    public net_saveInfinityWaveTimes(times: number) {
        this.currentData.infinityWaveTimes = times;
        this.currentData.save(false);
    }

    public net_saveLevelThreeCount(sum: number, daily: number) {
        this.currentData.levelThreeCount.sum = sum;
        this.currentData.levelThreeCount.daily = daily;
        this.currentData.save(false);
    }

    public net_saveKillHealCount(sum: number, daily: number) {
        this.currentData.killHealEnemyCount.sum = sum;
        this.currentData.killHealEnemyCount.daily = daily;
        this.currentData.save(false);
    }

    public net_saveKillBerserkCount(sum: number, daily: number) {
        this.currentData.killBerserkEnemyCount.sum = sum;
        this.currentData.killBerserkEnemyCount.daily = daily;
        this.currentData.save(false);
    }

    public net_saveKillFlyCount(sum: number, daily: number) {
        this.currentData.killFlyEnemyCount.sum = sum;
        this.currentData.killFlyEnemyCount.daily = daily;
        this.currentData.save(false);
    }

    public net_saveKillStealthCount(sum: number, daily: number) {
        this.currentData.killStealthEnemyCount.sum = sum;
        this.currentData.killStealthEnemyCount.daily = daily;
        this.currentData.save(false);
    }

    public net_saveInfinityGameTimes(sum: number, daily: number) {
        this.currentData.infinityGameTimes.sum = sum;
        this.currentData.infinityGameTimes.daily = daily;
        this.currentData.save(false);
    }

    public net_saveInfinityBossCount(sum: number, daily: number) {
        this.currentData.infinityBossCount.sum = sum;
        this.currentData.infinityBossCount.daily = daily;
        this.currentData.save(false);
    }

    public net_saveTowerLevelUpCount(sum: number, daily: number) {
        this.currentData.towerLevelUpCount.sum = sum;
        this.currentData.towerLevelUpCount.daily = daily;
        this.currentData.save(false);
    }

    public net_saveUnlockTowerDaily(daily: number) {
        this.currentData.unlockTowerDaily = daily;
        this.currentData.save(false);
    }

    protected onPlayerLeft(player: mw.Player): void {
        PlayerUtil.deletePlayerScript(player.playerId);
    }

    getScript(): Promise<PlayerScript> {
        return mw.Script.spawnScript(PlayerScript, true);
    }

    changeGold(player: Player, gold: number) {
        if (gold == null) return false;
        let data = this.getPlayerData(player);
        if (gold >= 0 || (gold < 0 && data.gold >= -gold)) {
            data.gold += gold;
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
        data.save(true);
        let script = PlayerUtil.getPlayerScript(player.playerId);
        if (!script) return false;
        let level = this.calculateLevel(player);
        this.setLevel(player, level);
        return true;
    }

    setLevel(player: Player, level: number) {
        let script = PlayerUtil.getPlayerScript(player.playerId);
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
            this.stageStages.set(state.groupIndex, null);
        } else {
            this.stageStages.set(state.groupIndex, state);
        }
    }

    public net_getStageStateById(groupIndex: number) {
        console.log("net_getStageStateById", groupIndex, this.stageStages, this.stageStages.get(groupIndex));
        return this.stageStages.get(groupIndex);
    }
}
