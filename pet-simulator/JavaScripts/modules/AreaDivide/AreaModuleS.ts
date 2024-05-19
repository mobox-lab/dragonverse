import { GameConfig } from "../../config/GameConfig";
import { numberArrToString, stringToNumberArr } from "../../util/uitls";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import { stringToArray } from "../Trading/TradingScript";
import { AreaModuleC } from "./AreaModuleC";
import { AreaModuleData } from "./AreaModuleData";

export class AreaModuleS extends ModuleS<AreaModuleC, AreaModuleData>{

    protected onStart(): void {

    }


		public addArea(id: number, isFirst: boolean) { 
			console.log(this.currentPlayerId)
			this.currentData.unlockAreaById(id, isFirst); 
			this.noticeArea(this.currentPlayerId, [id]);
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

		public async net_buyTranArea(id: number):Promise<boolean> {
			let cfg = GameConfig.AreaDivide.getElement(id);

			const isSuccess = ModuleService.getModule(PlayerModuleS).reduceDiamond(cfg.Gem)
			if (!isSuccess) return false
			this.addArea(id, false);
			return true;
    }
}