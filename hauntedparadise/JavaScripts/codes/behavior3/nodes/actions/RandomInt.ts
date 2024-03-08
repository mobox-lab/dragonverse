import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, B3Dec, B3Define, NodeBase } from "../NodeBase";

@regBehaviorNode()
class RandomNumber01 extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "随机输出一个数（0~1）",
        "设置整数")
        .addOutput("value")

    run(node: BehaviorNode, env: Environment): [BehaviorRet, number] {
        return [BehaviorRet.Success, Math.random()];
    }

}