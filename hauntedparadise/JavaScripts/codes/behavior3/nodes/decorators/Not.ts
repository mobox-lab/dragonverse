
import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, B3Define, NodeBase } from "../NodeBase";

@regBehaviorNode()
class Not extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Decorator,
        "取反",
        `+ 只能有一个子节点,多个仅执行第一个
        + 将子节点的返回值取反`
    )

    public run(node: BehaviorNode, env: Environment, arr: any[]) {
        const yieldVal = node.resume(env)[0];
        let r;
        if (node.resume(env)[0]) {
            r = env["last_ret"];
        } else {
            r = node.children[0].run(env);
        }

        if (r === BehaviorRet.Success) {
            return BehaviorRet.Fail;
        } else if (r === BehaviorRet.Fail) {
            return BehaviorRet.Success;
        } else if (r === BehaviorRet.Running) {
            return node.yield(env, false);
        }
    }

}
