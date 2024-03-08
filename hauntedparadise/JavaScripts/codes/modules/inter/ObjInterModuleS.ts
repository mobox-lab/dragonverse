import { TimerOnly } from "../../utils/AsyncTool";
import { BoardHelper } from "../blackboard/BoardDefine";
import { ObjInterModuleC } from "./ObjInterModuleC";

export class ObjInterModuleS extends ModuleS<ObjInterModuleC, null> {
    // public net_pickItem(key: string) {
    //     let val = BoardHelper.GetTargetKeyValue(key)
    //     if (!val) {
    //         BoardHelper.ChangeKeyValue(key, true)
    //     }
    // }

    /** 处于猫猫头事件时，十秒无法刷怪 */
    static enableCatEvt: boolean = false;

    catTimer = new TimerOnly();

    /** 请求同步猫猫头事件 */
    public net_reqSyncCatEvt() {
        Event.dispatchToAllClient("CatEvt");
        ObjInterModuleS.enableCatEvt = true;
        this.catTimer.setTimeout(() => {
            ObjInterModuleS.enableCatEvt = false;
        }, 1e4);
    }
}   