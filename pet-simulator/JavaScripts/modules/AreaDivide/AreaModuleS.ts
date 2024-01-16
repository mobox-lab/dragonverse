import { stringToNumberArr } from "../../utils/uitls";
import { stringToArray } from "../Trading/TradingScript";
import { AreaModuleC } from "./AreaModuleC";
import { AreaModuleData } from "./AreaModuleData";

export class AreaModuleS extends ModuleS<AreaModuleC, AreaModuleData>{

    protected onStart(): void {

    }


    net_addArea(ids: string, isFirst: boolean) {
        let idArr = stringToNumberArr(ids);
        idArr.forEach((id) => {
            this.currentData.unlockAreaById(id, isFirst);
        });
        this.noticeArea(this.currentPlayerId, idArr);
    }
    private noticeArea(playerId: number, ids: number[]) {
        if (ids.length != 2) return;
        if (ids[0] == 2001 && ids[1] == 2002) {
            this.getAllClient().net_areaNotice(playerId);
        }
    }

    net_test() {
        this.currentData.unlockAreaById(1001, true);
    }
}