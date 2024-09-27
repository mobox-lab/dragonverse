import { GameConfig } from "../../config/GameConfig";
import { JModuleS } from "../../depend/jibu-module/JModule";
import { AuthModuleS, UserDragonRespData } from "../auth/AuthModule";
import { DragonDataModuleC } from "./DragonDataModuleC";
import DragonDataModuleData from "./DragonDataModuleData";

export class DragonDataModuleS extends JModuleS<DragonDataModuleC, DragonDataModuleData> {
    public dragonDataMap: Map<string, UserDragonRespData> = new Map();

    protected onJStart() {}
    public async net_queryUserDragon() {
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
        console.log("dragonDataMap:", JSON.stringify(this.dragonDataMap));
    }

    public getDragonData(player: Player) {
        console.log("getDragonData:", this.dragonDataMap.get(player.playerId.toString()));
        return this.dragonDataMap.get(player.playerId.toString());
    }
    public getDragonBlessData(player: Player) {
        const dragonData = this.dragonDataMap.get(player.playerId.toString());
        const list = dragonData?.DragonPalList;
        if (!list?.length) return ["0%", "0%", "0%", "0%", "0%", "0%"];
        const allDragons = GameConfig.Dragon.getAllElement();
        const blessList = [0, 0, 0, 0, 0, 0]; // light dark water fire wood earth
        for (let i = 0; i < list.length; i++) {
            const dragonPalId = list[i].dragonPalId;
            const dragonCfg = allDragons.find((cfg) => cfg.dragonPalId == dragonPalId);
            if (list[i].amount > 0) blessList[dragonCfg.tdElemetType - 1]++;
        }
        // TODO: 测试龙娘祝福
        return blessList.map((cnt) => {
            if (!cnt) return "0%";
            if (cnt < 3) return "3%";
            if (cnt <= 7) return "6%";
            return "10%";
        });
    }
}
