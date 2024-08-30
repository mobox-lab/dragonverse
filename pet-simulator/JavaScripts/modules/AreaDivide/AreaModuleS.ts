import Log4Ts from "mw-log4ts";
import { GameConfig } from "../../config/GameConfig";
import { stringToNumberArr } from "../../util/uitls";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import { AreaModuleC } from "./AreaModuleC";
import { AreaModuleData } from "./AreaModuleData";

export class AreaModuleS extends ModuleS<AreaModuleC, AreaModuleData> {

    protected onStart(): void {

    }


    public addArea(playerId: number, id: number, isFirst: boolean) {
        this.currentData.unlockAreaById(id, isFirst);
        this.noticeArea(playerId, [id]);
    }
    public net_addArea(ids: string, isFirst: boolean) {
        let idArr = stringToNumberArr(ids);
        idArr.forEach((id) => {
            this.currentData.unlockAreaById(id, isFirst);
        });
        this.noticeArea(this.currentPlayerId, idArr);
    }
    public noticeArea(playerId: number, ids: number[]) {
        if (ids.length != 2) return;
        if (ids[0] == 2001 && ids[1] == 2002) {
            this.getAllClient().net_areaNotice(playerId);
        }
    }

    public async net_buyTranArea(id: number): Promise<boolean> {
        const userId = this.currentPlayer?.userId ?? '';
        try {
            let cfg = GameConfig.AreaDivide.getElement(id);
            const playerId = this.currentPlayerId;
            const isSuccess = ModuleService.getModule(PlayerModuleS).reduceDiamond(cfg.Gem, playerId)
            if (!isSuccess) return false;
            Log4Ts.log(AreaModuleS, " buyAreaPortal areaId: " + id + " cost_gem: " + cfg.Gem + " userId: " + userId + " #unlock_portal");
            this.addArea(playerId, id, false);
            return true;
        } catch (e) {
            Log4Ts.error(AreaModuleS, " net_buyTranArea error:" + e + " userId:" + userId);
            return false;
        }
    }
}