import Log4Ts from "mw-log4ts";
import { GameConfig } from "../../config/GameConfig";
import { stringToNumberArr, utils } from "../../util/uitls";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import { AreaModuleC } from "./AreaModuleC";
import { AreaModuleData } from "./AreaModuleData";
import { GlobalEnum } from "../../const/Enum";
import PsStatisticModuleData from "../statistic/StatisticModule";

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

            const sData = DataCenterS.getData(userId, PsStatisticModuleData);
            const { unlockPortalCount = 0 } = sData?.totalStatisticData ?? {};
    
            utils.logP12Info("P_UnlockPortal", {
                userId,
                timestamp: Date.now(),
                coinType: GlobalEnum.CoinType.Diamond,
                cost: cfg.Gem,
                areaId: cfg.id,
                unlockPortalCount: unlockPortalCount + 1
            })
            sData.recordTotalData({ unlockPortalCount: unlockPortalCount + 1 })
            this.addArea(playerId, id, false);
            return true;
        } catch (e) {
            utils.logP12Info("P_Error", {
                userId: userId,
                timestamp: Date.now(),
                errorMsg: "AreaModuleS net_buyTranArea error: " + e,
                cfgId: id,
            }, "error");
            return false;
        }
    }
}