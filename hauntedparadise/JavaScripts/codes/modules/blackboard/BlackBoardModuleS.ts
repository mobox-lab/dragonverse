import { MapEx } from "../../utils/MapEx";
import DoorScript from "../DoorScript";
import { BlackBoardModuleC } from "./BlackBoardMdouleC";

export class BlackBoardModuleS extends ModuleS<BlackBoardModuleC, null>{

    private _degreeMap: Map<number, number> = new Map();

    public doorInfoMap: MapEx.MapExClass<number> = {};


    public reqGetBoardValue(playerId: number) {
        return this._degreeMap.get(playerId)
    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
            if (this._degreeMap.has(player.playerId)) {
                this._degreeMap.delete(player.playerId);
            }
        } catch (error) {
            console.error(error + "[BlackBoardModuleS]")
        }
    }

    public net_syncDegreeKey(value: string) {
        this._degreeMap.set(this.currentPlayerId, Number(value));
    }

    public net_getAllDoorInfo() {
        return this.doorInfoMap;
    }

    public setInterStats(uuid: string, statId: number) {
        MapEx.set(this.doorInfoMap, uuid, statId);
    }

    public delInter(uuid: string) {
        MapEx.del(this.doorInfoMap, uuid)
    }
}

