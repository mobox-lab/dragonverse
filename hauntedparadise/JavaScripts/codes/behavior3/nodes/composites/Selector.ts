
import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, B3Define, NodeBase } from "../NodeBase";

@regBehaviorNode()
class Selector extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Composite,
        "选择执行",
        `- 一直往下执行，有子节点返回成功则返回成功，若全部节点返回失败则返回失败\n- 子节点是或(OR) 的关系`
    )

    public run(node: BehaviorNode, env: any, arr: any[]) {
        let [lastIndex, lastRet] = node.resume(env);

        if (lastIndex) {
            if (lastRet == BehaviorRet.Success || lastRet == BehaviorRet.Running) {
                return lastRet;
            } else if (lastRet == BehaviorRet.Fail) {
                lastIndex++;
            } else {
                throw new Error('wrong ret');
            }
        } else {
            lastIndex = 0;
        }

        for (let i = lastIndex; i < node.children.length; i++) {
            const child = node.children[i];
            const r = child.run(env);
            if (r === BehaviorRet.Running) {
                return node.yield(env, i);
            }
            if (r === BehaviorRet.Success) {
                return r;
            }
        }
        return BehaviorRet.Fail;
    }

}
