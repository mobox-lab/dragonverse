import { BoardHelper, BoardKeys } from "../../blackboard/BoardDefine";
// import GhostGraphPanel from "../../ghost/ui/GhostGraphPanel";
import { IEvtCom, RegisterEvt } from "./IEvtCom";

@RegisterEvt
export class OpenUIEvt implements IEvtCom {
    evtName: string = "OpenUIEvt";

    private _uimap: Map<string, any> = new Map();

    public constructor() {
        // this._uimap.set("GhostGraphPanel", () => {
        //     UIService.show(GhostGraphPanel);
        // });
    }

    onGetCall(goid: string, key: string) {
        console.log("尝试打开UI" + key)
        this._uimap.get(key)();
    }
}
