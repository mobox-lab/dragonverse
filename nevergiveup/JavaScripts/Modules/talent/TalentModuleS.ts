import { JModuleS } from "../../depend/jibu-module/JModule";
import TalentModuleC from "./TalentModuleC";
import TalentModuleData from "./TalentModuleData";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import Player = mw.Player;
import { GameConfig } from "../../config/GameConfig";
import { ITalentTreeElement } from "../../config/TalentTree";

export default class TalentModuleS extends JModuleS<TalentModuleC, TalentModuleData> {
    private _playS: PlayerModuleS;

    private get playS(): PlayerModuleS | null {
        if (!this._playS) this._playS = ModuleService.getModule(PlayerModuleS);
        return this._playS;
    }

    private async setTalent(player: Player, id: number, level: number) {
        const playerData = this.getPlayerData(player.userId);
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

    public async net_updateTalentLevel(id: number) {
        const player = this.currentPlayer;
        const talent = GameConfig.TalentTree.getElement(id);
        const canActive = this.checkTalentCanActive(player.userId, talent);
        if (!canActive) return false;
        const level = this.getPlayerTalentIndex(player.userId, id);
        const goldCost = [talent.cost[0][0], talent.cost[0][level + 1]];
        const techCost = [talent.cost[1][0], talent.cost[1][level + 1]];
        const result = this.playS.checkTalentCost(player, [goldCost, techCost]);
        if (!result) return false;
        await this.setTalent(player, id, level + 1);
        return true;
    }
}
