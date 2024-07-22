import { JModuleS } from "../../depend/jibu-module/JModule";
import TalentModuleC from "./TalentModuleC";
import TalentModuleData from "./TalentModuleData";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import Player = mw.Player;
import { GameConfig } from "../../config/GameConfig";

export default class TalentModuleS extends JModuleS<TalentModuleC, TalentModuleData> {
    private _playS: PlayerModuleS;

    private get playS(): PlayerModuleS | null {
        if (!this._playS) this._playS = ModuleService.getModule(PlayerModuleS);
        return this._playS;
    }

    private setTalent(id: number, level: number) {
    }

    public getPlayerTalentIndex(userId: string, id: number) {
        const data = this.getPlayerData(userId);
        return data.getTalentIndex(id);
    }

    public async net_updateTalentLevel(player: Player, id: number) {
        const talent = GameConfig.TalentTree.getElement(id);
        const level = this.getPlayerTalentIndex(player.userId, id);
        const goldCost = [talent.cost[0][0], talent.cost[0][level + 1]];
        const techCost = [talent.cost[1][0], talent.cost[1][level + 1]];
        const result = this.playS.checkTalentCost(player, [goldCost, techCost]);
        if (!result) return;
        // 设置
    }
}
