/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-14 15:24:15
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-21 17:50:46
 * @FilePath     : \nevergiveup\JavaScripts\Modules\PlayerModule\PlayerModuleC.ts
 * @Description  : 修改描述
 */

import { PlayerActions } from "../../Actions";
import LobbyUI from "../../UI/LobbyUI";
import SettingUI from "../../UI/SettingUI";
import { TipsManager } from "../../UI/Tips/CommonTipsManagerUI";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEventName } from "../../const/enum";
import { ElementEnum } from "../../enemy/EnemyBase";
import { ItemType } from "../../tool/Enum";
import { FirstEvent, MGSTool } from "../../tool/MGSTool";
import { EffectEvent, VoiceEvent } from "../../tool/SoundUtil";
import { TimerModuleUtils } from "../TimeModule/time";
import PlayerModuleData from "./PlayerModuleData";
import { PlayerModuleS } from "./PlayerModuleS";

export default class PlayerModuleC extends ModuleC<PlayerModuleS, PlayerModuleData> {
    private _enemyCount: number = 0;
    private _waveCount: number = 0;
    private _towerLevelThreeCount: number = 0;
    private _enemyHealCount: number = 0;
    private _enemyBerserkCount: number = 0;
    private _enemyFlyCount: number = 0;
    private _enemyStealthCount: number = 0;
    private _enemyInfinityBossCount: number = 0;
    private _towerLevelUpCount: number = 0;
    protected onEnterScene(sceneType: number): void {
        this.data.onDataChange.add(() => {
            PlayerActions.onPlayerDataChanged.call();
        });
        UIService.show(LobbyUI);
        this.updateCurrency();
        TimerModuleUtils.addOnlineDayListener(() => this.clearDailyCount(false), this);
        TimerModuleUtils.addLoginDayListener(() => this.clearDailyCount(true), this);
        UIService.getUI(SettingUI)[
            "attackSelect" + (this.data.attackVoiceFactor > 0 ? "False" : "True")
        ].onClicked.broadcast();
        UIService.getUI(SettingUI)[
            "bgmSelect" + (this.data.bgmVoiceFactor > 0 ? "False" : "True")
        ].onClicked.broadcast();
        UIService.getUI(SettingUI)[
            "effectSelect" + (this.data.attackEffect > 0 ? "False" : "True")
        ].onClicked.broadcast();
        UIService.getUI(SettingUI)[
            "numberSelect" + (this.data.attackDamage > 0 ? "False" : "True")
        ].onClicked.broadcast();

        Event.addLocalListener(VoiceEvent.Bgm, (value: number) => {
            this.data.bgmVoiceFactor = value;
            this.server.net_saveSetting(this.data.bgmVoiceFactor, this.data.attackVoiceFactor);
        });

        Event.addLocalListener(VoiceEvent.Attack, (value: number) => {
            this.data.attackVoiceFactor = value;
            this.server.net_saveSetting(this.data.bgmVoiceFactor, this.data.attackVoiceFactor);
        });

        Event.addLocalListener(EffectEvent.AttackEffect, (value: number) => {
            this.data.attackEffect = value;
            this.server.net_saveEffectSetting(this.data.attackEffect, this.data.attackDamage);
        });

        Event.addLocalListener(EffectEvent.AttackDamage, (value: number) => {
            this.data.attackDamage = value;
            this.server.net_saveEffectSetting(this.data.attackEffect, this.data.attackDamage);
        });

        Event.addServerListener(GlobalEventName.ServerTipsEventName, (str: string) => {
            TipsManager.showTips(str);
        });
    }

    private clearDailyCount(isSave: boolean) {
        this.data.completeStageCount.daily = 0;
        this.data.perfectCompleteStageCount.daily = 0;
        this.data.killEnemyCount.daily = 0;
        this.data.killHealEnemyCount.daily = 0;
        this.data.killBerserkEnemyCount.daily = 0;
        this.data.killFlyEnemyCount.daily = 0;
        this.data.killStealthEnemyCount.daily = 0;
        this.data.lightTowerCount.daily = 0;
        this.data.darkTowerCount.daily = 0;
        this.data.waterTowerCount.daily = 0;
        this.data.fireTowerCount.daily = 0;
        this.data.woodTowerCount.daily = 0;
        this.data.earthTowerCount.daily = 0;
        this.data.levelThreeCount.daily = 0;
        this.data.infinityGameTimes.daily = 0;
        this.data.infinityBossCount.daily = 0;
        this.data.towerLevelUpCount.daily = 0;
        this.data.levelUpCount.daily = 0;
        this.data.unlockTowerDaily = 0;
        if (isSave) {
            this.server.net_SaveSumCount(
                this.data.completeStageCount.sum,
                this.data.completeStageCount.daily,
                this.data.killEnemyCount.sum,
                this.data.killEnemyCount.daily,
                this.data.perfectCompleteStageCount.sum,
                this.data.perfectCompleteStageCount.daily
            );
            this.server.net_SaveTowerSumCount(
                this.data.lightTowerCount,
                this.data.darkTowerCount,
                this.data.waterTowerCount,
                this.data.fireTowerCount,
                this.data.woodTowerCount,
                this.data.earthTowerCount
            );
            this.server.net_SaveKillTypeCount(
                this.data.killHealEnemyCount,
                this.data.killBerserkEnemyCount,
                this.data.killFlyEnemyCount,
                this.data.killStealthEnemyCount
            );
            this.server.net_saveLevelThreeCount(this.data.levelThreeCount.sum, this.data.levelThreeCount.daily);
            this.server.net_saveInfinityGameTimes(this.data.infinityGameTimes.sum, this.data.infinityGameTimes.daily);
            this.server.net_saveInfinityBossCount(this.data.infinityBossCount.sum, this.data.infinityBossCount.daily);
            this.server.net_saveTowerLevelUpCount(this.data.towerLevelUpCount.sum, this.data.towerLevelUpCount.daily);
            this.server.net_saveLevelUpCount(this.data.levelUpCount.sum, this.data.levelUpCount.daily);
            this.server.net_saveUnlockTowerDaily(this.data.unlockTowerDaily);
        }
    }

    public onEnemyKilled() {
        this._enemyCount++;
        MGSTool.doFirstEvent(FirstEvent.CoreStep3);
    }

    public onInfinityWaveRefresh() {
        this._waveCount++;
    }

    public onLevelUp(targetLevel: number) {
        if (targetLevel === 2) {
            this._towerLevelThreeCount++;
        }
        this._towerLevelUpCount++;
    }

    public onEnemyTypeKilled(type: number[], isInfinity?: boolean) {
        if (type.includes(1)) {
            this._enemyStealthCount++;
        }
        if (type.includes(2)) {
            this._enemyFlyCount++;
        }
        if (type.includes(11)) {
            this._enemyHealCount++;
        }
        if (type.includes(12)) {
            this._enemyBerserkCount++;
        }
        if (type.includes(5)) {
            // boss
            if (isInfinity) {
                this._enemyInfinityBossCount++;
            }
        }
    }

    public onStageCompleted(isPerfect: boolean, index?: number) {
        this.data.completeStageCount.sum = this.data.completeStageCount.sum + 1;
        this.data.completeStageCount.daily = this.data.completeStageCount.daily + 1;
        if (isPerfect) {
            this.data.perfectCompleteStageCount.sum = this.data.perfectCompleteStageCount.sum + 1;
            this.data.perfectCompleteStageCount.daily = this.data.perfectCompleteStageCount.daily + 1;
        }
        this.data.killEnemyCount.sum = this.data.killEnemyCount.sum + this._enemyCount;
        this.data.killEnemyCount.daily = this.data.killEnemyCount.daily + this._enemyCount;
        this.server.net_SaveSumCount(
            this.data.completeStageCount.sum,
            this.data.completeStageCount.daily,
            this.data.killEnemyCount.sum,
            this.data.killEnemyCount.daily,
            this.data.perfectCompleteStageCount.sum,
            this.data.perfectCompleteStageCount.daily
        );
        this._enemyCount = 0;

        const infinityWaveTimesMax = Math.max(this._waveCount, this.data.infinityWaveTimes)
        this.data.infinityWaveTimes = infinityWaveTimesMax;
        this.server.net_saveInfinityWaveTimes(infinityWaveTimesMax);
        this._waveCount = 0;

        this.data.levelThreeCount.sum = this.data.levelThreeCount.sum + this._towerLevelThreeCount;
        this.data.levelThreeCount.daily = this.data.levelThreeCount.daily + this._towerLevelThreeCount;
        this.server.net_saveLevelThreeCount(this.data.levelThreeCount.sum, this.data.levelThreeCount.daily);
        this._towerLevelThreeCount = 0;

        this.data.killHealEnemyCount.sum = this.data.killHealEnemyCount.sum + this._enemyHealCount;
        this.data.killHealEnemyCount.daily = this.data.killHealEnemyCount.daily + this._enemyHealCount;
        this.server.net_saveKillHealCount(this.data.killHealEnemyCount.sum, this.data.killHealEnemyCount.daily);
        this._enemyHealCount = 0;

        this.data.killBerserkEnemyCount.sum = this.data.killBerserkEnemyCount.sum + this._enemyBerserkCount;
        this.data.killBerserkEnemyCount.daily = this.data.killBerserkEnemyCount.daily + this._enemyBerserkCount;
        this.server.net_saveKillBerserkCount(
            this.data.killBerserkEnemyCount.sum,
            this.data.killBerserkEnemyCount.daily
        );
        this._enemyBerserkCount = 0;

        this.data.killFlyEnemyCount.sum = this.data.killFlyEnemyCount.sum + this._enemyFlyCount;
        this.data.killFlyEnemyCount.daily = this.data.killFlyEnemyCount.daily + this._enemyFlyCount;
        this.server.net_saveKillFlyCount(this.data.killFlyEnemyCount.sum, this.data.killFlyEnemyCount.daily);
        this._enemyFlyCount = 0;

        this.data.killStealthEnemyCount.sum = this.data.killStealthEnemyCount.sum + this._enemyStealthCount;
        this.data.killStealthEnemyCount.daily = this.data.killStealthEnemyCount.daily + this._enemyStealthCount;
        this.server.net_saveKillStealthCount(
            this.data.killStealthEnemyCount.sum,
            this.data.killStealthEnemyCount.daily
        );
        this._enemyStealthCount = 0;

        if (index === 5) {
            this.data.infinityGameTimes.sum = this.data.infinityGameTimes.sum + 1;
            this.data.infinityGameTimes.daily = this.data.infinityGameTimes.daily + 1;
            this.server.net_saveInfinityGameTimes(this.data.infinityGameTimes.sum, this.data.infinityGameTimes.daily);
        }

        this.data.infinityBossCount.sum = this.data.infinityBossCount.sum + this._enemyInfinityBossCount;
        this.data.infinityBossCount.daily = this.data.infinityBossCount.daily + this._enemyInfinityBossCount;
        this.server.net_saveInfinityBossCount(this.data.infinityBossCount.sum, this.data.infinityBossCount.daily);
        this._enemyInfinityBossCount = 0;

        this.data.towerLevelUpCount.sum = this.data.towerLevelUpCount.sum + this._towerLevelUpCount;
        this.data.towerLevelUpCount.daily = this.data.towerLevelUpCount.daily + this._towerLevelUpCount;
        this.server.net_saveTowerLevelUpCount(this.data.towerLevelUpCount.sum, this.data.towerLevelUpCount.daily);
        this._towerLevelUpCount = 0;
    }

    // 更新部署塔的数据
    public onTowerBuild(type: ElementEnum) {
        if (type === ElementEnum.LIGHT) {
            this.data.lightTowerCount.sum = this.data.lightTowerCount.sum + 1;
            this.data.lightTowerCount.daily = this.data.lightTowerCount.daily + 1;
        } else if (type === ElementEnum.DARK) {
            this.data.darkTowerCount.sum = this.data.darkTowerCount.sum + 1;
            this.data.darkTowerCount.daily = this.data.darkTowerCount.daily + 1;
        } else if (type === ElementEnum.WATER) {
            this.data.waterTowerCount.sum = this.data.waterTowerCount.sum + 1;
            this.data.waterTowerCount.daily = this.data.waterTowerCount.daily + 1;
        } else if (type === ElementEnum.FIRE) {
            this.data.fireTowerCount.sum = this.data.fireTowerCount.sum + 1;
            this.data.fireTowerCount.daily = this.data.fireTowerCount.daily + 1;
        } else if (type === ElementEnum.WOOD) {
            this.data.woodTowerCount.sum = this.data.woodTowerCount.sum + 1;
            this.data.woodTowerCount.daily = this.data.woodTowerCount.daily + 1;
        } else if (type === ElementEnum.EARTH) {
            this.data.earthTowerCount.sum = this.data.earthTowerCount.sum + 1;
            this.data.earthTowerCount.daily = this.data.earthTowerCount.daily + 1;
        }
        this.server.net_SaveTowerSumCount(
            this.data.lightTowerCount,
            this.data.darkTowerCount,
            this.data.waterTowerCount,
            this.data.fireTowerCount,
            this.data.woodTowerCount,
            this.data.earthTowerCount
        );
    }

    // 解锁卡牌
    public onCardUnlock() {
        this.data.unlockTowerDaily = this.data.unlockTowerDaily + 1;
        this.server.net_saveUnlockTowerDaily(this.data.unlockTowerDaily);
    }

    /**
     * 是否第一次做某事
     * @param action 名字
     * @returns 是否有做过
     */
    public hasFirstAction(action: string): boolean {
        return this.data.firstAction.indexOf(action) != -1;
    }

    /**
     * 设置第一次做某事
     * @param action
     */
    public setFirstAction(action: string) {
        // if (!await this.hasFirstAction(action))
        this.data.firstAction.push(action);
        this.server.net_setFirstAction(action);
    }

    public get gold(): number {
        return this.data.gold;
    }

    public get unlockTechNodes() {
        return this.data.unlockedTechNodes;
    }

    public async getUnlockTechNodeMap(playerIds: number[]) {
        return await this.server.net_getUnlockedTechNodes(playerIds);
    }

    public getUnlockTechNodes(nodeMap: { [key: number]: number[] }) {
        // map it to id : count
        let map = {};
        for (let key of Object.keys(nodeMap)) {
            let nodes = nodeMap[key];
            for (let i = 0; i < nodes.length; i++) {
                if (map[nodes[i]]) {
                    map[nodes[i]]++;
                } else {
                    map[nodes[i]] = 1;
                }
            }
        }
        return map;
    }

    updateCurrency() {
        PlayerActions.onPlayerDataChanged.call();
    }

    /**
     * 判断当前的钱是否够花
     * @param gold 要花的金币
     * @returns 够不够
     */
    public checkGold(gold: number) {
        if (this.data.gold >= gold) {
            return true;
        }
        return false;
    }

    /**
     * 判断当前的钱是否够花
     * @param gold 要花的金币
     * @returns 够不够
     */
    public checkTechPoint(techPoint: number) {
        if (this.data.techPoint >= techPoint) {
            return true;
        }
        return false;
    }

    /**
     * 判断物品是否足够
     */
    public checkItem(itemCfg: number[]) {
        let [id, amount] = itemCfg;
        let item = GameConfig.Item.getElement(id);
        if (item.itemType == ItemType.Gold) {
            return this.checkGold(amount);
        } else if (item.itemType == ItemType.TechPoint) {
            return this.checkTechPoint(amount);
        }
        return false;
    }

    public hasFirstMonsterTag(tagId: number) {
        return this.data.firstMonsterTags.indexOf(tagId) != -1;
    }

    /**
     * 设置第一次做某事
     * @param action
     */
    public setFirstMonsterTag(tagId: number) {
        // if (!await this.hasFirstAction(action))
        this.data.firstMonsterTags.push(tagId);
        this.server.net_setFirstMonsterTag(tagId);
    }

    public async getStageStateById(groupIndex: number) {
        const res = await this.server.net_getStageStateById(groupIndex);
        return res;
    }
}
