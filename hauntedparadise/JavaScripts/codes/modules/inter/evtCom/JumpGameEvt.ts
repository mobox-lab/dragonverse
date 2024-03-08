import { BoardHelper, BoardKeys } from "../../blackboard/BoardDefine";
import JumpGameBox from "../../route/ui/JumGameBox";
import { IEvtCom, RegisterEvt } from "./IEvtCom";

@RegisterEvt
export class JumpGameEvt implements IEvtCom {
    public static evtName: string = "JumpGameEvt";
    evtName: string = "JumpGameEvt";

    onGetCall(goid: string, input: string) {
        UIService.show(JumpGameBox, input);
    }
}
