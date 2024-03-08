import { BoardHelper, BoardKeys } from "../../blackboard/BoardDefine";
import { IEvtCom, RegisterEvt } from "./IEvtCom";

@RegisterEvt
export class ChangeCustomKeyEvt implements IEvtCom {
    evtName: string = "ChangeCustomVal";

    onGetCall(goid: string, key:string, newVal: string) {
        BoardHelper.ChangeKeyValue(`${key}_${goid}`, newVal);
    } 
}
