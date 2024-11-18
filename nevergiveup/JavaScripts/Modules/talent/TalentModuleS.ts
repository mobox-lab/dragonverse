import { GameConfig } from "../../config/GameConfig";
import { ITalentTreeElement } from "../../config/TalentTree";
import { ETalentType } from "../../const/enum";
import { JModuleS } from "../../depend/jibu-module/JModule";
import Utils from "../../Utils";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { PlayerUtil } from "../PlayerModule/PlayerUtil";
import { TimerModuleUtils } from "../TimeModule/time";
import TalentModuleC from "./TalentModuleC";
import TalentModuleData from "./TalentModuleData";
import Player = mw.Player;
import { StatisticModuleS } from "../statistic/StatisticModule";
import TalentUtils from "./TalentUtils";

export default class TalentModuleS extends JModuleS<TalentModuleC, TalentModuleData> {
    private _playS: PlayerModuleS;

    private get playS(): PlayerModuleS | null {
        if (!this._playS) this._playS = ModuleService.getModule(PlayerModuleS);
        return this._playS;
    }

    protected onJStart() {
        super.onJStart();
        TimerModuleUtils.addOnlineDayListener(this.clearDailyCount, this);
    }

    public clearDailyCountByPlayer(player: Player) {
        const data = this.getPlayerData(player);
        if (data) {
            data.dailyCount = 0;
            data.save(true);
        }
    }

    private clearDailyCount() {
        const players = Player.getAllPlayers();
        players.forEach(player => {
            const data = this.getPlayerData(player);
            if (data) {
                data.dailyCount = 0;
                data.save(false);
            }
        });
    }

    public net_clearDailyCount() {
        const data = this.currentData;
        if(!data) return false;
        data.dailyCount = 0;
    }

    public async setTalent(player: Player, id: number, level: number) {
        const playerData = this.getPlayerData(player.userId);
        playerData.dailyCount++;
        playerData.setTalentIndex(id, level);
        playerData.save(true);
        await this.getClient(player).net_setItem(id, level);
        return true;
    }

    public getPlayerTalentIndex(userId: string, id: number) {
        const data = this.getPlayerData(userId);
        return data.getTalentIndex(id);
    }

    /**
     * 检测前置天赋是否解锁
     * @param {string} userId
     * @param {ITalentTreeElement} talent
     * @returns {boolean}
     * @private
     */
    private checkTalentCanActive(userId: string, talent: ITalentTreeElement): boolean {
        if (!talent.frontTalent?.length) return true;
        const frontLevels = talent.frontTalent.map(frontId => this.getPlayerTalentIndex(userId, frontId));
        return frontLevels.every(n => n > 0);
    }

    private checkUnlockLevel(player: Player, unLockLevel: number) {
        const playerScript = PlayerUtil.getPlayerScript(player.playerId);
        if (!playerScript) return false;
        return playerScript.level >= unLockLevel;
    }

    public updatePlayerTalent(player: Player, id: number) {
        this.getClient(player).net_updateTalentLevel(id);
    }

    public async net_updateTalentLevel(id: number) {
        const player = this.currentPlayer;
        const talent = GameConfig.TalentTree.getElement(id);
        // TODO: 判断当前玩家等级是否能解锁
        const isEnoughLevel = this.checkUnlockLevel(player, talent.unlockLevel);
        if (!isEnoughLevel) return false;
        // 前置天赋解锁
        const canActive = this.checkTalentCanActive(player.userId, talent);
        if (!canActive) return false;
        // 当前等级可升级
        const level = this.getPlayerTalentIndex(player.userId, id);
        if (level >= talent.maxLevel) return false;
        // 巅峰天赋解锁金额固定
        const nextLv = level + 1;
        const goldCost = [talent.cost[0][0], talent.type === ETalentType.Base ? talent.cost[0][nextLv] : TalentUtils.calcExp4Lv(nextLv, talent.cost[0][1], talent.lvTimes)];
        const techCost = [talent.cost[1][0], talent.type === ETalentType.Base ? talent.cost[1][nextLv] : TalentUtils.calcExp4Lv(nextLv, talent.cost[1][1], talent.lvTimes)];
        const result = this.playS.checkTalentCost(player, [goldCost, techCost]);
        if (!result) return false;
        try {
            const userlevel = PlayerUtil.getPlayerScript(player.playerId)?.level ?? 0;
            ModuleService.getModule(StatisticModuleS)?.recordTalentUnlock(id, nextLv, goldCost[1], techCost[1], player?.userId ?? "");
            Utils.logP12Info('A_TalentUnlock', {
                timestamp: Date.now(),
                userId: player?.userId,
                userlevel,
                unlocktalent: id,
                stack: nextLv,
                cost: [goldCost[1], techCost[1]]
            });
        } catch (error) {
            Utils.logP12Info('A_Error', ' TalentUnlock error:' + error + ' userId:' + player?.userId);
        }
        await this.setTalent(player, id, nextLv);
        return true;
    }
}
