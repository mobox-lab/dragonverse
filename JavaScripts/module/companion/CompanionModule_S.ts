import { CompanionData, CompanionDataHelper } from "./CompanionData";
import { CompanionModule_C } from "./CompanionModule_C";

export class CompanionModule_S extends ModuleS<CompanionModule_C, CompanionData>{






    /**
     * 给玩家添加一个伙伴
     * @param playerId 
     * @param companionId 
     * @returns 
     */
    addCompanionForPlayer(playerId: number, companionId: number): void {

        let player = this.getClient(playerId);

        if (!player) return;

        let companion = CompanionDataHelper.createSingleCompanionInfo(Date.now(), companionId);
        let data = this.getPlayerData(playerId);
        data.addCompanion(companion);
    }




}