
import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, B3Define, NodeBase } from "../NodeBase";
//TODO:验证
@regBehaviorNode()
class Parallel extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Composite,
        "并行执行",
        "执行所有子节点并返回成功")

    public run(node: BehaviorNode, env: any) {
        const [lastIdx, lastRet] = node.resume(env);
        let currentIndex = lastIdx || 1;

        if (lastIdx && lastRet === BehaviorRet.Running) {
            return lastRet;
        }

        for (let i = currentIndex; i <= node.children.length; i++) {
            const child = node.children[i];
            const r = child.run(env);
            if (r === BehaviorRet.Running) {
                return node.yield(env, i);
            }
        }
        return BehaviorRet.Success;
    }

}
