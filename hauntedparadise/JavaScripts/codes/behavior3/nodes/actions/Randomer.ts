import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, B3Dec, B3Define, NodeBase } from "../NodeBase";

@regBehaviorNode()
class RandomPasser extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "随机通过",
        "设置一个通过的概率")

    @B3Dec.ArgDec("通过的概率", B3ArgType.Number)
    public passRate: number;

    run(node: BehaviorNode, env: Environment): BehaviorRet {
        const rd = Math.random();
        if (rd <= this.passRate) {
            return BehaviorRet.Success;
        }
        else {
            return BehaviorRet.Fail;
        }

    }

}