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
        const goldCost = [talent.cost[0][0], talent.type === ETalentType.Base ? talent.cost[0][level + 1] : talent.cost[0][1]];
        const techCost = [talent.cost[1][0], talent.type === ETalentType.Base ? talent.cost[1][level + 1] : talent.cost[1][1]];
        const result = this.playS.checkTalentCost(player, [goldCost, techCost]);
        if (!result) return false;
        try {
            const userlevel = PlayerUtil.getPlayerScript(player.playerId)?.level ?? 0;
            Utils.logP12Info('A_TalentUnlock', {
                timestamp: Date.now(),
                userId: player?.userId,
                userlevel,
                unlocktalent: id,
                stack: level + 1,
                cost: [goldCost[1], techCost[1]]
            });
        } catch (error) {
            Utils.logP12Info('A_Error', ' TalentUnlock error:' + error + ' userId:' + player?.userId);
        }
        await this.setTalent(player, id, level + 1);
        return true;
    }

    public net_clearDailyCount() {
        this.currentData.dailyCount = 0;
        this.currentData.save(false);
    }
}
