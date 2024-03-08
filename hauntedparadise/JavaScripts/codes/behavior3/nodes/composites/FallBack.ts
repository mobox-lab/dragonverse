import { BehaviorType, BehaviorRet } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Define, NodeBase } from "../NodeBase";


@regBehaviorNode()
class FallBack extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Composite,
        "备选节点",
        "按顺序执行孩子结点直到其中一个孩子结点返回成功状态或所有孩子结点返回失败状态"
    )

    run(node: BehaviorNode, env: Environment): [BehaviorRet] {
        let [lastIndex, lastRet] = node.resume(env);

        if (lastIndex != undefined) {
            if (lastRet == BehaviorRet.Success || lastRet == BehaviorRet.Running) {
                return [lastRet];
            } else if (lastRet == BehaviorRet.Fail) {
                lastIndex = lastIndex + 1;
            } else {
                throw new Error('wrong ret');
            }
        } else {
            lastIndex = 0;
        }

        for (let i = lastIndex; i < node.children.length; i++) {
            const child = node.children[i];
            const r = child.run(env);

            if (r == BehaviorRet.Running) {
                return [node.yield(env, i)];
            }

            if (r == BehaviorRet.Success) {
                //console.log("Sequence Fail")
                return [r];
            }
        }

        return [BehaviorRet.Fail];
    }

}