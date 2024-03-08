import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, B3Dec, B3Define, NodeBase } from "../NodeBase";


@regBehaviorNode()
class Wait extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "等待",
        "等待一段时间")
        .addInput("time")

    @B3Dec.ArgDec("时间/tick", B3ArgType.Number)
    public time: number;

    public run(node: BehaviorNode, env: Environment): BehaviorRet {
        const t = node.resume(env)[0];
        if (t) {
            if (TimeUtil.elapsedTime() >= t) {
                //console.log('CONTINUE');
                return BehaviorRet.Success;
            } else {
                //console.log('WAITING');
                return BehaviorRet.Running;
            }
        }
        //console.log('Wait', this.time);
        return node.yield(env, TimeUtil.elapsedTime() + this.time);
    }
}
