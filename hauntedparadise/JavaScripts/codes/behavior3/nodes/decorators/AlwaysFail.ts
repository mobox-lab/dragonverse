
import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, B3Define, NodeBase } from "../NodeBase";
//TODO:验证
@regBehaviorNode()
class AlwaysFail extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Decorator,
        "始终返回失败",
        `+ 只能有一个子节点,多个仅执行第一个
        + 不管子节点是否成功都返回失败`
    )

    public run(node: BehaviorNode, env: Environment) {
        const [yeild, lastRet] = node.resume(env);
        if (yeild) {
            if (lastRet === BehaviorRet.Running) {
                return lastRet;
            }
            return BehaviorRet.Fail;
        }
        if (node.children.length == 0) {
            return BehaviorRet.Fail
        }
        const r = node.children[0].run(env);
        if (r === BehaviorRet.Running) {
            return node.yield(env);
        }
        return BehaviorRet.Fail;
    }

}
