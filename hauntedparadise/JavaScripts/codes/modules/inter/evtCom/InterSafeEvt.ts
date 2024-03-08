import { BoardHelper, BoardKeys } from "../../blackboard/BoardDefine";
import { IEvtCom, RegisterEvt } from "./IEvtCom";

@RegisterEvt
export class InterSafeEvt implements IEvtCom {
    public static evtName: string = "InterSafeEvt";
    evtName: string = "InterSafeEvt";

    onGetCall(goid: string, safeType: string) {
        BoardHelper.ChangeKeyValue(BoardKeys.PlayerSafeStat, safeType);
    } 
}
