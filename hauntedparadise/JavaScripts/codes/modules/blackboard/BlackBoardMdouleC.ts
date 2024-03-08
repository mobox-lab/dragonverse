
import { AddGMCommand } from "module_gm";
import { BlackBoardModuleS } from "./BlackBoardModuleS";
import { BoardHelper, BoardKeys } from "./BoardDefine";
import { Event_GameStateChange } from "../procedure/const/Events";
import { EmProcedureState } from "../procedure/const/EmProcedureState";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { MapEx } from "../../utils/MapEx";

AddGMCommand("改变黑板值", (player: mw.Player, value: string) => {
    BoardHelper.ChangeKeyValue("targetKey", value);
})


AddGMCommand("打印黑板值", (player: mw.Player, value: string) => {
    console.log("boardValues")
    let vals = ModuleService.getModule(BlackBoardModuleC)["_valueMap"];
    vals.forEach((v, k) => {
        console.log("key:" + k + " val:" + v)
    })
}, () => {
})

export class BlackBoardModuleC extends ModuleC<BlackBoardModuleS, null>{
    private _valueMap: Map<string, any> = new Map();

    private _doorInfoMap: Map<string, number> = new Map();

    protected onEnterScene(sceneType: number): void {
        //this.asyncData();
        Event.addLocalListener(Event_GameStateChange, (state: EmProcedureState) => {
            if (state == EmProcedureState.End) {
                this.net_clearBoard();
                Event.dispatchToLocal(BoardHelper.BoardClearEvent);
            }
            else if (state == EmProcedureState.Loading) {
                console.log("[Board]开始加载")
                GhostTraceHelper.interTraceCountMap.clear();
                Event.dispatchToLocal(BoardHelper.BoardLoadingEvt);
            }
        })
        Event.addLocalListener(BoardHelper.BoardValueChangeEvent, (key: string, value: any) => {
            if (key == BoardKeys.Degree) {
                this.server.net_syncDegreeKey(value);
            }
        })
        this.asyncData();
    }

    public net_clearBoard() {
        this._valueMap.clear();
    }

    private async asyncData() {
        let res = await this.server.net_getAllDoorInfo();
        console.log(JSON.stringify(res));
        MapEx.forEach(res, (key: string, value) => {
            console.log(key, value)
            this._valueMap.set(key, value);
        })
    }

    public net_syncBoardValue(key: string, value: any) {
        this._valueMap.set(key, value);
        Event.dispatchToLocal(BoardHelper.BoardValueChangeEvent, key, value)
        console.log("boardEvt__client_" + key + ":" + value)
    }

    public reqGetBoardValue(key: string) {

        if (!this._valueMap.has(key)) {
            return null;
        }

        return this._valueMap.get(key);
    }

    public reqChangeBoardValue(key: string, value: any) {
        this.net_syncBoardValue(key, value);
    }

    public setInterStats(uuid: string, statId: number) {
        this._doorInfoMap.set(uuid, statId);
    }

    public getInterStat(uuid: string) {
        return this._doorInfoMap.get(uuid) || 0;
    }

    public delInter(uuid: string) {
        if (this._doorInfoMap.has(uuid)) {
            this._doorInfoMap.delete(uuid);
        }
    }
}

