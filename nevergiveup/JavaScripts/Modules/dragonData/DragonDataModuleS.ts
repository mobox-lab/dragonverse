import { JModuleS } from "../../depend/jibu-module/JModule";
import { AuthModuleS, UserDragonRespData } from "../auth/AuthModule";
import { DragonDataModuleC } from "./DragonDataModuleC";
import DragonDataModuleData from "./DragonDataModuleData";

export class DragonDataModuleS extends JModuleS<DragonDataModuleC, DragonDataModuleData> {
    public dragonDataMap: Map<string, UserDragonRespData> = new Map();

    public async queryLocalUserDragon() {
        const playerId = this.currentPlayerId;
        const res = await ModuleService.getModule(AuthModuleS).queryUserDragon(playerId);
        return res;
    }

    public async initData(players: Player[]) {
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            const playerId = player.playerId;
            const res = await ModuleService.getModule(AuthModuleS).queryUserDragon(playerId);
            this.dragonDataMap.set(playerId.toString(), res);
        }
    }

    public getDragonData(player: Player) {
        return this.dragonDataMap.get(player.playerId.toString());
    }
}
